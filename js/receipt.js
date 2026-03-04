// receipt.js - Printable Receipt/Ticket Generation Module

/**
 * Generates a complete movie ticket receipt in the style of the attached image
 * Creates a professional, printable ticket with all booking details
 */

class TicketReceipt {
    constructor(bookingData) {
        this.bookingData = bookingData;
        this.date = new Date(bookingData.paymentDate || Date.now());
    }

    /**
     * Generate the complete ticket HTML
     */
    generateTicketHTML() {
        const { movie, seats, ticketPrice, convenienceFee, gst, grandTotal, bookingId } = this.bookingData;
        
        // Format date and time
        const formattedDate = this.formatDate();
        const formattedTime = this.formatTime();
        
        // Group seats by row and type for display
        const seatGroups = this.groupSeatsByType();
        
        // Calculate per-category prices
        const seatCategories = this.calculateSeatCategories();
        
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BookMySeat - ${movie.title}</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Poppins', sans-serif;
                        background: #f0f2f5;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        padding: 20px;
                    }

                    /* Main Ticket Container */
                    .cinema-ticket {
                        max-width: 800px;
                        width: 100%;
                        background: white;
                        border-radius: 30px;
                        overflow: hidden;
                        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
                        position: relative;
                        animation: slideIn 0.5s ease;
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    /* Top Gradient Strip */
                    .ticket-strip {
                        height: 12px;
                        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
                        background-size: 300% 300%;
                        animation: gradientMove 3s ease infinite;
                    }

                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    /* Ticket Header with Perforation */
                    .ticket-header {
                        padding: 30px 30px 20px;
                        text-align: center;
                        border-bottom: 2px dashed #e0e0e0;
                        position: relative;
                        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                    }

                    .ticket-header::before,
                    .ticket-header::after {
                        content: '';
                        position: absolute;
                        width: 25px;
                        height: 25px;
                        background: #f0f2f5;
                        border-radius: 50%;
                        bottom: -13px;
                    }

                    .ticket-header::before {
                        left: -13px;
                    }

                    .ticket-header::after {
                        right: -13px;
                    }

                    .theatre-logo {
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        margin-bottom: 15px;
                        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                        border: 3px solid white;
                    }

                    .theatre-name {
                        font-size: 2.2rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 5px;
                        letter-spacing: 2px;
                    }

                    .theatre-location {
                        color: #666;
                        font-size: 0.9rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                    }

                    /* Main Content Area */
                    .ticket-content {
                        padding: 30px;
                        background: white;
                    }

                    /* Movie Info Card */
                    .movie-info-card {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        border-radius: 20px;
                        padding: 25px;
                        color: white;
                        margin-bottom: 25px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
                    }

                    .movie-info-card::before {
                        content: '🎬';
                        position: absolute;
                        right: -20px;
                        bottom: -20px;
                        font-size: 150px;
                        opacity: 0.1;
                        transform: rotate(-15deg);
                    }

                    .movie-title {
                        font-size: 2.5rem;
                        font-weight: 700;
                        margin-bottom: 15px;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                    }

                    .movie-details-grid {
                        display: flex;
                        gap: 30px;
                        flex-wrap: wrap;
                    }

                    .movie-detail-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        background: rgba(255,255,255,0.2);
                        padding: 8px 15px;
                        border-radius: 50px;
                        backdrop-filter: blur(5px);
                    }

                    .movie-detail-item i {
                        font-size: 1.2rem;
                    }

