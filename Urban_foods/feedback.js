// Get form elements
const feedbackForm = document.getElementById('feedbackForm');
const feedbackTextarea = document.getElementById('feedback');
const charCount = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const ratingText = document.getElementById('ratingText');

// Character counter
feedbackTextarea.addEventListener('input', function() {
    const count = this.value.length;
    const max = 1000;
    charCount.textContent = `${count} / ${max} characters`;
    
    if (count > max) {
        this.value = this.value.substring(0, max);
        charCount.textContent = `${max} / ${max} characters`;
    }
    
    // Change color based on usage
    if (count > 800) {
        charCount.style.color = '#d83316';
    } else if (count > 500) {
        charCount.style.color = '#ffc107';
    } else {
        charCount.style.color = '#999';
    }
});

// Star rating display
ratingInputs.forEach(input => {
    input.addEventListener('change', function() {
        const ratingValue = this.value;
        const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
        ratingText.textContent = `Your rating: ${ratingLabels[ratingValue - 1]} (${ratingValue}/5)`;
        ratingText.style.color = '#419c4d';
    });
});

// Form submission
feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        feedbackType: document.getElementById('feedbackType').value,
        rating: document.querySelector('input[name="rating"]:checked').value,
        feedback: document.getElementById('feedback').value,
        orderDate: document.getElementById('orderDate').value,
        newsletter: document.getElementById('newsletter').checked,
        contact: document.getElementById('contact').checked,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage (for demo purposes)
    saveToLocalStorage(formData);
    
    // Show success message
    feedbackForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Optional: Reset form after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 3000);
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedbackType = document.getElementById('feedbackType').value;
    const rating = document.querySelector('input[name="rating"]:checked');
    const feedback = document.getElementById('feedback').value.trim();
    
    if (!name) {
        showError('Please enter your name');
        return false;
    }
    
    if (!email) {
        showError('Please enter your email');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (!feedbackType) {
        showError('Please select a feedback type');
        return false;
    }
    
    if (!rating) {
        showError('Please select a rating');
        return false;
    }
    
    if (!feedback || feedback.length < 10) {
        showError('Please enter at least 10 characters in your feedback');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error notification
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f8d7da;
        border: 2px solid #f5c6cb;
        border-radius: 6px;
        padding: 15px 20px;
        color: #721c24;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Save feedback to localStorage
function saveToLocalStorage(data) {
    let feedbackList = JSON.parse(localStorage.getItem('urbanFoodsFeedback')) || [];
    feedbackList.push(data);
    localStorage.setItem('urbanFoodsFeedback', JSON.stringify(feedbackList));
    
    // Also log to console for verification
    console.log('Feedback saved:', data);
    console.log('Total feedbacks:', feedbackList.length);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
