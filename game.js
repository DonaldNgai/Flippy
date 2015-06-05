var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width;
var height;
var numberOfCells = 36;
var numberOfRows = 6;
var numberOfColumns = 6;
var logo = new Image();
var done = false;
var boxx = 430;
var boxy = 85;
var boxwidth = 580;
var boxheight = 470;
var margin = 30;
var cellwidth = 80;
var Radius = 15;
var cellheight = cellwidth;
var xs=new Array(numberOfCells);
var ys=new Array(numberOfCells);
var numxs=new Array(numberOfCells);
var numys=new Array(numberOfCells);
var spaces = numberOfCells;
var max = 5;
var cells=new Array(numberOfCells);
var clicked=new Array(numberOfCells);
var temp;
var moves = 1;
var done;
var index = 1;
var indexout = 1;
var finTransition = false;
var allZeroes = true;
var boxes = new Array(numberOfCells);
var divCanvasAlignmentX = 8;
var divCanvasAlignmentY = 8;
var level = 1;
var winRow = 0;
var impossible = false;

//distance between cell and number was hardcoded
//background cell drawn using canvas was hardcoded to be behind div's
//text drawn in drawCells was also hardcoded
//add div's in main html for additional cells
//amount to adjust depending on number of columns 
//currently can support up to a 6x6 grid. Should be hard enough, just change number of rows/columns
//to add new cells, change number of Rows and number of Cells and add the corresponding number of div's into main html
//fix title and moves and done/end

function resize()
{
 fitToContainer(canvas);
 for (j=0; j < numberOfColumns; j++)
	{
		for (k=0; k < numberOfRows; k++)
		{
			var index = (j*numberOfRows) + k;
			xs[index] = boxx + margin*(j+1) + cellwidth*(j);
			ys[index] = boxy + margin*(k+1) + cellheight*(k);
			numxs[index] = xs[index] + cellwidth/2 - 10;
			numys[index] = ys[index] + cellheight/2 + 11;

			boxes[index] = document.getElementById('b' + (index+1));
			boxes[index].style.position = "absolute";
			boxes[index].style.backgroundColor="white";
			boxes[index].style.display="none";
			boxes[index].style.height=cellheight;
			boxes[index].style.width=cellwidth;
			boxes[index].style.left = xs[index];
			boxes[index].style.top = ys[index];
		}
	}
	
 drawCells();
 checkDone();
 

}

function menu()
{
if (finTransition)
	{
	winRow=0;
	moves = 1;
		spaces = numberOfCells;
		index = 1;
		indexout = 1;
		done = false;
		finTransition = false;
$("#Moves").fadeOut(1000);
$("#Pass").fadeOut(1000);
$("#Fail").fadeOut(1000);
$("#Wins").fadeOut(1000);
$("#Menu").fadeOut(1000);
$("#Restart").fadeOut(1000);
drawCover(1);
for (i=0; i < numberOfCells; i++)
	{
	$("#b" + (i+1)).fadeOut(1000);
	}
startGame();
}
}

function restart()
{
	if (finTransition)
	{

if (max > 1 && winRow%2 == 0)
{

max --;

}
		moves = 1;
		spaces = numberOfCells;
		index = 1;
		indexout = 1;
		done = false;
		$("#Pass").fadeOut(1000);
		$("#Fail").fadeOut(1000);
		finTransition = false;
		populateCells();
		drawCells();
		
	}
}

function checkDone()
{
if (moves == 0)
	{
	winRow = 0;
	if (level == 3)
	{
	max = 0;
	}
	else
	{
	max = 5;
	}
		for (i=0; i < numberOfCells; i++)
		{
			if  (clicked[i] == false)
			{
				
				drawRoundRectangle(xs[i] - divCanvasAlignmentX,ys[i] - divCanvasAlignmentY,cellwidth,cellheight,Radius,"#F08080");
				
				//if i click it realy quickly, it works perfectly, if not, it doesn't work
				
				ctx.fillStyle="#000000";
				//took it out because too lazy to align number
				// ctx.font = (660/numberOfCells) + "px Arial";
				ctx.fillText(cells[i],numxs[i]- divCanvasAlignmentX,numys[i]-divCanvasAlignmentY);
			}
			$("#b" + (i+1)).fadeOut(1000);
		}
		// document.getElementById("demo").innerHTML = " Game Over ";
		$("#Fail").fadeIn(1000);
	}
	
	else
	{
	
	allZeroes = true;
	for (i=0; i < numberOfCells; i++)
	{
		if  (clicked[i] == false && cells[i] != 0)
		{
			allZeroes = false;
		}
	}

	if (!allZeroes)
	{
	done = true;
		for (i=0; i < numberOfCells; i++)
		{
			if  (clicked[i] == false)
			{
				done = false;
			}
		}
	}

	if (done == true || allZeroes == true)
	{
	document.getElementById("Restart").innerHTML = " Next Lvl ";
	winRow = winRow + 1;
	document.getElementById("Wins").innerHTML = " Win Streak: " + winRow + " <br> ";	
		$("#Pass").fadeIn(1000);

		for (i=1; i <= numberOfCells; i++)
		{

			$("#b" + i).fadeOut(1000);

		}
	}

	}

}

