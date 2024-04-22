$(document).ready(function() {
    const baseURL = "http://localhost:3000";
    var moviesData; // Store movie data globally

    // Function to fetch movie data from the server
    function fetchMovies() {
        $.get(`${baseURL}/films`, function(data) {
            moviesData = data; // Store movie data globally
            populateMovieList(moviesData);
            displayMovieDetails(moviesData[0]);
        });
    }

    // Populate the movie list sidebar
    function populateMovieList(movies) {
        var $filmsList = $("#films");
        $filmsList.empty(); // Clear previous list
        movies.forEach(function(movie) {
            var $filmItem = $("<li>", {
                class: "film item",
                text: movie.title
            });
            $filmItem.data("movie", movie); // Store movie data
            $filmsList.append($filmItem);
        });
    }

    // Display details of the selected movie
    function displayMovieDetails(movie) {
        $("#title").text(movie.title);
        $("#runtime").text(movie.runtime + " minutes");
        $("#showtime").text(movie.showtime);
        var availableTickets = movie.capacity - movie.tickets_sold;
        $("#ticket-num").text(availableTickets + " remaining tickets");
        $("#poster").attr("src", movie.poster);
        $("#film-info").text(movie.description);
    }

    // Event listener for clicking on a movie in the sidebar
    $("#films").on("click", "li", function() {
        var movie = $(this).data("movie");
        displayMovieDetails(movie);
    });

    // Event listener for buying a ticket
    $("#buy-ticket").click(function() {
        var selectedMovie = $("#title").text();
        var movie = moviesData.find(function(movie) {
            return movie.title === selectedMovie;
        });
        if (movie) {
            if (movie.tickets_sold < movie.capacity) {
                movie.tickets_sold++;
                displayMovieDetails(movie);
                var availableTickets = movie.capacity - movie.tickets_sold;
                if (availableTickets === 0) {
                    alert("Sorry, tickets are sold out for this movie!");
                }
            } else {
                alert("Sorry, tickets are sold out for this movie!");
            }
        }
    });

    // Initialize the page
    fetchMovies();
});
