/**
 * enhanced-animations.js - Enhanced animation sequences for the "I Love You Douae" webpage
 * This file adds more intimate and dynamic character interactions
 */

// Add enhanced animation sequences
function enhanceCharacterAnimations() {
    console.log("Enhancing character animations with more intimate interactions...");
    
    // Get character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (!amineChar || !douaeChar) {
        console.error("Character elements not found!");
        return;
    }
    
    // Get the background music to sync with
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        // Listen for timeupdate to trigger animations at precise moments
        backgroundMusic.addEventListener('timeupdate', function() {
            const currentTime = backgroundMusic.currentTime;
            triggerEnhancedAnimations(currentTime, amineChar, douaeChar);
        });
    }
    
    // Also schedule the enhanced animations independently
    scheduleEnhancedInteractions(amineChar, douaeChar);
}

// Schedule enhanced interaction sequences 
function scheduleEnhancedInteractions(amineChar, douaeChar) {
    // Approaching sequence - characters move closer (at 15 seconds)
    setTimeout(() => {
        console.log("Triggering approach animation");
        approachAnimation(amineChar, douaeChar);
    }, 15000);
    
    // Jumping together sequence (at 40 seconds)
    setTimeout(() => {
        console.log("Triggering jumping together animation");
        jumpTogetherAnimation(amineChar, douaeChar);
    }, 40000);
    
    // Hugging sequence (at 70 seconds)
    setTimeout(() => {
        console.log("Triggering hugging animation");
        huggingAnimation(amineChar, douaeChar);
    }, 70000);
    
    // Moving apart sequence (at 100 seconds)
    setTimeout(() => {
        console.log("Triggering moving apart animation");
        movingApartAnimation(amineChar, douaeChar);
    }, 100000);
    
    // Spinning/Dancing sequence (at 130 seconds)
    setTimeout(() => {
        console.log("Triggering dancing/spinning animation");
        danceTogetherAnimation(amineChar, douaeChar);
    }, 130000);
    
    // Kiss sequence (at 160 seconds)
    setTimeout(() => {
        console.log("Triggering kiss animation");
        kissAnimation(amineChar, douaeChar);
    }, 160000);
    
    // Final embrace sequence (at 190 seconds)
    setTimeout(() => {
        console.log("Triggering final embrace animation");
        finalEmbraceAnimation(amineChar, douaeChar);
    }, 190000);
}

// Trigger enhanced animations based on precise music timing
function triggerEnhancedAnimations(currentTime, amineChar, douaeChar) {
    // Define key animation moments that sync with music beats or lyrics
    const animationKeypoints = [
        { time: 12.5, action: () => createHeartBurst(amineChar, douaeChar) },
        { time: 25.2, action: () => blushAnimation(douaeChar) },
        { time: 36.7, action: () => jumpExcitedAnimation(amineChar) },
        { time: 58.3, action: () => spinAroundAnimation(douaeChar) },
        { time: 77.8, action: () => wavingAnimation(amineChar) },
        { time: 96.5, action: () => blowKissAnimation(amineChar, douaeChar) },
        { time: 110.2, action: () => handHoldingAnimation(amineChar, douaeChar) },
        { time: 149.8, action: () => synchronizedJumpAnimation(amineChar, douaeChar) },
        { time: 165.1, action: () => heartEyesAnimation(douaeChar) },
        { time: 174.5, action: () => admiringGazeAnimation(amineChar, douaeChar) }
    ];
    
    // Check if we're at one of the keypoints (within a small threshold)
    const threshold = 0.1; // 100ms precision
    for (const keypoint of animationKeypoints) {
        if (Math.abs(currentTime - keypoint.time) < threshold) {
            keypoint.action();
            break; // Only trigger one keypoint per update
        }
    }
}

// ===== ENHANCED ANIMATION SEQUENCES =====

