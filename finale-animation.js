// finale-animation.js - Grand finale sequence and special ending animations

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const container = document.querySelector('.container');
    const heart = document.querySelector('.heart');
    const body = document.body;
    const title = document.querySelector('h1');
    const message = document.querySelector('.message');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    // Finale state
    let finaleActivated = false;
    let fireworksInterval = null;
    
    // Listen for music position to trigger finale near the end
    if (backgroundMusic) {
        backgroundMusic.addEventListener('timeupdate', function() {
            // Trigger finale when song is at around 85% (about 3:00 in a 3:31 song)
            if (backgroundMusic.currentTime > backgroundMusic.duration * 0.85 && !finaleActivated) {
                startFinale();
            }
        });
    }
    
    // Start the grand finale sequence
    function startFinale() {
        if (finaleActivated) return;
        finaleActivated = true;
        
        console.log('Starting finale sequence!');
        
        // 1. Start with camera flash effect
        createCameraFlash(() => {
            // 2. Begin finale animations
            createFinaleTitle();
            zoomInCharacters();
            createIntenseBurstEffect();
            startFireworks();
            createFallingPetals();
            createSpecialMessage();
            
            // 3. Let it run for a while, then transition to ending
            setTimeout(() => {
                transitionToEnding();
            }, 10000);
        });
    }
    
    // Create camera flash effect to transition to finale
    function createCameraFlash(callback) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 0.2s ease-in-out';
        flash.style.zIndex = '1000';
        flash.style.pointerEvents = 'none';
        
        body.appendChild(flash);
        
        // Flash sequence
        setTimeout(() => {
            flash.style.opacity = '1';
            
            setTimeout(() => {
                flash.style.opacity = '0';
                
                setTimeout(() => {
                    flash.remove();
                    if (callback) callback();
                }, 500);
            }, 200);
        }, 100);
    }
    
    // Create special finale title animation
    function createFinaleTitle() {
        if (!title) return;
        
        // Store original title
        const originalTitle = title.innerHTML;
        const originalColor = title.style.color;
        const originalTextShadow = title.style.textShadow;
        
        // Enhance title with special effects
        title.style.transition = 'all 2s ease';
        title.style.transform = 'scale(1.2)';
        title.style.color = '#ff3366';
        title.style.textShadow = '0 0 20px rgba(255, 51, 102, 0.8), 0 0 30px rgba(255, 51, 102, 0.6)';
        
        // Add sparkle animation
        const sparkleAnimation = document.createElement('style');
        sparkleAnimation.textContent = `
            @keyframes finale-sparkle {
                0%, 100% { text-shadow: 0 0 20px rgba(255, 51, 102, 0.8), 0 0 30px rgba(255, 51, 102, 0.6); }
                25% { text-shadow: 0 0 25px rgba(135, 206, 235, 0.8), 0 0 35px rgba(135, 206, 235, 0.6); }
                50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6); }
                75% { text-shadow: 0 0 25px rgba(255, 105, 180, 0.8), 0 0 35px rgba(255, 105, 180, 0.6); }
            }
        `;
        document.head.appendChild(sparkleAnimation);
        
        title.style.animation = 'finale-sparkle 2s infinite';
    }
    
    // Zoom in on characters for finale
    function zoomInCharacters() {
        if (!amine || !douae) return;
        
        // Get current positions
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        // Calculate center point between characters
        const centerX = (aminePos.left + douaePos.left) / 2 + 50;
        const centerY = (aminePos.top + douaePos.top) / 2;
        
        // Move characters to center and make them larger
        amine.style.transition = 'all 3s ease';
        douae.style.transition = 'all 3s ease';
        
        // Position calculations
        const newAmineLeft = centerX - 100;
        const newDouaeRight = WINDOW_WIDTH - centerX - 100;
        
        // Apply new positions
        amine.style.left = `${newAmineLeft}px`;
        douae.style.right = `${newDouaeRight}px`;
        
        // Make characters face each other more directly
        const amineImg = amine.querySelector('img');
        const douaeImg = douae.querySelector('img');
        
        if (amineImg && douaeImg) {
            amineImg.style.transform = 'scale(1.1)';
            douaeImg.style.transform = 'scale(1.1)';
        }
        
        // Apply special glow to characters
        const amineGlow = createCharacterGlow(amine, 'rgba(135, 206, 235, 0.7)');
        const douaeGlow = createCharacterGlow(douae, 'rgba(255, 105, 180, 0.7)');
    }
    
    // Create glow effect around a character
    function createCharacterGlow(characterElem, color) {
        const glow = document.createElement('div');
        glow.className = 'character-glow finale-effect';
        glow.style.position = 'absolute';
        glow.style.top = '-10px';
        glow.style.left = '-10px';
        glow.style.right = '-10px';
        glow.style.bottom = '-10px';
        glow.style.borderRadius = '50%';
        glow.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`;
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 2s ease';
        glow.style.zIndex = '-1';
        
        characterElem.appendChild(glow);
        
        // Fade in the glow
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 100);
        
        // Pulsing animation
        setInterval(() => {
            glow.style.transform = 'scale(1.1)';
            setTimeout(() => {
                glow.style.transform = 'scale(1)';
            }, 1000);
        }, 2000);
        
        return glow;
    }
    
    // Create intense heart burst effect
    function createIntenseBurstEffect() {
        if (!amine || !douae) return;
        
        // Get positions
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        // Calculate center
        const centerX = (aminePos.left + douaePos.left) / 2 + 50;
        const centerY = (aminePos.top + douaePos.top) / 2;
        
        // Create burst container
        const burstContainer = document.createElement('div');
        burstContainer.className = 'finale-effect heart-burst';
        burstContainer.style.position = 'fixed';
        burstContainer.style.left = `${centerX}px`;
        burstContainer.style.top = `${centerY}px`;
        burstContainer.style.width = '0';
        burstContainer.style.height = '0';
        burstContainer.style.zIndex = '96';
        burstContainer.style.pointerEvents = 'none';
        
        body.appendChild(burstContainer);
        
        // Create multiple bursts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSingleBurst(burstContainer);
            }, i * 2000);
        }
    }
    
    // Create a single heart burst
    function createSingleBurst(container) {
        const heartCount = 20;
        const hearts = [];
        
        // Create hearts
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 20 + 20}px`;
            heart.style.transform = 'translate(-50%, -50%) scale(0)';
            heart.style.opacity = '0';
            heart.style.transition = 'all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
            
            container.appendChild(heart);
            hearts.push(heart);
        }
        
        // Animate hearts outward
        setTimeout(() => {
            hearts.forEach((heart, index) => {
                const angle = (index / heartCount) * Math.PI * 2;
                const distance = Math.random() * 100 + 150;
                
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '1';
                
                // Remove after animation
                setTimeout(() => {
                    heart.style.opacity = '0';
                    setTimeout(() => {
                        heart.remove();
                    }, 1000);
                }, 1000);
            });
        }, 100);
    }
    
    // Create spectacular fireworks
    function startFireworks() {
        if (fireworksInterval) clearInterval(fireworksInterval);
        
        // Create fireworks container
        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'finale-effect fireworks-container';
        fireworksContainer.style.position = 'fixed';
        fireworksContainer.style.top = '0';
        fireworksContainer.style.left = '0';
        fireworksContainer.style.width = '100%';
        fireworksContainer.style.height = '100%';
        fireworksContainer.style.pointerEvents = 'none';
        fireworksContainer.style.zIndex = '95';
        
        body.appendChild(fireworksContainer);
        
        // Launch fireworks repeatedly
        fireworksInterval = setInterval(() => {
            launchFirework(fireworksContainer);
        }, 800);
    }
    
    // Launch a single firework
    function launchFirework(container) {
        // Create launch point at bottom of screen
        const startX = Math.random() * WINDOW_WIDTH;
        const startY = WINDOW_HEIGHT;
        const endX = startX + (Math.random() - 0.5) * 300;
        const endY = Math.random() * WINDOW_HEIGHT * 0.6;
        
        // Create rocket
        const rocket = document.createElement('div');
        rocket.className = 'firework-rocket';
        rocket.style.position = 'absolute';
        rocket.style.width = '4px';
        rocket.style.height = '15px';
        rocket.style.backgroundColor = 'white';
        rocket.style.borderRadius = '2px';
        rocket.style.left = `${startX}px`;
        rocket.style.top = `${startY}px`;
        rocket.style.transform = 'translate(-50%, -50%)';
        rocket.style.zIndex = '96';
        
        container.appendChild(rocket);
        
        // Animate rocket
        const rocketDuration = Math.random() * 1000 + 1000;
        const startTime = Date.now();
        
        function animateRocket() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / rocketDuration, 1);
            
            // Quadratic easing for realistic physics
            const easeProgress = progress * (2 - progress);
            
            const currentX = startX + (endX - startX) * easeProgress;
            const currentY = startY + (endY - startY) * easeProgress;
            
            rocket.style.left = `${currentX}px`;
            rocket.style.top = `${currentY}px`;
            
            // Trail effect
            if (Math.random() > 0.5) {
                const trail = document.createElement('div');
                trail.className = 'firework-trail';
                trail.style.position = 'absolute';
                trail.style.width = '2px';
                trail.style.height = '2px';
                trail.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                trail.style.borderRadius = '50%';
                trail.style.left = `${currentX}px`;
                trail.style.top = `${currentY}px`;
                trail.style.transform = 'translate(-50%, -50%)';
                
                container.appendChild(trail);
                
                // Fade out trail
                setTimeout(() => {
                    trail.style.opacity = '0';
                    trail.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        trail.remove();
                    }, 300);
                }, 10);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animateRocket);
            } else {
                // Explosion
                rocket.remove();
                createFireworkExplosion(container, endX, endY);
            }
        }
        
        requestAnimationFrame(animateRocket);
    }
    
    // Create firework explosion
    function createFireworkExplosion(container, x, y) {
        // Create explosion center flash
        const flash = document.createElement('div');
        flash.className = 'firework-flash';
        flash.style.position = 'absolute';
        flash.style.width = '6px';
        flash.style.height = '6px';
        flash.style.backgroundColor = 'white';
        flash.style.borderRadius = '50%';
        flash.style.left = `${x}px`;
        flash.style.top = `${y}px`;
        flash.style.transform = 'translate(-50%, -50%)';
        flash.style.boxShadow = '0 0 20px 10px white';
        
        container.appendChild(flash);
        
        // Fade out flash
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = 'all 0.3s ease';
            flash.style.transform = 'translate(-50%, -50%) scale(2)';
            
            setTimeout(() => {
                flash.remove();
            }, 300);
        }, 100);
        
        // Choose firework color
        const colors = [
            '#ff0000', '#ff00ff', '#0000ff', '#00ffff', '#00ff00', 
            '#ffff00', '#ff8000', '#ff0080', '#8000ff', '#0080ff'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create particles
        const particleCount = Math.floor(Math.random() * 30) + 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.boxShadow = `0 0 6px ${color}`;
            
            container.appendChild(particle);
            
            // Calculate random direction and speed
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 2;
            const distance = Math.random() * 100 + 50;
            
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            // Animate particle
            const duration = Math.random() * 1000 + 500;
            const startTime = Date.now();
            
            function animateParticle() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Quadratic easing out for physics
                const easeProgress = progress * (2 - progress);
                
                const currentX = x + (endX - x) * easeProgress;
                const currentY = y + (endY - y) * easeProgress + progress * progress * 100; // Add gravity
                
                particle.style.left = `${currentX}px`;
                particle.style.top = `${currentY}px`;
                
                // Fade out
                particle.style.opacity = 1 - progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }
            
            requestAnimationFrame(animateParticle);
        }
    }
    
    // Create falling petals for finale
    function createFallingPetals() {
        // Create petals container
        const petalsContainer = document.createElement('div');
        petalsContainer.className = 'finale-effect falling-petals';
        petalsContainer.style.position = 'fixed';
        petalsContainer.style.top = '0';
        petalsContainer.style.left = '0';
        petalsContainer.style.width = '100%';
        petalsContainer.style.height = '100%';
        petalsContainer.style.pointerEvents = 'none';
        petalsContainer.style.zIndex = '94';
        
        body.appendChild(petalsContainer);
        
        // Petal types and colors
        const petalTypes = ['🌸', '🌹', '🌺', '🌷', '🌼', '💮'];
        
        // Create initial petals
        for (let i = 0; i < 50; i++) {
            createPetal(petalsContainer, petalTypes);
        }
        
        // Continue creating petals
        const petalInterval = setInterval(() => {
            createPetal(petalsContainer, petalTypes);
        }, 300);
        
        // Store interval for cleanup
        petalsContainer.dataset.intervalId = petalInterval;
    }
    
    // Create a single petal
    function createPetal(container, types) {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        petal.innerHTML = types[Math.floor(Math.random() * types.length)];
        petal.style.position = 'absolute';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = '-50px';
        petal.style.fontSize = `${Math.random() * 20 + 15}px`;
        petal.style.opacity = '0.8';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(petal);
        
        // Animate petal falling
        const duration = Math.random() * 8000 + 7000;
        const rotation = Math.random() * 720 - 360;
        const horizontalMovement = Math.random() * 200 - 100;
        const startTime = Date.now();
        const startLeft = parseFloat(petal.style.left);
        
        function animatePetal() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Calculate position with swaying motion
            const verticalPos = progress * (WINDOW_HEIGHT + 100);
            const horizontalPos = startLeft + (Math.sin(progress * 4 * Math.PI) * horizontalMovement) / 100;
            
            petal.style.top = `${verticalPos}px`;
            petal.style.left = `${horizontalPos}%`;
            petal.style.transform = `rotate(${progress * rotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animatePetal);
            } else {
                petal.remove();
            }
        }
        
        requestAnimationFrame(animatePetal);
    }
    
    // Create a special final message
    function createSpecialMessage() {
        // If there's already a message element, enhance it
        if (message) {
            // Store original message
            const originalContent = message.innerHTML;
            const originalStyles = {
                color: message.style.color,
                textShadow: message.style.textShadow,
                transform: message.style.transform,
                fontSize: message.style.fontSize
            };
            
            // Enhance message with new romantic text
            message.innerHTML = "My love for you, Douae, is eternal. You are my everything - yesterday, today, and forever. ❤️";
            message.style.color = "#ff3366";
            message.style.textShadow = "0 0 10px rgba(255, 51, 102, 0.6)";
            message.style.transform = "scale(1.1)";
            message.style.fontSize = "larger";
            message.style.transition = "all 3s ease";
            
            // Add heart decorations to the message
            const messageRect = message.getBoundingClientRect();
            const decorationContainer = document.createElement('div');
            decorationContainer.className = 'finale-effect message-decorations';
            decorationContainer.style.position = 'absolute';
            decorationContainer.style.top = '0';
            decorationContainer.style.left = '0';
            decorationContainer.style.width = '100%';
            decorationContainer.style.height = '100%';
            decorationContainer.style.pointerEvents = 'none';
            
            message.style.position = 'relative';
            message.appendChild(decorationContainer);
            
            // Add decorative hearts around the message
            for (let i = 0; i < 8; i++) {
                const decoration = document.createElement('div');
                decoration.innerHTML = '❤️';
                decoration.style.position = 'absolute';
                decoration.style.fontSize = '24px';
                
                const angle = (i / 8) * Math.PI * 2;
                const x = Math.cos(angle) * 150 + messageRect.width / 2;
                const y = Math.sin(angle) * 80 + messageRect.height / 2;
                
                decoration.style.left = `${x}px`;
                decoration.style.top = `${y}px`;
                decoration.style.transform = 'translate(-50%, -50%) scale(0)';
                decoration.style.opacity = '0';
                decoration.style.transition = 'all 1s ease';
                decoration.style.transitionDelay = `${i * 0.1}s`;
                
                decorationContainer.appendChild(decoration);
                
                // Animate decorations appearing
                setTimeout(() => {
                    decoration.style.transform = 'translate(-50%, -50%) scale(1)';
                    decoration.style.opacity = '1';
                }, 100);
            }
            
            return;
        }
        
        // If no message exists, create a new one
        const newMessage = document.createElement('div');
        newMessage.className = 'finale-message finale-effect';
        newMessage.innerHTML = "My love for you, Douae, is eternal. You are my everything - yesterday, today, and forever. ❤️";
        newMessage.style.position = 'fixed';
        newMessage.style.bottom = '20%';
        newMessage.style.left = '50%';
        newMessage.style.transform = 'translateX(-50%) scale(0)';
        newMessage.style.color = "#ff3366";
        newMessage.style.textShadow = "0 0 10px rgba(255, 51, 102, 0.6)";
        newMessage.style.fontSize = '24px';
        newMessage.style.textAlign = 'center';
        newMessage.style.maxWidth = '80%';
        newMessage.style.padding = '20px';
        newMessage.style.zIndex = '97';
        newMessage.style.transition = 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        body.appendChild(newMessage);
        
        // Animate message appearing
        setTimeout(() => {
            newMessage.style.transform = 'translateX(-50%) scale(1)';
        }, 100);
    }
    
    // Transition to ending sequence
    function transitionToEnding() {
        // Create another camera flash for transition
        createCameraFlash(() => {
            // Remove all finale effects
            const finaleEffects = document.querySelectorAll('.finale-effect');
            finaleEffects.forEach(effect => {
                if (effect.dataset.intervalId) {
                    clearInterval(parseInt(effect.dataset.intervalId));
                }
                effect.remove();
            });
            
            // Clear fireworks interval
            if (fireworksInterval) {
                clearInterval(fireworksInterval);
                fireworksInterval = null;
            }
            
            // Create final scene
            createFinalScene();
        });
    }
    
    // Create the final scene with Amine and Douae together
    function createFinalScene() {
        // Darken background
        const backdrop = document.createElement('div');
        backdrop.className = 'finale-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        backdrop.style.opacity = '0';
        backdrop.style.transition = 'opacity 3s ease';
        backdrop.style.zIndex = '90';
        
        body.appendChild(backdrop);
        
        // Fade in backdrop
        setTimeout(() => {
            backdrop.style.opacity = '1';
        }, 100);
        
        // Center characters and move to bottom
        if (amine && douae) {
            // Calculate center
            const centerX = WINDOW_WIDTH / 2;
            const targetY = WINDOW_HEIGHT * 0.6;
            
            // Move Amine
            amine.style.transition = 'all 3s ease';
            amine.style.left = `${centerX - 80}px`;
            amine.style.bottom = `${WINDOW_HEIGHT - targetY}px`;
            amine.style.zIndex = '95';
            
            // Move Douae
            douae.style.transition = 'all 3s ease';
            douae.style.right = `${WINDOW_WIDTH - centerX - 80}px`;
            douae.style.bottom = `${WINDOW_HEIGHT - targetY}px`;
            douae.style.zIndex = '95';
            
            // Make characters face each other
            const amineImg = amine.querySelector('img');
            const douaeImg = douae.querySelector('img');
            
            if (amineImg && douaeImg) {
                amineImg.style.transition = 'all 3s ease';
                douaeImg.style.transition = 'all 3s ease';
                
                amineImg.style.transform = 'rotate(5deg)';
                douaeImg.style.transform = 'rotate(-5deg)';
            }
            
            // Create spotlight effect
            const spotlight = document.createElement('div');
            spotlight.className = 'finale-spotlight';
            spotlight.style.position = 'fixed';
            spotlight.style.top = '0';
            spotlight.style.left = '0';
            spotlight.style.width = '100%';
            spotlight.style.height = '100%';
            spotlight.style.background = 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.8) 70%)';
            spotlight.style.opacity = '0';
            spotlight.style.transition = 'opacity 3s ease';
            spotlight.style.zIndex = '91';
            spotlight.style.pointerEvents = 'none';
            
            body.appendChild(spotlight);
            
            // Position spotlight on characters
            spotlight.style.backgroundPosition = `center ${targetY}px`;
            
            // Fade in spotlight
            setTimeout(() => {
                spotlight.style.opacity = '1';
            }, 100);
            
            // Create heart above characters
            setTimeout(() => {
                createFinalHeart(centerX, targetY - 100);
            }, 3000);
        }
        
        // Create final message
        setTimeout(() => {
            createFinalMessage();
        }, 5000);
    }
    
    // Create final heart animation
    function createFinalHeart(x, y) {
        const finalHeart = document.createElement('div');
        finalHeart.className = 'finale-heart';
        finalHeart.innerHTML = '❤️';
        finalHeart.style.position = 'fixed';
        finalHeart.style.left = `${x}px`;
        finalHeart.style.top = `${y}px`;
        finalHeart.style.fontSize = '0px';
        finalHeart.style.opacity = '0';
        finalHeart.style.transform = 'translate(-50%, -50%)';
        finalHeart.style.transition = 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        finalHeart.style.zIndex = '96';
        finalHeart.style.filter = 'drop-shadow(0 0 20px rgba(255, 51, 102, 0.8))';
        
        body.appendChild(finalHeart);
        
        // Animate heart appearing
        setTimeout(() => {
            finalHeart.style.fontSize = '120px';
            finalHeart.style.opacity = '1';
        }, 100);
        
        // Add pulsing animation
        setTimeout(() => {
            finalHeart.style.transition = 'all 1s ease-in-out';
            
            function pulseHeart() {
                finalHeart.style.transform = 'translate(-50%, -50%) scale(1.2)';
                
                setTimeout(() => {
                    finalHeart.style.transform = 'translate(-50%, -50%) scale(1)';
                    
                    setTimeout(pulseHeart, 1000);
                }, 1000);
            }
            
            pulseHeart();
        }, 2000);
    }
    
    // Create final message
    function createFinalMessage() {
        const finalMessage = document.createElement('div');
        finalMessage.className = 'finale-message';
        finalMessage.innerHTML = `
            <div class="message-title">Forever & Always</div>
            <div class="message-body">Our love story is just beginning, Douae.<br>I will cherish every moment with you.</div>
        `;
        finalMessage.style.position = 'fixed';
        finalMessage.style.left = '50%';
        finalMessage.style.bottom = '15%';
        finalMessage.style.transform = 'translateX(-50%) translateY(100px)';
        finalMessage.style.color = 'white';
        finalMessage.style.textAlign = 'center';
        finalMessage.style.opacity = '0';
        finalMessage.style.transition = 'all 2s ease';
        finalMessage.style.zIndex = '97';
        
        // Style title and body
        const style = document.createElement('style');
        style.textContent = `
            .message-title {
                font-size: 32px;
                margin-bottom: 15px;
                color: #ff3366;
                text-shadow: 0 0 10px rgba(255, 51, 102, 0.6);
            }
            
            .message-body {
                font-size: 20px;
                line-height: 1.5;
            }
        `;
        
        document.head.appendChild(style);
        body.appendChild(finalMessage);
        
        // Animate message appearing
        setTimeout(() => {
            finalMessage.style.opacity = '1';
            finalMessage.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Create replay button
        setTimeout(() => {
            createReplayButton();
        }, 3000);
    }
    
    // Create replay button
    function createReplayButton() {
        const replayButton = document.createElement('div');
        replayButton.className = 'replay-button';
        replayButton.textContent = '♥ Play Again ♥';
        replayButton.style.position = 'fixed';
        replayButton.style.left = '50%';
        replayButton.style.bottom = '5%';
        replayButton.style.transform = 'translateX(-50%)';
        replayButton.style.backgroundColor = 'rgba(255, 51, 102, 0.8)';
        replayButton.style.color = 'white';
        replayButton.style.padding = '10px 20px';
        replayButton.style.borderRadius = '20px';
        replayButton.style.cursor = 'pointer';
        replayButton.style.opacity = '0';
        replayButton.style.transition = 'all 0.5s ease';
        replayButton.style.zIndex = '98';
        
        body.appendChild(replayButton);
        
        // Hover effect
        replayButton.addEventListener('mouseenter', () => {
            replayButton.style.backgroundColor = 'rgba(255, 51, 102, 1)';
            replayButton.style.transform = 'translateX(-50%) scale(1.1)';
        });
        
        replayButton.addEventListener('mouseleave', () => {
            replayButton.style.backgroundColor = 'rgba(255, 51, 102, 0.8)';
            replayButton.style.transform = 'translateX(-50%) scale(1)';
        });
        
        // Fade in button
        setTimeout(() => {
            replayButton.style.opacity = '1';
        }, 100);
        
        // Click handler to restart animation
        replayButton.addEventListener('click', () => {
            // Reset finale state
            finaleActivated = false;
            
            // Remove all finale elements
            const finaleElements = document.querySelectorAll('.finale-backdrop, .finale-spotlight, .finale-heart, .finale-message, .replay-button');
            finaleElements.forEach(el => el.remove());
            
            // Reset character positions
            if (backgroundMusic) {
                backgroundMusic.currentTime = 0;
                backgroundMusic.play();
            }
            
            // Trigger main animation restart
            const restartEvent = new CustomEvent('restartAnimation');
            document.dispatchEvent(restartEvent);
        });
    }
    
    // Manual trigger for testing (press 'f')
    document.addEventListener('keydown', function(e) {
        if (e.key === 'f' && !finaleActivated) {
            startFinale();
        }
    });
    
    // Listen for restart event
    document.addEventListener('restartAnimation', function() {
        finaleActivated = false;
        
        // Clean up any intervals
        if (fireworksInterval) {
            clearInterval(fireworksInterval);
            fireworksInterval = null;
        }
    });
    
    // Expose finale functions to window for other scripts
    window.finaleAnimations = {
        startFinale,
        createFinalScene
    };
});
