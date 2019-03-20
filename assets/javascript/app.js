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

$(".gif-button").on("click", function() {
    console.log("clicked!");
    var name = $(this.name);
    var queryUrl = `https://api.giphy.com/v1/gifs/search?${name}&api_key=zVyDwVspu8j5Z5ZC0wZCfki71mHSaYur&q=&limit=10&offset=0&rating=PG-13&lang=en`

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })
});
  

//clear button to remove gifs
$("#clear").on("click", function() {
    $("#display").empty();

});
