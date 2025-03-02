document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const stars = document.getElementById('stars');
    const flowers = document.getElementById('flowers');
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine.querySelector('img');
    const douaeImg = douae.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const container = document.querySelector('.container');
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    const SONG_DURATION = 211000; // 3 minutes 31 seconds
    
    // Romantic Animation Scenario
    function createRomanticScenario() {
        // Reset initial positions
        amine.style.left = '-150px';
        douae.style.right = '-150px';
        
        // Sequence of romantic moments
        const timeline = [
            {
                action: moveCharactersIn,
                delay: 2000
            },
            {
                action: firstGlance,
                delay: 5000
            },
            {
                action: approachEachOther,
                delay: 10000
            },
            {
                action: romanticDance,
                delay: 15000
            },
            {
                action: closeIntimacy,
                delay: 20000
            },
            {
                action: finalEmbrace,
                delay: 25000
            }
        ];
        
        // Execute timeline
        timeline.forEach(moment => {
            setTimeout(moment.action, moment.delay);
        });
        
        // Restart the scenario when song ends
        setTimeout(createRomanticScenario, SONG_DURATION);
    }
    
    // Move characters into view
    function moveCharactersIn() {
        // Amine enters from left
        amine.style.transition = 'left 3s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.25}px`;
        amine.classList.add('walking');
        
        // Douae enters from right
        douae.style.transition = 'right 3s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.25}px`;
        douae.classList.add('walking');
        
        // Create heart trails
        setTimeout(createHeartTrails, 2000);
    }
    
    // First glance moment
    function firstGlance() {
        // Stop walking
        amine.classList.remove('walking');
        douae.classList.remove('walking');
        
        // Subtle romantic pose
        amineImg.style.transform = 'rotate(5deg) scale(1.05)';
        douaeImg.style.transform = 'rotate(-5deg) scale(1.05)';
        
        // Create shy/loving expressions
        setTimeout(() => {
            createHeartConnection();
            createSoftLighting();
        }, 500);
    }
    
    // Approach each other
    function approachEachOther() {
        // Move closer
        amine.style.transition = 'left 2s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.4}px`;
        
        douae.style.transition = 'right 2s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.4}px`;
        
        // Gentle sway animation
        setTimeout(() => {
            amineImg.style.animation = 'gentle-sway 2s infinite alternate';
            douaeImg.style.animation = 'gentle-sway 2s infinite alternate-reverse';
            
            // Create floating hearts
            createFloatingHearts();
        }, 1000);
    }
    
    // Romantic dance
    function romanticDance() {
        // Synchronized movement
        amine.style.transition = 'left 3s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.45}px`;
        
        douae.style.transition = 'right 3s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.45}px`;
        
        // Dance-like transformations
        setTimeout(() => {
            amineImg.style.transform = 'rotate(10deg) translateY(-10px)';
            douaeImg.style.transform = 'rotate(-10deg) translateY(-10px)';
            
            // Heart burst effect
            createIntenseHeartBurst();
        }, 1500);
    }
    
    // Close intimacy moment
    function closeIntimacy() {
        // Move very close
        amine.style.transition = 'left 2s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.48}px`;
        
        douae.style.transition = 'right 2s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.48}px`;
        
        // Lean towards each other
        setTimeout(() => {
            amineImg.style.transform = 'rotate(15deg) scale(1.1)';
            douaeImg.style.transform = 'rotate(-15deg) scale(1.1)';
            
            // Create romantic backdrop
            createRomanticBackdrop();
        }, 1000);
    }
    
    // Final embrace
    function finalEmbrace() {
        // Almost touching
        amine.style.transition = 'left 3s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.5 - 50}px`;
        
        douae.style.transition = 'right 3s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.5 - 50}px`;
        
        // Final loving pose
        setTimeout(() => {
            amineImg.style.transform = 'rotate(5deg) scale(1.05)';
            douaeImg.style.transform = 'rotate(-5deg) scale(1.05)';
            
            // Ultimate heart effect
            createFinalHeartMoment();
        }, 2000);
    }
    
    // Helper functions for romantic effects
    function createHeartTrails() {
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        function addHeartTrail(x, y) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = '20px';
            heart.style.opacity = '0.7';
            heart.style.animation = 'heart-trail 2s forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }
        
        // Create multiple heart trails
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                addHeartTrail(
                    aminePos.left + Math.random() * aminePos.width,
                    aminePos.top + Math.random() * aminePos.height
                );
                addHeartTrail(
                    douaePos.left + Math.random() * douaePos.width,
                    douaePos.top + Math.random() * douaePos.height
                );
            }, i * 500);
        }
    }
    
    function createHeartConnection() {
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        
        const connection = document.createElement('div');
        connection.style.position = 'fixed';
        connection.style.left = `${aminePos.right}px`;
        connection.style.top = `${aminePos.top + aminePos.height/2}px`;
        connection.style.width = `${douaePos.left - aminePos.right}px`;
        connection.style.height = '2px';
        connection.style.background = 'linear-gradient(to right, pink, red)';
        connection.style.opacity = '0.5';
        document.body.appendChild(connection);
        
        setTimeout(() => connection.remove(), 3000);
    }
    
    function createSoftLighting() {
        const lighting = document.createElement('div');
        lighting.style.position = 'fixed';
        lighting.style.top = '0';
        lighting.style.left = '0';
        lighting.style.width = '100%';
        lighting.style.height = '100%';
        lighting.style.background = 'radial-gradient(circle, rgba(255,192,203,0.3) 0%, transparent 70%)';
        lighting.style.zIndex = '1';
        lighting.style.pointerEvents = 'none';
        document.body.appendChild(lighting);
        
        setTimeout(() => lighting.remove(), 3000);
    }
    
    function createFloatingHearts() {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = `${Math.random() * WINDOW_WIDTH}px`;
            heart.style.top = `${WINDOW_HEIGHT}px`;
            heart.style.fontSize = `${Math.random() * 30 + 20}px`;
            heart.style.animation = 'float-heart 3s forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }
    }
    
    function createIntenseHeartBurst() {
        const aminePos = amine.getBoundingClientRect();
        const douaePos = douae.getBoundingClientRect();
        const centerX = (aminePos.left + douaePos.left) / 2;
        const centerY = (aminePos.top + douaePos.top) / 2;
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = `${centerX}px`;
            heart.style.top = `${centerY}px`;
            heart.style.fontSize = `${Math.random() * 40 + 20}px`;
            heart.style.animation = 'heart-burst 1.5s forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1500);
        }
    }
    
    function createRomanticBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.background = 'linear-gradient(135deg, rgba(255,105,180,0.3), rgba(135,206,235,0.3))';
        backdrop.style.zIndex = '1';
        backdrop.style.pointerEvents = 'none';
        document.body.appendChild(backdrop);
        
        setTimeout(() => backdrop.remove(), 3000);
    }
    
    function createFinalHeartMoment() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${WINDOW_WIDTH / 2}px`;
        heart.style.top = `${WINDOW_HEIGHT / 2}px`;
        heart.style.fontSize = '0px';
        heart.style.transition = 'all 2s ease';
        heart.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.fontSize = '200px';
            heart.style.opacity = '0.7';
        }, 100);
        
        setTimeout(() => heart.remove(), 2000);
    }
    
    // Music and animation control
    function initAnimation() {
        // Start music if not playing
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
        }
        
        // Create romantic animation scenario
        createRomanticScenario();
        
        // Add global styles for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gentle-sway {
                from { transform: rotate(5deg) translateY(-5px); }
                to { transform: rotate(-5deg) translateY(5px); }
            }
            
            @keyframes heart-trail {
                from { opacity: 0.7; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-100px); }
            }
            
            @keyframes float-heart {
                from { transform: translateY(0) rotate(0deg); opacity: 1; }
                to { transform: translateY(-300px) rotate(360deg); opacity: 0; }
            }
            
            @keyframes heart-burst {
                from { transform: scale(0) rotate(0deg); opacity: 1; }
                to { transform: scale(2) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize everything
    initAnimation();
});
