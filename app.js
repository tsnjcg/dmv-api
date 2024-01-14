const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');
const flatted = require('flatted');
const moment = require('moment');
const apiDoc = require('./api/api-doc');
const apiKeys = require('./api/security/api-keys');
const app = express();

console.log('############env ', process.env.NODE_ENV, process.env.PORT);

app.listen(process.env.PORT || '3000');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// OpenAPI UI
app.use(
	'/api-documentation',
	swaggerUi.serve,
	swaggerUi.setup(null, {
		swaggerOptions: {
			url: 'http://localhost:3000/api-docs'
		}
	})
);

// OpenAPI routes
initialize({
	app,
	apiDoc,
	paths: './api/paths',
	errorMiddleware: (err, req, res, next) => {
		if (err) {
			res.status(err.status).send(err);
		}
		next(err);
	},
//	securityHandlers: {
//		keyScheme: (req, scopes, definition) => {
//			const auth = apiKeys.validate(req.header('x-api-key'), req.header('x-api-secret'));
//			if (!auth) throw {
//				status: 401,
//				message: 'Unauthorized'
//			};
//			return Promise.resolve(auth);
//		}
//	}
});

const recentRequests = [];

//app.use((req, res, next) => {
//	try {
//		const now = moment().utc().valueOf();
//		const recentRequestCount = recentRequests.filter(
//			timestamp => (now - 10000) - timestamp < 0
//		) .length;
//
//		recentRequests.push(now);
//
//		if (recentRequestCount >= 5) {
//			res.setHeader('Retry-After', 10);
//			return res.sendStatus(429);
//		}
//	} catch (err) {
//		console.error(err);
//		return res.sendStatus(500);
//	}
//	next();
//});

console.log('App running on port http://localhost:3000');
console.log('OpenAPI documentation available in http://localhost:3000/api-documentation');

module.exports = app;









