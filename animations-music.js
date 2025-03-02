// animations-music.js - Music synchronized animations

// Sample lyrics with timestamps (modify with actual lyrics and timestamps)
const lyrics = [
    { time: 0, text: "يا دعاء" },
    { time: 5, text: "حبيتك من قلبي" },
    { time: 10, text: "أنت حياتي وسعادتي" },
    { time: 15, text: "كل لحظة معك غالية" },
    { time: 20, text: "أنت نور حياتي" },
    { time: 25, text: "وحبك هو قوتي" },
    { time: 30, text: "عيناك تسحرني" },
    { time: 35, text: "وابتسامتك تذيب قلبي" },
    { time: 40, text: "يا أجمل ما في حياتي" },
    { time: 45, text: "أحبك حبيبتي" },
    { time: 50, text: "وسأظل أحبك للأبد" },
    // Add more lyrics to cover the entire 3:31 duration
    { time: 60, text: "كل يوم معك هو هدية" },
    { time: 70, text: "أحلم بك ليل نهار" },
    { time: 80, text: "قلبي ينبض بحبك" },
    { time: 90, text: "أنت سر سعادتي" },
    { time: 100, text: "حبك يملأ حياتي" },
    { time: 110, text: "أنت روحي وقلبي" },
    { time: 120, text: "معك أرى العالم أجمل" },
    { time: 130, text: "أحبك من كل قلبي" },
    { time: 140, text: "وأعيش لأجلك" },
    { time: 150, text: "حياتي بدونك لا معنى لها" },
    { time: 160, text: "سأحبك إلى الأبد" },
    { time: 170, text: "يا دعاء حبيبتي" },
    { time: 180, text: "أنت سر سعادتي وفرحتي" },
    { time: 190, text: "معك أشعر بالحب الحقيقي" },
    { time: 200, text: "يا دعاء" }
];

// Music animation timeline (key moments in the song)
const animationTimeline = [
    { time: 0, action: 'start' },
    { time: 5, action: 'amineEnter' },
    { time: 10, action: 'douaeEnter' },
    { time: 15, action: 'amineWave' },
    { time: 20, action: 'douaeWave' },
    { time: 25, action: 'amineDance' },
    { time: 30, action: 'douaeDance' },
    { time: 35, action: 'meet' },
    { time: 40, action: 'hearts' },
    { time: 45, action: 'amineGiftFlower' },
    { time: 50, action: 'douaeReactionLove' },
    { time: 55, action: 'bothJump' },
    { time: 60, action: 'bothSpin' },
    { time: 65, action: 'amineGiftHeart' },
    { time: 70, action: 'douaeReactionHappy' },
    { time: 75, action: 'moveAround' },
    { time: 85, action: 'bothDance' },
    { time: 95, action: 'amineGiftBox' },
    { time: 100, action: 'douaeReactionSurprise' },
    { time: 105, action: 'kiss' },
    { time: 110, action: 'hearts' },
    { time: 120, action: 'bothJump' },
    { time: 130, action: 'amineDance' },
    { time: 140, action: 'douaeDance' },
    { time: 150, action: 'bothSpin' },
    { time: 160, action: 'moveAround' },
    { time: 170, action: 'meet' },
    { time: 180, action: 'hearts' },
    { time: 190, action: 'finale' },
    { time: 200, action: 'end' }
];

