# peerceptiv-assignment-7

Express REST API for managing recipes with full CRUD support.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the server:
   ```bash
   npm start
   ```

The API runs on `PORT` from `.env` (defaults to `3000`).

## Code Structure

```text
src/
  app.js                  # Express app setup (middleware, routes, 404, error handling)
  server.js               # Runtime entry point (loads env + starts HTTP server)
  routes/
    recipes.js            # Recipe API endpoints and request flow
  middleware/
    requestLogger.js      # Logs incoming requests
    validateRecipe.js     # Validates request payloads for create/update
    errorHandler.js       # Centralized 500 error response handling
  data/
    recipesStore.js       # Data access layer for recipe CRUD + filtering
    recipes.json          # File-based persistence store
test/
  recipes.test.js         # Node test suite for CRUD behavior and validation errors
```

## Setup Reasoning

- **`app.js` and `server.js` are separated** so the Express app can be imported directly in tests without booting the production server.
- **Routes, middleware, and data logic are split by responsibility** to keep endpoint definitions clean and make each part easier to maintain and test.
- **A file-based store (`recipes.json`) is used** to keep setup simple for an assignment environment while still preserving data between requests.
- **Environment configuration is loaded at startup** (`dotenv`) so deployment settings such as port can change without code edits.

## API Endpoints

Base path: `/api/recipes`

- `GET /api/recipes` - list all recipes
- `GET /api/recipes?title=pasta` - filter recipes by title query
- `GET /api/recipes/:id` - get one recipe
- `POST /api/recipes` - create a recipe
- `PUT /api/recipes/:id` - update a recipe
- `DELETE /api/recipes/:id` - delete a recipe

### Recipe JSON shape

```json
{
  "title": "Pasta",
  "ingredients": ["noodles", "sauce"],
  "instructions": "Boil noodles and add sauce"
}
```

## Testing

```bash
npm test
```
