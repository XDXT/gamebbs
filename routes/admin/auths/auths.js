var express = require('express');
var router = express.Router();

var listRouter = require("./list");
var authRouter = require("./auth");
var roleRouter = require("./role");


router.use("/list", listRouter);
router.use("/auth", authRouter);
router.use("/role", roleRouter);


module.exports = router;
