let currentPage = 1; // Pagina actual
const moviesPerPage = 20; // Peliculas por pagina
let totalPages = 0; // Total pages
let searchKey = ""; // Search key

async function fetchMovies(page = 1) {
    try {
        const url = searchKey 
            ? `https://api.themoviedb.org/3/search/movie?api_key=b3b463d84661af84210d1ac4fc5b9643&query=${encodeURIComponent(searchKey)}&page=${page}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=b3b463d84661af84210d1ac4fc5b9643&page=${page}`;
        
        const response = await fetch(url);
        const data = await response.json();
        totalPages = data.total_pages;
        console.log(data);
        
        return data.results; // devuelve solo los resultados
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
    }


    function showDetails(movie) {
        // Redirige a la página de detalles pasando el ID de la película
        window.location.href = `details.html?id=${movie.id}`;
    }

    function renderMovies(movies) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // limpio contenido previo

    if (movies.length === 0) {
        app.innerHTML = "<h2>No se encontraron películas.</h2>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';

        // Estructura de la card
        card.innerHTML = `
            <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
            </div>
        `;

        // Evento click para mostrar detalles de la pelicula
        card.addEventListener('click', () => {
            showDetails(movie);
        });

        app.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpio contenido previo

    const pageInfo = document.createElement('div');
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    paginationContainer.appendChild(pageInfo);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage === 1; // Desactivar si esta en la ultima pagina
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadMovies();
        }
    });
    
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = currentPage === totalPages; // Desactivar si esta en la ultima pagina
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies();
        }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
}

async function loadMovies() {
    const movies = await fetchMovies(currentPage);
    renderMovies(movies);
}



function showDetails(movie) {
    // Redirigir a la página de detalles pasando el ID de la película
    window.location.href = `details.html?id=${movie.id}`;
}



function goBack() {
    const app = document.getElementById('app');
    const details = document.getElementById('details');

    // Mostrar detalles de peliculas y esconder los mismos
    app.style.display = 'grid';
    details.classList.add('hidden');
}

// Manejo la busqueda
function searchMovies(e) {
    e.preventDefault();
    currentPage = 1; //Restablecer a la primera página en la búsqueda
    searchKey = document.getElementById('search-input').value; // Obtengo el valor de entrada
    loadMovies(); // Load movies based on search
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadMovies(); // cargo peliculas inicializadas

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', searchMovies); // Manejar evento de envío de formulario
});