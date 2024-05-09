const pool = require("../../db");

const getSectors = (req, res) => {
  console.log("getting in sectors");
  pool.query("SELECT * FROM sectors", (error, results) => {
    console.log("error",error)
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getSectors,
};
