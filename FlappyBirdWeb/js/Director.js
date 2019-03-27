// 导演类
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    run() {
        const backgroundSprite = this.dataStore.get('background');
        backgroundSprite.draw();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }
}