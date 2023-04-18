const { json } = require('sequelize');
const {Product} = require('../models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const product = await Product.findAll();

            return res.status(200).json({
                status: true,
                massage: 'success',
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const{product_id} = req.params;
            const product = await Product.findOne({where: {id:product_id}});

            if(!product) {
                return res.status(404).json({
                    status: false,
                    massage: `can't find product id ${product_id}`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                massage: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, quantity} = req.body;
            const product = await Product.create({
                name: name,
                quantity: quantity
            });
            console.log(product);

            return res.status(201).json({
                status: true,
                massage: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {product_id} = req.params;
            const updated = await Product.update(req.body, {where: {id:product_id}});

            if(!updated[0] == [0]) {
                return res.status(404).json({
                    status: false,
                    massage: `can't find product id ${product_id}`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                massage: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {product_id} = req.params;
            const deleted = await Product.destroy({where: {id:product_id}});

            if(!deleted) {
                return res.status(404).json({
                    status: false,
                    massage: `can't find product id ${product_id}`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                massage: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};