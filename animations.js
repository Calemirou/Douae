// animations.js - Basic animation functions for the romantic webpage

// Create butterflies that fly around the screen
function createButterflies() {
    const BUTTERFLY_COUNT = 6;
    
    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
        createButterfly();
    }
    
    // Create a butterfly with random color and path
    function createButterfly() {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        
        // Create wings
        const leftWing = document.createElement('div');
        leftWing.className = 'butterfly-wing left';
        
        const rightWing = document.createElement('div');
        rightWing.className = 'butterfly-wing right';
        
        // Apply random colors to wings
        const hue = Math.floor(Math.random() * 60) + 180; // Blue to purple range
        leftWing.style.background = `hsla(${hue}, 100%, 80%, 0.8)`;
        rightWing.style.background = `hsla(${hue}, 100%, 80%, 0.8)`;
        leftWing.style.boxShadow = `0 0 5px hsla(${hue}, 100%, 80%, 0.8)`;
        rightWing.style.boxShadow = `0 0 5px hsla(${hue}, 100%, 80%, 0.8)`;
        
        // Append wings to butterfly
        butterfly.appendChild(leftWing);
        butterfly.appendChild(rightWing);
        
        // Position butterfly at random bottom location
        butterfly.style.left = `${Math.random() * 90 + 5}%`;
        butterfly.style.bottom = `${Math.random() * 20}%`;
        
        // Add to document
        document.body.appendChild(butterfly);
        
        // Animate the butterfly
        animateButterfly(butterfly);
    }
    
    // Animate a butterfly along a random path
    function animateButterfly(butterfly) {
        const duration = Math.random() * 15000 + 20000; // 20-35 seconds
        const startTime = Date.now();
        const startLeft = parseFloat(butterfly.style.left);
        const startBottom = parseFloat(butterfly.style.bottom);
        
        // Generate random control points for a curved path
        const control1X = startLeft + (Math.random() - 0.5) * 30;
        const control1Y = startBottom + Math.random() * 40 + 20;
        const control2X = startLeft + (Math.random() - 0.5) * 50;
        const control2Y = startBottom + Math.random() * 60 + 40;
        const endX = Math.random() * 90 + 5;
        const endY = 100 + Math.random() * 20; // Above the top of the screen
        
        function step() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Cubic bezier formula to calculate position
            const t = progress;
            const u = 1 - t;
            const tt = t * t;
            const uu = u * u;
            const uuu = uu * u;
            const ttt = tt * t;
            
            const x = uuu * startLeft + 3 * uu * t * control1X + 3 * u * tt * control2X + ttt * endX;
            const y = uuu * startBottom + 3 * uu * t * control1Y + 3 * u * tt * control2Y + ttt * endY;
            
            butterfly.style.left = `${x}%`;
            butterfly.style.bottom = `${y}%`;
            
            // Add slight rotation for realism
            const rotation = Math.sin(elapsed / 500) * 5;
            butterfly.style.transform = `rotate(${rotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Butterfly has completed its path, remove it and create a new one
                butterfly.remove();
                createButterfly();
            }
        }
        
        requestAnimationFrame(step);
    }
}

// Create hearts that float up from the heart container
function createFloatingHearts() {
    const container = document.querySelector('.container');
    
    // Create a floating heart every few seconds
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        heart.style.opacity = '0';
        heart.style.left = `${Math.random() * 80 + 10}%`;
        heart.style.bottom = '0';
        
        container.appendChild(heart);
        
        // Animate the heart
        let bottom = 0;
        let opacity = 0;
        const maxBottom = 300;
        const animationDuration = Math.random() * 3000 + 5000; // 5-8 seconds
        const startTime = Date.now();
        
        function animateHeart() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            bottom = progress * maxBottom;
            
            // Fade in and out
            if (progress < 0.2) {
                opacity = progress / 0.2; // Fade in during first 20%
            } else if (progress > 0.8) {
                opacity = (1 - progress) / 0.2; // Fade out during last 20%
            } else {
                opacity = 1;
            }
            
            // Move in a slight curve
            const horizontalOffset = Math.sin(progress * 6) * 20;
            
            heart.style.bottom = `${bottom}px`;
            heart.style.marginLeft = `${horizontalOffset}px`;
            heart.style.opacity = opacity.toString();
            heart.style.transform = `rotate(${Math.sin(progress * 10) * 20}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animateHeart);
            } else {
                heart.remove();
            }
        }
        
        requestAnimationFrame(animateHeart);
    }, 800);
}

