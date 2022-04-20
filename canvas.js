var cols = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
var rows = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
var step = 50;
var h = 50;
var l = 50;

function handleMouseMove(e) {
    var canvas = document.getElementById("myCanvas");
    BoundingRect = canvas.getBoundingClientRect()
    var offsetX = BoundingRect.left;
    var offsetY = BoundingRect.top;
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    posX = Math.floor((mouseX - h) / step) - 4;
    posY = Math.floor((mouseY - l) / step) - 5;
    $("#movelog").html("Coordinate axis of the mouse hover: " + posX + ", " + posY);
}

function draw(CornerPosition, Die_X, Die_Y) {



    var canvas = document.getElementById("myCanvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    var ctx = canvas.getContext("2d");
    ctx.font = "bold 12px Arial";

    for (var i = 0; i < 10; i++) {
        ctx.fillText(cols[i], l + 20 + i * step, h - 10)
    }

    for (var i = 0; i < 10; i++) {
        ctx.fillText(rows[i], l - 20, step * i + h + 5 + 25)
    }

    // Plot wafer on the grid

    ctx.beginPath();

    ctx.arc(h + 5 * step, l + 5 * step, step * 5, 0 * Math.PI, 2 * Math.PI)
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.2;
    ctx.fill();

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(h + 5 * step, l + 5 * step, step * 4.7, 0 * Math.PI, 2 * Math.PI)
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.stroke();

    // Plot broken corner

    ctx.beginPath();

    if (CornerPosition == "cornerUp") {
        ctx.arc(h + 5 * step, l + 0 * step, step * 0.3, 2 * Math.PI, 1 * Math.PI)
    } else if (CornerPosition == "cornerDown") {
        ctx.arc(h + 5 * step, l + 10 * step, step * 0.3, 1 * Math.PI, 2 * Math.PI)

    } else if (CornerPosition == "cornerRight") {
        ctx.arc(h + 10 * step, l + 5 * step, step * 0.3, 0.5 * Math.PI, 1.5 * Math.PI)
    } else if (CornerPosition == "cornerLeft") {
        ctx.arc(h + 0 * step, l + 5 * step, step * 0.3, 1.5 * Math.PI, 2.5 * Math.PI)
    } else {
        ctx.arc(h + 5 * step, l + 0 * step, step * 0.3, 2 * Math.PI, 1 * Math.PI)
    }

    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fill();

    ctx.stroke();

    // Horizontal grid
    for (var i = 0; i < 11; i++) {

        ctx.beginPath();
        ctx.moveTo(l, i * step + h)

        if (i % Die_Y == 0) {
            ctx.setLineDash([]);
        } else {
            ctx.setLineDash([1, 1]);
        }

        ctx.lineTo(step * 10 + l, i * step + h)
        ctx.stroke();
    }

    // Vertical grid
    for (var i = 0; i < 11; i++) {
        ctx.beginPath();
        ctx.moveTo(l + i * step, h);
        if (i % Die_X == 0) {
            ctx.setLineDash([]);
        } else {
            ctx.setLineDash([1, 1]);
        }
        ctx.lineTo(l + i * step, step * 10 + h)
        ctx.stroke();
    }

    $("#myCanvas").mousemove(function(e) {
        handleMouseMove(e);
    });

}

$(document).ready(function() {

    // initialize the canvas and the slider
    draw("cornerUp", 4, 3)

    $("#DieX_size").slider()
    $("#DieY_size").slider()

    // if the form-check, die slider change 
    $('.form-check-input, #DieX_size, #DieY_size').change(function() {

        if (this.checked) {

            $(".form-check-input").not(this).removeAttr('checked');
            $(this).attr('checked', true);
            var CornerPosition = $(this).val()
        }

        // var CornerPosition = $(".form-check-input").checked

        var CornerPosition = $(".form-check-input:checked").val()

        var dieXsize = $("#DieX_size").val()
        var dieYsize = $("#DieY_size").val()
            // console.log("X:" + $("#DieX_size").val())
            // console.log("Y:" + $("#DieY_size").val())

        draw(CornerPosition, dieXsize, dieYsize)
    })
});