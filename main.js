document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const stars = document.getElementById('stars');
    const flowers = document.getElementById('flowers');
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine.querySelector('img');
    const douaeImg = douae.querySelector('img');
    const amineGiftFlower = amine.querySelector('.gift.flower');
    const amineGiftHeart = amine.querySelector('.gift.heart');
    const amineGiftBox = amine.querySelector('.gift-box');
    const douaeReactionLove = douae.querySelector('.reaction.love');
    const douaeReactionSurprise = douae.querySelector('.reaction.surprise');
    const douaeReactionHappy = douae.querySelector('.reaction.happy');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const currentLyric = document.getElementById('currentLyric');
    const heart = document.querySelector('.heart');
    
    // Constants
    const SONG_DURATION = 211000; // 3 minutes 31 seconds in milliseconds
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    
    // Initialize stars
    function createStars() {
        stars.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDelay = `${Math.random() * 3}s`;
            stars.appendChild(star);
        }
    }
    
    // Initialize flowers
    function createFlowers() {
        flowers.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            createFlower();
        }
    }
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.backgroundColor = `hsl(${Math.random() * 60 + 300}, 80%, 70%)`;
        flower.style.animationDuration = `${Math.random() * 5 + 8}s`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flowers.appendChild(flower);
        
        // Remove after animation complete
        setTimeout(() => {
            flower.remove();
            createFlower();
        }, parseInt(flower.style.animationDuration) * 1000 + parseInt(flower.style.animationDelay) * 1000);
    }
    
    // Create heart trail
    function createHeartTrail(x, y) {
        const heartTrail = document.createElement('div');
        heartTrail.className = 'heart-trail';
        heartTrail.innerHTML = '❤️';
        heartTrail.style.left = `${x}px`;
        heartTrail.style.top = `${y}px`;
        document.body.appendChild(heartTrail);
        
        // Remove after animation complete
        setTimeout(() => {
            heartTrail.remove();
        }, 2000);
    }
    
    // Toggle heart color
    function toggleHeartColor() {
        heart.classList.toggle('pink');
        setTimeout(() => {
            heart.classList.toggle('pink');
        }, 500);
    }
    
    // Character movement functions
    function moveAmineIn() {
        amine.classList.add('walking');
        const animationDuration = 4000;
        const startPosition = -150;
        const endPosition = WINDOW_WIDTH * 0.25;
        const startTime = Date.now();
        
        function step() {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / animationDuration);
            const currentPosition = startPosition + (endPosition - startPosition) * progress;
            amine.style.left = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                amine.classList.remove('walking');
                createHeartTrail(currentPosition + 50, WINDOW_HEIGHT - 180);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function moveDouaeIn() {
        douae.classList.add('walking');
        const animationDuration = 4000;
        const startPosition = -150;
        const endPosition = WINDOW_WIDTH * 0.75;
        const startTime = Date.now();
        
        function step() {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / animationDuration);
            const currentPosition = WINDOW_WIDTH + startPosition - (endPosition - startPosition) * progress;
            douae.style.right = `${WINDOW_WIDTH - currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                douae.classList.remove('walking');
                createHeartTrail(currentPosition - 50, WINDOW_HEIGHT - 180);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function amineGivesFlower() {
        amine.classList.add('walking');
        const startPosition = parseFloat(amine.style.left) || WINDOW_WIDTH * 0.25;
        const endPosition = WINDOW_WIDTH * 0.4;
        const animationDuration = 2000;
        const startTime = Date.now();
        
        function step() {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / animationDuration);
            const currentPosition = startPosition + (endPosition - startPosition) * progress;
            amine.style.left = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                amine.classList.remove('walking');
                setTimeout(() => {
                    // Show flower gift
                    amineGiftFlower.classList.remove('hidden');
                    amineGiftFlower.classList.add('visible', 'floating');
                    
                    // Show douae reaction after a short delay
                    setTimeout(() => {
                        douaeReactionSurprise.classList.remove('hidden');
                        douaeReactionSurprise.classList.add('visible');
                        
                        // Walk douae closer
                        douaeWalksToAmine();
                    }, 1000);
                }, 500);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function douaeWalksToAmine() {
        douae.classList.add('walking');
        const startPosition = parseFloat(douae.style.right) || WINDOW_WIDTH * 0.25;
        const endPosition = WINDOW_WIDTH * 0.4;
        const animationDuration = 2000;
        const startTime = Date.now();
        
        function step() {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / animationDuration);
            const currentPosition = startPosition + (endPosition - startPosition) * progress;
            douae.style.right = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                douae.classList.remove('walking');
                
                // Hide surprise, show love reaction
                douaeReactionSurprise.classList.add('hidden');
                douaeReactionSurprise.classList.remove('visible');
                setTimeout(() => {
                    douaeReactionLove.classList.remove('hidden');
                    douaeReactionLove.classList.add('visible', 'floating');
                    
                    // Hide flower after a moment
                    setTimeout(() => {
                        amineGiftFlower.classList.remove('visible', 'floating');
                        amineGiftFlower.classList.add('hidden');
                        
                        // Both jump with joy
                        amine.classList.add('jumping');
                        douae.classList.add('jumping');
                        
                        // Create hearts around them
                        createHeartsAround();
                        
                        // Move to next animation after jumping
                        setTimeout(() => {
                            amine.classList.remove('jumping');
                            douae.classList.remove('jumping');
                            amineGivesGift();
                        }, 1000);
                    }, 2000);
                }, 500);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function createHeartsAround() {
        const aminePosition = amine.getBoundingClientRect();
        const douaePosition = douae.getBoundingClientRect();
        const centerX = (aminePosition.left + douaePosition.left) / 2 + 50;
        const centerY = (aminePosition.top + douaePosition.top) / 2;
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 150;
                const offsetY = (Math.random() - 0.5) * 100;
                createHeartTrail(centerX + offsetX, centerY + offsetY);
            }, i * 200);
        }
    }
    
    function amineGivesGift() {
        // Show gift box
        amineGiftBox.classList.remove('hidden');
        amineGiftBox.classList.add('visible', 'floating');
        
        // Douae reaction
        douaeReactionLove.classList.remove('visible', 'floating');
        douaeReactionLove.classList.add('hidden');
        
        setTimeout(() => {
            douaeReactionHappy.classList.remove('hidden');
            douaeReactionHappy.classList.add('visible');
            
            // Hide gift after a moment
            setTimeout(() => {
                amineGiftBox.classList.remove('visible', 'floating');
                amineGiftBox.classList.add('hidden');
                
                // Show heart as final gift
                amineGiftHeart.classList.remove('hidden');
                amineGiftHeart.classList.add('visible', 'floating');
                
                // Create more hearts
                createHeartsAround();
                
                // Both characters move closer together
                moveCloserTogether();
            }, 2000);
        }, 1000);
    }
    
    function moveCloserTogether() {
        // Move amine closer
        const amineStartPosition = parseFloat(amine.style.left) || WINDOW_WIDTH * 0.4;
        const amineEndPosition = WINDOW_WIDTH * 0.45;
        const amineAnimationDuration = 1500;
        const amineStartTime = Date.now();
        
        function stepAmine() {
            const now = Date.now();
            const progress = Math.min(1, (now - amineStartTime) / amineAnimationDuration);
            const currentPosition = amineStartPosition + (amineEndPosition - amineStartPosition) * progress;
            amine.style.left = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(stepAmine);
            }
        }
        
        requestAnimationFrame(stepAmine);
        
        // Move douae closer
        const douaeStartPosition = parseFloat(douae.style.right) || WINDOW_WIDTH * 0.4;
        const douaeEndPosition = WINDOW_WIDTH * 0.45;
        const douaeAnimationDuration = 1500;
        const douaeStartTime = Date.now();
        
        function stepDouae() {
            const now = Date.now();
            const progress = Math.min(1, (now - douaeStartTime) / douaeAnimationDuration);
            const currentPosition = douaeStartPosition + (douaeEndPosition - douaeStartPosition) * progress;
            douae.style.right = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(stepDouae);
            } else {
                // When both are in position, do a happy dance
                setTimeout(() => {
                    happyDanceTogether();
                }, 500);
            }
        }
        
        requestAnimationFrame(stepDouae);
    }
    
    function happyDanceTogether() {
        // Apply happy-meeting animation class to both characters
        amine.classList.add('happy-meeting');
        douae.classList.add('happy-meeting');
        
        // Create hearts continuously
        const heartInterval = setInterval(() => {
            const aminePosition = amine.getBoundingClientRect();
            const douaePosition = douae.getBoundingClientRect();
            const centerX = (aminePosition.left + douaePosition.left) / 2 + 50;
            const centerY = (aminePosition.top + douaePosition.top) / 2;
            
            createHeartTrail(centerX, centerY - 50);
        }, 300);
        
        // Clear interval and reset for next animation sequence
        setTimeout(() => {
            clearInterval(heartInterval);
            amine.classList.remove('happy-meeting');
            douae.classList.remove('happy-meeting');
            
            // Hide reactions
            douaeReactionHappy.classList.remove('visible');
            douaeReactionHappy.classList.add('hidden');
            amineGiftHeart.classList.remove('visible', 'floating');
            amineGiftHeart.classList.add('hidden');
            
            // Move characters offscreen to reset
            moveCharactersOffscreen();
        }, 5000);
    }
    
    function moveCharactersOffscreen() {
        // Move amine offscreen to the left
        amine.classList.add('walking');
        const amineStartPosition = parseFloat(amine.style.left) || WINDOW_WIDTH * 0.45;
        const amineEndPosition = -150;
        const amineAnimationDuration = 3000;
        const amineStartTime = Date.now();
        
        function stepAmine() {
            const now = Date.now();
            const progress = Math.min(1, (now - amineStartTime) / amineAnimationDuration);
            const currentPosition = amineStartPosition + (amineEndPosition - amineStartPosition) * progress;
            amine.style.left = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(stepAmine);
            } else {
                amine.classList.remove('walking');
            }
        }
        
        requestAnimationFrame(stepAmine);
        
        // Move douae offscreen to the right
        douae.classList.add('walking');
        const douaeStartPosition = parseFloat(douae.style.right) || WINDOW_WIDTH * 0.45;
        const douaeEndPosition = -150;
        const douaeAnimationDuration = 3000;
        const douaeStartTime = Date.now();
        
        function stepDouae() {
            const now = Date.now();
            const progress = Math.min(1, (now - douaeStartTime) / douaeAnimationDuration);
            const currentPosition = douaeStartPosition + (douaeEndPosition - douaeStartPosition) * progress;
            douae.style.right = `${currentPosition}px`;
            
            if (progress < 1) {
                requestAnimationFrame(stepDouae);
            } else {
                douae.classList.remove('walking');
            }
        }
        
        requestAnimationFrame(stepDouae);
    }
    
    // Lyrics handling
    const lyrics = [
        { time: 0, text: "يا دعاء" },
        { time: 5000, text: "أنت الحب الذي يملأ قلبي" },
        { time: 10000, text: "كل لحظة معك هي نعمة" },
        { time: 15000, text: "أنت نوري في الظلام" },
        { time: 20000, text: "وأملي في الحياة" },
        { time: 25000, text: "عيناك كالنجوم في سماء الليل" },
        { time: 30000, text: "وابتسامتك كشروق الشمس" },
        { time: 35000, text: "أحبك بكل ما في الكلمة من معنى" },
        { time: 40000, text: "أنت الجمال الذي يسحر قلبي" },
        { time: 45000, text: "وروحك النقية التي تلهمني" },
        { time: 50000, text: "معك، الحياة أجمل" },
        { time: 55000, text: "وقلبي ينبض بحبك" },
        { time: 60000, text: "يا دعاء، أنت حبيبتي" },
        { time: 65000, text: "وأنت سعادتي" },
        { time: 70000, text: "كل يوم معك هو هدية" },
        { time: 75000, text: "وكل لحظة هي كنز" },
        { time: 80000, text: "أحبك يا دعاء" },
        { time: 85000, text: "وقلبي ملكك إلى الأبد" },
        { time: 90000, text: "أنت القمر الذي ينير ليلي" },
        { time: 95000, text: "والشمس التي تدفئ أيامي" },
        { time: 100000, text: "حبي لك يتجاوز حدود الزمان والمكان" },
        { time: 105000, text: "يا دعاء، أنت كل ما أتمناه" },
        { time: 110000, text: "وكل ما أحلم به" },
        { time: 115000, text: "معك، الحياة مليئة بالألوان" },
        { time: 120000, text: "وبدونك، العالم يفقد بريقه" },
        { time: 125000, text: "أحبك بعمق المحيط" },
        { time: 130000, text: "وارتفاع السماء" },
        { time: 135000, text: "يا دعاء، أنت نصفي الآخر" },
        { time: 140000, text: "وروحي التوأم" },
        { time: 145000, text: "كلماتي لا تستطيع وصف مشاعري" },
        { time: 150000, text: "لكن قلبي يخبرك كل يوم" },
        { time: 155000, text: "أنك الحب الأول والأخير" },
        { time: 160000, text: "يا دعاء، أحبك" },
        { time: 165000, text: "وسأظل أحبك" },
        { time: 170000, text: "إلى آخر نفس في حياتي" },
        { time: 175000, text: "أنت النور الذي يضيء دربي" },
        { time: 180000, text: "والأمل الذي يملأ روحي" },
        { time: 185000, text: "يا دعاء" },
        { time: 190000, text: "أحبك من كل قلبي" },
        { time: 195000, text: "وبكل روحي" },
        { time: 200000, text: "أنت حبيبتي إلى الأبد" },
        { time: 205000, text: "❤️ يا دعاء ❤️" }
    ];
    
    function updateLyrics() {
        const currentTime = backgroundMusic.currentTime * 1000;
        
        // Find the current lyric based on time
        let currentIndex = 0;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                currentIndex = i;
                break;
            }
        }
        
        // Update current lyric text
        currentLyric.textContent = lyrics[currentIndex].text;
    }
    
    // Music toggle control
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Music Off';
        }
    });
    
    // Lyrics toggle control
    lyricsToggle.addEventListener('click', function() {
        if (lyricsContainer.style.display === 'none' || lyricsContainer.style.display === '') {
            lyricsContainer.style.display = 'block';
            lyricsToggle.textContent = '🎵 Hide Lyrics';
        } else {
            lyricsContainer.style.display = 'none';
            lyricsToggle.textContent = '🎵 Show Lyrics';
        }
    });
    
    // Add click event to create hearts on click
    document.body.addEventListener('click', function(event) {
        if (event.target !== musicToggle && event.target !== lyricsToggle) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createHeartTrail(event.clientX, event.clientY);
                }, i * 200);
            }
        }
    });
    
    // Main animation timeline function
    function startAnimation() {
        // Reset positions
        amine.style.left = '-150px';
        douae.style.right = '-150px';
        
        // Clear any existing classes
        amine.className = 'character amine';
        douae.className = 'character douae';
        
        // Hide all gifts and reactions
        const gifts = document.querySelectorAll('.gift, .reaction');
        gifts.forEach(gift => {
            gift.classList.add('hidden');
            gift.classList.remove('visible', 'floating');
        });
        
        // Start music if not playing
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
        }
        
        // Animation timeline
        setTimeout(() => moveAmineIn(), 2000);
        setTimeout(() => moveDouaeIn(), 4000);
        setTimeout(() => amineGivesFlower(), 10000);
        
        // Set up to restart animation when song ends
        setTimeout(() => {
            startAnimation();
        }, SONG_DURATION);
    }
    
    // Initialize everything
    function init() {
        createStars();
        createFlowers();
        
        // Update lyrics every second
        setInterval(updateLyrics, 1000);
        
        // Heart pulse animation
        setInterval(toggleHeartColor, 3000);
        
        // Start the animation sequence
        startAnimation();
        
        // Add event listener for song ending (as backup)
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        });
    }
    
    // Start everything
    init();
});
