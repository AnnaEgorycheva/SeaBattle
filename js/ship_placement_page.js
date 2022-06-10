window.onload = function() {
    var sizeCoordinateMatrix = 10;
    var coordinateMatrix = new Array(sizeCoordinateMatrix);
    for (var i = 0; i < 3; i++) {
        coordinateMatrix[i] = 52.8 * i + 5;
    }
    for (var i = 3; i < 6; i++) {
        coordinateMatrix[i] = 52.8 * i + 3;
    }
    for (var i = 6; i < sizeCoordinateMatrix; i++) {
        coordinateMatrix[i] = 52.8 * i + 1;
    }

    // document.getElementsByClassName('deck2')[0].oncontextmenu = function () {
    //     this.style.transform = `rotate(${this.d = (this.d | 0) + 90}deg)`;
    // }

    canvas = document.getElementsByClassName("playing-field"), 
    context = canvas[0].getContext("2d");
    var img = new Image();
    img.src = "../images/playingField.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, 528, 528);
    };

    let isDragging = false;
    document.addEventListener('dblclick', function(event) {

        let dragElement = event.target.closest('.deckShip');

        if (!dragElement) return;

        event.preventDefault();

        dragElement.ondragstart = function() {
            return false;
        };

        let shiftX, shiftY;

        startDrag(dragElement, event.clientX, event.clientY);

        function onMouseUp(event) {
            finishDrag();
        };

        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }

        function startDrag(element, clientX, clientY) {
            if(isDragging) {
                return;
            }

            isDragging = true;

            document.addEventListener('mousemove', onMouseMove);
            element.addEventListener('mouseup', onMouseUp);

            shiftX = clientX - element.getBoundingClientRect().left;
            shiftY = clientY - element.getBoundingClientRect().top;

            element.style.position = 'fixed';

            moveAt(clientX, clientY);
        };

        function finishDrag() {
            if(!isDragging) {
                return;
            }

            isDragging = false;

            dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset - 52 + 'px';
            dragElement.style.position = 'absolute';

            document.removeEventListener('mousemove', onMouseMove);

            var coord = coordinateCorrection(dragElement);
            dragElement.style.left = coord[0] +'px';
            dragElement.style.top = coord[1] +'px';
            
            dragElement.removeEventListener('mouseup', onMouseUp);
        }

        function moveAt(clientX, clientY) {
            let newX = clientX - shiftX;
            let newY = clientY - shiftY;

            let newBottom = newY + dragElement.offsetHeight;
            let newRight = newX + dragElement.offsetWidth;

            if (newBottom > document.documentElement.clientHeight) {
                let docBottom = document.documentElement.getBoundingClientRect().bottom;

                let scrollY = Math.min(docBottom - newBottom, 10);
                if (scrollY < 0) scrollY = 0;

                window.scrollBy(0, scrollY);

                newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
            }

            if (newRight > document.documentElement.clientWidth) {
                let docRight = document.documentElement.getBoundingClientRect().right;

                let scrollX = Math.min(docRight - newRight, 10);
                if (scrollX < 0) scrollX = 0;

                window.scrollBy(scrollX, 0);

                newX = Math.min(newX, document.documentElement.clientWidth - dragElement.offsetWidth);
            }
            
            if (newY < 0) {
                let scrollY = Math.min(-newY, 10);
                if (scrollY < 0) scrollY = 0; 

                window.scrollBy(0, -scrollY);
                newY = Math.max(newY, 0); 
            }

            if (newX < 0) {
                let scrollX = Math.min(-newX, 10);
                if (scrollX < 0) scrollX = 0; 

                window.scrollBy(-scrollX, 0);
                newX = Math.max(newX, 0); 
            }

            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }
    });

    function coordinateCorrection(element) {
        var x = parseInt(element.style.left);
        var y = parseInt(element.style.top);
        var nameClass = element.className[20];
        var indentX = (window.innerWidth - 528) / 2;
        var indentY = 94;
        var sizeField = 528;
        if (x < indentX && y < indentY) {
            return [coordinateMatrix[0] + indentX, coordinateMatrix[0] + indentY];
        }
        else if (x > indentX + sizeField && y < indentY) {
            if (nameClass === "1") {
                return [coordinateMatrix[9] + indentX, coordinateMatrix[0] + indentY];
            }
            else if (nameClass === "2") {
                return [coordinateMatrix[8] + indentX, coordinateMatrix[0] + indentY];
            }
            else if (nameClass === "3") {
                return [coordinateMatrix[7] + indentX, coordinateMatrix[0] + indentY];
            }
            else if (nameClass === "4") {
                return [coordinateMatrix[6] + indentX, coordinateMatrix[0] + indentY];
            }            
        }
        else if (y < indentY) {
            for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                if (x < coordinateMatrix[i + 1] + indentX) {
                    return [coordinateMatrix[i] + indentX, coordinateMatrix[0] + indentY];
                }
            }
            return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[0] + indentY];
        }
        else if (x < indentX && y > indentY + sizeField) {
            return [coordinateMatrix[0] + indentX, coordinateMatrix[9] + indentY];
        }
        else if (x > indentX + sizeField && y > indentY + sizeField) {
            if (nameClass === "1") {
                return [coordinateMatrix[9] + indentX, coordinateMatrix[9] + indentY];
            }
            else if (nameClass === "2") {
                return [coordinateMatrix[8] + indentX, coordinateMatrix[9] + indentY];
            }
            else if (nameClass === "3") {
                return [coordinateMatrix[7] + indentX, coordinateMatrix[9] + indentY];
            }
            else if (nameClass === "4") {
                return [coordinateMatrix[6] + indentX, coordinateMatrix[9] + indentY];
            }            
        }
        else if (y > indentY + sizeField) {
            for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                if (x < coordinateMatrix[i + 1] + indentX) {
                    return [coordinateMatrix[i] + indentX, coordinateMatrix[9] + indentY];
                }
            }
            return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[9] + indentY];
        }
        else if (x < indentX) {
            for (var i = 0; i < sizeCoordinateMatrix - 1; i++) {
                if (y < coordinateMatrix[i + 1] + indentY) {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[i] + indentY];
                }
            }
            return [coordinateMatrix[0] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
        }
        else if (x > indentX + sizeField) {
            for (var i = 0; i < sizeCoordinateMatrix - 1; i++) {
                if (y < coordinateMatrix[i + 1] + indentY) {
                    if (nameClass === "1") {
                        return [coordinateMatrix[9] + indentX, coordinateMatrix[i] + indentY];
                    }
                    else if (nameClass === "2") {
                        return [coordinateMatrix[8] + indentX, coordinateMatrix[i] + indentY];
                    }
                    else if (nameClass === "3") {
                        return [coordinateMatrix[7] + indentX, coordinateMatrix[i] + indentY];
                    }
                    else if (nameClass === "4") {
                        return [coordinateMatrix[6] + indentX, coordinateMatrix[i] + indentY];
                    }    
                }
            }
            if (nameClass === "1") {
                return [coordinateMatrix[9] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
            }
            else if (nameClass === "2") {
                return [coordinateMatrix[8] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
            }
            else if (nameClass === "3") {
                return [coordinateMatrix[7] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
            }
            else if (nameClass === "4") {
                return [coordinateMatrix[6] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
            }   
        }
        else {
            for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                if (x < coordinateMatrix[i + 1] + indentX) {
                    for (var j = 0; j < sizeCoordinateMatrix - 1; j++) {
                        if (y < coordinateMatrix[j + 1] + indentY) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[j] + indentY];
                        }
                    }
                    return [coordinateMatrix[i] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
                    
                }
            }
            for (var j = 0; j < sizeCoordinateMatrix - 1; j++) {
                if (y < coordinateMatrix[j + 1] + indentY) {
                    return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[j] + indentY];
                }
            }
            return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[sizeCoordinateMatrix - 1] + indentY];
        }
    }
}

