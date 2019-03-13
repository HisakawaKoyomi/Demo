var WIDTH = 1024;
var HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const startTime = new Date();
const endTime = new Date(startTime.getTime() + 60*60*1000);
var curShowTimeSeconds = 0;

var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    curShowTimeSeconds = getCurTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    },50);
};

function getCurTimeSeconds() {
    var curTime = new Date();
    var result = endTime.getTime() - curTime.getTime(); //获取日期对象的时间，使用.getTime
    result = Math.round(result/1000);

    return result >= 0 ? result : 0;
}

function update() {
    var nextShowTimeSeconds = getCurTimeSeconds();

    var nextHour = parseInt(nextShowTimeSeconds / 3600);
    var nextMin = parseInt((nextShowTimeSeconds - 3600 * nextHour)/60);
    var nextSec = parseInt(nextShowTimeSeconds % 60);

    var curHour = parseInt(curShowTimeSeconds/3600);
    var curMin = parseInt((curShowTimeSeconds - curHour*3600)/60);
    var curSec = parseInt(curShowTimeSeconds % 60);
    if (nextSec != curSec){
        if (parseInt(nextHour/10) != parseInt(curHour/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHour/10));
        }
        if (parseInt(nextHour%10) != parseInt(curHour%10)){
            addBalls(MARGIN_LEFT + (2*7+1)*(RADIUS + 1),MARGIN_TOP,parseInt(curHour%10));
        }
        if (parseInt(nextMin/10) != parseInt(curMin/10)){
            addBalls(MARGIN_LEFT + ((2*4+1)+30)*(RADIUS + 1),MARGIN_TOP,parseInt(curMin/10));
        }
        if (parseInt(nextMin%10) != parseInt(curMin%10)){
            addBalls(MARGIN_LEFT + ((2*7+1)+39)*(RADIUS + 1),MARGIN_TOP,parseInt(curMin%10));
        }
        if (parseInt(nextSec/10) != parseInt(curSec/10)){
            addBalls(MARGIN_LEFT + ((2*4+1)+69)*(RADIUS + 1),MARGIN_TOP,parseInt(curSec/10));
        }
        if (parseInt(nextSec%10) != parseInt(curSec%10)){
            addBalls(MARGIN_LEFT + ((2*7+1)+78)*(RADIUS + 1),MARGIN_TOP,parseInt(curSec%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    console.log(balls.length);
    updateBalls();
}

function updateBalls() {
    for (var i = 0;i < balls.length;i++){ //更新散落小球的状态
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= HEIGHT - RADIUS ){ //碰撞检测
            balls[i].y = HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }

    var temp = 0;
    for (var j = 0;j < balls.length;j++){ //不一定先进栈的先不满足条件，所以需要边循环边重新排序
        if (balls[j].x + RADIUS > 0 && balls[j].x - RADIUS < WIDTH){
            balls[temp++] = balls[j];
        }
    }

    while (balls.length > temp){ //对原数组修改，要用while循环
        balls.pop();
    }
}

function addBalls(x,y,num) {
    for (var i = 0;i < digit[num].length;i++){
        for (var j = 0;j < digit[num][0].length;j++){
            if (digit[num][i][j] == 1){
                var aBall = {
                    x: x+(2*j+1)*(RADIUS+1),
                    y: y+(2*i+1)*(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                };
                console.log("push");

                balls.push(aBall);
            }
        }
    }

}

function render(ctx) {

    ctx.clearRect(0,0,WIDTH,HEIGHT);

    var hour = parseInt(curShowTimeSeconds/3600);
    var min = parseInt((curShowTimeSeconds - hour*3600)/60);
    var sec = parseInt(curShowTimeSeconds % 60);

    renderDigit(ctx,MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10));
    renderDigit(ctx,MARGIN_LEFT + (2*7+1)*(RADIUS + 1),MARGIN_TOP,parseInt(hour%10));
    renderDigit(ctx,MARGIN_LEFT + ((2*7+1)+15)*(RADIUS + 1),MARGIN_TOP,10);
    renderDigit(ctx,MARGIN_LEFT + ((2*4+1)+30)*(RADIUS + 1),MARGIN_TOP,parseInt(min/10));
    renderDigit(ctx,MARGIN_LEFT + ((2*7+1)+39)*(RADIUS + 1),MARGIN_TOP,parseInt(min%10));
    renderDigit(ctx,MARGIN_LEFT + ((2*7+1)+54)*(RADIUS + 1),MARGIN_TOP,10);
    renderDigit(ctx,MARGIN_LEFT + ((2*4+1)+69)*(RADIUS + 1),MARGIN_TOP,parseInt(sec/10));
    renderDigit(ctx,MARGIN_LEFT + ((2*7+1)+78)*(RADIUS + 1),MARGIN_TOP,parseInt(sec%10));

    for (var i = 0;i < balls.length;i++){

        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(ctx,x,y,num) {
    ctx.fillStyle = "rgb(0,102,153)";

    for (var i = 0;i < digit[num].length;i++){
        for (var j = 0;j < digit[num][0].length;j++){
            if (digit[num][i][j] == 1){
                ctx.beginPath();
                ctx.arc(x+(2*j+1)*(RADIUS+1),y+(2*i+1)*(RADIUS+1),RADIUS,0,2*Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}