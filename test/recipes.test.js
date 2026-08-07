const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs').promises;
const path = require('path');
const app = require('../src/app');

const dataFile = path.join(__dirname, '..', 'src', 'data', 'recipes.json');

async function resetData() {
  await fs.writeFile(dataFile, '[]', 'utf8');
}

test.beforeEach(async () => {
  await resetData();
});

test('recipe CRUD flow and filtering', async () => {
  const server = app.listen(0);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    const createResponse = await fetch(`${baseUrl}/api/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Pasta',
        ingredients: ['noodles', 'sauce'],
        instructions: 'Boil noodles and add sauce',
      }),
    });

    assert.equal(createResponse.status, 201);
    const created = await createResponse.json();
    assert.equal(created.id, 1);

    const filteredResponse = await fetch(`${baseUrl}/api/recipes?title=pas`);
    assert.equal(filteredResponse.status, 200);
    const filtered = await filteredResponse.json();
    assert.equal(filtered.length, 1);

    const updateResponse = await fetch(`${baseUrl}/api/recipes/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Pasta Deluxe',
        ingredients: ['noodles', 'sauce', 'cheese'],
        instructions: 'Cook and mix all ingredients',
      }),
    });

    assert.equal(updateResponse.status, 200);
    const updated = await updateResponse.json();
    assert.equal(updated.title, 'Pasta Deluxe');

    const deleteResponse = await fetch(`${baseUrl}/api/recipes/1`, { method: 'DELETE' });
    assert.equal(deleteResponse.status, 204);

    const getDeletedResponse = await fetch(`${baseUrl}/api/recipes/1`);
    assert.equal(getDeletedResponse.status, 404);
  } finally {
    server.close();
  }
});

test('returns 400 for invalid payload', async () => {
  const server = app.listen(0);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    const response = await fetch(`${baseUrl}/api/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '', ingredients: [], instructions: '' }),
    });

    assert.equal(response.status, 400);
  } finally {
    server.close();
  }
});
