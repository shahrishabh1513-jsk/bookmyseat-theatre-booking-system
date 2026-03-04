document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (!bookingData) {
        window.location.href = 'index.html';
        return;
    }
    
    displayBookingSummary(bookingData);
    setupPaymentTabs();
    setupFormValidation();
    generateQRCode(bookingData);
    
    document.getElementById('payNowBtn').addEventListener('click', handlePayment);
});

function displayBookingSummary(bookingData) {
    const summaryCard = document.getElementById('bookingSummary');
    const { movie, seats, ticketPrice, convenienceFee, gst, grandTotal } = bookingData;
    
    // Group seats by type
    const seatsByType = {};
    seats.forEach(seat => {
        if (!seatsByType[seat.type]) seatsByType[seat.type] = [];
        seatsByType[seat.type].push(seat.id);
    });
    
    let seatTagsHtml = '';
    for (const [type, seatList] of Object.entries(seatsByType)) {
        seatTagsHtml += `<div class="seat-tag ${type}">${type.toUpperCase()}: ${seatList.join(', ')}</div>`;
    }
    
    summaryCard.innerHTML = `
        <h2 style="margin-bottom: 1.5rem;">Booking Summary</h2>
        
        <div class="movie-summary">
            <img src="${movie.image}" alt="${movie.title}" class="movie-summary-poster" onerror="this.src='https://via.placeholder.com/80x80'">
            <div class="movie-summary-info">
                <h3>${movie.title}</h3>
                <p><i class="fas fa-clock"></i> ${movie.duration}</p>
                <p><i class="fas fa-language"></i> ${movie.language}</p>
            </div>
        </div>
        
        <div class="seat-summary">
            <h4><i class="fas fa-chair"></i> Selected Seats</h4>
            <div class="seat-tags">
                ${seatTagsHtml}
            </div>
        </div>
        
        <div class="price-summary">
            <div class="summary-item">
                <span>Ticket Price:</span>
                <span>₹${ticketPrice}</span>
            </div>
            <div class="summary-item">
                <span>Convenience Fee:</span>
                <span>₹${convenienceFee}</span>
            </div>
            <div class="summary-item">
                <span>GST (18%):</span>
                <span>₹${gst.toFixed(2)}</span>
            </div>
            <div class="summary-item total">
                <span>Grand Total:</span>
                <span>₹${grandTotal.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="savings-badge">
            <i class="fas fa-gift"></i>
            <div>
                <strong>You saved ₹${(convenienceFee * 0.1).toFixed(2)}</strong>
                <p>with membership discount</p>
            </div>
        </div>
    `;
}

function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.dataset.tab;
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

function setupFormValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }
    
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }
    
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

function generateQRCode(bookingData) {
    const qrContainer = document.getElementById('qrCode');
    if (!qrContainer) return;
    
    // Generate random UPI QR data
    const upiId = `cinematicket${Math.floor(Math.random() * 10000)}@okhdfcbank`;
    const amount = bookingData.grandTotal.toFixed(2);
    const qrData = `upi://pay?pa=${upiId}&pn=Cinema%20Ticket&am=${amount}&cu=INR`;
    
    // Clear container
    qrContainer.innerHTML = '';
    
    // Create QR code
    new QRCode(qrContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber');
    const cardName = document.getElementById('cardName');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');
    
    let isValid = true;
    
    // Card Number
    if (!cardNumber.value || cardNumber.value.replace(/\s/g, '').length !== 16) {
        showError(cardNumber, 'Enter valid 16-digit card number');
        isValid = false;
    } else {
        clearError(cardNumber);
    }
    
    // Cardholder Name
    if (!cardName.value || cardName.value.length < 3) {
        showError(cardName, 'Enter cardholder name');
        isValid = false;
    } else {
        clearError(cardName);
    }
    
    // Expiry
    if (!expiry.value || expiry.value.length !== 5) {
        showError(expiry, 'Enter valid expiry (MM/YY)');
        isValid = false;
    } else {
        const [month, year] = expiry.value.split('/');
        const currentDate = new Date();
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        
        if (expiryDate < currentDate) {
            showError(expiry, 'Card expired');
            isValid = false;
        } else {
            clearError(expiry);
        }
    }
    
    // CVV
    if (!cvv.value || cvv.value.length !== 3) {
        showError(cvv, 'Enter valid CVV');
        isValid = false;
    } else {
        clearError(cvv);
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = message;
    input.style.borderColor = 'var(--danger)';
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    errorElement.textContent = '';
    input.style.borderColor = '';
}

function handlePayment() {
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    let isValid = true;
    
    if (activeTab === 'card') {
        isValid = validateCardForm();
    }
    
    if (isValid) {
        simulatePayment();
    }
}

function simulatePayment() {
    const payBtn = document.getElementById('payNowBtn');
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payBtn.disabled = true;
    
    setTimeout(() => {
        const bookingData = JSON.parse(localStorage.getItem('bookingData'));
        const bookingId = 'BOOK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
        
        bookingData.bookingId = bookingId;
        bookingData.paymentMethod = document.querySelector('.tab-btn.active').dataset.tab;
        bookingData.paymentDate = new Date().toISOString();
        
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        window.location.href = 'success.html';
    }, 2000);
}