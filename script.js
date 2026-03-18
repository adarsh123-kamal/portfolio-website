// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
let isDarkMode = true; // Dark mode is default

// Initialize theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDarkMode = false;
    }
});

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textArray = ['Aspiring Data Scientist', 'Python Developer', 'ML Enthusiast', 'Problem Solver'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = textArray[currentTextIndex];
    
    if (!isDeleting && currentCharIndex <= currentText.length) {
        typingText.textContent = currentText.substring(0, currentCharIndex);
        currentCharIndex++;
        typingSpeed = 100;
    } else if (isDeleting && currentCharIndex >= 0) {
        typingText.textContent = currentText.substring(0, currentCharIndex);
        currentCharIndex--;
        typingSpeed = 50;
    } else if (currentCharIndex > currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause before deleting
    } else if (currentCharIndex < 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation
type();

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Resume Download Button
const resumeBtn = document.getElementById('resumeBtn');
resumeBtn.addEventListener('click', () => {
    // Direct download of CV PDF file
    const link = document.createElement('a');
    link.href = 'src/AdarshKamal_cv.pdf';
    link.download = 'Adarsh_Kamal_CV.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    const originalText = resumeBtn.innerHTML;
    resumeBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    setTimeout(() => {
        resumeBtn.innerHTML = originalText;
    }, 2000);
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 2000);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// Add scroll up button
function createScrollUpButton() {
    const scrollUpBtn = document.createElement('button');
    scrollUpBtn.id = 'scrollUpBtn';
    scrollUpBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollUpBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollUpBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollUpBtn.style.display = 'flex';
        } else {
            scrollUpBtn.style.display = 'none';
        }
    });
    
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollUpBtn.addEventListener('mouseenter', () => {
        scrollUpBtn.style.transform = 'translateY(-5px)';
    });
    
    scrollUpBtn.addEventListener('mouseleave', () => {
        scrollUpBtn.style.transform = 'translateY(0)';
    });
}

createScrollUpButton();

// Parallax Effect on Home Section
window.addEventListener('scroll', () => {
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        const scrollPosition = window.pageYOffset;
        homeSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add staggered animation to skill badges
window.addEventListener('load', () => {
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        badge.style.opacity = '0';
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`;
        card.style.opacity = '0';
    });
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add keyboard shortcut for theme toggle (Ctrl + Shift + D)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Enhance form inputs with focus effect
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add sound effect indicator (optional visual feedback)
document.querySelectorAll('.btn, .skill-badge, .project-link').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Only add ripple to relative/absolute positioned elements
        if (this.classList.contains('btn') || this.classList.contains('project-link')) {
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Print all console messages for debugging (optional)
console.log('Portfolio loaded successfully!');
console.log('Press Ctrl + Shift + D to toggle theme');

// Certifications Carousel
const certCarousel = document.getElementById('certCarousel');
const certPrevBtn = document.getElementById('certCarouselPrev');
const certNextBtn = document.getElementById('certCarouselNext');

if (certCarousel && certPrevBtn && certNextBtn) {
    // Calculate scroll amount based on card width and gap
    const getScrollAmount = () => {
        const firstCard = certCarousel.querySelector('.certification-card');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 24; // 1.5rem gap
            return cardWidth + gap;
        }
        return 350; // fallback
    };

    // Scroll carousel
    const scrollCarousel = (direction) => {
        const scrollAmount = getScrollAmount();
        certCarousel.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    // Event listeners for arrow buttons
    certPrevBtn.addEventListener('click', () => scrollCarousel('prev'));
    certNextBtn.addEventListener('click', () => scrollCarousel('next'));
}
