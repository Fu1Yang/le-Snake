window.onload = function()
{
    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 100;
    let snakee;

    class Snake {
        constructor(body,direction) {
            this.body = body;
            this.direction = direction;
            this.draw = function () {
                ctx.save();
                ctx.fillStyle = "#ff0000";
                for (let i = 0; i < this.body.length; i++) {
                    drawBlock(ctx, this.body[i]);  
                }
                ctx.restore();
            };
            this.advance = function () {
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
            };
        }
      setDirection(direction){
        return this.direction = direction;
      }
    }
    this.setDirection(newDirection){
        const allowedDirection;
        switch (this.direction)
        {
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                allowedDirection = ["up", "down"];
                break;
            case "down":
                nextPosition[1] += 1;
                break; 
            case "up":
                allowedDirection = ["left", "right"]
                break;  
            default:
                throw ("Invalid Direction");
                
                break;
        }
        if (allowedDirection.indexOf(newDirection)> -1) {
            this.direction = newDirection;
        }
    }

    document.onkeydown = function handlekeyDown(e){
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
                break;
        }
    }
    init();
    
    function init(){
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6.4],[5,4],[4,4]], "right");
        refreshCanvas();
    }
    function refreshCanvas()
    {   
        ctx.clearRect(0,0,canvasWidth, canvasHeight)
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    }
    function drawBlock(ctx, position){
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize );
    }

 
     






}