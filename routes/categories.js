const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries selecting todos by category
  router.get("/:id", (req, res) => {
    let categoryID = req.params.id

    if (categoryID === 'All') {
      db.query(`SELECT * FROM todos;`)
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else if (categoryID === 'Uncategorized') {
      db.query(`SELECT * FROM todos WHERE category_id IS NULL;`)
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      db.query(`SELECT * FROM todos WHERE todos.category_id = $1;`, [categoryID])
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }

  });

  return router;
};
