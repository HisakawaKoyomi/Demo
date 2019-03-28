// 导演类
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.landSpeed = 2;
    }
    
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencil').push(new UpPencil(top));
        this.dataStore.get('pencil').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0;i <= 2;i++){
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    static isStrike(bird,pencil) {
        let flag = true;
        if (bird.top > pencil.bottom ||
        bird.bottom < pencil.top ||
        bird.left > pencil.right ||
        bird.right < pencil.left){
            flag = false;
        }

        return flag;
    }

    check() {
        const land = this.dataStore.get('land');
        const birds = this.dataStore.get('birds');
        const pencils = this.dataStore.get('pencil');
        const score = this.dataStore.get('score');

        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        for (let i = 0;i < pencils.length;i++){
            const pencil = pencils[i];
            const pencilsBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder,pencilsBorder)){
                console.log('撞击水管啦');
                this.isGameOver = true;
                return; // 不进行后续判断
            }
        }

        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
            console.log('撞击地板啦');
            this.isGameOver = true;
            return; // 不用进行后续判断
        }

        // 计分判断
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore){
            score.scoreNumber++;
            score.isScore = false;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver){
            this.dataStore.get('background').draw();
            const pencils = this.dataStore.get('pencil');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }
            if (pencils[0].x <= (window.innerWidth - pencils[0].width)/2 && pencils.length === 2){
                this.createPencil();
            }

            this.dataStore.get('pencil').forEach(value => {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer',timer);
        }else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }
}