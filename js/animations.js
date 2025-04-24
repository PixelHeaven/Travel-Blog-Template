// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Smooth parallax scrolling effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            
            // Simple validation
            if (emailInput.value.trim() !== '') {
                // Replace form with success message
                const formContainer = this.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message" style="text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px;"></i>
                        <h3>Thank You for Subscribing!</h3>
                        <p>You'll start receiving our travel updates soon.</p>
                    </div>
                `;
                
                // Animate the success message
                setTimeout(() => {
                    const successMessage = document.querySelector('.success-message');
                    successMessage.style.animation = 'fadeInUp 1s ease';
                }, 100);
            }
        });
    }
    
    // Image hover effects
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.destination-image img');
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.destination-image img');
            image.style.transform = 'scale(1)';
        });
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add('loaded');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
    
    // Smooth scroll to section when clicking on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animations to elements when scrolled into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    window.addEventListener('scroll', function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    });
});

// Custom cursor effect (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    } else {
        // Create custom cursor if it doesn't exist
        const cursorElement = document.createElement('div');
        cursorElement.classList.add('custom-cursor');
        document.body.appendChild(cursorElement);
        
        // Add styles to the cursor
        cursorElement.style.position = 'fixed';
        cursorElement.style.width = '20px';
        cursorElement.style.height = '20px';
        cursorElement.style.borderRadius = '50%';
        cursorElement.style.border = '2px solid var(--accent-color)';
        cursorElement.style.pointerEvents = 'none';
        cursorElement.style.transform = 'translate(-50%, -50%)';
        cursorElement.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
        cursorElement.style.zIndex = '9999';
        
        // Position the cursor
        cursorElement.style.left = e.clientX + 'px';
        cursorElement.style.top = e.clientY + 'px';
    }
});

// Change cursor appearance when hovering over links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(255, 126, 95, 0.2)';
                cursor.style.border = '1px solid var(--accent-color)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '2px solid var(--accent-color)';
            }
        });
    });
});

// Image gallery with lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length > 0) {
        // Create lightbox container if it doesn't exist
        if (!document.querySelector('.lightbox-container')) {
            const lightboxContainer = document.createElement('div');
            lightboxContainer.classList.add('lightbox-container');
            lightboxContainer.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="" alt="Lightbox Image">
                    <div class="lightbox-caption"></div>
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-prev">&lt;</button>
                    <button class="lightbox-next">&gt;</button>
                </div>
            `;
            document.body.appendChild(lightboxContainer);
            
            // Add styles to lightbox
            const style = document.createElement('style');
            style.textContent = `
                .lightbox-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2000;
                    display: none;
                }
                .lightbox-container.active {
                    display: block;
                }
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                }
                .lightbox-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 90%;
                    max-height: 80%;
                }
                .lightbox-content img {
                    display: block;
                    max-width: 100%;
                    max-height: 80vh;
                    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                    border: 3px solid white;
                }
                .lightbox-caption {
                    color: white;
                    text-align: center;
                    padding: 10px;
                    font-family: var(--body-font);
                }
                .lightbox-close, .lightbox-prev, .lightbox-next {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    position: absolute;
                    transition: color 0.3s ease;
                }
                .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
                    color: var(--accent-color);
                }
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                }
                .lightbox-prev {
                    top: 50%;
                    left: -50px;
                    transform: translateY(-50%);
                }
                .lightbox-next {
                    top: 50%;
                    right: -50px;
                    transform: translateY(-50%);
                }
            `;
            document.head.appendChild(style);
            
            // Add lightbox functionality
            const lightbox = document.querySelector('.lightbox-container');
            const lightboxImg = document.querySelector('.lightbox-content img');
            const lightboxCaption = document.querySelector('.lightbox-caption');
            const lightboxClose = document.querySelector('.lightbox-close');
            const lightboxPrev = document.querySelector('.lightbox-prev');
            const lightboxNext = document.querySelector('.lightbox-next');
            
            let currentIndex = 0;
            
            // Open lightbox
            galleryImages.forEach((img, index) => {
                img.addEventListener('click', function() {
                    currentIndex = index;
                    const imgSrc = this.getAttribute('src');
                    const imgAlt = this.getAttribute('alt') || '';
                    
                    lightboxImg.setAttribute('src', imgSrc);
                    lightboxCaption.textContent = imgAlt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Add animation
                    lightboxImg.style.animation = 'fadeInZoom 0.4s ease';
                });
            });
            
            // Close lightbox
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close on overlay click
            document.querySelector('.lightbox-overlay').addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Next image
            lightboxNext.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                updateLightboxImage();
            });
            
            // Previous image
            lightboxPrev.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightboxImage();
            });
            
            // Update lightbox image
            function updateLightboxImage() {
                const newSrc = galleryImages[currentIndex].getAttribute('src');
                const newAlt = galleryImages[currentIndex].getAttribute('alt') || '';
                
                lightboxImg.style.animation = 'none';
                setTimeout(() => {
                    lightboxImg.style.animation = 'fadeInZoom 0.4s ease';
                    lightboxImg.setAttribute('src', newSrc);
                    lightboxCaption.textContent = newAlt;
                }, 10);
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('active')) return;
                
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryImages.length;
                    updateLightboxImage();
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                    updateLightboxImage();
                }
            });
        }
    }
});

