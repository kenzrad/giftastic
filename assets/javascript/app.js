var seriousBtn = [
    {   name: "nebula",
        src: "assets/images/nebula.png",
    },
    {   name: "moon phases",
        src: "assets/images/moon-png-44667.png",
    },
    {   name: "saturn",
        src: "assets/images/saturn_dan_gerhards_01.svg",
    },
    {   name: "comet",
        src: "assets/images/comet.png",
    },
    {   name: "astronaut",
        src: "assets/images/astro.png",
    },
    {   name: "alien",
        src: "assets/images/alien.png",
    },    
    {   name: "mars",
        src: "assets/images/mars.png",
    }, 
];


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
    console.log("clicked!");

    var name = $(this).attr("data-name");
    console.log(name);
    var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=zVyDwVspu8j5Z5ZC0wZCfki71mHSaYur&q=${name}&limit=10&offset=0&rating=PG-13&lang=en`

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var gifs = response.data
        for(i=0; i < gifs.length; i++) {
            var gif = $(`
                <img class="gifs" 
                alt="${name}-gif-${i}" 
                src="${gifs[i].images.original_still.url}"
                data-still="${gifs[i].images.original.url}"
                data-animate="${gifs[i].images.original_still.url}"
                data-state="still"
            >`);
            $("#display").prepend(gif);
        }
    })
});

//come back to this
// $("#user-input").on('keyup', function(event)  {
//     if (event.keyCode == 13) {
//         event.preventDefault();
//         $('#input-btn').click()
//     }
// });

$("#input-btn").on('click', function(event) {
    event.preventdefault();
    var userInput = $("#user-input").val().trim()
    var userBtn = $(`<button>`)
    userBtn.text(`${userInput}`);
    userBtn.addClass("btn btn-info gif-button user-gif-button");
    userBtn.attr("data-name", `${userInput} in space` );
    $("#user-container").append(userBtn);
    $("#user-input").val("");
});
  

//clear button to remove gifs
$("#clear").on("click", function() {
    $("#display").empty();

});

/* <img
src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif"
data-state="still"
class="gif"
/>
<img
src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif"
data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif"
data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif"
data-state="still"
class="gif"
/>
<img
src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif"
data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif"
data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif"
data-state="still"
class="gif"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}); */

