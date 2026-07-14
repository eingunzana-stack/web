document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Menú Móvil
            const btnMenu = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const navbar = document.getElementById('navbar');

            btnMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = btnMenu.querySelector('i');
                if(mobileMenu.classList.contains('active')){
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
            

            // 2. Efecto Navbar Scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // 3. Scroll Reveal Animations (Intersection Observer)
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Si quieres que la animación ocurra solo 1 vez, descomenta esto:
                        // observer.unobserve(entry.target); 
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            revealElements.forEach(el => observer.observe(el));
        });











        