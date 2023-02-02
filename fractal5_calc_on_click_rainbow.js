function doTheMath() {

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Choose random complex constant "c"
    var cRe = Math.random() * 2 - 1;
    var cIm = Math.random() * 2 - 1;
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
    var colors;


    // Draw shapes based on equation z^n = z * z^(n-1)
    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            zRe = (x - canvas.width / 2) / (canvas.width / 4);
            zIm = (y - canvas.height / 2) / (canvas.height / 4);
            //var z = zRe + zIm * index;

            for (i = 0; i < 100; i++) {
                znRe = zRe * zRe - zIm * zIm + cRe;
                znIm = 2 * zRe * zIm + cIm;
                zRe = znRe;
                zIm = znIm;
                if (zRe * zRe + zIm * zIm > 4) {
                    break;
                }
            }

            colors = ["rgb(0,0,0)", "rgb(255,127,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(75,0,130)", "rgb(148,0,211)"];
            ctx.fillStyle = colors[i % 7];
            ctx.fillRect(x, y, 1, 1);
        }
    }

    return canvas;
}

function drawOutput() {

    var canvas = doTheMath();

    // Convert canvas content to base64 string
    var dataURL = canvas.toDataURL("image/png");
    var base64 = dataURL.split(',')[1];

    var image = new Image();
    image.src = "data:image/png;base64," + base64;
    document.body.appendChild(image);

    // Event handler for switching canvas
    image.addEventListener("click", function() {
        // Switch canvas image source on click
        if (image.src === "data:image/png;base64," + base64) {
            var dataURL2 = doTheMath().toDataURL("image/png");
            var base642 = dataURL2.split(',')[1];
            image.src = "data:image/png;base64," + base642;
        } else {
            image.src = "data:image/png;base64," + base64;
        }
    });

}


drawOutput();