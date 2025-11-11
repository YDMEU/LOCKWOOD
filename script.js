// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');

            if (!targetHref || !targetHref.startsWith('#')) {
                return; // Allow default navigation for external/internal pages
            }

            const targetSection = document.querySelector(targetHref);
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Animation functionality removed for simpler design

    // Animation effects removed for simpler design
    
    // Hero video management
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.addEventListener('loadeddata', function() {
            this.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
            });
        });
        
        // Pause video when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Cookie Consent Management
    initializeCookieConsent();
});

// Cookie Consent Functions
function initializeCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptAllBtn = document.getElementById('acceptAllCookies');
    const savePreferencesBtn = document.getElementById('savePreferences');
    const rejectAllBtn = document.getElementById('rejectAllCookies');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show cookie popup after 1 second
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    } else {
        // Hide popup if choice already made
        cookieConsent.style.display = 'none';
    }

    // Accept All Cookies
    acceptAllBtn.addEventListener('click', function() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true
        };
        saveCookiePreferences(preferences);
        hideCookiePopup();
        showNotification('All cookies accepted. Thank you!', 'success');
    });

    // Save Preferences
    savePreferencesBtn.addEventListener('click', function() {
        const preferences = {
            necessary: document.getElementById('necessaryCookies').checked,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked,
            preferences: document.getElementById('preferencesCookies').checked
        };
        saveCookiePreferences(preferences);
        hideCookiePopup();
        showNotification('Cookie preferences saved successfully!', 'success');
    });

    // Reject All Cookies
    rejectAllBtn.addEventListener('click', function() {
        const preferences = {
            necessary: true, // Always required
            analytics: false,
            marketing: false,
            preferences: false
        };
        saveCookiePreferences(preferences);
        hideCookiePopup();
        showNotification('Only necessary cookies accepted.', 'success');
    });

    // Load saved preferences
    if (cookieChoice) {
        loadCookiePreferences();
    }
}

function saveCookiePreferences(preferences) {
    const consentData = {
        preferences: preferences,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    
    // Apply cookie settings
    applyCookieSettings(preferences);
    
    // Set a cookie to remember the choice
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `cookieConsent=true; expires=${expirationDate.toUTCString()}; path=/`;
}

function loadCookiePreferences() {
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice) {
        const consentData = JSON.parse(cookieChoice);
        const preferences = consentData.preferences;
        
        document.getElementById('analyticsCookies').checked = preferences.analytics;
        document.getElementById('marketingCookies').checked = preferences.marketing;
        document.getElementById('preferencesCookies').checked = preferences.preferences;
        
        applyCookieSettings(preferences);
    }
}

function applyCookieSettings(preferences) {
    // Analytics Cookies
    if (preferences.analytics) {
        // Enable Google Analytics or other analytics tools
        console.log('Analytics cookies enabled');
        // Example: gtag('consent', 'update', {'analytics_storage': 'granted'});
    } else {
        console.log('Analytics cookies disabled');
        // Example: gtag('consent', 'update', {'analytics_storage': 'denied'});
    }

    // Marketing Cookies
    if (preferences.marketing) {
        console.log('Marketing cookies enabled');
        // Enable marketing/advertising cookies
        // Example: gtag('consent', 'update', {'ad_storage': 'granted'});
    } else {
        console.log('Marketing cookies disabled');
        // Example: gtag('consent', 'update', {'ad_storage': 'denied'});
    }

    // Preference Cookies
    if (preferences.preferences) {
        console.log('Preference cookies enabled');
        // Enable preference cookies
        // Example: gtag('consent', 'update', {'functionality_storage': 'granted'});
    } else {
        console.log('Preference cookies disabled');
        // Example: gtag('consent', 'update', {'functionality_storage': 'denied'});
    }
}

function hideCookiePopup() {
    const cookieConsent = document.getElementById('cookieConsent');
    cookieConsent.classList.remove('show');
    
    setTimeout(() => {
        cookieConsent.style.display = 'none';
    }, 500);
}

function showCookiePopup() {
    const cookieConsent = document.getElementById('cookieConsent');
    cookieConsent.style.display = 'block';
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 100);
}

// Function to reset cookie preferences (for testing or user request)
function resetCookiePreferences() {
    localStorage.removeItem('cookieConsent');
    document.cookie = 'cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    showCookiePopup();
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Animation functions removed for simpler design

// Animation functions removed for simpler design
