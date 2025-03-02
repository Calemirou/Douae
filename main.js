document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const stars = document.getElementById('stars');
    const flowers = document.getElementById('flowers');
    const heart = document.querySelector('.heart');
    const charactersContainer = document.getElementById('charactersContainer');
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const currentLyric = document.getElementById('currentLyric');
    
    // Global variables
    let isPlaying = false;
    let showLyrics = false;
    let animationStarted = false;
    let charactersMet = false;
    let heartTrails = [];
    
    // Create starry background
    createStars();
    
    // Create floating flowers
    createFlowers();
    
    // Gradually show heart
    setTimeout(function() {
        document.querySelector('.heart').style.animation = 'pulse 2s infinite';
    }, 1000);
    
    // Event listeners
    musicToggle.addEventListener('click', toggleMusic);
    lyricsToggle.addEventListener('click', toggleLyrics);
    document.body.addEventListener('click', createHeartOnClick);
    
    // Start music and animation when heart is clicked
    document.querySelector('.heart').addEventListener('click', function() {
        if (!animationStarted) {
            startMainAnimation();
            animationStarted = true;
        }
    });
    
    // Functions
    function createStars() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = Math.random() * 3 + 's';
            stars.appendChild(star);
        }
    }
    
    function createFlowers() {
        for (let i = 0; i < 20; i++) {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.animationDelay = Math.random() * 10 + 's';
            flowers.appendChild(flower);
        }
    }
    
    function createHeartOnClick(e) {
        if (e.target.classList.contains('heart') || 
            e.target.classList.contains('music-control') || 
            e.target.classList.contains('lyrics-toggle') ||
            e.target.closest('.lyrics-container')) {
            return;
        }
        
        // Create heart trail
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart-trail');
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
    
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Music Off';
            resetCharactersPosition();
        } else {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
            if (!animationStarted) {
                startMainAnimation();
                animationStarted = true;
            }
        }
        isPlaying = !isPlaying;
    }
    
    function toggleLyrics() {
        showLyrics = !showLyrics;
        lyricsContainer.style.display = showLyrics ? 'block' : 'none';
        lyricsToggle.textContent = showLyrics ? '🎵 Hide Lyrics' : '🎵 Show Lyrics';
    }
    
    function startMainAnimation() {
        // Start music
        backgroundMusic.play();
        isPlaying = true;
        musicToggle.textContent = '🎵 Music On';
        
        // Start animations based on the music timeline
        initializeMusicSyncedAnimations();
    }
    
    function resetCharactersPosition() {
        // Reset character positions if animation is paused
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
        
        // Reset flags
        charactersMet = false;
        animationStarted = false;
    }
});
