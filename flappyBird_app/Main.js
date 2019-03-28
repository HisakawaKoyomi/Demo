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
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        this.createBackgroundMusic();
        this.dataStore.canvas = this.canvas;
        // ctx,res 不需要随着每轮游戏的开始/结束而重新创建/销毁，一直存在单例中
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;

        this.init();
    }

    //创建背景音乐
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        //bgm.autoplay = true;
        //bgm.loop = true;
        //bgm.src = 'audios/bgm.mp3';
    }

    init() {

        this.director.isGameOver = false;
        // 游戏开始一轮，初始化一轮
        this.dataStore
            .put('background', BackGround)
            .put('land', Land)
            .put('pencil', [])
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score', Score);

        this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {

        wx.onTouchStart(e => {
            const startButton = this.dataStore.get('startButton');
            if (this.director.isGameOver) {
                if (e.touches[0].clientX >= startButton.x &&
                    e.touches[0].clientX <= startButton.x + startButton.width &&
                    e.touches[0].clientY >= startButton.y &&
                    e.touches[0].clientY <= startButton.y + startButton.height){
                    console.log('游戏开始');
                    this.init();
                }
            } else {
                this.director.birdsEvent();
            }
        })
    }
}