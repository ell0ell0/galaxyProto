/*
 Created by Lee Williams 09/14/12
*/

if (!Modernizr.canvas) {
	document.location = "mobile.html";
}
if(navigator.userAgent.match(/android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/blackberry.*/)) {
	document.location = "ipad.html";
}

var canvas = document.querySelector('#canvas'),
	readout = document.querySelector('#readout'),
    context = canvas.getContext('2d');
    context.canvas.width  = window.innerWidth;
 	context.canvas.height = window.innerHeight;

var centerX = context.canvas.width/2;
var centerY = context.canvas.height/2;

var diag = Math.sqrt(context.canvas.width*context.canvas.width + context.canvas.height*context.canvas.height);

var radius = context.canvas.width/160; 	

var offsetX = centerX - 63*radius;
var offsetY = centerY - 22*radius;
var damping = 0.03;
var pause =  false;
var loc = [{
	x: -1000,
	y: -1000
}];
    
var circles = [];
var homePoints = [];

var numCircles = 0;

for (var i = 0; i < 63; i++) {
	for (var j = 0; j<14; j++) {
		numCircles++;
		homePoints.push({
			x: i * (radius*2) + offsetX,
			y: j * (radius*2) + offsetY
		});
	}
}

for (var i = 0; i < numCircles; i++) {
	if(i == 45  || i == 46  || i == 47  || i == 48  || i == 49   || i == 50  || i == 51  || i == 52  || i == 59  || i == 60  || i == 61  || i == 62  || i == 63  || i == 64  || i == 65  || i == 66  || i == 73  || i == 87  || i == 101  || i == 129  || i == 130  || i == 131  || i == 132  || i == 133  || i == 134  || i == 135  || i == 136  || i == 143  || i == 144  || i == 145  || i == 146  || i == 147  || i == 148  || i == 149  || i == 150  || i == 157  || i == 164  || i == 171  || i == 178  || i == 185  || i == 186  || i == 186  || i == 187  || i == 188  || i == 189  || i == 190  || i == 191  || i == 192  || i == 199  || i == 200  || i == 201  || i == 202  || i == 203  || i == 204  || i == 205  || i == 206  || i == 227  || i == 228  || i == 229  || i == 230  || i == 231  || i == 232  || i == 233  || i == 234  || i == 241  || i == 242  || i == 243  || i == 244  || i == 245  || i == 246  || i == 247  || i == 248  || i == 255  || i == 262  || i == 269  || i == 276  || i == 283  || i == 284  || i == 285  || i == 286  || i == 287  || i == 288  || i == 289  || i == 290  || i == 297  || i == 298  || i == 299  || i == 300  || i == 301  || i == 302  || i == 303  || i == 304  || i == 325  || i == 326  || i == 327  || i == 328  || i == 329  || i == 330  || i == 331  || i == 332  || i == 333  || i == 334  || i == 335  || i == 339  || i == 340  || i == 341  || i == 342  || i == 343  || i == 344  || i == 345  || i == 346  || i == 347  || i == 348  || i == 349  || i == 353  || i == 360  || i == 367  || i == 374  || i == 381  || i == 382  || i == 383  || i == 384  || i == 385  || i == 386  || i == 387  || i == 388  || i == 395  || i == 396  || i == 397  || i == 398  || i == 399  || i == 400  || i == 401  || i == 402  || i == 423  || i == 424  || i == 425  || i == 426  || i == 428  || i == 429  || i == 430  || i == 437  || i == 438  || i == 439  || i == 440  || i == 442  || i == 443  || i == 444  || i == 451  || i == 454  || i == 458  || i == 465  || i == 468  || i == 472  || i == 479  || i == 480  || i == 482  || i == 483  || i == 484  || i == 485  || i == 486  || i == 493  || i == 494  || i == 496  || i == 497  || i == 498  || i == 499  || i == 500  || i == 518  || i == 519  || i == 520  || i == 521  || i == 522  || i == 523  || i == 524  || i == 525  || i == 526  || i == 527  || i == 528  || i == 532  || i == 533  || i == 534  || i == 535  || i == 536  || i == 537  || i == 538  || i == 539  || i == 540  || i == 541  || i == 542  || i == 549  || i == 556  || i == 563  || i == 570  || i == 577  || i == 580  || i == 581  || i == 582  || i == 583  || i == 584  || i == 591  || i == 594  || i == 595  || i == 596  || i == 597  || i == 598  || i == 616  || i == 617  || i == 619  || i == 620  || i == 621  || i == 622  || i == 623  || i == 624  || i == 625  || i == 626  || i == 630  || i == 631  || i == 633  || i == 634  || i == 635  || i == 636  || i == 637  || i == 638  || i == 639  || i == 640  || i == 661  || i == 662  || i == 663  || i == 664  || i == 665  || i == 666  || i == 667  || i == 668  || i == 670  || i == 671  || i == 675  || i == 676  || i == 677  || i == 678  || i == 679  || i == 680  || i == 681  || i == 682  || i == 684  || i == 685  || i == 689  || i == 696  || i == 699  || i == 703  || i == 710  || i == 713  || i == 717  || i == 718  || i == 719  || i == 720  || i == 721  || i == 722  || i == 723  || i == 724  || i == 725  || i == 726  || i == 727  || i == 731  || i == 732  || i == 733  || i == 734  || i == 735  || i == 736  || i == 737  || i == 738  || i == 739  || i == 740  || i == 741  || i == 759  || i == 760  || i == 761  || i == 762  || i == 763  || i == 764  || i == 765  || i == 766  || i == 773  || i == 774  || i == 775  || i == 776  || i == 777  || i == 778  || i == 779  || i == 780  || i == 787  || i == 794  || i == 801  || i == 808  || i == 815  || i == 816  || i == 817  || i == 818  || i == 819  || i == 820  || i == 821  || i == 822  || i == 829  || i == 830  || i == 831  || i == 832  || i == 833  || i == 834  || i == 835  || i == 836  || i == 55  || i == 69  || i == 83  || i == 97  || i == 111  || i == 125  || i == 139  || i == 153  || i == 167  || i == 181  || i == 195  || i == 209  || i == 223  || i == 237  || i == 251  || i == 265  || i == 279  || i == 293  || i == 307  || i == 377  || i == 391  || i == 405  || i == 419  || i == 433  || i == 447  || i == 461  || i == 475  || i == 489  || i == 503  || i == 517  || i == 531  || i == 545  || i == 559  || i == 573  || i == 587  || i == 601  || i == 615  || i == 629  || i == 643  || i == 769  || i == 783  || i == 797  || i == 811  || i == 825  || i == 839 ){
		circles.push({
			x: Math.floor(radius*1.5 + (1+context.canvas.width-radius*1.5)*Math.random()),
			y: Math.floor(radius*1.5 + (1+context.canvas.height-radius*1.5)*Math.random()),
			r: 255,
			g: 255,
			b: 255,
			a: 1,
			rand: Math.random() < 0.5 ? -0.01 : 0.01,
			velX: 0,
			velY: 0,
			frcX: 0,
			frcY: 0,
			on: false
		});
	}
	else {
		circles.push({
			x: Math.floor(radius*1.5 + (1+context.canvas.width-radius*1.5)*Math.random()),
			y: Math.floor(radius*1.5 + (1+context.canvas.height-radius*1.5)*Math.random()),
			r: 239,
			g: 85,
			b: 0,
			a: 1,
			rand: Math.random() < 0.5 ? -0.01 : 0.01,
			velX: 0,
			velY: 0,
			frcX: 0,
			frcY: 0,
			on: true
		});
	}
}

