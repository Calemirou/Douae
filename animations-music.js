/**
 * animations-music.js - Music and audio control functions for the "I Love You Douae" webpage
 * This file contains the music player functionality and synchronization with animations
 */

// Initialize music player system
function initMusicPlayer() {
    // Background music setup
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (!backgroundMusic) return;
    
    backgroundMusic.volume = 0.5;
    let musicEnabled = true;
    
    // Toggle music button functionality
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            musicEnabled = !musicEnabled;
            musicToggle.textContent = musicEnabled ? '🎵 Music On' : '🎵 Music Off';
            
            if (musicEnabled) {
                backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            } else {
                backgroundMusic.pause();
            }
        });
    }
    
    // Need user interaction to start audio (browser requirement)
    let firstInteractionHandled = false;
    document.addEventListener('click', function() {
        if (!firstInteractionHandled && musicEnabled) {
            // Request preload of lyrics
            const requestPreload = true;
            
            // Preload audio for faster start
            backgroundMusic.load();
            
            // Small delay to allow preloading
            setTimeout(() => {
                backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            }, 100);
            
            firstInteractionHandled = true;
        }
    }, { once: true });
    
    // Synchronize music with animations
    backgroundMusic.addEventListener('timeupdate', function() {
        // This event fires frequently as the music plays
        // Use it to trigger time-based animation events
        const currentTime = backgroundMusic.currentTime;
        
        // Example: Trigger a special animation at a specific timestamp
        triggerTimedAnimations(currentTime);
    });
    
    // When music ends or loops, reset any needed animation states
    backgroundMusic.addEventListener('ended', function() {
        if (backgroundMusic.loop) {
            resetAnimationStates();
        }
    });
}

// Trigger animations at specific timestamps in the music
function triggerTimedAnimations(currentTime) {
    // Define key moments in the song (in seconds)
    const keyMoments = [
        { time: 10.8, event: 'chorus1Start' },
        { time: 34.9, event: 'verse2Start' },
        { time: 57.0, event: 'chorus2Start' },
        { time: 76.3, event: 'verse3Start' },
        { time: 109.8, event: 'bridge1Start' },
        { time: 148.5, event: 'chorus3Start' },
        { time: 188.7, event: 'outroStart' }
    ];
    
    // Find any key moments that are occurring now (within a small threshold)
    const threshold = 0.1; // 100ms threshold
    for (const moment of keyMoments) {
        if (Math.abs(currentTime - moment.time) < threshold) {
            // This key moment is happening now, trigger the associated animation
            triggerMusicSyncedAnimation(moment.event);
            break; // Only trigger one event per check
        }
    }
}

// Handle different music-synced animation events
function triggerMusicSyncedAnimation(eventName) {
    // Get character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (!amineChar || !douaeChar) return;
    
    // Trigger different animations based on the music event
    switch (eventName) {
        case 'chorus1Start':
            // Create heart burst
            createHeartBurst();
            // Make characters do a short dance
            amineChar.classList.add('happy-meeting');
            douaeChar.classList.add('happy-meeting');
            setTimeout(() => {
                amineChar.classList.remove('happy-meeting');
                douaeChar.classList.remove('happy-meeting');
            }, 1000);
            break;
            
        case 'verse2Start':
            // Make Amine present a gift
            showGift(amineChar, 'heart');
            hideGift(amineChar, 'flower');
            
            // Make Douae react
            showReaction(douaeChar, 'surprise');
            hideReaction(douaeChar, 'love');
            break;
            
        case 'chorus2Start':
            // Create butterflies around characters
            const amineRect = amineChar.getBoundingClientRect();
            const douaeRect = douaeChar.getBoundingClientRect();
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createButterfly(
                        amineRect.left + Math.random() * amineRect.width,
                        amineRect.top + Math.random() * amineRect.height
                    );
                    createButterfly(
                        douaeRect.left + Math.random() * douaeRect.width,
                        douaeRect.top + Math.random() * douaeRect.height
                    );
                }, i * 200);
            }
            break;
            
        case 'verse3Start':
            // Switch gift
            showGift(amineChar, 'gift-box');
            hideGift(amineChar, 'heart');
            
            // Switch reaction
            showReaction(douaeChar, 'happy');
            hideReaction(douaeChar, 'surprise');
            break;
            
        case 'bridge1Start':
            // Create heart trail between characters
            createHeartTrail(amineChar, douaeChar);
            break;
            
        case 'chorus3Start':
            // Create firework effect
            createFireworkEffect();
            break;
            
        case 'outroStart':
            // Grand finale
            createGrandFinale();
            break;
    }
}

