// Seat configuration
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 12;
const seatTypes = {
    regular: { rows: ['A', 'B', 'C'], price: 150, class: 'regular', color: '#4299e1' },
    premium: { rows: ['D', 'E', 'F'], price: 250, class: 'premium', color: '#ecc94b' },
    vip: { rows: ['G', 'H', 'I'], price: 350, class: 'vip', color: '#ed64a6' }
};

let selectedSeats = [];
let bookedSeats = [];

document.addEventListener('DOMContentLoaded', function() {
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    if (!selectedMovie) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display movie hero
    displayMovieHero(selectedMovie);
    
    // Generate booked seats
    bookedSeats = generateBookedSeats();
    
    // Create seats layout
    createSeatsLayout();
    
    // Update UI
    updateSelectedSeatsDisplay();
    updatePriceBreakdown();
});

function displayMovieHero(movie) {
    const movieHero = document.getElementById('movieHero');
    movieHero.innerHTML = `
        <div class="movie-hero-content">
            <h1>${movie.title}</h1>
            <div class="movie-hero-meta">
                <span><i class="fas fa-clock"></i> ${movie.duration}</span>
                <span><i class="fas fa-language"></i> ${movie.language}</span>
                <span><i class="fas fa-star"></i> ${movie.rating}</span>
            </div>
        </div>
    `;
    movieHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${movie.image})`;
}

function generateBookedSeats() {
    const booked = [];
    const totalSeats = rows.length * seatsPerRow;
    const bookedCount = Math.floor(Math.random() * 30) + 15; // 15-45 booked seats
    
    for (let i = 0; i < bookedCount; i++) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const seat = Math.floor(Math.random() * seatsPerRow) + 1;
        const seatId = `${row}${seat}`;
        if (!booked.includes(seatId)) {
            booked.push(seatId);
        }
    }
    return booked;
}

function createSeatsLayout() {
    const seatsContainer = document.getElementById('seatsContainer');
    
    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        
        // Add row label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = row;
        rowDiv.appendChild(rowLabel);
        
        // Determine seat type for this row
        let seatType = 'regular';
        let seatPrice = 150;
        if (seatTypes.premium.rows.includes(row)) {
            seatType = 'premium';
            seatPrice = 250;
        }
        if (seatTypes.vip.rows.includes(row)) {
            seatType = 'vip';
            seatPrice = 350;
        }
        
        // Create seats for this row
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.className = `seat ${seatType}`;
            
            const seatId = `${row}${i}`;
            seat.textContent = i;
            seat.dataset.seatId = seatId;
            seat.dataset.row = row;
            seat.dataset.number = i;
            seat.dataset.type = seatType;
            seat.dataset.price = seatPrice;
            
            // Check if seat is booked
            if (bookedSeats.includes(seatId)) {
                seat.classList.add('booked');
            }
            
            // Add click event
            seat.addEventListener('click', handleSeatClick);
            
            rowDiv.appendChild(seat);
        }
        
        seatsContainer.appendChild(rowDiv);
    });
}

function handleSeatClick(event) {
    const seat = event.target;
    
    // Don't allow clicking on booked seats
    if (seat.classList.contains('booked')) return;
    
    // Toggle selection
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s.id !== seat.dataset.seatId);
    } else {
        // Limit to 10 seats per booking
        if (selectedSeats.length >= 10) {
            alert('You can only book up to 10 seats at a time');
            return;
        }
        seat.classList.add('selected');
        selectedSeats.push({
            id: seat.dataset.seatId,
            row: seat.dataset.row,
            number: seat.dataset.number,
            type: seat.dataset.type,
            price: parseInt(seat.dataset.price)
        });
    }
    
    // Update displays
    updateSelectedSeatsDisplay();
    updatePriceBreakdown();
    updateProceedButton();
}

function updateSelectedSeatsDisplay() {
    const selectedList = document.getElementById('selectedSeatsList');
    
    if (selectedSeats.length === 0) {
        selectedList.innerHTML = '<span class="no-seats">No seats selected</span>';
        return;
    }
    
    // Sort seats by row and number
    selectedSeats.sort((a, b) => {
        if (a.row === b.row) return a.number - b.number;
        return a.row.localeCompare(b.row);
    });
    
    let html = '';
    selectedSeats.forEach(seat => {
        html += `<span class="seat-tag ${seat.type}">${seat.id}</span>`;
    });
    selectedList.innerHTML = html;
}

function updatePriceBreakdown() {
    const ticketPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = selectedSeats.length * 5;
    const total = ticketPrice + convenienceFee;
    
    document.getElementById('ticketPrice').textContent = `₹${ticketPrice}`;
    document.getElementById('convenienceFee').textContent = `₹${convenienceFee}`;
    document.getElementById('totalPrice').textContent = `₹${total}`;
}

function updateProceedButton() {
    const proceedBtn = document.getElementById('proceedBtn');
    proceedBtn.disabled = selectedSeats.length === 0;
}

// Handle proceed to payment
document.getElementById('proceedBtn').addEventListener('click', function() {
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    
    const ticketPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = selectedSeats.length * 5;
    const subtotal = ticketPrice + convenienceFee;
    const gst = subtotal * 0.18;
    const grandTotal = subtotal + gst;
    
    const bookingData = {
        movie: selectedMovie,
        seats: selectedSeats,
        ticketPrice: ticketPrice,
        convenienceFee: convenienceFee,
        gst: gst,
        grandTotal: grandTotal,
        seatCount: selectedSeats.length,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = 'payment.html';
});