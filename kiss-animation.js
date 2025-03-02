// kiss-animation.js - Special romantic kiss animation

function performKissAnimation() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    
    // Stop any current animations
    amine.classList.remove('walking', 'jumping', 'dancing', 'spinning');
    douae.classList.remove('walking', 'jumping', 'dancing', 'spinning');
    
    // Position characters to face each other
    amine.style.transition = 'left 1s ease-in-out';
    douae.style.transition = 'right 1s ease-in-out';
    
    // Apply scale factors here
    const centerOffset = 85 * scaleFactor;
    amine.style.left = `calc(50% - ${centerOffset}px)`;
    douae.style.right = `calc(50% - ${centerOffset}px)`;
    
    // Wait for characters to get in position
    setTimeout(() => {
        // Create heart between them
        createHeartBetween();
        
        // Show love reactions
        showReaction(douae, 'love', 3);
        
        // Create sparkles
        createSparkles(amine, 3);
        createSparkles(douae, 3);
        
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const x = Math.random() * 200 + (window.innerWidth / 2 - 100);
                const y = Math.random() * 100 + (window.innerHeight - 200);
                createHeartTrail(x, y, 3);
            }, i * 200);
        }
        
        // Create butterflies
        const removeButterflies = createButterflies();
        
        // Create falling petals
        const removePetals = createFallingPetals();
        
        // Create shooting stars
        const removeShootingStars = createShootingStars();
        
        // Remove effects after animation completes
        setTimeout(() => {
            removeButterflies();
            removePetals();
            removeShootingStars();
        }, 5000);
        
    }, 1000);
}

// Add CSS styles for the kiss animation
const kissAnimationStyle = document.createElement('style');
kissAnimationStyle.textContent = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        15% { transform: scale(1.3); }
        30% { transform: scale(1); }
        45% { transform: scale(1.3); }
        60% { transform: scale(1); }
    }
    
    .heart-beat {
        animation: heartBeat 1s infinite;
    }
    
    @keyframes blush {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2) saturate(1.2); }
    }
    
    .blushing {
        animation: blush 2s infinite;
    }
    
    @keyframes float-up {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
    }
    
    .float-up {
        animation: float-up 3s forwards;
    }
    
    @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.5)); }
        50% { filter: drop-shadow(0 0 20px rgba(255,192,203,0.8)); }
    }
    
    .glowing {
        animation: glow 2s infinite;
    }
    
    @keyframes love-shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-5deg); }
    }
    
    .love-shake {
        animation: love-shake 0.5s infinite;
    }
`;
document.head.appendChild(kissAnimationStyle);

// Function to create heart emojis that float up and fade away
function createFloatingHearts(x, y, count = 5) {
    const container = document.body;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = `${x + (Math.random() * 40 - 20)}px`;
            heart.style.top = `${y + (Math.random() * 20 - 10)}px`;
            heart.style.fontSize = `${Math.random() * 10 + 20}px`;
            heart.style.zIndex = '100';
            heart.classList.add('float-up');
            
            container.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 300);
    }
}

// Function to create a pulsing circle effect
function createPulsingCircle(x, y) {
    const container = document.body;
    const circle = document.createElement('div');
    
    circle.style.position = 'absolute';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = '0px';
    circle.style.height = '0px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'rgba(255, 200, 200, 0.3)';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.zIndex = '40';
    
    container.appendChild(circle);
    
    // Animate circle growing and fading
    let size = 0;
    const maxSize = 200;
    const interval = setInterval(() => {
        size += 5;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.opacity = 1 - (size / maxSize);
        
        if (size >= maxSize) {
            clearInterval(interval);
            circle.remove();
        }
    }, 50);
}

// Function to create a color overlay that brightens the scene
function createColorOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 200, 200, 0)';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '90';
    overlay.style.transition = 'background-color 2s ease-in-out';
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
        overlay.style.backgroundColor = 'rgba(255, 200, 200, 0.2)';
    }, 100);
    
    // Fade out
    setTimeout(() => {
        overlay.style.backgroundColor = 'rgba(255, 200, 200, 0)';
        
        // Remove after fade out
        setTimeout(() => {
            overlay.remove();
        }, 2000);
    }, 3000);
}
