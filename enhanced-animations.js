// enhanced-animations.js - Advanced animations and special effects

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const charactersContainer = document.getElementById('charactersContainer');
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    const container = document.querySelector('.container');
    const body = document.body;
    
    // Enhanced animation settings
    const enhancedAnimations = {
        enabledEffects: {
            particles: true,
            specialJumps: true,
            powerups: true,
            cameraEffects: true,
            weatherEffects: true
        },
        currentWeather: 'clear',
        powerupActive: false,
        activeTransformations: [],
        specialEventSchedule: [],
        lastInteractionTime: Date.now(),
        autoAnimationsEnabled: true
    };
    
    // Particle system for special effects
    function createParticleSystem() {
        // Create a container for all particles
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '50';
        particleContainer.style.overflow = 'hidden';
        
        body.appendChild(particleContainer);
        
        return {
            container: particleContainer,
            
            createParticle: function(options) {
                const defaults = {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    size: 10,
                    color: '#ff69b4',
                    content: '',
                    duration: 2000,
                    gravity: 0.1,
                    velocity: { x: 0, y: 0 },
                    rotation: 0,
                    rotationSpeed: 0,
                    opacity: 1,
                    className: '',
                    customStyles: {}
                };
                
                const settings = { ...defaults, ...options };
                
                // Create particle element
                const particle = document.createElement('div');
                particle.classList.add('particle');
                if (settings.className) {
                    particle.classList.add(settings.className);
                }
                
                // Set content if provided, otherwise use the size and color
                if (settings.content) {
                    particle.innerHTML = settings.content;
                } else {
                    particle.style.width = `${settings.size}px`;
                    particle.style.height = `${settings.size}px`;
                    particle.style.backgroundColor = settings.color;
                    particle.style.borderRadius = '50%';
                }
                
                // Set base styles
                particle.style.position = 'absolute';
                particle.style.left = `${settings.x}px`;
                particle.style.top = `${settings.y}px`;
                particle.style.opacity = settings.opacity;
                particle.style.transform = `translate(-50%, -50%) rotate(${settings.rotation}deg)`;
                particle.style.pointerEvents = 'none';
                
                // Apply any custom styles
                for (const property in settings.customStyles) {
                    particle.style[property] = settings.customStyles[property];
                }
                
                // Add to container
                this.container.appendChild(particle);
                
                // Animation properties
                const startTime = Date.now();
                const velocityX = settings.velocity.x;
                const velocityY = settings.velocity.y;
                let posX = settings.x;
                let posY = settings.y;
                let rotation = settings.rotation;
                
                // Animate the particle
                function updateParticle() {
                    const now = Date.now();
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / settings.duration, 1);
                    
                    // Apply velocity and gravity
                    posX += velocityX;
                    posY += velocityY + (settings.gravity * elapsed / 16); // Gravity increases over time
                    rotation += settings.rotationSpeed;
                    
                    // Update position and rotation
                    particle.style.left = `${posX}px`;
                    particle.style.top = `${posY}px`;
                    particle.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                    
                    // Fade out as it nears the end
                    if (progress > 0.7) {
                        const fadeProgress = (progress - 0.7) / 0.3;
                        particle.style.opacity = settings.opacity * (1 - fadeProgress);
                    }
                    
                    // Continue animation or remove
                    if (progress < 1) {
                        requestAnimationFrame(updateParticle);
                    } else {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                }
                
                // Start animation
                requestAnimationFrame(updateParticle);
                
                return particle;
            },
            
            createParticleBurst: function(options) {
                const defaults = {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    count: 10,
                    spread: 360,
                    speed: 5,
                    size: 10,
                    colors: ['#ff69b4', '#ff5e87', '#ff83a6'],
                    content: '',
                    duration: 2000,
                    gravity: 0.1
                };
                
                const settings = { ...defaults, ...options };
                
                // Create particles in a burst pattern
                for (let i = 0; i < settings.count; i++) {
                    // Calculate angle based on spread
                    const angle = (i / settings.count) * (settings.spread * Math.PI / 180);
                    
                    // Calculate velocity based on angle and speed
                    const speed = settings.speed * (0.5 + Math.random() * 0.5); // Random speed variation
                    const velocityX = Math.cos(angle) * speed;
                    const velocityY = Math.sin(angle) * speed;
                    
                    // Random color from the colors array
                    const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
                    
                    // Create the particle
                    this.createParticle({
                        x: settings.x,
                        y: settings.y,
                        size: settings.size * (0.7 + Math.random() * 0.6), // Random size variation
                        color: color,
                        content: settings.content,
                        duration: settings.duration * (0.8 + Math.random() * 0.4), // Random duration variation
                        gravity: settings.gravity * (0.8 + Math.random() * 0.4), // Random gravity variation
                        velocity: { x: velocityX, y: velocityY },
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 10
                    });
                }
            },
            
            clearAllParticles: function() {
                this.container.innerHTML = '';
            }
        };
    }
    
    // Create the particle system
    const particleSystem = createParticleSystem();
    
    // Super Mario style special jumps with effects
    function enhanceCharacterJumps() {
        // Override jump function for Amine
        if (amineChar) {
            amineChar.superJump = function() {
                // Only jump if not already jumping
                if (this.classList.contains('jumping')) return;
                
                // Add jumping class for animation
                this.classList.add('jumping');
                
                // Super Mario jump sound effect (if music controller exists)
                if (window.musicController && window.musicController.isPlaying()) {
                    playSoundEffect('jump');
                }
                
                // Jump dust particles at character feet
                const rect = this.getBoundingClientRect();
                particleSystem.createParticleBurst({
                    x: rect.left + rect.width / 2,
                    y: rect.bottom,
                    count: 5,
                    spread: 60,
                    speed: 2,
                    size: 8,
                    colors: ['#d3d3d3', '#e0e0e0', '#c0c0c0'],
                    duration: 800,
                    gravity: 0.2
                });
                
                // Remove class after animation
                setTimeout(() => {
                    this.classList.remove('jumping');
                }, 800);
                
                // Trail effect during jump (hearts)
                let jumpHeight = 0;
                let maxHeight = 50;
                let gravity = 0.5;
                let velocity = 5;
                
                const jumpInterval = setInterval(() => {
                    // Calculate jump physics
                    velocity -= gravity;
                    jumpHeight += velocity;
                    
                    // Update position
                    this.style.transform = `translateY(${-jumpHeight}px)`;
                    
                    // Create trail particles at peak of jump
                    if (jumpHeight > maxHeight * 0.7 && jumpHeight < maxHeight) {
                        const charRect = this.getBoundingClientRect();
                        particleSystem.createParticle({
                            x: charRect.left + Math.random() * charRect.width,
                            y: charRect.top + charRect.height / 2,
                            content: '❤️',
                            size: 15,
                            duration: 1000,
                            gravity: 0.05,
                            velocity: { 
                                x: (Math.random() - 0.5) * 2,
                                y: -1 - Math.random()
                            },
                            opacity: 0.8
                        });
                    }
                    
                    // End jump when back to ground
                    if (jumpHeight <= 0) {
                        jumpHeight = 0;
                        this.style.transform = '';
                        clearInterval(jumpInterval);
                        
                        // Landing effect
                        const landingRect = this.getBoundingClientRect();
                        particleSystem.createParticleBurst({
                            x: landingRect.left + landingRect.width / 2,
                            y: landingRect.bottom,
                            count: 3,
                            spread: 40,
                            speed: 2,
                            size: 5,
                            colors: ['#d3d3d3', '#e0e0e0'],
                            duration: 500,
                            gravity: 0.3
                        });
                    }
                }, 20);
            };
        }
        
        // Override jump function for Douae
        if (douaeChar) {
            douaeChar.superJump = function() {
                // Only jump if not already jumping
                if (this.classList.contains('jumping')) return;
                
                // Add jumping class for animation
                this.classList.add('jumping');
                
                // Super Mario jump sound effect (if music controller exists)
                if (window.musicController && window.musicController.isPlaying()) {
                    playSoundEffect('jump');
                }
                
                // Jump dust particles at character feet
                const rect = this.getBoundingClientRect();
                particleSystem.createParticleBurst({
                    x: rect.left + rect.width / 2,
                    y: rect.bottom,
                    count: 5,
                    spread: 60,
                    speed: 2,
                    size: 8,
                    colors: ['#ffccff', '#ffe6ff', '#ffb3ff'],
                    duration: 800,
                    gravity: 0.2
                });
                
                // Remove class after animation
                setTimeout(() => {
                    this.classList.remove('jumping');
                }, 800);
                
                // Trail effect during jump (hearts with sparkles)
                let jumpHeight = 0;
                let maxHeight = 50;
                let gravity = 0.5;
                let velocity = 5;
                
                const jumpInterval = setInterval(() => {
                    // Calculate jump physics
                    velocity -= gravity;
                    jumpHeight += velocity;
                    
                    // Update position
                    this.style.transform = `translateY(${-jumpHeight}px)`;
                    
                    // Create trail particles at peak of jump
                    if (jumpHeight > maxHeight * 0.7 && jumpHeight < maxHeight) {
                        const charRect = this.getBoundingClientRect();
                        
                        // Alternate between hearts and sparkles
                        const content = Math.random() > 0.5 ? '❤️' : '✨';
                        
                        particleSystem.createParticle({
                            x: charRect.left + Math.random() * charRect.width,
                            y: charRect.top + charRect.height / 2,
                            content: content,
                            size: 15,
                            duration: 1000,
                            gravity: 0.05,
                            velocity: { 
                                x: (Math.random() - 0.5) * 2,
                                y: -1 - Math.random()
                            },
                            opacity: 0.8
                        });
                    }
                    
                    // End jump when back to ground
                    if (jumpHeight <= 0) {
                        jumpHeight = 0;
                        this.style.transform = '';
                        clearInterval(jumpInterval);
                        
                        // Landing effect
                        const landingRect = this.getBoundingClientRect();
                        particleSystem.createParticleBurst({
                            x: landingRect.left + landingRect.width / 2,
                            y: landingRect.bottom,
                            count: 3,
                            spread: 40,
                            speed: 2,
                            size: 5,
                            colors: ['#ffccff', '#ffe6ff'],
                            duration: 500,
                            gravity: 0.3
                        });
                    }
                }, 20);
            };
        }
        
        // Add jump triggers
        document.addEventListener('keydown', function(e) {
            // Jump based on key press
            if (e.key === 'ArrowUp' && amineChar && amineChar.superJump) {
                amineChar.superJump();
            }
            
            if (e.key === 'w' && douaeChar && douaeChar.superJump) {
                douaeChar.superJump();
            }
        });
        
        // Add click to jump
        document.addEventListener('click', function(e) {
            // Don't trigger on UI elements
            if (e.target.closest('.music-control, .lyrics-toggle, .lyrics-container')) {
                return;
            }
            
            // Find closest character to click
            const amineRect = amineChar ? amineChar.getBoundingClientRect() : null;
            const douaeRect = douaeChar ? douaeChar.getBoundingClientRect() : null;
            
            // Calculate distances
            const clickX = e.clientX;
            const clickY = e.clientY;
            let amineDistance = Infinity;
            let douaeDistance = Infinity;
            
            if (amineRect) {
                const amineX = amineRect.left + amineRect.width / 2;
                const amineY = amineRect.top + amineRect.height / 2;
                amineDistance = Math.hypot(clickX - amineX, clickY - amineY);
            }
            
            if (douaeRect) {
                const douaeX = douaeRect.left + douaeRect.width / 2;
                const douaeY = douaeRect.top + douaeRect.height / 2;
                douaeDistance = Math.hypot(clickX - douaeX, clickY - douaeY);
            }
            
            // Make the closest character jump
            if (amineDistance < douaeDistance && amineChar && amineChar.superJump) {
                amineChar.superJump();
            } else if (douaeChar && douaeChar.superJump) {
                douaeChar.superJump();
            }
        });
    }
    
    // Super Mario style powerups
    function createPowerups() {
        // Powerup types
        const powerupTypes = [
            {
                name: 'star',
                emoji: '⭐',
                effect: 'invincibility',
                duration: 8000,
                color: '#ffdd00',
                collectSound: 'powerup',
                applyEffect: function(character) {
                    // Make character temporarily invincible with star effect
                    character.style.animation = 'star-power 0.3s infinite';
                    character.style.filter = 'brightness(1.5) hue-rotate(180deg)';
                    
                    // Speed up character
                    character.dataset.speedMultiplier = '1.5';
                    
                    // Star effect trail
                    const starInterval = setInterval(() => {
                        const rect = character.getBoundingClientRect();
                        
                        // Create star trail
                        particleSystem.createParticle({
                            x: rect.left + Math.random() * rect.width,
                            y: rect.top + rect.height * 0.7,
                            content: '⭐',
                            size: 15,
                            duration: 1000,
                            gravity: 0.05,
                            velocity: { 
                                x: (Math.random() - 0.5) * 2,
                                y: -1
                            },
                            opacity: 0.7
                        });
                    }, 200);
                    
                    // Cleanup after duration
                    setTimeout(() => {
                        character.style.animation = '';
                        character.style.filter = '';
                        character.dataset.speedMultiplier = '1';
                        clearInterval(starInterval);
                    }, this.duration);
                }
            },
            {
                name: 'flower',
                emoji: '🌹',
                effect: 'love-power',
                duration: 10000,
                color: '#ff69b4',
                collectSound: 'powerup',
                applyEffect: function(character) {
                    // Love power effect
                    character.style.filter = 'drop-shadow(0 0 5px #ff69b4)';
                    
                    // Add heart-throwing ability
                    character.dataset.canThrowHearts = 'true';
                    
                    // Show hearts around character
                    const heartInterval = setInterval(() => {
                        const rect = character.getBoundingClientRect();
                        
                        // Create floating heart
                        particleSystem.createParticle({
                            x: rect.left + Math.random() * rect.width,
                            y: rect.top + Math.random() * rect.height,
                            content: '❤️',
                            size: 15,
                            duration: 2000,
                            gravity: -0.05, // Float upward
                            velocity: { 
                                x: (Math.random() - 0.5) * 1,
                                y: -1
                            },
                            opacity: 0.8
                        });
                    }, 500);
                    
                    // Cleanup after duration
                    setTimeout(() => {
                        character.style.filter = '';
                        character.dataset.canThrowHearts = 'false';
                        clearInterval(heartInterval);
                    }, this.duration);
                }
            },
            {
                name: 'mushroom',
                emoji: '🍄',
                effect: 'growth',
                duration: 7000,
                color: '#ff4500',
                collectSound: 'powerup',
                applyEffect: function(character) {
                    // Growth effect - make character larger
                    character.style.transform = 'scale(1.3)';
                    character.style.zIndex = '22'; // Ensure character is in front
                    
                    // Add glow effect
                    character.style.filter = 'brightness(1.2)';
                    
                    // Growth particles
                    const rect = character.getBoundingClientRect();
                    particleSystem.createParticleBurst({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                        count: 20,
                        spread: 360,
                        speed: 3,
                        size: 8,
                        colors: ['#ffaaaa', '#ffdd00', '#ff8800'],
                        duration: 1500,
                        gravity: 0.05
                    });
                    
                    // Cleanup after duration
                    setTimeout(() => {
                        // Shrink back with animation
                        character.style.transition = 'transform 0.5s ease-out';
                        character.style.transform = 'scale(1)';
                        character.style.filter = '';
                        
                        // Reset z-index after animation
                        setTimeout(() => {
                            character.style.zIndex = '';
                            character.style.transition = '';
                        }, 500);
                    }, this.duration);
                }
            }
        ];
        
        // Create a random powerup at a random position
        function spawnPowerup() {
            // Select random powerup type
            const powerupType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
            
            // Create powerup element
            const powerup = document.createElement('div');
            powerup.classList.add('powerup');
            powerup.dataset.type = powerupType.name;
            powerup.style.position = 'absolute';
            powerup.style.width = '40px';
            powerup.style.height = '40px';
            powerup.style.fontSize = '30px';
            powerup.style.display = 'flex';
            powerup.style.justifyContent = 'center';
            powerup.style.alignItems = 'center';
            powerup.style.cursor = 'pointer';
            powerup.style.zIndex = '15';
            powerup.style.filter = 'drop-shadow(0 0 5px ' + powerupType.color + ')';
            powerup.innerHTML = powerupType.emoji;
            
            // Position randomly but within view
            const padding = 100;
            powerup.style.left = (padding + Math.random() * (window.innerWidth - padding * 2)) + 'px';
            powerup.style.top = (padding + Math.random() * (window.innerHeight / 2 - padding * 2)) + 'px';
            
            // Add bounce animation
            powerup.style.animation = 'float 1.5s infinite ease-in-out';
            
            // Add to page
            document.body.appendChild(powerup);
            
            // Make powerup collectible
            powerup.addEventListener('click', function() {
                collectPowerup(powerup, powerupType);
            });
            
            // Auto-remove after some time
            setTimeout(() => {
                if (powerup.parentNode) {
                    // Flash before disappearing
                    powerup.style.animation = 'powerup-disappear 1s forwards';
                    
                    setTimeout(() => {
                        if (powerup.parentNode) {
                            powerup.parentNode.removeChild(powerup);
                        }
                    }, 1000);
                }
            }, 15000);
            
            return powerup;
        }
        
        // Collect a powerup
        function collectPowerup(powerupElement, powerupType) {
            // Play sound effect
            playSoundEffect(powerupType.collectSound);
            
            // Create collection animation
            const rect = powerupElement.getBoundingClientRect();
            particleSystem.createParticleBurst({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                count: 15,
                spread: 360,
                speed: 4,
                size: 10,
                colors: [powerupType.color, '#ffffff', '#ffff00'],
                duration: 1200,
                gravity: 0.05
            });
            
            // Remove powerup element
            if (powerupElement.parentNode) {
                powerupElement.parentNode.removeChild(powerupElement);
            }
            
            // Apply effect to nearest character
            const amineRect = amineChar ? amineChar.getBoundingClientRect() : null;
            const douaeRect = douaeChar ? douaeChar.getBoundingClientRect() : null;
            
            // Calculate distances to powerup
            const powerupX = rect.left + rect.width / 2;
            const powerupY = rect.top + rect.height / 2;
            let amineDistance = Infinity;
            let douaeDistance = Infinity;
            
            if (amineRect) {
                const amineX = amineRect.left + amineRect.width / 2;
                const amineY = amineRect.top + amineRect.height / 2;
                amineDistance = Math.hypot(powerupX - amineX, powerupY - amineY);
            }
            
            if (douaeRect) {
                const douaeX = douaeRect.left + douaeRect.width / 2;
                const douaeY = douaeRect.top + douaeRect.height / 2;
                douaeDistance = Math.hypot(powerupX - douaeX, powerupY - douaeY);
            }
            
            // Apply to closest character
            if (amineDistance < douaeDistance && amineChar) {
                powerupType.applyEffect(amineChar);
            } else if (douaeChar) {
                powerupType.applyEffect(douaeChar);
            }
            
            // Set global powerup active state
            enhancedAnimations.powerupActive = true;
            
            // Reset after duration
            setTimeout(() => {
                enhancedAnimations.powerupActive = false;
            }, powerupType.duration);
        }
        
        // Periodically spawn powerups
        function startPowerupSystem() {
            // Initial powerup
            setTimeout(() => {
                spawnPowerup();
            }, 10000);
            
            // Spawn new powerups periodically
            setInterval(() => {
                // Only spawn if no active powerup and there are no other powerups
                if (!enhancedAnimations.powerupActive && 
                    document.querySelectorAll('.powerup').length < 1 &&
                    Math.random() < 0.7) {
                    spawnPowerup();
                }
            }, 20000);
        }
        
        // Start the powerup system
        startPowerupSystem();
    }
    
    // Add camera effects (shake, zoom, pan)
    function setupCameraEffects() {
        // Create a camera container to wrap the entire page
        const cameraContainer = document.createElement('div');
        cameraContainer.id = 'camera-container';
        cameraContainer.style.position = 'fixed';
        cameraContainer.style.top = '0';
        cameraContainer.style.left = '0';
        cameraContainer.style.width = '100%';
        cameraContainer.style.height = '100%';
        cameraContainer.style.overflow = 'hidden';
        cameraContainer.style.zIndex = '1';
        cameraContainer.style.transformOrigin = 'center center';
        
        // Move body contents into camera container
        while (body.firstChild) {
            cameraContainer.appendChild(body.firstChild);
        }
        
        // Add camera container to body
        body.appendChild(cameraContainer);
        
        // Camera effect functions
        return {
            shake: function(intensity = 5, duration = 500) {
                const start = Date.now();
                const shakeInterval = setInterval(() => {
                    const elapsed = Date.now() - start;
                    if (elapsed >= duration) {
                        clearInterval(shakeInterval);
                        cameraContainer.style.transform = '';
                        return;
                    }
                    
                    // Reduce intensity as we approach the end
                    const currentIntensity = intensity * (1 - elapsed / duration);
                    const xOffset = (Math.random() - 0.5) * currentIntensity;
                    const yOffset = (Math.random() - 0.5) * currentIntensity;
                    
                    cameraContainer.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                }, 30);
            },
            
            zoom: function(scale = 1.1, duration = 1000, center = { x: 0.5, y: 0.5 }) {
                // Store original transform
                const originalTransform = cameraContainer.style.transform;
                
                // Calculate pixel coordinates for transform origin
                const originX = center.x * window.innerWidth;
                const originY = center.y * window.innerHeight;
                
                // Set transform origin
                cameraContainer.style.transformOrigin = `${originX}px ${originY}px`;
                
                // Start animation
                const startScale = 1;
                const startTime = Date.now();
                
                const zoomInterval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease in-out function
                    const easeProgress = progress < 0.5 
                        ? 2 * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                    
                    // Calculate current scale
                    const currentScale = startScale + (scale - startScale) * easeProgress;
                    
                    // Apply scale transform
                    cameraContainer.style.transform = `${originalTransform} scale(${currentScale})`;
                    
                    // End animation
                    if (progress >= 1) {
                        clearInterval(zoomInterval);
                        
                        // Reset back to normal over time
                        setTimeout(() => {
                            cameraContainer.style.transition = 'transform 1s ease-out';
                            cameraContainer.style.transform = originalTransform;
                            
                            // Clear transition after it's done
                            setTimeout(() => {
                                cameraContainer.style.transition = '';
                            }, 1000);
                        }, 500);
                    }
                }, 16);
            },
            
            pan: function(targetX = 0.5, targetY = 0.5, duration = 1000) {
                // Calculate how much to move
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                
                const xOffset = (windowWidth * 0.5 - windowWidth * targetX) * 0.2;
                const yOffset = (windowHeight * 0.5 - windowHeight * targetY) * 0.2;
                
                // Start animation
                const startTime = Date.now();
                const startX = 0;
                const startY = 0;
                
                const panInterval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease in-out function
                    const easeProgress = progress < 0.5 
                        ? 2 * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                    
                    // Calculate current position
                    const currentX = startX + (xOffset - startX) * easeProgress;
                    const currentY = startY + (yOffset - startY) * easeProgress;
                    
                    // Apply transform
                    cameraContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
                    
                    // End animation
                    if (progress >= 1) {
                        clearInterval(panInterval);
                        
                        // Reset back to normal over time
                        setTimeout(() => {
                            cameraContainer.style.transition = 'transform 1s ease-out';
                            cameraContainer.style.transform = '';
                            
                            // Clear transition after it's done
                            setTimeout(() => {
                                cameraContainer.style.transition = '';
                            }, 1000);
                        }, 1000);
                    }
                }, 16);
            }
        };
    }
    
    // Setup weather effects
    function setupWeatherEffects() {
        // Create weather container
        const weatherContainer = document.createElement('div');
        weatherContainer.classList.add('weather-container');
        weatherContainer.style.position = 'fixed';
        weatherContainer.style.top = '0';
        weatherContainer.style.left = '0';
        weatherContainer.style.width = '100%';
        weatherContainer.style.height = '100%';
        weatherContainer.style.pointerEvents = 'none';
        weatherContainer.style.zIndex = '5';
        weatherContainer.style.overflow = 'hidden';
        
        document.body.appendChild(weatherContainer);
        
        // Available weather types
        const weatherTypes = {
            // Heart rain
            heartRain: {
                name: 'Heart Rain',
                start: function() {
                    const rainInterval = setInterval(() => {
                        if (enhancedAnimations.currentWeather !== 'heartRain') {
                            clearInterval(rainInterval);
                            return;
                        }
                        
                        // Create a random heart
                        const heart = document.createElement('div');
                        heart.innerHTML = '❤️';
                        heart.style.position = 'absolute';
                        heart.style.left = Math.random() * 100 + '%';
                        heart.style.top = '-30px';
                        heart.style.fontSize = (10 + Math.random() * 15) + 'px';
                        heart.style.opacity = 0.7 + Math.random() * 0.3;
                        heart.style.zIndex = '10';
                        heart.style.pointerEvents = 'none';
                        
                        weatherContainer.appendChild(heart);
                        
                        // Random rotation
                        const rotation = (Math.random() - 0.5) * 30;
                        heart.style.transform = `rotate(${rotation}deg)`;
                        
                        // Random speed
                        const speed = 3 + Math.random() * 5;
                        const horizontalDrift = (Math.random() - 0.5) * 2;
                        
                        // Animate falling
                        let posY = -30;
                        let posX = parseFloat(heart.style.left);
                        
                        const fallInterval = setInterval(() => {
                            posY += speed;
                            posX += horizontalDrift * 0.1;
                            
                            heart.style.top = posY + 'px';
                            heart.style.left = posX + '%';
                            
                            // Remove when out of view
                            if (posY > window.innerHeight) {
                                clearInterval(fallInterval);
                                if (heart.parentNode) {
                                    heart.parentNode.removeChild(heart);
                                }
                            }
                        }, 30);
                    }, 300);
                },
                stop: function() {
                    // Remove all hearts
                    const hearts = weatherContainer.querySelectorAll('div');
                    hearts.forEach(heart => {
                        heart.style.transition = 'opacity 1s';
                        heart.style.opacity = '0';
                        
                        setTimeout(() => {
                            if (heart.parentNode) {
                                heart.parentNode.removeChild(heart);
                            }
                        }, 1000);
                    });
                }
            },
            
            // Star sparkles
            starSparkle: {
                name: 'Star Sparkles',
                start: function() {
                    const sparkleInterval = setInterval(() => {
                        if (enhancedAnimations.currentWeather !== 'starSparkle') {
                            clearInterval(sparkleInterval);
                            return;
                        }
                        
                        // Create a random star
                        const star = document.createElement('div');
                        star.innerHTML = '✨';
                        star.style.position = 'absolute';
                        star.style.left = Math.random() * 100 + '%';
                        star.style.top = Math.random() * 100 + '%';
                        star.style.fontSize = (10 + Math.random() * 10) + 'px';
                        star.style.opacity = '0';
                        star.style.zIndex = '10';
                        star.style.pointerEvents = 'none';
                        star.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
                        
                        weatherContainer.appendChild(star);
                        
                        // Appear with a twinkle
                        setTimeout(() => {
                            star.style.opacity = '1';
                            star.style.transform = 'scale(1.2)';
                            
                            // Fade out
                            setTimeout(() => {
                                star.style.opacity = '0';
                                star.style.transform = 'scale(0.8)';
                                
                                // Remove from DOM
                                setTimeout(() => {
                                    if (star.parentNode) {
                                        star.parentNode.removeChild(star);
                                    }
                                }, 300);
                            }, 700 + Math.random() * 1000);
                        }, 10);
                    }, 200);
                },
                stop: function() {
                    // Remove all stars
                    const stars = weatherContainer.querySelectorAll('div');
                    stars.forEach(star => {
                        star.style.transition = 'opacity 0.5s';
                        star.style.opacity = '0';
                        
                        setTimeout(() => {
                            if (star.parentNode) {
                                star.parentNode.removeChild(star);
                            }
                        }, 500);
                    });
                }
            },
            
            // Clear weather - no special effects
            clear: {
                name: 'Clear',
                start: function() {
                    // Nothing to start
                },
                stop: function() {
                    // Nothing to stop
                }
            }
        };
        
        // Change weather
        function changeWeather(weatherType) {
            // Stop current weather
            const currentWeather = weatherTypes[enhancedAnimations.currentWeather];
            if (currentWeather) {
                currentWeather.stop();
            }
            
            // Start new weather
            enhancedAnimations.currentWeather = weatherType;
            const newWeather = weatherTypes[weatherType];
            if (newWeather) {
                newWeather.start();
            }
        }
        
        // Initialize with clear weather
        changeWeather('clear');
        
        // Periodically change weather for variety
        setInterval(() => {
            if (Math.random() < 0.2) {
                // 20% chance to change weather
                const weatherOptions = Object.keys(weatherTypes);
                const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
                changeWeather(randomWeather);
                
                // Return to clear weather after some time
                setTimeout(() => {
                    if (enhancedAnimations.currentWeather !== 'clear') {
                        changeWeather('clear');
                    }
                }, 25000);
            }
        }, 30000);
        
        // Return weather control API
        return {
            changeWeather: changeWeather,
            getWeatherTypes: function() {
                return Object.keys(weatherTypes);
            }
        };
    }
    
    // Sound effects system
    function createSoundEffects() {
        // Sound effect mapping
        const soundEffects = {
            'jump': {
                url: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3', // Use your actual jump sound URL
                volume: 0.3
            },
            'powerup': {
                url: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3', // Use your actual powerup sound URL
                volume: 0.4
            },
            'coin': {
                url: 'https://assets.mixkit.co/active_storage/sfx/131/131-preview.mp3', // Use your actual coin sound URL
                volume: 0.3
            }
        };
        
        // Audio elements cache
        const audioElements = {};
        
        // Preload sounds
        function preloadSounds() {
            for (const sound in soundEffects) {
                if (soundEffects[sound].url) {
                    const audio = new Audio();
                    audio.src = soundEffects[sound].url;
                    audio.volume = soundEffects[sound].volume;
                    audio.preload = 'auto';
                    audioElements[sound] = audio;
                }
            }
        }
        
        // Play a sound effect
        function playSound(soundName) {
            // Only play if music is enabled
            if (window.musicController && !window.musicController.isPlaying()) {
                return;
            }
            
            if (audioElements[soundName]) {
                // Clone the audio to allow overlapping sounds
                const soundClone = audioElements[soundName].cloneNode();
                soundClone.play();
                
                // Clean up after playing
                soundClone.onended = function() {
                    soundClone.onended = null;
                    soundClone.src = '';
                };
            }
        }
        
        // Initialize
        preloadSounds();
        
        // Make play function global
        window.playSoundEffect = playSound;
    }
    
    // Setup double character choreography
    function setupCharacterChoreography() {
        // Define dance moves
        const danceMoves = {
            synchronizedJump: function() {
                if (amineChar && douaeChar) {
                    // Both characters jump at the same time
                    if (amineChar.superJump) amineChar.superJump();
                    
                    setTimeout(() => {
                        if (douaeChar.superJump) douaeChar.superJump();
                    }, 100);
                }
            },
            
            meetInMiddle: function() {
                if (amineChar && douaeChar) {
                    // Get current positions
                    const amineRect = amineChar.getBoundingClientRect();
                    const douaeRect = douaeChar.getBoundingClientRect();
                    
                    // Calculate center position
                    const centerX = window.innerWidth / 2;
                    
                    // Move characters to center
                    const amineTargetX = centerX - 70; // Slightly left of center
                    const douaeTargetX = centerX + 30; // Slightly right of center
                    
                    amineChar.style.transition = 'left 1.5s ease-in-out';
                    douaeChar.style.transition = 'right 1.5s ease-in-out';
                    
                    amineChar.style.left = amineTargetX + 'px';
                    douaeChar.style.right = (window.innerWidth - douaeTargetX) + 'px';
                    
                    // Special heart effect when they meet
                    setTimeout(() => {
                        // Heart effect between characters
                        const combinedRect = {
                            left: amineTargetX,
                            top: Math.min(amineRect.top, douaeRect.top),
                            right: douaeTargetX,
                            bottom: Math.max(amineRect.bottom, douaeRect.bottom)
                        };
                        
                        const centerX = (combinedRect.left + combinedRect.right) / 2;
                        const centerY = (combinedRect.top + combinedRect.bottom) / 2;
                        
                        // Create heart explosion
                        particleSystem.createParticleBurst({
                            x: centerX,
                            y: centerY,
                            count: 15,
                            spread: 360,
                            speed: 3,
                            content: '❤️',
                            duration: 2000,
                            gravity: 0.05
                        });
                        
                        // Camera effects
                        if (window.cameraEffects && enhancedAnimations.enabledEffects.cameraEffects) {
                            window.cameraEffects.zoom(1.1, 1000, { x: 0.5, y: 0.4 });
                        }
                        
                        // Reset positions after effect
                        setTimeout(() => {
                            amineChar.style.transition = '';
                            douaeChar.style.transition = '';
                        }, 2000);
                    }, 1500);
                }
            },
            
            spinningHearts: function() {
                if (amineChar && douaeChar) {
                    // Create a circle of hearts around both characters
                    const amineRect = amineChar.getBoundingClientRect();
                    const douaeRect = douaeChar.getBoundingClientRect();
                    
                    // Calculate the center between characters
                    const centerX = (amineRect.left + amineRect.width / 2 + 
                                    douaeRect.left + douaeRect.width / 2) / 2;
                    const centerY = (amineRect.top + amineRect.height / 2 + 
                                    douaeRect.top + douaeRect.height / 2) / 2;
                    
                    // Create spinning hearts
                    const heartCount = 12;
                    const radius = 100;
                    
                    for (let i = 0; i < heartCount; i++) {
                        const angle = (i / heartCount) * Math.PI * 2;
                        const heart = document.createElement('div');
                        heart.innerHTML = '❤️';
                        heart.style.position = 'absolute';
                        heart.style.fontSize = '24px';
                        heart.style.left = centerX + 'px';
                        heart.style.top = centerY + 'px';
                        heart.style.zIndex = '50';
                        heart.style.opacity = '0';
                        heart.style.transform = 'translate(-50%, -50%)';
                        heart.style.transition = 'opacity 0.5s';
                        
                        document.body.appendChild(heart);
                        
                        // Animate in an orbit
                        setTimeout(() => {
                            heart.style.opacity = '1';
                            
                            let currentAngle = angle;
                            const orbitSpeed = 0.01;
                            const orbitTime = 5000;
                            const startTime = Date.now();
                            
                            const orbitInterval = setInterval(() => {
                                const elapsed = Date.now() - startTime;
                                
                                if (elapsed >= orbitTime) {
                                    clearInterval(orbitInterval);
                                    heart.style.opacity = '0';
                                    
                                    setTimeout(() => {
                                        if (heart.parentNode) {
                                            heart.parentNode.removeChild(heart);
                                        }
                                    }, 500);
                                    return;
                                }
                                
                                // Update angle
                                currentAngle += orbitSpeed;
                                
                                // Calculate position
                                const x = centerX + Math.cos(currentAngle) * radius;
                                const y = centerY + Math.sin(currentAngle) * radius;
                                
                                // Update position
                                heart.style.left = x + 'px';
                                heart.style.top = y + 'px';
                            }, 16);
                        }, i * 100);
                    }
                }
            }
        };
        
        // Schedule random choreography
        function scheduleRandomChoreography() {
            if (!enhancedAnimations.autoAnimationsEnabled) return;
            
            // Pick a random move
            const moves = Object.keys(danceMoves);
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            
            // Execute the move
            danceMoves[randomMove]();
            
            // Schedule next move
            const nextTime = 15000 + Math.random() * 30000;
            setTimeout(scheduleRandomChoreography, nextTime);
        }
        
        // Start choreography after a delay
        setTimeout(() => {
            scheduleRandomChoreography();
        }, 10000);
        
        // Return choreography API
        return {
            performMove: function(moveName) {
                if (danceMoves[moveName]) {
                    danceMoves[moveName]();
                }
            },
            
            getAvailableMoves: function() {
                return Object.keys(danceMoves);
            }
        };
    }
    
    // Initialize enhanced animations
    function initEnhancedAnimations() {
        // Setup all enhanced animations
        enhanceCharacterJumps();
        createPowerups();
        const cameraEffects = setupCameraEffects();
        const weatherEffects = setupWeatherEffects();
        createSoundEffects();
        const choreography = setupCharacterChoreography();
        
        // Make APIs globally available
        window.cameraEffects = cameraEffects;
        window.weatherEffects = weatherEffects;
        window.choreography = choreography;
        
        // Create global control object
        window.enhancedAnimations = {
            // Toggle specific effects
            toggleEffect: function(effectName, enabled) {
                if (enhancedAnimations.enabledEffects.hasOwnProperty(effectName)) {
                    enhancedAnimations.enabledEffects[effectName] = enabled;
                }
            },
            
            // Toggle all auto animations
            toggleAutoAnimations: function(enabled) {
                enhancedAnimations.autoAnimationsEnabled = enabled;
            },
            
            // Get current animation state
            getState: function() {
                return { ...enhancedAnimations };
            },
            
            // Create particle burst at position
            createParticleBurst: function(x, y, options = {}) {
                particleSystem.createParticleBurst({
                    x: x,
                    y: y,
                    ...options
                });
            }
        };
    }
    
    // Start all enhanced animations
    initEnhancedAnimations();
});
