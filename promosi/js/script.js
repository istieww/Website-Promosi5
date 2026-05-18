// ===============================================
// Custom JavaScript for PT. Jasa Servis Website
// ===============================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initWhatsAppButtons();
});

// ===============================================
// Smooth Scroll for Navigation Links
// ===============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                }
            }
        });
    });
}

// ===============================================
// Alert Notification
// ===============================================
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert alert at the top of the page
    const container = document.querySelector('.container');
    if (container) {
        container.insertAdjacentElement('beforebegin', alertDiv);
    } else {
        document.body.insertAdjacentElement('afterbegin', alertDiv);
    }
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const alert = new bootstrap.Alert(alertDiv);
        alert.close();
    }, 5000);
}

// ===============================================
// Scroll Animations
// ===============================================
function initScrollAnimations() {
    // Add animation class to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards and feature boxes
    document.querySelectorAll('.service-card, .feature-box, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

// ===============================================
// Navbar Scroll Effect
// ===============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// ===============================================
// WhatsApp Integration
// ===============================================
function sendWhatsApp(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Initialize WhatsApp buttons
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phone = this.getAttribute('data-whatsapp-phone') || '6282812345678';
            const message = this.getAttribute('data-whatsapp-message') || 'Halo, saya ingin bertanya tentang layanan Anda';
            sendWhatsApp(phone, message);
        });
    });
}

// ===============================================
// Service Selection from Modals
// ===============================================
function selectService(serviceType) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceType;
        
        // Close the modal
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

// ===============================================
// Counter Animation (Optional)
// ===============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===============================================
// Lazy Loading Images (Optional)
// ===============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===============================================
// Print Utility
// ===============================================
function printPage() {
    window.print();
}

// ===============================================
// Export Contact Info
// ===============================================
function exportContactInfo() {
    const contactInfo = {
        name: 'PT. JASA SERVIS',
        phone: '(021) 8765-432',
        whatsapp: '0828-1234-5678',
        email: 'info@jasaservis.com',
        address: 'Jl. Merdeka No. 123, Jakarta Timur, 13210',
        operationalHours: 'Senin - Jumat: 09:00 - 17:00, Sabtu: 10:00 - 15:00'
    };
    
    const text = JSON.stringify(contactInfo, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-info.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Console greeting
console.log('%c🎉 Welcome to PT. JASA SERVIS Website!', 'font-size: 20px; color: #0066cc; font-weight: bold;');
console.log('%cHubungi kami: (021) 8765-432 | WhatsApp: 0828-1234-5678', 'font-size: 14px; color: #04a777;');
console.log('%cUntuk mengubah background/sampul hero, edit nilai url() di dalam atribut style tag section id="home" di index.html', 'font-size: 12px; color: #ff6b35; font-weight: bold;');
