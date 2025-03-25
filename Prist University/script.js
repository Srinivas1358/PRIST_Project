document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('show');
    });

    // Sidebar Toggle for Mobile
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '☰';
    document.body.appendChild(sidebarToggle);

    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.classList.toggle('sidebar-active');
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
            document.body.classList.remove('sidebar-active');
            sidebar.classList.remove('active');
        }
        
        // Close mobile menu when clicking anywhere
        if (window.innerWidth <= 768 && !e.target.closest('.menu-toggle') && !e.target.closest('.nav-links')) {
            navLinks.classList.remove('show');
        }
    });

    // Carousel Functionality
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.carousel img').length;
    let intervalId;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function startCarousel() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    function resetCarouselTimer() {
        clearInterval(intervalId);
        startCarousel();
    }

    // Start auto-sliding
    startCarousel();

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetCarouselTimer();
        });
    });

    // Initialize carousel
    updateCarousel();

    // Pause carousel on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    carousel.addEventListener('mouseleave', () => {
        startCarousel();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.body.classList.remove('sidebar-active');
            sidebar.classList.remove('active');
            navLinks.classList.remove('show');
        }
    });
});