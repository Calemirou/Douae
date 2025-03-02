// animations.js - Additional animations for the romantic webpage

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    const container = document.querySelector('.container');
    const h1 = document.querySelector('h1');
    const message = document.querySelector('.message');
    
    // Animation settings
    const animationSettings = {
        butterflyCount: 8,
        heartbeatSpeed: 2000,
        specialEffectsEnabled: true,
        currentScene: 'intro',
        scenes: ['intro', 'meetup', 'romance', 'finale'],
        animationsQueue: []
    };
    
    // Create butterflies that follow a path
    function createButterflies() {
        const butterflyContainer = document.createElement('div');
        butterflyContainer.classList.add('butterflies-container');
        document.body.appendChild(butterflyContainer);
        
        for (let i = 0; i < animationSettings.butterflyCount; i++) {
            const butterfly = document.createElement('div');
            butterfly.classList.add('butterfly');
            
            // Create wings
            const leftWing = document.createElement('div');
            leftWing.classList.add('butterfly-wing', 'left');
            
            const rightWing = document.createElement('div');
            rightWing.classList.add('butterfly-wing', 'right');
            
            // Random colors for butterflies
            const hue = Math.floor(Math.random() * 60) + 180; // Blue to purple range
            const lightness = Math.floor(Math.random() * 20) + 70; // Light colors
            
            leftWing.style.background = `hsla(${hue}, 100%, ${lightness}%, 0.7)`;
            rightWing.style.background = `hsla(${hue}, 100%, ${lightness}%, 0.9)`;
            
            // Add wings to butterfly
            butterfly.appendChild(leftWing);
            butterfly.appendChild(rightWing);
            
            // Position randomly
            butterfly.style.left = Math.random() * 100 + 'vw';
            butterfly.style.top = Math.random() * 100 + 'vh';
            
            // Add butterfly to container
            butterflyContainer.appendChild(butterfly);
            
            // Animate butterfly
            animateButterfly(butterfly);
        }
    }
    
    // Animate a butterfly along a random path
    function animateButterfly(butterfly) {
        // Path properties
        const pathPoints = 5; // Number of points in the path
        const path = [];
        
        // Generate random bezier path
        for (let i = 0; i < pathPoints; i++) {
            path.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: 0.8 + Math.random() * 0.4,
                duration: 5 + Math.random() * 5
            });
        }
        
        // Starting position
        let currentPoint = 0;
        let lastTimestamp = 0;
        let progress = 0;
        
        // Animation function
        function moveButterfly(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const elapsed = timestamp - lastTimestamp;
            
            // Update progress
            progress += elapsed / (path[currentPoint].duration * 1000);
            
            if (progress >= 1) {
                // Move to next point
                currentPoint = (currentPoint + 1) % pathPoints;
                progress = 0;
            }
            
            // Calculate next and previous points
            const prevPoint = (currentPoint + pathPoints - 1) % pathPoints;
            const nextPoint = (currentPoint + 1) % pathPoints;
            
            // Calculate bezier curve position
            const startX = path[prevPoint].x;
            const startY = path[prevPoint].y;
            const endX = path[currentPoint].x;
            const endY = path[currentPoint].y;
            const nextX = path[nextPoint].x;
            const nextY = path[nextPoint].y;
            
            // Bezier control points
            const cp1x = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 20;
            const cp1y = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * 20;
            const cp2x = endX + (nextX - endX) * 0.5 + (Math.random() - 0.5) * 20;
            const cp2y = endY + (nextY - endY) * 0.5 + (Math.random() - 0.5) * 20;
            
            // Calculate current position using cubic bezier
            const t = progress;
            const u = 1 - t;
            const tt = t * t;
            const uu = u * u;
            const uuu = uu * u;
            const ttt = tt * t;
            
            let x = uuu * startX;
            x += 3 * uu * t * cp1x;
            x += 3 * u * tt * cp2x;
            x += ttt * endX;
            
            let y = uuu * startY;
            y += 3 * uu * t * cp1y;
            y += 3 * u * tt * cp2y;
            y += ttt * endY;
            
            // Apply position and scaling
            const scale = path[prevPoint].scale * (1 - progress) + path[currentPoint].scale * progress;
            butterfly.style.transform = `translate(${x}vw, ${y}vh) scale(${scale})`;
            
            // Add slight rotation based on direction
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            butterfly.style.rotate = (angle + 90) + 'deg';
            
            // Store timestamp
            lastTimestamp = timestamp;
            
            // Continue animation
            requestAnimationFrame(moveButterfly);
        }
        
        // Start animation
        requestAnimationFrame(moveButterfly);
    }
    
    // Create heart beat animation for main heart
    function setupHeartbeat() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Create heart halves
        const leftHalf = document.createElement('div');
        leftHalf.classList.add('heart-half', 'left');
        
        const rightHalf = document.createElement('div');
        rightHalf.classList.add('heart-half', 'right');
        
        // Create front and back layers for 3D effect
        const frontLayer = document.createElement('div');
        frontLayer.classList.add('heart-front');
        
        const backLayer = document.createElement('div');
        backLayer.classList.add('heart-back');
        
        // Create shine effect
        const shine = document.createElement('div');
        shine.classList.add('heart-shine');
        
        // Assemble heart
        heart.appendChild(leftHalf);
        heart.appendChild(rightHalf);
        heart.appendChild(frontLayer);
        heart.appendChild(backLayer);
        heart.appendChild(shine);
        
        // Add heart to container
        container.insertBefore(heart, message);
        
        // Make heart clickable to toggle color
        heart.addEventListener('click', function() {
            if (heart.classList.contains('pink')) {
                heart.classList.remove('pink');
            } else {
                heart.classList.add('pink');
                
                // Create heart explosion
                heartExplosion(heart);
            }
        });
        
        // Automatic heartbeat
        setInterval(() => {
            const intensity = Math.random();
            if (intensity > 0.7) {
                // Strong heartbeat
                heart.style.animation = 'heartbeat 0.6s';
                setTimeout(() => {
                    heart.style.animation = 'float 3s ease-in-out infinite';
                }, 600);
            } else {
                // Normal float animation
                heart.style.animation = 'float 3s ease-in-out infinite';
            }
        }, animationSettings.heartbeatSpeed);
    }
    
    // Heart explosion effect for main heart
    function heartExplosion(sourceHeart) {
        const heartRect = sourceHeart.getBoundingClientRect();
        const centerX = heartRect.left + heartRect.width / 2;
        const centerY = heartRect.top + heartRect.height / 2;
        
        // Create mini hearts that fly out
        for (let i = 0; i < 15; i++) {
            const miniHeart = document.createElement('div');
            miniHeart.innerHTML = '❤️';
            miniHeart.style.position = 'fixed';
            miniHeart.style.left = centerX + 'px';
            miniHeart.style.top = centerY + 'px';
            miniHeart.style.transform = 'translate(-50%, -50%)';
            miniHeart.style.fontSize = (10 + Math.random() * 10) + 'px';
            miniHeart.style.zIndex = '1000';
            miniHeart.style.opacity = '1';
            miniHeart.style.pointerEvents = 'none';
            
            document.body.appendChild(miniHeart);
            
            // Random direction and speed
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 150;
            const duration = 0.5 + Math.random() * 1;
            
            // Calculate end position
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            // Animate the heart
            miniHeart.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0.5)',
                    opacity: 0.8
                },
                { 
                    transform: `translate(calc(${endX - centerX}px - 50%), calc(${endY - centerY}px - 50%)) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
            });
            
            // Remove heart after animation
            setTimeout(() => {
                if (miniHeart.parentNode) {
                    miniHeart.parentNode.removeChild(miniHeart);
                }
            }, duration * 1000);
        }
    }
    
    // Create coin block Super Mario style
    function createCoinBlock() {
        const coinBlock = document.createElement('div');
        coinBlock.classList.add('coin-block');
        coinBlock.style.position = 'absolute';
        coinBlock.style.width = '50px';
        coinBlock.style.height = '50px';
        coinBlock.style.backgroundColor = '#E6B422';
        coinBlock.style.boxShadow = '0 0 10px #FFD700';
        coinBlock.style.borderRadius = '10px';
        coinBlock.style.display = 'flex';
        coinBlock.style.justifyContent = 'center';
        coinBlock.style.alignItems = 'center';
        coinBlock.style.color = 'white';
        coinBlock.style.fontWeight = 'bold';
        coinBlock.style.fontSize = '30px';
        coinBlock.innerHTML = '?';
        coinBlock.style.cursor = 'pointer';
        
        // Position randomly but within view
        const padding = 100;
        coinBlock.style.left = (padding + Math.random() * (window.innerWidth - padding * 2)) + 'px';
        coinBlock.style.top = (padding + Math.random() * (window.innerHeight / 2 - padding * 2)) + 'px';
        
        document.body.appendChild(coinBlock);
        
        // Make block hittable
        coinBlock.addEventListener('click', function() {
            hitCoinBlock(coinBlock);
        });
        
        // Periodically animate the block to draw attention
        setInterval(() => {
            if (Math.random() > 0.7) {
                coinBlock.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-5px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            }
        }, 3000);
        
        return coinBlock;
    }
    
    // Hit animation for coin block
    function hitCoinBlock(block) {
        // Prevent multiple hits at once
        if (block.dataset.hitting === 'true') return;
        block.dataset.hitting = 'true';
        
        // Block bounce animation
        block.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-15px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
        });
        
        // Create coin animation
        const blockRect = block.getBoundingClientRect();
        const coin = document.createElement('div');
        coin.style.position = 'absolute';
        coin.style.left = (blockRect.left + blockRect.width / 2) + 'px';
        coin.style.top = blockRect.top + 'px';
        coin.style.width = '30px';
        coin.style.height = '30px';
        coin.style.backgroundColor = '#FFD700';
        coin.style.borderRadius = '50%';
        coin.style.transform = 'translateX(-50%)';
        coin.style.zIndex = '100';
        coin.style.boxShadow = '0 0 10px #FFFF00';
        
        document.body.appendChild(coin);
        
        // Coin jump animation
        coin.animate([
            { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
            { transform: 'translateX(-50%) translateY(-60px)', opacity: 1 },
            { transform: 'translateX(-50%) translateY(-30px)', opacity: 0 }
        ], {
            duration: 700,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        });
        
        // Show special effect after coin
        setTimeout(() => {
            // Create a random gift (heart, flower, or special text)
            const gifts = ['❤️', '🌹', '💕', '😘'];
            const gift = gifts[Math.floor(Math.random() * gifts.length)];
            
            const giftElement = document.createElement('div');
            giftElement.style.position = 'absolute';
            giftElement.style.left = (blockRect.left + blockRect.width / 2) + 'px';
            giftElement.style.top = (blockRect.top - 50) + 'px';
            giftElement.style.fontSize = '30px';
            giftElement.style.transform = 'translateX(-50%)';
            giftElement.style.zIndex = '100';
            giftElement.style.opacity = '0';
            giftElement.innerHTML = gift;
            
            document.body.appendChild(giftElement);
            
            // Animate the gift
            giftElement.animate([
                { transform: 'translateX(-50%) scale(0)', opacity: 0 },
                { transform: 'translateX(-50%) scale(1.2)', opacity: 1 },
                { transform: 'translateX(-50%) scale(1)', opacity: 1 },
                { transform: 'translateX(-50%) scale(1)', opacity: 1 },
                { transform: 'translateX(-50%) scale(1)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            // Remove the gift element after animation
            setTimeout(() => {
                if (giftElement.parentNode) {
                    giftElement.parentNode.removeChild(giftElement);
                }
            }, 2000);
            
            // Reset block state
            block.dataset.hitting = 'false';
        }, 300);
        
        // Remove coin after animation
        setTimeout(() => {
            if (coin.parentNode) {
                coin.parentNode.removeChild(coin);
            }
        }, 700);
    }
    
    // Add Super Mario-style moving platforms
    function createPlatforms() {
        const platformsContainer = document.createElement('div');
        platformsContainer.classList.add('platforms-container');
        platformsContainer.style.position = 'absolute';
        platformsContainer.style.width = '100%';
        platformsContainer.style.height = '100%';
        platformsContainer.style.pointerEvents = 'none';
        platformsContainer.style.zIndex = '5';
        
        document.body.appendChild(platformsContainer);
        
        // Create multiple platforms
        for (let i = 0; i < 3; i++) {
            const platform = document.createElement('div');
            platform.classList.add('platform');
            platform.style.position = 'absolute';
            platform.style.width = (100 + Math.random() * 100) + 'px';
            platform.style.height = '20px';
            platform.style.backgroundColor = '#8B4513'; // Brown wood color
            platform.style.borderRadius = '5px';
            platform.style.boxShadow = '0 3px 0 #5D3A1A, 0 5px 10px rgba(0,0,0,0.5)';
            platform.style.bottom = (150 + i * 120) + 'px';
            platform.style.left = (Math.random() * window.innerWidth) + 'px';
            
            platformsContainer.appendChild(platform);
            
            // Animate platform
            animatePlatform(platform);
        }
    }
    
    // Animate a platform moving left and right
    function animatePlatform(platform) {
        // Random initial position and direction
        let position = parseInt(platform.style.left);
        let direction = Math.random() > 0.5 ? 1 : -1;
        let speed = 0.5 + Math.random() * 1;
        
        function movePlatform() {
            position += direction * speed;
            
            // Bounce at edges
            if (position <= 0) {
                position = 0;
                direction = 1;
            } else if (position >= window.innerWidth - platform.offsetWidth) {
                position = window.innerWidth - platform.offsetWidth;
                direction = -1;
            }
            
            platform.style.left = position + 'px';
            requestAnimationFrame(movePlatform);
        }
        
        requestAnimationFrame(movePlatform);
    }
    
    // Add parallax effect for background
    function setupParallax() {
        document.addEventListener('mousemove', function(e) {
            if (!animationSettings.specialEffectsEnabled) return;
            
            // Get mouse position relative to window center
            const mouseX = e.clientX - window.innerWidth / 2;
            const mouseY = e.clientY - window.innerHeight / 2;
            
            // Move stars with parallax effect (slow movement)
            const stars = document.getElementById('stars');
            stars.style.transform = `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`;
            
            // Move flowers with parallax effect (faster movement)
            const flowers = document.getElementById('flowers');
            flowers.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;
            
            // Move title with parallax effect
            const title = document.querySelector('h1');
            title.style.transform = `translate(${mouseX * 0.03}px, ${mouseY * 0.03}px)`;
            
            // Move heart with parallax effect
            const heart = document.querySelector('.heart');
            if (heart) {
                heart.style.transform = `rotateX(${mouseY * 0.05}deg) rotateY(${mouseX * 0.05}deg)`;
            }
        });
    }
    
    // Add keyboard controls for characters (Mario-style)
    function setupKeyboardControls() {
        // Reference to character state (defined in main.js)
        let characterState;
        if (typeof window.characterState !== 'undefined') {
            characterState = window.characterState;
        } else {
            // Define fallback if main.js hasn't loaded yet
            characterState = {
                amine: {
                    jumpPower: 0,
                    direction: 1
                },
                douae: {
                    jumpPower: 0,
                    direction: -1
                }
            };
            window.characterState = characterState;
        }
        
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case ' ':
                case 'ArrowUp':
                    // Jump (Amine)
                    if (characterState.amine.jumpPower === 0) {
                        characterState.amine.jumpPower = 30;
                        amineChar.classList.add('jumping');
                        setTimeout(() => {
                            amineChar.classList.remove('jumping');
                        }, 600);
                    }
                    break;
                    
                case 'w':
                    // Jump (Douae)
                    if (characterState.douae.jumpPower === 0) {
                        characterState.douae.jumpPower = 30;
                        douaeChar.classList.add('jumping');
                        setTimeout(() => {
                            douaeChar.classList.remove('jumping');
                        }, 600);
                    }
                    break;
                    
                case 'h':
                    // Heart effect between characters
                    const amineRect = amineChar.getBoundingClientRect();
                    const douaeRect = douaeChar.getBoundingClientRect();
                    
                    const centerX = (amineRect.right + douaeRect.left) / 2;
                    const centerY = (amineRect.top + douaeRect.top) / 2;
                    
                    // Create heart effect
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const heartTrail = document.createElement('div');
                            heartTrail.className = 'heart-trail';
                            heartTrail.innerHTML = '❤️';
                            heartTrail.style.left = centerX + 'px';
                            heartTrail.style.top = centerY + 'px';
                            document.body.appendChild(heartTrail);
                            
                            // Remove heart after animation
                            setTimeout(() => {
                                if (heartTrail.parentNode) {
                                    heartTrail.parentNode.removeChild(heartTrail);
                                }
                            }, 2000);
                        }, i * 200);
                    }
                    break;
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        createButterflies();
        setupHeartbeat();
        createPlatforms();
        setupParallax();
        setupKeyboardControls();
        
        // Create a coin block after a delay
        setTimeout(() => {
            createCoinBlock();
        }, 5000);
        
        // Make animations accessible to other scripts
        window.romanceAnimations = {
            createHeartTrail: function(x, y) {
                const heart = document.createElement('div');
                heart.className = 'heart-trail';
                heart.innerHTML = '❤️';
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            },
            
            triggerHeartExplosion: function(x, y) {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const offsetX = (Math.random() - 0.5) * 100;
                        const offsetY = (Math.random() - 0.5) * 100;
                        this.createHeartTrail(x + offsetX, y + offsetY);
                    }, i * 100);
                }
            },
            
            createCoinBlock: createCoinBlock,
            
            toggleSpecialEffects: function(enabled) {
                animationSettings.specialEffectsEnabled = enabled;
            }
        };
    }
    
    // Start animations
    initAnimations();
});
