const express = require('express');
const app = express();
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const {
    HTTP_PORT = 3000
} = process.env;

const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use(morgan('dev'));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const router = require('./routes');
app.use(router);

// 500
app.use((err, req, res, next) => {
    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

app.listen(HTTP_PORT, () => console.log('running on port', HTTP_PORT));