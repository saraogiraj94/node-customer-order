const DB_NAME = process.env.DB_NAME || "test";
const DB_HOST = process.env.host || "127.0.0.1";
const DB_PORT = process.env.port || "27017";

module.exports = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
};