// Approaching animation - characters move closer to each other
function approachAnimation(amineChar, douaeChar) {
    // Make characters face each other
    amineChar.classList.add('walking');
    douaeChar.classList.add('walking');
    
    // Move Amine closer
    amineChar.animate(
        [
            { left: '30%' },
            { left: '40%' }
        ],
        {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Move Douae closer
    douaeChar.animate(
        [
            { right: '30%' },
            { right: '40%' }
        ],
        {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // After approaching, stop walking and show excitement
    setTimeout(() => {
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Show excitement reactions
        amineChar.classList.add('happy-meeting');
        douaeChar.classList.add('happy-meeting');
        
        showReaction(douaeChar, 'surprise');
        
        // Create hearts between them
        createHeartTrail(amineChar, douaeChar);
        
        setTimeout(() => {
            amineChar.classList.remove('happy-meeting');
            douaeChar.classList.remove('happy-meeting');
        }, 1000);
    }, 3000);
}

// Jumping together animation - both characters jump at the same time
function jumpTogetherAnimation(amineChar, douaeChar) {
    // Hide any existing reactions
    hideAllReactions(douaeChar);
    
    // Add jumping class to both characters
    amineChar.classList.add('jumping');
    douaeChar.classList.add('jumping');
    
    // Create colorful butterfly burst
    const amineRect = amineChar.getBoundingClientRect();
    const douaeRect = douaeChar.getBoundingClientRect();
    
    // Create butterflies from both characters
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createButterfly(
                amineRect.left + Math.random() * amineRect.width,
                amineRect.top + Math.random() * amineRect.height/2
            );
            createButterfly(
                douaeRect.left + Math.random() * douaeRect.width,
                douaeRect.top + Math.random() * douaeRect.height/2
            );
        }, i * 100);
    }
    
    // Remove jumping class after animation completes
    setTimeout(() => {
        amineChar.classList.remove('jumping');
        douaeChar.classList.remove('jumping');
        
        // Show happy reaction
        showReaction(douaeChar, 'happy');
    }, 600);
}

// Hugging animation - characters move to hugging position
function huggingAnimation(amineChar, douaeChar) {
    // Hide any existing reactions and gifts
    hideAllReactions(douaeChar);
    hideAllGifts(amineChar);
    
    // Make characters move very close together for hugging
    amineChar.animate(
        [
            { left: '40%' },
            { left: '42%' }
        ],
        {
            duration: 1500,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    douaeChar.animate(
        [
            { right: '40%' },
            { right: '42%' }
        ],
        {
            duration: 1500,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Add hugging effect - subtle scale and rotate animation
    setTimeout(() => {
        // Apply gentle rocking animation to both characters
        const huggingAnimation = [
            { transform: 'rotate(-2deg) scale(1.05)' },
            { transform: 'rotate(2deg) scale(1.05)' },
            { transform: 'rotate(-2deg) scale(1.05)' },
            { transform: 'rotate(0deg) scale(1)' }
        ];
        
        amineChar.animate(huggingAnimation, {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        });
        
        douaeChar.animate(huggingAnimation, {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        });
        
        // Create heart shower above them
        const centerX = (amineChar.getBoundingClientRect().left + douaeChar.getBoundingClientRect().left) / 2;
        const centerY = Math.min(amineChar.getBoundingClientRect().top, douaeChar.getBoundingClientRect().top) - 50;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = centerX + (Math.random() * 100 - 50);
                const y = centerY - Math.random() * 50;
                createHeartParticle(x, y);
            }, i * 100);
        }
        
        // Show love reaction
        setTimeout(() => {
            showReaction(douaeChar, 'love');
        }, 1000);
    }, 1500);
}

// Moving apart animation - characters move apart briefly
function movingApartAnimation(amineChar, douaeChar) {
    // Hide reactions
    hideAllReactions(douaeChar);
    
    // Start walking animation
    amineChar.classList.add('walking');
    douaeChar.classList.add('walking');
    
    // Move characters apart
    amineChar.animate(
        [
            { left: '42%' },
            { left: '25%' }
        ],
        {
            duration: 4000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    douaeChar.animate(
        [
            { right: '42%' },
            { right: '25%' }
        ],
        {
            duration: 4000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // After moving apart, show longing
    setTimeout(() => {
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Amine presents a heart gift
        showGift(amineChar, 'heart');
        
        // Create a path of hearts leading to Douae
        const amineRect = amineChar.getBoundingClientRect();
        const douaeRect = douaeChar.getBoundingClientRect();
        const startX = amineRect.right;
        const startY = amineRect.top + amineRect.height/2;
        const endX = douaeRect.left;
        const endY = douaeRect.top + douaeRect.height/2;
        
        // Create heart path
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const progress = i / 11;
                const x = startX + (endX - startX) * progress;
                const y = startY + (endY - startY) * progress - Math.sin(progress * Math.PI) * 50;
                createHeartTrailParticle(x, y);
            }, i * 200);
        }
        
        // Douae shows surprise, then love reaction
        setTimeout(() => {
            showReaction(douaeChar, 'surprise');
            
            setTimeout(() => {
                hideReaction(douaeChar, 'surprise');
                showReaction(douaeChar, 'love');
            }, 1500);
        }, 1000);
    }, 4000);
}

// Dancing/spinning animation
function danceTogetherAnimation(amineChar, douaeChar) {
    // Hide current gifts and reactions
    hideAllGifts(amineChar);
    hideAllReactions(douaeChar);
    
    // Make characters approach each other again
    amineChar.classList.add('walking');
    douaeChar.classList.add('walking');
    
    // Move back together
    amineChar.animate(
        [
            { left: '25%' },
            { left: '38%' }
        ],
        {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    douaeChar.animate(
        [
            { right: '25%' },
            { right: '38%' }
        ],
        {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // After coming together, start dancing
    setTimeout(() => {
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Add dancing animation
        amineChar.animate(
            [
                { transform: 'rotate(-5deg) translateY(0)' },
                { transform: 'rotate(0deg) translateY(-15px)' },
                { transform: 'rotate(5deg) translateY(0)' },
                { transform: 'rotate(0deg) translateY(-10px)' },
                { transform: 'rotate(-5deg) translateY(0)' }
            ],
            {
                duration: 2000,
                iterations: 3,
                easing: 'ease-in-out'
            }
        );
        
        douaeChar.animate(
            [
                { transform: 'rotate(5deg) translateY(0)' },
                { transform: 'rotate(0deg) translateY(-15px)' },
                { transform: 'rotate(-5deg) translateY(0)' },
                { transform: 'rotate(0deg) translateY(-10px)' },
                { transform: 'rotate(5deg) translateY(0)' }
            ],
            {
                duration: 2000,
                iterations: 3,
                easing: 'ease-in-out'
            }
        );
        
        // Create colorful effects around them while dancing
        const centerX = (amineChar.getBoundingClientRect().left + douaeChar.getBoundingClientRect().right) / 2;
        const centerY = (amineChar.getBoundingClientRect().top + douaeChar.getBoundingClientRect().top) / 2;
        
        // Create rotating hearts around them
        const totalHearts = 12;
        const radius = 150;
        
        for (let i = 0; i < totalHearts; i++) {
            setTimeout(() => {
                const angle = (i / totalHearts) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                createHeartParticle(x, y);
            }, i * 200);
        }
        
        // Show happy reactions
        showReaction(douaeChar, 'happy');
    }, 3000);
}

// Kiss animation - characters move for a kiss
function kissAnimation(amineChar, douaeChar) {
    // Hide reactions
    hideAllReactions(douaeChar);
    hideAllGifts(amineChar);
    
    // Move very close for kiss
    amineChar.animate(
        [
            { left: '38%' },
            { left: '41%' }
        ],
        {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    douaeChar.animate(
        [
            { right: '38%' },
            { right: '41%' }
        ],
        {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Kiss animation
    setTimeout(() => {
        // Lean in for kiss - slight rotation and movement
        amineChar.animate(
            [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(15deg)' }
            ],
            {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-out'
            }
        );
        
        douaeChar.animate(
            [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(-15deg)' }
            ],
            {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-out'
            }
        );
        
        // Create kiss effects
        setTimeout(() => {
            // Create a big heart at the kiss point
            const amineRect = amineChar.getBoundingClientRect();
            const douaeRect = douaeChar.getBoundingClientRect();
            const kissX = (amineRect.right + douaeRect.left) / 2;
            const kissY = Math.min(amineRect.top, douaeRect.top) + 50;
            
            // Create kiss emoji or heart effect
            const kiss = document.createElement('div');
            kiss.innerHTML = '💋';
            kiss.style.position = 'absolute';
            kiss.style.left = kissX + 'px';
            kiss.style.top = kissY + 'px';
            kiss.style.fontSize = '40px';
            kiss.style.zIndex = '100';
            kiss.style.opacity = '0';
            kiss.style.transform = 'scale(0.5)';
            kiss.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(kiss);
            
            // Animate the kiss emoji
            setTimeout(() => {
                kiss.style.opacity = '1';
                kiss.style.transform = 'scale(1.5)';
                
                // Create heart burst around the kiss
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * 80 + 30;
                        const x = kissX + Math.cos(angle) * distance;
                        const y = kissY + Math.sin(angle) * distance;
                        createHeartParticle(x, y);
                    }, i * 100);
                }
                
                // Remove kiss emoji after animation
                setTimeout(() => {
                    kiss.style.opacity = '0';
                    kiss.style.transform = 'scale(0.5) translateY(-50px)';
                    setTimeout(() => kiss.remove(), 500);
                }, 2000);
            }, 100);
            
            // Show love reaction
            showReaction(douaeChar, 'love');
        }, 1000);
        
        // Return to normal position after kiss
        setTimeout(() => {
            amineChar.animate(
                [
                    { transform: 'rotate(15deg)' },
                    { transform: 'rotate(0deg)' }
                ],
                {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in'
                }
            );
            
            douaeChar.animate(
                [
                    { transform: 'rotate(-15deg)' },
                    { transform: 'rotate(0deg)' }
                ],
                {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'ease-in'
                }
            );
        }, 3000);
    }, 2000);
}

// Final embrace animation - grand finale
function finalEmbraceAnimation(amineChar, douaeChar) {
    // Move to center together
    amineChar.animate(
        [
            { left: '41%' },
            { left: '40%' }
        ],
        {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    douaeChar.animate(
        [
            { right: '41%' },
            { right: '40%' }
        ],
        {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease-in-out'
        }
    );
    
    // Final embrace animation
    setTimeout(() => {
        // Create a gentle swaying animation together
        const swayAnimation = [
            { transform: 'rotate(-3deg) translateY(0)' },
            { transform: 'rotate(3deg) translateY(-5px)' },
            { transform: 'rotate(-3deg) translateY(0)' },
            { transform: 'rotate(0deg) translateY(-5px)' }
        ];
        
        const amineAnim = amineChar.animate(swayAnimation, {
            duration: 4000,
            iterations: 2,
            easing: 'ease-in-out'
        });
        
        const douaeAnim = douaeChar.animate(swayAnimation, {
            duration: 4000,
            iterations: 2,
            easing: 'ease-in-out'
        });
        
        // Show all gifts and reactions
        showGift(amineChar, 'flower');
        showGift(amineChar, 'heart');
        showGift(amineChar, 'gift-box');
        
        showReaction(douaeChar, 'love');
        
        // Grand finale effect - hearts and butterflies explosion
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create a heart frame around them
        const framePoints = 24;
        const frameRadius = 200;
        
        for (let i = 0; i < framePoints; i++) {
            setTimeout(() => {
                const angle = (i / framePoints) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * frameRadius;
                const y = centerY + Math.sin(angle) * frameRadius;
                
                if (i % 2 === 0) {
                    createHeartParticle(x, y);
                } else {
                    createButterfly(x, y);
                }
            }, i * 200);
        }
        
        // Final heart shower after animation completes
        setTimeout(() => {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = -20; // From top of screen
                    
                    if (i % 3 === 0) {
                        createButterfly(x, y);
                    } else {
                        createHeartParticle(x, y);
                    }
                }, i * 100);
            }
            
            // Create text message "Forever Together"
            const message = document.createElement('div');
            message.textContent = "Forever Together 💕";
            message.style.position = 'absolute';
            message.style.top = '20%';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.color = 'white';
            message.style.fontSize = '3rem';
            message.style.fontWeight = 'bold';
            message.style.textShadow = '0 0 10px rgba(255, 105, 180, 0.8)';
            message.style.zIndex = '1000';
            message.style.opacity = '0';
            message.style.transition = 'opacity 2s ease-in-out';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.opacity = '1';
                
                // Fade out message after a while
                setTimeout(() => {
                    message.style.opacity = '0';
                    setTimeout(() => message.remove(), 2000);
                }, 5000);
            }, 500);
        }, 5000);
    }, 2000);
}

// ===== ADDITIONAL ANIMATION EFFECTS =====

// Create heart burst around characters
function createHeartBurst(amineChar, douaeChar) {
    const amineRect = amineChar.getBoundingClientRect();
    const douaeRect = douaeChar.getBoundingClientRect();
    
    // Create hearts around both characters
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            // Hearts around Amine
            const amineAngle = (i / 8) * Math.PI * 2;
            const amineX = amineRect.left + amineRect.width/2 + Math.cos(amineAngle) * 50;
            const amineY = amineRect.top + amineRect.height/2 + Math.sin(amineAngle) * 50;
            createHeartParticle(amineX, amineY);
            
            // Hearts around Douae
            const douaeAngle = (i / 8) * Math.PI * 2;
            const douaeX = douaeRect.left + douaeRect.width/2 + Math.cos(douaeAngle) * 50;
            const douaeY = douaeRect.top + douaeRect.height/2 + Math.sin(douaeAngle) * 50;
            createHeartParticle(douaeX, douaeY);
        }, i * 100);
    }
}

// Blush animation for character
function blushAnimation(character) {
    // Create blush effect on cheeks
    const charRect = character.getBoundingClientRect();
    
    // Create left blush
    const leftBlush = document.createElement('div');
    leftBlush.style.position = 'absolute';
    leftBlush.style.width = '20px';
    leftBlush.style.height = '10px';
    leftBlush.style.background = 'rgba(255, 150, 150, 0.7)';
    leftBlush.style.borderRadius = '50%';
    leftBlush.style.left = (charRect.left + charRect.width * 0.3) + 'px';
    leftBlush.style.top = (charRect.top + charRect.height * 0.4) + 'px';
    leftBlush.style.zIndex = '25';
    leftBlush.style.opacity = '0';
    leftBlush.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(leftBlush);
    
    // Create right blush
    const rightBlush = document.createElement('div');
    rightBlush.style.position = 'absolute';
    rightBlush.style.width = '20px';
    rightBlush.style.height = '10px';
    rightBlush.style.background = 'rgba(255, 150, 150, 0.7)';
    rightBlush.style.borderRadius = '50%';
    rightBlush.style.left = (charRect.left + charRect.width * 0.7) + 'px';
    rightBlush.style.top = (charRect.top + charRect.height * 0.4) + 'px';
    rightBlush.style.zIndex = '25';
    rightBlush.style.opacity = '0';
    rightBlush.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(rightBlush);
    
    // Show blush
    setTimeout(() => {
        leftBlush.style.opacity = '1';
        rightBlush.style.opacity = '1';
        
        // Remove after a while
        setTimeout(() => {
            leftBlush.style.opacity = '0';
            rightBlush.style.opacity = '0';
            setTimeout(() => {
                leftBlush.remove();
                rightBlush.remove();
            }, 500);
        }, 2000);
    }, 100);
}

// Excited jump animation
function jumpExcitedAnimation(character) {
    character.classList.add('jumping');
    
    const charRect = character.getBoundingClientRect();
    
    // Create excitement stars
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            // Create star element
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.position = 'absolute';
            star.style.fontSize = '24px';
            star.style.left = (charRect.left + Math.random() * charRect.width) + 'px';
            star.style.top = (charRect.top + Math.random() * charRect.height * 0.5) + 'px';
            star.style.zIndex = '22';
            star.style.opacity = '0';
            star.style.transform = 'scale(0.5)';
            star.style.transition = 'all 0.3s ease-out';
            document.body.appendChild(star);
            
            // Animate star
            setTimeout(() => {
                star.style.opacity = '1';
                star.style.transform = 'scale(1.2)';
                
                // Move star upward and fade out
                setTimeout(() => {
                    star.style.transform = 'scale(0.8) translateY(-40px)';
                    star.style.opacity = '0';
                    setTimeout(() => star.remove(), 300);
                }, 500);
            }, 50);
        }, i * 200);
    }
    
    // Remove jumping class
    setTimeout(() => {
        character.classList.remove('jumping');
    }, 600);
}

