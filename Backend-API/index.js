const express = require("express");
const app = express();
const moongoose = require("mongoose");
const cors = require("cors");
const route = require("./src/controller/cryptoData");
const port = 4000;
const mongoDbUrl =
  "mongodb+srv://smriti30jojo:Jojo09%40!@cluster0.r9vgfnh.mongodb.net/codinova";

app.use(express.json());
app.use(cors());
moongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(`mongodb is connected`);
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/", route);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
