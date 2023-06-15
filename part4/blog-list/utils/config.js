if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URL: process.env.MONGODB_URL,
};
