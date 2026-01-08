/* ==========================================================================
   MAISON ÉLISE - JavaScript Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    function reveal() {
        revealElements.forEach(function (element) {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Check on load

    // ===== Form Submission Handler =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simple validation
            if (!data.name || !data.email) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showNotification('Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ===== Notification System =====
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification notification--' + type;
        notification.innerHTML = `
      <p>${message}</p>
      <button class="notification__close">&times;</button>
    `;

        // Add styles inline (for simplicity)
        notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      max-width: 400px;
      padding: 1.5rem 2rem;
      background-color: ${type === 'success' ? '#87907D' : '#c94a4a'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 9999;
      animation: slideIn 0.4s ease;
    `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.notification__close').addEventListener('click', function () {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(function () {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.4s ease reverse';
                setTimeout(function () { notification.remove(); }, 400);
            }
        }, 5000);
    }

    // ===== Portfolio Item Hover Effect Enhancement =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

    // ===== Parallax Effect for Hero =====
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero__bg img');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                heroBg.style.transform = 'translateY(' + rate + 'px) scale(1.1)';
            }
        });
    }

    // ===== Active Navigation Highlight =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function highlightNav() {
        const scrollY = window.scrollY;

        sections.forEach(function (section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

});
