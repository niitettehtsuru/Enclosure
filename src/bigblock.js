/*
 * A big block[The static blocks that enclose the moving blocks]
 * -------------------------------------------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      19th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/Enclosure
 * @codepen:   https://codepen.io/niitettehtsuru/pen/yLeJwrG
 * @license:   GNU General Public License v3.0 
 */
class BigBlock
{
    constructor(xCoord,yCoord,size,strokeColor,fillColor)
    {       
        this.xCoord = xCoord;
        this.yCoord = yCoord;  
        this.size = size;    
        this.strokeColor = strokeColor;  
        this.fillColor = 'maroon';//fillColor;  
        this.xCenter = this.xCoord + this.size/2; 
        this.yCenter = this.yCoord + this.size/2;    
    }  
    draw()//draw the big square
    {     
        stroke(this.strokeColor); 
        strokeWeight(1); 
        fill(this.fillColor);  
        rect(this.xCoord,this.yCoord,this.size,this.size);      
    }  
} 
 