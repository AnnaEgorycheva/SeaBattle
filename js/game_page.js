window.onload = function() {
    var sizeCoordinateMatrix = 10;
    var coordinateMatrix = new Array(sizeCoordinateMatrix);
    for (var i = 0; i < sizeCoordinateMatrix; i++) {
        coordinateMatrix[i] = 52.8 * i;
    }

    canvasOpponent = document.getElementsByClassName("opponent-playing-field");
    canvasMy = document.getElementsByClassName("my-playing-field");
    contextOpponent = canvasOpponent[0].getContext("2d");
    contextMy = canvasMy[0].getContext("2d");
    var imgPlayingField = new Image();
    imgPlayingField.src = "../images/playingField.png";
    imgPlayingField.onload = function() {
        contextOpponent.drawImage(imgPlayingField, 0, 0, 528, 528);
        contextMy.drawImage(imgPlayingField, 0, 0, 528, 528);
    };
    
    function windowToCanvas(canvas, x, y) {
        var box = canvas[0].getBoundingClientRect();
        return { x: x - box.left * (canvas[0].width / box.width),
            y: y - box.top * (canvas[0].height / box.height)
        };
    }; 
    
    function userMove() {
        document.getElementsByClassName("field-owner-name-me")[0].style.fontWeight = "normal";
        document.getElementsByClassName("field-owner-name-opponent")[0].style.fontWeight = "bold";
        canvasOpponent[0].onmousedown = function (e) {
            var loc = windowToCanvas(canvasOpponent, e.clientX, e.clientY);
            var x = identifyCell(loc.x);
            var y = identifyCell(loc.y);
            //result = функция проверки клетки(x, y) получает bool
            result = false;
            if (result) {
                hit(x, y);
            } else {
                emptyCage(x, y);
                canvasOpponent[0].onmousedown = null;
                document.getElementsByClassName("field-owner-name-opponent")[0].style.fontWeight = "normal";
                document.getElementsByClassName("field-owner-name-me")[0].style.fontWeight = "bold";
            }
        }; 
    }

    function identifyCell(coordinate) {
        for (var i = 0; i < sizeCoordinateMatrix - 1; i++) {
            if (coordinate < coordinateMatrix[i + 1]) {
                return i;
            }
        }
        return sizeCoordinateMatrix - 1;
    }

    function emptyCage(x, y) {
        var imgEmptyCage = new Image();
        imgEmptyCage.src = "../images/emptyCage.png";
        imgEmptyCage.onload = function() {
            contextOpponent.drawImage(imgEmptyCage, coordinateMatrix[x], coordinateMatrix[y], 51, 51);
        };        
    }
    
    function hit(x, y) {
        var imgHit = new Image();
        imgHit.src = "../images/hit.png";
        imgHit.onload = function() {
            contextOpponent.drawImage(imgHit, coordinateMatrix[x], coordinateMatrix[y], 51, 51);
        };
    }
}