const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const GuestDAO = require('../dao/guest-dao');

router.get("/", async (req, res) => {
	let termekek = await new GuestDAO().getProducts();
	let tagek = await new GuestDAO().getTags();
	return res.render("index", {termekek : termekek, tagek : tagek});
});

router.get("/register", async (req, res) => {
	return res.render("register");
});

router.get("/login", async (req, res) => {
	return res.render("login");
});

router.get("/profile", async (req, res) => {
	return res.render("profile");
});

router.get("/product/:nev", async (req, res) => {
	let nev = req.params.nev;
	let termek = await new GuestDAO().getOneProduct(nev);
	return res.render("product", {termek : termek});
});

router.get("/filter/:tag", async (req, res) => {
	let tag_nev = req.params.tag;
	let termekek = await new GuestDAO().getTagsByID(tag_nev);
	let tagek = await new GuestDAO().getTags();
	return res.render("index", {termekek : termekek, tagek : tagek});
});

router.get("/product-update/:nev", async (req, res) => {
	let nev = req.params.nev;
	let termek = await new GuestDAO().getOneProduct(nev);
	return res.render("product-update", {termek : termek});
});

router.post("/search", async (req, res) => {
	let {nev} = req.body;
	let termekek = await new GuestDAO().getNevProduct(nev);
	let tagek = await new GuestDAO().getTags();
	return res.render("index", {termekek : termekek, tagek : tagek});
});

router.post("/update/:nev", async (req, res) => {
    let nev = req.params.nev;
	let {ar} = req.body;
	let {leiras} = req.body;
	let {kep} = req.body;
	await new GuestDAO().updateProduct(nev, ar, leiras, kep);
    res.redirect("/");
});

router.post("/delete/:nev", async (req, res) => {
    let nev = req.params.nev;
	await new GuestDAO().deleteDog(nev);
    res.redirect("/");
});

router.get("/payment", async (req, res) => {
	return res.render("payment");
});

router.post('/pay', async (req, res) => {
	const nodemailer = require('nodemailer');

	let {email} = req.body;
	let {kosar} = req.body;

	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'webshop6656@gmail.com',
	        pass: '123Webshop123'
	    }
	});

	let mailOptions = {
	    from: 'webshop6656@gmail.com',
	    to: email,
	    subject: 'Vásárlás',
	    text: `Kedves Vásárló!\nÖn megvaásárolta az alábbi termékeket:\n${kosar}`
	};

	transporter.sendMail(mailOptions, function(err, data) {
	    if(err) {
	        console.log('Error Occurs: ', err);
	    } else {
	        console.logg('Email sent!!!!');
	    }
	});

	res.redirect('/');
});

router.get('/backup', async (req, res) => {
	const { exec } = require('child_process');
	const db = require('../config/db');

	let dumpFile = 'config/dump.sql';

	console.log(`Starting exporting data from the ${db.options.database} database`);

	exec(`pg_dump postgres://${db.options.user}:${db.options.password}@${db.options.host}:${db.options.port}/${db.options.database} > ${dumpFile}`,  (err, stdout, stderr) => {
		if (err) { console.error(`exec error: ${err}`); return; }

		console.log(`Now, importing data to the ${db.options.database} database`);
	
		exec(`psql postgres://${db.options.user}:${db.options.password}@${db.options.host}:${db.options.port}/${db.options.database} < ${dumpFile}`, (err, stdout, stderr) => {
	        if (err) { console.error(`exec error: ${err}`); return; }

	        console.log(`The import has finished.`);
		});

	});
	res.redirect('/');
});

module.exports = router;