const { dbConnection } = require("./config/config");
const { app } = require("./app");

const PORT = 8080;

dbConnection();

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} url: localhost:8080`)
);
