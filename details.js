async function fetchMovieDetails(movieId) {
    const apiKey = 'b3b463d84661af84210d1ac4fc5b9643'; //API key
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`;

    try {
        const response = await fetch(url);
        const movie = await response.json();
        
        // Obtener trailers relacionados
        const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=es-ES`);
        const videosData = await videosResponse.json();
        
        // Obtener el primer trailer si existe
        if (videosData.results.length > 0) {
            movie.trailerVideoId = videosData.results[0].key; // Asignar el ID del trailer
        }
        
        return movie;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function renderMovieDetails(movie) {
    const detailsDiv = document.getElementById('movie-details');
    
    detailsDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p><strong>Sinopsis:</strong> ${movie.overview || 'No disponible'}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${movie.release_date || 'No disponible'}</p>
        <p><strong>Calificación:</strong> ${movie.vote_average || 'No disponible'}</p>
        <a href="./src/trailers.html?videoId=${movie.id}" target="_blank">Ver Trailer</a> <!-- Enlace al trailer -->
    `;
}

async function init() {renderMovieDetails
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id'); // Obtener ID de la película desde la URL

    if (movieId) {
        const movieDetails = await fetchMovieDetails(movieId);
        renderMovieDetails(movieDetails);
    } else {
        document.getElementById('movie-details').innerText = 'No se encontró información sobre la película.';
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', init);

// Función para volver a la página anterior
function goBack() {
    console.log ("Hola")
    window.history.back(); // Regresar a la página anterior
}