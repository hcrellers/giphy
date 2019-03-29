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
       var query = $(this).attr("topics");
       console.log(query)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            query + "&api_key=Je8KbWRnNvJBwpqWK3LwU7ddFVvZ8pHy";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv =  $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var topicImage = $("<img>");

                    topicImage.attr("src", results[i].images.fixed_height.url);
                    topicBtn.attr("data-state", "still");
                    topicBtn.attr("data-animate", results[i].images.fixed_height.url)

                    gifDiv.append(p);
                    gifDiv.append(topicImage);

                    $("#gifs-appear-here").prepend(gifDiv);


                }

                $("#add-gif").on("click", function(event) {
                    
                    event.preventDefault();
                    var gif = $("#gif-input").val().trim();
                    topics.push(gif);
        
                    renderButtons();
                    console.log(gif)
                  });

                $("topics").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });


    });
});

