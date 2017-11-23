"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// import our routers/controllers
const HeroRouter_1 = require('./routes/HeroRouter');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        // express middleware
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(cookieParser());
        this.express.use(logger('dev'));
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(cors());
        // cors
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    // Configure API endpoints (routes).
    routes() {
        const router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'A basic shopping NodeJS+Typescript api system'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/heroes', HeroRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
