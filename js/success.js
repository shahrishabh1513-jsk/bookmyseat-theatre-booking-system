document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (!bookingData) { window.location.href = 'index.html'; return; }
    
    displayTicket(bookingData);
    document.getElementById('bookingId').textContent = bookingData.bookingId;
    document.getElementById('printReceiptBtn').addEventListener('click', () => printTicket(bookingData));
    document.getElementById('downloadBtn').addEventListener('click', () => downloadTicket(bookingData));
    startCountdown();
});

function displayTicket(bookingData) {
    const container = document.getElementById('ticketContainer');
    const { movie, seats, grandTotal, bookingId } = bookingData;
    const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const seatsByType = {};
    seats.forEach(seat => {
        if (!seatsByType[seat.type]) seatsByType[seat.type] = [];
        seatsByType[seat.type].push(seat.id);
    });
    
    let seatGroupsHtml = '';
    for (const [type, seatList] of Object.entries(seatsByType)) {
        seatGroupsHtml += `<span class="seat-chip ${type}">${seatList.join(', ')}</span>`;
    }
    
    container.innerHTML = `
        <div class="ticket-header"><div class="ticket-header-left"><div class="ticket-logo"><i class="fas fa-film"></i></div><div><h3>BOXOFFICE</h3><p class="date">${date}</p></div></div><div class="ticket-header-right"><span class="badge">E-TICKET</span></div></div>
        <div class="ticket-body"><div class="movie-info"><h2>${movie.title}</h2><div class="movie-details"><span><i class="fas fa-clock"></i> ${movie.duration}</span><span><i class="fas fa-language"></i> ${movie.language}</span><span><i class="fas fa-star"></i> ${movie.rating}</span></div></div><div class="seat-info"><div class="label">SEATS</div><div class="seat-numbers">${seatGroupsHtml}</div></div></div>
        <div class="ticket-footer"><div><div class="label">SCREEN</div><div class="value">Screen 1</div></div><div><div class="label">TOTAL</div><div class="total-amount">₹${grandTotal.toFixed(2)}</div></div><div class="barcode">${bookingId.slice(-8)}</div></div>
    `;
}

function printTicket(bookingData) {
    const printWindow = window.open('', '_blank');
    const { movie, seats, ticketPrice, convenienceFee, gst, grandTotal, bookingId } = bookingData;
    const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const seatsByType = {};
    seats.forEach(seat => {
        if (!seatsByType[seat.type]) seatsByType[seat.type] = [];
        seatsByType[seat.type].push(seat.id);
    });
    
    let seatRowsHtml = '';
    for (const [type, seatList] of Object.entries(seatsByType)) {
        const price = type === 'vip' ? 350 : type === 'premium' ? 250 : 150;
        seatRowsHtml += `<div class="price-row"><span>${type.toUpperCase()} (${seatList.join(', ')})</span><span>₹${seatList.length * price}</span></div>`;
    }
    
    printWindow.document.write(`
        <!DOCTYPE html><html><head><title>BOXOFFICE - Ticket</title><style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Space Grotesk', sans-serif; background: #0a0a0f; padding: 2rem; display: flex; justify-content: center; }
            .ticket { max-width: 700px; background: #1a1a2e; border-radius: 30px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 2rem; text-align: center; color: white; }
            .content { padding: 2rem; color: white; }
            .movie-detail { background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 15px; padding: 1.5rem; margin-bottom: 2rem; }
            .movie-name { font-size: 1.8rem; margin-bottom: 0.5rem; }
            .price-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px dashed rgba(255,255,255,0.1); }
            .total { font-size: 1.3rem; font-weight: 700; color: #a855f7; }
            .footer { background: rgba(255,255,255,0.05); padding: 1.5rem; text-align: center; }
            @media print { body { background: white; } .ticket { box-shadow: none; } }
        </style></head>
        <body><div class="ticket"><div class="header"><h1>BOXOFFICE</h1><p>Booking Confirmation</p></div><div class="content">
        <div class="movie-detail"><h2 class="movie-name">${movie.title}</h2><p>${movie.duration} | ${movie.language} | ${movie.rating} ⭐</p></div>
        <div class="price-breakdown">${seatRowsHtml}<div class="price-row"><span>Convenience Fee</span><span>₹${convenienceFee}</span></div><div class="price-row"><span>GST (18%)</span><span>₹${gst.toFixed(2)}</span></div><div class="price-row total"><span>Grand Total</span><span>₹${grandTotal.toFixed(2)}</span></div></div>
        </div><div class="footer"><p>Booking ID: ${bookingId}</p><p>Date: ${date}</p><p>Thank you for choosing BOXOFFICE!</p></div></div><script>window.onload=()=>window.print()<\/script></body></html>
    `);
    printWindow.document.close();
}

function downloadTicket(bookingData) {
    const { movie, seats, grandTotal, bookingId } = bookingData;
    const date = new Date().toLocaleDateString();
    const blob = new Blob([`<!DOCTYPE html><html><head><title>Ticket</title></head><body><h1>BOXOFFICE</h1><p>Booking ID: ${bookingId}</p><p>Movie: ${movie.title}</p><p>Seats: ${seats.map(s => s.id).join(', ')}</p><p>Total: ₹${grandTotal.toFixed(2)}</p><p>Date: ${date}</p></body></html>`], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boxoffice-ticket-${bookingId}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function copyBookingId() {
    const id = document.getElementById('bookingId').textContent;
    navigator.clipboard.writeText(id);
    alert('Booking ID copied!');
}

function startCountdown() {
    let seconds = 5;
    const span = document.getElementById('countdown');
    const interval = setInterval(() => {
        seconds--;
        span.textContent = seconds;
        if (seconds <= 0) { clearInterval(interval); window.location.href = 'index.html'; }
    }, 1000);
}