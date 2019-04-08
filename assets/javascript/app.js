let topics = ["Georgia Tech Yellow Jackets", "Boston College Eagles", "Clemson Tigers", "Florida State Seminoles", "Louisville Cardinals", "North Carolina State Wolfpack",
    "Syracuse Orange", "Wake Forest Demon Deacons", "Duke Blue Devils", "Miami Hurricanes", "North Carolina Tar Heels", "Pittsburgh Panthers", "Virginia Cavaliers",
    "Virginia Tech Hokies"];

let topicsC1 = ["white", "maroon", "rgb(255, 104, 36)", "maroon", "red", "red", "rgb(255, 104, 36)", "rgb(155, 125, 55)", "rgb(0, 0, 156)", "rgb(255, 104, 36)", "lightblue", "navy", "rgb(255, 104, 36)", "maroon"];

let topicsC2 = ["rgb(179, 163, 105)", "rgb(182, 162, 104)", "purple", "rgb(206, 184, 136)", "black", "black", "blue", "black", "white", "green", "navy", "gold", "navy", "rgb(255, 104, 36)"];

function gimmeButtons() {
    console.log(topics);
    console.log(topics.length)
    // debugger;
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);
        const button = $("<button>");

        button.addClass("btn school-btn");
        button.attr("data-name", topics[i]);
        button.attr("style", `background-color: ${topicsC1[i]}; color: ${topicsC2[i]}; border: 3px solid ${topicsC2[i]}`);
        button.text(topics[i].toUpperCase());
        $("#buttons-view").append(button);

    }
}

function displaySchoolInfo() {

    $("button").on("click", function () {
        $("#images").empty();
        let theGoods = "";
        const school = $(this).attr("data-name");
        console.log("school:", school)

        const APIKey = "dc6zaTOxFJmzC";
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${school}%20College%20Football&limit=10&api_key=${APIKey}`;
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // console.log(response.data[0])

            let theGoods = response.data;
            console.log("Length:", theGoods.length)
            for (var x = 0; x < theGoods.length; x++) {

                const imageDiv = $("<div>");

                let rating = theGoods[x].rating;

                const p = $("<p>").text("Rating: " + rating);

                let schoolImage = $("<img>");

                schoolImage.attr("src", theGoods[x].images.fixed_height_still.url);
                schoolImage.attr("data-still", theGoods[x].images.fixed_height_still.url)
                schoolImage.attr("data-animate", theGoods[x].images.fixed_height.url)
                schoolImage.attr("data-state", "still");
                schoolImage.addClass("giphy");
                // console.log("image-still:", theGoods[x].images.fixed_height_still.url);
                // console.log("image-animate:", theGoods[x].images.fixed_height.url)
                imageDiv.append(p);
                imageDiv.prepend(schoolImage);

                $("#images").append(imageDiv)



            }
            $(".giphy").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                let state = $(this).attr("data-state");
                console.log("state:", state);
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
            });
        });


    });
}


// This function handles events where a topic button is clicked to be created
$("#add-school").on("click", function (event) {
    event.preventDefault();
    if ($("#school").val() !== "Other Major College Football Teams") {
        let newSchool = $("#school").val();
        console.log("Option:", newSchool)
        let newC1 = $("#Air Force Falcons").attr("data-c");
        console.log("newC1:", $("#Air Force Falcons").attr("data-c"));
        let newC2 = ($(this).data("b"));
        console.log("newC2:", newC2)
        topics.push(newSchool);
        topicsC1.push("white");
        topicsC2.push("black");
        gimmeButtons();
    };
});



// Adding a click event listener to all elements with a class of "school-btn"
$(document).on("click", ".school-btn", displaySchoolInfo);

// Calling the renderButtons function to display the intial buttons
gimmeButtons();
