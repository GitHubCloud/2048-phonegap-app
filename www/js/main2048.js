var board = new Array();
var score = 0;
var hasConflict = new Array();

var startX, startY, endX, endY = 0;

$(function () {
	prepareForMobile();

	$(".mainCover").css({
		"width": documentWidth + "px",
		"height": documentHeight + "px",
		"background-size": documentWidth + "px " + documentHeight + "px",
		"position": "absolute",
		"z-index": 1000
	});
	$("#wrapper").css({
		"position": "absolute",
		"width": documentWidth + "px",
		"top": -documentHeight + "px"
	});
	setTimeout(function () {
		$(".mainCover").animate({
			"opacity": 0,
			"top": -documentHeight + "px"
		},800);
	},3200);
	setTimeout(function () {
		$("#wrapper").animate({
			"opacity": 1,
			"top": 0
		},1000,"swing");
	},3600)

	$(".confirmBtn").click(function () {
		$("#bubbleInfo").animate({
			"top": -$("#bubbleInfo").height() + "px",
			"opacity": 0
		},400);
	});

	if(localStorage.getItem("HighScore") == null){
		localStorage.setItem("HighScore",0);
	}
	$("#HighScore").text(localStorage.getItem("HighScore"));
	gameStart();
});

function prepareForMobile() {
	if(documentWidth > 510){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideWidth = 100;
	}
	$("#gridContainer").css({
		"width": gridContainerWidth - 2 * cellSpace,
		"height": gridContainerWidth - 2 * cellSpace,
		"padding": cellSpace,
		"border-radius": 0.02 * gridContainerWidth
	});
	$(".gridCell").css({
		"width": cellSideWidth,
		"height": cellSideWidth,
		"border-radius": 0.02 * cellSideWidth
	});
}

function gameStart() {
	//初始游戏
	init();
	//随机生成2个数字
	createNumber();
	createNumber();
}

function init() {
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var $gridCell = $("#gridCell-" + i + "-" + j);
			$gridCell.css("top", getPosTop(i, j) + "px");
			$gridCell.css("left", getPosLeft(i, j) + "px");
		}
	}

	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		hasConflict[i] = new Array();
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
			hasConflict[i][j] = false;
		}
	}

	updateBoardView();
	score = 0;
	updateScore(score);
}

function updateBoardView() {
	$(".numberCell").remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$("#gridContainer").append("<div class='numberCell' id='numberCell-" + i + "-" + j + "'></div>");
			var theNumberCell = $("#numberCell-" + i + "-" + j);
			if(board[i][j] == 0){
				theNumberCell.css({
					"width": "0px",
					"height": "0px",
					"top": (getPosTop(i, j) + cellSideWidth/2) + "px",
					"left": (getPosLeft(i, j) + cellSideWidth/2) + "px"
				});
			}else{
				theNumberCell.css({
					"width": cellSideWidth + "px",
					"height": cellSideWidth + "px",
					"top": (getPosTop(i, j)) + "px",
					"left": (getPosLeft(i, j)) + "px",
					"background": getNumberBGColor(board[i][j]),
					"color": getNumberColor(board[i][j]),
				});
				theNumberCell.text(board[i][j]);
			}
			hasConflict[i][j] = false;
		}
	}
	$(".numberCell").css({
		"line-height": cellSideWidth + "px",
		"font-size": 0.6 * cellSideWidth + "px"
	})
}

function isGameOver() {
	if(noSpace(board) && noMove(board)){
		GameOver();
	}
}
function GameOver() {
	var ls = localStorage;
	if(parseInt(ls.getItem("HighScore")) < parseInt(score)){
		ls.setItem("HighScore",score);
		$("#HighScore").text(score);
	}
	$("#bubbleInfo").css({
		"display": "block",
		"opacity": "1",
		"top": (documentHeight - $("#bubbleInfo").outerHeight()) / 2 + "px",
		"left": (documentWidth - $("#bubbleInfo").outerWidth() + 40) / 2 + "px"
	});
	$(".bubbleScore").text(score);
}

function createNumber() {
	if(noSpace(board)){
		return false;
	}
	//随机位置
	var ranX = parseInt(Math.floor(Math.random() * 4));
	var ranY = parseInt(Math.floor(Math.random() * 4));
	while(true){
		if(board[ranX][ranY] == 0){
			break;
		}
		ranX = parseInt(Math.floor(Math.random() * 4));
		ranY = parseInt(Math.floor(Math.random() * 4));
	}
	//随机数字
	var ranNum = (Math.random() < 0.5)? 2 : 4;
	//显示数字
	board[ranX][ranY] = ranNum;

	showNumber(ranX, ranY, ranNum);
	return true;
}

$(document).keydown(function (e) {
	switch(e.keyCode){
		case 37: //left
			e.preventDefault();
			if(moveLeft()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38: //up
			e.preventDefault();
			if(moveUp()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39: //right
			e.preventDefault();
			if(moveRight()){
				setTimeout("createNumber();",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40: //down
			e.preventDefault();
			if(moveDown()){
				setTimeout("createNumber();",210);
				setTimeout("isGameOver()",300);
			}
			break;
		default:
			break;
	}
});

document.addEventListener("touchstart",function (e) {
	startX = e.touches[0].pageX;
	startY = e.touches[0].pageY;
});
document.addEventListener("touchmove",function (e) {
	e.preventDefault();
})
document.addEventListener("touchend",function (e) {
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;
	if(Math.abs(deltaX) < 0.1 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth){
		return;
	}
	if(Math.abs(deltaX) >= Math.abs(deltaY)){
		if(deltaX > 0){
			if(moveRight()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			if(moveLeft()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}else{
		if(deltaY > 0){
			if(moveDown()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			if(moveUp()){
				setTimeout("createNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
});

function moveLeft() {
	if(!canMoveLeft(board)){
		return false;
	}
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
						showMove(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]){
						showMove(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflict[i][k] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp() {
	if(!canMoveUp(board)){
		return false;
	}
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < i; k++){
					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
						showMove(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflict[k][j]){
						showMove(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						hasConflict[k][j] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight() {
	if(!canMoveRight(board)){
		return false;
	}
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						showMove(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflict[i][k]){
						showMove(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflict[i][k] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board)){
		return false;
	}
	for(var i = 2; i >= 0; i--){
		for(var j = 3; j >= 0; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
						showMove(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflict[k][j]){
						showMove(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						hasConflict[k][j] = true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}