// Movie Data (same as original but with cosmic naming)
const movies = {
    bollywood: [
        { id: 1, title: 'Kantara', genre: 'Action/Drama', language: 'Hindi', duration: '2h 30m', rating: '8.5', seats: 45, image: 'images/kantara.jpg', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 2, title: 'Jolly LLB 3', genre: 'Comedy/Drama', language: 'Hindi', duration: '2h 15m', rating: '7.8', seats: 52, image: 'images/Jolly LLB 3.jpg', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 3, title: 'Sunny', genre: 'Romance/Drama', language: 'Hindi', duration: '2h 20m', rating: '7.2', seats: 38, image: 'images/sunny.jpg', price: { regular: 150, premium: 250, vip: 350 } },
        { id: 4, title: 'Imli', genre: 'Drama/Romance', language: 'Hindi', duration: '2h 10m', rating: '7.5', seats: 29, image: 'images/imli.jpg', price: { regular: 150, premium: 250, vip: 350 } }
    ],
    hollywood: [
        { id: 5, title: 'Dune: Part Two', genre: 'Sci-Fi/Action', language: 'English', duration: '2h 45m', rating: '8.9', seats: 63, image: 'images/Dune Part Two.jpg', price: { regular: 200, premium: 350, vip: 500 } },
        { id: 6, title: 'Oppenheimer', genre: 'Biography', language: 'English', duration: '3h 0m', rating: '9.2', seats: 41, image: 'images/oppenheimer.jpg', price: { regular: 200, premium: 350, vip: 500 } }
    ],
    south: [
        { id: 9, title: 'KGF: Chapter 2', genre: 'Action', language: 'Kannada', duration: '2h 48m', rating: '9.0', seats: 52, image: 'images/kgf.jpg', price: { regular: 150, premium: 250, vip: 350 } }
    ]
};

const comingSoon = [
    { title: 'Cars 4', releaseDate: 'Mar 2026', image: 'images/car4.jpg' },
    { title: 'Border 2', releaseDate: 'Jan 2026', image: 'images/Border 2.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('movieGrid')) displayMovies('all');
    if (document.getElementById('comingSoonGrid')) displayComingSoon();
    setupEventListeners();
});

function displayMovies(category) {
    const grid = document.getElementById('movieGrid');
    grid.innerHTML = '';
    let list = category === 'all' ? [...movies.bollywood, ...movies.hollywood, ...movies.south] : movies[category];
    list.forEach(m => grid.appendChild(createMovieCard(m)));
}

function createMovieCard(movie) {
    const div = document.createElement('div');
    div.className = 'movie-card-glass';
    div.innerHTML = `
        <div class="movie-img" style="background-image:url('${movie.image}'); height:360px; background-size:cover; position:relative;">
            <span class="rating-badge"><i class="fas fa-star"></i> ${movie.rating}</span>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-details"><span>${movie.duration}</span><span>${movie.language}</span></div>
            <button class="btn-warp" onclick="selectMovie(${movie.id})">Select Seats <i class="fas fa-arrow-right"></i></button>
        </div>
    `;
    return div;
}

function displayComingSoon() {
    const container = document.getElementById('comingSoonGrid');
    comingSoon.forEach(m => {
        const card = document.createElement('div');
        card.className = 'movie-card-glass';
        card.style.width = '200px';
        card.innerHTML = `<img src="${m.image}" style="width:100%; height:250px; object-fit:cover;"><div><h4>${m.title}</h4><p>${m.releaseDate}</p></div>`;
        container.appendChild(card);
    });
}

window.selectMovie = (id) => {
    let selected = [...movies.bollywood, ...movies.hollywood, ...movies.south].find(m => m.id === id);
    localStorage.setItem('selectedMovie', JSON.stringify(selected));
    window.location.href = 'seats.html';
};

function setupEventListeners() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayMovies(btn.dataset.cat);
        });
    });
}