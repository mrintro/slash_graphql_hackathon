"use strict";
const express = require("express");
const controller = require("./controller");


let router = express.Router();

router.route("/search_user").post(controller.usermethod);

module.exports = router;