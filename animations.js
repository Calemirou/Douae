/**
 * animations.js - Animation functions for the "I Love You Douae" webpage
 * This file contains all the animation logic separated from the main HTML
 */

// Main initialization function to be called from the HTML
function initAnimations() {
    // Create background elements
    createStars();
    initFlowers();
    
    // Setup character animations
    setupCharacterAnimations();
    
    // Setup click and hover effects
    setupInteractionEffects();
    
    // Setup lyrics display
    setupLyricsSystem();
}

// ==============================================
// BACKGROUND ANIMATIONS
// ==============================================

// Create starry background
function createStars() {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;
    
    // Clear any existing stars
    starsContainer.innerHTML = '';
    
    // Create 100 stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = posX + "px";
        star.style.top = posY + "px";
        star.style.opacity = Math.random();
        star.style.animationDuration = Math.random() * 3 + 1 + "s";
        
        // Add twinkling animation
        star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite`;
        
        starsContainer.appendChild(star);
    }
}

// Initialize and manage floating flowers
function initFlowers() {
    const flowersContainer = document.getElementById("flowers");
    if (!flowersContainer) return;
    
    // Clear any existing flowers
    flowersContainer.innerHTML = '';
    
    // Create initial batch of flowers
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFlower();
        }, i * 300);
    }
    
    // Periodically add more flowers
    setInterval(() => {
        createFlower();
    }, 1000);
}

// Create a single floating flower
function createFlower() {
    const flowersContainer = document.getElementById("flowers");
    if (!flowersContainer) return;
    
    const flower = document.createElement("div");
    flower.classList.add("flower");
    
    // Random properties
    const posX = Math.random() * window.innerWidth;
    const size = Math.random() * 10 + 10;
    const speed = Math.random() * 5 + 7;
    
    // Random color from pink spectrum
    const hue = Math.random() * 30 + 330; // 330-360 (red to pink)
    const color = `hsl(${hue}, 100%, 80%)`;
    
    flower.style.left = posX + "px";
    flower.style.width = size + "px";
    flower.style.height = size + "px";
    flower.style.background = color;
    flower.style.animationDuration = speed + "s";
    
    flowersContainer.appendChild(flower);
    
    // Remove after animation completes
    setTimeout(() => {
        flower.remove();
    }, speed * 1000);
}

// ==============================================
// CHARACTER ANIMATIONS
// ==============================================

// Setup character animation sequence
function setupCharacterAnimations() {
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (!amineChar || !douaeChar) return;
    
    // Make sure characters start in correct positions
    amineChar.style.left = "-150px";
    douaeChar.style.right = "-150px";
    
    // Start character animation after a delay
    setTimeout(() => {
        startCharacterAnimation(amineChar, douaeChar);
    }, 3000);
    
    // Create initial butterflies
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        setTimeout(() => {
            createButterfly(x, y);
        }, i * 1000);
    }
}

// Start the character animation sequence
function startCharacterAnimation(amineChar, douaeChar) {
    // Add walking class to both characters
    amineChar.classList.add('walking');
    douaeChar.classList.add('walking');
    
    // Animate Amine walking in from left
    const amineAnim = amineChar.animate(
        [
            { left: '-150px' },
            { left: '30%' }
        ],
        {
            duration: 5000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Animate Douae walking in from right
    const douaeAnim = douaeChar.animate(
        [
            { right: '-150px' },
            { right: '30%' }
        ],
        {
            duration: 5000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Extended animation sequence - total time 3:31 (211 seconds)
    scheduleCharacterInteractions(amineChar, douaeChar);
}

// Schedule the full 3:31 character animation sequence
function scheduleCharacterInteractions(amineChar, douaeChar) {
    // Meeting animation after walking in (5 seconds)
    setTimeout(() => {
        // First meeting interaction
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Show flower gift
        showGift(amineChar, 'flower');
        
        // After receiving gift, show reaction
        setTimeout(() => {
            showReaction(douaeChar, 'love');
            
            // Both characters happy bounce animation
            amineChar.classList.add('happy-meeting');
            douaeChar.classList.add('happy-meeting');
        }, 1000);
    }, 5000);
    
    // Second interaction at 30 seconds
    setTimeout(() => {
        // Amine jumps with excitement
        amineChar.classList.add('jumping');
        setTimeout(() => amineChar.classList.remove('jumping'), 600);
        
        // Show heart gift after jump
        setTimeout(() => {
            showGift(amineChar, 'heart');
            hideGift(amineChar, 'flower');
            
            // Show surprise reaction
            setTimeout(() => {
                showReaction(douaeChar, 'surprise');
                hideReaction(douaeChar, 'love');
                
                // Create heart trail between characters
                createHeartTrail(amineChar, douaeChar);
            }, 800);
        }, 700);
    }, 30000);
    
    // Third interaction at 1 minute
    setTimeout(() => {
        // Amine presents gift box
        showGift(amineChar, 'gift-box');
        hideGift(amineChar, 'heart');
        
        // Douae happy reaction
        showReaction(douaeChar, 'happy');
        hideReaction(douaeChar, 'surprise');
        
        // Characters dance together
        amineChar.classList.add('dancing');
        douaeChar.classList.add('dancing');
        
        // Create multiple butterflies around them
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const charRect = douaeChar.getBoundingClientRect();
                createButterfly(
                    charRect.left + Math.random() * charRect.width,
                    charRect.top + Math.random() * charRect.height
                );
            }, i * 300);
        }
    }, 60000);
    
    // Fourth interaction at 1:30
    setTimeout(() => {
        // Stop dancing
        amineChar.classList.remove('dancing');
        douaeChar.classList.remove('dancing');
        
        // Move characters closer together
        amineChar.animate(
            [
                { left: '30%' },
                { left: '35%' }
            ],
            {
                duration: 2000,
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        );
        
        douaeChar.animate(
            [
                { right: '30%' },
                { right: '35%' }
            ],
            {
                duration: 2000,
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        );
        
        // Create heart shower
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const x = window.innerWidth / 2 + (Math.random() * 200 - 100);
                    const y = 0;
                    createHeartParticle(x, y);
                }, i * 100);
            }
        }, 2500);
    }, 90000);
    
    // Fifth interaction at 2:00
    setTimeout(() => {
        // Characters jump together
        amineChar.classList.add('jumping');
        douaeChar.classList.add('jumping');
        
        setTimeout(() => {
            amineChar.classList.remove('jumping');
            douaeChar.classList.remove('jumping');
            
            // Show all gifts and reactions
            showGift(amineChar, 'flower');
            showGift(amineChar, 'heart');
            showGift(amineChar, 'gift-box');
            
            showReaction(douaeChar, 'love');
            showReaction(douaeChar, 'surprise');
            showReaction(douaeChar, 'happy');
            
            // Create firework-like effect
            createFireworkEffect();
        }, 600);
    }, 120000);
    
    // Sixth interaction at 2:30
    setTimeout(() => {
        // Hide all gifts and reactions
        hideGift(amineChar, 'flower');
        hideGift(amineChar, 'heart');
        hideGift(amineChar, 'gift-box');
        
        hideReaction(douaeChar, 'love');
        hideReaction(douaeChar, 'surprise');
        hideReaction(douaeChar, 'happy');
        
        // Characters walk hand in hand
        amineChar.classList.add('walking');
        douaeChar.classList.add('walking');
        
        // Move across screen together
        amineChar.animate(
            [
                { left: '35%' },
                { left: '70%' }
            ],
            {
                duration: 10000,
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        );
        
        douaeChar.animate(
            [
                { right: '35%' },
                { right: '0%' }
            ],
            {
                duration: 10000,
                fill: 'forwards',
                easing: 'ease-in-out'
            }
        );
        
        // Create heart trail as they walk
        const heartTrailInterval = setInterval(() => {
            const amineRect = amineChar.getBoundingClientRect();
            createHeartParticle(
                amineRect.left + amineRect.width / 2,
                amineRect.top + amineRect.height / 2
            );
        }, 300);
        
        // Clear the interval after they finish walking
        setTimeout(() => {
            clearInterval(heartTrailInterval);
        }, 10000);
    }, 150000);
    
    // Final animation at 3:00 (approaching the 3:31 mark)
    setTimeout(() => {
        // Stop walking
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Characters face each other
        amineChar.animate(
            [
                { transform: 'scaleX(1)' },
                { transform: 'scaleX(-1)' } // Flip to face Douae
            ],
            {
                duration: 500,
                fill: 'forwards'
            }
        );
        
        // Show final heart gift
        setTimeout(() => {
            showGift(amineChar, 'heart');
            
            // Final love reaction
            setTimeout(() => {
                showReaction(douaeChar, 'love');
                
                // Grand finale with lots of hearts and butterflies
                createGrandFinale();
            }, 1000);
        }, 1000);
    }, 180000);
    
    // Optional: Reset animation to beginning after the full duration (3:31 = 211 seconds)
    setTimeout(() => {
        resetCharacterAnimations(amineChar, douaeChar);
    }, 211000);
}

// Reset characters to initial positions to restart animation
function resetCharacterAnimations(amineChar, douaeChar) {
    // Reset character positions and states
    amineChar.style.left = "-150px";
    douaeChar.style.right = "-150px";
    
    // Remove any active classes
    amineChar.classList.remove('walking', 'jumping', 'dancing', 'happy-meeting');
    douaeChar.classList.remove('walking', 'jumping', 'dancing', 'happy-meeting');
    
    // Reset any transforms
    amineChar.style.transform = '';
    douaeChar.style.transform = '';
    
    // Hide all gifts and reactions
    hideGift(amineChar, 'flower');
    hideGift(amineChar, 'heart');
    hideGift(amineChar, 'gift-box');
    
    hideReaction(douaeChar, 'love');
    hideReaction(douaeChar, 'surprise');
    hideReaction(douaeChar, 'happy');
    
    // Restart the animation sequence after a short delay
    setTimeout(() => {
        startCharacterAnimation(amineChar, douaeChar);
    }, 3000);
}

// Helper function to show a gift
function showGift(character, giftType) {
    const gift = character.querySelector(`.gift.${giftType}`);
    if (gift) {
        gift.classList.remove('hidden');
        gift.classList.add('visible');
        gift.classList.add('floating');
    }
}

// Helper function to hide a gift
function hideGift(character, giftType) {
    const gift = character.querySelector(`.gift.${giftType}`);
    if (gift) {
        gift.classList.remove('visible', 'floating');
        gift.classList.add('hidden');
    }
}

// Helper function to show a reaction
function showReaction(character, reactionType) {
    const reaction = character.querySelector(`.reaction.${reactionType}`);
    if (reaction) {
        reaction.classList.remove('hidden');
        reaction.classList.add('visible');
        reaction.classList.add('floating');
    }
}

// Helper function to hide a reaction
function hideReaction(character, reactionType) {
    const reaction = character.querySelector(`.reaction.${reactionType}`);
    if (reaction) {
        reaction.classList.remove('visible', 'floating');
        reaction.classList.add('hidden');
    }
}

// Create heart trail between characters
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
            
            createHeartTrailParticle(x, y);
        }, i * 150);
    }
}

// Create a single heart trail particle
function createHeartTrailParticle(x, y) {
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
}

// Create a firework-like effect
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

// Create the grand finale effect
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

// ==============================================
// INTERACTION EFFECTS
// ==============================================

// Setup click and hover effects
function setupInteractionEffects() {
    // Create hearts and butterflies on click
    document.body.addEventListener("click", function(event) {
        // Create butterflies at click position
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createButterfly(event.clientX, event.clientY);
            }, i * 100);
        }
        
        // Create heart particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeartParticle(event.clientX, event.clientY);
            }, i * 50);
        }
    });
    
    // Create hearts on mouse movement
    let lastMoveTime = 0;
    document.body.addEventListener("mousemove", function(event) {
        const currentTime = Date.now();
        // Only trigger effects every 300ms to avoid overwhelming effects
        if (currentTime - lastMoveTime > 300) {
            lastMoveTime = currentTime;
            
            // Create heart at mouse position
            createHeartParticle(event.clientX, event.clientY);
        }
    });
}

// Create a butterfly
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

// Create a heart particle
function createHeartParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("heart");
    particle.style.position = "absolute";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = (Math.random() * 25 + 15) + "px";
    particle.style.height = (Math.random() * 25 + 15) + "px";
    particle.style.opacity = 1;
    
    // Add heartbeat effect to hearts on mouse movement
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

// ==============================================
// LYRICS SYSTEM
// ==============================================

// Setup lyrics display and synchronization
function setupLyricsSystem() {
    // Lyrics data with timings
    const lyricsData = [
        { time: 0.0, text: "يا دعاء" },
        { time: 10.84, text: "يا دعاء يا دعاء خليتي قلبي معاك" },
        { time: 23.0, text: "لا تخافي ما ننساك ما كاين حتى شي واحدة في قلبي معاك" },
        { time: 34.959, text: "يا دعاء يا دعاء بنت الناس عقلي طاح قلبي طار" },
        { time: 48.46, text: "ما عندي فين نرتاح نتي عندي أحلى صباح كل ما نشوفك" },
        { time: 57.0, text: "تزيد الأفراح وكل ما نشوفك تزيد الأفراح يا دعاء يا دعاء" },
        { time: 76.349, text: "زينك زين ما عندو حدود شفتك غير قلبي تايدوب" },
        { time: 94.549, text: "كل نهار نتمنى نشوفك وحدك نتي سبابي نتوب يا دعاء يا دعاء" },
        { time: 109.809, text: "واعدك غير نكون معاك حبي ليك غادي نوريك مهما صرى" },
        { time: 122.469, text: "ما نخليك نتي الزين اللي خلاني نبغيك يا ملاك نور حياتي في قربك كل" },
        { time: 135.829, text: "نجاتي ما نقدر نعيش بلا بيك نتي سبب كل سعادتي كل" },
        { time: 148.569, text: "سعادتي يا دعاء يا دعاء عيونك بحر الأسرار ضحكتك" },
        { time: 164.469, text: "تنور نهار كل شي فيك يسحرني وانتي عندي أجمل الأقدار" },
        { time: 173.649, text: "قلبك طيب شبعان حنان حبك لي أغلى الأمان عاهدتك نبقى" },
        { time: 188.749, text: "وفي حبك سكن في الوجدان يا دعاء يا دعاء" }
    ];
    
    // Get DOM elements
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const currentLyricElement = document.getElementById('currentLyric');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (!lyricsContainer || !lyricsToggle || !currentLyricElement || !backgroundMusic) return;
    
    // Setup lyrics toggle button
    let lyricsShown = false;
    lyricsToggle.addEventListener('click', function() {
        lyricsShown = !lyricsShown;
        if (lyricsShown) {
            lyricsContainer.style.display = 'block';
            // Small delay to allow display to initialize before animation
            setTimeout(() => {
                lyricsContainer.classList.add('visible');
            }, 10);
            lyricsToggle.textContent = '🎵 Hide Lyrics';
        } else {
            lyricsContainer.classList.remove('visible');
            // Wait for animation to complete before hiding
            setTimeout(() => {
                lyricsContainer.style.display = 'none';
            }, 300);
            lyricsToggle.textContent = '🎵 Show Lyrics';
        }
    });
    
    // Track current active line
    let currentActiveIndex = -1;
    
    // Start tracking lyrics when music plays
    let updateLyricsStarted = false;
    backgroundMusic.addEventListener('play', function() {
        if (!updateLyricsStarted) {
            updateLyrics();
            updateLyricsStarted = true;
        }
    });
    
    // Update lyrics based on current time
    function updateLyrics() {
        if (!backgroundMusic.paused) {
            const currentTime = backgroundMusic.currentTime;
            
            // Find the correct lyric with look-ahead
            let activeIndex = findLyricWithLookahead(currentTime);
            
            // Only update DOM if the active line changed
            if (activeIndex !== currentActiveIndex) {
                if (activeIndex >= 0) {
                    // Update the current lyric with animation
                    currentLyricElement.style.animation = 'none';
                    // Trigger reflow
                    void currentLyricElement.offsetWidth;
                    currentLyricElement.textContent = lyricsData[activeIndex].text;
                    currentLyricElement.style.animation = 'fadeText 0.3s ease-out';
                }
                
                currentActiveIndex = activeIndex;
            }
        }
        
        // Continue updating at 60fps
        requestAnimationFrame(updateLyrics);
    }
    
    // Find lyric with look-ahead to reduce delay
    function findLyricWithLookahead(currentTime) {
        // Look-ahead time (seconds)
        const lookAheadTime = 0.25;
        
        // Use adjusted time for finding lyrics
        const adjustedTime = currentTime + lookAheadTime;
        
        // Find the lyrics index using adjusted time
        let index = findActiveLyricIndex(adjustedTime);
        
        // If we're very close to the next lyric, show it slightly early
        if (index !== -1 && index < lyricsData.length - 1) {
            const nextLyricTime = lyricsData[index + 1].time;
            const timeToNextLyric = nextLyricTime - currentTime;
            
            // If next lyric is coming within 0.2 seconds and current lyric has been shown for at least 0.5 seconds
            if (timeToNextLyric < 0.2 && currentTime - lyricsData[index].time > 0.5) {
                return index + 1;
            }
        }
        
        return index;
    }
    
    // Binary search to find the current lyric index - efficient for large lyric sets
    function findActiveLyricIndex(currentTime) {
        let low = 0;
        let high = lyricsData.length - 1;
        
        // Empty lyrics case
        if (high < 0) return -1;
        
        // Before first lyric
        if (currentTime < lyricsData[0].time) return -1;
        
        // After last lyric
        if (currentTime >= lyricsData[high].time) return high;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            
            // Found the perfect match
            if (currentTime >= lyricsData[mid].time && 
                (mid === lyricsData.length - 1 || currentTime < lyricsData[mid + 1].time)) {
                return mid;
            }
            
            if (currentTime < lyricsData[mid].time) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return -1;
    }
    
    // Smooth scrolling function
    function smoothScrollTo(element, target, duration) {
        const start = element.scrollTop;
        const change = target - start;
        const startTime = performance.now();
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother scroll
            const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            element.scrollTop = start + change * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    }
}