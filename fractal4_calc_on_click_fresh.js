function doTheMath() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Choose random complex constant "c"
    var cRe = Math.random() * 2 - 1;
    var cIm = Math.random() * 2 - 1;
    //var c = cRe + cIm * i;

    // Choose random order "n"
    //var n = Math.floor(Math.random() * 8) + 2;

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
            z = zRe + zIm * i;

            for (i = 0; i < 100; i++) {
                znRe = zRe * zRe - zIm * zIm + cRe;
                znIm = 2 * zRe * zIm + cIm;
                zRe = znRe;
                zIm = znIm;
                if (zRe * zRe + zIm * zIm > 4) {
                    break;
                }
            }

            // Array of colors
            colors = ["rgb(0,0,0)", "rgb(1, 22, 39)", "rgb(253, 255, 252)", "rgb(46, 196, 182)", "rgb(231, 29, 54)", "rgb(255, 159, 28)", "rgb(216, 226, 220)", "rgb(255, 229, 217)", "rgb(255, 215, 186)", "rgb(254, 200, 154)"];

            ctx.fillStyle = colors[i % 10];
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


    // Add CSS styles for animation
    image.style.transition = "all 1s ease-out";

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