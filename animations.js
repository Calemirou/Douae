// animations.js - Core animations for characters and environment
document.addEventListener('DOMContentLoaded', function() {
    // Character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    const charactersContainer = document.getElementById('charactersContainer');
    
    // Environment elements
    const starsContainer = document.getElementById('stars');
    const flowersContainer = document.getElementById('flowers');
    
    // Game state
    let gameStarted = false;
    let jumpCount = 0;
    let score = 0;
    let isMusicPlaying = false;
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Constants for responsive design
    const VIEWPORT_WIDTH = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const VIEWPORT_HEIGHT = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const IS_MOBILE = VIEWPORT_WIDTH <= 768;
    
    // Positions and speeds
    const WALK_SPEED = IS_MOBILE ? 2 : 3;
    const RUN_SPEED = IS_MOBILE ? 4 : 6;
    const JUMP_HEIGHT = IS_MOBILE ? 60 : 80;
    const FLOOR_LEVEL = IS_MOBILE ? '10%' : '15%';
    
    // Set initial positions
    charactersContainer.style.bottom = FLOOR_LEVEL;
    amineChar.style.left = '-100px';
    douaeChar.style.right = '-100px';
    
    // Initialize stars
    function createStars() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize flowers
    function createFlowers() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const flower = document.createElement('div');
                flower.classList.add('flower');
                flower.style.left = Math.random() * 100 + '%';
                flower.style.animationDuration = (Math.random() * 5 + 8) + 's';
                flower.style.animationDelay = Math.random() * 2 + 's';
                flowersContainer.appendChild(flower);
                
                // Remove flower after animation
                setTimeout(() => {
                    flower.remove();
                }, parseFloat(flower.style.animationDuration) * 1000);
            }, i * 300);
        }
    }
    
    // Character animations
    function characterEntrance() {
        // Amine walks in from left
        amineChar.classList.add('walking');
        const amineWalkIn = setInterval(() => {
            const currentLeft = parseFloat(amineChar.style.left);
            if (currentLeft < VIEWPORT_WIDTH * 0.25) {
                amineChar.style.left = (currentLeft + WALK_SPEED) + 'px';
            } else {
                clearInterval(amineWalkIn);
                amineChar.classList.remove('walking');
                
                // Douae walks in from right after Amine
                setTimeout(() => {
                    douaeChar.classList.add('walking');
                    const douaeWalkIn = setInterval(() => {
                        const currentRight = parseFloat(douaeChar.style.right);
                        if (currentRight < VIEWPORT_WIDTH * 0.25) {
                            douaeChar.style.right = (currentRight + WALK_SPEED) + 'px';
                        } else {
                            clearInterval(douaeWalkIn);
                            douaeChar.classList.remove('walking');
                            
                            // Both characters are in position, start the interaction
                            setTimeout(startInteraction, 1000);
                        }
                    }, 50);
                }, 1000);
            }
        }, 50);
    }
    
    // Character jump animation
    function jumpAnimation(character) {
        if (character.classList.contains('jumping')) return;
        
        character.classList.add('jumping');
        
        // Remove jumping class after animation completes
        setTimeout(() => {
            character.classList.remove('jumping');
        }, 600);
    }
    
    // Create heart trail
    function createHeartTrail(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart-trail');
        heart.innerHTML = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
    
    // Show gift from Amine to Douae
    function showGift(giftType) {
        const gifts = amineChar.querySelectorAll('.gift');
        gifts.forEach(gift => gift.classList.add('hidden'));
        
        const selectedGift = amineChar.querySelector(`.gift.${giftType}`);
        if (selectedGift) {
            selectedGift.classList.remove('hidden');
            selectedGift.classList.add('visible', 'floating');
            
            // Show reaction from Douae after a delay
            setTimeout(() => {
                showReaction(giftType === 'heart' ? 'love' : 'surprise');
            }, 800);
        }
    }
    
    // Show reaction from Douae
    function showReaction(reactionType) {
        const reactions = douaeChar.querySelectorAll('.reaction');
        reactions.forEach(reaction => reaction.classList.add('hidden'));
        
        const selectedReaction = douaeChar.querySelector(`.reaction.${reactionType}`);
        if (selectedReaction) {
            selectedReaction.classList.remove('hidden');
            selectedReaction.classList.add('visible');
            
            // Hide reaction after some time
            setTimeout(() => {
                selectedReaction.classList.remove('visible');
                selectedReaction.classList.add('hidden');
            }, 2000);
        }
    }
    
    // Start character interaction sequence
    function startInteraction() {
        // Sequence of interactions
        const interactions = [
            // Amine jumps
            () => {
                jumpAnimation(amineChar);
                setTimeout(() => showGift('flower'), 300);
            },
            // Douae jumps in response
            () => {
                jumpAnimation(douaeChar);
                setTimeout(() => showReaction('happy'), 300);
            },
            // Both jump together
            () => {
                jumpAnimation(amineChar);
                jumpAnimation(douaeChar);
            },
            // Amine gives heart
            () => {
                showGift('heart');
                
                // Create heart trail between characters
                const amineRect = amineChar.getBoundingClientRect();
                const douaeRect = douaeChar.getBoundingClientRect();
                
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const startX = amineRect.right;
                        const startY = amineRect.top + amineRect.height/2;
                        const endX = douaeRect.left;
                        const endY = douaeRect.top + douaeRect.height/2;
                        
                        // Calculate position along the path
                        const x = startX + (endX - startX) * (i/5);
                        const y = startY + (endY - startY) * (i/5) - Math.sin(Math.PI * (i/5)) * 30;
                        
                        createHeartTrail(x, y);
                    }, i * 200);
                }
            },
            // Happy meeting
            () => {
                // Move characters closer
                const moveCloser = setInterval(() => {
                    const amineLeft = parseFloat(amineChar.style.left);
                    const douaeRight = parseFloat(douaeChar.style.right);
                    
                    if (VIEWPORT_WIDTH - amineLeft - douaeRight > 200) {
                        amineChar.style.left = (amineLeft + 1) + 'px';
                        douaeChar.style.right = (douaeRight + 1) + 'px';
                    } else {
                        clearInterval(moveCloser);
                        amineChar.classList.add('happy-meeting');
                        douaeChar.classList.add('happy-meeting');
                        
                        // Continuous heart creation
                        startHeartBurst();
                    }
                }, 20);
            }
        ];
        
        // Execute interactions with delays
        interactions.forEach((interaction, index) => {
            setTimeout(interaction, index * 3000);
        });
    }
    
    // Create hearts burst
    function startHeartBurst() {
        const heartBurst = setInterval(() => {
            const amineRect = amineChar.getBoundingClientRect();
            const douaeRect = douaeChar.getBoundingClientRect();
            
            const centerX = (amineRect.right + douaeRect.left) / 2;
            const centerY = (amineRect.top + douaeRect.top) / 2;
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 100;
                    const offsetY = (Math.random() - 0.5) * 100;
                    createHeartTrail(centerX + offsetX, centerY + offsetY);
                }, i * 200);
            }
        }, 2000);
        
        // Stop after 10 seconds
        setTimeout(() => {
            clearInterval(heartBurst);
        }, 10000);
    }
    
    // Create click heart effect
    document.addEventListener('click', function(event) {
        createHeartTrail(event.clientX, event.clientY);
        
        // Chance for characters to jump on click
        if (Math.random() > 0.7) {
            if (Math.random() > 0.5) {
                jumpAnimation(amineChar);
            } else {
                jumpAnimation(douaeChar);
            }
        }
    });
    
    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Music Off';
        } else {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Initialize
    createStars();
    setInterval(createFlowers, 5000); // Create new flowers periodically
    
    // Start the animation sequence after a delay
    setTimeout(() => {
        characterEntrance();
    }, 1500);
});
