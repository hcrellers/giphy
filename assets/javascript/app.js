$(document).ready(function () {

    var topics = [
        "cosmic",
        "stars",
        "moon",
        "mercury",
        "astrology",
        "astronaut",
        "retrograde",
        "comet",
        "rocket",
        "space",
    ]
    function displayGifs() {
        $("#buttons").empty()
        for (var i = 0; i < topics.length; i++) {
            var topicBtn = $("<button type='button' class='btn'>");
            topicBtn.addClass("topics-button topics topics-button-color");
            topicBtn.attr("data-topics", topics[i]);
            topicBtn.text(topics[i]);
            $("#buttons").append(topicBtn);

        }
    }
    displayGifs();

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        console.log(gif);
        $("#gif-input").val('');
        displayGifs();



        console.log(gif)
        console.log(event)
    });

    $(".topics-button").on("click", function () {
        var query = $(this).attr("data-topics");
        console.log(query)



        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            query + "&api_key=Je8KbWRnNvJBwpqWK3LwU7ddFVvZ8pHy&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div>");

                        var rating = results[i].rating;

                        var gifAnimate = results[i].images.fixed_height.url;
                        var gifStill = results[i].images.fixed_height_still.url;

                        var p = $("<p>").text("Rating: " + rating);

                        var topicImage = $("<img>");

                     

                        topicImage.attr("src", gifStill);
                        topicImage.addClass("astroGifs")
                        topicImage.attr("data-state", "still");
                        topicImage.attr("data-still", gifStill)
                        topicImage.attr("data-animate", gifAnimate)
                       // gifDiv.append(p);
                        gifDiv.append(topicImage);
                        $("#gifs-appear-here").prepend(gifDiv);

                    }

                }

               

                $(document).on("click", ".astroGifs", pauseGifs);

                function pauseGifs() {

                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }




                };


            });
    });
});
