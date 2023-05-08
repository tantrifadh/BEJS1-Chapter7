const express = require('express');
const router = express.Router();
const product = require('../controller/product');
const component = require('../controller/component');
const supplier = require('../controller/supplier');

router.get('/', (req, res) => res.status(200).json({message: "welcome to blog api"}));

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
