function fillUserField() {
    let user = new User(10);
    getShipsLocation(user.playerField, user.ships, chooseAlgorithmBasedOnLevel('easy'));

    let userShipsPositions = convertPlayerInfoToLightShipInfo(user);
    localStorage.setItem('userFieldInfo', JSON.stringify(userShipsPositions));

    console.log(user);
    console.log(userShipsPositions);
    console.log(convertLightShipInfoToPlayerInfo(userShipsPositions, 'user'));
}

window.onload = function() {
    $('.auto-placement-btn').click(fillUserField);

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

    document.getElementsByClassName('deck4')[0].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck4_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '197');
        }
        else {
            this.setAttribute('src', '../images/deck4.png');
            this.setAttribute('width', '197');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }
    document.getElementsByClassName('deck3')[0].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck3_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '147');
        }
        else {
            this.setAttribute('src', '../images/deck3.png');
            this.setAttribute('width', '147');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }
    document.getElementsByClassName('deck3')[1].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck3_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '147');
        }
        else {
            this.setAttribute('src', '../images/deck3.png');
            this.setAttribute('width', '147');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }
    document.getElementsByClassName('deck2')[0].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck2_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '93');
        }
        else {
            this.setAttribute('src', '../images/deck2.png');
            this.setAttribute('width', '93');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }
    document.getElementsByClassName('deck2')[1].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck2_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '93');
        }
        else {
            this.setAttribute('src', '../images/deck2.png');
            this.setAttribute('width', '93');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }
    document.getElementsByClassName('deck2')[2].ondblclick = function () {
        var width = this.getAttribute('width');
        if (width != '46') {
            this.setAttribute('src', '../images/deck2_90.png');
            this.setAttribute('width', '46');
            this.setAttribute('height', '93');
        }
        else {
            this.setAttribute('src', '../images/deck2.png');
            this.setAttribute('width', '93');
            this.setAttribute('height', '46');
        }
        var coord = coordinateCorrection(this);
        this.style.left = coord[0] +'px';
        this.style.top = coord[1] +'px';
    }

    let canvas = document.getElementsByClassName("playing-field"), 
    context = canvas[0].getContext("2d");
    var img = new Image();
    img.src = "../images/playingField.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, 528, 528);
    };

    let isDragging = false;
    document.addEventListener('mousedown', function(event) {

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
        var width = element.width;
        var indentX = (window.innerWidth - 528) / 2;
        var indentY = 94;
        var sizeField = 528;
        if (x < indentX && y < indentY) {
            return [coordinateMatrix[0] + indentX, coordinateMatrix[0] + indentY];
        }
        else if (x > indentX + sizeField && y < indentY) {
            if (nameClass === "2" && width == '93') {
                return [coordinateMatrix[8] + indentX, coordinateMatrix[0] + indentY];
            }
            else if (nameClass === "3" && width == '147') {
                return [coordinateMatrix[7] + indentX, coordinateMatrix[0] + indentY];
            }
            else if (nameClass === "4" && width == '197') {
                return [coordinateMatrix[6] + indentX, coordinateMatrix[0] + indentY];
            }     
            else {
                return [coordinateMatrix[9] + indentX, coordinateMatrix[0] + indentY];
            }       
        }
        else if (y < indentY) {
            if (width == '46') {
                nameClass = '1';
            }
            for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                if (x < coordinateMatrix[i + 1] + indentX) {
                    return [coordinateMatrix[i] + indentX, coordinateMatrix[0] + indentY];
                }
            }
            return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[0] + indentY];
        }
        else if (x < indentX && y > indentY + sizeField) {   
            if (width == '46') {
                if (nameClass == '2') {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[8] + indentY];
                }
                else if (nameClass == '3') {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[7] + indentY];
                }
                else if (nameClass == '4') {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[6] + indentY];
                }  
                else {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[9] + indentY];
                }   
            } 
            else {
                return [coordinateMatrix[0] + indentX, coordinateMatrix[9] + indentY];
            }
        }
        else if (x > indentX + sizeField && y > indentY + sizeField) {
            if (width == '46') {
                if (nameClass == '2') {
                    return [coordinateMatrix[9] + indentX, coordinateMatrix[8] + indentY];
                }
                else if (nameClass == '3') {
                    return [coordinateMatrix[9] + indentX, coordinateMatrix[7] + indentY];
                }
                else if (nameClass == '4') {
                    return [coordinateMatrix[9] + indentX, coordinateMatrix[6] + indentY];
                } 
                else {
                    return [coordinateMatrix[9] + indentX, coordinateMatrix[9] + indentY];
                }    
            } 
            else {
                if (nameClass == '2') {
                    return [coordinateMatrix[8] + indentX, coordinateMatrix[9] + indentY];
                }
                else if (nameClass == '3') {
                    return [coordinateMatrix[7] + indentX, coordinateMatrix[9] + indentY];
                }
                else if (nameClass == '4') {
                    return [coordinateMatrix[6] + indentX, coordinateMatrix[9] + indentY];
                }   
            }         
        }
        else if (y > indentY + sizeField) {
            if (width == '46') {
                if (nameClass == "2") {
                    nameClass = '1';
                    for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                        if (x < coordinateMatrix[i + 1] + indentX) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[8] + indentY];
                        }
                    }
                    return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[8] + indentY];
                }
                else if (nameClass == '3') {
                    nameClass = '1';
                    for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                        if (x < coordinateMatrix[i + 1] + indentX) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[7] + indentY];
                        }
                    }
                    return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[7] + indentY];
                }
                else if (nameClass == '4') {
                    nameClass = '1';
                    for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                        if (x < coordinateMatrix[i + 1] + indentX) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[6] + indentY];
                        }
                    }
                    return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[6] + indentY];
                }
                else {
                    for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                        if (x < coordinateMatrix[i + 1] + indentX) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[9] + indentY];
                        }
                    }
                    return [coordinateMatrix[9] + indentX, coordinateMatrix[9] + indentY];
                }
            }
            else {
                for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                    if (x < coordinateMatrix[i + 1] + indentX) {
                        return [coordinateMatrix[i] + indentX, coordinateMatrix[9] + indentY];
                    }
                }
                return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[9] + indentY];
            
            }
        }
        else if (x < indentX) {
            var heightShip = 1;
            if (width == '46') {
                heightShip = parseInt(nameClass);
            }
            for (var i = 0; i < sizeCoordinateMatrix - heightShip; i++) {
                if (y < coordinateMatrix[i + 1] + indentY) {
                    return [coordinateMatrix[0] + indentX, coordinateMatrix[i] + indentY];
                }
            }
            return [coordinateMatrix[0] + indentX, coordinateMatrix[sizeCoordinateMatrix - heightShip] + indentY];
        }
        else if (x > indentX + sizeField) {
            if (width == '46') {
                for (var i = 0; i < sizeCoordinateMatrix - nameClass; i++) {
                    if (y < coordinateMatrix[i + 1] + indentY) {
                        return [coordinateMatrix[9] + indentX, coordinateMatrix[i] + indentY]; 
                    }
                }
                return [coordinateMatrix[9] + indentX, coordinateMatrix[sizeCoordinateMatrix - nameClass] + indentY];
            }
            for (var i = 0; i < sizeCoordinateMatrix - 1; i++) {
                if (y < coordinateMatrix[i + 1] + indentY) {
                    if (nameClass === "2") {
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
            var heightShip = 1;
            if (width == '46') {
                if (nameClass == '2') {
                    heightShip = 2;
                } 
                else if (nameClass == '3') {
                    heightShip = 3;
                }
                else if (nameClass == '4') {
                    heightShip = 4;
                }
                else {
                    heightShip = 1;
                }
                nameClass = '1';
            }
            for (var i = 0; i < sizeCoordinateMatrix - parseInt(nameClass); i++) {
                if (x < coordinateMatrix[i + 1] + indentX) {
                    for (var j = 0; j < sizeCoordinateMatrix - heightShip; j++) {
                        if (y < coordinateMatrix[j + 1] + indentY) {
                            return [coordinateMatrix[i] + indentX, coordinateMatrix[j] + indentY];
                        }
                    }
                    return [coordinateMatrix[i] + indentX, coordinateMatrix[sizeCoordinateMatrix - heightShip] + indentY];
                    
                }
            }
            for (var j = 0; j < sizeCoordinateMatrix - heightShip; j++) {
                if (y < coordinateMatrix[j + 1] + indentY) {
                    return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[j] + indentY];
                }
            }
            return [coordinateMatrix[sizeCoordinateMatrix - parseInt(nameClass)] + indentX, coordinateMatrix[sizeCoordinateMatrix - heightShip] + indentY];
        }
    }
}

