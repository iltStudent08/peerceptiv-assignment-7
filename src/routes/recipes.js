const express = require('express');
const validateRecipe = require('../middleware/validateRecipe');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../data/recipesStore');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const recipes = await getAllRecipes(req.query.title);
    return res.status(200).json(recipes);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'id must be a positive integer' });
    }

    const recipe = await getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
});

router.post('/', validateRecipe, async (req, res, next) => {
  try {
    const recipe = await createRecipe(req.body);
    return res.status(201).json(recipe);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', validateRecipe, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'id must be a positive integer' });
    }

    const recipe = await updateRecipe(id, req.body);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'id must be a positive integer' });
    }

    const deleted = await deleteRecipe(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
