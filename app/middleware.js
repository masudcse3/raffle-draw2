/** @format */

const morgan = require("morgan");
const cors = require("cors");

const middleware = [morgan("dev"), cors()];
module.exports = middleware;
