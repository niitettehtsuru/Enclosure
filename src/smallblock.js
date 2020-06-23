/*
 * A small block[The blocks that move about in the grid]
 * -----------------------------------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      19th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/Enclosure
 * @codepen:   https://codepen.io/niitettehtsuru/pen/oNbWwRP
 * @license:   GNU General Public License v3.0 
 */ 
class SmallBlock
{
    constructor(xCoord,yCoord,size,bigBlocks,fillColor)
    {       
        this.id = ~~((Math.random() * 100000000) + 1);; 
        this.xCoord = xCoord;
        this.yCoord = yCoord;  
        this.size = size;//length and breadth of the block. Since its a square, length is same as breadth.  
        this.fillColor = fillColor;      
        this.unitDistance = 4;//distance moved per animation frame   
        this.bigBlocks  = bigBlocks;
        this.smallBlocks = []; 
        this.speed   = this.setInitialSpeed(); 
        this.hasCollidedWithABigBlock = false;  
        this.hasCollidedWithAWall = false; 
    } 
    setSmallBlocks(smallBlocks)
    {
        this.smallBlocks = smallBlocks; 
    } 
    //Sets the speed at start. Block is set to only move perpendicular to the x-axis or the y-axis. 
    setInitialSpeed()
    {
        let x = 0;
        let y = 0;
        //flip a coin to decide if block moves horizontally or vertically 
        if(Math.random() > 0.5)//for horizontal movement    
        { 
            x = Math.random() > 0.5? -this.unitDistance: this.unitDistance;//flip a coin to decide if block moves left or right 
        }
        else//for vertical movement
        {
            y = Math.random() > 0.5? -this.unitDistance: this.unitDistance;//flip a coin to decide if block moves upwards or downwards
        } 
        return {x:x,y:y};  
    }
    //detects collision of this block with another block
    hasTouchedABlock(otherBlock)
    {
        let topEdgeOfThisBlock = this.yCoord + this.size;
        let rightEdgeOfThisBlock = this.xCoord + this.size; 
        let leftEdgeOfThisBlock = this.xCoord;
        let bottomEdgeOfThisBlock = this.yCoord;
        let topEdgeOfOtherBlock = otherBlock.yCoord + otherBlock.size;
        let rightEdgeOfOtherBlock = otherBlock.xCoord + otherBlock.size; 
        let leftEdgeOfOtherBlock = otherBlock.xCoord;
        let bottomEdgeOfOtherBlock = otherBlock.yCoord;  
        if
        ( 
            leftEdgeOfThisBlock < rightEdgeOfOtherBlock && 
            rightEdgeOfThisBlock > leftEdgeOfOtherBlock && 
            bottomEdgeOfThisBlock < topEdgeOfOtherBlock && 
            topEdgeOfThisBlock > bottomEdgeOfOtherBlock
        )
        {
            return true;//there is a collision 
        }
        return false;
    } 
    //determines the direction to move after this block collides on its top or bottom edge
    setDirectionAfterVerticalHit()
    {
        //after a bottom or up hit, block can either go in the opposite direction vertically, right or left.
        //flip a coin to decide
        if(Math.random() > 0.5)//for going in the opposite direction vertically 
        {
            this.speed.x = 0;
            this.speed.y = -this.speed.y; 
        }
        else//for going right or left
        {
            this.speed.x = Math.random() > 0.5? this.unitDistance: -this.unitDistance; 
            this.speed.y = 0; 
        }
    } 
    //determines the direction to move after this block collides on its right or left edge
    setDirectionAfterHorizontalHit()
    {
        //after a right or left hit, block can either go in the opposite direction horizontally, up or down 
        //flip a coin to decide
        if(Math.random() > 0.5)//for going in the opposite direction horizontally 
        {
            this.speed.x = -this.speed.x;
            this.speed.y = 0;
        }
        else//for going up or down
        {
            this.speed.x = 0;
            this.speed.y = Math.random() > 0.5? this.unitDistance: -this.unitDistance; 
        }
    }
    blockHitsLeftWall(horizontalOffset)
    {
        if(this.xCoord < horizontalOffset)
        {
            return true;
        }
        return false; 
    }
    blockHitsRightWall(width)
    {
        if(this.xCoord + this.size > width)
        {
            return true;
        }
        return false;
    }
    blockHitsTopWall(verticalOffset)
    {
        if(this.yCoord < verticalOffset)
        {
            return true;
        }
        return false; 
    }
    blockHitsBottomWall(height)
    {
        if(this.yCoord + this.size > height)
        {
            return true;
        }
        return false; 
    }   
    checkCollisionWithWall(width,horizontalOffset,verticalOffset,height)
    {
        if(this.blockHitsLeftWall(horizontalOffset))
        {
            this.xCoord = horizontalOffset;//ensure block never goes beyond the left edge 
            this.setDirectionAfterHorizontalHit();
            this.hasCollidedWithAWall = true;
        }
        else if(this.blockHitsRightWall(width - horizontalOffset))
        {
            this.xCoord = width - horizontalOffset - this.size-1;//ensure block never goes beyond the right edge 
            this.setDirectionAfterHorizontalHit(); 
            this.hasCollidedWithAWall = true;
        }
        else if(this.blockHitsTopWall(verticalOffset))
        {
            this.yCoord = verticalOffset;//ensure block never goes beyond the top edge 
            this.setDirectionAfterVerticalHit(); 
            this.hasCollidedWithAWall = true;
        }
        else if(this.blockHitsBottomWall(height - verticalOffset))
        {
            this.yCoord = height - verticalOffset - this.size-1;//ensure block never goes beyond the bottom edge 
            this.setDirectionAfterVerticalHit();
            this.hasCollidedWithAWall = true; 
        }  
    } 
    checkCollisionWithBigBlocks()
    {
        for(let i = 0; i < this.bigBlocks.length; i++)//check for collision with big blocks
        { 
            let block = this.bigBlocks[i]; 
            if(this.hasTouchedABlock(block))
            {   
                if(this.speed.x > 0)//if this block is moving right
                { 
                    
                    if(block.yCoord + block.size <= this.yCoord)//if big block is right above this block
                    {
                        continue;//ignore it
                    } 
                    this.xCoord = block.xCoord - this.size - 1;//back off slightly to the left
                    this.setDirectionAfterHorizontalHit();//change direction to go either right,up or down
                    this.hasCollidedWithABigBlock=true;
                    break; 
                }
                else if(this.speed.x < 0)//if this block is moving left
                {
                    if(block.yCoord + block.size <= this.yCoord)//if big block is right above this block
                    {
                        continue;//ignore it
                    } 
                    this.xCoord = block.xCoord + block.size + 1;
                    this.setDirectionAfterHorizontalHit(); 
                    this.hasCollidedWithABigBlock=true;
                    break; 
                }
                else if(this.speed.y > 0)//if this block is moving down
                {
                    
                    if(block.xCoord + block.size <= this.xCoord)//if big block is to the immediate left of this block
                    {
                        continue;//ignore it
                    }  
                    this.yCoord = block.yCoord - this.size - 1;
                    this.setDirectionAfterVerticalHit();
                    this.hasCollidedWithABigBlock=true;    
                    break; 
                }
                else if(this.speed.y < 0)//if this block is moving up
                { 
                    if(block.xCoord + block.size <= this.xCoord)//if big block is to the immediate left of this block
                    {
                        continue;//ignore it
                    }  
                    this.yCoord = block.yCoord + block.size + 1;
                    this.setDirectionAfterVerticalHit(); 
                    this.hasCollidedWithABigBlock=true;
                    break; 
                } 
            } 
        } 
    } 
    checkCollisionWithSmallBlocks()
    {
        for(let i = 0; i < this.smallBlocks.length; i++)//check for collision with other small blocks
        { 
            let block = this.smallBlocks[i]; 
            if(block.id !== this.id && this.hasTouchedABlock(block))
            {    
                if(this.speed.x > 0)//if this block is moving right
                {  
                    if(block.yCoord + block.size <= this.yCoord)//if other block is right above this block
                    {
                        continue;//ignore
                    }  
                    this.xCoord = block.xCoord - this.size - 1;//back off slightly to the left 
                    this.setDirectionAfterHorizontalHit();  
                    break;
                }
                else if(this.speed.x < 0)//if this block is moving left
                { 
                    if(block.yCoord + block.size <= this.yCoord)//if other block is right above this block
                    {
                        continue;//ignore
                    } 
                    this.xCoord = block.xCoord + block.size + 1;//back off slightly to the right
                    this.setDirectionAfterHorizontalHit();  
                    break; 
                }
                else if(this.speed.y > 0)//if this block is moving down
                { 
                    if(block.xCoord + block.size <= this.xCoord)//if other block is to the immediate left of this block
                    {
                        continue;//ignore
                    } 
                    this.yCoord = block.yCoord - this.size - 1;//back off slightly to the top
                    this.setDirectionAfterVerticalHit();  
                    break;
                }
                else if(this.speed.y < 0)//if this block is moving up
                {
                    if(block.xCoord + block.size <= this.xCoord)//if other block is to the immediate left of this block
                    {
                        continue;//ignore
                    }
                    this.yCoord = block.yCoord + block.size + 1;//back off slightly to the bottom 
                    this.setDirectionAfterVerticalHit();  
                    break; 
                } 
            } 
        } 
    } 
    update(width,horizontalOffset,height,verticalOffset)
    {     
        this.hasCollidedWithABigBlock=false; 
        this.hasCollidedWithAWall = false;
        //keep the block moving in its current direction 
        this.xCoord += this.speed.x;//if block is going left or right, keep it going
        this.yCoord += this.speed.y;//if block is going up or down, keep it going   
        
        this.checkCollisionWithBigBlocks(); 
        if(!this.hasCollidedWithABigBlock)
        {
            this.checkCollisionWithWall(width,horizontalOffset,verticalOffset,height); 
            if(!this.hasCollidedWithAWall)
            {
                this.checkCollisionWithSmallBlocks();
            }  
        }   
    }
    draw()//draw the small block 
    {     
        fill(this.fillColor);  
        rect(this.xCoord,this.yCoord,this.size,this.size);     
    } 
} 
 