// const movieDetail = document.querySelector("#movie-detail");
// const params = new URLSearchParams(location.search)
// const imdbID = params.get("id");

// if (imdbID) {
//     searchMovie(imdbID.trim())
// }

// async function searchMovie(imdbID) {

//     let response = await fetch(`http://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`);
//     let data = await response.json()
//     console.log(data);

//     if (data.Response === "True") {
//         displayMovie(data)
//     } else {
//         console.log(data.Error);
//     }

// }


// function displayMovie(data){

//    movieDetail.innerHTML =  `<div>
//             <img src=${data.Poster} alt="">
//         </div>

//         <div>
//             <h2>${data.Title}</h2>
//             <section>
//                 <p>${data.Released}</p>
//                 <p>${data.Rated}</p>
//                 <p>${data.Runtime}</p>
//                 <p>${data.Genre}</p>
//                 <p>IMDb: ${data.imdbRating} / 10</p>
//             </section>

//             <div>
//                 <p>Plot Overview</p>
//                 <p>${data.Plot}</p>
//             </div>

//             <div>
//                 <section>
//                     <p>Director</p>
//                     <p>${data.Director}</p>
//                 </section>
//                 <section>
//                     <p>Writer</p>
//                     <p>${data.Writer}</p>
//                 </section>
//             </div>

//             <div>
//                  <p>Actors</p>
//                     <p>${data.Actors}</p>
//             </div>

//              <div>
//                 <section>
//                     <p>Language</p>
//                     <p>${data.Language}</p>
//                 </section>
//                 <section>
//                     <p>Country</p>
//                     <p>${data.Country}</p>
//                 </section>
//             </div>

//             <button>
//             <a href=https://www.imdb.com/title/${data.imdbID} target="_blank" >View on IMDb</a>
//             </button>

//         </div>`

// }


const movieDetail = document.querySelector("#movie-detail");

const params = new URLSearchParams(location.search);
const imdbID = params.get("id");


if (imdbID) {
    searchMovie(imdbID.trim());
} else {
    showError("Movie ID not found.");
}


// ================= SEARCH MOVIE =================

async function searchMovie(imdbID) {

    // Loading UI
    movieDetail.innerHTML = `
        <div class="min-h-[500px] flex flex-col
                    items-center justify-center text-center">

            <div class="w-14 h-14 rounded-full
                        border-4 border-purple-500/20
                        border-t-purple-500
                        animate-spin">
            </div>

            <p class="mt-6 text-gray-400">
                Loading movie details...
            </p>

        </div>
    `;


    try {

        let response = await fetch(
            `http://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`
        );

        let data = await response.json();

        console.log(data);


        if (data.Response === "True") {

            displayMovie(data);

        } else {

            showError(data.Error);

        }

    } catch (error) {

        console.error(error);

        showError(
            "Something went wrong. Please check your internet connection."
        );

    }
}


// ================= DISPLAY MOVIE =================

