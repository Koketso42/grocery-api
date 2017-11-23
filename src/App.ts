import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// import our routers/controllers
import HeroRouter from './routes/HeroRouter';

// Creates and configures an ExpressJS web server.
class App {
	// ref to Express instance
	public express: express.Application;

	//Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
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
	private routes(): void {

		const router = express.Router();

		router.get('/', (req, res, next) => {
			res.json({
				message: 'A basic shopping NodeJS+Typescript api system'
			});
        });
        
		this.express.use('/', router);
		this.express.use('/api/heroes', HeroRouter);
	}
}

export default new App().express;
