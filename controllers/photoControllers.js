const Photo = require("../models/Photo")
const fs = require("fs")
const path = require("path")


exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort("-dateCreated");
    res.render("index", { photos });
};

exports.getPhoto  = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render("photo", { photo });
};

exports.createPhoto = async (req, res) => {
    let uploadedImage = req.files.image;
    console.log(uploadedImage);
    let uploadPath = path.join(__dirname, "../") + "public/uploads/" + uploadedImage.name;
    console.log(uploadPath);
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    uploadedImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: "uploads/" + uploadedImage.name,
      });
      res.redirect("/");
    });
};

exports.editPhoto = async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    res.render("edit", {photo})
};

exports.updatePhoto = async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()
    res.redirect(`/photos/${req.params.id}`)
};

exports.deletePhoto = async (req,res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    console.log(__dirname);
    let deletedImage = path.join(__dirname, "../") +"/public/"+ photo.image
    fs.unlinkSync(deletedImage)
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect("/")
};