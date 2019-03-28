// 铅笔的基类
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Pencil extends Sprite{
    constructor(image,top) {
        super(image,
            0,0,
            image.width,image.height,
            window.innerWidth,0,
            image.width,image.height);

        this.top = top;
    }

    draw() {
        this.x = this.x - Director.getInstance().landSpeed;
        super.draw(this.img,
            this.srcX,this.srcY,
            this.srcW,this.srcH,
            this.x,this.y,
            this.width,this.height
        );

    }
}