// Spin around animation
function spinAroundAnimation(character) {
    character.animate(
        [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ],
        {
            duration: 1000,
            easing: 'ease-in-out'
        }
    );
}

// Waving animation
function wavingAnimation(character) {
    // Create waving hand effect
    const charRect = character.getBoundingClientRect();
    
    const hand = document.createElement('div');
    hand.innerHTML = '👋';
    hand.style.position = 'absolute';
    hand.style.fontSize = '30px';
    hand.style.left = (charRect.right - 20) + 'px';
    hand.style.top = (charRect.top + 50) + 'px';
    hand.style.zIndex = '30';
    hand.style.opacity = '0';
    hand.style.transition = 'opacity 0.3s ease-out';
    document.body.appendChild(hand);
    
    // Animate hand wave
    setTimeout(() => {
        hand.style.opacity = '1';
        
        hand.animate(
            [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(-20deg)' },
                { transform: 'rotate(20deg)' },
                { transform: 'rotate(-20deg)' },
                { transform: 'rotate(0deg)' }
            ],
            {
                duration: 1000,
                iterations: 2,
                easing: 'ease-in-out'
            }
        );
        
        // Remove after animation
        setTimeout(() => {
            hand.style.opacity = '0';
            setTimeout(() => hand.remove(), 300);
        }, 2000);
    }, 100);
}