// Add interactive map for destination pages
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('destination-map');
    
    if (mapContainer) {
        // Create a script element to load the Google Maps API
        // Note: You would need a Google Maps API key for this to work
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
        
        // Define the initMap function
        window.initMap = function() {
            // Get coordinates from data attributes
            const lat = parseFloat(mapContainer.dataset.lat || 0);
            const lng = parseFloat(mapContainer.dataset.lng || 0);
            const locationName = mapContainer.dataset.name || 'Destination';
            
            // Create map
            const map = new google.maps.Map(mapContainer, {
                center: { lat, lng },
                zoom: 12,
                styles: [
                    // Custom map styles would go here
                    // This is optional but adds a nice touch
                ]
            });
            
            // Add marker
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: locationName,
                animation: google.maps.Animation.DROP
            });
            
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="map-info"><h3>${locationName}</h3><p>Explore this amazing destination!</p></div>`
            });
            
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        };
    }
});

// Animated counter for statistics (e.g., "Countries Visited: 45")
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCounter, 15);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

// Add custom CSS animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fadeInUp animation to key elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInZoom {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes floatAnimation {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-15px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        .float-element {
            animation: floatAnimation 4s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Add float animation to selected elements
    const elementsToFloat = document.querySelectorAll('.travel-icon, .scroll-indicator, .newsletter img');
    elementsToFloat.forEach(element => {
        element.classList.add('float-element');
    });
});

// Weather widget for destination pages
document.addEventListener('DOMContentLoaded', function() {
    const weatherWidget = document.querySelector('.weather-widget');
    
    if (weatherWidget) {
        const locationCode = weatherWidget.dataset.location;
        // You would need to sign up for a weather API like OpenWeatherMap
        const apiKey = 'YOUR_WEATHER_API_KEY';
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationCode}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                weatherWidget.innerHTML = `
                    <div class="weather-card">
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                        </div>
                        <div class="weather-info">
                            <h3>${data.name}</h3>
                            <p class="temperature">${Math.round(data.main.temp)}°C</p>
                            <p class="description">${data.weather[0].description}</p>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherWidget.innerHTML = '<p>Weather information unavailable</p>';
            });
    }
});

