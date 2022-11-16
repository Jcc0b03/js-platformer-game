class Controll {
    constructor(player, frameTime) {
        this.player = player
        this.body = document.querySelector("body")
        this.ft = frameTime

        this.maxBombDelay = 5
        this.bombHoldFrames = 10

        // this.keyUp = "ArrowUp"
        // this.keyDown = "ArrowDown"
        // this.keyLeft = "ArrowLeft"
        // this.keyRight = "ArrowRight"

        this.keyUp = "w"
        this.keyDown = "s"
        this.keyLeft = "a"
        this.keyRight = "d"
        this.jump = "w"
        this.bomb = " "

        this.isKeyUp = false
        this.isKeyDown = false
        this.isKeyLeft = false
        this.isKeyRight = false
        this.isJump = false
        this.isBomb = false

        this.addEL()
    }

    addEL(){
        console.log("added el")
        this.body.addEventListener("keydown", (e) => {
            // if (e.key == this.keyUp){
            //     this.isKeyUp = true
            // }
            // if (e.key == this.keyDown){
            //     this.isKeyDown = true
            // }
            if (e.key == this.keyLeft){
                this.isKeyLeft = true
            }
            if (e.key == this.keyRight){
                this.isKeyRight = true
            }
            if (e.key == this.jump){
                this.isJump = true
            }
            if (e.key == this.bomb){
                this.isBomb = true
            }
        })
        this.body.addEventListener("keyup", (e) => {
            // if (e.key == this.keyUp){
            //     this.isKeyUp = false
            // }
            // if (e.key == this.keyDown){
            //     this.isKeyDown = false
            // }
            if (e.key == this.keyLeft){
                this.isKeyLeft = false
            }
            if (e.key == this.keyRight){
                this.isKeyRight = false
            }
            if (e.key == this.jump){
                this.isJump = false
            }
            if (e.key == this.bomb){
                this.isBomb = false
            }
        })
    }

    tick(){
        if (this.isKeyUp){
            this.player.moveUp()
        }
        if (this.isKeyDown){
            this.player.moveDown()
        }
        if (this.isKeyLeft){
            this.player.moveLeft()
            this.player.setState(1)
        }
        if (this.isKeyRight){
            this.player.moveRight()
            this.player.setState(2)
        }
        if (this.isJump) {
            this.player.jump()
        }
        if (this.isBomb){
            this.bombHoldFrames += 1
        }
        console.log(this.bombHoldFrames * this.ft * 2, !this.isBomb)
        if ((this.bombHoldFrames > 10 && !this.isBomb) ||
            (this.bombHoldFrames * this.ft * 2 > this.maxBombDelay * 1000 * 2)){
            this.player.dropBomb(this.bombHoldFrames * this.ft * 2 * 2)
            this.bombHoldFrames = 10
            this.isBomb = false
        }
    
        if (!(this.isKeyRight || this.isKeyLeft)){
            this.player.setState(0)
            this.player.decelerateX()
        }
    
        if (!(this.isKeyUp || this.isKeyDown)){
            this.player.decelerateY()
        }
    }
}