const express = require('express');
const multer = require('multer');
const path = require('path');
const Logo = require('../models/logo');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `logo_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const logo = new Logo({
      imageUrl: req.file.path,
    });
    await logo.save();

    res.status(201).json({ message: 'Logo uğurla yükləndi.', logo });
  } catch (error) {
    res.status(500).json({ error: 'Logo yüklənə bilmədi: ' + error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) {
      return res.status(404).json({ message: 'Logo tapılmadı.' });
    }
    res.json(logo);
  } catch (error) {
    res.status(500).json({ error: 'Logo məlumatı əldə oluna bilmədi: ' + error.message });
  }
});

module.exports = router;