// Blow kiss animation
function blowKissAnimation(fromChar, toChar) {
    const fromRect = fromChar.getBoundingClientRect();
    const toRect = toChar.getBoundingClientRect();
    
    // Create flying kiss
    const kiss = document.createElement('div');
    kiss.innerHTML = '💋';
    kiss.style.position = 'absolute';
    kiss.style.fontSize = '28px';
    kiss.style.left = (fromRect.right - 20) + 'px';
    kiss.style.top = (fromRect.top + 50) + 'px';
    kiss.style.zIndex = '30';
    kiss.style.opacity = '0';
    document.body.appendChild(kiss);
    
    // Animate kiss flying
    setTimeout(() => {
        kiss.style.opacity = '1';
        kiss.style.transition = 'left 1.5s ease-out, top 1.5s ease-out, transform 1.5s ease-out';
        kiss.style.left = (toRect.left + 20) + 'px';
        kiss.style.top = (toRect.top + 50) + 'px';
        kiss.style.transform = 'scale(1.2) rotate(720deg)';
        
        // Heart trail following the kiss
        const startX = parseFloat(kiss.style.left);
        const startY = parseFloat(kiss.style.top);
        const endX = toRect.left + 20;
        const endY = toRect.top + 50;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const progress = i / 4;
                const x = startX + (endX - startX) * progress;
                const y = startY + (endY - startY) * progress - Math.sin(progress * Math.PI) * 30;
                
                const miniHeart = document.createElement('div');
                miniHeart.innerHTML = '❤️';
                miniHeart.style.position = 'absolute';
                miniHeart.style.fontSize = '16px';
                miniHeart.style.left = x + 'px';
                miniHeart.style.top = y + 'px';
                miniHeart.style.zIndex = '29';
                miniHeart.style.opacity = '0.7';
                document.body.appendChild(miniHeart);
                
                // Fade out and remove
                setTimeout(() => {
                    miniHeart.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    miniHeart.style.opacity = '0';
                    miniHeart.style.transform = 'translateY(-20px)';
                    setTimeout(() => miniHeart.remove(), 500);
                }, 500);
            }, i * 300);
        }
        
        // Once kiss arrives, show reaction
        setTimeout(() => {
            kiss.style.opacity = '0';
            kiss.style.transform = 'scale(0.5)';
            setTimeout(() => kiss.remove(), 300);
            
            // Show love reaction
            showReaction(toChar, 'love');
        }, 1500);
    }, 500);
}

