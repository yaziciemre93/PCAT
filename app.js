const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override")
const app = express();
const photoController = require("./controllers/photoControllers")
const pageController = require("./controllers/pageController")

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", {
  methods: ["GET","POST"]
})) 

// Routes
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.get("/photos/edit/:id", photoController.editPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/contact", pageController.getContactPage);
app.get("/add", pageController.getAddPage);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
