// Kuripot Chronicles - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    updateCopyrightYear();
    
    // Setup animations and effects
    setupScrollReveal();
    // setupParallaxEffects(); // Commented out to avoid spacing issues
    setupImageFallbacks();
    setup3DEffects(); // Add 3D effects
    setupFinancialElements(); // Setup financial elements

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (if you add a mobile menu later)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Enhanced animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });
    
    document.querySelectorAll('section > div').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    // Parallax effect on scroll
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mouse move parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const parallaxItems = heroSection.querySelectorAll('.animate-fadeInUp, .logo-float');
            
            parallaxItems.forEach((item, index) => {
                const factor = (index + 1) * 0.2;
                item.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });
        
        // Reset transforms when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            const parallaxItems = heroSection.querySelectorAll('.animate-fadeInUp, .logo-float');
            parallaxItems.forEach(item => {
                item.style.transform = 'translate(0px, 0px)';
            });
        });
    }
    
    // Animated counter for statistics (if you add them later)
    const startCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            
            updateCount();
        });
    };
    
    // Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // Make sure fixed text elements stay fixed
    document.querySelectorAll('.fixed-text').forEach(element => {
        element.style.transform = 'none';
        element.style.transition = 'none';
    });

    // Remove any remaining section dividers
    document.querySelectorAll('.section-divider, .section-divider-green').forEach(divider => {
        divider.style.display = 'none';
    });

    // Fix section transitions
    document.querySelectorAll('section').forEach(section => {
        section.style.marginTop = '-1px';
    });
});

// Update copyright year in footer
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add dynamic bubbles to the background
    generateBubbles();
}

// Generate random bubbles in the background for decoration
function generateBubbles() {
    const sections = document.querySelectorAll('.animated-bg');
    
    sections.forEach(section => {
        for (let i = 0; i < 5; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Random size between 30 and 100
            const size = Math.floor(Math.random() * 70) + 30;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random position
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            
            // Random delay
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            // Random opacity
            bubble.style.opacity = (Math.random() * 0.15).toFixed(2);
            
            // Random background (one of the brand colors with low opacity)
            const colors = ['rgba(80, 138, 117, 0.1)', 'rgba(254, 191, 171, 0.1)', 'rgba(254, 216, 147, 0.1)'];
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            section.appendChild(bubble);
        }
    });
}

// Setup scroll reveal animations
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element, .reveal-slide-up, .reveal-fade, .reveal-scale, .feature-sequence, .img-reveal, .animated-underline');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a sequence container, reveal its children
                if (entry.target.classList.contains('feature-sequence')) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, 300);
                }
                
                // Once revealed, no need to observe anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Setup subtle parallax effects on scroll - DISABLED
function setupParallaxEffects() {
    // This function is now disabled to prevent spacing issues
    return;
    
    // Original code commented out
    /*
    const heroSection = document.querySelector('.kuripot-gradient');
    const logo = document.querySelector('.logo-container');
    const heroContent = document.querySelector('.hero-title');
    
    if (heroSection && logo && heroContent) {
        // Very subtle movement on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < window.innerHeight) {
                // Move logo and content in opposite directions slightly
                const logoMove = scrollPosition * 0.05;
                const contentMove = scrollPosition * -0.03;
                
                logo.style.transform = `translateY(${logoMove}px)`;
                heroContent.style.transform = `translateY(${contentMove}px)`;
            }
        });
        
        // Mouse move effect in hero section
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            if (logo) {
                logo.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
            
            if (heroContent) {
                heroContent.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`;
            }
        });
        
        // Reset transforms on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            logo.style.transform = 'translate(0, 0)';
            heroContent.style.transform = 'translate(0, 0)';
        });
    }
    */
}

// Handle image fallbacks if the logo doesn't load
function setupImageFallbacks() {
    const logoImages = document.querySelectorAll('img[src="Logo.png"]');
    
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            // Hide the image that failed to load
            this.style.display = 'none';
            
            // Show the fallback for main logo
            if (this.closest('.logo-container')) {
                const fallback = this.closest('.logo-container').querySelector('.img-fallback');
                if (fallback) {
                    fallback.classList.remove('opacity-0');
                }
            }
            
            // For footer logo
            if (this.closest('.w-12')) {
                const logoContainer = this.closest('.w-12');
                logoContainer.style.backgroundColor = '#FEBFAB';
                
                // Create and add piggy icon
                const icon = document.createElement('i');
                icon.className = 'fas fa-piggy-bank text-primary';
                logoContainer.appendChild(icon);
            }
        });
    });
}