// Hand holding animation
function handHoldingAnimation(char1, char2) {
    const char1Rect = char1.getBoundingClientRect();
    const char2Rect = char2.getBoundingClientRect();
    
    // Create joined hands
    const hands = document.createElement('div');
    hands.innerHTML = '🤝';
    hands.style.position = 'absolute';
    hands.style.fontSize = '30px';
    hands.style.left = ((char1Rect.right + char2Rect.left) / 2 - 15) + 'px';
    hands.style.top = (Math.max(char1Rect.bottom, char2Rect.bottom) - 40) + 'px';
    hands.style.zIndex = '25';
    hands.style.opacity = '0';
    hands.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    document.body.appendChild(hands);
    
    // Show hands
    setTimeout(() => {
        hands.style.opacity = '1';
        
        // Gently animate the joined hands
        hands.animate(
            [
                { transform: 'rotate(-5deg)' },
                { transform: 'rotate(5deg)' },
                { transform: 'rotate(-5deg)' }
            ],
            {
                duration: 2000,
                iterations: 2,
                easing: 'ease-in-out'
            }
        );
        
        // Create small hearts around joined hands
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 30 + 20;
                const x = parseFloat(hands.style.left) + Math.cos(angle) * distance;
                const y = parseFloat(hands.style.top) + Math.sin(angle) * distance;
                
                createHeartParticle(x, y);
            }, i * 500);
        }
        
        // Remove after animation
        setTimeout(() => {
            hands.style.opacity = '0';
            setTimeout(() => hands.remove(), 500);
        }, 4000);
    }, 100);
}

