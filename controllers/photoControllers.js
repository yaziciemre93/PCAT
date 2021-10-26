const Photo = require("../models/Photo")
const fs = require("fs")
const path = require("path")


exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1;
    const photosPerPage = 3;

    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({}).sort("-dateCreated").skip((page-1)*photosPerPage).limit(photosPerPage);
    res.render("index", { photos: photos, current: page, pages: Math.ceil(totalPhotos / photosPerPage) }); 
    /* const photos = await Photo.find({}).sort("-dateCreated");
    res.render("index", { photos }); */
};

exports.getPhoto  = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render("photo", { photo });
};

exports.createPhoto = async (req, res) => {
    let uploadedImage = req.files.image;
    let uploadPath = path.join(__dirname, "../") + "public/uploads/" + uploadedImage.name;
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
    let deletedImage = path.join(__dirname, "../") +"/public/"+ photo.image
    fs.unlinkSync(deletedImage)
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect("/")
};