//shoulda known I'd need some more orange around the logo
//I'm not refiguring out which dots need to be white though
for (var i = 0; i < 63; i++) {
	for (var j = 0; j<1; j++) {
			homePoints.push({
			x: i * (radius*2) + offsetX,
			y: j * (radius*2) + offsetY - (radius*2)
		});
	}
}

for (var i = 0; i < 63; i++) {
	for (var j = 0; j<1; j++) {
			homePoints.push({
			x: i * (radius*2) + offsetX,
			y: j * (radius*2) + offsetY + (radius*2)*14
		});
	}
}

for (var i = 0; i < 126; i++) {
	circles.push({
		x: Math.floor(radius*1.5 + (1+context.canvas.width-radius*1.5)*Math.random()),
		y: Math.floor(radius*1.5 + (1+context.canvas.height-radius*1.5)*Math.random()),
		r: 239,
		g: 85,
		b: 0,
		a: 1,
		rand: Math.random() < 0.5 ? -0.01 : 0.01,
		velX: 0,
		velY: 0,
		frcX: 0,
		frcY: 0,
		on: true
	});
}



//utilities.....................................................
function getDist(x1, y1, x2, y2) {
	return Math.round( Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)) );
}

function clamp(value, min, max) {
	return value < min ? min : value > max ? max : value;
}

function map(value, inputMin, inputMax, outputMin, outputMax, clamp){
	var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
	if( clamp ){
		if(outputMax < outputMin){
			if( outVal < outputMax )outVal = outputMax;
			else if( outVal > outputMin )outVal = outputMin;
		}else{
			if( outVal > outputMax )outVal = outputMax;
			else if( outVal < outputMin )outVal = outputMin;
		}
	}
	return outVal;
}

//functions.....................................................
function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}

function supports_canvas() {
	return !!document.createElement('canvas').getContext;
}

