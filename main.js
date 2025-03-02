// main.js - Main initialization and music synchronization
document.addEventListener('DOMContentLoaded', function() {
    // Character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    const charactersContainer = document.getElementById('charactersContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    
    // Initialize state
    let isMusicPlaying = false;
    let isLyricsVisible = false;
    let currentTime = 0;
    let animationsInitialized = false;
    
    // Music control
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Music Off';
        } else {
            backgroundMusic.play()
                .then(() => {
                    // Music started successfully
                    if (!animationsInitialized) {
                        startSynchronizedAnimations();
                        animationsInitialized = true;
                    }
                })
                .catch(error => {
                    console.error('Error playing music:', error);
                    alert('Please interact with the page first to enable music playback');
                });
            musicToggle.textContent = '🎵 Music On';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Lyrics toggle
    lyricsToggle.addEventListener('click', function() {
        if (isLyricsVisible) {
            lyricsContainer.style.display = 'none';
            lyricsToggle.textContent = '🎵 Show Lyrics';
        } else {
            lyricsContainer.style.display = 'block';
            lyricsToggle.textContent = '🎵 Hide Lyrics';
        }
        isLyricsVisible = !isLyricsVisible;
    });
    
    // Initialize animations
    function startSynchronizedAnimations() {
        // Update music time and trigger animations
        backgroundMusic.addEventListener('timeupdate', function() {
            currentTime = backgroundMusic.currentTime;
            updateActiveLyric(currentTime);
        });
        
        // Music ended event
        backgroundMusic.addEventListener('ended', function() {
            // Reset or loop animations if needed
            isMusicPlaying = false;
            musicToggle.textContent = '🎵 Music Off';
        });
    }
    
    // Kiss animation function
    function kissAnimation() {
        // Move characters close to each other
        moveCharacterTo(amineChar, 'center-left');
        moveCharacterTo(douaeChar, 'center-right');
        
        setTimeout(() => {
            const amineRect = amineChar.getBoundingClientRect();
            const douaeRect = douaeChar.getBoundingClientRect();
            
            // Create kiss emoji
            const kiss = document.createElement('div');
            kiss.innerHTML = '💋';
            kiss.style.position = 'absolute';
            kiss.style.fontSize = '30px';
            kiss.style.left = ((amineRect.right + douaeRect.left) / 2) + 'px';
            kiss.style.top = ((amineRect.top + douaeRect.top) / 2) + 'px';
            kiss.style.zIndex = '100';
            document.body.appendChild(kiss);
            
            // Animate kiss
            kiss.animate([
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1.5)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(0)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-in-out'
            });
            
            // Create heart trail between characters
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = '❤️';
                    heart.classList.add('heart-trail');
                    
                    // Position heart
                    const progress = i / 4; // 0 to 1
                    const x = amineRect.right + (douaeRect.left - amineRect.right) * progress;
                    const y = amineRect.top + (douaeRect.top - amineRect.top) * progress - 
                              Math.sin(Math.PI * progress) * 30; // Arc path
                    
                    heart.style.left = x + 'px';
                    heart.style.top = y + 'px';
                    document.body.appendChild(heart);
                    
                    // Remove heart after animation
                    setTimeout(() => {
                        heart.remove();
                    }, 2000);
                }, i * 300);
            }
            
            // Remove kiss after animation
            setTimeout(() => {
                kiss.remove();
                
                // Show reaction
                showReaction('love');
                
                // Make characters jump with joy
                setTimeout(() => {
                    jumpAnimation(amineChar);
                    setTimeout(() => {
                        jumpAnimation(douaeChar);
                    }, 500);
                }, 1000);
            }, 2000);
        }, 1500);
    }
    
    // Update character positions based on viewport size
    function updateResponsivePositioning() {
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Set initial positions
        if (viewportWidth <= 768) {
            // Mobile layout
            charactersContainer.style.bottom = '5%';
            charactersContainer.style.height = '120px';
        } else {
            // Desktop layout
            charactersContainer.style.bottom = '10%';
            charactersContainer.style.height = '180px';
        }
        
        // Update any absolute positioned elements
        document.querySelectorAll('.heart-trail, .gift, .reaction').forEach(el => {
            // Recalculate positions if needed
        });
    }
    
    // Resize handler
    window.addEventListener('resize', updateResponsivePositioning);
    
    // Initialize with proper sizing
    updateResponsivePositioning();
    
    // Helper functions for external scripts
    window.gameHelpers = {
        moveCharacterTo: moveCharacterTo,
        jumpAnimation: jumpAnimation,
        showGift: showGift,
        showReaction: showReaction,
        createHeartTrail: createHeartTrail,
        kissAnimation: kissAnimation
    };
    
    // Character movement function
    function moveCharacterTo(character, position) {
        const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        
        // Define positions relative to viewport width
        const positions = {
            'far-left': viewport * 0.1,
            'center-left': viewport * 0.3,
            'center': viewport * 0.5 - 50, // Subtract half character width
            'center-right': viewport * 0.7 - 100, // Adjust for character width
            'far-right': viewport * 0.9 - 100 // Adjust for character width
        };
        
        // Determine if this is Amine or Douae to set correct property
        if (character.id === 'amine') {
            // Add walking class for animation
            character.classList.add('walking');
            
            const currentLeft = parseFloat(character.style.left) || 0;
            const targetLeft = positions[position];
            
            // Determine direction
            const movingRight = targetLeft > currentLeft;
            
            // Flip character if moving left
            character.querySelector('img').style.transform = movingRight ? '' : 'scaleX(-1)';
            
            const moveInterval = setInterval(() => {
                const currentLeft = parseFloat(character.style.left) || 0;
                
                if (movingRight && currentLeft < targetLeft) {
                    character.style.left = (currentLeft + 5) + 'px';
                } else if (!movingRight && currentLeft > targetLeft) {
                    character.style.left = (currentLeft - 5) + 'px';
                } else {
                    clearInterval(moveInterval);
                    character.classList.remove('walking');
                    character.querySelector('img').style.transform = '';
                }
            }, 30);
        } else {
            // For Douae, we need to handle right positioning
            const targetRight = viewport - positions[position] - 100;
            
            character.classList.add('walking');
            
            const currentRight = parseFloat(character.style.right) || 0;
            
            // Determine direction
            const movingLeft = targetRight > currentRight;
            
            // Flip character if moving right
            character.querySelector('img').style.transform = movingLeft ? '' : 'scaleX(-1)';
            
            const moveInterval = setInterval(() => {
                const currentRight = parseFloat(character.style.right) || 0;
                
                if (movingLeft && currentRight < targetRight) {
                    character.style.right = (currentRight + 5) + 'px';
                } else if (!movingLeft && currentRight > targetRight) {
                    character.style.right = (currentRight - 5) + 'px';
                } else {
                    clearInterval(moveInterval);
                    character.classList.remove('walking');
                    character.querySelector('img').style.transform = '';
                }
            }, 30);
        }
    }
    
    // Jump animation
    function jumpAnimation(character) {
        if (character.classList.contains('jumping')) return;
        
        character.classList.add('jumping');
        
        // Remove jumping class after animation
        setTimeout(() => {
            character.classList.remove('jumping');
        }, 600);
    }
    
    // Show gift from Amine to Douae
    function showGift(giftType) {
        const gifts = amineChar.querySelectorAll('.gift');
        gifts.forEach(gift => gift.classList.add('hidden'));
        
        const selectedGift = amineChar.querySelector(`.gift.${giftType}`);
        if (selectedGift) {
            selectedGift.classList.remove('hidden');
            selectedGift.classList.add('visible', 'floating');
            
            // Hide gift after some time
            setTimeout(() => {
                selectedGift.classList.remove('visible', 'floating');
                selectedGift.classList.add('hidden');
            }, 4000);
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
            }, 3000);
        }
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
    
    // Update active lyric based on current time
    function updateActiveLyric(currentTime) {
        const lyricsWrapper = document.getElementById('lyricsWrapper');
        const currentLyric = document.getElementById('currentLyric');
        
        // Find current lyric based on time
        if (window.lyrics && window.lyrics.length) {
            let activeIndex = 0;
            
            for (let i = window.lyrics.length - 1; i >= 0; i--) {
                if (currentTime >= window.lyrics[i].time) {
                    activeIndex = i;
                    break;
                }
            }
            
            // Update current lyric text
            currentLyric.textContent = window.lyrics[activeIndex].text;
        }
    }
    
    // Initialize page with a click-to-start approach
    document.body.addEventListener('click', function startExperience() {
        if (!animationsInitialized) {
            // Start background music
            backgroundMusic.play()
                .then(() => {
                    musicToggle.textContent = '🎵 Music On';
                    isMusicPlaying = true;
                    startSynchronizedAnimations();
                    animationsInitialized = true;
                })
                .catch(error => {
                    console.error('Error playing music:', error);
                    // Still init animations even if music fails
                    startSynchronizedAnimations();
                    animationsInitialized = true;
                });
            
            // Remove this one-time event listener
            document.body.removeEventListener('click', startExperience);
        }
    });
});