// Synchronized jump animation
function synchronizedJumpAnimation(char1, char2) {
    // Add jumping class to both characters
    char1.classList.add('jumping');
    char2.classList.add('jumping');
    
    // Create star burst effect
    const char1Rect = char1.getBoundingClientRect();
    const char2Rect = char2.getBoundingClientRect();
    
    // Create stars between the characters
    const centerX = (char1Rect.right + char2Rect.left) / 2;
    const centerY = Math.min(char1Rect.top, char2Rect.top) - 20;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.position = 'absolute';
            star.style.fontSize = '24px';
            
            // Position in a burst pattern
            const angle = (i / 8) * Math.PI * 2;
            const distance = Math.random() * 50 + 30;
            star.style.left = (centerX + Math.cos(angle) * distance) + 'px';
            star.style.top = (centerY + Math.sin(angle) * distance) + 'px';
            
            star.style.zIndex = '22';
            star.style.opacity = '0';
            star.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(star);
            
            // Animate star
            setTimeout(() => {
                star.style.opacity = '1';
                star.style.transform = 'scale(1.5)';
                
                // Fade out and remove
                setTimeout(() => {
                    star.style.opacity = '0';
                    star.style.transform = 'scale(0.5) translateY(-30px)';
                    setTimeout(() => star.remove(), 500);
                }, 800);
            }, 50);
        }, i * 100);
    }
    
    // Remove jumping class after animation completes
    setTimeout(() => {
        char1.classList.remove('jumping');
        char2.classList.remove('jumping');
    }, 600);
}

