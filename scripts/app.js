import {Weather} from "./components/weather.js";
import {Clock} from "./components/clock.js";
import {Background} from "./components/background.js";
import {Tasks} from "./components/tasks.js";

class App {
    constructor() {
        new Weather();
        new Clock();
        new Background();
        new Tasks();
    }
}

(new App());
