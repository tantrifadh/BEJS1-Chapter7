const {Components, Supplier, Component_Supplier} = require('../models')

module.exports = {
    index: async (req, res, next) => {
        try {
            const components = await Components.findAll({
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: Component_Supplier,
                    as: 'component_supplier',
                    attributes: ['id'],
                    include: [
                      {
                        model: Supplier,
                        as: 'supplier',
                        attributes: ['name', 'address']
                      }]
                  }]
            });
            return res.status(200).json({
                status: true,
                message: 'success',
                data: components
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const components = await Components.findOne({
                where: {id: component_id},
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: Component_Supplier,
                    as: 'component_supplier',
                    attributes: ['id'],
                    include: [{
                        model: Supplier,
                        as: 'supplier',
                        attributes: ['name', 'description']
                    }]
                }]
            });

            if (!components) {
                return res.status(404).json({
                    status: false,
                    message: `can't find components with id ${component_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: components
            });

        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, description} = req.body;

            if(!name || !description) {
                return res.status(400).json({
                    status: false,
                    massage: 'Component name and description is required',
                    data: null
                });
            }
            const components = await Components.create({
                name: name,
                description: description
            });

            console.log(product);

            return res.status(201).json({
                status: true,
                message:'success',
                data: components
            })
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const updated = await Components.update(req.body, {where: {id: component_id}});

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

            const deleted = await Components.destroy({where: {id: component_id}});

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
    },
    
    addSupplierComponent: async (req, res, next) => {
        try {
            const {supplier_id, component_id} = req.body;
            const supplier= await Supplier.findOne({where: {id: supplier_id}});

            if(!supplier) {
                return res.status(404).json({
                    status: false,
                    massage: 'Supplier not found',
                    data: null
                });
            }

            const components = await Components.findOne({where: {id: component_id}});
            if(!components) {
                return res.status(404).json({
                    status: false,
                    massage: 'Component not found',
                    data: null
                });
            }

            const componentSupplier = await Component_Supplier.create({supplier_id, component_id});
            
            return res.status(201).json({
                status: true,
                massage: 'success',
                data: componentSupplier
            });
        } catch (error) {
            next(error);
        }
    },

};