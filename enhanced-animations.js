// enhanced-animations.js - More complex animations

// Characters moving around each other in a circle
ffunction moveCharactersAround() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight - 150 * scaleFactor; // Apply scale factor
    const radius = 150 * scaleFactor; // Apply scale factor
    let angle = 0;
    let duration = 8; // seconds
    let frames = duration * 60; // 60fps
    let frame = 0;
    
    // Add transition style for smooth movement
    amine.style.transition = 'none';
    douae.style.transition = 'none';
    
    // Add animation class
    amine.classList.add('dancing');
    douae.classList.add('dancing');
    
    // Animation interval
    const interval = setInterval(() => {
        // Calculate new positions
        const amineAngle = angle + Math.PI;
        const douaeAngle = angle;
        
        // Calculate positions
        const amineX = centerX + Math.cos(amineAngle) * radius;
        const amineY = centerY + Math.sin(amineAngle) * radius * 0.3;
        const douaeX = centerX + Math.cos(douaeAngle) * radius;
        const douaeY = centerY + Math.sin(douaeAngle) * radius * 0.3;
        
        // Apply new positions
        amine.style.left = `${amineX - 75}px`;
        douae.style.right = `${window.innerWidth - douaeX - 75}px`;
        
        // Increment angle
        angle += (2 * Math.PI) / frames;
        frame++;
        
        // Create occasional heart trails
        if (frame % 10 === 0) {
            createHeartTrail(
                centerX + Math.cos(angle + Math.PI/2) * radius * 0.7, 
                centerY + Math.sin(angle + Math.PI/2) * radius * 0.2
            );
        }
        
        // End animation after duration
        if (frame >= frames) {
            clearInterval(interval);
            amine.classList.remove('dancing');
            douae.classList.remove('dancing');
            
            // Restore transition
            amine.style.transition = 'left 0.5s ease-in-out';
            douae.style.transition = 'right 0.5s ease-in-out';
        }
    }, 1000 / 60);
}

// Butterfly effect animation
function createButterflies() {
    const container = document.body;
    const butterflyCount = 15;
    const butterflies = [];
    
    // Create style for butterflies
    const style = document.createElement('style');
    style.textContent = `
        .butterfly {
            position: absolute;
            width: 30px;
            height: 30px;
            pointer-events: none;
            z-index: 50;
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.7));
        }
        
        .butterfly-emoji {
            font-size: 24px;
            animation: flyAnimation 15s linear infinite;
            display: block;
        }
        
        @keyframes flyAnimation {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(10deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-10deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create butterflies
    for (let i = 0; i < butterflyCount; i++) {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        
        const emoji = document.createElement('span');
        emoji.classList.add('butterfly-emoji');
        emoji.innerHTML = '🦋';
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        
        butterfly.appendChild(emoji);
        
        // Position randomly on screen
        butterfly.style.left = `${Math.random() * 100}vw`;
        butterfly.style.top = `${Math.random() * 100}vh`;
        
        container.appendChild(butterfly);
        butterflies.push({
            element: butterfly,
            x: parseFloat(butterfly.style.left),
            y: parseFloat(butterfly.style.top),
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            rotation: 0,
            rotationSpeed: Math.random() * 2 - 1
        });
    }
    
    // Animate butterflies
    const animateButterflies = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        butterflies.forEach(butterfly => {
            // Update position
            butterfly.x += butterfly.speedX;
            butterfly.y += butterfly.speedY;
            butterfly.rotation += butterfly.rotationSpeed;
            
            // Check boundaries
            if (butterfly.x < 0 || butterfly.x > windowWidth) {
                butterfly.speedX *= -1;
            }
            
            if (butterfly.y < 0 || butterfly.y > windowHeight) {
                butterfly.speedY *= -1;
            }
            
            // Apply position
            butterfly.element.style.left = `${butterfly.x}px`;
            butterfly.element.style.top = `${butterfly.y}px`;
            butterfly.element.style.transform = `rotate(${butterfly.rotation}deg)`;
        });
        
        requestAnimationFrame(animateButterflies);
    };
    
    animateButterflies();
    
    // Return function to remove butterflies
    return () => {
        butterflies.forEach(butterfly => {
            butterfly.element.remove();
        });
        style.remove();
    };
}

// Starry sky with shooting stars
function createShootingStars() {
    const container = document.body;
    const shootingStarCount = 5;
    const shootingStars = [];
    
    // Create style for shooting stars
    const style = document.createElement('style');
    style.textContent = `
        .shooting-star {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #fff, transparent);
            pointer-events: none;
            z-index: 30;
            transform-origin: left center;
            filter: drop-shadow(0 0 3px white);
        }
        
        @keyframes shootingStar {
            0% { 
                transform: translateX(0) translateY(0) rotate(215deg) scale(0); 
                opacity: 0;
            }
            10% {
                transform: translateX(-10vw) translateY(10vh) rotate(215deg) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translateX(-100vw) translateY(100vh) rotate(215deg) scale(0.2); 
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Function to create a shooting star
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Random position at top of screen
        star.style.left = `${Math.random() * 100 + 50}vw`;
        star.style.top = `${Math.random() * 30}vh`;
        star.style.width = `${Math.random() * 50 + 50}px`;
        
        // Add animation
        star.style.animation = `shootingStar ${Math.random() * 2 + 1}s linear forwards`;
        
        container.appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            star.remove();
        }, 3000);
    }
    
    // Create shooting stars periodically
    const interval = setInterval(createStar, 2000);
    
    // Return function to stop creating shooting stars
    return () => {
        clearInterval(interval);
    };
}

