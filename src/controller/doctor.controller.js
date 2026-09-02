import Doctor from '../models/doctor.model.js';

export const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne();
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found',
      });
    }
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

export const createOrUpdateDoctor = async (req, res, next) => {
  try {
    const {
      name,
      title,
      specialty,
      tagline,
      bio,
      shortBio,
      mission,
      quote,
      phone,
      email,
      address,
      training,
      workingHours,
      stats,
      socials,
      values,
      milestones,
    } = req.body;

    // Validate required fields
    if (!name || !title || !specialty || !bio || !phone || !email || !address) {
      return res.status(400).json({
        success: false,
        message: 'name, title, specialty, bio, phone, email, and address are required.',
      });
    }

    const doctorFields = {
      name: name.trim(),
      title: title.trim(),
      specialty: specialty.trim(),
      tagline: tagline ? tagline.trim() : '',
      bio: bio.trim(),
      shortBio: shortBio ? shortBio.trim() : '',
      mission: mission ? mission.trim() : '',
      quote: quote ? quote.trim() : '',
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      training: training ? training.trim() : 'AIIMS New Delhi + Cleveland Clinic',
      workingHours: Array.isArray(workingHours) ? workingHours : [],
      stats: Array.isArray(stats) ? stats : [],
      socials: socials || {},
      values: Array.isArray(values) ? values : [],
      milestones: Array.isArray(milestones) ? milestones : [],
    };

    const doctor = await Doctor.findOneAndUpdate({}, doctorFields, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Doctor profile updated successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};