// Heart eyes animation
function heartEyesAnimation(character) {
    const charRect = character.getBoundingClientRect();
    
    // Create heart eyes
    const leftEye = document.createElement('div');
    leftEye.innerHTML = '❤️';
    leftEye.style.position = 'absolute';
    leftEye.style.fontSize = '18px';
    leftEye.style.left = (charRect.left + charRect.width * 0.3) + 'px';
    leftEye.style.top = (charRect.top + charRect.height * 0.35) + 'px';
    leftEye.style.zIndex = '25';
    leftEye.style.opacity = '0';
    leftEye.style.transition = 'all 0.5s ease-out';
    document.body.appendChild(leftEye);
    
    const rightEye = document.createElement('div');
    rightEye.innerHTML = '❤️';
    rightEye.style.position = 'absolute';
    rightEye.style.fontSize = '18px';
    rightEye.style.left = (charRect.left + charRect.width * 0.7) + 'px';
    rightEye.style.top = (charRect.top + charRect.height * 0.35) + 'px';
    rightEye.style.zIndex = '25';
    rightEye.style.opacity = '0';
    rightEye.style.transition = 'all 0.5s ease-out';
    document.body.appendChild(rightEye);
    
    // Show heart eyes
    setTimeout(() => {
        leftEye.style.opacity = '1';
        rightEye.style.opacity = '1';
        
        // Pulse animation
        leftEye.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.3)' },
                { transform: 'scale(1)' }
            ],
            {
                duration: 1000,
                iterations: 2,
                easing: 'ease-in-out'
            }
        );
        
        rightEye.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.3)' },
                { transform: 'scale(1)' }
            ],
            {
                duration: 1000,
                iterations: 2,
                easing: 'ease-in-out'
            }
        );
        
        // Remove after animation
        setTimeout(() => {
            leftEye.style.opacity = '0';
            rightEye.style.opacity = '0';
            setTimeout(() => {
                leftEye.remove();
                rightEye.remove();
            }, 500);
        }, 4000);
    }, 100);
}

