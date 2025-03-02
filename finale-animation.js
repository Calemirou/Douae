// finale-animation.js - Grand finale animation sequence

function performFinaleAnimation() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const container = document.body;
    
    // Stop any current animations
    amine.classList.remove('walking', 'jumping', 'dancing', 'spinning');
    douae.classList.remove('walking', 'jumping', 'dancing', 'spinning');
    
    // Position characters in the center
    amine.style.transition = 'left 1s ease-in-out';
    douae.style.transition = 'right 1s ease-in-out';
    
    // Create fireworks effect
    createFireworks();
    
    // Create glowing text
    createGlowingText();
    
    // Make characters jump together
    setTimeout(() => {
        jumpCharacter(amine, 40, 1);
        jumpCharacter(douae, 40, 1);
        
        // Show reactions
        showReaction(douae, 'love', 4);
        
        // Create heart shape between them
        setTimeout(() => {
            createHeartBetween();
        }, 500);
    }, 1000);
    
    // Spin characters
    setTimeout(() => {
        spinCharacter(amine, 1.5);
        spinCharacter(douae, 1.5);
    }, 3000);
    
    // Make them dance together
    setTimeout(() => {
        danceTogether();
    }, 5000);
    
    // Create a rain of hearts
    setTimeout(() => {
        createHeartRain();
    }, 7000);
}

// Create fireworks effect
function createFireworks() {
    const container = document.body;
    const fireworkCount = 10;
    
    // Create style for fireworks
    const style = document.createElement('style');
    style.textContent = `
        .firework {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 80;
        }
        
        .firework-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            pointer-events: none;
            background-color: white;
            transform-origin: center;
        }
        
        @keyframes firework-rise {
            0% { transform: translateY(100vh); }
            100% { transform: translateY(20vh); }
        }
        
        @keyframes firework-explode {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Create fireworks
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            // Create firework
            const firework = document.createElement('div');
            firework.classList.add('firework');
            
            // Random position
            const x = Math.random() * window.innerWidth;
            firework.style.left = `${x}px`;
            firework.style.bottom = '0';
            
            // Random color
            const hue = Math.random() * 360;
            firework.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
            firework.style.boxShadow = `0 0 6px 2px hsl(${hue}, 100%, 60%)`;
            
            // Animate rising
            firework.style.animation = `firework-rise ${Math.random() * 2 + 1}s forwards`;
            
            container.appendChild(firework);
            
            // Explode after rising
            setTimeout(() => {
                // Get final position
                const rect = firework.getBoundingClientRect();
                const finalX = rect.left + rect.width / 2;
                const finalY = rect.top + rect.height / 2;
                
                // Remove firework
                firework.remove();
                
                // Create explosion particles
                createExplosion(finalX, finalY, hue);
            }, Math.random() * 2000 + 1000);
        }, i * 500);
    }
    
    // Remove style after animations
    setTimeout(() => {
        style.remove();
    }, 15000);
}

// Create firework explosion
function createExplosion(x, y, hue) {
    const container = document.body;
    const particleCount = 30;
    
    // Create circular flash
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.width = '10px';
    flash.style.height = '10px';
    flash.style.borderRadius = '50%';
    flash.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;
    flash.style.zIndex = '85';
    flash.style.transform = 'translate(-50%, -50%)';
    flash.style.animation = 'firework-explode 0.5s forwards';
    
    container.appendChild(flash);
    
    // Remove flash after animation
    setTimeout(() => {
        flash.remove();
    }, 500);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        
        // Set position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random color variation
        const colorVariation = Math.random() * 30 - 15;
        particle.style.backgroundColor = `hsl(${hue + colorVariation}, 100%, 70%)`;
        particle.style.boxShadow = `0 0 4px 1px hsl(${hue + colorVariation}, 100%, 70%)`;
        
        // Random direction and speed
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1 + 1;
        
        // Animate particle
        particle.style.animation = 'none';
        particle.style.transition = `all ${duration}s ease-out`;
        
        container.appendChild(particle);
        
        // Start animation after a small delay
        setTimeout(() => {
            particle.style.left = `${x + Math.cos(angle) * distance}px`;
            particle.style.top = `${y + Math.sin(angle) * distance}px`;
            particle.style.opacity = '0';
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 10);
    }
}

// Create glowing text effect
function createGlowingText() {
    const container = document.querySelector('.container');
    const h1 = container.querySelector('h1');
    const message = container.querySelector('.message');
    
    // Add glowing effect to heading
    h1.style.transition = 'text-shadow 0.5s ease-in-out';
    h1.style.textShadow = '0 0 20px rgba(255, 105, 180, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)';
    
    // Pulse animation for heading
    let pulseInterval = setInterval(() => {
        if (h1.style.textShadow.includes('30px')) {
            h1.style.textShadow = '0 0 10px rgba(255, 105, 180, 0.8), 0 0 15px rgba(255, 105, 180, 0.6)';
        } else {
            h1.style.textShadow = '0 0 20px rgba(255, 105, 180, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)';
        }
    }, 1000);
    
    // Add glow to message
    message.style.transition = 'text-shadow 0.5s ease-in-out';
    message.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
    
    // Stop animation after some time
    setTimeout(() => {
        clearInterval(pulseInterval);
    }, 15000);
}

// Heart rain effect
function createHeartRain() {
    const container = document.body;
    const heartCount = 40;
    
    // Create style for falling hearts
    const style = document.createElement('style');
    style.textContent = `
        .falling-heart {
            position: absolute;
            font-size: 24px;
            pointer-events: none;
            z-index: 50;
            animation: heart-fall linear forwards;
        }
        
        @keyframes heart-fall {
            0% { 
                transform: translateY(-50px) rotate(0deg); 
                opacity: 1;
            }
            90% { opacity: 1; }
            100% { 
                transform: translateY(110vh) rotate(360deg); 
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Heart emojis with variations
    const heartEmojis = ['❤️', '💕', '💖', '💓', '💗', '💘'];
    
    // Create falling hearts
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('falling-heart');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Random position
            heart.style.left = `${Math.random() * 100}vw`;
            
            // Random size
            heart.style.fontSize = `${Math.random() * 20 + 15}px`;
            
            // Random fall duration
            const duration = Math.random() * 5 + 5;
            heart.style.animationDuration = `${duration}s`;
            
            container.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 200);
    }
    
    // Remove style after all hearts are gone
    setTimeout(() => {
        style.remove();
    }, heartCount * 200 + 10000);
}

