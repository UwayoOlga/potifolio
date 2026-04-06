// Intersection Observer for highlighting active nav pill link
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-20% 0px -40% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-pill a[href="#${id}"]`);
            
            if (navLink) {
                document.querySelectorAll('.nav-pill a').forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Track all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Subtle background glow movement
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.glow-bg');
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    glows.forEach(glow => {
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// --- Slideshow ---
function initSlideshow(slideshowEl) {
    const slides = slideshowEl.querySelectorAll('.slide');
    const dots   = slideshowEl.querySelectorAll('.dot');
    const prev   = slideshowEl.querySelector('.slide-prev');
    const next   = slideshowEl.querySelector('.slide-next');
    let current  = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        timer = setInterval(() => goTo(current + 1), 2000);
    }

    function stopAuto() {
        clearInterval(timer);
    }

    prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });

    slideshowEl.addEventListener('mouseenter', stopAuto);
    slideshowEl.addEventListener('mouseleave', startAuto);

    startAuto();
}

document.querySelectorAll('.slideshow').forEach(initSlideshow);

