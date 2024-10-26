

const express = require("express");
const multer = require("multer");
const path = require("path");
const { Logo } = require("../models/logo");
const fs = require("fs");

const router = express.Router();
const uploadDir = path.join(__dirname, "../public/logoImg");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
router.post("/logo", upload.single("logo"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Logo faylı yüklənməyib." });
  }

  const basePath = `${req.protocol}://${req.get("host")}/public/logoImg/`;
  const logoImgUrl = `${basePath}${file.filename}`;

  try {
    const existingLogo = await Logo.findOne();
    const logosArray = existingLogo ? existingLogo.logos : [];
    await Logo.deleteMany({});
    
    const newLogo = {
      url: logoImgUrl,
    };

    const logo = new Logo({
      logos: [...logosArray, newLogo],
      currentlyLogo: logoImgUrl,
    });

    const result = await logo.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: "Logo yaratma zamanı xəta", error });
  }
});

router.get("/logo", async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).send(logos);
  } catch (error) {
    res.status(400).send({ message: "Logoları əldə edərkən xəta baş verdi", error });
  }
});

router.put("/logo/:id", async (req, res) => {
  const logoId = req.params.id; 

  try {
    const logo = await Logo.findOne();
    if (!logo) return res.status(404).send({ message: "Logo tapılmadı." });

    const findedLogo = logo.logos?.find(item => {
      return item._id.toString() === logoId;
    });

    if (findedLogo) {
      logo.currentlyLogo = findedLogo.url; 
    }

    await logo.save(); 
    res.status(200).send({ message: "Currently logo uğurla yeniləndi.", logo });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Currently logo yeniləmə zamanı xəta", error });
  }
});

router.delete("/logo/:id", async (req, res) => {
  const logoId = req.params.id; 
  try {
    const mainLogoDoc = await Logo.findOne();
    if (!mainLogoDoc) return res.status(404).send({ message: "Main Logo document not found." });

    const logoToDelete = mainLogoDoc.logos.find(logo => logo._id.toString() === logoId);
    if (!logoToDelete) return res.status(404).send({ message: "Logo not found in the array." });
    const filePath = path.join(__dirname, "../public/logoImg", path.basename(logoToDelete.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    mainLogoDoc.logos = mainLogoDoc.logos.filter(logo => logo._id.toString() !== logoId);

    await mainLogoDoc.save();

    res.send({ message: "Logo successfully deleted.", mainLogoDoc });
  } catch (error) {
    res.status(400).send({ message: "Error while deleting logo", error });
  }
});


module.exports = router;
