const rellax = new Rellax(".rellax");

const API_KEY = "a55281c4ba01976e5ccd0ca548bc2296";
const BASE_URL = "https://api.themoviedb.org/3";
const GENRES = {};
const body = document.querySelector("body");
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search");
const resultsTab = document.querySelector(".results");
const resultHead = resultsTab.querySelector(".results-header");
const movieGrid = resultsTab.querySelector(".movie-grid");
const backdrop = document.querySelector(".modal-backdrop");
const closeModal = document.querySelector(".modal-close");
const modalTitle = document.querySelector(".modal-title");
const modalYear = document.querySelector(".modal-year");
const modalRuntime = document.querySelector(".modal-runtime");
const modalRating = document.querySelector(".modal-rating");
const modalGenre = document.querySelector(".modal-genre");
const modalTrailer = document.querySelector(".trailer-video");
const modalPoster = document.querySelector(".modal-poster");
const modalPlot = document.querySelector(".modal-plot");
const modalDirector = document.querySelector(".modal-director");
const modalCast = document.querySelector(".modal-cast");

// Fetching genres

async function loadGenre() {
  const res2 = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data2 = await res2.json();
  data2.genres.forEach((g) => {
    GENRES[g.id] = g.name;
  });
}

loadGenre();

// Adding funcation to button

searchBtn.addEventListener("click", async function () {
  const term = input.value.trim();

  if (!term) {
    alert("Please enter a search term");
    return;
  }

  // Fetching movies

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${term}`,
  );

  const data = await res.json();
  resultsTab.style.display = "block";
  resultsTab.scrollIntoView({ behavior: "smooth" });
  resultHead.querySelector("span").textContent = `"${term}"`;

  function getRatingColor(rating) {
    if (rating >= 7) return "#21d07a";
    if (rating >= 4) return "#d2d531";
    return "#db2360";
  }

  // Using the fetched data

  const movie = data.results
    .map(function (movie) {
      return `<div class="movie-card" data-id="${movie.id}">
          <img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            alt="Movie Poster"
            class="movie-poster" />

          <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
            <p class="movie-year">${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
            <div class="movie-rating" style="border-color: ${getRatingColor(movie.vote_average)}; color: ${getRatingColor(movie.vote_average)}">${movie.vote_average.toFixed(1)}</div>
          </div>

          <div class="movie-overlay">
            <div class="overlay-content-wrapper">
             <div class="genre">${movie.genre_ids.map((id) => GENRES[id]).join(" • ")}</div>
             <div class="movie-overlay-title">
               <span class="scroll-text">${movie.title}</span>
             </div>
             <p class="plot">${movie.overview}</p>
             <button class="more-info">More Info</button>
            </div>
          </div>
        </div>`;
    })
    .slice(0, 15)
    .join("");
  movieGrid.innerHTML = movie;

  const moreInfoBtns = document.querySelectorAll(".more-info");

  // Triggers Modal

  moreInfoBtns.forEach(function (btn) {
    btn.addEventListener("click", async function () {
      const idData = this.closest(".movie-card").getAttribute("data-id");
      backdrop.style.display = "block";
      body.style.overflow = "hidden";

      const detailRes = await fetch(
        `${BASE_URL}/movie/${idData}?api_key=${API_KEY}`,
      );
      const Detaildata = await detailRes.json();

      const videoRes = await fetch(
        `${BASE_URL}/movie/${idData}/videos?api_key=${API_KEY}`,
      );
      const videoData = await videoRes.json();

      const creditRes = await fetch(
        `${BASE_URL}/movie/${idData}/credits?api_key=${API_KEY}`,
      );
      const creditData = await creditRes.json();

      const trailer = videoData.results.find((v) => v.type === "Trailer");

      modalTrailer.src = `https://www.youtube.com/embed/${trailer.key}`;
      modalPoster.src = `https://image.tmdb.org/t/p/w500${Detaildata.poster_path}`;
      modalTitle.innerHTML = Detaildata.title;
      modalYear.innerHTML = `${Detaildata.release_date ? Detaildata.release_date.split("-")[0] : "N/A"}`;
      modalRuntime.innerHTML = `${Detaildata.runtime} min`;
      modalRating.innerHTML = `★ ${Detaildata.vote_average.toFixed(1)}`;
      modalRating.style.color = getRatingColor(Detaildata.vote_average);
      modalGenre.innerHTML = Detaildata.genres.map((g) => g.name).join(" • ");
      modalPlot.innerHTML = Detaildata.overview;
      modalDirector.innerHTML = creditData.crew.find(
        (c) => c.job === "Director",
      ).name;
      modalCast.innerHTML = creditData.cast
        .slice(0, 5)
        .map((c) => c.name)
        .join(", ");
    });
  });
});

// triggers close button for modal

closeModal.addEventListener("click", function () {
  backdrop.style.display = "none";
  body.style.overflow = "";
  modalTrailer.src = "";
});

// Triggering button with "enter" key

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
