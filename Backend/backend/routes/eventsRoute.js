const express=require("express")
const { getAllEvents ,createAEvent,updateEvent,deleteEvent, getEventDetails} = require("../controllers/EventController")
const { isAuthenthicatedUser ,authorizeRoles} = require("../middleware/auth")
const router=express.Router()

// isAuthenticated is a middle ware and contains .next() function which goes to the next middleware
router.route("/events").get(isAuthenthicatedUser,getAllProducts)
router.route("/events/new").post(isAuthenthicatedUser,authorizeRoles("admin","organizerConfirmed"), createAProduct)
router.route("/events/:id").put(isAuthenthicatedUser,authorizeRoles("admin","organizerConfirmed"),updateProduct)
router.route("/products/:id").delete(isAuthenthicatedUser,authorizeRoles("admin","organizerConfirmed"),deleteProduct)
router.route("/events/:id").get(getProductDetails)

module.exports=router