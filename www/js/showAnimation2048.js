function showNumber(x, y, num) {
	var numberCell = $("#numberCell-" + x + "-" + y);
	numberCell.css({
		"background": getNumberBGColor(num),
		"color": getNumberColor(num),
	});
	numberCell.text(num);

	numberCell.animate({
		"width": cellSideWidth + "px",
		"height": cellSideWidth + "px",
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