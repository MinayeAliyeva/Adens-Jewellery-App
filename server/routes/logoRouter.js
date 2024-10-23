const express = require('express');
const multer = require('multer');
const path = require('path');
const Logo = require('../models/logo');

const router = express.Router();

// Şəkil üçün mühafizə yerini təyin edirik
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 'uploads/' qovluğunda saxlayacağıq
  },
  filename: (req, file, cb) => {
    cb(null, `logo_${Date.now()}${path.extname(file.originalname)}`); // Unikal fayl adı
  },
});

// multer middleware
const upload = multer({ storage });

// Logo yükləmək üçün endpoint
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    // Yeni logo məlumatını yaradıb saxlamaq
    const logo = new Logo({
      imageUrl: req.file.path, // Yüklənmiş faylın yolu
    });
    await logo.save();

    res.status(201).json({ message: 'Logo uğurla yükləndi.', logo });
  } catch (error) {
    res.status(500).json({ error: 'Logo yüklənə bilmədi: ' + error.message });
  }
});

// Logo məlumatını əldə etmək üçün endpoint
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
