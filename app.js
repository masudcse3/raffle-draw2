/** @format */

const express = require("express");
const healthRoute = require("./app/routes");
const { handleNotFound, handleGlobalError } = require("./app/error");
const middleware = require("./app/middleware");
const router = require("./routes/router");

const app = express();
app.use(middleware);

// health routes
app.use(healthRoute);
app.use(router);
app.use(handleNotFound, handleGlobalError);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});
