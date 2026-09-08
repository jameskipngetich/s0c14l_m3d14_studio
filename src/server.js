import express from 'express';
import env from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import router from './routes/router.js'

// initialize server
const app = express();

env.config()

app.use(router);
const port = process.env.PORT;
const host = process.env.HOST;
app.listen( port, host, () => {
	console.log(`The server is running at http://${host}:${port}/`);
});
