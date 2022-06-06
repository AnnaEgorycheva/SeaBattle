window.onload = function() {
    canvas = document.getElementsByClassName("playing-field"), 
    context = canvas[0].getContext("2d");
    var img = new Image();
    img.src = "../images/playingField.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, 528, 528);
    };
}