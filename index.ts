import express, {json, Router} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";

const app = express();
app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

//routes...
const router = Router();
router.use('/adpet', adRouter);
app.use('/api', router);

app.get('/', async (req, res) => {
    throw new ValidationError('Daamn!');
});

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