// Create a heart burst animation around the center
function createHeartBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create hearts in a circular pattern
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            createHeartParticle(x, y);
        }, i * 50);
    }
}

// Reset animation states when music loops
function resetAnimationStates() {
    // Hide all gifts and reactions on characters
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (!amineChar || !douaeChar) return;
    
    // Hide all gifts
    hideGift(amineChar, 'flower');
    hideGift(amineChar, 'heart');
    hideGift(amineChar, 'gift-box');
    
    // Hide all reactions
    hideReaction(douaeChar, 'love');
    hideReaction(douaeChar, 'surprise');
    hideReaction(douaeChar, 'happy');
    
    // Show initial gift and reaction
    showGift(amineChar, 'flower');
    showReaction(douaeChar, 'love');
}

// Main initialization function to be called from HTML
function initMusicSystem() {
    // Initialize the music player
    initMusicPlayer();
}

// If these functions are referenced from animations.js, make sure they're available
// These are just stub implementations if they aren't already defined elsewhere
if (typeof showGift !== 'function') {
    function showGift(character, giftType) {
        const gift = character.querySelector(`.gift.${giftType}`);
        if (gift) {
            gift.classList.remove('hidden');
            gift.classList.add('visible');
            gift.classList.add('floating');
        }
    }
}

if (typeof hideGift !== 'function') {
    function hideGift(character, giftType) {
        const gift = character.querySelector(`.gift.${giftType}`);
        if (gift) {
            gift.classList.remove('visible', 'floating');
            gift.classList.add('hidden');
        }
    }
}

if (typeof showReaction !== 'function') {
    function showReaction(character, reactionType) {
        const reaction = character.querySelector(`.reaction.${reactionType}`);
        if (reaction) {
            reaction.classList.remove('hidden');
            reaction.classList.add('visible');
            reaction.classList.add('floating');
        }
    }
}

if (typeof hideReaction !== 'function') {
    function hideReaction(character, reactionType) {
        const reaction = character.querySelector(`.reaction.${reactionType}`);
        if (reaction) {
            reaction.classList.remove('visible', 'floating');
            reaction.classList.add('hidden');
        }
    }
}

