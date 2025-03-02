// animations-music.js - Character dancing animations with fixed timing

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine?.querySelector('img');
    const douaeImg = douae?.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Dance state tracking
    let danceState = 0;
    let danceInterval = null;
    
    // Dance animation states
    const danceStates = {
        SIDE_TO_SIDE: 0,
        JUMP: 1,
        SPIN: 2,
        LEAN: 3,
        WAVE: 4
    };
    
    // Side to side dance move
    function danceSideToSide() {
        if (!amineImg || !douaeImg) return;
        
        // Amine moves left
        amineImg.style.transition = 'transform 0.3s ease-out';
        amineImg.style.transform = 'translateX(-10px)';
        
        // Douae moves right
        douaeImg.style.transition = 'transform 0.3s ease-out';
        douaeImg.style.transform = 'translateX(10px)';
        
        // Return to center after a moment
        setTimeout(() => {
            amineImg.style.transform = 'translateX(10px)';
            douaeImg.style.transform = 'translateX(-10px)';
            
            // Reset after the move
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 300);
        }, 300);
    }
    
    // Jump dance move
    function danceJump() {
        if (!amineImg || !douaeImg) return;
        
        // Both characters jump
        amineImg.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        amineImg.style.transform = 'translateY(-20px)';
        
        douaeImg.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        douaeImg.style.transform = 'translateY(-20px)';
        
        // Return to ground
        setTimeout(() => {
            amineImg.style.transition = 'transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
            amineImg.style.transform = '';
            
            douaeImg.style.transition = 'transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
            douaeImg.style.transform = '';
        }, 200);
    }
    
    // Spin dance move
    function danceSpin() {
        if (!amineImg || !douaeImg) return;
        
        // Amine spins clockwise
        amineImg.style.transition = 'transform 0.5s ease-in-out';
        amineImg.style.transform = 'rotate(360deg)';
        
        // Douae spins counter-clockwise
        douaeImg.style.transition = 'transform 0.5s ease-in-out';
        douaeImg.style.transform = 'rotate(-360deg)';
        
        // Reset after spin
        setTimeout(() => {
            amineImg.style.transition = 'none';
            amineImg.style.transform = '';
            
            douaeImg.style.transition = 'none';
            douaeImg.style.transform = '';
        }, 500);
    }
    
    // Lean dance move
    function danceLean() {
        if (!amineImg || !douaeImg) return;
        
        // Amine leans right
        amineImg.style.transition = 'transform 0.3s ease-out';
        amineImg.style.transform = 'rotate(15deg)';
        
        // Douae leans left
        douaeImg.style.transition = 'transform 0.3s ease-out';
        douaeImg.style.transform = 'rotate(-15deg)';
        
        // Return to upright
        setTimeout(() => {
            amineImg.style.transform = 'rotate(-10deg)';
            douaeImg.style.transform = 'rotate(10deg)';
            
            // Reset after the move
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 300);
        }, 300);
    }
    
    // Wave dance move
    function danceWave() {
        if (!amineImg || !douaeImg) return;
        
        // Wave effect for Amine
        amineImg.style.transition = 'transform 0.5s ease-in-out';
        amineImg.style.transformOrigin = 'bottom center';
        amineImg.style.transform = 'skewX(10deg)';
        
        // Wave effect for Douae
        douaeImg.style.transition = 'transform 0.5s ease-in-out';
        douaeImg.style.transformOrigin = 'bottom center';
        douaeImg.style.transform = 'skewX(-10deg)';
        
        // Return to normal
        setTimeout(() => {
            amineImg.style.transform = 'skewX(-5deg)';
            douaeImg.style.transform = 'skewX(5deg)';
            
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 250);
        }, 250);
    }
    
    // Create heart effect between characters
    function createHeartEffect() {
        if (!amine || !douae) return;
        
        // Calculate position between characters
        const amineRect = amine.getBoundingClientRect();
        const douaeRect = douae.getBoundingClientRect();
        
        const centerX = (amineRect.left + douaeRect.left) / 2 + 50;
        const centerY = (amineRect.top + douaeRect.top) / 2 - 30;
        
        // Create heart
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.fontSize = '0px';
        heart.style.opacity = '0';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        heart.style.zIndex = '100';
        
        document.body.appendChild(heart);
        
        // Animate heart
        setTimeout(() => {
            heart.style.fontSize = '30px';
            heart.style.opacity = '1';
            
            setTimeout(() => {
                heart.style.top = `${centerY - 50}px`;
                heart.style.opacity = '0';
                
                setTimeout(() => {
                    heart.remove();
                }, 500);
            }, 500);
        }, 10);
    }
    
    // Special dance sequence for chorus or high-energy parts
    function danceChorus() {
        // Only animate if characters exist
        if (!amine || !douae || !amineImg || !douaeImg) return;
        
        // Save current positions
        const currentAmineLeft = amine.style.left || '0px';
        const currentDouaeRight = douae.style.right || '0px';
        
        // Make characters move closer
        amine.style.transition = 'left 2s ease-in-out';
        amine.style.left = 'calc(50% - 100px)';
        
        douae.style.transition = 'right 2s ease-in-out';
        douae.style.right = 'calc(50% - 100px)';
        
        // Heart effect between them
        createIntenseHeartEffects();
        
        // Series of dance moves
        setTimeout(() => {
            // Jump together
            danceJump();
            
            setTimeout(() => {
                // Spin
                danceSpin();
                
                setTimeout(() => {
                    // Lean toward each other
                    amineImg.style.transition = 'transform 1s ease-out';
                    amineImg.style.transform = 'rotate(20deg)';
                    
                    douaeImg.style.transition = 'transform 1s ease-out';
                    douaeImg.style.transform = 'rotate(-20deg)';
                    
                    // Reset after chorus
                    setTimeout(() => {
                        // Return to original positions
                        amine.style.left = currentAmineLeft;
                        douae.style.right = currentDouaeRight;
                        
                        // Reset transformations
                        amineImg.style.transition = 'transform 1s ease-out';
                        amineImg.style.transform = '';
                        
                        douaeImg.style.transition = 'transform 1s ease-out';
                        douaeImg.style.transform = '';
                    }, 4000);
                }, 1000);
            }, 1000);
        }, 2000);
    }
    
    // Create multiple heart effects for chorus
    function createIntenseHeartEffects() {
        const interval = setInterval(() => {
            createHeartEffect();
        }, 500);
        
        // Stop after a few seconds
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }
    
    // Perform a dance move based on current state
    function performDance() {
        // Cycle through dance states
        danceState = (danceState + 1) % 5;
        
        switch (danceState) {
            case danceStates.SIDE_TO_SIDE:
                danceSideToSide();
                break;
            case danceStates.JUMP:
                danceJump();
                break;
            case danceStates.SPIN:
                danceSpin();
                break;
            case danceStates.LEAN:
                danceLean();
                break;
            case danceStates.WAVE:
                danceWave();
                break;
        }
        
        // Create heart effect occasionally
        if (Math.random() > 0.7) {
            createHeartEffect();
        }
    }
    
    // Start regular dance interval
    function startDancing() {
        if (danceInterval) {
            clearInterval(danceInterval);
        }
        
        // Dance every 1.2 seconds (approximately 50 BPM)
        danceInterval = setInterval(performDance, 1200);
    }
    
    // Stop dancing
    function stopDancing() {
        if (danceInterval) {
            clearInterval(danceInterval);
            danceInterval = null;
        }
    }
    
    // Create dance timeline based on song sections
    function createDanceTimeline() {
        if (!backgroundMusic) return;
        
        // Timeline of dance sequences (timestamps in seconds)
        const timeline = [
            { time: 5, action: danceChorus },
            { time: 30, action: danceChorus },
            { time: 60, action: danceChorus },
            { time: 90, action: danceChorus },
            { time: 120, action: danceChorus },
            { time: 150, action: danceChorus },
            { time: 180, action: danceChorus }
        ];
        
        // Check timeline during song playback
        backgroundMusic.addEventListener('timeupdate', function() {
            const currentTime = backgroundMusic.currentTime;
            
            // Check if we should trigger any timeline events
            timeline.forEach(event => {
                // Use a small range to catch the timestamp
                if (currentTime >= event.time && currentTime <= event.time + 0.5) {
                    event.action();
                }
            });
        });
    }
    
    // Music toggle control
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play()
                    .then(() => {
                        startDancing();
                        musicToggle.textContent = '🎵 Music On';
                    })
                    .catch(err => {
                        console.error('Error playing audio:', err);
                    });
            } else {
                backgroundMusic.pause();
                stopDancing();
                musicToggle.textContent = '🎵 Music Off';
            }
        });
    }
    
    // Handle song ending
    if (backgroundMusic) {
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        });
    }
    
    // Initialize dancing animations
    function init() {
        // Auto-play music after a short delay (many browsers require user interaction)
        setTimeout(() => {
            backgroundMusic.play()
                .then(() => {
                    startDancing();
                })
                .catch(err => {
                    console.log('Auto-play prevented. Click music toggle to play.', err);
                });
        }, 1000);
        
        // Set up dance timeline
        createDanceTimeline();
    }
    
    // Start everything
    init();
});
