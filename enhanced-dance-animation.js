// enhanced-dance-animation.js - Fluid character dancing animation
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine?.querySelector('img');
    const douaeImg = douae?.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const container = document.querySelector('.container');
    
    // Dance state tracking
    let danceState = 0;
    let danceInterval = null;
    let specialMomentActive = false;
    let heartInterval = null;
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    // Initialize character positions
    function initCharacters() {
        if (!amine || !douae) return;
        
        // Make sure both characters are visible immediately
        amine.style.opacity = '1';
        douae.style.opacity = '1';
        
        // Set positions for characters to be centered at the bottom
        amine.style.left = '42%';
        amine.style.bottom = '5%';
        amine.style.transform = 'translateX(-60px)';
        
        douae.style.right = '42%';
        douae.style.bottom = '5%';
        douae.style.transform = 'translateX(60px)';
        
        // Make sure images have proper sizing
        if (amineImg && douaeImg) {
            const imageStyle = {
                maxHeight: '150px', // Reduced from 180px
                width: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                transition: 'transform 0.5s ease'
            };
            
            Object.assign(amineImg.style, imageStyle);
            Object.assign(douaeImg.style, imageStyle);
            
            // Add a slight initial pose
            setTimeout(() => {
                amineImg.style.transform = 'rotate(5deg)';
                douaeImg.style.transform = 'rotate(-5deg)';
                
                // Then, create an initial heart effect
                setTimeout(() => {
                    createHeartEffect();
                }, 500);
            }, 200);
        }
    }
    
    // Create heart effect between characters
    function createHeartEffect() {
        if (!amine || !douae) return;
        
        // Calculate position between characters
        const amineRect = amine.getBoundingClientRect();
        const douaeRect = douae.getBoundingClientRect();
        
        // Fixed center position calculation that works regardless of character position
        let centerX = window.innerWidth / 2;
        let centerY = Math.min(amineRect.top, douaeRect.top) - 30;
        
        // If characters are visible, calculate position between them
        if (amineRect.width && douaeRect.width) {
            centerX = (amineRect.left + amineRect.width/2 + douaeRect.left + douaeRect.width/2) / 2;
        }
        
        // Create heart
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.fontSize = '0px';
        heart.style.opacity = '0';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        heart.style.zIndex = '100';
        
        document.body.appendChild(heart);
        
        // Animate heart with improved animation
        setTimeout(() => {
            heart.style.fontSize = '30px';
            heart.style.opacity = '1';
            
            setTimeout(() => {
                heart.style.top = `${centerY - 80}px`;
                heart.style.opacity = '0';
                
                setTimeout(() => {
                    heart.remove();
                }, 800);
            }, 1200);
        }, 10);
    }
    
    // Side to side dance move - synchronized
    function danceSideToSide() {
        if (!amineImg || !douaeImg) return;
        
        // Amine moves right as Douae moves left (mirrored)
        amineImg.style.transition = 'transform 0.6s ease-in-out';
        amineImg.style.transform = 'translateX(20px)';
        
        douaeImg.style.transition = 'transform 0.6s ease-in-out';
        douaeImg.style.transform = 'translateX(-20px)';
        
        // Return to center after a moment
        setTimeout(() => {
            amineImg.style.transform = 'translateX(-15px)';
            douaeImg.style.transform = 'translateX(15px)';
            
            // Reset after the move
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 600);
        }, 600);
    }
    
    // Jump dance move - synchronized
    function danceJump() {
        if (!amineImg || !douaeImg) return;
        
        // Both characters jump
        amineImg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        amineImg.style.transform = 'translateY(-30px) scale(1.05)';
        
        douaeImg.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        douaeImg.style.transform = 'translateY(-30px) scale(1.05)';
        
        // Return to ground
        setTimeout(() => {
            amineImg.style.transition = 'transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
            amineImg.style.transform = 'scale(0.95)';
            
            douaeImg.style.transition = 'transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
            douaeImg.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 200);
        }, 400);
    }
    
    // Spin dance move
    function danceSpin() {
        if (!amineImg || !douaeImg) return;
        
        // Amine spins clockwise
        amineImg.style.transition = 'transform 1s ease-in-out';
        amineImg.style.transform = 'rotate(360deg) scale(1.05)';
        
        // Douae spins counter-clockwise
        douaeImg.style.transition = 'transform 1s ease-in-out';
        douaeImg.style.transform = 'rotate(-360deg) scale(1.05)';
        
        // Reset after spin
        setTimeout(() => {
            amineImg.style.transition = 'transform 0.3s ease';
            amineImg.style.transform = 'scale(1)';
            
            douaeImg.style.transition = 'transform 0.3s ease';
            douaeImg.style.transform = 'scale(1)';
            
            setTimeout(() => {
                amineImg.style.transition = 'none';
                amineImg.style.transform = '';
                
                douaeImg.style.transition = 'none';
                douaeImg.style.transform = '';
            }, 300);
        }, 1000);
    }
    
    // Lean dance move - mirrored
    function danceLean() {
        if (!amineImg || !douaeImg) return;
        
        // Amine leans toward Douae
        amineImg.style.transition = 'transform 0.8s ease-out';
        amineImg.style.transform = 'rotate(15deg) translateX(10px)';
        
        // Douae leans toward Amine
        douaeImg.style.transition = 'transform 0.8s ease-out';
        douaeImg.style.transform = 'rotate(-15deg) translateX(-10px)';
        
        // Return to upright
        setTimeout(() => {
            amineImg.style.transform = 'rotate(-8deg) translateX(-5px)';
            douaeImg.style.transform = 'rotate(8deg) translateX(5px)';
            
            // Reset after the move
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 800);
        }, 800);
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
            }, 500);
        }, 500);
    }
    
    // Romantic sway dance move
    function danceRomanticSway() {
        if (!amineImg || !douaeImg) return;
        
        // Smooth sway animation for both characters
        amineImg.style.transition = 'transform 1.2s cubic-bezier(0.45, 0, 0.55, 1)';
        amineImg.style.transform = 'rotate(5deg) translateY(-5px)';
        
        douaeImg.style.transition = 'transform 1.2s cubic-bezier(0.45, 0, 0.55, 1)';
        douaeImg.style.transform = 'rotate(-5deg) translateY(-5px)';
        
        // Return with gentle rhythm
        setTimeout(() => {
            amineImg.style.transform = 'rotate(-3deg) translateY(3px)';
            douaeImg.style.transform = 'rotate(3deg) translateY(3px)';
            
            // Reset after the move
            setTimeout(() => {
                amineImg.style.transform = '';
                douaeImg.style.transform = '';
            }, 1200);
        }, 1200);
    }
    
    // Bow dance move
    function danceBow() {
        if (!amineImg || !douaeImg) return;
        
        // Amine bows
        amineImg.style.transition = 'transform 0.8s ease-out';
        amineImg.style.transformOrigin = 'bottom center';
        amineImg.style.transform = 'rotate(20deg)';
        
        // Douae curtsies
        douaeImg.style.transition = 'transform 0.8s ease-out';
        douaeImg.style.transformOrigin = 'bottom center';
        douaeImg.style.transform = 'translateY(10px) scale(0.95)';
        
        // Return to upright
        setTimeout(() => {
            amineImg.style.transition = 'transform 0.6s ease-out';
            amineImg.style.transform = '';
            
            douaeImg.style.transition = 'transform 0.6s ease-out';
            douaeImg.style.transform = '';
        }, 800);
    }
    
    // Special dance sequence for romantic moments
    function danceSpecialMoment() {
        if (!amine || !douae || !amineImg || !douaeImg || specialMomentActive) return;
        specialMomentActive = true;
        
        // Create a romantic background effect
        createRomanticBackgroundEffect();
        
        // Make characters move in a romantic dance pattern
        amine.style.transition = 'all 2s ease-in-out';
        amine.style.transform = 'translateX(-30px)';
        
        douae.style.transition = 'all 2s ease-in-out';
        douae.style.transform = 'translateX(30px)';
        
        // Start heart effect interval
        heartInterval = setInterval(createHeartEffect, 800);
        
        // Series of dance moves
        setTimeout(() => {
            // Lean toward each other
            amineImg.style.transition = 'transform 1.5s ease-out';
            amineImg.style.transform = 'rotate(15deg) translateX(15px) scale(1.05)';
            
            douaeImg.style.transition = 'transform 1.5s ease-out';
            douaeImg.style.transform = 'rotate(-15deg) translateX(-15px) scale(1.05)';
            
            // Create special glow effect
            createCharacterGlow(amine, 'rgba(135, 206, 235, 0.6)');
            createCharacterGlow(douae, 'rgba(255, 105, 180, 0.6)');
            
            // Create a "moment" effect with multiple hearts
            setTimeout(() => {
                // Create a burst of hearts
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createHeartEffect();
                    }, i * 200);
                }
                
                // Make characters do a special animation
                setTimeout(() => {
                    // Slight bounce effect
                    amineImg.style.transition = 'transform 0.5s ease-out';
                    amineImg.style.transform = 'scale(1.1) translateY(-10px)';
                    
                    douaeImg.style.transition = 'transform 0.5s ease-out';
                    douaeImg.style.transform = 'scale(1.1) translateY(-10px)';
                    
                    setTimeout(() => {
                        amineImg.style.transform = 'rotate(15deg) translateX(15px) scale(1.05)';
                        douaeImg.style.transform = 'rotate(-15deg) translateX(-15px) scale(1.05)';
                    }, 500);
                }, 800);
            }, 1500);
            
            // Reset after special moment
            setTimeout(() => {
                // Fade out background effect
                const bgEffect = document.querySelector('.romantic-background');
                if (bgEffect) {
                    bgEffect.style.opacity = '0';
                    setTimeout(() => bgEffect.remove(), 1000);
                }
                
                // Reset character positions with a smooth transition
                amine.style.transition = 'all 2s ease-in-out';
                amine.style.transform = 'translateX(-60px)';
                
                douae.style.transition = 'all 2s ease-in-out';
                douae.style.transform = 'translateX(60px)';
                
                // Reset image transformations
                setTimeout(() => {
                    amineImg.style.transition = 'transform 1s ease-out';
                    amineImg.style.transform = 'rotate(5deg)';
                    
                    douaeImg.style.transition = 'transform 1s ease-out';
                    douaeImg.style.transform = 'rotate(-5deg)';
                    
                    // Remove character glows
                    const glows = document.querySelectorAll('.character-glow');
                    glows.forEach(glow => {
                        glow.style.opacity = '0';
                        setTimeout(() => glow.remove(), 1000);
                    });
                    
                    // Clear heart interval
                    clearInterval(heartInterval);
                    
                    // Reset special moment flag after delay
                    setTimeout(() => {
                        specialMomentActive = false;
                    }, 2000);
                }, 1000);
            }, 5000);
        }, 1500);
    }
    
    // Create a romantic background effect
    function createRomanticBackgroundEffect() {
        const bgEffect = document.createElement('div');
        bgEffect.className = 'romantic-background';
        bgEffect.style.position = 'fixed';
        bgEffect.style.top = '0';
        bgEffect.style.left = '0';
        bgEffect.style.width = '100%';
        bgEffect.style.height = '100%';
        bgEffect.style.background = 'radial-gradient(circle at center, rgba(255,192,203,0.2) 0%, transparent 70%)';
        bgEffect.style.opacity = '0';
        bgEffect.style.transition = 'opacity 2s ease';
        bgEffect.style.zIndex = '5';
        bgEffect.style.pointerEvents = 'none';
        
        document.body.appendChild(bgEffect);
        
        // Calculate position to focus on characters
        const container = document.querySelector('.characters-container');
        if (container) {
            const rect = container.getBoundingClientRect();
            bgEffect.style.backgroundPosition = `center ${rect.top + 100}px`;
        }
        
        // Fade in
        setTimeout(() => {
            bgEffect.style.opacity = '1';
        }, 100);
    }
    
    // Create glow effect around a character
    function createCharacterGlow(characterElem, color) {
        const glow = document.createElement('div');
        glow.className = 'character-glow';
        glow.style.position = 'absolute';
        glow.style.top = '-20px';
        glow.style.left = '-20px';
        glow.style.right = '-20px';
        glow.style.bottom = '-20px';
        glow.style.borderRadius = '50%';
        glow.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`;
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 1.5s ease';
        glow.style.zIndex = '-1';
        
        characterElem.appendChild(glow);
        
        // Fade in the glow
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 100);
    }
    
    // Perform a dance move based on current state
    function performDance() {
        // Cycle through dance states
        danceState = (danceState + 1) % 7;
        
        switch (danceState) {
            case 0:
                danceSideToSide();
                break;
            case 1:
                danceJump();
                break;
            case 2:
                danceRomanticSway();
                break;
            case 3:
                danceSpin();
                break;
            case 4:
                danceLean();
                break;
            case 5:
                danceWave();
                break;
            case 6:
                danceBow();
                break;
        }
        
        // Create heart effect occasionally
        if (Math.random() > 0.6) {
            createHeartEffect();
        }
        
        // Trigger special moment occasionally
        if (Math.random() > 0.95 && !specialMomentActive) {
            danceSpecialMoment();
        }
    }
    
    // Start regular dance interval
    function startDancing() {
        if (danceInterval) {
            clearInterval(danceInterval);
        }
        
        // Start with a romantic moment right away
        setTimeout(danceSpecialMoment, 1000);
        
        // Dance every 2.4 seconds (aligned to common music beats)
        danceInterval = setInterval(performDance, 2400);
    }
    
    // Stop dancing
    function stopDancing() {
        if (danceInterval) {
            clearInterval(danceInterval);
            danceInterval = null;
        }
        
        if (heartInterval) {
            clearInterval(heartInterval);
            heartInterval = null;
        }
    }
    
    // Create dance timeline based on song sections
    function createDanceTimeline() {
        if (!backgroundMusic) return;
        
        // Timeline of special dance sequences (timestamps in seconds)
        const timeline = [
            { time: 10, action: danceSpecialMoment },
            { time: 30, action: danceSpecialMoment },
            { time: 60, action: danceSpecialMoment },
            { time: 90, action: danceSpecialMoment },
            { time: 120, action: danceSpecialMoment },
            { time: 150, action: danceSpecialMoment },
            { time: 180, action: danceSpecialMoment }
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
        // Initialize character positions
        initCharacters();
        
        // Remove lyrics container to simplify the interface
        const lyricsContainer = document.getElementById('lyricsContainer');
        const lyricsToggle = document.getElementById('lyricsToggle');
        
        if (lyricsContainer) {
            lyricsContainer.style.display = 'none';
        }
        
        if (lyricsToggle) {
            lyricsToggle.style.display = 'none';
        }
        
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
