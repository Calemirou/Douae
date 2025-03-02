// kiss-animation.js - Special romantic animation sequences

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const body = document.body;
    const container = document.querySelector('.container');
    const heart = document.querySelector('.heart');
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    // Keep track of special moment states
    let specialMomentActive = false;
    let kissAnimationPlayed = false;
    let specialMomentTimeout = null;
    
    // Create a special romantic moment with visual effects
    function createRomanticMoment() {
        if (specialMomentActive) return;
        specialMomentActive = true;
        
        // Background overlay for focus effect
        const overlay = document.createElement('div');
        overlay.className = 'romantic-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 2s ease';
        overlay.style.zIndex = '90';
        overlay.style.pointerEvents = 'none';
        
        body.appendChild(overlay);
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        // Create floating hearts around the characters
        createFloatingHeartsCircle();
        
        // Add romantic lighting effect
        createRomanticLighting();
        
        // Play special music effect if possible
        triggerMusicHighlight();
        
        // Schedule end of special moment
        specialMomentTimeout = setTimeout(() => {
            endRomanticMoment(overlay);
        }, 15000); // 15 second special moment
    }
    
    // End the romantic moment and clean up
    function endRomanticMoment(overlay) {
        if (!specialMomentActive) return;
        
        // Fade out overlay
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 2000);
        
        // Remove any special effects
        const effects = document.querySelectorAll('.romantic-effect');
        effects.forEach(effect => {
            effect.style.opacity = '0';
            setTimeout(() => {
                effect.remove();
            }, 1000);
        });
        
        // Reset state
        specialMomentActive = false;
        specialMomentTimeout = null;
    }
    
    // Create floating hearts that form a circle
    function createFloatingHeartsCircle() {
        if (!amine || !douae) return;
        
        // Calculate center position between characters
        const amineRect = amine.getBoundingClientRect();
        const douaeRect = douae.getBoundingClientRect();
        
        const centerX = (amineRect.left + douaeRect.left) / 2 + 50;
        const centerY = (amineRect.top + douaeRect.top) / 2;
        
        // Create container for the effect
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'romantic-effect heart-circle';
        heartsContainer.style.position = 'fixed';
        heartsContainer.style.left = `${centerX}px`;
        heartsContainer.style.top = `${centerY}px`;
        heartsContainer.style.width = '0';
        heartsContainer.style.height = '0';
        heartsContainer.style.zIndex = '95';
        heartsContainer.style.transform = 'translate(-50%, -50%)';
        heartsContainer.style.transition = 'opacity 1s ease';
        
        body.appendChild(heartsContainer);
        
        // Create hearts in a circle
        const heartCount = 20;
        const radius = 150;
        
        for (let i = 0; i < heartCount; i++) {
            const angle = (i / heartCount) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 10 + 20}px`;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0)';
            heart.style.transition = 'all 1s ease-out';
            heart.style.transitionDelay = `${i * 0.1}s`;
            
            heartsContainer.appendChild(heart);
            
            // Animate hearts appearing
            setTimeout(() => {
                heart.style.opacity = '1';
                heart.style.transform = 'scale(1)';
            }, 100);
        }
        
        // Animate hearts rotating
        let angle = 0;
        const rotateHearts = () => {
            if (!specialMomentActive) return;
            
            angle += 0.005;
            const hearts = heartsContainer.children;
            
            for (let i = 0; i < hearts.length; i++) {
                const heartAngle = angle + (i / heartCount) * Math.PI * 2;
                const x = Math.cos(heartAngle) * radius;
                const y = Math.sin(heartAngle) * radius;
                
                hearts[i].style.left = `${x}px`;
                hearts[i].style.top = `${y}px`;
            }
            
            requestAnimationFrame(rotateHearts);
        };
        
        requestAnimationFrame(rotateHearts);
    }
    
    // Create romantic lighting effect
    function createRomanticLighting() {
        // Light rays effect
        const rays = document.createElement('div');
        rays.className = 'romantic-effect light-rays';
        rays.style.position = 'fixed';
        rays.style.top = '0';
        rays.style.left = '0';
        rays.style.width = '100%';
        rays.style.height = '100%';
        rays.style.background = 'radial-gradient(circle at center, rgba(255,182,193,0.2) 0%, transparent 70%)';
        rays.style.opacity = '0';
        rays.style.transition = 'opacity 2s ease';
        rays.style.zIndex = '89';
        rays.style.pointerEvents = 'none';
        
        if (amine && douae) {
            // Calculate center between characters
            const amineRect = amine.getBoundingClientRect();
            const douaeRect = douae.getBoundingClientRect();
            
            const centerX = (amineRect.left + douaeRect.left) / 2 + 50;
            const centerY = (amineRect.top + douaeRect.top) / 2;
            
            rays.style.backgroundPosition = `${centerX}px ${centerY}px`;
        }
        
        body.appendChild(rays);
        
        // Fade in rays
        setTimeout(() => {
            rays.style.opacity = '1';
        }, 100);
    }
    
    // Trigger special music highlight (if playing)
    function triggerMusicHighlight() {
        // Create a custom event that animations-music.js can listen for
        const event = new CustomEvent('romanticMoment', {
            detail: { type: 'kiss' }
        });
        document.dispatchEvent(event);
    }
    
    // Kiss animation between characters
    function playKissAnimation() {
        if (!amine || !douae || kissAnimationPlayed) return;
        
        // Set flag to prevent multiple triggers
        kissAnimationPlayed = true;
        
        // Get character positions
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        // Calculate current distances
        const currentDistanceX = Math.abs((aminePos.left + aminePos.width/2) - (douaePos.left + douaePos.width/2));
        
        // If they're already close, just play the animation
        if (currentDistanceX < 100) {
            triggerKiss();
            return;
        }
        
        // Move characters closer for the kiss
        const targetDistance = 70; // pixels apart for the kiss
        const midpointX = (aminePos.left + douaePos.left) / 2 + 50;
        
        // Calculate new positions
        const newAmineX = midpointX - targetDistance / 2;
        const newDouaeX = midpointX + targetDistance / 2;
        
        // Animate Amine moving
        amine.style.transition = 'left 2s ease-in-out';
        amine.style.left = `${newAmineX}px`;
        
        // Animate Douae moving
        douae.style.transition = 'right 2s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH - newDouaeX}px`;
        
        // Trigger kiss when they reach position
        setTimeout(triggerKiss, 2000);
    }
    
    // Actual kiss animation and effects
    function triggerKiss() {
        // Create romantic moment atmosphere
        createRomanticMoment();
        
        // Apply leaning animation to characters
        if (amine && douae) {
            const amineImg = amine.querySelector('img');
            const douaeImg = douae.querySelector('img');
            
            if (amineImg && douaeImg) {
                // Amine leans in
                amineImg.style.transition = 'transform 1s ease-in-out';
                amineImg.style.transformOrigin = 'bottom center';
                amineImg.style.transform = 'rotate(10deg) translateX(10px)';
                
                // Douae leans in
                douaeImg.style.transition = 'transform 1s ease-in-out';
                douaeImg.style.transformOrigin = 'bottom center';
                douaeImg.style.transform = 'rotate(-10deg) translateX(-10px)';
                
                // Create floating heart above them
                setTimeout(() => {
                    createKissHeart();
                    
                    // Return to normal after kiss
                    setTimeout(() => {
                        amineImg.style.transform = '';
                        douaeImg.style.transform = '';
                        
                        // Reset flag after animation completes
                        setTimeout(() => {
                            kissAnimationPlayed = false;
                        }, 5000);
                    }, 3000);
                }, 1000);
            }
        }
    }
    
    // Create heart for kiss moment
    function createKissHeart() {
        if (!amine || !douae) return;
        
        // Calculate position above characters
        const amineRect = amine.getBoundingClientRect();
        const douaeRect = douae.getBoundingClientRect();
        
        const centerX = (amineRect.left + douaeRect.left) / 2 + 50;
        const centerY = (amineRect.top + douaeRect.top) / 2 - 50;
        
        // Create kiss heart
        const kissHeart = document.createElement('div');
        kissHeart.className = 'romantic-effect kiss-heart';
        kissHeart.innerHTML = '❤️';
        kissHeart.style.position = 'fixed';
        kissHeart.style.left = `${centerX}px`;
        kissHeart.style.top = `${centerY}px`;
        kissHeart.style.fontSize = '0px';
        kissHeart.style.opacity = '0';
        kissHeart.style.transform = 'translate(-50%, -50%)';
        kissHeart.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        kissHeart.style.zIndex = '99';
        
        body.appendChild(kissHeart);
        
        // Animate heart appearance with bounce effect
        setTimeout(() => {
            kissHeart.style.fontSize = '80px';
            kissHeart.style.opacity = '1';
            
            // Create smaller hearts bursting out
            setTimeout(() => {
                createKissHeartBurst(centerX, centerY);
            }, 300);
            
            // Float upward
            setTimeout(() => {
                kissHeart.style.top = `${centerY - 100}px`;
                kissHeart.style.opacity = '0';
                
                // Remove after animation
                setTimeout(() => {
                    kissHeart.remove();
                }, 1000);
            }, 2000);
        }, 100);
    }
    
    // Create smaller hearts bursting from kiss
    function createKissHeartBurst(x, y) {
        // Create 8 small hearts in different directions
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            
            const heartX = x + Math.cos(angle) * distance;
            const heartY = y + Math.sin(angle) * distance;
            
            const miniHeart = document.createElement('div');
            miniHeart.className = 'romantic-effect mini-heart';
            miniHeart.innerHTML = '❤️';
            miniHeart.style.position = 'fixed';
            miniHeart.style.left = `${x}px`;
            miniHeart.style.top = `${y}px`;
            miniHeart.style.fontSize = '0px';
            miniHeart.style.opacity = '0';
            miniHeart.style.transform = 'translate(-50%, -50%)';
            miniHeart.style.transition = `all 1s cubic-bezier(0.165, 0.84, 0.44, 1)`;
            miniHeart.style.zIndex = '98';
            
            body.appendChild(miniHeart);
            
            // Animate mini heart
            setTimeout(() => {
                miniHeart.style.left = `${heartX}px`;
                miniHeart.style.top = `${heartY}px`;
                miniHeart.style.fontSize = '30px';
                miniHeart.style.opacity = '1';
                
                // Fade out and remove
                setTimeout(() => {
                    miniHeart.style.opacity = '0';
                    setTimeout(() => {
                        miniHeart.remove();
                    }, 1000);
                }, 1000);
            }, i * 50);
        }
    }
    
    // Create a heart connection line between characters
    function createHeartConnection() {
        if (!amine || !douae) return;
        
        // Get positions
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        // Calculate centers
        const amineCenter = {
            x: aminePos.left + aminePos.width / 2,
            y: aminePos.top + aminePos.height / 2 - 50
        };
        
        const douaeCenter = {
            x: douaePos.left + douaePos.width / 2,
            y: douaePos.top + douaePos.height / 2 - 50
        };
        
        // Create container
        const connectionContainer = document.createElement('div');
        connectionContainer.className = 'heart-connection-container romantic-effect';
        connectionContainer.style.position = 'fixed';
        connectionContainer.style.top = '0';
        connectionContainer.style.left = '0';
        connectionContainer.style.width = '100%';
        connectionContainer.style.height = '100%';
        connectionContainer.style.pointerEvents = 'none';
        connectionContainer.style.zIndex = '95';
        connectionContainer.style.opacity = '0';
        connectionContainer.style.transition = 'opacity 1s ease';
        
        body.appendChild(connectionContainer);
        
        // Create hearts along the connection path
        const heartCount = 7;
        const hearts = [];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '20px';
            heart.style.transform = 'translate(-50%, -50%)';
            
            connectionContainer.appendChild(heart);
            hearts.push(heart);
        }
        
        // Animate hearts
        let progress = 0;
        const speed = 0.005;
        let direction = 1;
        
        function animateHearts() {
            if (!specialMomentActive || !document.body.contains(connectionContainer)) return;
            
            // Update current positions of characters
            const currentAminePos = amine.getBoundingClientRect();
            const currentDouaePos = douae.getBoundingClientRect();
            
            const currentAmineCenter = {
                x: currentAminePos.left + currentAminePos.width / 2,
                y: currentAminePos.top + currentAminePos.height / 2 - 50
            };
            
            const currentDouaeCenter = {
                x: currentDouaePos.left + currentDouaePos.width / 2,
                y: currentDouaePos.top + currentDouaePos.height / 2 - 50
            };
            
            // Update positions of hearts
            for (let i = 0; i < hearts.length; i++) {
                // Calculate heart position (sine wave path between characters)
                const t = (i / (hearts.length - 1) + progress) % 1;
                const x = currentAmineCenter.x + (currentDouaeCenter.x - currentAmineCenter.x) * t;
                const y = currentAmineCenter.y + (currentDouaeCenter.y - currentAmineCenter.y) * t + 
                          Math.sin(t * Math.PI) * -30;
                
                hearts[i].style.left = `${x}px`;
                hearts[i].style.top = `${y}px`;
                
                // Pulse effect
                const scale = 1 + Math.sin(t * Math.PI) * 0.3;
                hearts[i].style.transform = `translate(-50%, -50%) scale(${scale})`;
            }
            
            // Progress animation
            progress += speed * direction;
            
            // Reverse direction at endpoints for bouncing effect
            if (progress >= 0.2 || progress <= 0) {
                direction *= -1;
            }
            
            requestAnimationFrame(animateHearts);
        }
        
        // Start animation
        setTimeout(() => {
            connectionContainer.style.opacity = '1';
            animateHearts();
        }, 100);
    }
    
    // Set up keyboard shortcut for kiss animation (for testing)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'k') {
            playKissAnimation();
        }
    });
    
    // React to custom events from main.js
    document.addEventListener('charactersClose', function(e) {
        // 20% chance to trigger kiss animation when characters are close
        if (Math.random() < 0.2 && !kissAnimationPlayed) {
            setTimeout(playKissAnimation, 1000);
        } else {
            // Otherwise just create heart connection
            createHeartConnection();
            
            // Small chance to start romantic moment
            if (Math.random() < 0.1 && !specialMomentActive) {
                createRomanticMoment();
            }
        }
    });
    
    // Expose functions to window for other scripts to call
    window.kissAnimations = {
        playKissAnimation,
        createRomanticMoment
    };
});
