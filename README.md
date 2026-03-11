# Roll Review 🎬

A cinematic movie discovery app where you can search millions of films, watch trailers, and explore cast and crew details.

## Features

- Search any movie using the TMDB API
- Hover over movie cards to reveal genre, plot summary and a "More Info" button
- Click "More Info" to open a full modal with:
  - Embedded YouTube trailer
  - Movie poster, rating, runtime, release year
  - Genre, full plot, director and top cast
- Dynamic rating colors: green for great, yellow for average, red for poor
- Parallax scrolling hero section with custom illustrations
- Responsive design, works on mobile and desktop
- Custom branding with original logo and artwork

## Tech Stack

- HTML
- CSS (Grid, Flexbox, parallax effects)
- JavaScript (Async/Await, Fetch API, DOM manipulation)
- [TMDB API](https://www.themoviedb.org/) for movie data
- [Rellax.js](https://dixonandmoe.com/rellax/) for parallax scrolling
- YouTube Embed API for trailer playback

## How to Run

1. Live Demo
   ```
   roll-review.netlify.app
   ```
2. Or clone the repo
   ```
   git clone https://github.com/KaranASI/Roll-Review.git
   ```
3. Open `index.html` in your browser, no build tools needed.

> Note: The app uses a TMDB API key. If the key expires, grab a free one at [themoviedb.org](https://www.themoviedb.org/) and replace it in `script.js`.

## What I Learned

- Working with third party REST APIs and handling async data
- Chaining multiple API calls (movie details + videos + credits)
- Building modals and managing UI state with vanilla JS
- CSS Grid for responsive movie card layouts
- Parallax effects with Rellax.js
- Designing a cohesive visual identity from scratch