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