// Add 3D tilt effects to elements
function setup3DEffects() {
    // 3D tilt effect for feature cards
    const tiltCards = document.querySelectorAll('.feature-item, .hover-lift');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            // The division values control the intensity of the tilt
            const rotateY = -((x / rect.width - 0.5) * 10); // -5 to 5 degrees
            const rotateX = (y / rect.height - 0.5) * 10; // -5 to 5 degrees
            
            // Apply the rotation transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Add a subtle shadow effect that moves with the tilt
            card.style.boxShadow = `${-rotateY/2}px ${-rotateX/2}px 20px rgba(0, 0, 0, 0.2)`;
        });
        
        // Reset when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 3D effect for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon-circle');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate the distance from center (0 to 1)
            const distX = x / rect.width - 0.5;
            const distY = y / rect.height - 0.5;
            
            // Apply rotation and floating effect
            icon.style.transform = `perspective(800px) rotateX(${distY * 20}deg) rotateY(${-distX * 20}deg) translateZ(10px)`;
            
            // Make the icon within the circle also move slightly
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = `translateZ(20px) translateX(${distX * 5}px) translateY(${distY * 5}px)`;
            }
        });
        
        // Reset when mouse leaves
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
            
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'translateZ(0)';
            }
        });
    });
    
    // 3D mouse tracking for hero section
    const heroSection = document.querySelector('.kuripot-gradient');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            // Subtle background parallax
            heroSection.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
            
            // Apply 3D depth effect to hero content
            const heroContent = heroSection.querySelector('.reveal-slide-up');
            if (heroContent) {
                heroContent.style.transform = `translateX(${mouseX * -20}px) translateY(${mouseY * -20}px) translateZ(0)`;
            }
            
            // Apply 3D depth effect to logo
            const logo = heroSection.querySelector('.logo-container');
            if (logo) {
                logo.style.transform = `rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 20}deg) translateZ(50px)`;
            }
            
            // Make financial elements follow mouse with parallax
            const financialElements = heroSection.querySelectorAll('.financial-element');
            financialElements.forEach((element, index) => {
                const depth = 20 + (index % 3) * 15; // Different depths
                element.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px) ${element.style.transform.split(')')[1] || ''}`;
            });
        });
        
        // Reset when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.backgroundPosition = '50% 50%';
            
            const heroContent = heroSection.querySelector('.reveal-slide-up');
            if (heroContent) {
                heroContent.style.transform = 'translateX(0) translateY(0) translateZ(0)';
            }
            
            const logo = heroSection.querySelector('.logo-container');
            if (logo) {
                logo.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
            }
            
            // Reset financial elements
            const financialElements = heroSection.querySelectorAll('.financial-element');
            financialElements.forEach(element => {
                element.style.transform = element.style.transform.split(')')[1] || '';
            });
        });
    }
    
    // Add floating effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Create a glowing effect behind the button
        const glow = document.createElement('div');
        glow.classList.add('cta-glow');
        ctaButton.parentNode.insertBefore(glow, ctaButton);
        
        // Position the glow behind the button
        setTimeout(() => {
            const buttonRect = ctaButton.getBoundingClientRect();
            glow.style.width = `${buttonRect.width + 20}px`;
            glow.style.height = `${buttonRect.height + 20}px`;
            glow.style.left = `-10px`;
            glow.style.top = `-10px`;
        }, 100);
    }
    
    // Add an animated background pattern
    addAnimatedBackground();
}

// Add animated background elements
function addAnimatedBackground() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Create a container for the 3D elements
        const container = document.createElement('div');
        container.classList.add('bg-3d-container');
        section.appendChild(container);
        
        // Add some floating elements
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.classList.add('bg-3d-element');
            
            // Random size
            const size = Math.floor(Math.random() * 50) + 20;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random position
            element.style.left = `${Math.random() * 90}%`;
            element.style.top = `${Math.random() * 80}%`;
            
            // Random rotation
            element.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) translateZ(${Math.random() * 100}px)`;
            
            // Random animation delay
            element.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(element);
        }
    });
}

