const router = require("express").Router();
const adminRegisterHandler = require("../Controller/AdminRegister");
const handleLogin = require("../Controller/HandleLogin");
const handlerRegister = require("../Controller/HandleRegister");

router.post("/login", handleLogin);
router.post("/register", handlerRegister);
router.post("/register/admin", adminRegisterHandler);

module.exports = router;
