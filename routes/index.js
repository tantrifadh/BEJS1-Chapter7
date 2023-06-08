const express = require('express');
const router = express.Router();
const product = require('../controller/products');
const component = require('../controller/components');
const supplier = require('../controller/suppliers');
const user = require('../controller/user');
const media = require('../controller/media');
const strorage = require('../utils/strorage');
const nodemailer = require('../utils/nodemailer');
const multer = require('multer')();

const middleware = require('../utils/middleware');

router.get('/', (req, res) => res.status(200).json({message: "welcome to blog api"}));

// oauth
router.post('/auth/register', user.register);
router.post('/auth/login', user.login);
router.get('/auth/oauth', user.googleOauth2);
router.get('/auth/whoami', middleware.auth, user.whoami);

// media handling
router.post('/storage/images', strorage.image.single('media'), media.strogeSingle);
router.post('/storage/multi/images', strorage.image.array('media'), media.storageArray);
router.post('/imagekit/upload', multer.single('media'), media.imagekitUpload);

//mailer
router.get('/test/mailer', async (req, res) => {
  try {
      // send email
      nodemailer.sendMail('tantrifadhillah27@gmail.com', 'coba2', '<h1>Ini adalah data email</h1>');

      return res.status(200).json({
          status: true,
          message: 'success',
          data: null
      });
  } catch (error) {
      throw error;
  }
});

router.get('/', (req, res) => res.status(200).json({message: "welcome to blog api"}));
router.get("/error", (req, res) => {
    let data = {
      status: false,
      message: "error!",
      data: null,
    };
    return res.status(500).json(data);
});


router.get('/products', product.index);
router.get('/products/:product_id', product.show);
router.post('/products', product.store); 
router.put('/products/:product_id', product.update); 
router.delete('/products/:product_id', product.destroy); 

router.get('/components', component.index); 
router.get('/components/:component_id', component.show); 
router.post('/components', component.store);
router.put('/components/:component_id', component.update); 
router.delete('/components/:component_id', component.destroy);

router.get('/suppliers', supplier.index); 
router.get('/suppliers/:supplier_id', supplier.show); 
router.post('/suppliers', supplier.store); 
router.put('/suppliers/:supplier_id', supplier.update); 
router.delete('/suppliers/:supplier_id', supplier.destroy); 

module.exports = router;