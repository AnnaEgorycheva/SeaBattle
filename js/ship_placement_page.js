window.onload = function() {
    var sizeCoordinateMatrix = 10;
    var coordinateMatrix = new Array(sizeCoordinateMatrix);
    for (var i = 0; i < sizeCoordinateMatrix; i++) {
        coordinateMatrix[i] = 52.8 * i;
    }

    canvas = document.getElementsByClassName("playing-field"), 
    context = canvas[0].getContext("2d");
    var img = new Image();
    img.src = "../images/playingField.png";
    img.onload = function() {
        context.drawImage(img, 0, 0, 528, 528);
    };

    let isDragging = false;

    document.addEventListener('mousedown', function(event) {

        let dragElement = event.target.closest('.f');

        if (!dragElement) return;

        event.preventDefault();

        dragElement.ondragstart = function() {
            return false;
        };

        let coords, shiftX, shiftY;

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

            // console.log("dfd" + dragElement.style.left);
            // dragElement.style.left = (parseInt(dragElement.style.left,10)+50)+'px';
            // console.log(dragElement.style.left);

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
}

