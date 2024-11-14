export class Apple {

    constructor(position){
        this.position = position;
        
        }
        
    draw (ctx, blockSize){
        ctx.save();
        ctx.fillStyle = "#33cc33";
        let radius = blockSize / 2;
        let x = this.position[0]*blockSize + radius;
        let y = this.position[1]*blockSize + radius;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2, true);
        ctx.fill();
        ctx.restore(); 
        }

    
    setNewPosition(widthInBlocks, heightInBlocks) {
        let newX = Math.round(Math.random() * (widthInBlocks - 1));
        let newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
        }
    
    isOnSnake(snakeToCheck){
        const isOnSnake = false;
        for(let i = 0; i < snakeToCheck.body.length; i++){
            if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                isOnSnake = true;
            }
            return isOnSnake;
        }
    }    
        
}
