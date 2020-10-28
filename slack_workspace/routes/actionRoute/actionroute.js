"use strict";
const express = require("express");
const controller = require("./controller");

const router = express.Router();
router.route('/').post(controller.actionresolve);

module.exports = router;