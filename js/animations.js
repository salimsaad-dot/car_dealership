// animations.js - FIXED VERSION
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Mobile Navigation
    function initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;

        console.log('Initializing mobile navigation...'); // Debug log

        if (navToggle && navMenu) {
            console.log('Navigation elements found!'); // Debug log
            
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = navMenu.classList.toggle('active');
                navToggle.classList.toggle('active', isActive);
                
                console.log('Menu toggled, active:', isActive); // Debug log
                
                // Toggle body scroll
                if (isActive) {
                    body.style.overflow = 'hidden';
                    body.classList.add('menu-open');
                } else {
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                }
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active') && 
                    !navToggle.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                }
            });
        } else {
            console.log('Navigation elements NOT found:', {navToggle, navMenu}); // Debug log
        }
    }

    // Initialize mobile navigation
    initMobileNavigation();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // FIXED: Image loading - don't hide images initially
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Ensure images stay visible
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        
        // Only add loading animation if image hasn't loaded
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            img.addEventListener('error', function() {
                // If image fails to load, still show it or placeholder
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate (excluding images)
    const animatedElements = [
        '.hero-content',
        '.car-card',
        '.about-text',
        '.contact-info',
        '.contact-form',
        '.mission-statement',
        '.feature-card',
        '.visual-card',
        '.contact-card',
        '.social-links',
        '.contact-form-container',
        '.footer-brand',
        '.link-group',
        '.filter-sidebar',
        '.cars-toolbar'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });

    // Stagger animations
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Enhanced hover effects
    const hoverElements = [
        '.car-card',
        '.btn',
        '.feature-card',
        '.social-link',
        '.link-group a',
        '.social-icon',
        '.contact-method',
        '.whatsapp-float'
    ];

    hoverElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });

    // FIXED: Animated counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.getAttribute('data-count').includes('99') ? '%' : '+');
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }

    // Initialize counter animations when page loads
    animateCounters();

    console.log('AutoElite animations initialized 🚗✨');
});