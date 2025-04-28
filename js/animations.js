document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize preloader
    initPreloader();
    
    // Header scroll effect
    initHeaderScroll();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize floating elements for hero
    initFloatingElements();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize image lightbox
    initLightbox();
    
    // Initialize counters
    initCounters();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize lazy loading images
    initLazyLoading();
    
    // Add custom cursor (optional)
    initCustomCursor();
    
    console.log('All animations and interactions initialized successfully!');
});

// Preloader Function
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Header Scroll Function
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Function
function initMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburgerMenu || !navMenu) return;
    
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
}

// Parallax Effects Function
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Additional parallax elements
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const scrollPosition = window.scrollY;
                const elementTop = element.getBoundingClientRect().top + scrollPosition;
                const elementVisible = window.innerHeight;
                
                if (elementTop < scrollPosition + elementVisible) {
                    const speed = element.dataset.speed || 0.2;
                    element.style.transform = `translateY(${(scrollPosition - elementTop) * speed}px)`;
                }
            });
        });
    }
}

// Newsletter Form Function
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
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

// Floating Elements for Hero Section
function initFloatingElements() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create floating elements container if it doesn't exist
    if (!document.querySelector('.floating-elements')) {
        const floatingContainer = document.createElement('div');
        floatingContainer.classList.add('floating-elements');
        heroSection.appendChild(floatingContainer);
        
        // Add floating elements
        const floatIcons = [
            { icon: 'fa-plane', size: '40px', x: '15%', y: '20%', delay: '0s' },
            { icon: 'fa-map-marker-alt', size: '30px', x: '80%', y: '30%', delay: '0.5s' },
            { icon: 'fa-compass', size: '35px', x: '25%', y: '70%', delay: '1s' },
            { icon: 'fa-camera', size: '28px', x: '75%', y: '65%', delay: '1.5s' },
            { icon: 'fa-suitcase', size: '32px', x: '50%', y: '25%', delay: '2s' }
        ];
        
        floatIcons.forEach(item => {
            const floatElement = document.createElement('div');
            floatElement.classList.add('float-element');
            floatElement.innerHTML = `<i class="fas ${item.icon}"></i>`;
            floatElement.style.setProperty('--size', item.size);
            floatElement.style.setProperty('--x', item.x);
            floatElement.style.setProperty('--y', item.y);
            floatElement.style.setProperty('--delay', item.delay);
            floatingContainer.appendChild(floatElement);
        });
    }
}

// Back to Top Button Function
function initBackToTop() {
    // Create back-to-top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.classList.add('back-to-top');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
        
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
}

// Scroll Progress Indicator Function
function initScrollProgress() {
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
        
        // Update progress bar width on scroll
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    }
}

// Theme Toggle Function
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        // Create theme toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('theme-toggle');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(toggleBtn);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        
        // Toggle theme on click
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            const icon = toggleBtn.querySelector('i');
            
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Image Lightbox Function
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image, .destination-image img, .insta-photo img');
    
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
}

// Counter Animation Function
function initCounters() {
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
}

// Smooth Scrolling Function
function initSmoothScroll() {
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
}

// Lazy Loading Function
function initLazyLoading() {
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
}

// Custom Cursor Function
function initCustomCursor() {
    // Create custom cursor if it doesn't exist
    if (!document.querySelector('.custom-cursor')) {
        const cursorElement = document.createElement('div');
        cursorElement.classList.add('custom-cursor');
        document.body.appendChild(cursorElement);
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            cursorElement.style.left = e.clientX + 'px';
            cursorElement.style.top = e.clientY + 'px';
        });
        
        // Change cursor appearance when hovering over links
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursorElement.classList.add('hover');
            });
            
            link.addEventListener('mouseleave', function() {
                cursorElement.classList.remove('hover');
            });
        });
    }
}

// Call this function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animated image comparison sliders (before/after)
    initImageComparisons();
    
    // Add typed text effect for headlines
    initTypedText();
    
    // Add interactive travel timeline
    initTravelTimeline();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize photo masonry layout
    initMasonryLayout();
    
    // Add scroll-based animations
    initScrollAnimations();
});

