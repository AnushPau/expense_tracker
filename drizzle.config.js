
export default {
  schema: "./utils/schema.jsx",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};