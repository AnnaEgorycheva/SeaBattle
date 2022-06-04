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
}