//not needed, can delete
function checkClick()
{
	if (finTransition)
	{
		// document.getElementById("demo").innerHTML += "his";
	}
}

function checkMouseDown(event)
{
	
	if (finTransition && moves != 0 && !done)
	{
		
		mousex = event.pageX;
		mousey = event.pageY;
		// document.getElementById("demo").innerHTML = " X: " + mousex + " Y: " + mousey + " " + finTransition + "<br> ";
		for (i=0; i < numberOfCells; i++)
		{
			if (mousex >= xs[i] && mousex <= (xs[i] + cellwidth ) )
			{

				if (mousey >= ys[i] && mousey <= (ys[i] + cellheight ) )
				{
					if (clicked[i] == false)
					{
						$("#b" + (i+1)).fadeOut(1000);
						moves += cells[i];
						moves --;
						document.getElementById("Moves").innerHTML = " Moves Left: " + moves + " ";
						clicked[i] = true;
						checkDone();
					}
				}

			}
		}
	}

}

function fitToContainer(canvas){

	canvas.style.width='99%';
	canvas.style.height='88%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	width = canvas.width;
	height = canvas.height;
	boxwidth = (width/6)*4;
	boxheight = (height/5)*4;
	boxx = (width/6);
	boxy = (height/8);
	cellwidth = (boxwidth-((numberOfColumns+1)*30))/numberOfColumns;
	cellheight = (boxheight-((numberOfRows+1)*30))/numberOfRows;
	
	// document.getElementById("demo").innerHTML = width + " " + height;
}

function drawLogo(a)
{
	ctx.drawImage(logo, 30,30,width-60,height-60);
	drawCover(a);
	
}

function drawCover(a)
{
	ctx.fillStyle="rgba(135,206,255,"+ a + ")"; 
	ctx.fillRect ( 30 , 30 , width-60 , height-60 ); 
}

function intro(a)
{
	if (a > 0)
	{
		setTimeout(function() {
			drawLogo(a)
			intro(a - 0.005);
		}, 10);
	}
	
}

function fadeout(a)
{
	if (a < 1)
	{
		setTimeout(function() {
			drawLogo(a)
			fadeout(a + 0.005);
		}, 10);
	}
	else
	{
		drawMenu(1);
	}
}


function drawMenu ()
{
	//waits two seconds before fading canvas back in
	setTimeout(function() {	
		drawCover(1);
		$("#myCanvas").fadeIn(1500);
		$("#Title").fadeIn(1500);
		$("#Start").fadeIn(1500);
		
	}, 1000);



}

function startGame()
{

	

	$("#Title").fadeOut(1000);
	$("#Start").fadeOut(1000);
	
	setTimeout(function() {	
	$("#Instructions").fadeIn(1000);
	$("#Easy").fadeIn(1000);
	$("#Medium").fadeIn(1000);
	$("#Hard").fadeIn(1000);
	$("#Impossible").fadeIn(1000);
	}, 1000);
	
}

function chooseDifficulty(difficulty)
{
window.addEventListener('resize', resize, false);
level = difficulty;
max=5;
if (level == 0)
{
numberOfCells = 16;
numberOfColumns = 4;
numberOfRows = 4 ;
}
else if (level == 1)
{
numberOfCells = 25;
numberOfColumns = 5;
numberOfRows = 5 ;
}
else if (level == 2)
{
numberOfCells = 36;
numberOfColumns = 6;
numberOfRows = 6 ;
}
else if (level == 3)
{
numberOfCells = 1;
numberOfColumns = 1;
numberOfRows = 1 ;
max = 0;
}

spaces = numberOfCells;
fitToContainer(canvas);

	populateCells();
	$("#Instructions").fadeOut(1000);
	$("#Easy").fadeOut(1000);
	$("#Medium").fadeOut(1000);
	$("#Hard").fadeOut(1000);
	$("#Impossible").fadeOut(1000);
	setTimeout(function() {	
	
		drawCells();
	}, 1500);
}

function drawRoundRectangle(x,y,width,height,radius,color)
{


ctx.beginPath();
ctx.moveTo(x+radius, y);
//last two digits are endpoint of curve
//first two, place it at the corner of square
ctx.lineTo(x+width-radius, y);
ctx.quadraticCurveTo(x+width, y, x+width, y+radius);
 
ctx.lineTo(x+width, y+height-radius);
ctx.quadraticCurveTo(x+width, y+height, x+width-radius, y+height);
 
ctx.lineTo(x+radius, y+height);
ctx.quadraticCurveTo(x, y+height, x, y+height-radius);

ctx.lineTo(x, y+radius);
ctx.quadraticCurveTo(x, y, x+radius, y);
 
ctx.fillStyle = color;
ctx.fill();

}

