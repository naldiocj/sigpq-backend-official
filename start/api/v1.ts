
import { resolve } from "path";
import context from "./context";

const state: string[] = [];

function loadRoutes(path, ApiRoute, Route) {

    const req = context(path, true, /\.routes\.ts$/);

    state.length = 0

    req.keys().forEach(async (filename) => {
        state.push(filename);
    });

    state.forEach(async (filename) => {
        const m = require(filename).default;
        return m(ApiRoute, Route);
    });

    return state;

}

export default function (Route) {

    const ApiRoute = (registerCallback) => {
        return Route.group(registerCallback).prefix(`api/v1/`);
    };

    ["../../addons", "./v1", "./extra"].forEach((path) => {
        loadRoutes(resolve(__dirname, path), ApiRoute, Route);
    });
}