// Add page transition effects
document.addEventListener('DOMContentLoaded', function() {
    // Create page transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.classList.add('page-transition');
    document.body.appendChild(transitionOverlay);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        
                .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        
        .page-transition.active {
            transform: translateY(0);
        }
        
        .page-transition.fade-out {
            transform: translateY(-100%);
        }
    `;
    document.head.appendChild(style);
    
    // Handle internal link navigation with transitions
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links that aren't anchors
        if (link.hostname === window.location.hostname && 
            !link.href.includes('#') && 
            !link.target && 
            !link.hasAttribute('data-no-transition')) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const destination = this.href;
                
                // Activate transition overlay
                transitionOverlay.classList.add('active');
                
                // Navigate after transition completes
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            });
        }
    });
    
    // Handle page load transition
    window.addEventListener('load', function() {
        transitionOverlay.classList.add('fade-out');
        setTimeout(() => {
            transitionOverlay.classList.remove('active', 'fade-out');
        }, 500);
    });
});

// Add interactive image comparisons (before/after sliders)
document.addEventListener('DOMContentLoaded', function() {
    const comparisons = document.querySelectorAll('.image-comparison');
    
    comparisons.forEach(comparison => {
        const beforeImg = comparison.querySelector('.before-image img');
        const afterImg = comparison.querySelector('.after-image img');
        const slider = comparison.querySelector('.comparison-slider');
        
        if (beforeImg && afterImg && slider) {
            // Set initial position
            comparison.style.position = 'relative';
            comparison.style.overflow = 'hidden';
            
            afterImg.parentElement.style.position = 'absolute';
            afterImg.parentElement.style.top = '0';
            afterImg.parentElement.style.left = '0';
            afterImg.parentElement.style.width = '100%';
            afterImg.parentElement.style.height = '100%';
            afterImg.parentElement.style.overflow = 'hidden';
            
            slider.style.position = 'absolute';
            slider.style.top = '0';
            slider.style.bottom = '0';
            slider.style.left = '50%';
            slider.style.width = '4px';
            slider.style.backgroundColor = '#fff';
            slider.style.transform = 'translateX(-50%)';
            slider.style.cursor = 'ew-resize';
            slider.style.zIndex = '10';
            
            // Add drag handle
            const handle = document.createElement('div');
            handle.style.position = 'absolute';
            handle.style.top = '50%';
            handle.style.left = '50%';
            handle.style.width = '40px';
            handle.style.height = '40px';
            handle.style.borderRadius = '50%';
            handle.style.backgroundColor = '#fff';
            handle.style.transform = 'translate(-50%, -50%)';
            handle.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
            handle.innerHTML = '<i class="fas fa-arrows-alt-h" style="color: var(--primary-color); line-height: 40px; text-align: center; display: block;"></i>';
            slider.appendChild(handle);
            
            // Set initial clip path
            afterImg.parentElement.style.clipPath = 'inset(0 0 0 50%)';
            afterImg.parentElement.style.webkitClipPath = 'inset(0 0 0 50%)';
            
            // Add event listeners for dragging
            let isDragging = false;
            
            slider.addEventListener('mousedown', function(e) {
                isDragging = true;
                e.preventDefault();
            });
            
            window.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            comparison.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                const rect = comparison.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                
                if (percentage >= 0 && percentage <= 100) {
                    slider.style.left = `${percentage}%`;
                    afterImg.parentElement.style.clipPath = `inset(0 0 0 ${percentage}%)`;
                    afterImg.parentElement.style.webkitClipPath = `inset(0 0 0 ${percentage}%)`;
                }
            });
            
            // Touch events for mobile
            slider.addEventListener('touchstart', function(e) {
                isDragging = true;
            });
            
            window.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            comparison.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const rect = comparison.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                
                if (percentage >= 0 && percentage <= 100) {
                    slider.style.left = `${percentage}%`;
                    afterImg.parentElement.style.clipPath = `inset(0 0 0 ${percentage}%)`;
                    afterImg.parentElement.style.webkitClipPath = `inset(0 0 0 ${percentage}%)`;
                }
            });
        }
    });
});

// Add typed text effect for headlines
document.addEventListener('DOMContentLoaded', function() {
    const typedElements = document.querySelectorAll('[data-typed]');
    
    typedElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = element.dataset.typingSpeed || 100;
        
        function typeCharacter() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCharacter, 300);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
});

// Add interactive travel timeline
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.travel-timeline');
    
    if (timeline) {
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        
        // Add observer to animate timeline items as they enter viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            // Add initial styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Add click event to expand/collapse timeline details
            const header = item.querySelector('.timeline-header');
            const content = item.querySelector('.timeline-content');
            
            if (header && content) {
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.5s ease';
                
                header.style.cursor = 'pointer';
                header.addEventListener('click', function() {
                    if (content.style.maxHeight === '0px') {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        item.classList.add('expanded');
                    } else {
                        content.style.maxHeight = '0';
                        item.classList.remove('expanded');
                    }
                });
            }
            
            observer.observe(item);
        });
        
        // Add animation for animated items
        const style = document.createElement('style');
        style.textContent = `
            .timeline-item.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .timeline-item.expanded {
                background-color: rgba(255, 255, 255, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
});

// Initialize theme toggler (dark/light mode)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            const icon = themeToggle.querySelector('i');
            
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Add dark theme styles if not already present
        if (!document.querySelector('#dark-theme-styles')) {
            const darkStyles = document.createElement('style');
            darkStyles.id = 'dark-theme-styles';
            darkStyles.textContent = `
                body.dark-theme {
                    --text-color: #e1e1e1;
                    --dark-color: #f1f1f1;
                    --light-color: #222;
                    background-color: #1a1a1a;
                }
                
                body.dark-theme .header.scrolled {
                    background-color: rgba(20, 20, 20, 0.95);
                }
                
                body.dark-theme .header.scrolled .logo,
                body.dark-theme .header.scrolled .nav-menu a {
                    color: #fff;
                }
                
                body.dark-theme .destination-card,
                body.dark-theme .story-card,
                body.dark-theme .tip-card,
                body.dark-theme .newsletter-content {
                    background-color: #2a2a2a;
                    color: #e1e1e1;
                }
                
                body.dark-theme .section-header h2,
                body.dark-theme .destination-content h3,
                body.dark-theme .story-content h3,
                body.dark-theme .tip-card h3 {
                    color: #fff;
                }
                
                body.dark-theme .destination-content p,
                body.dark-theme .story-content p,
                body.dark-theme .tip-card p {
                    color: #aaa;
                }
            `;
            document.head.appendChild(darkStyles);
        }
    }
});

