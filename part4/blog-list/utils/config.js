if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL:
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_URL
      : process.env.TEST_MONGODB_URL,
};
