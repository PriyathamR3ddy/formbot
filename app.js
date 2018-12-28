const app = require('./server/express');
const { port } = require('./server/config');

app.listen(port, () => {
  console.info(`Interactive Form Bot server started at port ${port}`);
});

module.exports = app;
