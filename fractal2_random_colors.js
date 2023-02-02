var imageIndex = 0;
var canvasList = [];
var animationSpeed = 100;

function doTheMath(index, frames) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;

    // Choose complex constant "c"
    var cRe = Math.cos(index * 2 * Math.PI / frames);
    var cIm = Math.sin(index * 2 * Math.PI / frames);
    //var c = cRe + cIm * index;

    // Choose random order "n"
    //var n = 2 + Math.floor(Math.random() * frames / 5);

    var x;
    var y;
    var zRe;
    var zIm;
    var znRe;
    var znIm;
    var i;
    var colorIndex;
    var red;
    var green;
    var blue;

    // Draw shapes based on equation z^n = z * z^(n-1)
    // Array of random RGB colors
    var colors = ["rgb(0,0,0)"];
    for (i = 0; i < 9; i++) {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        colors.push(`rgb(${red}, ${green}, ${blue})`);
    }

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            zRe = (x - canvas.width / 2) / (canvas.width / 4);
            zIm = (y - canvas.height / 2) / (canvas.height / 4);
            //z = zRe + zIm * i;
            colorIndex = 0;
            for (i = 0; i < 50; i++) {
                znRe = zRe * zRe - zIm * zIm + cRe;
                znIm = 2 * zRe * zIm + cIm;
                zRe = znRe;
                zIm = znIm;
                if (zRe * zRe + zIm * zIm > 4) {
                    colorIndex = i % 10;
                    break;
                }
            }
            ctx.fillStyle = colors[colorIndex];
            ctx.fillRect(x, y, 1, 1);
        }
    }

    return canvas;
}

function drawOutput() {

    var frames = 50;

    for (var i = 0; i < frames; i++) {
        canvasList.push(doTheMath(i, frames));
    }

    var image = new Image();
    document.body.appendChild(image);

    setInterval(function() {
        var dataURL = canvasList[imageIndex].toDataURL("image/png");
        var base64 = dataURL.split(',')[1];
        image.src = "data:image/png;base64," + base64;
        imageIndex = (imageIndex + 1) % frames;
    }, animationSpeed);
}

drawOutput();