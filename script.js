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
    let score;

    const backgroundMusic = new Audio("./mp3/song.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    


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
            if (!this.ateApple) {
                this.body.pop();
            }
            else{
                this.ateApple = false;
            }
          
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
        isEatingApple(appleToEat){
            let head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1]=== appleToEat.position[1]) {
                   
                 return true;
            }else{
                return false;
                }
        
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
            case 32:
                restart();
                retrun ;   
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
        canvas.style.border = "30px solid blue";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");

        backgroundMusic.play().catch(error => {
            console.log("Erreur de lecture audio:", error);
        });

        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        applee = new Apple([10,10]);
        score = 0;
        refreshCanvas();
    }

    function refreshCanvas() {
        snakee.advance();
        if (snakee.checkCollision()) {
            gameOver();
            console.log("GAME OVER ");  
        }
        else{
            if (snakee.isEatingApple(applee)) {
                score++
                snakee.ateApple = true;
                do{
                    applee.setNewPosition(widthInBlocks, heightInBlocks);
                }
                while (applee.isOnSnake(snakee))
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw(ctx, blockSize);
            drawScore();
            setTimeout(refreshCanvas, delay);
        }
       
     
      
    }

    function drawBlock(ctx, position) {
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    function gameOver(){
        backgroundMusic.pause();
        ctx.save();
        ctx.fillText("Game Over !!!",  5, 15 );
        ctx.fillText("Appuyer sur la touche Espace, pour rejouer", 5, 30);
        ctx.restore();
    }

    function restart(){
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        score = 0;
        applee = new Apple([10,10]);
        refreshCanvas(); 
    }

    function drawScore(){
        ctx.save();
        ctx.fillText(score.toString(), 5, canvasHeight - 5);
        ctx.restore();
    }


};
