// 游戏开始入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        // ctx,res 不需要随着每轮游戏的开始/结束而重新创建/销毁，一直存在单例中
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {

        this.director.isGameOver = false;
        // 游戏开始一轮，初始化一轮
        this.dataStore
            .put('background',BackGround)
            .put('land',Land)
            .put('pencil',[])
            .put('birds',Birds)
            .put('startButton',StartButton)
            .put('score',Score);

        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart',e => {
            e.preventDefault();
            if (this.director.isGameOver){
                console.log('游戏开始');
                this.init();
            }else {
                this.director.birdsEvent();
            }
        })
    }
}