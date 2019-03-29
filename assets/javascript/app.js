$(document).ready(function () {

    var topics = [
        "crying",
        "dancing",
        "eating",
        "laughing",
        "smiling",
        "waiting",
        "cooking",
        "running",
        "pouting",
        "flirting",
    ]

    for (var i = 0; i < topics.length; i++) {
        var topicBtn = $("<button>");
        topicBtn.addClass("topics-button topics topics-button-color");
        topicBtn.attr("data-topics", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons").append(topicBtn);

    }

    $("#buttons").on("click", function () {
        topics = $(this).attr("topics");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topics + "&api_key=Je8KbWRnNvJBwpqWK3LwU7ddFVvZ8pHy";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var topicImage = $("<img>");


                    topicImage.attr("src", results[i].images.fixed_height.url);


                    gifDiv.append(p);
                    gifDiv.append(topicImage);

                    $("#gifs-appear-here").prepend(gifDiv);


                }
            });


    });
});

