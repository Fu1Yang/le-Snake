import {Apple} from './apple.js'
window.onload = function() {
   
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 100;
    let snakee;
    let applee;
    let widthInBlocks = canvasWidth/blockSize;
    let heightInBlocks = canvasHeight/blockSize;
    class Snake {
        constructor(body, direction) {
            this.body = body;
            this.direction = direction;
        }

        draw() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (let i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }

        advance() {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    break;
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        }

        setDirection(newDirection) {
            let allowedDirection = [];
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;
                case "up":
                case "down":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw new Error("Invalid Direction");
            }
            if (allowedDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        }
        checkCollision(){
            let wallCollision = false;
            let snakeCollision = false;
            let head = this.body[0];
            let rest = this.body.slice(1);
            let snakeX = head[0];
            let snakeY = head[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlocks - 1;
            let maxY = heightInBlocks - 1;
            let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }
            for (let i = 0; i < rest.length; i++) {

               if (snakeX === rest[i][0] && snakeY === rest[i][1]){
                snakeCollision = true;
               }
            }
            return wallCollision || snakeCollision;
                
            };
        }


    document.onkeydown = function handlekeyDown(e) {
        let key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    };

    init();

    function init() {
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        applee = new Apple([10,10])
        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            
        }
        else{
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw(ctx, blockSize);
            setTimeout(refreshCanvas, delay);
        }
       
     
      
    }

    function drawBlock(ctx, position) {
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }
};