if (typeof createHeartParticle !== 'function') {
    function createHeartParticle(x, y) {
        const particle = document.createElement("div");
        particle.classList.add("heart");
        particle.style.position = "absolute";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.width = (Math.random() * 25 + 15) + "px";
        particle.style.height = (Math.random() * 25 + 15) + "px";
        particle.style.opacity = 1;
        
        // Add heartbeat effect
        particle.style.animation = "heartPulse 0.8s infinite";
        
        // Add 3D heart parts to the particle
        const leftHalf = document.createElement("div");
        leftHalf.classList.add("heart-half", "left");
        
        const rightHalf = document.createElement("div");
        rightHalf.classList.add("heart-half", "right");
        
        // Randomly choose between skyblue and pink hearts
        if (Math.random() > 0.5) {
            particle.classList.add("pink");
        }
        
        particle.appendChild(leftHalf);
        particle.appendChild(rightHalf);
        
        document.body.appendChild(particle);
        
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        // Animate
        const startTime = Date.now();
        const duration = Math.random() * 1000 + 1000;
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const currentX = x + (endX - x) * progress;
            const currentY = y + (endY - y) * progress - 50 * Math.sin(progress * Math.PI);
            
            particle.style.left = currentX + "px";
            particle.style.top = currentY + "px";
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 - progress * 0.5})`;
            
            requestAnimationFrame(animateParticle);
        }
        
        animateParticle();
    }
}

if (typeof createButterfly !== 'function') {
    function createButterfly(x, y) {
        const butterfly = document.createElement("div");
        butterfly.classList.add("butterfly");
        
        // Create wings
        const leftWing = document.createElement("div");
        leftWing.classList.add("butterfly-wing", "left");
        
        const rightWing = document.createElement("div");
        rightWing.classList.add("butterfly-wing", "right");
        
        butterfly.appendChild(leftWing);
        butterfly.appendChild(rightWing);
        
        // Random color
        const hue = Math.random() * 60 + 300; // Pink to purple range
        const color = `hsla(${hue}, 100%, 75%, 0.7)`;
        leftWing.style.background = color;
        rightWing.style.background = color;
        
        // Position and style
        butterfly.style.left = x + "px";
        butterfly.style.top = y + "px";
        
        document.body.appendChild(butterfly);
        
        // Animate butterfly
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const startTime = Date.now();
        
        function animateButterfly() {
            const elapsed = Date.now() - startTime;
            const dx = Math.cos(angle) * speed;
            const dy = Math.sin(angle) - elapsed / 2000; // Gradually float up
            
            const currentX = parseFloat(butterfly.style.left);
            const currentY = parseFloat(butterfly.style.top);
            
            butterfly.style.left = (currentX + dx) + "px";
            butterfly.style.top = (currentY + dy) + "px";
            
            // Remove if out of screen
            if (currentY < -50 || currentX < -50 || currentX > window.innerWidth + 50) {
                butterfly.remove();
                return;
            }
            
            requestAnimationFrame(animateButterfly);
        }
        
        animateButterfly();
        
        // Remove after 10 seconds
        setTimeout(() => {
            butterfly.remove();
        }, 10000);
    }
}

if (typeof createHeartTrail !== 'function') {
    function createHeartTrail(fromChar, toChar) {
        const fromRect = fromChar.getBoundingClientRect();
        const toRect = toChar.getBoundingClientRect();
        
        const startX = fromRect.left + fromRect.width / 2;
        const startY = fromRect.top + fromRect.height / 3;
        const endX = toRect.left + toRect.width / 2;
        const endY = toRect.top + toRect.height / 3;
        
        // Create multiple hearts along the trail
        const steps = 8;
        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                const progress = i / (steps - 1);
                const x = startX + (endX - startX) * progress;
                const y = startY + (endY - startY) * progress - Math.sin(progress * Math.PI) * 50;
                
                const heart = document.createElement('div');
                heart.classList.add('heart-trail');
                heart.innerHTML = '❤️';
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                
                document.body.appendChild(heart);
                
                // Remove after animation finishes
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 150);
        }
    }
}

if (typeof createFireworkEffect !== 'function') {
    function createFireworkEffect() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create multiple explosions
        for (let j = 0; j < 3; j++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 300;
                const offsetY = (Math.random() - 0.5) * 200;
                
                // Each explosion has multiple particles
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const angle = (i / 20) * Math.PI * 2;
                        const distance = 100 + Math.random() * 50;
                        const explosionX = centerX + offsetX + Math.cos(angle) * distance;
                        const explosionY = centerY + offsetY + Math.sin(angle) * distance;
                        
                        // Alternate between hearts and butterflies
                        if (i % 2 === 0) {
                            createHeartParticle(explosionX, explosionY);
                        } else {
                            createButterfly(explosionX, explosionY);
                        }
                    }, i * 30);
                }
            }, j * 800);
        }
    }
}

if (typeof createGrandFinale !== 'function') {
    function createGrandFinale() {
        // Create heart shower
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = -20; // Start from top
                createHeartParticle(x, y);
            }, i * 100);
        }
        
        // Create butterfly storm
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createButterfly(x, y);
            }, i * 150 + 500);
        }
        
        // Create radial heart burst
        setTimeout(() => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            for (let i = 0; i < 36; i++) {
                setTimeout(() => {
                    const angle = (i / 36) * Math.PI * 2;
                    const distance = 150;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    
                    createHeartParticle(x, y);
                }, i * 50);
            }
        }, 2000);
    }
}