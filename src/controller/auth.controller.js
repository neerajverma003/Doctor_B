import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const JWT_EXPIRES_IN = '7d';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT token directly using process.env.JWT_SECRET
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.',
    });
  }
}


export async function getMe(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error('Error in getMe controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
    });
  }
}

/**
 * Initiate Forgot Password (generates 6-digit OTP & sends plain email)
 */
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your admin email address.' });
    }

    const trimmedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      // Don't leak user existence
      return res.status(200).json({
        success: true,
        message: 'If an account exists with that email, a verification code has been sent.',
      });
    }

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP using SHA-256 for database storage
    const crypto = await import('crypto');
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    user.resetPasswordOtp = hashedOtp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Send clean OTP email in background
    const { sendPasswordResetOtpNotification } = await import('../services/email.service.js');
    sendPasswordResetOtpNotification({
      email: trimmedEmail,
      name: user.name,
      otp,
    }).catch((err) => console.error('Error sending OTP email in background:', err));

    return res.status(200).json({
      success: true,
      message: 'A 6-digit verification code (OTP) has been sent to your email.',
    });
  } catch (error) {
    console.error('Error in forgotPassword controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process password reset request.',
    });
  }
}

/**
 * Complete Reset Password using OTP (or token)
 */
export async function resetPassword(req, res) {
  try {
    const { email, otp, token, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password is required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    const crypto = await import('crypto');
    let user = null;

    if (otp) {
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Admin email is required to verify OTP.',
        });
      }
      const hashedOtp = crypto.createHash('sha256').update(otp.trim()).digest('hex');
      user = await User.findOne({
        email: email.toLowerCase().trim(),
        resetPasswordOtp: hashedOtp,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } else if (token) {
      const hashedToken = crypto.createHash('sha256').update(token.trim()).digest('hex');
      user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Verification code (OTP) is required.',
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Verification code is invalid or has expired. Please request a new code.',
      });
    }

    // Update password (pre-save hook hashes with bcrypt!)
    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Your password has been reset successfully! You can now log in.',
    });
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password.',
    });
  }
}