// Add back-to-top button
document.addEventListener('DOMContentLoaded', function() {
    // Create back-to-top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.classList.add('back-to-top');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s, transform 0.3s;
                z-index: 100;
            }
            
            .back-to-top.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .back-to-top:hover {
                transform: translateY(-5px);
            }
        `;
        document.head.appendChild(style);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0;
                height: 3px;
                background: linear-gradient(to right, var(--accent-color), var(--primary-color));
                z-index: 1001;
                transition: width 0.2s;
            }
        `;
        document.head.appendChild(style);
        
                // Update progress bar width on scroll
                window.addEventListener('scroll', function() {
                    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercentage = (scrollTop / scrollHeight) * 100;
                    progressBar.style.width = scrollPercentage + '%';
                });
            }
        });
        
        // Add reading time calculator for blog posts
        document.addEventListener('DOMContentLoaded', function() {
            const articleContent = document.querySelector('.article-content');
            const readingTimeElement = document.querySelector('.reading-time');
            
            if (articleContent && readingTimeElement) {
                // Calculate reading time (average reading speed: 200 words per minute)
                const text = articleContent.textContent;
                const wordCount = text.split(/\s+/).length;
                const readingTime = Math.ceil(wordCount / 200);
                
                readingTimeElement.textContent = `${readingTime} min read`;
            }
        });
        
        // Add smooth fade-in for images as they load
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('img:not(.no-fade)');
            
            images.forEach(img => {
                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.addEventListener('load', function() {
                    img.style.opacity = '1';
                });
                
                // If the image is already loaded
                if (img.complete) {
                    img.style.opacity = '1';
                }
            });
        });
        
        // Add FAQ accordion functionality
        document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    // Set initial state
                    answer.style.maxHeight = '0';
                    answer.style.overflow = 'hidden';
                    answer.style.transition = 'max-height 0.3s ease';
                    
                    question.addEventListener('click', function() {
                        // Close all other answers
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                const otherAnswer = otherItem.querySelector('.faq-answer');
                                otherAnswer.style.maxHeight = '0';
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Toggle current answer
                        if (answer.style.maxHeight === '0px') {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            item.classList.add('active');
                        } else {
                            answer.style.maxHeight = '0';
                            item.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        // Add star rating functionality
        document.addEventListener('DOMContentLoaded', function() {
            const ratingContainers = document.querySelectorAll('.star-rating');
            
            ratingContainers.forEach(container => {
                const stars = container.querySelectorAll('.star');
                const ratingInput = container.querySelector('input[type="hidden"]');
                
                stars.forEach((star, index) => {
                    // Show filled stars based on current rating
                    if (ratingInput && parseInt(ratingInput.value) > index) {
                        star.classList.add('filled');
                    }
                    
                    // Allow users to click stars to rate
                    star.addEventListener('click', function() {
                        const rating = index + 1;
                        
                        // Update UI
                        stars.forEach((s, i) => {
                            if (i < rating) {
                                s.classList.add('filled');
                            } else {
                                s.classList.remove('filled');
                            }
                        });
                        
                        // Update hidden input value
                        if (ratingInput) {
                            ratingInput.value = rating;
                        }
                    });
                    
                    // Hover effects
                    star.addEventListener('mouseenter', function() {
                        for (let i = 0; i <= index; i++) {
                            stars[i].classList.add('hover');
                        }
                    });
                    
                    star.addEventListener('mouseleave', function() {
                        stars.forEach(s => s.classList.remove('hover'));
                    });
                });
            });
        });
        
        // Add photo masonry layout
        document.addEventListener('DOMContentLoaded', function() {
            const masonryGrids = document.querySelectorAll('.masonry-grid');
            
            if (masonryGrids.length > 0) {
                // Add required styles for masonry layout
                const style = document.createElement('style');
                style.textContent = `
                    .masonry-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        grid-gap: 15px;
                        grid-auto-rows: 0;
                    }
                    
                    .masonry-item {
                        break-inside: avoid;
                        margin-bottom: 15px;
                        border-radius: 8px;
                        overflow: hidden;
                        transition: transform 0.3s ease;
                    }
                    
                    .masonry-item:hover {
                        transform: translateY(-5px);
                    }
                    
                    .masonry-item img {
                        display: block;
                        width: 100%;
                        height: auto;
                        transition: transform 0.5s ease;
                    }
                    
                    .masonry-item:hover img {
                        transform: scale(1.05);
                    }
                `;
                document.head.appendChild(style);
                
                // Initialize masonry layout
                masonryGrids.forEach(grid => {
                    const items = grid.querySelectorAll('.masonry-item');
                    const imgLoad = imagesLoaded(grid);
                    
                    imgLoad.on('progress', function() {
                        // This assumes you're including the imagesLoaded library
                        // If not, you would need to calculate heights manually
                        const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
                        const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'));
                        
                        items.forEach(item => {
                            const rowSpan = Math.ceil(
                                (item.querySelector('img').height + rowGap) / (rowHeight + rowGap)
                            );
                            item.style.gridRowEnd = 'span ' + rowSpan;
                        });
                    });
                });
            }
        });
        
        // Add scroll-based animations for elements
        document.addEventListener('DOMContentLoaded', function() {
            // Select elements to animate
            const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in');
            
            // Create styles for animations
            const style = document.createElement('style');
            style.textContent = `
                .fade-in {
                    opacity: 0;
                    transition: opacity 0.8s ease;
                }
                
                .slide-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .slide-left {
                    opacity: 0;
                    transform: translateX(50px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .slide-right {
                    opacity: 0;
                    transform: translateX(-50px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .zoom-in {
                    opacity: 0;
                    transform: scale(0.9);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .animate {
                    opacity: 1;
                    transform: translate(0) scale(1);
                }
            `;
            document.head.appendChild(style);
            
            // Create intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            
            // Observe elements
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        });
        
        // Add parallax scrolling effect for background images
        document.addEventListener('DOMContentLoaded', function() {
            const parallaxElements = document.querySelectorAll('.parallax');
            
            function updateParallax() {
                parallaxElements.forEach(element => {
                    const scrollPosition = window.pageYOffset;
                    const elementTop = element.getBoundingClientRect().top + scrollPosition;
                    const elementHeight = element.offsetHeight;
                    const viewportHeight = window.innerHeight;
                    
                    // Check if element is in viewport
                    if (elementTop < scrollPosition + viewportHeight && 
                        elementTop + elementHeight > scrollPosition) {
                        
                        const speed = element.dataset.parallaxSpeed || 0.5;
                        const yPosition = (scrollPosition - elementTop) * speed;
                        
                        element.style.backgroundPosition = `center ${yPosition}px`;
                    }
                });
            }
            
            // Update on scroll and resize
            window.addEventListener('scroll', updateParallax);
            window.addEventListener('resize', updateParallax);
            
            // Initial update
            updateParallax();
        });
        
        // Add dynamic content loading for "load more" buttons
        document.addEventListener('DOMContentLoaded', function() {
            const loadMoreButtons = document.querySelectorAll('.load-more-btn');
            
            loadMoreButtons.forEach(button => {
                const contentContainer = document.querySelector(button.dataset.target);
                const loadingSpinner = button.querySelector('.spinner') || document.createElement('span');
                
                if (!button.querySelector('.spinner')) {
                    loadingSpinner.classList.add('spinner');
                    loadingSpinner.style.display = 'none';
                    loadingSpinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    button.appendChild(loadingSpinner);
                }
                
                let page = 1;
                
                button.addEventListener('click', function() {
                    // Show loading spinner
                    button.querySelector('.btn-text').style.display = 'none';
                    loadingSpinner.style.display = 'inline-block';
                    
                    // Increment page
                    page++;
                    
                    // Simulate API call to get more content
                    setTimeout(() => {
                        // This would be replaced with a real API call in production
                        const moreContent = generateMoreContent(page);
                        
                        if (moreContent) {
                            // Add content to container
                            contentContainer.insertAdjacentHTML('beforeend', moreContent);
                            
                            // Hide spinner, show button text
                            button.querySelector('.btn-text').style.display = 'inline-block';
                            loadingSpinner.style.display = 'none';
                            
                            // If no more content available, disable button
                            if (page >= 3) { // Assuming only 3 pages of content
                                button.disabled = true;
                                button.classList.add('disabled');
                                button.querySelector('.btn-text').textContent = 'No More Content';
                            }
                        }
                    }, 1000); // Simulate network delay
                });
                
                // This function would be replaced with actual data from your API
                function generateMoreContent(page) {
                    // Sample content for demonstration
                    if (page <= 3) {
                        let html = '';
                        for (let i = 1; i <= 3; i++) {
                            html += `
                                <div class="destination-card" data-aos="fade-up">
                                    <div class="destination-image">
                                        <img src="images/destination-${page}-${i}.jpg" alt="Destination ${page}-${i}">
                                        <div class="destination-overlay">
                                            <span class="location-tag"><i class="fas fa-map-marker-alt"></i> Location ${page}-${i}</span>
                                        </div>
                                    </div>
                                    <div class="destination-content">
                                        <h3>Amazing Destination ${page}-${i}</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio vitae justo aliquam bibendum quis eu nunc.</p>
                                        <div class="destination-meta">
                                            <span><i class="far fa-clock"></i> 3 days</span>
                                            <span><i class="far fa-calendar-alt"></i> All year</span>
                                        </div>
                                        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            `;
                        }
                        return html;
                    }
                    return null;
                }
            });
        });
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Travel blog initialized successfully!');
        });
        

