window.onload = function() {
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
    
    function userMove(result) {
        document.getElementsByClassName("field-owner-name-me")[0].style.fontWeight = "normal";
        document.getElementsByClassName("field-owner-name-opponent")[0].style.fontWeight = "bold";
        canvasOpponent[0].onmousedown = function (e) {
            var loc = windowToCanvas(canvasOpponent, e.clientX, e.clientY);
            console.log(loc.x);
            console.log(loc.y);
            if (result) {
                
            } else {
               
            }
        }; 
    }

    //userMove(true);
}



