/** @format */

const fs = require("fs/promises");
const path = require("path");
const dbPath = path.resolve("data", "db.json");
exports.readFile = async () => {
  const data = await fs.readFile(dbPath);
  return JSON.parse(data);
};

exports.writeFile = async (data) => {
  return await fs.writeFile(dbPath, JSON.stringify(data));
};
