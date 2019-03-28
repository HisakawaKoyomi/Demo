// 小鸟类
// 循环渲染三只小鸟
import {Sprite} from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js"

export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage('birds');
        super(image,0,0,
            image.width,image.height,
            0,0,
            image.width,image.height);

        // 小鸟的宽为34，高为24，上下边距10，左右边距9
        this.clippingX = [9,
        9+34+18,
        9+34+18+34+18];
        this.clippingY = [10,10,10];
        this.clippingWidth = [34,34,34];
        this.clippingHeight = [24,24,24];
      const birdX = DataStore.getInstance().canvas.width / 4;
      const birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsX = [birdX,birdX,birdX];
        this.birdsY = [birdY,birdY,birdY];
        const birdWidth = 34;
        const birdHeight = 24;
        this.birdsWidth = [birdWidth,birdWidth,birdWidth];
        this.birdsHeight = [birdHeight,birdHeight,birdHeight];
        this.index = 0;
        this.count = 0; // 小鸟切换
        this.time = 0; //对应的数组索引
        this.y = [birdY,birdY,birdY]; // 小鸟的初始高度
    }

    draw(){
        const speed = 0.2;
        this.count = this.count + speed;
        if (this.index >= 2){
            this.count = 0;
        }
        this.index = Math.floor(this.count); //若为小数，某些索引无法取出，导致缺帧

        // 模拟重力加速度
        const g = 0.98 / 20.4;
        const up = 50;
        const offsetY = (g * this.time * (this.time-up)) / 2;
        for (let i = 0;i <= 2;i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(this.img,
            this.clippingX[this.index],
            this.clippingY[this.index],
            this.clippingWidth[this.index],
            this.clippingHeight[this.index],
            this.birdsX[this.index],
            this.birdsY[this.index],
            this.birdsWidth[this.index],
            this.birdsHeight[this.index]
        )

    }
}