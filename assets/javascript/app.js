var seriousBtn = [
    {   name: "nebula",
        src: "assets/images/nebula.png",
    },
    {   name: "star trek space",
        src: "assets/images/trek.png",
    },
    {   name: "planets",
        src: "assets/images/saturn_dan_gerhards_01.svg",
    },
    {   name: "pizza in space",
        src: "assets/images/pizza.png",
    },
    {   name: "lumpy space princess",
        src: "assets/images/lumpy.png",
    },    
    {   name: "comet",
        src: "assets/images/comet.png",
    }, 
];


//formatted as such if I wanted to add different button types but run the same function
$(document).ready(function() {
    generateBtn(seriousBtn);
});

function generateBtn(currentBtn) {
    for (var i = 0; i < currentBtn.length; i++) {
      var gifBtn = $("<img>");
      gifBtn.addClass("gif-button page-gif-button");
      gifBtn.attr("data-name", currentBtn[i].name);
      gifBtn.attr("src", currentBtn[i].src);
      gifBtn.attr("alt", `${currentBtn[i].name} button`);
      gifBtn.attr("title", currentBtn[i].name); //adding title annotates when you hover!
      $("#default-container").append(gifBtn);
    }
}

$(".btn-container").on('click', ".gif-button", function() {
    $('html, body').animate({
        scrollTop: $("#display").offset().top
    }, 500);

    var name = $(this).attr("data-name");
    var key = "GMDX20EBtJD3CIpvd4ECT4g1zYlzeBIT"
    var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${name}&limit=12&offset=0&rating=PG-13&lang=en`

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        var gifs = response.data
        for(i=0; i < gifs.length; i++) {
            var rating = gifs[i].rating;
            var gif = $(`
                <img class="gifs img-fluid" 
                alt="${name}-gif-${i}" 
                src="${gifs[i].images.fixed_height_still.url}"
                data-still="${gifs[i].images.fixed_height_still.url}"
                data-animate="${gifs[i].images.fixed_height.url}"
                data-state="still"
            >`);
            var p = $("<p>").text(`Rating: ${rating}`) ;
            var d = $("<div>").addClass("gif-house");
            d.addClass("col-md-3")
            d.append(gif);
            d.append(p);
            $("#display").prepend(d);
        }
    })
});

$("#display").on("click", ".gifs", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});


$("#input-btn").on('click', function(event) {
    event.preventDefault();
    var userInput = $("#user-input").val().trim()
    var userBtn = $(`<button>`)
    userBtn.text(`${userInput}`);
    userBtn.addClass("btn btn-info gif-button user-gif-button");
    userBtn.attr("data-name", `${userInput} in space` );
    $("#user-container").append(userBtn);
    $("#user-input").val("");
});
  

//clear button to remove gifs
$("#clear-gif").on("click", function() {
    $("#display").empty();

});

$("#clear-btn").on("click", function() {
    $("#user-container").empty();
});

