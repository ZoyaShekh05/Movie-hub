
const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");


// ================= SEARCH MOVIES =================

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let query = movieInput.value.trim();

    if (!query) {
        movieInput.focus();
        return;
    }

    searchMovies(query);
});


async function searchMovies(movieName) {

    // Loading UI
    movieHub.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20">
            <div class="w-12 h-12 rounded-full
                        border-4 border-purple-500/20
                        border-t-purple-500
                        animate-spin">
            </div>

            <p class="mt-5 text-gray-500">
                Searching for movies...
            </p>
        </div>
    `;


    try {

        let response = await fetch(
            `https://www.omdbapi.com/?apikey=e14b7671&s=${encodeURIComponent(movieName)}`
        );

        let data = await response.json();

        console.log(data);
       
        if (data.Response === "True") {

            displayMovies(data.Search);

        } else {

            movieHub.innerHTML = `
                <div class="col-span-full flex flex-col items-center
                            justify-center py-20 text-center">

                    <div class="w-20 h-20 rounded-full
                                bg-purple-500/10
                                flex items-center justify-center
                                text-3xl mb-5">
                        🎬
                    </div>

                    <h3 class="text-xl font-semibold text-white">
                        No Movies Found
                    </h3>

                    <p class="text-gray-500 mt-2">
                        ${data.Error}
                    </p>

                    <p class="text-sm text-gray-600 mt-4">
                        Try searching with another movie title.
                    </p>

                </div>
            `;
        }

    } catch (error) {

        console.error(error);

        movieHub.innerHTML = `
            <div class="col-span-full text-center py-20">

                <div class="text-5xl mb-4">
                    ⚠️
                </div>

                <h3 class="text-xl font-semibold">
                    Something went wrong
                </h3>

                <p class="text-gray-500 mt-2">
                    Please check your internet connection and try again.
                </p>

            </div>
        `;
    }
    
}


// ================= DISPLAY MOVIES =================

function displayMovies(movies) {

    movieHub.innerHTML = "";


    movies.forEach((movie) => {

        const div = document.createElement("div");

        div.dataset.imdbID = movie.imdbID;

        div.setAttribute(
            "class",
            `movie-card group cursor-pointer
             bg-white/[0.04]
             border border-white/[0.08]
             rounded-2xl overflow-hidden
             backdrop-blur-xl
             transition-all duration-300
             hover:-translate-y-2
             hover:border-purple-500/40
             hover:shadow-2xl
             hover:shadow-purple-900/20`
        );


        // Poster fallback
        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/500x750/171122/ffffff?text=No+Poster";


        div.innerHTML = `

            <!-- Poster -->
            <div class="relative overflow-hidden">

                <img
                    src="${poster}"
                    alt="${movie.Title}"
                    class="w-full h-[390px]
                           object-cover
                           transition duration-500
                           group-hover:scale-105"
                >


                <!-- Gradient -->
                <div class="absolute inset-0
                            bg-gradient-to-t
                            from-black/80
                            via-transparent
                            to-transparent
                            opacity-80">
                </div>


                <!-- Movie Type -->
                <div class="absolute top-3 left-3">

                    <span class="px-3 py-1
                                 rounded-full
                                 bg-black/60
                                 backdrop-blur-md
                                 border border-white/10
                                 text-xs text-gray-200">

                        ${movie.Type || "Movie"}

                    </span>

                </div>


                <!-- Play Button -->
                <div class="absolute inset-0
                            flex items-center justify-center
                            opacity-0
                            group-hover:opacity-100
                            transition duration-300">

                    <div class="w-14 h-14 rounded-full
                                bg-purple-600
                                flex items-center justify-center
                                shadow-xl
                                shadow-purple-600/40
                                scale-75
                                group-hover:scale-100
                                transition">

                        <span class="text-xl ml-1">
                            ▶
                        </span>

                    </div>

                </div>

            </div>


            <!-- Movie Info -->
            <div class="p-5">

                <h3 class="font-bold text-lg
                           text-white
                           line-clamp-2
                           group-hover:text-purple-300
                           transition">

                    ${movie.Title}

                </h3>


                <div class="flex items-center
                            justify-between
                            mt-3">

                    <div class="flex items-center gap-2">

                        <span class="text-purple-400">
                            📅
                        </span>

                        <span class="text-sm text-gray-400">
                            ${movie.Year}
                        </span>

                    </div>


                    <span class="text-xs
                                 px-2.5 py-1
                                 rounded-md
                                 bg-purple-500/10
                                 text-purple-300
                                 border border-purple-500/10">

                        ${movie.Type || "Movie"}

                    </span>

                </div>


                <!-- View Details -->
                <div class="mt-5 pt-4
                            border-t border-white/5
                            flex items-center
                            justify-between">

                    <span class="text-sm text-gray-500">
                        View details
                    </span>

                    <span class="text-purple-400
                                 group-hover:translate-x-1
                                 transition">

                        →
                    </span>

                </div>

            </div>
        `;


        movieHub.append(div);

    });
}

// ================= MOVIE CARD CLICK =================

movieHub.addEventListener("click", (e) => {

    e.stopPropagation();

    const movieCard = e.target.closest(".movie-card");

    if (!movieCard) return;

    const imdbID = movieCard.dataset.imdbID;

    location.href = `movie-details.html?id=${imdbID}`;

});