function displayMovie(data) {

    const poster =
        data.Poster !== "N/A"
            ? data.Poster
            : "https://via.placeholder.com/500x750/171122/ffffff?text=No+Poster";


    movieDetail.innerHTML = `

        <!-- Main Movie Card -->
        <div class="relative overflow-hidden
                    rounded-3xl
                    border border-white/10
                    bg-white/[0.035]
                    backdrop-blur-xl
                    shadow-2xl shadow-purple-950/20">


            <!-- Background Blur -->
            <div class="absolute inset-0 -z-10 overflow-hidden">

                <img
                    src="${poster}"
                    alt=""
                    class="absolute inset-0 w-full h-full
                           object-cover
                           opacity-[0.06]
                           blur-3xl
                           scale-110"
                >

                <div class="absolute inset-0
                            bg-[#08050f]/90">
                </div>

            </div>


            <!-- Content -->
            <div class="relative p-6 sm:p-10 lg:p-14">


                <!-- Back Button -->
                <a
                    href="index.html"
                    class="inline-flex items-center gap-2
                           mb-8
                           px-4 py-2
                           rounded-xl
                           bg-white/5
                           border border-white/10
                           text-sm text-gray-300
                           hover:bg-purple-500/10
                           hover:border-purple-500/30
                           hover:text-white
                           transition">

                    ← Back to Movies

                </a>


                <!-- Movie Information -->
                <div class="grid lg:grid-cols-[300px_1fr]
                            gap-8 lg:gap-12">


                    <!-- Poster -->
                    <div class="mx-auto lg:mx-0 w-full max-w-[300px]">

                        <div class="relative group">

                            <div class="absolute -inset-1
                                        bg-gradient-to-r
                                        from-purple-600
                                        to-pink-500
                                        rounded-2xl
                                        blur
                                        opacity-20
                                        group-hover:opacity-40
                                        transition">
                            </div>

                            <img
                                src="${poster}"
                                alt="${data.Title}"
                                class="relative w-full
                                       aspect-[2/3]
                                       object-cover
                                       rounded-2xl
                                       border border-white/10
                                       shadow-2xl"
                            >

                        </div>

                    </div>


                    <!-- Details -->
                    <div class="flex flex-col justify-center">


                        <!-- Type -->
                        <div class="flex flex-wrap items-center gap-3 mb-4">

                            <span class="px-3 py-1
                                         rounded-full
                                         bg-purple-500/10
                                         border border-purple-500/20
                                         text-purple-300
                                         text-xs font-medium">

                                ${data.Type || "Movie"}

                            </span>

                            ${
                                data.Rated !== "N/A"
                                    ? `
                                    <span class="px-3 py-1
                                                 rounded-full
                                                 bg-white/5
                                                 border border-white/10
                                                 text-gray-400
                                                 text-xs">

                                        ${data.Rated}

                                    </span>
                                    `
                                    : ""
                            }

                        </div>


                        <!-- Title -->
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl
                                   font-black
                                   leading-tight">

                            ${data.Title}

                        </h1>


                        <!-- Year / Runtime -->
                        <div class="flex flex-wrap
                                    items-center gap-3
                                    mt-5 text-sm text-gray-400">

                            <span>
                                📅 ${data.Year}
                            </span>

                            <span class="text-gray-700">•</span>

                            <span>
                                ${data.Released}
                            </span>

                            <span class="text-gray-700">•</span>

                            <span>
                                ⏱ ${data.Runtime}
                            </span>

                        </div>


                        <!-- Rating -->
                        <div class="mt-6
                                    inline-flex items-center gap-4
                                    w-fit
                                    px-5 py-3
                                    rounded-2xl
                                    bg-yellow-500/[0.08]
                                    border border-yellow-500/10">

                            <span class="text-2xl">
                                ⭐
                            </span>

                            <div>

                                <p class="text-xl font-bold text-yellow-400">
                                    ${data.imdbRating}
                                    <span class="text-sm text-gray-500">
                                        / 10
                                    </span>
                                </p>

                                <p class="text-xs text-gray-500">
                                    IMDb Rating
                                </p>

                            </div>

                        </div>


                        <!-- Genres -->
                        <div class="flex flex-wrap gap-2 mt-6">

                            ${
                                data.Genre
                                    .split(",")
                                    .map(
                                        genre => `
                                            <span class="px-3 py-1.5
                                                         rounded-lg
                                                         bg-white/5
                                                         border border-white/10
                                                         text-sm text-gray-300">

                                                ${genre.trim()}

                                            </span>
                                        `
                                    )
                                    .join("")
                            }

                        </div>


                        <!-- Plot -->
                        <div class="mt-8">

                            <h2 class="text-lg font-semibold mb-3">
                                Plot Overview
                            </h2>

                            <p class="text-gray-400
                                      leading-7
                                      text-sm sm:text-base">

                                ${data.Plot}

                            </p>

                        </div>


                        <!-- IMDb Button -->
                        <div class="mt-8">

                            <a
                                href="https://www.imdb.com/title/${data.imdbID}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center
                                       gap-3
                                       px-6 py-3.5
                                       rounded-xl
                                       bg-gradient-to-r
                                       from-purple-600
                                       to-pink-500
                                       font-semibold
                                       shadow-lg
                                       shadow-purple-600/20
                                       hover:shadow-purple-600/40
                                       hover:-translate-y-0.5
                                       transition">

                                View on IMDb

                                <span>
                                    ↗
                                </span>

                            </a>

                        </div>

                    </div>

                </div>


                <!-- Additional Information -->
                <div class="mt-12 pt-10
                            border-t border-white/10">


                    <h2 class="text-2xl font-bold mb-6">
                        Movie Information
                    </h2>


                    <div class="grid sm:grid-cols-2
                                lg:grid-cols-4
                                gap-4">


                        <!-- Director -->
                        <div class="p-5 rounded-2xl
                                    bg-white/[0.035]
                                    border border-white/[0.07]
                                    hover:border-purple-500/20
                                    transition">

                            <p class="text-xs uppercase
                                      tracking-wider
                                      text-gray-600">
                                Director
                            </p>

                            <p class="mt-2
                                      text-sm
                                      text-gray-200
                                      leading-6">

                                ${data.Director}

                            </p>

                        </div>


                        <!-- Writer -->
                        <div class="p-5 rounded-2xl
                                    bg-white/[0.035]
                                    border border-white/[0.07]
                                    hover:border-purple-500/20
                                    transition">

                            <p class="text-xs uppercase
                                      tracking-wider
                                      text-gray-600">
                                Writer
                            </p>

                            <p class="mt-2
                                      text-sm
                                      text-gray-200
                                      leading-6">

                                ${data.Writer}

                            </p>

                        </div>


                        <!-- Actors -->
                        <div class="p-5 rounded-2xl
                                    bg-white/[0.035]
                                    border border-white/[0.07]
                                    hover:border-purple-500/20
                                    transition">

                            <p class="text-xs uppercase
                                      tracking-wider
                                      text-gray-600">
                                Actors
                            </p>

                            <p class="mt-2
                                      text-sm
                                      text-gray-200
                                      leading-6">

                                ${data.Actors}

                            </p>

                        </div>


                        <!-- Language -->
                        <div class="p-5 rounded-2xl
                                    bg-white/[0.035]
                                    border border-white/[0.07]
                                    hover:border-purple-500/20
                                    transition">

                            <p class="text-xs uppercase
                                      tracking-wider
                                      text-gray-600">
                                Language
                            </p>

                            <p class="mt-2
                                      text-sm
                                      text-gray-200
                                      leading-6">

                                ${data.Language}

                            </p>

                        </div>

                    </div>


                     <!-- Country -->
                    <div class="mt-4 p-5 rounded-2xl
                                bg-white/[0.035]
                                border border-white/[0.07]">

                        <p class="text-xs uppercase
                                  tracking-wider
                                  text-gray-600">

                            Country

                        </p>

                        <p class="mt-2 text-sm text-gray-200">

                            🌍 ${data.Country}

                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;
}


// ================= ERROR UI =================

function showError(message) {

    movieDetail.innerHTML = `

        <div class="min-h-[500px]
                    flex flex-col
                    items-center
                    justify-center
                    text-center">

            <div class="w-20 h-20
                        rounded-full
                        bg-red-500/10
                        border border-red-500/10
                        flex items-center
                        justify-center
                        text-3xl">

                ⚠️

            </div>

            <h2 class="text-2xl font-bold mt-6">
                Movie Not Found
            </h2>

            <p class="text-gray-500 mt-2 max-w-md">
                ${message}
            </p>

            <a
                href="index.html"
                class="mt-6 px-6 py-3
                       rounded-xl
                       bg-purple-600
                       hover:bg-purple-500
                       font-medium
                       transition">

                ← Back to Movie Hub

            </a>

        </div>

    `;
}
