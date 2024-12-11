# Stockify

## Differences / Issues

- TODO: Different logic for MaxProductQuantity and upload image
- Update task logic is different. Changed task types and instead of params, it's an object sent with the request.
- Uploading image logic to be revised.
- Error middlware doesn't work.
- Imports are not correctly sorted (plugin).
- Requests and responses should always send JSON data.
- Importing types from Prisma in **ts.config.json** client with:

```typescript
"@stockify/backend/types": [
  "../backend/node_modules/.prisma/client/index.d.ts"
]
```

- Always return a success response, otherwise the endpoint will keep on waiting.

- Helper function to cast a type String to a Date:

```typescript
export function parseDates<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => parseDates(item)) as T;
  }

  if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (
          (key === "createdAt" || key === "updatedAt") &&
          typeof value === "string"
        ) {
          return [key, new Date(value)];
        }
        return [key, parseDates(value)];
      })
    ) as T;
  }

  return data;
}
```

- Attribute crossOrigin="anonymous" to <img> was needed to enable CORS to read the image from the file system.

- Script: `"dev": "node -r ts-node/register --watch --env-file=.env ./src/server.ts"` in order to get rid of `nodemon` and `dotenv` dependencies.
