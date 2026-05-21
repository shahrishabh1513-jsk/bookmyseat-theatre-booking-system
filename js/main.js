const movies = {
    bollywood: [
        { id: 1, title: 'Kantara', genre: 'Action/Drama', language: 'Hindi', duration: '2h 30m', rating: '8.5', seats: 45, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Kantara', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 2, title: 'Jolly LLB 3', genre: 'Comedy/Drama', language: 'Hindi', duration: '2h 15m', rating: '7.8', seats: 52, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Jolly+LLB+3', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 3, title: 'Sunny', genre: 'Romance/Drama', language: 'Hindi', duration: '2h 20m', rating: '7.2', seats: 38, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Sunny', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 4, title: 'Imli', genre: 'Drama/Romance', language: 'Hindi', duration: '2h 10m', rating: '7.5', seats: 29, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Imli', price: { regular: 150, premium: 250, vip: 350 } }
    ],
    hollywood: [
        { id: 5, title: 'Dune: Part Two', genre: 'Sci-Fi/Action', language: 'English', duration: '2h 45m', rating: '8.9', seats: 63, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Dune+2', price: { regular: 200, premium: 350, vip: 500 } },
        { id: 6, title: 'Oppenheimer', genre: 'Biography/Thriller', language: 'English', duration: '3h 0m', rating: '9.2', seats: 41, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Oppenheimer', price: { regular: 200, premium: 350, vip: 500 } },
        { id: 7, title: 'Final Destination', genre: 'Horror/Thriller', language: 'Hindi', duration: '1h 54m', rating: '8.3', seats: 57, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Final+Destination', price: { regular: 200, premium: 350, vip: 500 } },
        { id: 8, title: 'Mission: Impossible', genre: 'Action/Adventure', language: 'English', duration: '2h 43m', rating: '8.7', seats: 48, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Mission', price: { regular: 200, premium: 350, vip: 500 } }
    ],
    south: [
        { id: 9, title: 'KGF: Chapter 2', genre: 'Action', language: 'Kannada', duration: '2h 48m', rating: '9.0', seats: 52, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=KGF', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 10, title: 'RRR', genre: 'Action/Drama', language: 'Telugu', duration: '3h 7m', rating: '9.1', seats: 44, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=RRR', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 11, title: 'Vikram', genre: 'Action/Thriller', language: 'Tamil', duration: '2h 55m', rating: '8.8', seats: 36, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Vikram', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 12, title: 'Pushpa', genre: 'Action/Drama', language: 'Telugu', duration: '2h 59m', rating: '8.5', seats: 40, image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Pushpa', price: { regular: 150, premium: 250, vip: 350 } }
    ]
};

const comingSoon = [
    { title: 'Cars 4', releaseDate: 'Mar 2026', image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Cars+4' },
    { title: 'Border 2', releaseDate: 'Jan 2026', image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Border+2' },
    { title: 'Dhurandhar', releaseDate: 'Oct 2025', image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Dhurandhar' },
    { title: 'Harry Potter', releaseDate: 'Dec 2026', image: 'https://via.placeholder.com/300x400/1a1a2e/ffffff?text=Harry+Potter' }
];

function initBackground() {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    let particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5,
            speed: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', function() {
    initBackground();
    if (document.getElementById('movieGrid')) {
        displayMovies('all');
        displayComingSoon();
        setupCategoryTabs();
    }
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
    let moviesToShow = category === 'all' ? [...movies.bollywood, ...movies.hollywood, ...movies.south] : movies[category] || [];
    moviesToShow.forEach(movie => movieGrid.appendChild(createMovieCard(movie)));
}

function displayComingSoon() {
    const grid = document.getElementById('comingSoonGrid');
    if (!grid) return;
    comingSoon.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'coming-card';
        card.innerHTML = `<div class="coming-poster"><img src="${movie.image}" alt="${movie.title}"></div><div class="coming-info"><h4>${movie.title}</h4><span class="release-date">${movie.releaseDate}</span></div>`;
        grid.appendChild(card);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    card.innerHTML = `
        <div class="movie-poster"><img src="${movie.image}" alt="${movie.title}"><span class="movie-rating"><i class="fas fa-star"></i> ${movie.rating}</span></div>
        <div class="movie-info"><h3 class="movie-title">${movie.title}</h3><div class="movie-meta"><span><i class="fas fa-clock"></i> ${movie.duration}</span><span><i class="fas fa-language"></i> ${movie.language}</span></div><span class="movie-genre">${movie.genre}</span><p class="movie-seats"><i class="fas fa-chair"></i> ${movie.seats} seats available</p><button class="btn-primary" onclick="selectMovie(${movie.id})">Select Seats <i class="fas fa-arrow-right"></i></button></div>
    `;
    return card;
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
}

window.selectMovie = function(movieId) {
    let selectedMovie = null;
    for (const category in movies) {
        const found = movies[category].find(m => m.id === movieId);
        if (found) { selectedMovie = found; break; }
    }
    if (selectedMovie) {
        localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
        window.location.href = 'seats.html';
    }
};