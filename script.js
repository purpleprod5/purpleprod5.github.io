// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Sticky Header - handled in combined scroll handler

// Enhanced animation on scroll with stagger effect
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .about-content, .resume-container, .timeline-item');

    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 50) {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 100); // Stagger animation
        }
    });
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .about-content, .resume-container, .timeline-item').forEach(element => {
    observer.observe(element);
});

// Combined scroll handler for better performance
let ticking = false;

function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.getElementById('header');
    const hero = document.getElementById('hero');

    // Sticky Header
    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax effect for hero section
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Animation on scroll
    animateOnScroll();

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add subtle cursor animation
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Add hover effects for interactive elements (excluding elements with custom hover effects)
document.querySelectorAll('a:not(.btn):not(.social-icons a), button:not(.btn)').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.02)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
});

// Run animation on load
window.addEventListener('load', animateOnScroll);

// CV Download functionality
document.getElementById('downloadCV').addEventListener('click', function (e) {
    e.preventDefault();

    // In a real application, this would link to an actual PDF file
    alert('Dans une application réelle, cela téléchargerait votre CV au format PDF. Remplacez cette alerte par un lien vers votre fichier CV.');

    // Example of how to implement the actual download:
    // window.location.href = 'path/to/your/cv.pdf';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});