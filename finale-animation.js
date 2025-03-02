// finale-animation.js - Grand finale for the 3:31 animation sequence
document.addEventListener('DOMContentLoaded', function() {
    // Character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Track animation state
    let finaleStarted = false;
    
    // Listen for music time to trigger finale
    if (backgroundMusic) {
        backgroundMusic.addEventListener('timeupdate', function() {
            // Trigger finale at around 3:10 (190 seconds)
            if (backgroundMusic.currentTime >= 190 && !finaleStarted) {
                finaleStarted = true;
                grandFinale();
            }
        });
    }
    
    // Mario-style grand finale
    function grandFinale() {
        console.log("Starting grand finale!");
        
        // Create castle/flag in Super Mario style
        createMarioCastle();
        
        // Move characters to starting positions
        moveCharacterToPosition(amineChar, '10%');
        moveCharacterToPosition(douaeChar, '90%');
        
        // Characters run toward castle
        setTimeout(() => {
            runTowardsCastle();
        }, 2000);
    }
    
    // Create Mario-style castle and flag
    function createMarioCastle() {
        // Container for castle elements
        const castle = document.createElement('div');
        castle.id = 'mario-castle';
        castle.style.position = 'absolute';
        castle.style.bottom = '0';
        castle.style.left = '50%';
        castle.style.transform = 'translateX(-50%)';
        castle.style.width = '200px';
        castle.style.height = '200px';
        castle.style.zIndex = '80';
        document.body.appendChild(castle);
        
        // Castle base
        const castleBase = document.createElement('div');
        castleBase.style.position = 'absolute';
        castleBase.style.bottom = '0';
        castleBase.style.left = '0';
        castleBase.style.width = '100%';
        castleBase.style.height = '120px';
        castleBase.style.backgroundColor = '#8B4513';
        castleBase.style.borderTop = '10px solid #A0522D';
        castle.appendChild(castleBase);
        
        // Castle towers
        for (let i = 0; i < 3; i++) {
            const tower = document.createElement('div');
            tower.style.position = 'absolute';
            tower.style.bottom = '120px';
            tower.style.width = '40px';
            tower.style.height = '60px';
            tower.style.backgroundColor = '#8B4513';
            tower.style.borderTopLeftRadius = '20px';
            tower.style.borderTopRightRadius = '20px';
            
            // Position towers
            if (i === 0) {
                tower.style.left = '20px';
            } else if (i === 1) {
                tower.style.left = '80px';
                tower.style.height = '80px'; // Middle tower taller
            } else {
                tower.style.left = '140px';
            }
            
            castle.appendChild(tower);
        }
        
        // Flagpole
        const flagpole = document.createElement('div');
        flagpole.style.position = 'absolute';
        flagpole.style.bottom = '0';
        flagpole.style.left = '-80px';
        flagpole.style.width = '10px';
        flagpole.style.height = '180px';
        flagpole.style.backgroundColor = 'silver';
        castle.appendChild(flagpole);
        
        // Flag
        const flag = document.createElement('div');
        flag.style.position = 'absolute';
        flag.style.bottom = '100px';
        flag.style.left = '-70px';
        flag.style.width = '0';
        flag.style.height = '0';
        flag.style.borderStyle = 'solid';
        flag.style.borderWidth = '20px 40px 20px 0';
        flag.style.borderColor = 'transparent red transparent transparent';
        flag.style.transition = 'bottom 3s ease-in-out';
        castle.appendChild(flag);
        
        // Castle door
        const door = document.createElement('div');
        door.style.position = 'absolute';
        door.style.bottom = '0';
        door.style.left = '70px';
        door.style.width = '60px';
        door.style.height = '80px';
        door.style.backgroundColor = 'black';
        door.style.borderTopLeftRadius = '30px';
        door.style.borderTopRightRadius = '30px';
        castle.appendChild(door);
        
        // Animate flag raising at the end
        setTimeout(() => {
            flag.style.bottom = '160px';
        }, 15000);
        
        return castle;
    }
    
    // Move character to specific position
    function moveCharacterToPosition(character, position) {
        // Clear any existing animation classes
        character.classList.remove('walking', 'running', 'jumping');
        
        // Position is a percentage string (e.g., '10%')
        if (character.id === 'amine') {
            character.style.left = position;
            character.style.right = 'auto';
        } else {
            character.style.right = position;
            character.style.left = 'auto';
        }
    }
    
    // Make characters run towards the castle
    function runTowardsCastle() {
        // Add running animation
        if (!document.getElementById('marioRunStyle')) {
            const runStyle = document.createElement('style');
            runStyle.id = 'marioRunStyle';
            runStyle.textContent = `
                @keyframes marioRun {
                    0% { transform: translateY(0) scale(1); }
                    25% { transform: translateY(-15px) scale(1); }
                    50% { transform: translateY(0) scale(1); }
                    75% { transform: translateY(-15px) scale(1); }
                    100% { transform: translateY(0) scale(1); }
                }
                
                .mario-running img {
                    animation: marioRun 0.5s infinite;
                }
            `;
            document.head.appendChild(runStyle);
        }
        
        // Add running class to both characters
        amineChar.classList.add('mario-running');
        douaeChar.classList.add('mario-running');
        
        // Animate Amine running to castle
        const amineInterval = setInterval(() => {
            const currentLeft = parseFloat(amineChar.style.left) || 0;
            const targetLeft = 35; // Percentage
            
            if (currentLeft < targetLeft) {
                amineChar.style.left = (currentLeft + 1) + '%';
            } else {
                clearInterval(amineInterval);
                
                // Mario-style jump after reaching position
                setTimeout(() => {
                    marioJump(amineChar);
                }, 500);
            }
        }, 50);
        
        // Animate Douae running to castle
        const douaeInterval = setInterval(() => {
            const currentRight = parseFloat(douaeChar.style.right) || 0;
            const targetRight = 35; // Percentage
            
            if (currentRight < targetRight) {
                douaeChar.style.right = (currentRight + 1) + '%';
            } else {
                clearInterval(douaeInterval);
                
                // Mario-style jump after reaching position
                setTimeout(() => {
                    marioJump(douaeChar);
                }, 1000);
                
                // Start flag raising animation after characters reach castle
                setTimeout(() => {
                    flagComplete();
                }, 3000);
            }
        }, 50);
    }
    
    // Mario-style jump animation
    function marioJump(character) {
        // Remove running animation
        character.classList.remove('mario-running');
        
        // Play jump sound
        const jumpSound = new Audio('jump.mp3');
        if (jumpSound) {
            jumpSound.play().catch(e => {
                console.log('Sound play prevented by browser policy');
            });
        }
        
        // Add jump animation
        character.animate([
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(-80px) scale(1.1)' },
            { transform: 'translateY(0) scale(1)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.7, 0, 0.3, 1)' // Mario-like jump physics
        });
    }
    
    // Final animation when flag is raised
    function flagComplete() {
        // Play course clear sound
        const clearSound = new Audio('clear.mp3');
        if (clearSound) {
            clearSound.play().catch(e => {
                console.log('Sound play prevented by browser policy');
            });
        }
        
        // Fireworks effect
        createFireworks();
        
        // Create "LOVE COMPLETE!" banner
        const banner = document.createElement('div');
        banner.textContent = 'LOVE COMPLETE!';
        banner.style.position = 'fixed';
        banner.style.top = '40%';
        banner.style.left = '50%';
        banner.style.transform = 'translate(-50%, -50%)';
        banner.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        banner.style.color = 'gold';
        banner.style.padding = '15px 30px';
        banner.style.fontSize = '36px';
        banner.style.fontWeight = 'bold';
        banner.style.fontFamily = "'Press Start 2P', monospace";
        banner.style.borderRadius = '10px';
        banner.style.zIndex = '200';
        banner.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        document.body.appendChild(banner);
        
        // Animate banner
        banner.animate([
            { transform: 'translate(-50%, -300%)', opacity: 0 },
            { transform: 'translate(-50%, -50%)', opacity: 1 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)'
        });
        
        // Final heart explosion
        setTimeout(() => {
            // Create hearts everywhere
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = '❤️';
                    heart.style.position = 'absolute';
                    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                    heart.style.left = (Math.random() * 100) + '%';
                    heart.style.top = (Math.random() * 100) + '%';
                    heart.style.zIndex = '150';
                    document.body.appendChild(heart);
                    
                    // Animate heart
                    heart.animate([
                        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                        { transform: 'scale(1.5) rotate(360deg)', opacity: 1 },
                        { transform: 'scale(1) rotate(720deg)', opacity: 0 }
                    ], {
                        duration: 2000,
                        easing: 'ease-out'
                    });
                    
                    // Remove heart after animation
                    setTimeout(() => {
                        heart.remove();
                    }, 2000);
                }, i * 100);
            }
            
            // Final message
            setTimeout(() => {
                banner.textContent = 'I ❤️ YOU DOUAE!';
                
                banner.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 }
                ], {
                    duration: 1000,
                    easing: 'ease-in-out'
                });
            }, 3000);
        }, 2000);
    }
    
    // Create fireworks effect
    function createFireworks() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.position = 'absolute';
                firework.style.left = (Math.random() * 80 + 10) + '%';
                firework.style.top = (Math.random() * 60 + 10) + '%';
                firework.style.width = '10px';
                firework.style.height = '10px';
                firework.style.borderRadius = '50%';
                firework.style.zIndex = '190';
                
                // Random firework color
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                firework.style.backgroundColor = color;
                firework.style.boxShadow = `0 0 20px ${color}`;
                
                document.body.appendChild(firework);
                
                // Explode firework
                setTimeout(() => {
                    // Create explosion particles
                    for (let j = 0; j < 20; j++) {
                        const particle = document.createElement('div');
                        particle.style.position = 'absolute';
                        particle.style.left = firework.style.left;
                        particle.style.top = firework.style.top;
                        particle.style.width = '3px';
                        particle.style.height = '3px';
                        particle.style.borderRadius = '50%';
                        particle.style.backgroundColor = color;
                        particle.style.zIndex = '191';
                        document.body.appendChild(particle);
                        
                        // Calculate random direction for particle
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * 100 + 50;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        // Animate particle
                        particle.animate([
                            { transform: 'translate(0, 0)', opacity: 1 },
                            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
                        ], {
                            duration: 1000,
                            easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)'
                        });
                        
                        // Remove particle after animation
                        setTimeout(() => {
                            particle.remove();
                        }, 1000);
                    }
                    
                    // Remove firework center
                    firework.remove();
                }, 500);
            }, i * 500);
        }
    }
    
    // Expose functions for use by other scripts
    window.finaleAnimations = {
        startFinale: grandFinale,
        createFireworks: createFireworks
    };