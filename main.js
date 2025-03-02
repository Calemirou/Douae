// main.js - Main animation controller for romantic webpage

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const stars = document.getElementById('stars');
    const flowers = document.getElementById('flowers');
    const heart = document.querySelector('.heart');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const charactersContainer = document.getElementById('charactersContainer');
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    // Character state tracking
    let characterState = {
        amine: {
            position: -150,
            isWalking: false,
            direction: 1, // 1 for right, -1 for left
            jumpPower: 0,
            hasGift: false,
            giftType: null
        },
        douae: {
            position: window.innerWidth + 150,
            isWalking: false,
            direction: -1, // -1 for left, 1 for right
            jumpPower: 0,
            reaction: null
        },
        isMeeting: false,
        meetingStage: 0,
        hasInteracted: false
    };
    
    // Animation frames tracking
    let animationFrames = {
        amine: 0,
        douae: 0,
        heartTrail: []
    };
    
    // Create stars
    function createStars() {
        stars.innerHTML = '';
        const starCount = Math.floor(window.innerWidth * window.innerHeight / 2000);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            stars.appendChild(star);
        }
    }
    
    // Create rising flowers
    function createFlowers() {
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.style.left = Math.random() * 100 + '%';
                flower.style.backgroundColor = getRandomColor();
                flower.style.animationDuration = (Math.random() * 5 + 8) + 's';
                flowers.appendChild(flower);
                
                // Remove flower after animation completes
                setTimeout(() => {
                    if (flower && flower.parentNode) {
                        flower.parentNode.removeChild(flower);
                    }
                }, 13000);
            }
        }, 800);
    }
    
    // Generate random pastel color
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 85%)`;
    }
    
    // Create floating heart trail
    function createHeartTrail(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart-trail';
        heart.innerHTML = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Random size and rotation
        const size = 0.5 + Math.random() * 0.5;
        const rotation = (Math.random() - 0.5) * 40;
        heart.style.transform = `scale(${size}) rotate(${rotation}deg)`;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart && heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    // Super Mario style movement for characters
    function updateCharacterPositions() {
        // Update Amine's position
        if (characterState.amine.isWalking) {
            characterState.amine.position += 3 * characterState.amine.direction;
            amineChar.style.left = characterState.amine.position + 'px';
            
            // Apply jumping if active
            if (characterState.amine.jumpPower !== 0) {
                // Super Mario arc jump physics
                characterState.amine.jumpPower -= 0.5; // Gravity
                let jumpHeight = Math.max(0, characterState.amine.jumpPower);
                amineChar.style.bottom = jumpHeight + 'px';
                
                if (characterState.amine.jumpPower <= 0 && jumpHeight <= 0) {
                    characterState.amine.jumpPower = 0;
                    amineChar.style.bottom = '0px';
                }
            }
            
            // Create heart trail for Amine when walking toward Douae
            if (characterState.amine.direction > 0 && Math.random() < 0.1) {
                const rect = amineChar.getBoundingClientRect();
                createHeartTrail(rect.left + rect.width / 2, rect.top + rect.height / 3);
            }
        }
        
        // Update Douae's position
        if (characterState.douae.isWalking) {
            characterState.douae.position += 3 * characterState.douae.direction;
            douaeChar.style.right = window.innerWidth - characterState.douae.position + 'px';
            
            // Apply jumping if active
            if (characterState.douae.jumpPower !== 0) {
                characterState.douae.jumpPower -= 0.5; // Gravity
                let jumpHeight = Math.max(0, characterState.douae.jumpPower);
                douaeChar.style.bottom = jumpHeight + 'px';
                
                if (characterState.douae.jumpPower <= 0 && jumpHeight <= 0) {
                    characterState.douae.jumpPower = 0;
                    douaeChar.style.bottom = '0px';
                }
            }
        }
        
        // Handle meeting
        if (!characterState.isMeeting) {
            const amineRect = amineChar.getBoundingClientRect();
            const douaeRect = douaeChar.getBoundingClientRect();
            
            // Check if characters are close enough to meet
            if (Math.abs(amineRect.right - douaeRect.left) < 50) {
                characterState.isMeeting = true;
                startMeetingSequence();
            }
        }
        
        requestAnimationFrame(updateCharacterPositions);
    }
    
    // Start character movement scene
    function startCharacterScene() {
        // Position characters initially off-screen
        amineChar.style.left = characterState.amine.position + 'px';
        douaeChar.style.right = window.innerWidth - characterState.douae.position + 'px';
        
        // Make characters start walking
        characterState.amine.isWalking = true;
        characterState.douae.isWalking = true;
        amineChar.classList.add('walking');
        douaeChar.classList.add('walking');
        
        // Choose a random gift for Amine to bring
        const gifts = ['flower', 'heart', 'gift-box'];
        characterState.amine.giftType = gifts[Math.floor(Math.random() * gifts.length)];
        characterState.amine.hasGift = true;
        
        // Start the position update loop
        updateCharacterPositions();
    }
    
    // Meeting sequence between characters
    function startMeetingSequence() {
        // Stop walking animations
        characterState.amine.isWalking = false;
        characterState.douae.isWalking = false;
        amineChar.classList.remove('walking');
        douaeChar.classList.remove('walking');
        
        // Begin the meeting sequence
        meetingStage1();
    }
    
    // First stage of meeting - Amine jumps with excitement
    function meetingStage1() {
        // Amine jumps with excitement
        characterState.amine.jumpPower = 30;
        amineChar.classList.add('jumping');
        
        setTimeout(() => {
            amineChar.classList.remove('jumping');
            
            // Show gift from Amine
            if (characterState.amine.hasGift) {
                const giftElement = amineChar.querySelector(`.gift.${characterState.amine.giftType}`);
                giftElement.classList.remove('hidden');
                giftElement.classList.add('visible', 'floating');
                
                // Douae reacts with surprise
                setTimeout(() => {
                    const surpriseReaction = douaeChar.querySelector('.reaction.surprise');
                    surpriseReaction.classList.remove('hidden');
                    surpriseReaction.classList.add('visible');
                    
                    // Douae jumps with happiness
                    setTimeout(() => {
                        characterState.douae.jumpPower = 30;
                        douaeChar.classList.add('jumping');
                        
                        // Hide surprise, show happiness
                        setTimeout(() => {
                            surpriseReaction.classList.remove('visible');
                            surpriseReaction.classList.add('hidden');
                            
                            const happyReaction = douaeChar.querySelector('.reaction.love');
                            happyReaction.classList.remove('hidden');
                            happyReaction.classList.add('visible', 'floating');
                            
                            // Both characters happy bounce
                            setTimeout(() => {
                                amineChar.classList.add('happy-meeting');
                                douaeChar.classList.add('happy-meeting');
                                
                                // Trigger heart effects
                                triggerHeartExplosion();
                                
                                // Reset for next interaction
                                setTimeout(resetCharacters, 5000);
                            }, 1000);
                        }, 600);
                    }, 500);
                }, 500);
            }
        }, 600);
    }
    
    // Trigger heart explosion effect
    function triggerHeartExplosion() {
        // Create heart explosion at the center point between characters
        const amineRect = amineChar.getBoundingClientRect();
        const douaeRect = douaeChar.getBoundingClientRect();
        
        const centerX = (amineRect.right + douaeRect.left) / 2;
        const centerY = (amineRect.top + douaeRect.top) / 2;
        
        // Create multiple hearts in an explosion pattern
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                createHeartTrail(centerX + offsetX, centerY + offsetY);
            }, i * 100);
        }
    }
    
    // Reset characters to start positions
    function resetCharacters() {
        // Hide all gifts and reactions
        const gifts = amineChar.querySelectorAll('.gift');
        const reactions = douaeChar.querySelectorAll('.reaction');
        
        gifts.forEach(gift => {
            gift.classList.remove('visible', 'floating');
            gift.classList.add('hidden');
        });
        
        reactions.forEach(reaction => {
            reaction.classList.remove('visible', 'floating');
            reaction.classList.add('hidden');
        });
        
        // Remove special class states
        amineChar.classList.remove('happy-meeting', 'jumping');
        douaeChar.classList.remove('happy-meeting', 'jumping');
        
        // Reset positions
        characterState.amine.position = -150;
        characterState.douae.position = window.innerWidth + 150;
        amineChar.style.left = characterState.amine.position + 'px';
        douaeChar.style.right = window.innerWidth - characterState.douae.position + 'px';
        
        // Reset states
        characterState.isMeeting = false;
        characterState.meetingStage = 0;
        
        // Choose new gift
        const gifts_array = ['flower', 'heart', 'gift-box'];
        characterState.amine.giftType = gifts_array[Math.floor(Math.random() * gifts_array.length)];
        
        // Start walking again after a delay
        setTimeout(() => {
            characterState.amine.isWalking = true;
            characterState.douae.isWalking = true;
            amineChar.classList.add('walking');
            douaeChar.classList.add('walking');
        }, 1000);
    }
    
    // Music and lyrics handling
    function setupMusic() {
        // Toggle music
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.textContent = '🎵 Music Off';
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵 Music On';
            }
        });
        
        // Toggle lyrics
        lyricsToggle.addEventListener('click', function() {
            if (lyricsContainer.style.display === 'block') {
                lyricsContainer.style.display = 'none';
                lyricsToggle.textContent = '🎵 Show Lyrics';
            } else {
                lyricsContainer.style.display = 'block';
                lyricsToggle.textContent = '🎵 Hide Lyrics';
            }
        });
    }
    
    // Create clickable heart effects
    function setupClickEffects() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('music-control') || 
                e.target.classList.contains('lyrics-toggle')) {
                return; // Don't create hearts when clicking controls
            }
            
            // Create hearts on click
            for (let i = 0; i < 3; i++) {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;
                setTimeout(() => {
                    createHeartTrail(e.clientX + offsetX, e.clientY + offsetY);
                }, i * 100);
            }
            
            // Trigger jump for characters if they're on screen
            if (characterState.amine.position > -100 && 
                characterState.amine.position < window.innerWidth + 100 &&
                !characterState.isMeeting && 
                characterState.amine.jumpPower === 0) {
                characterState.amine.jumpPower = 20;
            }
            
            if (characterState.douae.position > -100 && 
                characterState.douae.position < window.innerWidth + 100 &&
                !characterState.isMeeting &&
                characterState.douae.jumpPower === 0) {
                characterState.douae.jumpPower = 20;
            }
        });
    }
    
    // Initialize everything
    function init() {
        createStars();
        createFlowers();
        setupMusic();
        setupClickEffects();
        
        // Start character animation after a delay
        setTimeout(startCharacterScene, 2000);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            createStars();
            
            // Adjust character positions if needed
            if (characterState.douae.position > window.innerWidth + 150) {
                characterState.douae.position = window.innerWidth + 150;
            }
        });
    }
    
    // Start everything
    init();
});
