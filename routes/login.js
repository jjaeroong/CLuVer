
const express = require("express");
const app=express()
const bodyParser=require('body-parser')
const router = express.Router();
const passport=require("passport")
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = require('../controllers/login');

router.post('/login', authController.login);

module.exports = router;