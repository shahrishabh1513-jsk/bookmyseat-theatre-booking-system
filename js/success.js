document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (!bookingData) {
        window.location.href = 'index.html';
        return;
    }
    
    displayTicket(bookingData);
    document.getElementById('bookingId').textContent = bookingData.bookingId;
    
    document.getElementById('printReceiptBtn').addEventListener('click', () => printTicket(bookingData));
    document.getElementById('downloadBtn').addEventListener('click', () => downloadTicket(bookingData));
    
    startCountdown();
});

function displayTicket(bookingData) {
    const ticketContainer = document.getElementById('ticketContainer');
    const { movie, seats, grandTotal, bookingId } = bookingData;
    
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const time = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Group seats by type
    const seatsByType = {};
    seats.forEach(seat => {
        if (!seatsByType[seat.type]) seatsByType[seat.type] = [];
        seatsByType[seat.type].push(seat.id);
    });
    
    let seatGroupsHtml = '';
    for (const [type, seatList] of Object.entries(seatsByType)) {
        seatGroupsHtml += `<span class="seat-chip ${type}">${seatList.join(', ')}</span>`;
    }
    
    ticketContainer.innerHTML = `
        <div class="ticket-header">
            <div class="ticket-header-left">
                <img src="images/logo.png" alt="BookMySeat" class="ticket-logo">
                <div>
                    <h3>BookMySeat</h3>
                    <p class="date">${formattedDate} | ${time}</p>
                </div>
            </div>
            <div class="ticket-header-right">
                <span class="badge">E-TICKET</span>
            </div>
        </div>
        
        <div class="ticket-body">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <div class="movie-details">
                    <span><i class="fas fa-clock"></i> ${movie.duration}</span>
                    <span><i class="fas fa-language"></i> ${movie.language}</span>
                    <span><i class="fas fa-star"></i> ${movie.rating}</span>
                </div>
            </div>
            <div class="seat-info">
                <div class="label">SEATS</div>
                <div class="seat-numbers">${seatGroupsHtml}</div>
            </div>
        </div>
        
        <div class="ticket-footer">
            <div>
                <div class="label">SCREEN</div>
                <div class="value">Screen 1</div>
            </div>
            <div>
                <div class="label">TOTAL AMOUNT</div>
                <div class="total-amount">₹${grandTotal.toFixed(2)}</div>
            </div>
            <div class="barcode">${bookingId.slice(-8)}</div>
        </div>
    `;
}

