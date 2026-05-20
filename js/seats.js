const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 12;
let selectedSeats = [];
let bookedSeats = [];

document.addEventListener('DOMContentLoaded', () => {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    if (!movie) window.location.href = 'index.html';
    generateSeats();
});

function generateSeats() {
    const container = document.getElementById('seatsDynamicContainer');
    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';
        rowDiv.innerHTML = `<div class="row-label">${row}</div>`;
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = document.createElement('div');
            seat.className = `seat ${getSeatType(row)}`;
            seat.textContent = i;
            seat.dataset.id = `${row}${i}`;
            seat.addEventListener('click', () => toggleSeat(seat));
            rowDiv.appendChild(seat);
        }
        container.appendChild(rowDiv);
    });
}

function getSeatType(row) {
    if (['A','B','C'].includes(row)) return 'regular';
    if (['D','E','F'].includes(row)) return 'premium';
    return 'vip';
}

function toggleSeat(seat) {
    if (seat.classList.contains('booked')) return;
    seat.classList.toggle('selected');
    updateTotal();
}

function updateTotal() {
    const selected = document.querySelectorAll('.seat.selected');
    document.getElementById('selectedSeatsDisplay').innerText = selected.length;
    document.getElementById('seatTotal').innerText = selected.length * 180;
}