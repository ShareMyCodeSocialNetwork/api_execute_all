import {
    javaExcution,
} from "../controllers";
import {jsExcution} from "../controllers/excution/jsExcution";
import {pythonExcution} from "../controllers/excution/pythonExcution";
import {rubyExcution} from "../controllers/excution/rubyExcution";


export const excutionRoutes = [
    { path: "/excution/java", method: "post", action: javaExcution },
    { path: "/excution/js", method: "post", action: jsExcution },
    { path: "/excution/python", method: "post", action: pythonExcution },
    { path: "/excution/ruby", method: "post", action: rubyExcution },
];
