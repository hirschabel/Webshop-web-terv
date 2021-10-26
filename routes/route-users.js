const express = require("express");
const router = express.Router();
const UserDAO = require('../dao/user-dao');


router.get("/profile", async (req, res) => {
	return res.render("profile-user");
});
/*
router.post("/add", async (req, res) => {
  let {name} = req.body;
  let {age} = req.body;
  await new DogDAO().createDog(name, age);
  return res.redirect('/')
  });
  
router.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let dog = await new DogDAO().getOneDog(id);
    res.render("update-dog", { model: dog });
  });
  
router.post("/update/:id", async (req, res) => {
    let id = req.params.id;
    let {name} = req.body;
    let {age} = req.body;
    await new DogDAO().updateDog(id, name, age);
    res.redirect("/");
  });
  
router.post("/delete/:id", async (req, res) => {
    let id = req.params.id;
    await new DogDAO().deleteDog(id);
    res.redirect("/");
  });
*/
module.exports = router;