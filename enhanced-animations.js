// enhanced-animations.js - Advanced animations and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine?.querySelector('img');
    const douaeImg = douae?.querySelector('img');
    const container = document.querySelector('.container');
    const heart = document.querySelector('.heart');
    const messageElem = document.querySelector('.message');
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    // Advanced particles system
    class ParticleSystem {
        constructor(options) {
            this.options = Object.assign({
                container: document.body,
                count: 50,
                types: ['❤️'],
                minSize: 10,
                maxSize: 30,
                minDuration: 3,
                maxDuration: 8,
                minDelay: 0,
                maxDelay: 5,
                gravity: 0.05,
                wind: 0.02,
                turbulence: 0.1,
                opacityDecay: 0.01,
                respawnParticles: true
            }, options);
            
            this.particles = [];
            this.container = this.options.container;
            this.running = false;
            
            this.init();
        }
        
        init() {
            // Create initial particles
            for (let i = 0; i < this.options.count; i++) {
                this.createParticle(
                    Math.random() * WINDOW_WIDTH,
                    Math.random() * WINDOW_HEIGHT * 0.5,
                    Math.random() * this.options.maxDelay
                );
            }
        }
        
        createParticle(x, y, delay = 0) {
            const particle = {
                element: document.createElement('div'),
                x: x,
                y: y,
                size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 5,
                opacity: 1,
                type: this.options.types[Math.floor(Math.random() * this.options.types.length)],
                delay: delay,
                duration: Math.random() * (this.options.maxDuration - this.options.minDuration) + this.options.minDuration,
                timeAlive: 0
            };
            
            // Set up particle element
            particle.element.className = 'particle';
            particle.element.textContent = particle.type;
            particle.element.style.position = 'fixed';
            particle.element.style.zIndex = '50';
            particle.element.style.fontSize = `${particle.size}px`;
            particle.element.style.userSelect = 'none';
            particle.element.style.pointerEvents = 'none';
            particle.element.style.opacity = '0';
            
            // Add to container and storage
            this.container.appendChild(particle.element);
            this.particles.push(particle);
            
            return particle;
        }
        
        updateParticle(particle, deltaTime) {
            // Handle delay before showing
            if (particle.delay > 0) {
                particle.delay -= deltaTime;
                return;
            }
            
            // Start showing if previously delayed
            if (particle.element.style.opacity === '0') {
                particle.element.style.opacity = '1';
            }
            
            // Update position
            particle.timeAlive += deltaTime;
            
            // Apply physics
            particle.vy += this.options.gravity * deltaTime;
            particle.vx += (Math.random() - 0.5) * this.options.turbulence * deltaTime;
            particle.vx += this.options.wind * deltaTime;
            
            particle.x += particle.vx * 60 * deltaTime;
            particle.y += particle.vy * 60 * deltaTime;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed * deltaTime;
            
            // Update opacity based on lifetime
            const lifeProgress = particle.timeAlive / (particle.duration);
            if (lifeProgress > 0.7) {
                particle.opacity = 1 - ((lifeProgress - 0.7) / 0.3);
            }
            
            // Apply visual updates
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`;
            particle.element.style.opacity = Math.max(0, particle.opacity);
            
            // Check if particle is dead
            if (particle.timeAlive >= particle.duration || 
                particle.y > WINDOW_HEIGHT + 50 ||
                particle.x < -50 || 
                particle.x > WINDOW_WIDTH + 50) {
                
                // Remove element
                particle.element.remove();
                
                // Create new particle if respawning is enabled
                if (this.options.respawnParticles) {
                    // Replace with a new particle at the top
                    this.createParticle(
                        Math.random() * WINDOW_WIDTH,
                        -50,
                        0
                    );
                }
                
                return false; // Particle should be removed
            }
            
            return true; // Particle still alive
        }
        
        update(deltaTime) {
            // Update all particles
            this.particles = this.particles.filter(particle => 
                this.updateParticle(particle, deltaTime)
            );
        }
        
        start() {
            if (this.running) return;
            
            this.running = true;
            this.lastTime = Date.now() / 1000;
            
            const animate = () => {
                if (!this.running) return;
                
                const currentTime = Date.now() / 1000;
                const deltaTime = currentTime - this.lastTime;
                this.lastTime = currentTime;
                
                this.update(deltaTime);
                
                requestAnimationFrame(animate);
            };
            
            animate();
        }
        
        stop() {
            this.running = false;
        }
        
        burst(x, y, count = 10) {
            for (let i = 0; i < count; i++) {
                const particle = this.createParticle(x, y, 0);
                
                // Burst in all directions
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                
                particle.vx = Math.cos(angle) * speed;
                particle.vy = Math.sin(angle) * speed;
            }
        }
    }
    
    // Create particle systems
    const heartParticles = new ParticleSystem({
        count: 20,
        types: ['❤️'],
        minSize: 15,
        maxSize: 30,
        gravity: 0.03,
        wind: 0.01
    });
    
    const floralParticles = new ParticleSystem({
        count: 15,
        types: ['🌹', '🌸', '💮', '🌺', '🌷'],
        minSize: 15,
        maxSize: 25,
        gravity: 0.02,
        wind: 0.03
    });
    
    // Advanced text effects
    class TextScrambler {
        constructor(element) {
            this.element = element;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.element.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.element.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Initialize text scrambler for message element
    const messageScrambler = messageElem ? new TextScrambler(messageElem) : null;
    
    // Collection of love messages to display
    const loveMessages = [
        "Every moment with you makes my heart flutter. You are the light in my life.",
        "Your smile brightens my darkest days, my love.",
        "I'm so thankful for every minute we spend together.",
        "You're the melody in my heart and the sunshine in my life.",
        "Forever isn't long enough to spend with you.",
        "My heart beats only for you, now and always.",
        "You are my today and all of my tomorrows.",
        "In your eyes, I found my home.",
        "Your love is the greatest gift I've ever received.",
        "You're not just my love, you're my best friend."
    ];
    
    // Change love message periodically
    function cycleMessages() {
        if (!messageScrambler) return;
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % loveMessages.length;
            messageScrambler.setText(loveMessages[currentIndex]);
        }, 8000);
    }
    
    // 3D tilt effect for the heart
    function apply3DTiltEffect() {
        if (!heart) return;
        
        heart.addEventListener('mousemove', function(e) {
            const heartRect = heart.getBoundingClientRect();
            const heartCenterX = heartRect.left + heartRect.width / 2;
            const heartCenterY = heartRect.top + heartRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = (mouseX - heartCenterX) / (heartRect.width / 2);
            const deltaY = (mouseY - heartCenterY) / (heartRect.height / 2);
            
            // Apply transform based on mouse position
            heart.style.transform = `rotateY(${deltaX * 15}deg) rotateX(${-deltaY * 15}deg) scale(1.1)`;
        });
        
        heart.addEventListener('mouseleave', function() {
            heart.style.transform = '';
        });
    }
    
    // Advanced character animations
    function enhanceCharacterAnimations() {
        if (!amine || !douae) return;
        
        // Character expressions
        const expressions = {
            amine: {
                normal: { transform: 'rotateY(0deg)' },
                excited: { transform: 'scale(1.1) translateY(-5px)' },
                shy: { transform: 'rotateY(20deg) translateX(-5px)' },
                love: { transform: 'scale(1.05) rotate(5deg)' }
            },
            douae: {
                normal: { transform: 'rotateY(0deg)' },
                excited: { transform: 'scale(1.1) translateY(-5px)' },
                shy: { transform: 'rotateY(-20deg) translateX(5px)' },
                love: { transform: 'scale(1.05) rotate(-5deg)' }
            }
        };
        
        // Function to apply expression
        function applyExpression(character, expression, duration = 2000) {
            const img = character === 'amine' ? amineImg : douaeImg;
            if (!img) return;
            
            const expressionStyle = character === 'amine' 
                ? expressions.amine[expression] 
                : expressions.douae[expression];
                
            // Apply the expression style
            Object.keys(expressionStyle).forEach(prop => {
                img.style[prop] = expressionStyle[prop];
            });
            
            // Reset after duration
            setTimeout(() => {
                Object.keys(expressionStyle).forEach(prop => {
                    img.style[prop] = expressions[character].normal[prop];
                });
            }, duration);
        }
        
        // Schedule random expressions
        function scheduleRandomExpressions() {
            const expressionTypes = ['excited', 'shy', 'love'];
            const characters = ['amine', 'douae'];
            
            setInterval(() => {
                const character = characters[Math.floor(Math.random() * characters.length)];
                const expression = expressionTypes[Math.floor(Math.random() * expressionTypes.length)];
                
                applyExpression(character, expression);
            }, 5000);
        }
        
        // Interactive character responses
        function setupInteractiveCharacters() {
            if (amineImg) {
                amineImg.addEventListener('mouseenter', () => {
                    applyExpression('amine', 'excited', 1000);
                    heartParticles.burst(
                        amine.getBoundingClientRect().left + 50, 
                        amine.getBoundingClientRect().top, 
                        5
                    );
                });
            }
            
            if (douaeImg) {
                douaeImg.addEventListener('mouseenter', () => {
                    applyExpression('douae', 'excited', 1000);
                    heartParticles.burst(
                        douae.getBoundingClientRect().left + 50, 
                        douae.getBoundingClientRect().top, 
                        5
                    );
                });
            }
        }
        
        // Synchronize character movements
        function syncCharacterMovements() {
            // When characters are close to each other
            document.addEventListener('charactersClose', () => {
                applyExpression('amine', 'love', 3000);
                applyExpression('douae', 'love', 3000);
                
                // Create heart burst between them
                const amineRect = amine.getBoundingClientRect();
                const douaeRect = douae.getBoundingClientRect();
                
                const midX = (amineRect.left + douaeRect.left) / 2 + 50;
                const midY = (amineRect.top + douaeRect.top) / 2;
                
                heartParticles.burst(midX, midY, 15);
            });
        }
        
        // Start character enhancements
        scheduleRandomExpressions();
        setupInteractiveCharacters();
        syncCharacterMovements();
    }
    
    // Create sparkling name effect
    function createSparklingNameEffect() {
        const title = document.querySelector('h1');
        if (!title) return;
        
        // Extract "Douae" from the title
        const text = title.textContent;
        const douaeName = "Douae";
        const douaeIndex = text.indexOf(douaeName);
        
        if (douaeIndex === -1) return;
        
        // Split title into parts
        const beforeName = text.substring(0, douaeIndex);
        const afterName = text.substring(douaeIndex + douaeName.length);
        
        // Create HTML structure
        title.innerHTML = `${beforeName}<span class="special-name">${douaeName}</span>${afterName}`;
        
        const specialName = title.querySelector('.special-name');
        specialName.style.position = 'relative';
        specialName.style.display = 'inline-block';
        
        // Add sparkles around the name
        function addSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = `${Math.random() * 10 + 10}px`;
            
            // Random position around the name
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 20 + 30;
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.left = `calc(50% + ${x}px)`;
            sparkle.style.top = `calc(50% + ${y}px)`;
            sparkle.style.transform = 'translate(-50%, -50%)';
            sparkle.style.opacity = '0';
            sparkle.style.transition = 'all 1s ease-out';
            sparkle.style.zIndex = '-1';
            
            specialName.appendChild(sparkle);
            
            // Animate sparkle
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.style.transform = `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.8})`;
            }, 10);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.style.opacity = '0';
                setTimeout(() => sparkle.remove(), 1000);
            }, 1000);
        }
        
        // Add sparkles periodically
        setInterval(addSparkle, 300);
        
        // Add special color animation to the name
        specialName.style.color = '#ff80ab';
        specialName.style.textShadow = '0 0 10px rgba(255, 128, 171, 0.8)';
        specialName.style.animation = 'nameGlow 3s infinite alternate';
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes nameGlow {
                0% { color: #ff80ab; text-shadow: 0 0 10px rgba(255, 128, 171, 0.8); }
                50% { color: #87CEEB; text-shadow: 0 0 15px rgba(135, 206, 235, 0.8); }
                100% { color: #ff80ab; text-shadow: 0 0 10px rgba(255, 128, 171, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Interactive photo border effect
    function createPhotoBorderEffect() {
        if (!amineImg || !douaeImg) return;
        
        const photos = [amineImg, douaeImg];
        
        photos.forEach(photo => {
            // Create animated border
            photo.style.border = '3px solid transparent';
            photo.style.borderRadius = '10px';
            photo.style.boxSizing = 'border-box';
            photo.style.backgroundClip = 'padding-box';
            
            // Create gradient animation
            const animatedBorder = document.createElement('div');
            animatedBorder.className = 'animated-border';
            animatedBorder.style.position = 'absolute';
            animatedBorder.style.top = '-5px';
            animatedBorder.style.left = '-5px';
            animatedBorder.style.right = '-5px';
            animatedBorder.style.bottom = '-5px';
            animatedBorder.style.borderRadius = '15px';
            animatedBorder.style.zIndex = '-1';
            animatedBorder.style.opacity = '0';
            animatedBorder.style.transition = 'opacity 0.3s ease';
            animatedBorder.style.background = 'linear-gradient(45deg, #ff80ab, #87CEEB, #ff80ab)';
            animatedBorder.style.backgroundSize = '300% 300%';
            animatedBorder.style.animation = 'gradientBorder 3s ease infinite';
            
            // Position parent relatively
            const photoParent = photo.parentElement;
            if (photoParent.style.position !== 'absolute' && 
                photoParent.style.position !== 'fixed' &&
                photoParent.style.position !== 'relative') {
                photoParent.style.position = 'relative';
            }
            
            photoParent.appendChild(animatedBorder);
            
            // Show border on hover
            photoParent.addEventListener('mouseenter', () => {
                animatedBorder.style.opacity = '1';
            });
            
            photoParent.addEventListener('mouseleave', () => {
                animatedBorder.style.opacity = '0';
            });
        });
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientBorder {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Parallax effect for background elements
    function createParallaxEffect() {
        const stars = document.getElementById('stars');
        if (!stars) return;
        
        document.addEventListener('mousemove', e => {
            const mouseX = e.clientX / WINDOW_WIDTH;
            const mouseY = e.clientY / WINDOW_HEIGHT;
            
            // Move stars slightly based on mouse position
            stars.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
        });
    }
    
    // Add magical cursor trail
    function createMagicalCursorTrail() {
        const trailContainer = document.createElement('div');
        trailContainer.className = 'cursor-trail-container';
        trailContainer.style.position = 'fixed';
        trailContainer.style.top = '0';
        trailContainer.style.left = '0';
        trailContainer.style.width = '100%';
        trailContainer.style.height = '100%';
        trailContainer.style.pointerEvents = 'none';
        trailContainer.style.zIndex = '1000';
        
        document.body.appendChild(trailContainer);
        
        // Store trail dots
        const trailDots = [];
        const MAX_DOTS = 20;
        
        // Mouse movement handler
        document.addEventListener('mousemove', e => {
            // Create new dot
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.position = 'absolute';
            dot.style.width = '8px';
            dot.style.height = '8px';
            dot.style.borderRadius = '50%';
            dot.style.background = `radial-gradient(circle, 
                rgba(255, 128, 171, 0.8) 0%, 
                rgba(135, 206, 235, 0.4) 70%,
                transparent 100%)`;
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            dot.style.transform = 'translate(-50%, -50%)';
            dot.style.opacity = '0.8';
            dot.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            trailContainer.appendChild(dot);
            trailDots.push({
                element: dot,
                timestamp: Date.now()
            });
            
            // Limit number of dots
            if (trailDots.length > MAX_DOTS) {
                const oldest = trailDots.shift();
                oldest.element.style.opacity = '0';
                oldest.element.style.transform = 'translate(-50%, -50%) scale(0.5)';
                
                setTimeout(() => {
                    oldest.element.remove();
                }, 800);
            }
        });
        
        // Clean up old dots periodically
        setInterval(() => {
            const now = Date.now();
            while (trailDots.length > 0 && now - trailDots[0].timestamp > 800) {
                const oldest = trailDots.shift();
                oldest.element.remove();
            }
        }, 1000);
    }
    
    // Initialize all enhanced animations
    function init() {
        // Start particle systems
        heartParticles.start();
        floralParticles.start();
        
        // Initialize text effects
        cycleMessages();
        
        // Initialize 3D effects
        apply3DTiltEffect();
        
        // Initialize character animations
        enhanceCharacterAnimations();
        
        // Initialize name effect
        createSparklingNameEffect();
        
        // Initialize photo effects
        createPhotoBorderEffect();
        
        // Initialize parallax effect
        createParallaxEffect();
        
        // Initialize cursor trail
        createMagicalCursorTrail();
        
        // Create custom event that will be triggered by main.js
        document.addEventListener('charactersClose', (e) => {
            const centerX = e.detail?.centerX || WINDOW_WIDTH / 2;
            const centerY = e.detail?.centerY || WINDOW_HEIGHT / 2;
            
            // Create a burst of hearts and flowers
            heartParticles.burst(centerX, centerY, 20);
            floralParticles.burst(centerX, centerY, 10);
        });
    }
    
    // Start all enhanced animations
    init();
});
