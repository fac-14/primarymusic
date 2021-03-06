// setup routing
const express = require("express");
const router = express.Router();

// require routes
const home = require("./home");
const error = require("./error");
const numdrum = require("./numdrum");

// defined routes
router.get("/", home.get);
router.get("/numdrum", numdrum.get);

// ALL DEFINED ROUTES ABOVE THIS LINE :D << NOT A JOKE

// setup error route for test environments
if (process.env.NODE_ENV === "test") {
  const triggerError = () => (req, res, next) => {
    try {
      throw new Error("this function causes an error");
    } catch (error) {
      next(error);
    }
  };
  router.get("/error", triggerError());
}

// error routes
router.use((req, res) => {
  res.status(404).render("error", { ErrorNo: "404" });
});

router.use(error.get);

module.exports = router;