function drawCells()
{
	document.getElementById("Restart").innerHTML = " Restart";
	document.getElementById("Restart").style.display = 'initial';
	document.getElementById("Menu").style.display = 'initial';
	document.getElementById("Moves").innerHTML = " Moves Left: " + moves ;
	document.getElementById("Wins").innerHTML = " Win Streak: " + winRow + " <br> ";
	$("#Moves").fadeIn(1000);
	$("#Wins").fadeIn(1000);
	
	for (i=0; i < numberOfCells; i++)
	{

		//ctx.fillStyle="#C0C0C0";
		//ctx.fillRect(xs[i] - divCanvasAlignmentX,ys[i] - divCanvasAlignmentY,cellwidth,cellheight);
		drawRoundRectangle(xs[i] - divCanvasAlignmentX,ys[i] - divCanvasAlignmentY,cellwidth,cellheight,Radius,"#B0E2FF");
		ctx.fillStyle="#000000";
		//took it out because too lazy to align number
		// ctx.font = (660/numberOfCells) + "px Arial";
		ctx.font = "33px Numbers";
		ctx.fillText(cells[i],numxs[i]- divCanvasAlignmentX,numys[i]-divCanvasAlignmentY);

		if (clicked[i] == false)
		{
		document.getElementById("b" + (i+1)).style.display = 'initial';
		}

		setTimeout(function() {	
			showCells();
		}, (200*(i+1)));

	}



}

function showCells()
{
	$("#b" + index).fadeOut(1000);
	index++;
	setTimeout(function() {
		$("#b" + indexout).fadeIn(1000);
		indexout++
		if (indexout == numberOfCells+1)
		{
			$("#b" + numberOfCells).fadeIn(1000);
			finTransition = true;
		}
	}, 1500);
}

function populateCells()
{
	var filled = new Array(numberOfCells);
//may be high numbers because it'll randomly generate numbers which may add up to 13 before spaces becomes < 0 so it already has 13 possible
	for (j=0; j < numberOfColumns; j++)
	{
		for (k=0; k < numberOfRows; k++)
		{
			var index = (j*numberOfRows) + k;
			xs[index] = boxx + margin*(j+1) + cellwidth*(j);
			ys[index] = boxy + margin*(k+1) + cellheight*(k);
			numxs[index] = xs[index] + cellwidth/2 - 10;
			numys[index] = ys[index] + cellheight/2 + 11;
			clicked[index] = false;

			boxes[index] = document.getElementById('b' + (index+1));
			boxes[index].style.position = "absolute";
			boxes[index].style.backgroundColor="white";
			boxes[index].style.display="none";
			boxes[index].style.height=cellheight;
			boxes[index].style.width=cellwidth;
			boxes[index].style.left = xs[index];
			boxes[index].style.top = ys[index];
			
			boxes[index].addEventListener("mousedown", checkMouseDown, false);
		}
	}

	for (i=0; i < numberOfCells; i++)
	{
		var selector = Math.floor((Math.random() * numberOfCells));
		temp = 0;
		while (filled[selector])
		{
			selector = Math.floor((Math.random() * numberOfCells));
		}
		if (spaces > 0)
		{
			temp = Math.floor((Math.random() * (max+1)));
			spaces = spaces-temp;
			if (temp == 0)
			{
				spaces --;
			}
		}
		filled[selector] = true;
		cells[selector] = temp;
		
		// document.getElementById("demo").innerHTML += " Value: " + cells[selector] + " Spaces: " + spaces + " " + selector + "<br> ";
	}

	while (spaces > 0)
	{
		temp = Math.floor((Math.random() * (max+1)));
		cells[Math.floor((Math.random() * numberOfCells))] += temp;
		spaces = spaces - temp;
	} 

}

// main program
logo.onload = function(){           //create our handler
	window.onload=function () {
		
		fitToContainer(canvas);
		drawMenu();
		//intro(1); //do intro which only draws the fade in of the logo. After 4 seconds, the entire canvas is faded out. Next, it calls drawMenu which
		//erases the whole canvas first, and then toggles the canvas, title, and start items at the same time.
		
		//it then waits another 2 seconds before fading back in the canvas and then runs intro which fades in the logo
		// setTimeout(function() {	
			// $("#myCanvas").fadeOut(1500,drawMenu())

		// }, 4000);
	}
	ctx.font = "33px Numbers";
	//for some reason, I have to fillText first in order for font to be loaded
	ctx.fillText("Ermagherd!!!",100,100);
	//testing for automated box addition

	// var element = document.createElement("div");
	// document.getElementById("demo").innerHTML = " working";
	// element.style.backgroundColor="black";
	// element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
	// document.getElementById('test').appendChild(element);


};
logo.src = "Logo.jpg"; 


