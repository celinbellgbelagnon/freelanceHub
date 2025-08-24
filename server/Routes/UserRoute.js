const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserCtrl'); 
const multer = require('multer');
const path = require('path');

// Configuration multer pour le CV
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cv/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Seuls les fichiers PDF sont autorisés !'), false);
  }
});

// Routes
router.post('/signup', upload.single('cv'), userController.signupUser); 
router.post('/login', userController.loginUser);
router.get('/count/freelances', userController.countFreelances);
router.get('/count', userController.countUsers);   
router.get("/:id", userController.getUserById);
router.post("/:id/uploadPhoto", userController.uploadPhotoMiddleware, userController.uploadPhoto);

module.exports = router;