function setNewPos() {
    context.canvas.width  = $(window).width();
 	context.canvas.height = $(window).height();
	
	centerX = context.canvas.width/2;
	centerY = context.canvas.height/2;
	
	diag = Math.sqrt(context.canvas.width*context.canvas.width + context.canvas.height*context.canvas.height);
	
	radius = context.canvas.width/160; 	
	
	offsetX = centerX - 63*radius;
	offsetY = centerY - 22*radius;
	
	var count = 0;
	
	for (var i = 0; i < 63; i++) {
		for (var j = 0; j<14; j++) {
			homePoints[count].x = i * (radius*2) + offsetX;
			homePoints[count].y = j * (radius*2) + offsetY;
			count++;
		}
	}
	
	for (var i = 0; i < 63; i++) {
		for (var j = 0; j<1; j++) {
			homePoints[count].x = i * (radius*2) + offsetX;
			homePoints[count].y = j * (radius*2) + offsetY - (radius*2);
			count++;
		}
	}
	
	for (var i = 0; i < 63; i++) {
		for (var j = 0; j<1; j++) {
			homePoints[count].x = i * (radius*2) + offsetX;
			homePoints[count].y = j * (radius*2) + offsetY + (radius*2)*14;
			count++;
		}
	}
	pause = false;
};

function eraseBackground() {
   context.clearRect(0,0,canvas.width,canvas.height);
}

function update() {
	for(var i = 0; i<circles.length; i++) {
		circles[i].frcX = 0;
		circles[i].frcY = 0;
		
		//Add attraction force
		var diffX = circles[i].x - homePoints[i].x;
		var diffY = circles[i].y - homePoints[i].y;
		//normalize the vector
		var length = Math.sqrt(diffX*diffX + diffY*diffY);
		if(length > 0) {
			diffX /= length;
			diffY /= length;
		}	
		
		var pct = 1 - (length/diag);
		// NOTE the arbitrary number is the scale (how strong the force is ) 
		circles[i].frcX = circles[i].frcX - diffX * 0.15 *pct;
		circles[i].frcY = circles[i].frcY - diffY * 0.15 *pct;
		

//MOUSE INTERACTION/////////////////////////////////////////////////////////////////////////////////
		var dist = getDist(circles[i].x, circles[i].y, loc.x, loc.y);
		
		if(dist < radius*30) {
			var diffX = circles[i].x - loc.x;
			var diffY = circles[i].y - loc.y;
			//normalize the vector
			var length = Math.sqrt(diffX*diffX + diffY*diffY);
			if(length > 0) {
				diffX /= length;
				diffY /= length;
			}	
			
			var pct = 1 - (length/(radius*30));
			// NOTE the arbitrary number is the scale (how strong the force is ) 
			circles[i].frcX = circles[i].frcX + diffX * 0.55 *pct;
			circles[i].frcY = circles[i].frcY + diffY * 0.55 *pct;
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////

		//add damping
		circles[i].frcX = circles[i].frcX - circles[i].velX * damping;
		circles[i].frcY = circles[i].frcY - circles[i].velY * damping;

		//update forces
		circles[i].velX += circles[i].frcX;
		circles[i].velY += circles[i].frcY;
		circles[i].x += circles[i].velX;
		circles[i].y += circles[i].velY;

	}
}

function drawCircle(circle) {
	context.save();
	
	context.beginPath();
	context.rect(circle.x, circle.y, radius*2 - 1, radius*2 - 1);
//  	context.arc(circle.x, circle.y, radius, 0, Math.PI*2, true);
  	context.fillStyle = "rgba(" + circle.r + "," + circle.g + "," + circle.b + "," + circle.a + ")";
	context.fill();
 	context.closePath();
 	
 	context.restore();
}

function draw() {
	for(var i = 0; i<circles.length; i++) {
		drawCircle(circles[i]);
	}
}

//new stuff

function updateReadout(num) {
   readout.innerHTML = '(' + num + ')';
}


// Event handlers.....................................................
canvas.onmousemove = function (e) {
   loc = windowToCanvas(canvas, e.clientX, e.clientY);
//   updateReadout(loc.x, loc.y);
};

// When the user moves their finger, the function will begin.
addEventListener('touchstart', function(e) { 
    e.preventDefault(); // Stop any annoying scrolling.
    var touch = e.touches[0]; 
    loc.x = touch.pageX;
    loc.y = touch.pageY;
}, false);

addEventListener('touchmove', function(e) { 
    e.preventDefault(); 
    var touch = e.touches[0]; // Fires every time the user moves.
    loc.x = touch.pageX;
    loc.y = touch.pageY;
}, false);

addEventListener('touchend', function(e) { 
    e.preventDefault();
    var touch = e.touches[0];
    loc.x = -1000;
    loc.y = -1000;
}, false);
 
var resizeTimer = null;
$(window).bind('resize', function() {
    if (resizeTimer) clearTimeout(resizeTimer);
    pause = true;
    resizeTimer = setTimeout(setNewPos, 100);
});

$(window).bind('orientationchange', function() {
    if (resizeTimer) clearTimeout(resizeTimer);
    pause = true;
    resizeTimer = setTimeout(setNewPos, 100);
}); 

// Animation.....................................................
function animate() {
      eraseBackground();
      if(!pause) {
      	update();
      }
      draw();
      window.requestNextAnimationFrame(animate);
}

$(document).ready(function() {
	animate();
});