function printTicket(bookingData) {
    const printWindow = window.open('', '_blank');
    
    const date = new Date(bookingData.paymentDate);
    const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const time = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const { movie, seats, ticketPrice, convenienceFee, gst, grandTotal, bookingId } = bookingData;
    
    // Group seats by type
    const seatsByType = {};
    seats.forEach(seat => {
        if (!seatsByType[seat.type]) seatsByType[seat.type] = [];
        seatsByType[seat.type].push(seat.id);
    });
    
    let seatRowsHtml = '';
    for (const [type, seatList] of Object.entries(seatsByType)) {
        seatRowsHtml += `<div class="price-row"><span>${type.toUpperCase()} Seats (${seatList.join(', ')})</span><span>₹${seatList.length * (type === 'vip' ? 350 : type === 'premium' ? 250 : 150)}</span></div>`;
    }
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>BookMySeat - Booking Confirmation</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Poppins', sans-serif;
                    background: #f5f7fa;
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .ticket-receipt {
                    max-width: 800px;
                    background: white;
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    position: relative;
                }
                .ticket-receipt::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 10px;
                    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                }
                .receipt-header {
                    padding: 2rem;
                    text-align: center;
                    border-bottom: 2px dashed #e0e0e0;
                    position: relative;
                }
                .receipt-header::before,
                .receipt-header::after {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: #f5f7fa;
                    border-radius: 50%;
                    bottom: -15px;
                }
                .receipt-header::before { left: -15px; }
                .receipt-header::after { right: -15px; }
                .receipt-logo {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-bottom: 1rem;
                }
                .receipt-header h1 {
                    font-size: 2rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .receipt-body { padding: 2rem; }
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 15px;
                    margin-bottom: 2rem;
                }
                .info-item { display: flex; flex-direction: column; }
                .info-label {
                    font-size: 0.8rem;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .info-value {
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                .movie-detail-card {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 15px;
                    padding: 2rem;
                    color: white;
                    margin-bottom: 2rem;
                    position: relative;
                    overflow: hidden;
                }
                .movie-detail-card::before {
                    content: '🎬';
                    position: absolute;
                    right: -20px;
                    bottom: -20px;
                    font-size: 150px;
                    opacity: 0.1;
                }
                .movie-name { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
                .movie-meta { display: flex; gap: 2rem; }
                .meta-item { display: flex; align-items: center; gap: 0.5rem; }
                .price-breakdown {
                    background: #f8f9fa;
                    border-radius: 15px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }
                .price-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.8rem 0;
                    border-bottom: 1px dashed #e0e0e0;
                }
                .price-row.total {
                    border-bottom: none;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #667eea;
                }
                .receipt-footer {
                    padding: 2rem;
                    text-align: center;
                    background: #f8f9fa;
                    border-top: 2px dashed #e0e0e0;
                    position: relative;
                }
                .receipt-footer::before,
                .receipt-footer::after {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: white;
                    border-radius: 50%;
                    top: -15px;
                }
                .receipt-footer::before { left: -15px; }
                .receipt-footer::after { right: -15px; }
                .thank-you {
                    font-size: 1.2rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .barcode {
                    font-family: 'Libre Barcode 39', cursive;
                    font-size: 3rem;
                    margin: 1rem 0;
                }
                @media print {
                    body { background: white; padding: 0; }
                    .ticket-receipt { box-shadow: none; }
                }
            </style>
        </head>
        <body>
            <div class="ticket-receipt">
                <div class="receipt-header">
                    <img src="images/logo.png" alt="BookMySeat" class="receipt-logo">
                    <h1>BookMySeat</h1>
                    <p>Booking Confirmation</p>
                </div>
                
                <div class="receipt-body">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Booking ID</span>
                            <span class="info-value">${bookingId}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Date & Time</span>
                            <span class="info-value">${formattedDate} | ${time}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Screen</span>
                            <span class="info-value">Screen 1</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Payment Method</span>
                            <span class="info-value">${bookingData.paymentMethod.toUpperCase()}</span>
                        </div>
                    </div>
                    
                    <div class="movie-detail-card">
                        <div class="movie-name">${movie.title}</div>
                        <div class="movie-meta">
                            <span class="meta-item"><i class="fas fa-clock"></i> ${movie.duration}</span>
                            <span class="meta-item"><i class="fas fa-language"></i> ${movie.language}</span>
                            <span class="meta-item"><i class="fas fa-star"></i> ${movie.rating}</span>
                        </div>
                    </div>
                    
                    <div class="price-breakdown">
                        ${seatRowsHtml}
                        <div class="price-row">
                            <span>Convenience Fee</span>
                            <span>₹${convenienceFee}</span>
                        </div>
                        <div class="price-row">
                            <span>GST (18%)</span>
                            <span>₹${gst.toFixed(2)}</span>
                        </div>
                        <div class="price-row total">
                            <span>Grand Total</span>
                            <span>₹${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="receipt-footer">
                    <div class="thank-you">Thank you for choosing BookMySeat!</div>
                    <div class="barcode">${bookingId.slice(-8)}</div>
                    <p style="font-size: 0.8rem; color: #999; margin-top: 1rem;">
                        This is your e-ticket. Please show this at the entrance.
                    </p>
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); }
            <\/script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

function downloadTicket(bookingData) {
    // Create a blob with ticket HTML
    const ticketHTML = generateTicketHTML(bookingData);
    const blob = new Blob([ticketHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinema-ticket-${bookingData.bookingId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function generateTicketHTML(bookingData) {
    const { movie, seats, grandTotal, bookingId } = bookingData;
    const date = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head><title>BookMySeat</title></head>
        <body>
            <h1>BookMySeat</h1>
            <p>Booking ID: ${bookingId}</p>
            <p>Movie: ${movie.title}</p>
            <p>Seats: ${seats.map(s => s.id).join(', ')}</p>
            <p>Total: ₹${grandTotal.toFixed(2)}</p>
            <p>Date: ${date}</p>
        </body>
        </html>
    `;
}

function copyBookingId() {
    const bookingId = document.getElementById('bookingId').textContent;
    navigator.clipboard.writeText(bookingId).then(() => {
        alert('Booking ID copied to clipboard!');
    });
}

function startCountdown() {
    let seconds = 5;
    const countdownSpan = document.getElementById('countdown');
    
    const interval = setInterval(() => {
        seconds--;
        countdownSpan.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = 'index.html';
        }
    }, 1000);
}