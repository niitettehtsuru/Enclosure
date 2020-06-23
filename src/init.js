/*
 * Sets everything up
 * ------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      19th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/Enclosure
 * @codepen:   https://codepen.io/niitettehtsuru/pen/oNbWwRP
 * @license:   GNU General Public License v3.0 
 */
let bigBlocks = [];
let smallBlocks = []; 
let blockLength = 50;//length of a side of a big block  
let horizontalOffset = 0; 
let verticalOffset = 0;
let backgroundColor = 'rgba(0,0,0,0.05)';//black 
//get the upper left vertex of each square to be created 
function getBlockVertices(blockLength,windowSize)//divide the canvas into blocks 
{
    let 
    bigBlockVertices = [],
    smallBlockVertices = [];  
    //How many blocks can be set on the canvas horizontally?
    let numHorizontal = ~~(windowSize.width/blockLength);//num of blocks that can be packed horizontally
    let horizontalRemainder = windowSize.width - blockLength * numHorizontal;//the space left when all blocks are packed
    horizontalOffset = horizontalRemainder/2;//so an equal space is at the left and right of the grid
    //How many blocks can be set on the canvas vertically? 
    let numVertical = ~~(windowSize.height/blockLength);//num of blocks that can be packed vertically
    let verticalRemainder = windowSize.height - blockLength * numVertical;//the space left when all blocks are packed  
    verticalOffset = verticalRemainder/2;//so an equal space is at the top and bottom of the grid 
    for(let y = verticalOffset; y < windowSize.height; y+=blockLength)//get all points in the grid, starting from the top to the bottom
    { 
        if(y+ blockLength > windowSize.height)//if the next point is beyond the bottom edge of the canvas
        {
            continue; //skip
        } 
        for(let x = horizontalOffset; x < windowSize.width; x+=blockLength)//all the while, getting all the horizontal points at each level 
        { 
            if(x+blockLength > windowSize.width)//if the next point is beyond the right edge of the canvas
            { 
                continue; //skip
            } 
            //flip a coin to add or reject the vertex
            if( Math.random() > 0.5)//if vertex is accepted
            {
                bigBlockVertices.push({x:x,y:y,size:blockLength});
            }
            else//if vertex is rejected (will result in an empty space)
            {
                if(Math.random() > 0.5)//flip a coin to add or reject a small block
                {
                    smallBlockVertices.push({x:x,y:y});
                } 
            } 
        } 
    }
    return {bigBlocks:bigBlockVertices,smallBlocks:smallBlockVertices}; 
}  
//get the width and height of the browser window 
function getBrowserWindowSize() 
{
    let win = window,
    doc = document,
    offset = 20,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    browserWindowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;  
    return {width:browserWindowWidth-offset,height:browserWindowHeight-offset}; 
} 
function setNewGrid() 
{
    let browserWindowSize = getBrowserWindowSize();  
    //create a new grid with new blocks
    let vertices = getBlockVertices(blockLength,browserWindowSize);  
    let bigBlockVertices = vertices.bigBlocks;//coordinates of the upper left vertices of the large blocks
    let smallBlockVertices = vertices.smallBlocks;//coordinates of the upper left vertices of the large small
    bigBlocks = [];//empty it
    bigBlockVertices.forEach(function(vertex)//create big blocks
    { 
        bigBlocks.push(new BigBlock(vertex.x,vertex.y,blockLength,255,backgroundColor));
    });
    smallBlocks = [];//empty it 
    smallBlockVertices.forEach(function(vertex)//create small blocks
    {    
        let divisor  = Math.random() > 0.5? 2.1:4;
        smallBlocks.push(new SmallBlock(vertex.x,vertex.y,blockLength/divisor,bigBlocks,backgroundColor));
    }); 
    smallBlocks.forEach(function(smallBlock)
    {   
        smallBlock.setSmallBlocks(smallBlocks);  
    });
}
function setup() 
{
    let browserWindowSize = getBrowserWindowSize();  
    createCanvas(browserWindowSize.width,browserWindowSize.height); 
    let vertices = getBlockVertices(blockLength,browserWindowSize);  
    let bigBlockVertices = vertices.bigBlocks;//coordinates of the upper left vertices of the large blocks
    let smallBlockVertices = vertices.smallBlocks;//coordinates of the upper left vertices of the large small
    bigBlockVertices.forEach(function(vertex)//create big blocks
    { 
        bigBlocks.push(new BigBlock(vertex.x,vertex.y,blockLength,255,backgroundColor));
    });
    smallBlockVertices.forEach(function(vertex)//create small blocks
    {    
        let divisor  = Math.random() > 0.5? 2.1:4;
        smallBlocks.push(new SmallBlock(vertex.x,vertex.y,blockLength/divisor,bigBlocks,backgroundColor));
    }); 
    smallBlocks.forEach(function(smallBlock)
    {   
        smallBlock.setSmallBlocks(smallBlocks);  
    });
    background(backgroundColor); 
    document.addEventListener('click',(event)=>//when user clicks on the canvas,
    {    
        setNewGrid();
    });
    window.addEventListener('resize',function()
    {
        
        let browserWindowSize = getBrowserWindowSize(); 
        resizeCanvas(browserWindowSize.width,browserWindowSize.height); 
        setNewGrid();
        background(backgroundColor);
    });
} 
function draw() 
{  
    background(backgroundColor); 
    [...bigBlocks,...smallBlocks].forEach(function(block)//draw all blocks
    {  
        block.draw(); 
    }); 
    smallBlocks.forEach(function(block)//update small blocks
    { 
        block.update(width,horizontalOffset,height,verticalOffset); 
    }); 
}