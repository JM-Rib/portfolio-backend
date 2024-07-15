const cors = require('cors');
const express = require("express");
const helmet = require("helmet");
require('dotenv').config();

const corsOptions ={
//    origin:'http://localhost:3000', 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const app = express();
const port = process.env.APP_PORT;
const profilRouter = require("./routes/profil");
const adminRouter = require("./routes/admin");
const projetRouter = require("./routes/projet");
const descriptionRouter = require("./routes/description");
const langueRouter = require("./routes/langue");
const themeRouter = require("./routes/theme");
const contenuThemeRouter = require("./routes/contenuTheme");
const problematiqueRouter = require("./routes/problematique");
const collabRouter = require("./routes/collab");


app.use(helmet())
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/profil", profilRouter);
app.use("/admin", adminRouter);
app.use("/projet", projetRouter);
app.use("/description", descriptionRouter);
app.use("/langue", langueRouter);
app.use("/theme", themeRouter);
app.use("/contenuTheme", contenuThemeRouter);
app.use("/problematique", problematiqueRouter);
app.use("/collab", collabRouter);


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
