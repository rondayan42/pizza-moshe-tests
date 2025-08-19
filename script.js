// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Menu category switching
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons and categories
            categoryBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button and target category
            this.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
            
            // Add glitch effect to the active category
            const activeCategory = document.getElementById(targetCategory);
            activeCategory.style.animation = 'glitch 0.5s ease';
            setTimeout(() => {
                activeCategory.style.animation = 'none';
            }, 500);
        });
    });

    // Form submission handling
    const orderForm = document.querySelector('.order-form form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const orderData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                deliveryType: formData.get('delivery-type'),
                payment: formData.get('payment'),
                pizzaType: formData.get('pizza-type'),
                notes: formData.get('notes')
            };
            
            // Show success message
            showOrderConfirmation(orderData);
            
            // Reset form
            this.reset();
        });
    }

    // Add scroll effects
    addScrollEffects();
    
    // Add typing effect to hero tagline
    addTypingEffect();
    
    // Add parallax effect to hero section
    addParallaxEffect();
    
    // Add delivery zone hover effects
    addDeliveryZoneEffects();
    
    // Add menu item animations
    addMenuItemAnimations();
});

// Show order confirmation
function showOrderConfirmation(orderData) {
    // Create confirmation modal
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Order Confirmed!</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>Your order for <strong>${orderData.pizzaType}</strong> has been received!</p>
                <p>We'll contact you at <strong>${orderData.phone}</strong> when it's ready.</p>
                <div class="order-details">
                    <p><strong>Name:</strong> ${orderData.name}</p>
                    <p><strong>Address:</strong> ${orderData.address}</p>
                    <p><strong>Delivery Type:</strong> ${orderData.deliveryType}</p>
                    <p><strong>Payment Method:</strong> ${orderData.payment}</p>
                    ${orderData.notes ? `<p><strong>Special Instructions:</strong> ${orderData.notes}</p>` : ''}
                </div>
                <p class="rebellion-message">Join the resistance! Your pizza will be ready soon.</p>
                <div class="delivery-estimate">
                    <p><strong>Estimated Delivery:</strong></p>
                    <p>${getDeliveryEstimate(orderData.deliveryType)}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .order-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: var(--cyber-gray);
            border: 2px solid var(--neon-green);
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            position: relative;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--neon-green);
            padding-bottom: 15px;
        }
        
        .modal-header h3 {
            color: var(--neon-green);
            font-family: 'Orbitron', monospace;
            margin: 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: var(--neon-pink);
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            color: var(--neon-yellow);
            transform: scale(1.1);
        }
        
        .modal-body p {
            color: var(--text-gray);
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .order-details {
            background: var(--dark-bg);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid var(--neon-blue);
        }
        
        .rebellion-message {
            color: var(--neon-yellow) !important;
            font-weight: 600;
            text-align: center;
            font-size: 1.1rem;
            margin-top: 20px;
        }
        
        .delivery-estimate {
            background: var(--dark-bg);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            border-left: 4px solid var(--neon-pink);
            text-align: center;
        }
        
        .delivery-estimate p {
            margin-bottom: 5px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 8000);
}

// Get delivery estimate based on delivery type
function getDeliveryEstimate(deliveryType) {
    const estimates = {
        'standard': '30-45 minutes',
        'express': '15-25 minutes',
        'eco': '40-55 minutes'
    };
    return estimates[deliveryType] || '30-45 minutes';
}

// Add scroll effects
function addScrollEffects() {
    const sections = document.querySelectorAll('section');
    
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add typing effect to hero tagline
function addTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--neon-yellow)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add delivery zone hover effects
function addDeliveryZoneEffects() {
    const zones = document.querySelectorAll('.zone');
    const radiusCircles = document.querySelectorAll('.radius-circle');
    
    zones.forEach((zone, index) => {
        zone.addEventListener('mouseenter', function() {
            // Highlight corresponding radius circle
            if (radiusCircles[index]) {
                radiusCircles[index].style.opacity = '1';
                radiusCircles[index].style.animation = 'pulse 1s infinite';
            }
        });
        
        zone.addEventListener('mouseleave', function() {
            // Reset radius circle
            if (radiusCircles[index]) {
                radiusCircles[index].style.opacity = '0.3';
                radiusCircles[index].style.animation = 'pulse 2s infinite';
            }
        });
    });
}

// Add menu item animations
function addMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const title = item.querySelector('h3');
        const originalTitleText = title ? title.textContent : '';
        
        item.addEventListener('mouseenter', function() {
            // Add rugged glitch effect
            this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.6)';
            
            // Random glitch timing for more rugged feel
            const glitchDuration = 0.2 + Math.random() * 0.3;
            this.style.animationDuration = `${glitchDuration}s`;
            
            // Add data corruption effect
            if (title && originalTitleText) {
                const glitchText = originalTitleText.split('').map(char => 
                    Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 94) : char
                ).join('');
                
                title.textContent = glitchText;
            }
            
            // Add scan line effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, var(--neon-orange), transparent);
                animation: scanLine 0.6s ease;
                pointer-events: none;
                z-index: 2;
            `;
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.remove();
                }
            }, 600);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.2)';
            this.style.animation = 'none';
            
            // Always restore original title text
            if (title && originalTitleText) {
                title.textContent = originalTitleText;
            }
        });
    });
}

// Add neon flicker effect to buttons
function addNeonFlicker() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'neonFlicker 0.5s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Add neon flicker animation to CSS
const neonFlickerStyles = document.createElement('style');
neonFlickerStyles.textContent = `
    @keyframes neonFlicker {
        0%, 100% { 
            box-shadow: 0 0 20px currentColor;
        }
        50% { 
            box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
        }
    }
