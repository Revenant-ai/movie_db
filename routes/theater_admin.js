const express = require('express')
const router = express.Router()
const {Add_show,get_shows,get_show_movie,Add_screen,Get_screen,Get_show} = require("../controllers/theater_admin")

router.route("/addshow").post(Add_show)
router.route("/getshow-theat").get(get_shows)
router.route("/getshow-movie").get(get_show_movie)
router.route("/addscreen").post(Add_screen)
router.route("/getscreen").get(Get_screen)
router.route("/getshow").get(Get_show)

module.exports=router