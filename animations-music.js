// animations-music.js - Music synchronized animations

// Sample lyrics with timestamps (modify with actual lyrics and timestamps)
const lyrics = [
    { time: 0, text: "يا دعاء" },
    { time: 5, text: "حبيتك من قلبي" },
    { time: 10, text: "أنت حياتي وسعادتي" },
    { time: 15, text: "كل لحظة معك غالية" },
    { time: 20, text: "أنت نور حياتي" },// animations-music.js - Music control and synchronization with animations

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const currentLyric = document.getElementById('currentLyric');
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    // Music state
    const musicState = {
        isPlaying: false,
        currentTime: 0,
        volume: 0.7,
        isMuted: false,
        currentLyricIndex: -1,
        isLyricsVisible: false,
        beatDetected: false,
        lastBeatTime: 0,
        beatThreshold: 300, // ms between beats
        musicSyncEnabled: true,
        characterDanceEnabled: true
    };
    
    // Lyrics for the song "يا دعاء" (Ya Douae)
    // Each object contains the lyrics, start time (in seconds), and end time
    const lyrics = [
        { text: "يا دعاء يا نور عيني", startTime: 8, endTime: 13, romanized: "Ya Douae ya nour a'aini" },
        { text: "أنت الحب اللي ملاني", startTime: 14, endTime: 19, romanized: "Anti el hub elli malani" },
        { text: "بضحكتك روحي تتهنى", startTime: 20, endTime: 25, romanized: "Bidahiktik ruhi tithanna" },
        { text: "وكل لحظة بالقرب منك", startTime: 26, endTime: 31, romanized: "Wa kol lahza bilqurb minnik" },
        { text: "تملا قلبي بالأماني", startTime: 32, endTime: 37, romanized: "Timla qalbi bil amani" },
        { text: "يا دعاء يا أحلى اسم", startTime: 38, endTime: 43, romanized: "Ya Douae ya ahla ism" },
        { text: "حبك في قلبي مرسوم", startTime: 44, endTime: 49, romanized: "Hubbik fi qalbi marsum" },
        { text: "معك عالمي صار أجمل", startTime: 50, endTime: 55, romanized: "Ma'aki a'alami sar ajmal" },
        { text: "واحلامنا تكبر وتزيد", startTime: 56, endTime: 61, romanized: "Wa ahlamna tikbar wa tzid" },
        { text: "كل يوم بحبك أكثر", startTime: 62, endTime: 67, romanized: "Koll yom bhebik akthar" },
        { text: "دنيتي معك غير", startTime: 68, endTime: 73, romanized: "Dinyeti ma'aki ghair" },
        { text: "وقلبي ليك بس طاير", startTime: 74, endTime: 79, romanized: "Wa qalbi leeki bas tayir" },
        { text: "خليك جنبي دايما", startTime: 80, endTime: 85, romanized: "Khaliki janbi dayman" },
        { text: "وعمري معك بيحلى", startTime: 86, endTime: 91, romanized: "Wa a'omri ma'aki biyehla" },
        { text: "محتاجك ومحتاج لضحكتك", startTime: 92, endTime: 97, romanized: "Mehtagik wa mehtag li dahiktik" },
        { text: "دعاء يا أغلى ما عندي", startTime: 98, endTime: 103, romanized: "Douae ya aghla ma a'indi" },
        { text: "لو تعرفي قد ايه بحبك", startTime: 104, endTime: 109, romanized: "Law tia'rafi qad eh bahebik" },
        { text: "أنتي اجمل حاجه في دنيتي", startTime: 110, endTime: 115, romanized: "Enti ajmal haga fi dunyeti" },
        // Add more lyrics as needed for your song
    ];
    
    // Music visualization points
    // These are timestamps where we want special effects to trigger
    const musicEvents = [
        { time: 8, event: 'start', intensity: 'low' },
        { time: 14, event: 'beat', intensity: 'medium' },
        { time: 20, event: 'beat', intensity: 'medium' },
        { time: 26, event: 'crescendo', intensity: 'high' },
        { time: 32, event: 'beat', intensity: 'medium' },
        { time: 38, event: 'chorus', intensity: 'high' },
        { time: 50, event: 'beat', intensity: 'medium' },
        { time: 62, event: 'chorus', intensity: 'high' },
        { time: 74, event: 'beat', intensity: 'medium' },
        { time: 86, event: 'crescendo', intensity: 'high' },
        { time: 98, event: 'chorus', intensity: 'very-high' },
        { time: 110, event: 'finale', intensity: 'max' },
    ];
    
    // Initialize music and lyrics
    function initMusicSystem() {
        // Set initial volume
        backgroundMusic.volume = musicState.volume;
        
        // Setup music toggle button
        musicToggle.addEventListener('click', toggleMusic);
        
        // Setup lyrics toggle button
        lyricsToggle.addEventListener('click', toggleLyrics);
        
        // Initialize lyrics display
        initLyricsDisplay();
        
        // Update timer for music/animation sync
        setInterval(updateMusicState, 100);
    }
    
    // Toggle music play/pause
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicState.isPlaying = true;
                    musicToggle.textContent = '🎵 Music Off';
                })
                .catch(error => {
                    console.error("Error playing music:", error);
                });
        } else {
            backgroundMusic.pause();
            musicState.isPlaying = false;
            musicToggle.textContent = '🎵 Music On';
        }
    }
    
    // Toggle lyrics display
    function toggleLyrics() {
        musicState.isLyricsVisible = !musicState.isLyricsVisible;
        
        if (musicState.isLyricsVisible) {
            lyricsContainer.style.display = 'block';
            lyricsToggle.textContent = '🎵 Hide Lyrics';
        } else {
            lyricsContainer.style.display = 'none';
            lyricsToggle.textContent = '🎵 Show Lyrics';
        }
    }
    
    // Initialize lyrics display
    function initLyricsDisplay() {
        // Clear existing content
        lyricsWrapper.innerHTML = '';
        
        // Create lyrics lines
        lyrics.forEach((line, index) => {
            const lyricLine = document.createElement('div');
            lyricLine.classList.add('lyrics-line');
            lyricLine.dataset.index = index;
            lyricLine.innerHTML = `${line.text}<br><span style="font-size: 0.8em; opacity: 0.7;">${line.romanized}</span>`;
            lyricsWrapper.appendChild(lyricLine);
        });
    }
    
    // Update current lyric based on music time
    function updateCurrentLyric() {
        if (!musicState.isPlaying) return;
        
        const currentTime = backgroundMusic.currentTime;
        
        // Find the current lyric
        let foundIndex = -1;
        
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].startTime && currentTime <= lyrics[i].endTime) {
                foundIndex = i;
                break;
            }
        }
        
        // Update only if the lyric changed
        if (foundIndex !== musicState.currentLyricIndex) {
            musicState.currentLyricIndex = foundIndex;
            
            // Update the display
            const lyricLines = lyricsWrapper.querySelectorAll('.lyrics-line');
            
            // Reset all lines
            lyricLines.forEach(line => {
                line.classList.remove('active', 'pre-active');
            });
            
            if (foundIndex !== -1) {
                // Current active line
                lyricLines[foundIndex].classList.add('active');
                
                // Prepare the next line as pre-active
                if (foundIndex < lyrics.length - 1) {
                    lyricLines[foundIndex + 1].classList.add('pre-active');
                }
                
                // Scroll to active line
                if (musicState.isLyricsVisible) {
                    lyricLines[foundIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
            
            // Trigger character animations on lyric change if enabled
            if (musicState.characterDanceEnabled && foundIndex !== -1) {
                triggerCharacterDance(foundIndex);
            }
        }
    }
    
    // Character dance animations synchronized with lyrics
    function triggerCharacterDance(lyricIndex) {
        // Alternate which character reacts to each line
        const isAmine = lyricIndex % 2 === 0;
        const character = isAmine ? amineChar : douaeChar;
        
        // Different dance moves based on the lyric content
        const lyricText = lyrics[lyricIndex].text;
        
        if (lyricText.includes("حب") || lyricText.includes("قلب")) {
            // Heart-related lyric - love reaction
            character.classList.add('jumping');
            
            // Show heart effect
            if (isAmine) {
                const gift = amineChar.querySelector('.gift.heart');
                if (gift) {
                    gift.classList.remove('hidden');
                    gift.classList.add('visible', 'floating');
                    
                    setTimeout(() => {
                        gift.classList.remove('visible', 'floating');
                        gift.classList.add('hidden');
                    }, 3000);
                }
            } else {
                const reaction = douaeChar.querySelector('.reaction.love');
                if (reaction) {
                    reaction.classList.remove('hidden');
                    reaction.classList.add('visible', 'floating');
                    
                    setTimeout(() => {
                        reaction.classList.remove('visible', 'floating');
                        reaction.classList.add('hidden');
                    }, 3000);
                }
            }
            
            setTimeout(() => {
                character.classList.remove('jumping');
            }, 600);
        } 
        else if (lyricText.includes("ضحك") || lyricText.includes("جمل")) {
            // Happy-related lyric - happy reaction
            character.classList.add('happy-meeting');
            
            // Show happy effect
            if (!isAmine) {
                const reaction = douaeChar.querySelector('.reaction.happy');
                if (reaction) {
                    reaction.classList.remove('hidden');
                    reaction.classList.add('visible');
                    
                    setTimeout(() => {
                        reaction.classList.remove('visible');
                        reaction.classList.add('hidden');
                    }, 3000);
                }
            }
            
            setTimeout(() => {
                character.classList.remove('happy-meeting');
            }, 600);
        }
        else {
            // Default reaction - gentle sway
            character.style.animation = 'none';
            character.offsetHeight; // Trigger reflow
            character.style.animation = 'walk 1.2s infinite';
            
            setTimeout(() => {
                character.style.animation = '';
            }, 3000);
        }
    }
    
    // Check for music events and trigger special effects
    function checkMusicEvents() {
        if (!musicState.isPlaying || !musicState.musicSyncEnabled) return;
        
        const currentTime = backgroundMusic.currentTime;
        
        // Look for events near the current time (within 0.5 seconds)
        for (let i = 0; i < musicEvents.length; i++) {
            const event = musicEvents[i];
            
            // Check if we're within the time window and we haven't triggered this event recently
            if (Math.abs(currentTime - event.time) < 0.5 && 
                (currentTime > event.time || currentTime < event.lastTriggered || !event.lastTriggered)) {
                
                // Mark as triggered
                event.lastTriggered = currentTime;
                
                // Trigger the appropriate effect based on event type
                triggerMusicEvent(event);
            }
        }
    }
    
    // Trigger visual effects based on music events
    function triggerMusicEvent(event) {
        const romanceAnimations = window.romanceAnimations;
        
        switch(event.event) {
            case 'start':
                // Subtle effect to start the song
                if (romanceAnimations) {
                    const heart = document.querySelector('.heart');
                    if (heart) {
                        heart.style.animation = 'heartbeat 1s';
                        setTimeout(() => {
                            heart.style.animation = 'float 3s ease-in-out infinite';
                        }, 1000);
                    }
                }
                break;
                
            case 'beat':
                // Pulsing effect for regular beats
                if (romanceAnimations) {
                    // Random position for heart effect
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * (window.innerHeight / 2);
                    
                    romanceAnimations.createHeartTrail(x, y);
                }
                break;
                
            case 'crescendo':
                // Building up effect 
                if (romanceAnimations) {
                    // Multiple hearts in sequence
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const x = Math.random() * window.innerWidth;
                            const y = Math.random() * (window.innerHeight / 2);
                            romanceAnimations.createHeartTrail(x, y);
                        }, i * 200);
                    }
                    
                    // Make characters jump if they're visible
                    if (amineChar) {
                        amineChar.classList.add('jumping');
                        setTimeout(() => {
                            amineChar.classList.remove('jumping');
                        }, 600);
                    }
                }
                break;
                
            case 'chorus':
                // Major effect for chorus sections
                if (romanceAnimations) {
                    // Heart explosion in center
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 3;
                    romanceAnimations.triggerHeartExplosion(centerX, centerY);
                    
                    // Create a coin block if intensity is high enough
                    if (event.intensity === 'high' || event.intensity === 'very-high') {
                        setTimeout(() => {
                            romanceAnimations.createCoinBlock();
                        }, 1000);
                    }
                    
                    // Make both characters react
                    if (amineChar && douaeChar) {
                        // Amine jumps with excitement
                        amineChar.classList.add('jumping');
                        setTimeout(() => {
                            amineChar.classList.remove('jumping');
                            
                            // Show gift from Amine
                            const giftElement = amineChar.querySelector('.gift.flower');
                            if (giftElement) {
                                giftElement.classList.remove('hidden');
                                giftElement.classList.add('visible', 'floating');
                                
                                // Douae reacts with surprise
                                setTimeout(() => {
                                    const surpriseReaction = douaeChar.querySelector('.reaction.surprise');
                                    if (surpriseReaction) {
                                        surpriseReaction.classList.remove('hidden');
                                        surpriseReaction.classList.add('visible');
                                        
                                        // Douae jumps with happiness
                                        setTimeout(() => {
                                            douaeChar.classList.add('jumping');
                                            
                                            // Hide surprise, show happiness
                                            setTimeout(() => {
                                                surpriseReaction.classList.remove('visible');
                                                surpriseReaction.classList.add('hidden');
                                                
                                                const happyReaction = douaeChar.querySelector('.reaction.love');
                                                if (happyReaction) {
                                                    happyReaction.classList.remove('hidden');
                                                    happyReaction.classList.add('visible', 'floating');
                                                }
                                                
                                                // Reset after animation
                                                setTimeout(() => {
                                                    douaeChar.classList.remove('jumping');
                                                    
                                                    if (happyReaction) {
                                                        happyReaction.classList.remove('visible', 'floating');
                                                        happyReaction.classList.add('hidden');
                                                    }
                                                    
                                                    if (giftElement) {
                                                        giftElement.classList.remove('visible', 'floating');
                                                        giftElement.classList.add('hidden');
                                                    }
                                                }, 3000);
                                            }, 600);
                                        }, 500);
                                    }
                                }, 500);
                            }
                        }, 600);
                    }
                }
                break;
                
            case 'finale':
                // Grand finale effect
                if (romanceAnimations) {
                    // Multiple heart explosions
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            const x = (i/2) * window.innerWidth;
                            const y = window.innerHeight / 3;
                            romanceAnimations.triggerHeartExplosion(x, y);
                        }, i * 500);
                    }
                    
                    // Big heart in center
                    setTimeout(() => {
                        const bigHeart = document.createElement('div');
                        bigHeart.innerHTML = '❤️';
                        bigHeart.style.position = 'fixed';
                        bigHeart.style.left = '50%';
                        bigHeart.style.top = '40%';
                        bigHeart.style.fontSize = '0px';
                        bigHeart.style.transform = 'translate(-50%, -50%)';
                        bigHeart.style.zIndex = '1000';
                        bigHeart.style.opacity = '0';
                        bigHeart.style.transition = 'all 1s ease-out';
                        
                        document.body.appendChild(bigHeart);
                        
                        // Grow the heart
                        setTimeout(() => {
                            bigHeart.style.fontSize = '150px';
                            bigHeart.style.opacity = '1';
                            
                            // Add pulsing animation
                            setTimeout(() => {
                                bigHeart.style.animation = 'heartbeat 1s infinite';
                                
                                // Remove after some time
                                setTimeout(() => {
                                    bigHeart.style.animation = 'none';
                                    bigHeart.style.opacity = '0';
                                    bigHeart.style.fontSize = '0px';
                                    
                                    // Remove from DOM
                                    setTimeout(() => {
                                        if (bigHeart.parentNode) {
                                            bigHeart.parentNode.removeChild(bigHeart);
                                        }
                                    }, 1000);
                                }, 5000);
                            }, 1000);
                        }, 100);
                    }, 1000);
                }
                break;
        }
    }
    
    // Update music state and synchronized animations
    function updateMusicState() {
        if (!backgroundMusic) return;
        
        musicState.currentTime = backgroundMusic.currentTime;
        
        // Update lyrics display
        updateCurrentLyric();
        
        // Check for music events
        checkMusicEvents();
        
        // Detect beats for additional animation
        detectBeats();
    }
    
    // Simple beat detection based on music playback time
    function detectBeats() {
        if (!musicState.isPlaying) return;
        
        const currentTime = backgroundMusic.currentTime;
        
        // Simple beat detection - we just check if we're close to a whole second
        // This is a very basic approach; in a real app you would use audio analysis
        const timeInBeats = currentTime % 1;
        const isOnBeat = timeInBeats < 0.1 || timeInBeats > 0.9;
        
        // Prevent rapid repeat triggers
        const timeSinceLastBeat = currentTime - musicState.lastBeatTime;
        
        if (isOnBeat && timeSinceLastBeat > (musicState.beatThreshold / 1000)) {
            musicState.beatDetected = true;
            musicState.lastBeatTime = currentTime;
            
            // Trigger beat animations if enabled and not in the middle of another animation
            if (musicState.musicSyncEnabled) {
                onBeatDetected();
            }
        } else {
            musicState.beatDetected = false;
        }
    }
    
    // Triggered when a beat is detected
    function onBeatDetected() {
        // Small chance to trigger animations on beats
        if (Math.random() < 0.2) {
            // Random visual effect
            const effects = ['heartbeat', 'characterJump', 'colorPulse'];
            const effect = effects[Math.floor(Math.random() * effects.length)];
            
            switch(effect) {
                case 'heartbeat':
                    // Make the heart pulse
                    const heart = document.querySelector('.heart');
                    if (heart) {
                        heart.style.animation = 'heartbeat 0.6s';
                        setTimeout(() => {
                            heart.style.animation = 'float 3s ease-in-out infinite';
                        }, 600);
                    }
                    break;
                    
                case 'characterJump':
                    // Make a random character jump
                    const character = Math.random() < 0.5 ? amineChar : douaeChar;
                    if (character && !character.classList.contains('jumping')) {
                        character.classList.add('jumping');
                        setTimeout(() => {
                            character.classList.remove('jumping');
                        }, 600);
                    }
                    break;
                    
                case 'colorPulse':
                    // Create a subtle color pulse effect
                    const pulse = document.createElement('div');
                    pulse.style.position = 'fixed';
                    pulse.style.left = '0';
                    pulse.style.top = '0';
                    pulse.style.width = '100%';
                    pulse.style.height = '100%';
                    pulse.style.backgroundColor = 'rgba(255, 182, 193, 0.2)'; // Light pink
                    pulse.style.zIndex = '1';
                    pulse.style.pointerEvents = 'none';
                    pulse.style.opacity = '0';
                    pulse.style.transition = 'opacity 0.3s ease-in-out';
                    
                    document.body.appendChild(pulse);
                    
                    setTimeout(() => {
                        pulse.style.opacity = '1';
                        
                        setTimeout(() => {
                            pulse.style.opacity = '0';
                            
                            setTimeout(() => {
                                if (pulse.parentNode) {
                                    pulse.parentNode.removeChild(pulse);
                                }
                            }, 300);
                        }, 300);
                    }, 10);
                    break;
            }
        }
    }
    
    // Setup volume control with keyboard
    function setupVolumeControl() {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowUp':
                    // Volume up
                    if (e.ctrlKey) {
                        musicState.volume = Math.min(1, musicState.volume + 0.1);
                        backgroundMusic.volume = musicState.volume;
                        e.preventDefault();
                    }
                    break;
                    
                case 'ArrowDown':
                    // Volume down
                    if (e.ctrlKey) {
                        musicState.volume = Math.max(0, musicState.volume - 0.1);
                        backgroundMusic.volume = musicState.volume;
                        e.preventDefault();
                    }
                    break;
                    
                case 'm':
                    // Mute toggle
                    musicState.isMuted = !musicState.isMuted;
                    backgroundMusic.muted = musicState.isMuted;
                    break;
                    
                case ' ':
                    // Space to play/pause when not focused on input
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                        toggleMusic();
                        e.preventDefault();
                    }
                    break;
            }
        });
    }
    
    // Make functions available to other scripts
    window.musicController = {
        toggleMusic: toggleMusic,
        toggleLyrics: toggleLyrics,
        
        setVolume: function(volume) {
            musicState.volume = Math.max(0, Math.min(1, volume));
            backgroundMusic.volume = musicState.volume;
        },
        
        getMusicState: function() {
            return { ...musicState };
        },
        
        toggleMusicSync: function(enabled) {
            musicState.musicSyncEnabled = enabled;
        },
        
        toggleCharacterDance: function(enabled) {
            musicState.characterDanceEnabled = enabled;
        },
        
        jumpToSection: function(timeInSeconds) {
            if (backgroundMusic) {
                backgroundMusic.currentTime = timeInSeconds;
            }
        },
        
        isPlaying: function() {
            return musicState.isPlaying;
        }
    };
    
    // Initialize everything
    function init() {
        initMusicSystem();
        setupVolumeControl();
        
        // Debug function - try to autoplay music if possible
        setTimeout(() => {
            if (!musicState.isPlaying) {
                backgroundMusic.volume = 0.1; // Start at low volume
                
                // Try to play (this may fail due to browser autoplay policies)
                backgroundMusic.play()
                    .then(() => {
                        musicState.isPlaying = true;
                        musicToggle.textContent = '🎵 Music Off';
                        
                        // Gradually increase volume
                        let vol = 0.1;
                        const fadeIn = setInterval(() => {
                            vol += 0.1;
                            if (vol >= musicState.volume) {
                                vol = musicState.volume;
                                clearInterval(fadeIn);
                            }
                            backgroundMusic.volume = vol;
                        }, 200);
                    })
                    .catch(error => {
                        console.log("Autoplay prevented:", error);
                    });
            }
        }, 2000);
    }
    
    // Start initialization
    init();
});
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
