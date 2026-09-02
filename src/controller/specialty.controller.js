import Specialty from '../models/specialty.model.js';
import Procedure from '../models/procedure.model.js';

export const getSpecialties = async (req, res, next) => {
  try {
    const specialties = await Specialty.find().sort({ id: 1 }).lean();
    res.json(specialties);
  } catch (error) {
    next(error);
  }
};

export const getSpecialtyBySlug = async (req, res, next) => {
  try {
    const specialty = await Specialty.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!specialty) {
      return res.status(404).json({ success: false, message: 'Specialty not found' });
    }
    const procedures = await Procedure.find({ specialtyId: specialty.id }).lean();
    res.json({ ...specialty, procedures });
  } catch (error) {
    next(error);
  }
};

export const getAllProcedures = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const procedures = await Procedure.find(filter).sort({ id: 1 }).lean();
    res.json(procedures);
  } catch (error) {
    next(error);
  }
};

export const createSpecialty = async (req, res, next) => {
  try {
    const { id, slug, icon, title, shortDesc, fullDesc, color } = req.body;

    if (!title || !shortDesc || !fullDesc) {
      return res.status(400).json({
        success: false,
        message: 'title, shortDesc, and fullDesc are required fields.',
      });
    }

    const autoId = id || (await Specialty.countDocuments()) + 1;
    const autoSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newSpecialty = await Specialty.create({
      id: autoId,
      slug: autoSlug,
      icon: icon || 'heart',
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      fullDesc: fullDesc.trim(),
      color: color || '#1a6bbd',
    });

    res.status(201).json({
      success: true,
      message: 'Specialty created successfully',
      data: newSpecialty,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSpecialty = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };
    const { title, shortDesc, fullDesc, color, icon, slug } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc.trim();
    if (fullDesc !== undefined) updateData.fullDesc = fullDesc.trim();
    if (color !== undefined) updateData.color = color;
    if (icon !== undefined) updateData.icon = icon;
    if (slug !== undefined) updateData.slug = slug.trim().toLowerCase();

    const updated = await Specialty.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Specialty not found' });
    }

    res.json({
      success: true,
      message: 'Specialty updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialty = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };

    const specialty = await Specialty.findOne(query);
    if (!specialty) {
      return res.status(404).json({ success: false, message: 'Specialty not found' });
    }

    // Delete associated procedures too
    await Procedure.deleteMany({ specialtyId: specialty.id });
    await Specialty.deleteOne({ _id: specialty._id });

    res.json({
      success: true,
      message: 'Specialty and associated procedures deleted successfully',
      id: specialty.id,
    });
  } catch (error) {
    next(error);
  }
};

export const createProcedure = async (req, res, next) => {
  try {
    const { id, specialtyId, category, title, desc, duration, recovery, anesthesia } = req.body;

    if (!specialtyId || !category || !title || !desc || !duration || !recovery || !anesthesia) {
      return res.status(400).json({
        success: false,
        message: 'specialtyId, category, title, desc, duration, recovery, and anesthesia are required.',
      });
    }

    const autoId = id || (await Procedure.countDocuments()) + 1;

    const newProcedure = await Procedure.create({
      id: autoId,
      specialtyId: Number(specialtyId),
      category,
      title: title.trim(),
      desc: desc.trim(),
      duration: duration.trim(),
      recovery: recovery.trim(),
      anesthesia: anesthesia.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Procedure created successfully',
      data: newProcedure,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProcedure = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };
    const { specialtyId, category, title, desc, duration, recovery, anesthesia } = req.body;

    const updateData = {};
    if (specialtyId !== undefined) updateData.specialtyId = Number(specialtyId);
    if (category !== undefined) updateData.category = category;
    if (title !== undefined) updateData.title = title.trim();
    if (desc !== undefined) updateData.desc = desc.trim();
    if (duration !== undefined) updateData.duration = duration.trim();
    if (recovery !== undefined) updateData.recovery = recovery.trim();
    if (anesthesia !== undefined) updateData.anesthesia = anesthesia.trim();

    const updated = await Procedure.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Procedure not found' });
    }

    res.json({
      success: true,
      message: 'Procedure updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProcedure = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };

    const deleted = await Procedure.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Procedure not found' });
    }

    res.json({
      success: true,
      message: 'Procedure deleted successfully',
      id: deleted.id,
    });
  } catch (error) {
    next(error);
  }
};
