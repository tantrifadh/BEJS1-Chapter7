const express = require('express');
const router = express.Router();
const products = require('../controller/products');
const components = require('../controller/components');
const suppliers = require('../controller/suppliers');

router.get('/', (req, res) => res.status(200).json({message: "welcome to blog api"}));

router.get('/products', products.index);
router.get('/products/:product_id', products.show); 
router.post('/products', products.store); 
router.put('/products/:product_id', products.update); 
router.delete('/products/:product_id', products.destroy); 

router.get('/components', components.index);
router.get('/components/:component_id', components.show); 
router.post('/components', components.store); 
router.put('/components/:component_id', components.update); 
router.delete('/components/:component_id', components.destroy);
router.post('/component-suppliers/', components.addSupplierComponent);

router.get('/suppliers', suppliers.index);
router.get('/suppliers/:supplier_id', suppliers.show);
router.post('/suppliers', suppliers.store);
router.put('/suppliers/:supplier_id', suppliers.update);
router.delete('/suppliers/:supplier_id', suppliers.destroy);

module.exports = router;
