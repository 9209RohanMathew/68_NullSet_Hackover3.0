const app = require("./app")
const connectDatabase=require("./database/database.js")
const dotenv=require("dotenv")

dotenv.config({ path: "backend/config/config.env" })
connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });