const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

if (!databaseUrl || !jwtSecret) {
  console.error("Error: DATABASE_URL and JWT_SECRET must be set as environment variables.");
  process.exit(1);
}

app.use(
  postgraphile(databaseUrl, "public", {
    jwtSecret: jwtSecret,
    jwtPgTypeIdentifier: "public.jwt_token",
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`PostGraphile server running on port ${port}`);
});