// Create financial elements in specific sections
function createSectionFinancialElements(containerId, count, types) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const element = document.createElement('div');
        element.className = `financial-element ${type}`;
        
        // Random position within container but avoid the center area
        // This helps prevent elements from blocking important text
        let leftPos, topPos;
        
        // If it's the about section, avoid the center area where titles are
        if (containerId === 'about-finance-elements') {
            // Choose either left or right side
            if (Math.random() > 0.5) {
                leftPos = Math.random() * 30; // Left 30%
            } else {
                leftPos = 70 + Math.random() * 30; // Right 30%
            }
            
            // Avoid middle vertical area where titles are
            if (Math.random() > 0.5) {
                topPos = Math.random() * 20; // Top 20%
            } else {
                topPos = 60 + Math.random() * 40; // Bottom 40%
            }
        } else {
            // For other sections, still avoid central areas but less strictly
            if (Math.random() > 0.7) { // 30% chance to be in center
                leftPos = 30 + Math.random() * 40; // Center 40%
                topPos = 30 + Math.random() * 40; // Center 40%
            } else {
                // Otherwise position on the edges
                leftPos = Math.random() > 0.5 ? Math.random() * 25 : 75 + Math.random() * 25;
                topPos = Math.random() > 0.5 ? Math.random() * 25 : 75 + Math.random() * 25;
            }
        }
        
        element.style.left = `${leftPos}%`;
        element.style.top = `${topPos}%`;
        
        // Reduce size for less intrusion
        const scale = 0.3 + Math.random() * 0.4; // Smaller scale range
        element.style.transform = `scale(${scale})`;
        
        // Random animation delay
        element.style.animationDelay = `${Math.random() * 3}s`;
        
        // For bills, add denomination
        if (type === 'bill') {
            const denominations = [100, 200, 500, 1000];
            element.textContent = denominations[Math.floor(Math.random() * denominations.length)];
        }
        
        container.appendChild(element);
    }
}