// Create a pulsing glow effect around the main heart
function createHeartGlow() {
    const heart = document.querySelector('.heart');
    if (!heart) return;
    
    const glowLayer = document.createElement('div');
    glowLayer.style.position = 'absolute';
    glowLayer.style.width = '100%';
    glowLayer.style.height = '100%';
    glowLayer.style.borderRadius = '50%';
    glowLayer.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)';
    glowLayer.style.opacity = '0';
    glowLayer.style.transition = 'opacity 1s ease-in-out';
    
    heart.appendChild(glowLayer);
    
    // Pulse glow effect
    let increasing = true;
    let opacity = 0;
    
    function pulseGlow() {
        if (increasing) {
            opacity += 0.01;
            if (opacity >= 0.8) increasing = false;
        } else {
            opacity -= 0.01;
            if (opacity <= 0) increasing = true;
        }
        
        glowLayer.style.opacity = opacity.toString();
        requestAnimationFrame(pulseGlow);
    }
    
    requestAnimationFrame(pulseGlow);
}

// Create falling petals that drift down the screen
function createFallingPetals() {
    const colors = [
        '#ffb7c5', // light pink
        '#ff80ab', // pink
        '#ff4081', // deep pink
        '#ff80ab', // pink
        '#ffffff'  // white
    ];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'flower';
        petal.style.width = `${Math.random() * 10 + 5}px`;
        petal.style.height = `${Math.random() * 10 + 5}px`;
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.borderRadius = '60% 40%';
        petal.style.opacity = '0.8';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = '-10px';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(petal);
        
        // Create falling animation
        const duration = Math.random() * 8000 + 7000; // 7-15 seconds
        const startTime = Date.now();
        
        function fall() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Vertical position
            const top = progress * (window.innerHeight + 20);
            
            // Horizontal oscillation
            const amplitude = Math.random() * 200 + 50;
            const frequency = Math.random() * 4 + 1;
            const left = parseFloat(petal.style.left) + Math.sin(progress * Math.PI * frequency) * (amplitude / window.innerWidth * 100) / 40;
            
            // Rotation
            const rotation = progress * (Math.random() * 720 - 360);
            
            petal.style.top = `${top}px`;
            petal.style.left = `${left}%`;
            petal.style.transform = `rotate(${rotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(fall);
            } else {
                petal.remove();
                createPetal();
            }
        }
        
        requestAnimationFrame(fall);
    }
    
    // Create initial set of petals
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createPetal();
        }, Math.random() * 5000);
    }
}

// Create twinkling star effect in background
function enhanceStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    // Add shooting stars occasionally
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to create a shooting star
            const shootingStar = document.createElement('div');
            shootingStar.className = 'star';
            shootingStar.style.position = 'absolute';
            shootingStar.style.width = '2px';
            shootingStar.style.height = '2px';
            shootingStar.style.backgroundColor = '#fff';
            shootingStar.style.borderRadius = '50%';
            shootingStar.style.top = `${Math.random() * 30}%`;
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.opacity = '0';
            shootingStar.style.zIndex = '1';
            
            starsContainer.appendChild(shootingStar);
            
            // Create tail
            const tail = document.createElement('div');
            tail.style.position = 'absolute';
            tail.style.top = '0';
            tail.style.right = '0';
            tail.style.width = '20px';
            tail.style.height = '2px';
            tail.style.background = 'linear-gradient(to left, rgba(255,255,255,0), #fff)';
            tail.style.transform = 'translateX(100%)';
            
            shootingStar.appendChild(tail);
            
            // Animate shooting star
            const duration = Math.random() * 1000 + 1000;
            const angle = Math.random() * 20 + 20; // 20-40 degrees
            const distance = Math.min(window.innerWidth, window.innerHeight) * 0.7;
            const startTime = Date.now();
            
            function animateShootingStar() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const x = progress * distance * Math.cos(angle * Math.PI / 180);
                const y = progress * distance * Math.sin(angle * Math.PI / 180);
                
                shootingStar.style.transform = `translate(${x}px, ${y}px)`;
                
                // Fade in and out
                let opacity;
                if (progress < 0.2) {
                    opacity = progress / 0.2;
                } else if (progress > 0.8) {
                    opacity = (1 - progress) / 0.2;
                } else {
                    opacity = 1;
                }
                
                shootingStar.style.opacity = opacity.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(animateShootingStar);
                } else {
                    shootingStar.remove();
                }
            }
            
            requestAnimationFrame(animateShootingStar);
        }
    }, 3000);
}

// Make title text shimmer with a rainbow effect
function createTitleShimmer() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    // Split text into individual characters
    const text = title.textContent;
    title.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = text[i];
        charSpan.style.display = 'inline-block';
        charSpan.style.transition = 'color 0.5s ease';
        charSpan.style.animationDelay = `${i * 0.1}s`;
        title.appendChild(charSpan);
    }
    
    // Animate color change
    function animateColors() {
        const spans = title.querySelectorAll('span');
        const time = Date.now() / 1000;
        
        spans.forEach((span, index) => {
            // Create a wave effect with different offsets for each character
            const hue = (time * 50 + index * 10) % 360;
            span.style.color = `hsl(${hue}, 80%, 70%)`;
            
            // Add slight vertical movement
            const offset = Math.sin(time * 2 + index * 0.2) * 2;
            span.style.transform = `translateY(${offset}px)`;
        });
        
        requestAnimationFrame(animateColors);
    }
    
    requestAnimationFrame(animateColors);
}

// Background color gradient animation
function animateBackground() {
    const body = document.body;
    
    // Create a subtle gradient background that shifts
    function updateBackground() {
        const time = Date.now() / 10000; // Slow cycle
        
        // Calculate gradient colors
        const hue1 = (time * 30) % 360;
        const hue2 = (hue1 + 40) % 360;
        
        const color1 = `hsla(${hue1}, 50%, 10%, 1)`;
        const color2 = `hsla(${hue2}, 50%, 5%, 1)`;
        
        // Update gradient direction based on time
        const angle = (time * 30) % 360;
        
        body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        
        requestAnimationFrame(updateBackground);
    }
    
    requestAnimationFrame(updateBackground);
}

// Initialize all basic animations
document.addEventListener('DOMContentLoaded', function() {
    // Start all animation functions
    createButterflies();
    createFloatingHearts();
    createHeartGlow();
    createFallingPetals();
    enhanceStars();
    createTitleShimmer();
    animateBackground();
    
    // Create interactive heart pulse effect on page click
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart')) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'heart-trail';
        ripple.innerHTML = '❤️';
        ripple.style.position = 'absolute';
        ripple.style.left = (e.clientX - 10) + 'px';
        ripple.style.top = (e.clientY - 10) + 'px';
        ripple.style.pointerEvents = 'none';
        
        document.body.appendChild(ripple);
        
        // Expand and fade out
        let scale = 0.5;
        let opacity = 1;
        
        function animate() {
            scale += 0.03;
            opacity -= 0.02;
            
            ripple.style.transform = `scale(${scale})`;
            ripple.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                ripple.remove();
            }
        }
        
        requestAnimationFrame(animate);
    });
});
