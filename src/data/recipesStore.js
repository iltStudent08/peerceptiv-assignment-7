const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'recipes.json');

async function readRecipes() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]', 'utf8');
      return [];
    }
    throw error;
  }
}

async function writeRecipes(recipes) {
  await fs.writeFile(DATA_FILE, JSON.stringify(recipes, null, 2), 'utf8');
}

function nextId(recipes) {
  return recipes.length ? Math.max(...recipes.map((recipe) => recipe.id)) + 1 : 1;
}

async function getAllRecipes(titleQuery) {
  const recipes = await readRecipes();
  if (!titleQuery) {
    return recipes;
  }

  const normalizedQuery = String(titleQuery).toLowerCase();
  return recipes.filter((recipe) => recipe.title.toLowerCase().includes(normalizedQuery));
}

async function getRecipeById(id) {
  const recipes = await readRecipes();
  return recipes.find((recipe) => recipe.id === id) || null;
}

async function createRecipe(recipeInput) {
  const recipes = await readRecipes();
  const recipe = { id: nextId(recipes), ...recipeInput };
  recipes.push(recipe);
  await writeRecipes(recipes);
  return recipe;
}

async function updateRecipe(id, recipeInput) {
  const recipes = await readRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) {
    return null;
  }

  const updated = { ...recipes[index], ...recipeInput, id };
  recipes[index] = updated;
  await writeRecipes(recipes);
  return updated;
}

async function deleteRecipe(id) {
  const recipes = await readRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) {
    return false;
  }

  recipes.splice(index, 1);
  await writeRecipes(recipes);
  return true;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
