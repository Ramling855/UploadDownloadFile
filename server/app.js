// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connectDB = require("./db/db");
// const web = require("./routers/web");
// const port = process.env.PORT || 8000;
// const DATABASE_URL = process.env.MONGO_URL|| "mongodb+srv://RRR:RRR@cluster0.rajfy.mongodb.net/test";
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// connectDB(DATABASE_URL);

// app.use("/", web);

// app.listen(port, () => {
//   console.log(`App listning at port http://localhost:${port}`);
// });


//////////////////

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers/file");
const authrouter=require("./routers/user")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/",authrouter)
module.exports = app;
