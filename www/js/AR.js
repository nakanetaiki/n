var detector = new AR.Detector();

var ar = function(context, imageData) {
    var markers = detector.detect(imageData);
    drawCorners(context, markers);
    drawId(context, markers);
}

function drawCorners(context, markers) {
    var corners, corner, i, j;
    
    context.lineWidth = 3;
    for (i = 0; i !== markers.length; ++ i) {
        corners = markers[i].corners;
        /*  corners[0].x:左上x
            corners[0].x:左上x
            corners[1].x:右上x
            corners[1].y:右上y
            corners[2].x:右下x
            corners[2].y:右下y
            corners[3].x:左下x
            corners[3].y:左下y
        */
        window.alert("corners[0]:"+corners[0].x+" "+corners[0].y+"\n corners[1]:"+corners[1].x+" "+corners[1].y+"\n corners[3]:"+corners[3].x+" "+corners[3].y);
        
        context.strokeStyle = "red";
        context.beginPath();
        for (j = 0; j !== corners.length; ++ j) {
            corner = corners[j];
            context.moveTo(corner.x, corner.y);
            corner = corners[(j + 1) % corners.length];
            context.lineTo(corner.x, corner.y);
        }
        context.stroke();
        context.closePath();
        
        context.strokeStyle = "green";
        context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        
//        corners1 = corners[0].x;
//        corners2 = corners[0].y;
//        corners3 = corners[1].x;
//        corners4 = corners[1].y;
//        corners5 = corners[3].x;
//        corners6 = corners[3].y;
//        console.log(corners1);
//        window.alert(corners1);
    }
}

function drawId(context, markers) {
    var corners, corner, x, y, i, j;
    
    context.strokeStyle = "blue";
    context.lineWidth = 1;

    for (i = 0; i !== markers.length; ++ i) {
        corners = markers[i].corners;
        
        x = Infinity;
        y = Infinity;
        for (j = 0; j !== corners.length; ++ j) {
            corner = corners[j];
            x = Math.min(x, corner.x);
            y = Math.min(y, corner.y);
        }
        context.strokeText(markers[i].id, x, y);
    }
}