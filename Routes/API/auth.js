const router = require("express").Router();
const handleAdminLogin = require("../Controller/AdminLogin");
const adminRegisterHandler = require("../Controller/AdminRegister");
const handleLogin = require("../Controller/HandleLogin");
const handlerRegister = require("../Controller/HandleRegister");

router.post("/login", handleLogin);
router.post("/register", handlerRegister);
router.post("/login/admin", handleAdminLogin);
router.post("/register/admin", adminRegisterHandler);

module.exports = router;
