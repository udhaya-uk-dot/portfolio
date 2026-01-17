// ============================================
// ULTRA PREMIUM PORTFOLIO - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CURSOR FOLLOWER
    // ============================================
    const cursor = document.querySelector('.cursor-follower');
    
    if (cursor && window.innerWidth >= 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, .highlight-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }
    
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        progressBar.style.width = progress + '%';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .about-content, .about-highlights, ' +
        '.skill-card, .project-card, .cert-card, .contact-info, .contact-form-wrapper, ' +
        '.section-header, .highlight-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ============================================
    // TYPING EFFECT (Optional Enhancement)
    // ============================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const roles = ['Web Developer', 'App Developer', 'UI/UX Enthusiast', 'Problem Solver'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        // Uncomment below to enable typing effect
        /*
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 2000);
        */
    }
    
    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Create mailto link
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
            );
            
            window.location.href = `mailto:udhayakumar6951@gmail.com?subject=${subject}&body=${body}`;
            
            // Show success message (optional)
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
    
    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const heroShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ============================================
    // FLOATING CARDS ANIMATION
    // ============================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFloatingCards() {
        floatingCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.02;
            const deltaY = (mouseY - centerY) * 0.02;
            
            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        requestAnimationFrame(animateFloatingCards);
    }
    
    if (window.innerWidth >= 1024) {
        animateFloatingCards();
    }
    
    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Observe stat numbers for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseFloat(text);
                
                if (!isNaN(number) && number < 100) {
                    // For CGPA-like values
                    let count = 0;
                    const target = number;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            entry.target.textContent = text;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = count.toFixed(1);
                        }
                    }, 40);
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
    
    // ============================================
    // IMAGE LOADING
    // ============================================
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        profileImg.addEventListener('error', function() {
            // Fallback for missing image
            this.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)';
            this.alt = 'UK';
        });
    }
    
    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.hero-content, .hero-image').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    });
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    // Debounce function for scroll events
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ============================================
    // INITIALIZE
    // ============================================
    console.log('🚀 Portfolio loaded successfully!');
    console.log('👨‍💻 Developed by Udhaya Kumar S');
    
});

// ============================================
// SERVICE WORKER REGISTRATION (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
