// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Hero Carousel
const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
let currentIndex = 0;
const totalItems = items.length;
let autoSlideInterval;

// Create indicators
items.forEach((_, index) => {
    const indicator = document.createElement('span');
    indicator.dataset.index = index;
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.carousel-indicators span');

// Update carousel position
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentIndex = index;
    if (currentIndex >= totalItems) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalItems - 1;
    updateCarousel();
    resetAutoSlide();
}

// Next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

// Previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Event listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Auto-advance
autoSlideInterval = setInterval(nextSlide, 5000);

// Pause on hover
carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
carousel.addEventListener('mouseleave', resetAutoSlide);

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoSlideInterval);
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetAutoSlide();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    }
});

// Service Modals
const serviceButtons = document.querySelectorAll('.service-btn');
const serviceModals = document.querySelectorAll('.service-modal');
const closeButtons = document.querySelectorAll('.close-modal');

serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceId = button.getAttribute('data-service');
        const modal = document.getElementById(`${serviceId}-modal`);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.service-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
serviceModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Calendar Booking System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker with available dates
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const minDate = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', minDate);
        
        // Disable weekends (example)
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            
            if (day === 0 || day === 6) { // Sunday or Saturday
                alert('Please select a weekday for your appointment');
                this.value = '';
            }
        });
    }
});

// Form Submission - Modified to redirect to thank-you page
/*const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // server 
        // For demonstration, we'll simulate a successful submission
        
        // Store form data in localStorage to display on thank-you page
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value
        };
        
        localStorage.setItem('bookingData', JSON.stringify(formData));
        
        // Redirect to thank-you page
        window.location.href = 'thank_you.html'; // Make sure this page exists
        
        // If using FormSubmit, the form will handle the submission and redirect
        // So you might want to remove this event listener if using FormSubmit
    });
}
*/
// Scroll animations
const animateElements = document.querySelectorAll('.animate');

function checkScroll() {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        
        // Send to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Redirect to thank you page on success
                window.location.href = 'thank_you.html';
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message without leaving the page
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error-message';
            errorMessage.textContent = 'There was a problem with your subscription. Please try again later.';
            errorMessage.style.color = '#e74c3c';
            errorMessage.style.marginTop = '10px';
            errorMessage.style.textAlign = 'center';
            
            // Insert after the form
            this.parentNode.insertBefore(errorMessage, this.nextSibling);
            
            // Remove after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        })
        .finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Load non-critical JS after page load
window.addEventListener('load', function() {
  const script = document.createElement('script');
  script.src = 'non-critical.js';
  document.body.appendChild(script);
});