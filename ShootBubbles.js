
 //@adi tayri
 //205530967
 //Final exam
let ShootBubbles = function()
{
	let w,h; //width and height
	let lastTimeStamp = 0;
	let FPS = 50; //frames per second
	let timeFrame = 1000/FPS;
	let totalTime = 0;
	let bubbles = []; //bubbles array to store all bubbles
	let amount = 0 ; //amount of bubbles
	var accelerate = 0.3;//faster
	let maxPts=3;  //max point for bubble
	let minPts =-2; //min point for bubble
	let countPts = 0 ; //counter for the points
	let explosions = []; //explotion array
	let newBubbleTime = 800;
	
	
	
	let initModule = function() {
        this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth -50;
		this.canvas.height = window.innerHeight -50;
        w = this.canvas.width;
        h = this.canvas.height;
		setInterval(addBubble,newBubbleTime); //add bubble every 800ms
        mainLoop(0); //main loop
    };
	
	
	let addBubble = function()
	{
		var Bubble = new Object();
		var radius = Math.floor(Math.random() * 20) + 18; //betwwen 15 to 40 
		Bubble.radius = radius;
		Bubble.x = Math.floor( (Math.random())*(w-2*radius) ) + radius;
		Bubble.y = h-radius ;
		Bubble.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		Bubble.points = getRandomPts(minPts,maxPts);
		Bubble.velocity  = Math.random()+accelerate;
		
		bubbles.push(Bubble); //push to bubbles array
		amount++; //amount of bubbles increase in 1
	}
	let mainLoop = function(timeStamp) 
	{
		if(countPts<0)//if counter less then zero
		{
			setTimeout(function()
			{
			let context = this.canvas.getContext('2d');
			context.font="italic small-caps bold 50px arial";
			context.fillStyle = 'red';
			context.fillText("GAME OVER",w/2 -130,h/2 +10);
			}, 200);
			
			clearScreen();
			countPts=0;
			return;
		}
        totalTime += timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        
        while(totalTime > timeFrame) {
            update();//update
            totalTime -= timeFrame;
        }
        draw();//draw
		
        requestAnimationFrame(mainLoop);
    };
	
	let update = function()
	{
		for(var i = 0 ; i< amount; i++)
		{
			bubbles[i].y -= bubbles[i].velocity;
		}
		 explosions.forEach(function(e, ind, explosions) {
            if(e.over())
                explosions.splice(ind, 1);
            else
                e.update();
        });
		
	};
	let getRandomPts = function(min, max) 
	{
		var r ;
		do{
			r = Math.floor(Math.random() * (max - min + 1)) + min;
		}while(r==0);
		return r;
	};
	
	
	
	let draw = function() //draw the bubbles and explosions
	{
		clearScreen();
		let context = this.canvas.getContext('2d');
		 context.font = '20px Arial';
		 context.fillStyle = 'black';
		context.fillText("POINTS: " +countPts,w-120,20);
		for(var i = 0 ; i < amount ; i++)
		{
			let x = bubbles[i].x;
			let y = bubbles[i].y;
			let radius =  bubbles[i].radius;
			let color = bubbles[i].color;
			let points = bubbles[i].points;
			context.beginPath();
			context.arc(x ,y,radius, 2 * Math.PI, false);
			context.fillStyle = color;
			context.fill();	
			context.lineWidth=2;
			context.strokeStyle = '#555';
			context.stroke();
			 context.font = '15px Arial';
			context.fillStyle = 'black';
			if(color=='black')
			{
				context.fillStyle = 'white';
			}
			context.fillText(points,x,y);
			
		}
	    explosions.forEach(e => e.draw(context));
  
      };
	  addEventListener('click',function(e)//event for mouse clicked
	  {
		  let x =e.clientX;
		  let y = e.clientY;
		  for(var i = 0;i<amount ; i++)
		  {
			  if(inRange(x,y,i))
			  {
				  countPts+=bubbles[i].points;
				  createExplosion(i);
				 // alert("in range");//checked
			  }
		  }

	  });
	  
	  let inRange=function(x, y,index)//check if click in range of a bubble
	  {
		  var a = x-bubbles[index].x;
		  var b = y- bubbles[index].y;
		  var distance = Math.sqrt(a*a + b*b);
		  if(distance<=bubbles[index].radius)
		  {
			  return true;
		  }
		  return false;
	  };
	 
		let createExplosion = function(index)//create explosion of the bubble
		{
			let xx = bubbles[index].x;
			let yy = bubbles[index].y;
			let e = new Explosion({x : xx, y : yy});
			explosions.push(e);
			bubbles.splice(index,1); //remove the bubble from the array
			amount--; //amount of bubbles decrease
		};
	  
	 

	
	
    
    let clearScreen = function() {
		let context = this.canvas.getContext('2d');
		context.clearRect(0, 0, w, h);
    };
	
	
	
	return {initModule}
}();
