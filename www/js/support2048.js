function getPosTop(i, j) {
	if($(document).width() > 510){
		return 20 + (i * 120);
	}else if($(document).width() < 410){
		return 12 + (i * 72)
	}else{
		return 16 + (i * 96)
	}
}
function getPosLeft(i, j) {
	if($(document).width() > 510){
		return 20 + (j * 120);
	}else if($(document).width() < 410){
		return 12 + (j * 72)
	}else{
		return 16 + (j * 96);
	}
}

function getNumberBGColor(num) {
	switch(num){
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#99cc00"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#0099cc"; break;
		case 4096: return "#aa66cc"; break;
		case 8192: return "#9933cc"; break;
	}
	return "black";
}
function getNumberColor(num) {
	if(num <= 4){
		return "#776e65";
	}
	return "white";
}

function noSpace(board) {
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(board) {
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board) {
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				if(board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(board) {
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++){
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}

function noBlockVertical(col, row1, row2, board) {
	for(var i = row1 + 1; i < row2; i++){
		if(board[i][col] != 0){
			return false;
		}
	}
	return true;
}

function noMove(board) {
	if(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)){
		return false;
	}
	return true;
}