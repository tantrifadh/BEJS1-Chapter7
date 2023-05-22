const suppliers = require('../../challenge/controllers/suppliers');
const {Suppliers} = require('../models')

module.exports = {
    index: async (req, res, next) => {
        try {
            const suppliers = await Suppliers.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: suppliers
            }) 
 
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const {supplier_id} = req.params;

            const suppliers = await Supplies.findOne({
                where: {id: supplier_id},
                attributes: ['id', 'name', 'description']
            });

            if (!suppliers) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${supplier_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: suppliers
            });

        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, address} = req.body;

            if(!name || !address) {
                return res.status(400).json({
                    status: false,
                    massage: 'Supplier name and address is required',
                    data: null
                });
            }

            const suppliers = await Suppliers.create({
                name: name,
                address: address
            });
            
            return res.status(201).json({
                status: true,
                message:'success',
                data: suppliers
            })
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {supplier_id} = req.params;

            const updated = await Suppliers.update(req.body, {where: {id: supplier_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${supplier_id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {supplier_id} = req.params;

            const deleted = await Supplier.destroy({where: {id: supplier_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${supplier_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};