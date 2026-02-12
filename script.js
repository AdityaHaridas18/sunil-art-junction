document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (X)
            const icon = mobileBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Animation on Scroll (Optional polish)
    const fadeElements = document.querySelectorAll('.service-card, .section-title, .hero-content');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    // Modal Logic
    const serviceCards = document.querySelectorAll('.service-detail-card');
    const modal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (modal) {
        serviceCards.forEach(card => {
            card.style.cursor = 'pointer'; // Make cards look clickable
            card.addEventListener('click', () => {
                modal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Lottie Animations
    const loadLottie = (id, fileName) => {
        const container = document.getElementById(id);
        if (!container) {
            console.warn(`Lottie container #${id} not found`);
            return;
        }

        if (typeof lottie === 'undefined') {
            console.error('Lottie library (bodymovin) not loaded!');
            return;
        }

        // Handle path resolution for GitHub Pages/Subdirectories
        // If we are at /sunil-art-junction/index.html, we need to load /sunil-art-junction/images/...
        const path = `images/${fileName}`;

        console.log(`Attempting to load Lottie: ${id} from ${path}`);

        const anim = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path
        });

        anim.addEventListener('DOMLoaded', () => {
            console.log(`Lottie ${id} loaded successfully`);
            container.style.opacity = '1';
        });

        anim.addEventListener('data_failed', () => {
            console.error(`Lottie ${id} failed to load data from ${path}`);
        });
    };

    // Use filenames only, loader prepends images/
    loadLottie('lottie-hero', 'Landinganimation.json');
    loadLottie('lottie-welcome', 'Welcome.json');
    loadLottie('lottie-contact', 'ContactUs.json');
});