                    /* Booking Details Grid */
                    .booking-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                        margin-bottom: 25px;
                    }

                    .info-box {
                        background: #f8f9fa;
                        border-radius: 15px;
                        padding: 15px;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(0,0,0,0.05);
                    }

                    .info-box:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                    }

                    .info-label {
                        font-size: 0.8rem;
                        color: #666;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 5px;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .info-value {
                        font-size: 1.3rem;
                        font-weight: 700;
                        color: #333;
                    }

                    .info-value.booking-id {
                        color: #667eea;
                        font-family: 'Courier New', monospace;
                        font-size: 1.1rem;
                    }

                    /* Seat Display */
                    .seats-section {
                        margin-bottom: 25px;
                    }

                    .section-title {
                        font-size: 1.2rem;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: #333;
                        font-weight: 600;
                    }

                    .seats-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 15px;
                    }

                    .seat-badge {
                        padding: 8px 20px;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 1rem;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                        display: inline-flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .seat-badge.regular {
                        background: linear-gradient(135deg, #4299e1, #3182ce);
                        color: white;
                    }

                    .seat-badge.premium {
                        background: linear-gradient(135deg, #ecc94b, #d69e2e);
                        color: #1a202c;
                    }

                    .seat-badge.vip {
                        background: linear-gradient(135deg, #ed64a6, #d53f8c);
                        color: white;
                    }

                    .seat-badge i {
                        font-size: 0.9rem;
                    }

                    /* Price Breakdown */
                    .price-card {
                        background: #f8f9fa;
                        border-radius: 15px;
                        padding: 20px;
                        margin-bottom: 25px;
                    }

                    .price-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 12px 0;
                        border-bottom: 1px dashed #e0e0e0;
                    }

                    .price-row:last-child {
                        border-bottom: none;
                    }

                    .price-row.total {
                        font-size: 1.3rem;
                        font-weight: 700;
                        color: #667eea;
                        padding-top: 15px;
                    }

                    .price-label {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #4a5568;
                    }

                    .price-amount {
                        font-weight: 600;
                    }

                    /* Footer with Perforation */
                    .ticket-footer {
                        padding: 20px 30px 30px;
                        text-align: center;
                        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                        border-top: 2px dashed #e0e0e0;
                        position: relative;
                    }

                    .ticket-footer::before,
                    .ticket-footer::after {
                        content: '';
                        position: absolute;
                        width: 25px;
                        height: 25px;
                        background: #f0f2f5;
                        border-radius: 50%;
                        top: -13px;
                    }

                    .ticket-footer::before {
                        left: -13px;
                    }

                    .ticket-footer::after {
                        right: -13px;
                    }

                    .thank-you-message {
                        font-size: 1.3rem;
                        font-weight: 600;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 15px;
                    }

                    .barcode {
                        font-family: 'Libre Barcode 39', cursive;
                        font-size: 3rem;
                        margin: 15px 0;
                        color: #333;
                    }

                    .terms {
                        font-size: 0.8rem;
                        color: #999;
                        margin-top: 15px;
                    }

                    /* Print Button */
                    .print-button-container {
                        text-align: center;
                        margin: 30px 0 20px;
                    }

                    .print-btn {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 50px;
                        font-size: 1.2rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                    }

                    .print-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
                    }

                    .print-btn i {
                        font-size: 1.2rem;
                    }

                    /* Print Styles */
                    @media print {
                        body {
                            background: white;
                            padding: 0;
                        }

                        .print-button-container {
                            display: none;
                        }

                        .cinema-ticket {
                            box-shadow: none;
                            border: 1px solid #eee;
                        }

                        .ticket-strip {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        .movie-info-card {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }

                        .seat-badge.regular,
                        .seat-badge.premium,
                        .seat-badge.vip {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }

                    /* Responsive */
                    @media (max-width: 600px) {
                        .booking-grid {
                            grid-template-columns: 1fr;
                        }

                        .movie-title {
                            font-size: 2rem;
                        }

                        .movie-details-grid {
                            gap: 15px;
                        }

                        .info-value {
                            font-size: 1.1rem;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="cinema-ticket">
                    <div class="ticket-strip"></div>
                    
                    <div class="ticket-header">
                        <img src="images/logo.png" alt="BookMySeat" class="theatre-logo" onerror="this.src='https://via.placeholder.com/90x90'">
                        <h1 class="theatre-name">BookMySeat</h1>
                        <p class="theatre-location">
                            <i class="fas fa-map-marker-alt"></i>
                            Screen 1 | City Cinema Complex
                        </p>
                    </div>

                    <div class="ticket-content">
                        <!-- Movie Info Card -->
                        <div class="movie-info-card">
                            <h2 class="movie-title">${this.escapeHtml(movie.title)}</h2>
                            <div class="movie-details-grid">
                                <span class="movie-detail-item">
                                    <i class="fas fa-clock"></i>
                                    ${movie.duration || '2h 30m'}
                                </span>
                                <span class="movie-detail-item">
                                    <i class="fas fa-language"></i>
                                    ${movie.language || 'Hindi'}
                                </span>
                                <span class="movie-detail-item">
                                    <i class="fas fa-star"></i>
                                    ${movie.rating || '8.5'}
                                </span>
                                <span class="movie-detail-item">
                                    <i class="fas fa-film"></i>
                                    ${movie.genre || 'Action/Drama'}
                                </span>
                            </div>
                        </div>

                        <!-- Booking Details Grid -->
                        <div class="booking-grid">
                            <div class="info-box">
                                <div class="info-label">
                                    <i class="far fa-calendar-alt"></i>
                                    DATE
                                </div>
                                <div class="info-value">${formattedDate}</div>
                            </div>
                            <div class="info-box">
                                <div class="info-label">
                                    <i class="far fa-clock"></i>
                                    TIME
                                </div>
                                <div class="info-value">${formattedTime}</div>
                            </div>
                            <div class="info-box">
                                <div class="info-label">
                                    <i class="fas fa-ticket-alt"></i>
                                    SCREEN
                                </div>
                                <div class="info-value">Screen 1</div>
                            </div>
                            <div class="info-box">
                                <div class="info-label">
                                    <i class="fas fa-hashtag"></i>
                                    BOOKING ID
                                </div>
                                <div class="info-value booking-id">${bookingId}</div>
                            </div>
                        </div>

                        <!-- Seats Section -->
                        <div class="seats-section">
                            <h3 class="section-title">
                                <i class="fas fa-chair"></i>
                                Selected Seats
                            </h3>
                            <div class="seats-container">
                                ${this.generateSeatBadges()}
                            </div>
                        </div>

                        <!-- Price Breakdown -->
                        <div class="price-card">
                            <h3 class="section-title">
                                <i class="fas fa-receipt"></i>
                                Price Details
                            </h3>
                            ${this.generatePriceRows()}
                            <div class="price-row total">
                                <span class="price-label">
                                    <i class="fas fa-rupee-sign"></i>
                                    Grand Total
                                </span>
                                <span class="price-amount">₹${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="ticket-footer">
                        <div class="thank-you-message">
                            Thank you for choosing BookMySeat!
                        </div>
                        <div class="barcode">
                            ${bookingId.slice(-8)}
                        </div>
                        <p class="terms">
                            This is your e-ticket. Please show this QR code at the entrance.<br>
                            Arrive 15 minutes before the show time.
                        </p>
                    </div>

                    <div class="print-button-container">
                        <button class="print-btn" onclick="window.print()">
                            <i class="fas fa-print"></i>
                            Print Ticket
                        </button>
                    </div>
                </div>

                <script>
                    // Auto-trigger print dialog when page loads (optional)
                    window.onload = function() {
                        // Uncomment the line below if you want auto-print
                        // setTimeout(() => window.print(), 500);
                    };
                </script>
            </body>
            </html>
        `;
    }

    /**
     * Format date as DD MMM YYYY
     */
    formatDate() {
        const options = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        };
        return this.date.toLocaleDateString('en-IN', options).toUpperCase();
    }

    /**
     * Format time as HH:MM AM/PM
     */
    formatTime() {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        return this.date.toLocaleTimeString('en-IN', options);
    }

    /**
     * Group seats by their type for organized display
     */
    groupSeatsByType() {
        const groups = {
            regular: [],
            premium: [],
            vip: []
        };

        this.bookingData.seats.forEach(seat => {
            if (groups[seat.type]) {
                groups[seat.type].push(seat.id);
            }
        });

        return groups;
    }

    /**
     * Generate HTML for seat badges
     */
    generateSeatBadges() {
        const groups = this.groupSeatsByType();
        let html = '';

        if (groups.regular.length > 0) {
            html += `<span class="seat-badge regular"><i class="fas fa-chair"></i> ${groups.regular.join(', ')}</span>`;
        }
        if (groups.premium.length > 0) {
            html += `<span class="seat-badge premium"><i class="fas fa-crown"></i> ${groups.premium.join(', ')}</span>`;
        }
        if (groups.vip.length > 0) {
            html += `<span class="seat-badge vip"><i class="fas fa-star"></i> ${groups.vip.join(', ')}</span>`;
        }

        return html || '<span class="seat-badge">No seats selected</span>';
    }

    /**
     * Calculate per-category pricing
     */
    calculateSeatCategories() {
        const categories = {
            regular: { count: 0, amount: 0 },
            premium: { count: 0, amount: 0 },
            vip: { count: 0, amount: 0 }
        };

        this.bookingData.seats.forEach(seat => {
            if (categories[seat.type]) {
                categories[seat.type].count++;
                categories[seat.type].amount += seat.price;
            }
        });

        return categories;
    }

    /**
     * Generate price breakdown rows
     */
    generatePriceRows() {
        const categories = this.calculateSeatCategories();
        let html = '';

        if (categories.regular.count > 0) {
            html += `
                <div class="price-row">
                    <span class="price-label">
                        <i class="fas fa-chair" style="color: #4299e1;"></i>
                        Regular (${categories.regular.count} seats)
                    </span>
                    <span class="price-amount">₹${categories.regular.amount}</span>
                </div>
            `;
        }

        if (categories.premium.count > 0) {
            html += `
                <div class="price-row">
                    <span class="price-label">
                        <i class="fas fa-crown" style="color: #ecc94b;"></i>
                        Premium (${categories.premium.count} seats)
                    </span>
                    <span class="price-amount">₹${categories.premium.amount}</span>
                </div>
            `;
        }

        if (categories.vip.count > 0) {
            html += `
                <div class="price-row">
                    <span class="price-label">
                        <i class="fas fa-star" style="color: #ed64a6;"></i>
                        VIP (${categories.vip.count} seats)
                    </span>
                    <span class="price-amount">₹${categories.vip.amount}</span>
                </div>
            `;
        }

        html += `
            <div class="price-row">
                <span class="price-label">
                    <i class="fas fa-wifi"></i>
                    Convenience Fee
                </span>
                <span class="price-amount">₹${this.bookingData.convenienceFee}</span>
            </div>
            <div class="price-row">
                <span class="price-label">
                    <i class="fas fa-percent"></i>
                    GST (18%)
                </span>
                <span class="price-amount">₹${this.bookingData.gst.toFixed(2)}</span>
            </div>
        `;

        return html;
    }

    /**
     * Escape HTML special characters to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Open ticket in new window for printing
     */
    printTicket() {
        const ticketHTML = this.generateTicketHTML();
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(ticketHTML);
        printWindow.document.close();
        
        // Focus on the new window
        printWindow.focus();
        
        return printWindow;
    }

    /**
     * Download ticket as HTML file
     */
    downloadTicket() {
        const ticketHTML = this.generateTicketHTML();
        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `cinema-ticket-${this.bookingData.bookingId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    /**
     * Share ticket via email (opens default email client)
     */
    shareViaEmail() {
        const subject = `Your BookMySeat - ${this.bookingData.movie.title}`;
        const body = `Thank you for booking with BookMySeat!\n\nBooking ID: ${this.bookingData.bookingId}\nMovie: ${this.bookingData.movie.title}\nSeats: ${this.bookingData.seats.map(s => s.id).join(', ')}\nTotal: ₹${this.bookingData.grandTotal.toFixed(2)}\n\nPlease find your e-ticket attached.`;
        
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TicketReceipt;
}

// Global function to create and print receipt
function createAndPrintReceipt(bookingData) {
    const receipt = new TicketReceipt(bookingData);
    receipt.printTicket();
}

// Global function to download receipt
function downloadReceipt(bookingData) {
    const receipt = new TicketReceipt(bookingData);
    receipt.downloadTicket();
}

// Initialize receipt functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page that needs receipt functionality
    const printButtons = document.querySelectorAll('.print-receipt-btn, #printReceiptBtn');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingData = JSON.parse(localStorage.getItem('bookingData'));
            if (bookingData) {
                createAndPrintReceipt(bookingData);
            } else {
                alert('No booking data found. Please complete a booking first.');
            }
        });
    });

    // Download button handler
    const downloadButtons = document.querySelectorAll('.download-receipt-btn, #downloadBtn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookingData = JSON.parse(localStorage.getItem('bookingData'));
            if (bookingData) {
                downloadReceipt(bookingData);
            } else {
                alert('No booking data found. Please complete a booking first.');
            }
        });
    });
});