// Admiring gaze animation
function admiringGazeAnimation(char1, char2) {
    // Create hearts above character looking at other
    const char1Rect = char1.getBoundingClientRect();
    
    // Create floating hearts
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '18px';
            heart.style.left = (char1Rect.left + char1Rect.width * 0.5 + i * 15) + 'px';
            heart.style.top = (char1Rect.top - 20 - i * 10) + 'px';
            heart.style.zIndex = '22';
            heart.style.opacity = '0';
            heart.style.transition = 'all 1s ease-out';
            document.body.appendChild(heart);
            
            // Animate heart
            setTimeout(() => {
                heart.style.opacity = '1';
                heart.style.transform = 'translateY(-20px)';
                
                // Fade out
                setTimeout(() => {
                    heart.style.opacity = '0';
                    heart.style.transform = 'translateY(-40px)';
                    setTimeout(() => heart.remove(), 1000);
                }, 1500);
            }, 100);
        }, i * 500);
    }
    
    // Add subtle animation to both characters
    char1.animate(
        [
            { transform: 'rotate(-2deg)' },
            { transform: 'rotate(2deg)' },
            { transform: 'rotate(-2deg)' }
        ],
        {
            duration: 2000,
            easing: 'ease-in-out'
        }
    );
    
    char2.animate(
        [
            { transform: 'rotate(2deg)' },
            { transform: 'rotate(-2deg)' },
            { transform: 'rotate(2deg)' }
        ],
        {
            duration: 2000,
            easing: 'ease-in-out'
        }
    );
}

// Helper functions

// Hide all reactions on a character
function hideAllReactions(character) {
    hideReaction(character, 'love');
    hideReaction(character, 'surprise');
    hideReaction(character, 'happy');
}

// Hide all gifts on a character
function hideAllGifts(character) {
    hideGift(character, 'flower');
    hideGift(character, 'heart');
    hideGift(character, 'gift-box');
}

// Add this function to your main.js to initialize the enhanced animations
function initEnhancedAnimations() {
    // Add a slight delay to make sure other animations are initialized first
    setTimeout(() => {
        enhanceCharacterAnimations();
    }, 1000);
}