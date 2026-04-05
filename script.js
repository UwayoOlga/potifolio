// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal-on-Scroll Animations using IntersectionObserver
const revealOnScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    const targets = document.querySelectorAll('.project-card, .section-title, h1, p');
    targets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(target);
    });
};

// CSS class for visible state (will be triggered by JS)
// Note: We could also define this in style.css directly
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Initialize animations
window.addEventListener('load', revealOnScroll);

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate burger to X
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
});

// Carousel Navigation
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: carousel.offsetWidth,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: -carousel.offsetWidth,
        behavior: 'smooth'
    });
});
