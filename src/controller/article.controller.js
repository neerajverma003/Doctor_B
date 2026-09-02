import Article from '../models/article.model.js';

export const getArticles = async (req, res, next) => {
  try {
    const { category, featured, limit } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true' || featured === true) {
      filter.featured = true;
    }

    let query = Article.find(filter).sort({ date: -1 }).lean();
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    const articles = await query;
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { id, title, slug, category, excerpt, content, readTime, date, featured, tags } = req.body;

    if (!title || !category || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: 'title, category, excerpt, and content are required.',
      });
    }

    const autoId = id || (await Article.countDocuments()) + 1;
    const autoSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newArticle = await Article.create({
      id: autoId,
      slug: autoSlug,
      title: title.trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      readTime: readTime || '5 min read',
      date: date ? new Date(date) : new Date(),
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags.map(t => t.trim()) : [],
    });

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: newArticle,
    });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };
    const { title, slug, category, excerpt, content, readTime, date, featured, tags } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (slug !== undefined) updateData.slug = slug.trim().toLowerCase();
    if (category !== undefined) updateData.category = category.trim();
    if (excerpt !== undefined) updateData.excerpt = excerpt.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (readTime !== undefined) updateData.readTime = readTime.trim();
    if (date !== undefined) updateData.date = new Date(date);
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags.map(t => t.trim()) : [];

    const updated = await Article.findOneAndUpdate(query, updateData, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({
      success: true,
      message: 'Article updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const param = req.params.id;
    const query = isNaN(param) ? { _id: param } : { id: Number(param) };

    const deleted = await Article.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({
      success: true,
      message: 'Article deleted successfully',
      id: deleted.id,
    });
  } catch (error) {
    next(error);
  }
};