// Create a special message that appears at the finale
function createSpecialMessage() {
    const container = document.body;
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%) scale(0)';
    messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageContainer.style.borderRadius = '20px';
    messageContainer.style.padding = '30px';
    messageContainer.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.8)';
    messageContainer.style.zIndex = '200';
    messageContainer.style.transition = 'transform 1s ease-in-out';
    
    // Create message text
    const message = document.createElement('div');
    message.style.color = 'white';
    message.style.fontSize = '32px';
    message.style.textAlign = 'center';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    message.textContent = 'Forever in Love';
    
    // Create close button
    const closeButton = document.createElement('div');
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '16px';
    closeButton.style.textAlign = 'center';
    closeButton.style.marginTop = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.textContent = 'Close';
    
    // Add to container
    messageContainer.appendChild(message);
    messageContainer.appendChild(closeButton);
    container.appendChild(messageContainer);
    
    // Show message
    setTimeout(() => {
        messageContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    // Close button event
    closeButton.addEventListener('click', () => {
        messageContainer.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Remove after animation
        setTimeout(() => {
            messageContainer.remove();
        }, 1000);
    });
    
    // Auto close after some time
    setTimeout(() => {
        messageContainer.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Remove after animation
        setTimeout(() => {
            messageContainer.remove();
        }, 1000);
    }, 8000);
}