function initializeMusicSyncedAnimations() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const currentLyric = document.getElementById('currentLyric');
    
    // Set up lyrics display
    let currentLyricIndex = 0;
    
    // Timeline execution
    let currentTimelineIndex = 0;
    
    // Update lyrics based on current time
    function updateLyrics() {
        const currentTime = backgroundMusic.currentTime;
        
        // Find the current lyric based on timestamp
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                if (currentLyricIndex !== i) {
                    currentLyricIndex = i;
                    currentLyric.textContent = lyrics[i].text;
                }
                break;
            }
        }
    }
    
    // Execute animation based on timeline
    function executeTimelineActions() {
        const currentTime = backgroundMusic.currentTime;
        
        // Check if we need to execute the next action
        while (currentTimelineIndex < animationTimeline.length && 
               currentTime >= animationTimeline[currentTimelineIndex].time) {
            
            // Get the current action
            const action = animationTimeline[currentTimelineIndex].action;
            
            // Execute the action
            executeAction(action);
            
            // Move to the next timeline index
            currentTimelineIndex++;
        }
    }
    
    // Execute a specific animation action
    function executeAction(action) {
        console.log('Executing action:', action);
        
        switch (action) {
            case 'start':
                // Initial setup
                break;
                
            case 'amineEnter':
                walkCharacter(amine, 'right', 150, 3);
                break;
                
            case 'douaeEnter':
                walkCharacter(douae, 'left', 150, 3);
                break;
                
            case 'amineWave':
                waveCharacter(amine, 2);
                break;
                
            case 'douaeWave':
                waveCharacter(douae, 2);
                break;
                
            case 'amineDance':
                danceCharacter(amine, 4);
                break;
                
            case 'douaeDance':
                danceCharacter(douae, 4);
                break;
                
            case 'meet':
                meetCharacters(amine, douae, 3);
                break;
                
            case 'hearts':
                // Create multiple hearts around the characters
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const x = Math.random() * 200 + (window.innerWidth / 2 - 100);
                        const y = Math.random() * 100 + (window.innerHeight - 250);
                        createHeartTrail(x, y, 3);
                    }, i * 300);
                }
                break;
                
            case 'amineGiftFlower':
                showGift(amine, 'flower', 4);
                break;
                
            case 'amineGiftHeart':
                showGift(amine, 'heart', 4);
                break;
                
            case 'amineGiftBox':
                showGift(amine, 'gift-box', 4);
                break;
                
            case 'douaeReactionLove':
                showReaction(douae, 'love', 4);
                break;
                
            case 'douaeReactionSurprise':
                showReaction(douae, 'surprise', 4);
                break;
                
            case 'douaeReactionHappy':
                showReaction(douae, 'happy', 4);
                break;
                
            case 'bothJump':
                jumpCharacter(amine, 30, 0.6);
                jumpCharacter(douae, 30, 0.6);
                break;
                
            case 'bothSpin':
                spinCharacter(amine, 1);
                spinCharacter(douae, 1);
                break;
                
            case 'bothDance':
                danceCharacter(amine, 8);
                danceCharacter(douae, 8);
                break;
                
            case 'moveAround':
                // Characters move around each other
                moveCharactersAround();
                break;
                
            case 'kiss':
                performKissAnimation();
                break;
                
            case 'finale':
                performFinaleAnimation();
                break;
                
            case 'end':
                // End animation sequence
                resetCharactersPosition();
                break;
        }
    }
    
    // Start updates based on music time
    let updateInterval = setInterval(() => {
        if (!backgroundMusic.paused) {
            updateLyrics();
            executeTimelineActions();
            
            // If music ended, clear interval
            if (backgroundMusic.ended) {
                clearInterval(updateInterval);
                resetCharactersPosition();
            }
        }
    }, 100);
    
    // Add event listener for when music ends
    backgroundMusic.addEventListener('ended', function() {
        clearInterval(updateInterval);
        resetCharactersPosition();
    });
}

// Reset characters to starting position
function resetCharactersPosition() {
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    
    amine.style.transition = 'left 0.5s ease-in-out';
    douae.style.transition = 'right 0.5s ease-in-out';
    amine.style.left = '-150px';
    douae.style.right = '-150px';
    
    // Remove any animations
    amine.classList.remove('walking', 'jumping', 'dancing', 'spinning', 'happy-meeting', 'paused');
    douae.classList.remove('walking', 'jumping', 'dancing', 'spinning', 'happy-meeting', 'paused');
    
    // Hide gifts and reactions
    document.querySelectorAll('.gift, .reaction').forEach(element => {
        element.classList.remove('visible', 'floating');
        element.classList.add('hidden');
    });
}
