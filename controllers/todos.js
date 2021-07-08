const fs = require("fs");

module.exports.home = (req, res) => {
  return res.send("Hello, world!");
};

module.exports.getToDos = (req, res) => {
  const { showpending: showPending } = req.query;

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Sorry, something went wrong.");
    }

    const todos = JSON.parse(data);

    if (showPending !== "1") {
      return res.json({ todos });
    } else {
      return res.json({
        todos: todos.filter((t) => {
          return t.complete === false;
        }),
      });
    }
  });
};

module.exports.putToDos = (req, res) => {
  const { id } = req.params;

  const findTodoById = (todos, id) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === parseInt(id)) {
        return i;
      }
    }
    return -1;
  };

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Sorry, something went wrong.");
    }

    let todos = JSON.parse(data);
    const todoIndex = findTodoById(todos, id);

    if (todoIndex === -1) {
      return res.status(404).send("Sorry, not found.");
    }

    todos[todoIndex].complete = true;

    fs.writeFile("./store/todos.json", JSON.stringify(todos), () => {
      return res.json({ status: "ok" });
    });
  });
};

module.exports.postToDos = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Please enter a name");
  }

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Sorry, something went wrong.");
    }

    const todos = JSON.parse(data);
    const maxId = Math.max.apply(
      Math,
      todos.map((t) => {
        return t.id;
      })
    );

    todos.push({
      id: maxId + 1,
      complete: false,
      name: req.body.name,
    });

    fs.writeFile("./store/todos.json", JSON.stringify(todos), () => {
      return res.json({ status: "ok" });
    });
  });
};
