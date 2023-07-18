const server = require('./app.js');

//server.listen port
const port=process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`%s listening at ${port}`); 
  });