// Create a heart shape between characters when they meet
function createHeartBetween() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const container = document.body;
    
    // Calculate position between characters
    const amineRect = amine.getBoundingClientRect();
    const douaeRect = douae.getBoundingClientRect();
    
    const centerX = (amineRect.right + douaeRect.left) / 2;
    const centerY = (amineRect.top + douaeRect.top) / 2 - 50;
    
    // Create heart element
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.fontSize = '0px';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.zIndex = '100';
    heart.style.filter = 'drop-shadow(0 0 10px red)';
    
    container.appendChild(heart);
    
    // Animate heart growing
    let size = 0;
    const maxSize = 80;
    const interval = setInterval(() => {
        size += 2;
        heart.style.fontSize = `${size}px`;
        
        if (size >= maxSize) {
            clearInterval(interval);
            
            // Hold for a moment then fade out
            setTimeout(() => {
                let opacity = 1;
                const fadeInterval = setInterval(() => {
                    opacity -= 0.05;
                    heart.style.opacity = opacity;
                    
                    if (opacity <= 0) {
                        clearInterval(fadeInterval);
                        heart.remove();
                    }
                }, 50);
            }, 2000);
        }
    }, 50);
}

// Flower petals falling animation
function createFallingPetals() {
    const container = document.body;
    const petalCount = 30;
    const petals = [];
    
    // Create style for petals
    const style = document.createElement('style');
    style.textContent = `
        .petal {
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            z-index: 40;
            animation: fall linear forwards;
        }
        
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); }
            100% { transform: translateY(110vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Petal emojis
    const petalEmojis = ['🌸', '🌹', '🌷', '🌺', '💐'];
    
    // Create petals
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.innerHTML = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            
            // Random position
            petal.style.left = `${Math.random() * 100}vw`;
            
            // Random fall duration
            const duration = Math.random() * 5 + 5;
            petal.style.animationDuration = `${duration}s`;
            
            container.appendChild(petal);
            petals.push(petal);
            
            // Remove after animation
            setTimeout(() => {
                petal.remove();
                petals.splice(petals.indexOf(petal), 1);
            }, duration * 1000);
        }, i * 300);
    }
    
    // Return function to remove all petals
    return () => {
        petals.forEach(petal => petal.remove());
        style.remove();
    };
}

// Sparkling animation around characters
function createSparkles(character, duration = 3) {
    const container = document.body;
    const sparkleCount = 15;
    const sparkles = [];
    
    // Create style for sparkles
    const style = document.createElement('style');
    style.textContent = `
        .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 45;
            filter: drop-shadow(0 0 2px gold);
            animation: sparkle 1s ease-in-out infinite;
        }
        
        @keyframes sparkle {
            0%, 100% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Character position
    const characterRect = character.getBoundingClientRect();
    const centerX = (characterRect.left + characterRect.right) / 2;
    const centerY = (characterRect.top + characterRect.bottom) / 2;
    
    // Create sparkles around character
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Position around character
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 20;
        sparkle.style.left = `${centerX + Math.cos(angle) * distance}px`;
        sparkle.style.top = `${centerY + Math.sin(angle) * distance}px`;
        
        // Random delay
        sparkle.style.animationDelay = `${Math.random()}s`;
        
        container.appendChild(sparkle);
        sparkles.push(sparkle);
    }
    
    // Remove sparkles after duration
    setTimeout(() => {
        sparkles.forEach(sparkle => sparkle.remove());
        style.remove();
    }, duration * 1000);
}

// Function to make characters dance together
function danceTogether() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    
    // Position characters next to each other
    amine.style.transition = 'left 1s ease-in-out';
    douae.style.transition = 'right 1s ease-in-out';
    
    amine.style.left = 'calc(50% - 90px)';
    douae.style.right = 'calc(50% - 90px)';
    
    // Add dancing class
    setTimeout(() => {
        amine.classList.add('dancing');
        douae.classList.add('dancing');
        
        // Create sparkles and hearts occasionally
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const x = Math.random() * 200 + (window.innerWidth / 2 - 100);
                const y = window.innerHeight - 150 - Math.random() * 50;
                createHeartTrail(x, y, 2);
            }
        }, 500);
        
        // Stop dancing after some time
        setTimeout(() => {
            amine.classList.remove('dancing');
            douae.classList.remove('dancing');
            clearInterval(interval);
        }, 5000);
    }, 1000);
}
