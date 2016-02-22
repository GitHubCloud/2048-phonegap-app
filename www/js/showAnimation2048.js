function showNumber(x, y, num) {
	var numberCell = $("#numberCell-" + x + "-" + y);
	numberCell.css({
		"background": getNumberBGColor(num),
		"color": getNumberColor(num),
	});
	numberCell.text(num);

	var size;
	if($(document).width() > 510){
		size = "100px";
	}else if($(document).width() < 410){
		size = "60px";
	}else{
		size = "80px";
	}

	numberCell.animate({
		"width": size,
		"height": size,
		"top": getPosTop(x, y),
		"left": getPosLeft(x, y)
	},100);
}

function showMove(fromX, fromY, toX, toY) {
	var numberCell = $("#numberCell-" + fromX + "-" + fromY);
	numberCell.animate({
		"top": getPosTop(toX, toY),
		"left": getPosLeft(toX, toY)
	},200);
}

function updateScore(score) {
	$("#score").text(score);
}