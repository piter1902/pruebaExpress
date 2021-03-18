import Express from 'express';
import bodyParser from 'body-parser';
import userRoute from './route/userRoute';
import "./models/db";
import logger from '@poppinss/fancy-logs';

logger.info("Modelos creados");

const app = Express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Express.Request, res: Express.Response) => res.status(200).send("Hello world"));

// Controlador para los usuarios
app.use("/user", userRoute);

app.listen(port, () => console.log(`Listening at ${port} 🛠`))