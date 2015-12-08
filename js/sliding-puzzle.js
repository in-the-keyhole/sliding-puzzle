$(function () {

    //variables
    var aspect = "3:4",
        aspect_width = parseInt(aspect.split(":")[0]),
        aspect_height = parseInt(aspect.split(":")[1]),
        container = $("#puzzle"),
        imgContainer = container.find("figure"),
        img = imgContainer.find("img"),
        path = img.attr("src"),
        piece = $("<div/>"),
        piece_width = Math.floor(img.width() / aspect_width),
        piece_height = Math.floor(img.height() / aspect_height),
        idCounter = 0,
        positions = [],
        empty = {
            top: 0,
            left: 0,
            bottom: piece_height,
            right: piece_width
        };


    //generate puzzle pieces
    for (var x = 0, y = aspect_height; x < y; x++) {
        for (var a = 0, b = aspect_width; a < b; a++) {
            var top = piece_height * x,
                left = piece_width * a;

            piece.clone().attr("id", idCounter++).css({
                width: piece_width,
                height: piece_height,
                position: "absolute",
                top: top,
                left: left,
                backgroundImage: ["url(", path, ")"].join(""),
                backgroundPosition: ["-", piece_width * a, "px ", "-", piece_height * x, "px"].join("")
            }).appendTo(imgContainer);

            //store positions
            positions.push({ top: top, left: left });
        }
    }

    //remove original image
    img.remove();

    //remove first piece from board
    container.find("#0").remove();

    //remove first item in positions array
    positions.shift();

    $("#start").on("click", function (e) {

        //shuffle the pieces randomly
        var pieces = imgContainer.children();

        function shuffle(array) {
            var i = array.length;
            if (i === 0) {
                return false;
            }
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1)),
                    tempi = array[i],
                    tempj = array[j];

                array[i] = tempj;
                array[j] = tempi;
            }
        }

        shuffle(pieces);

        //set position of shuffled images
        $.each(pieces, function (i) {
            pieces.eq(i).css(positions[i]);
        });

        //replace existing pieces with shuffled pieces
        pieces.appendTo(imgContainer);

        //make sure empty slot is at position 0 when timer starts
        empty.top = 0;
        empty.left = 0;

    });

});