// Setup coin ring around the logo
function setupCoinRing() {
    const coinRing = document.querySelector('.coin-ring-container');
    if (!coinRing) return;
    
    const coins = coinRing.querySelectorAll('.coin');
    const centerX = 120; // Center X position
    const centerY = 120; // Center Y position
    const radius = 220; // Increased radius to move coins further away from logo
    
    // Position coins in a circle around the logo
    coins.forEach((coin, index) => {
        const angle = (index / coins.length) * Math.PI * 2; // Distribute evenly in a circle
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        coin.style.position = 'absolute';
        coin.style.left = `${x}px`;
        coin.style.top = `${y}px`;
        
        // Add a slight rotation based on position
        coin.style.transform = `rotateY(${index * 45}deg) rotateX(${index * 20}deg) scale(0.6)`; // Smaller scale
        
        // Different animation delays
        coin.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Position the bill
    const bill = coinRing.querySelector('.bill');
    if (bill) {
        bill.style.position = 'absolute';
        bill.style.left = `${centerX + radius * 0.7}px`;
        bill.style.top = `${centerY - radius * 0.7}px`;
        bill.style.transform = 'rotate(15deg) scale(0.6)'; // Smaller scale
    }
}

// Setup falling coins animation in the CTA section
function setupCoinRain() {
    const container = document.getElementById('coin-rain-container');
    if (!container) return;
    
    // Create a number of falling coins, but fewer than before
    for (let i = 0; i < 10; i++) { // Reduced from 15 to 10
        const coin = document.createElement('div');
        coin.className = 'financial-element coin';
        
        // Random horizontal position but avoid middle
        let leftPos;
        if (Math.random() > 0.5) {
            leftPos = Math.random() * 30; // Left 30%
        } else {
            leftPos = 70 + Math.random() * 30; // Right 30%
        }
        coin.style.left = `${leftPos}%`;
        
        // Start position above the viewport
        coin.style.top = `${-50 - Math.random() * 100}px`;
        
        // Smaller size
        const size = 0.2 + Math.random() * 0.4;
        coin.style.transform = `scale(${size})`;
        
        // Set up the falling animation
        coin.style.animation = `coinSpin 8s infinite linear, coinFall ${5 + Math.random() * 5}s infinite linear`;
        coin.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add custom animation for falling
        const style = document.createElement('style');
        const fallDistance = 800 + Math.random() * 400;
        style.textContent = `
            @keyframes coinFall {
                0% {
                    transform: translateY(0) scale(${size});
                }
                100% {
                    transform: translateY(${fallDistance}px) scale(${size});
                }
            }
        `;
        document.head.appendChild(style);
        
        container.appendChild(coin);
    }
}

// Function to update screenshot with actual app images
function setupAppScreenshots() {
    // Find the screenshot containers
    const screenshotContainers = document.querySelectorAll('.screenshot-container');
    if (screenshotContainers.length < 3) return;
    
    // Set up images and their containers
    const imageConfig = [
        { 
            file: 'Expenses.jpg', // Using the Expenses screenshot for the first container
            index: 0,
            alt: 'Expense Analytics'
        },
        { 
            file: 'Budget.jpg', // Using the Budget screenshot for the second container
            index: 1,
            alt: 'Budget Planner'
        },
        { 
            file: 'Dashboard.jpg', // Using the Dashboard for the third container
            index: 2,
            alt: 'Dashboard View'
        }
    ];
    
    // Function to load image into container
    function loadImage(config) {
        const img = new Image();
        img.onload = function() {
            const container = screenshotContainers[config.index];
            container.innerHTML = '';
            container.style.overflow = 'hidden';
            
            const imgElement = document.createElement('img');
            imgElement.src = config.file;
            imgElement.alt = config.alt;
            imgElement.className = 'w-full h-full object-cover rounded-lg';
            
            container.appendChild(imgElement);
        };
        img.onerror = function() {
            console.log(`${config.file} not found, keeping placeholder for container ${config.index + 1}`);
        };
        img.src = config.file;
    }
    
    // Load each image
    imageConfig.forEach(config => loadImage(config));
}

// Setup financial elements
function setupFinancialElements() {
    // Setup coin ring around logo
    setupCoinRing();
    
    // Setup coin rain in CTA section
    setupCoinRain();
    
    // Create and animate financial elements in specific sections
    // Reduced counts to have fewer elements on the page
    createSectionFinancialElements('hero-finance-elements', 3, ['coin', 'bill', 'piggy']);
    createSectionFinancialElements('about-finance-elements', 4, ['coin', 'bill', 'calculator']);
    createSectionFinancialElements('preview-finance-elements', 3, ['coin', 'piggy', 'savings-jar']);
    createSectionFinancialElements('footer-finance-elements', 5, ['coin', 'bill']);
    
    // Animate all financial elements
    animateAllFinancialElements();
    
    // Setup app screenshots
    setupAppScreenshots();
}

// Animate all financial elements with parallax and mouse effects
function animateAllFinancialElements() {
    const elements = document.querySelectorAll('.financial-element');
    
    // Add scroll parallax
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        elements.forEach((element, index) => {
            if (element.closest('.coin-rain-container')) return; // Skip coin rain elements
            
            // Different parallax speeds for different elements
            const speed = 0.03 + (index % 3) * 0.01;
            const yPos = -scrollY * speed;
            
            // Get current transform and add parallax
            const currentTransform = element.style.transform || '';
            const baseTransform = currentTransform.split('translateY')[0];
            
            element.style.transform = `${baseTransform} translateY(${yPos}px)`;
        });
    });
    
    // 3D hover effect on financial elements
    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transform = `${element.style.transform} scale(1.2) rotateY(180deg)`;
            element.style.zIndex = '10';
            element.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseout', () => {
            // Reset to base transform
            const baseTransform = element.style.transform.split('scale')[0];
            element.style.transform = baseTransform;
            element.style.zIndex = '2';
        });
    });
}

// Initialize financial elements on load
window.addEventListener('load', () => {
    createFinancialElements();
    animateFinancialElements();
}); 