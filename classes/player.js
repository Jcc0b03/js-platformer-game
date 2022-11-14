class Player{
    constructor(health, maxSpeed, jumpHeight){
        this.health = health
        this.maxSpeed = maxSpeed
        this.jumpHeight = jumpHeight
    }

    //starting position
    X = 0;
    Y = height-58;

    //movement variables
    playerCurrentSpeed = 0;
    jumpHeight = 20;

    canMoveRight = true;
    isMovingRight = false;
    canMoveLeft = true;
    isMovingLeft = false;

    isGrounded = true;
    jumpStartedFlag = false;

    //graphics
    playerSprite = new Image();
    playerState = 0 //0 - idle; 1 - walk;
    animationFrame = 0;
    playerAnimationFrame = 0

    async animate(){
        if(this.isGrounded){
            switch(this.playerState){
                case 0:
                    if(this.animationFrame > graphics.player.idleAnimationSize-1){
                        this.animationFrame = 0
                    }
                    this.playerSprite.src = graphics.player.idle[this.animationFrame];
                    break
                case 1:
                    if(this.animationFrame > graphics.player.walkAnimationSize-1){
                        this.animationFrame = 0
                    }
                    //when moving left or right diffrent animation
                    if(this.playerCurrentSpeed>0){
                        this.playerSprite.src = graphics.player.walkRight[this.animationFrame];
                    }else{
                        this.playerSprite.src = graphics.player.walkLeft[this.animationFrame];
                    }
                    break;
            }
        }else{
            if(!this.jumpStartedFlag){
                for(let jumpAnimationFrame=0;jumpAnimationFrame<graphics.player.jumpAnimationSize-1;jumpAnimationFrame++){
                    this.playerSprite.src = graphics.player.jump[jumpAnimationFrame];
                    console.log(this.jumpAnimationFrame)
                    await sleep(60);
                }
                this.jumpStartedFlag=true;
            }else{
                this.playerSprite.src = graphics.player.jump[2];
            }
        }
        this.animationFrame += 1
    }

    async render(){
        await mainGameCanvas2dContext.drawImage(this.playerSprite, this.X, this.Y)
    }

    update(){
        this.X += this.playerCurrentSpeed
    }

    setSpeed(speed){
        this.playerCurrentSpeed = speed 
    }

    setState(state){
        this.playerState = state 
    }

    dropBomb(){
        let bomb = new Bomb(1000, 100, 25, this.X, this.Y-30);
        bombObjects.push(bomb);
    }
}

let playerObject = new Player(100, 10, 20);