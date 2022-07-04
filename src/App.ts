import "reflect-metadata";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {excutionRoutes} from "./exec/routes/excution";
import * as cors from "cors"

/**
 * Register all routes used by the API here
 */
const apiRoutes = [
    excutionRoutes,
];


const app = express();
app.use(bodyParser.json(), cors());

const port = 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});


apiRoutes.map(routes =>
    routes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    })
);
