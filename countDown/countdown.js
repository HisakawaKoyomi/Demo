var WIDTH = 1024;
var HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2019,2,13,16,47,52);
var curShowTimeSeconds = 0;

var balls = [];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    curShowTimeSeconds = getCurTimeSeconds();
    render(context);
};

function getCurTimeSeconds() {
    var curTime = new Date();
    var result = endTime.getTime() - curTime.getTime(); //获取日期对象的时间，使用.getTime
    result = Math.round(result/1000);

    return result >= 0 ? result : 0;
}

function render(ctx) {
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