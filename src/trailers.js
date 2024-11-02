// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function fetchMovieTrailers(movieId) {
    const apiKey = 'b3b463d84661af84210d1ac4fc5b9643'; // Tu API key
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=es-ES`; // Use backticks

    try {
        const response = await fetch(url);
        
        // Compruebe si la respuesta es correcta (código de estado 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data.results); // Verificar resultados
        
        return data.results; // Retornar todos los trailers
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
        return []; // Devuelve una matriz vacía en caso de error para evitar TypeError más adelante
    }
}

function loadTrailers(trailers) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = ''; // Limpiar contenido previo

    // Compruebe si los remolques están definidos y tienen longitud.
    if (!trailers || trailers.length === 0) {
        playerDiv.innerHTML = '<p>No se encontraron trailers.</p>';
        return;
    }

    trailers.forEach(trailer => {
        // Crear un iframe para cada trailer
        const iframe = document.createElement('iframe');
        iframe.width = '640';
        iframe.height = '360';
        iframe.src = `https://www.youtube.com/embed/${trailer.key}?rel=0`;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;

        // Agregar el iframe al contenedor
        playerDiv.appendChild(iframe);
    });
}
async function init() {
    const movieId = getUrlParameter('videoId'); // Obtener el ID de la película desde la URL
    if (movieId) {
        const trailers = await fetchMovieTrailers(movieId); // Cargar trailers usando el ID
        loadTrailers(trailers); // Mostrar los trailers
    } else {
        document.getElementById('trailer-container').innerHTML = '<p>No se encontró información del trailer.</p>';
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', init);