// Image Comparison Sliders
function initImageComparisons() {
    const comparisons = document.querySelectorAll('.image-comparison');
    
    comparisons.forEach(comparison => {
        const beforeImg = comparison.querySelector('.before-image img');
        const afterImg = comparison.querySelector('.after-image img');
        const slider = comparison.querySelector('.comparison-slider');
        
        if (beforeImg && afterImg && slider) {
            // Set initial position and other setup code...
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
                }
            });
            
            // Touch events for mobile...
        }
    });
}

// Typed Text Effect
function initTypedText() {
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
}

// Interactive Travel Timeline
function initTravelTimeline() {
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
    }
}

// FAQ Accordion
function initFAQAccordion() {
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
}

// Masonry Layout
function initMasonryLayout() {
    const masonryGrids = document.querySelectorAll('.masonry-grid');
    
    if (masonryGrids.length > 0) {
        masonryGrids.forEach(grid => {
            const items = grid.querySelectorAll('.masonry-item');
            
            // Check if imagesLoaded is available
            if (typeof imagesLoaded === 'function') {
                const imgLoad = imagesLoaded(grid);
                
                imgLoad.on('progress', function() {
                    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
                    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'));
                    
                    items.forEach(item => {
                        const rowSpan = Math.ceil(
                            (item.querySelector('img').height + rowGap) / (rowHeight + rowGap)
                        );
                        item.style.gridRowEnd = 'span ' + rowSpan;
                    });
                });
            } else {
                // Fallback if imagesLoaded is not available
                window.addEventListener('load', function() {
                    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
                    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('grid-row-gap'));
                    
                    items.forEach(item => {
                        const img = item.querySelector('img');
                        if (img && img.complete) {
                            const rowSpan = Math.ceil(
                                (img.height + rowGap) / (rowHeight + rowGap)
                            );
                            item.style.gridRowEnd = 'span ' + rowSpan;
                        }
                    });
                });
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in');
    
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
}

// Dynamic content loading for "load more" buttons
function initLoadMoreButtons() {
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
            
            // Here you would make an AJAX call to load more content
            // For demo purposes, we'll use setTimeout
            setTimeout(() => {
                // This should be replaced with actual API call response
                const moreContent = generateDemoContent(page);
                
                if (moreContent) {
                    // Add content to container
                    contentContainer.insertAdjacentHTML('beforeend', moreContent);
                    
                    // Reinitialize AOS for new elements
                    AOS.refresh();
                    
                    // Hide spinner, show button text
                    button.querySelector('.btn-text').style.display = 'inline-block';
                    loadingSpinner.style.display = 'none';
                    
                    // If no more content available, disable button
                    if (page >= 3) { // Demo: only 3 pages
                        button.disabled = true;
                        button.classList.add('disabled');
                        button.querySelector('.btn-text').textContent = 'No More Content';
                    }
                }
            }, 1000); // Simulate network delay
        });
    });
    
    // Demo content generator - replace with actual API data
    function generateDemoContent(page) {
        if (page <= 3) {
            let html = '';
            for (let i = 1; i <= 3; i++) {
                html += `
                    <div class="destination-card" data-aos="fade-up">
                        <div class="destination-image">
                            <img src="images/demo-destination-${page}-${i}.jpg" alt="Destination">
                            <div class="destination-overlay">
                                <span class="location-tag">Location ${page}-${i}</span>
                            </div>
                        </div>
                        <div class="destination-content">
                            <h3>Exciting Destination ${page}-${i}</h3>
                            <p>A beautiful destination with amazing sights and experiences waiting to be discovered.</p>
                            <div class="destination-meta">
                                <span><i class="far fa-calendar"></i> 5 days ago</span>
                                <span><i class="far fa-clock"></i> 5 min read</span>
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
}

// Initialize everything on page load
window.addEventListener('load', function() {
    // Call any additional functions that need the full page to be loaded
    initLoadMoreButtons();
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

