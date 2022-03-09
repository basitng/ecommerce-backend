const router = require("express").Router();
const handleAdminLogin = require("../Controller/AdminLogin");
const adminRegisterHandler = require("../Controller/AdminRegister");
const handleLogin = require("../Controller/HandleLogin");
const handlerRegister = require("../Controller/HandleRegister");
const {
  googleLogin,
  googleRegister,
} = require("../Controller/Social auth/Google");

router.post("/google/login", googleLogin);
router.post("/google/register", googleRegister);
router.post("/login", handleLogin);
router.post("/register", handlerRegister);
router.post("/login/admin", handleAdminLogin);
router.post("/register/admin", adminRegisterHandler);

module.exports = router;
