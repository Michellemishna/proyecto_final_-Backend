const server = require("./src/app");
const { conn } = require("./src/db");

//server.listen port
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`);
  });
});
