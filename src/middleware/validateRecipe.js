function validateRecipe(req, res, next) {
  const { title, ingredients, instructions } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'ingredients must be a non-empty array' });
  }

  if (typeof instructions !== 'string' || instructions.trim() === '') {
    return res.status(400).json({ error: 'instructions is required and must be a non-empty string' });
  }

  return next();
}

module.exports = validateRecipe;
