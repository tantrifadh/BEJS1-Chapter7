const {Component} = require('../models')

module.exports = {
    index: async (req, res, next) => {
        try {
            const components = await Component.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: components
            }) 

        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const component = await Component.findOne({where: {id: component_id}});

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component
            });

        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, description} = req.body;

            const product = await Component.create({
                name: name,
                description: description
            });

            console.log(product);

            return res.status(201).json({
                status: true,
                message:'success',
                data: product
            })
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const updated = await Component.update(req.body, {where: {id: component_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
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
            const {component_id} = req.params;

            const deleted = await Component.destroy({where: {id: component_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
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