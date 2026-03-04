// Movie Data with expanded collection
const movies = {
    bollywood: [
        {
            id: 1,
            title: 'Kantara',
            genre: 'Action/Drama',
            language: 'Hindi',
            duration: '2h 30m',
            rating: '8.5',
            seats: 45,
            image: 'images/kantara.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 2,
            title: 'Jolly LLB 3',
            genre: 'Comedy/Drama',
            language: 'Hindi',
            duration: '2h 15m',
            rating: '7.8',
            seats: 52,
            image: 'images/Jolly LLB 3.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 3,
            title: 'Sunny',
            genre: 'Romance/Drama',
            language: 'Hindi',
            duration: '2h 20m',
            rating: '7.2',
            seats: 38,
            image: 'images/sunny.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 4,
            title: 'Imli',
            genre: 'Drama/Romance',
            language: 'Hindi',
            duration: '2h 10m',
            rating: '7.5',
            seats: 29,
            image: 'images/imli.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        }
    ],
    hollywood: [
        {
            id: 5,
            title: 'Dune: Part Two',
            genre: 'Sci-Fi/Action',
            language: 'English',
            duration: '2h 45m',
            rating: '8.9',
            seats: 63,
            image: 'images/Dune Part Two.jpg',
            price: { regular: 200, premium: 350, vip: 500 }
        },
        {
            id: 6,
            title: 'Oppenheimer',
            genre: 'Biography/Thriller',
            language: 'English',
            duration: '3h 0m',
            rating: '9.2',
            seats: 41,
            image: 'images/oppenheimer.jpg',
            price: { regular: 200, premium: 350, vip: 500 }
        },
        {
            id: 7,
            title: 'Final Destination Bloodlines',
            genre: 'Horror/Thriller',
            language: 'Hindi',
            duration: '1h 54m',
            rating: '8.3',
            seats: 57,
            image: 'images/final destination bloodlines.jpg',
            price: { regular: 200, premium: 350, vip: 500 }
        },
        {
            id: 8,
            title: 'Mission: Impossible',
            genre: 'Action/Adventure',
            language: 'English',
            duration: '2h 43m',
            rating: '8.7',
            seats: 48,
            image: 'images/Mission Impossible.jpg',
            price: { regular: 200, premium: 350, vip: 500 }
        }
    ],
    south: [
        {
            id: 9,
            title: 'KGF: Chapter 2',
            genre: 'Action',
            language: 'Kannada',
            duration: '2h 48m',
            rating: '9.0',
            seats: 52,
            image: 'images/kgf.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 10,
            title: 'RRR',
            genre: 'Action/Drama',
            language: 'Telugu',
            duration: '3h 7m',
            rating: '9.1',
            seats: 44,
            image: 'images/rrr.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 11,
            title: 'Vikram',
            genre: 'Action/Thriller',
            language: 'Tamil',
            duration: '2h 55m',
            rating: '8.8',
            seats: 36,
            image: 'images/vikram.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        },
        {
            id: 12,
            title: 'Pushpa',
            genre: 'Action/Drama',
            language: 'Telugu',
            duration: '2h 59m',
            rating: '8.5',
            seats: 40,
            image: 'images/pushpa.jpg',
            price: { regular: 150, premium: 250, vip: 350 }
        }
    ]
};

// Coming Soon Movies
const comingSoon = [
    {
        title: 'Cars 4',
        releaseDate: 'Mar 2026',
        image: 'images/car4.jpg'
    },
    {
        title: 'Border 2 ',
        releaseDate: 'Jan 2026',
        image: 'images/Border 2.jpg'
    },
    {
        title: 'Dhurandhar',
        releaseDate: 'Oct 2025',
        image: 'images/Dhurandhar.jpg'
    },
    {
        title: 'Harry Potter ',
        releaseDate: 'Dec 2026',
        image: 'images/Harry Potter.jpg'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Load movies on homepage
    if (document.getElementById('movieGrid')) {
        displayMovies('all');
        displayComingSoon();
        setupCategoryTabs();
    }

    // Mobile menu toggle
    setupMobileMenu();
});

function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displayMovies(tab.dataset.category);
        });
    });
}

function displayMovies(category) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';
    
    let moviesToShow = [];
    if (category === 'all') {
        moviesToShow = [...movies.bollywood, ...movies.hollywood, ...movies.south];
    } else {
        moviesToShow = movies[category] || [];
    }
    
    moviesToShow.forEach(movie => {
        movieGrid.appendChild(createMovieCard(movie));
    });
}

function displayComingSoon() {
    const comingSoonGrid = document.getElementById('comingSoonGrid');
    if (!comingSoonGrid) return;
    
    comingSoon.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'coming-card';
        card.innerHTML = `
            <div class="coming-poster">
                <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x400'">
            </div>
            <div class="coming-info">
                <h4>${movie.title}</h4>
                <span class="release-date">${movie.releaseDate}</span>
            </div>
        `;
        comingSoonGrid.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    
    card.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x400'">
            <span class="movie-rating"><i class="fas fa-star"></i> ${movie.rating}</span>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span><i class="fas fa-clock"></i> ${movie.duration}</span>
                <span><i class="fas fa-language"></i> ${movie.language}</span>
            </div>
            <span class="movie-genre">${movie.genre}</span>
            <p class="movie-seats">
                <i class="fas fa-chair"></i> ${movie.seats} seats available
            </p>
            <button class="btn-primary" onclick="selectMovie(${movie.id})">
                Select Seats <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return card;
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Global function to handle movie selection
window.selectMovie = function(movieId) {
    // Find movie across all categories
    let selectedMovie = null;
    for (const category in movies) {
        const found = movies[category].find(m => m.id === movieId);
        if (found) {
            selectedMovie = found;
            break;
        }
    }
    
    if (selectedMovie) {
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
        window.location.href = 'seats.html';
    }
};