`;
document.head.appendChild(neonFlickerStyles);

// Initialize neon flicker effect
document.addEventListener('DOMContentLoaded', addNeonFlicker);

// Add random glitch effect to logo
function addRandomGlitch() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            logo.style.animation = 'glitch 0.2s ease';
            setTimeout(() => {
                logo.style.animation = 'none';
            }, 200);
        }
    }, 3000);
}

// Initialize random glitch effect
document.addEventListener('DOMContentLoaded', addRandomGlitch);

// Add cyberpunk sound effects (optional)
function addSoundEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Initialize sound effects (commented out by default to avoid annoyance)
// document.addEventListener('DOMContentLoaded', addSoundEffects);

// Add floating particles effect
function addFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--neon-blue);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 6}s;
    `;
    
    container.appendChild(particle);
}

// Add floating animation to CSS
const floatingStyles = document.createElement('style');
floatingStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .floating-particle {
        box-shadow: 0 0 10px var(--neon-blue);
    }
`;
document.head.appendChild(floatingStyles);

// Initialize floating particles
document.addEventListener('DOMContentLoaded', addFloatingParticles);

// Add scroll-triggered animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.menu-item, .contact-item, .stat, .delivery-option, .zone');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set final state directly so later hover animations don't override it
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'none';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Add slideInUp animation to CSS
const slideInStyles = document.createElement('style');
slideInStyles.textContent = `
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(slideInStyles);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add delivery option hover effects
function addDeliveryOptionEffects() {
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            // Add cyberpunk scan effect
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
                animation: scanLine 0.8s ease forwards;
            `;
            
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.remove();
                }
            }, 800);
        });
    });
}

// Add scan line animation to CSS
const scanLineStyles = document.createElement('style');
scanLineStyles.textContent = `
    @keyframes scanLine {
        to {
            left: 100%;
        }
    }
`;
document.head.appendChild(scanLineStyles);

// Initialize delivery option effects
document.addEventListener('DOMContentLoaded', addDeliveryOptionEffects);

// Add menu badge animations
function addMenuBadgeAnimations() {
    const menuBadges = document.querySelectorAll('.menu-badge');
    
    menuBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s infinite';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Initialize menu badge animations
document.addEventListener('DOMContentLoaded', addMenuBadgeAnimations);

// Add chef image hover effects
function addChefImageEffects() {
    const chefImage = document.querySelector('.chef-image');
    const chefContainer = document.querySelector('.chef-image-container');
    
    if (chefImage && chefContainer) {
        chefContainer.addEventListener('mouseenter', function() {
            // Add cyberpunk scan effect
            this.style.boxShadow = '0 0 40px rgba(255, 107, 53, 0.8)';
            
            // Add glitch effect to image
            chefImage.style.filter = 'hue-rotate(90deg) saturate(1.2)';
            chefImage.style.transition = 'filter 0.3s ease';
        });
        
        chefContainer.addEventListener('mouseleave', function() {
            // Reset effects
            this.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.6)';
            chefImage.style.filter = 'none';
        });
    }
}

// Initialize chef image effects
document.addEventListener('DOMContentLoaded', addChefImageEffects);

// Add rugged hover effects to all interactive elements
function addRuggedHoverEffects() {
    // Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Add random glitch timing
            const glitchDelay = Math.random() * 0.2;
            setTimeout(() => {
                this.style.filter = 'hue-rotate(45deg) saturate(1.3)';
            }, glitchDelay * 1000);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        let glitchInterval;
        const originalText = link.textContent;
        
        link.addEventListener('mouseenter', function() {
            // Add text glitch effect
            let glitchCount = 0;
            glitchInterval = setInterval(() => {
                if (glitchCount < 3) {
                    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                    const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    this.textContent = originalText.replace(/./g, randomChar);
                    glitchCount++;
                } else {
                    this.textContent = originalText;
                    clearInterval(glitchInterval);
                }
            }, 100);
        });
        
        link.addEventListener('mouseleave', function() {
            // Always restore original text and clear interval
            this.textContent = originalText;
            if (glitchInterval) {
                clearInterval(glitchInterval);
            }
        });
    });
    
    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Add scan line effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
                animation: scanLine 0.5s ease;
                pointer-events: none;
                z-index: 1;
            `;
            this.style.position = 'relative';
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.remove();
                }
            }, 500);
        });
    });
    
    // Delivery options
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    deliveryOptions.forEach(option => {
        const title = option.querySelector('h3');
        if (title) {
            const originalTitleText = title.textContent;
            
            option.addEventListener('mouseenter', function() {
                // Add data corruption effect to title
                const glitchText = originalTitleText.split('').map(char => 
                    Math.random() > 0.8 ? String.fromCharCode(33 + Math.random() * 94) : char
                ).join('');
                
                title.textContent = glitchText;
            });
            
            option.addEventListener('mouseleave', function() {
                // Always restore original title text
                title.textContent = originalTitleText;
            });
        }
    });
}

// Initialize rugged hover effects
document.addEventListener('DOMContentLoaded', addRuggedHoverEffects);
