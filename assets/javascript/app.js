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
];

var sillyBtn = [

];

var userBtn = [];

$(document).ready(function() {
    generateBtn(seriousBtn);
    generateBtn(sillyBtn);
});

function generateBtn(currentBtn) {
    for (var i = 0; i < currentBtn.length; i++) {
      var gifBtn = $("<img>");
      gifBtn.addClass("gif-button");
      gifBtn.attr("data-name", currentBtn[i].name);
      gifBtn.attr("src", currentBtn[i].src);
      gifBtn.attr("alt", `${currentBtn[i].name} button`);
      gifBtn.attr("title", currentBtn[i].name); //adding title annotates when you hover!
      $("#btn-container").append(gifBtn);
    }
}

$("#btn-container").on('click', ".gif-button", function() {
    console.log("clicked!");

    var name = $(this).attr("data-name");
    console.log(name);
    var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=zVyDwVspu8j5Z5ZC0wZCfki71mHSaYur&q=${name}&limit=10&offset=0&rating=PG-13&lang=en`

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        var gifs = response.data
        for(i=0; i < gifs.length; i++) {
            var gif = $(`<img class="gifs" alt="${name}-gif-${i}" src="${gifs[i].images.fixed_height.url}">`);
            $("#display").append(gif);
        }
    })
});
  

//clear button to remove gifs
$("#clear").on("click", function() {
    $("#display").empty();

});

