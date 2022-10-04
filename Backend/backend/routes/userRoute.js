const express=require("express")
const router=express.Router()
const {registerUser, loginUser, logout,confirmOrganizer}=require("../controllers/userController")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("admin/confirmOrganizers").put(confirmOrganizer)
module.exports = router