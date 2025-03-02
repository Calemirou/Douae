document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const stars = document.getElementById('stars');
    const flowers = document.getElementById('flowers');
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine.querySelector('img');
    const douaeImg = douae.querySelector('img');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const container = document.querySelector('.container');
    
    // Constants
    const WINDOW_WIDTH = window.innerWidth;
    const WINDOW_HEIGHT = window.innerHeight;
    const SONG_DURATION = 211000; // 3 minutes 31 seconds
    
    // Unique Meeting Story Animation
    function createUniqueStory() {
        // Reset initial positions
        amine.style.left = '-250px';
        douae.style.right = '-250px';
        
        // Story sequence of moments
        const storyline = [
            {
                action: adventureStart,
                delay: 2000
            },
            {
                action: unexpectedEncounter,
                delay: 8000
            },
            {
                action: playfulInteraction,
                delay: 15000
            },
            {
                action: sharedJourney,
                delay: 22000
            },
            {
                action: connectionMoment,
                delay: 30000
            },
            {
                action: finalChapter,
                delay: 38000
            }
        ];
        
        // Execute storyline
        storyline.forEach(moment => {
            setTimeout(moment.action, moment.delay);
        });
        
        // Restart the story when song ends
        setTimeout(createUniqueStory, SONG_DURATION);
    }
    
    // Adventure Start - Characters enter from opposite sides
    function adventureStart() {
        // Amine enters from left with adventure-like movement
        amine.style.transition = 'left 4s cubic-bezier(0.45, 0, 0.55, 1)';
        amine.style.left = `${WINDOW_WIDTH * 0.2}px`;
        amine.classList.add('walking');
        
        // Add explorer effect
        amineImg.style.filter = 'drop-shadow(0 0 10px rgba(0,0,0,0.5))';
        
        // Create path elements
        createAdventurePath(amine);
        
        // Douae enters from right with mysterious approach
        setTimeout(() => {
            douae.style.transition = 'right 4s cubic-bezier(0.45, 0, 0.55, 1)';
            douae.style.right = `${WINDOW_WIDTH * 0.2}px`;
            douae.classList.add('walking');
            
            // Add mystique effect
            douaeImg.style.filter = 'brightness(0.9) contrast(1.2)';
            
            createMysteriousTrail(douae);
        }, 2000);
    }
    
    // Unexpected Encounter
    function unexpectedEncounter() {
        // Stop walking
        amine.classList.remove('walking');
        douae.classList.remove('walking');
        
        // Surprised poses
        amineImg.style.transform = 'rotate(15deg) scale(1.1)';
        douaeImg.style.transform = 'rotate(-15deg) scale(1.1)';
        
        // Create interaction zone
        createInteractionZone();
        
        // Playful reaction elements
        setTimeout(() => {
            createSurpriseEffects();
        }, 1000);
    }
    
    // Playful Interaction
    function playfulInteraction() {
        // Move closer but not too close
        amine.style.transition = 'left 3s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.35}px`;
        
        douae.style.transition = 'right 3s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.35}px`;
        
        // Playful animations
        setTimeout(() => {
            amineImg.style.animation = 'playful-bounce 1s infinite';
            douaeImg.style.animation = 'playful-bounce 1s infinite alternate';
            
            // Create interactive elements
            createPlayfulElements();
        }, 2000);
    }
    
    // Shared Journey
    function sharedJourney() {
        // Move towards center but maintain distance
        amine.style.transition = 'left 4s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.4}px`;
        
        douae.style.transition = 'right 4s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.4}px`;
        
        // Synchronized movement
        setTimeout(() => {
            amineImg.style.transform = 'rotate(5deg)';
            douaeImg.style.transform = 'rotate(-5deg)';
            
            // Create journey visualization
            createJourneyVisualization();
        }, 2000);
    }
    
    // Connection Moment
    function connectionMoment() {
        // Subtle approach
        amine.style.transition = 'left 3s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.45}px`;
        
        douae.style.transition = 'right 3s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.45}px`;
        
        // Create connection visualization
        setTimeout(() => {
            createConnectionEffects();
        }, 2000);
    }
    
    // Final Chapter
    function finalChapter() {
        // Final positioning
        amine.style.transition = 'left 4s ease-in-out';
        amine.style.left = `${WINDOW_WIDTH * 0.48}px`;
        
        douae.style.transition = 'right 4s ease-in-out';
        douae.style.right = `${WINDOW_WIDTH * 0.48}px`;
        
        // Final moment visualization
        setTimeout(() => {
            createFinalMomentEffects();
        }, 2000);
    }
    
    // Helper Visualization Functions
    function createAdventurePath(character) {
        const path = document.createElement('div');
        path.style.position = 'fixed';
        path.style.bottom = '10%';
        path.style.left = '0';
        path.style.width = '100%';
        path.style.height = '2px';
        path.style.background = 'linear-gradient(to right, transparent, rgba(135,206,235,0.5), transparent)';
        document.body.appendChild(path);
        
        setTimeout(() => path.remove(), 5000);
    }
    
    function createMysteriousTrail(character) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.bottom = '10%';
        trail.style.right = '0';
        trail.style.width = '100%';
        trail.style.height = '2px';
        trail.style.background = 'linear-gradient(to left, transparent, rgba(255,105,180,0.5), transparent)';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 5000);
    }
    
    function createInteractionZone() {
        const zone = document.createElement('div');
        zone.style.position = 'fixed';
        zone.style.top = '50%';
        zone.style.left = '50%';
        zone.style.transform = 'translate(-50%, -50%)';
        zone.style.width = '200px';
        zone.style.height = '200px';
        zone.style.border = '2px dashed rgba(255,255,255,0.3)';
        zone.style.borderRadius = '50%';
        zone.style.pointerEvents = 'none';
        document.body.appendChild(zone);
        
        setTimeout(() => zone.remove(), 3000);
    }
    
    function createSurpriseEffects() {
        // Create surprise elements
        for (let i = 0; i < 5; i++) {
            const surprise = document.createElement('div');
            surprise.innerHTML = '❓';
            surprise.style.position = 'fixed';
            surprise.style.top = `${Math.random() * WINDOW_HEIGHT}px`;
            surprise.style.left = `${Math.random() * WINDOW_WIDTH}px`;
            surprise.style.fontSize = `${Math.random() * 30 + 20}px`;
            surprise.style.opacity = '0';
            surprise.style.transition = 'all 1s ease';
            document.body.appendChild(surprise);
            
            setTimeout(() => {
                surprise.style.opacity = '1';
                surprise.style.transform = 'scale(1.5) rotate(360deg)';
            }, i * 200);
            
            setTimeout(() => surprise.remove(), 2000);
        }
    }
    
    function createPlayfulElements() {
        // Create bouncing playful elements
        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            element.innerHTML = ['🎈', '🎉', '✨', '🌈'][Math.floor(Math.random() * 4)];
            element.style.position = 'fixed';
            element.style.top = `${Math.random() * WINDOW_HEIGHT}px`;
            element.style.left = `${Math.random() * WINDOW_WIDTH}px`;
            element.style.fontSize = `${Math.random() * 30 + 20}px`;
            element.style.opacity = '0';
            element.style.transition = 'all 1s ease';
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1.5) rotate(360deg)';
            }, i * 200);
            
            setTimeout(() => element.remove(), 2000);
        }
    }
    
    function createJourneyVisualization() {
        const journey = document.createElement('div');
        journey.style.position = 'fixed';
        journey.style.top = '0';
        journey.style.left = '0';
        journey.style.width = '100%';
        journey.style.height = '100%';
        journey.style.background = 'linear-gradient(45deg, rgba(135,206,235,0.2), rgba(255,105,180,0.2))';
        journey.style.pointerEvents = 'none';
        journey.style.opacity = '0';
        journey.style.transition = 'opacity 2s ease';
        document.body.appendChild(journey);
        
        setTimeout(() => {
            journey.style.opacity = '1';
        }, 100);
        
        setTimeout(() => journey.remove(), 3000);
    }
    
    function createConnectionEffects() {
        // Create connection line
        const connection = document.createElement('div');
        connection.style.position = 'fixed';
        connection.style.top = '50%';
        connection.style.left = '0';
        connection.style.width = '100%';
        connection.style.height = '2px';
        connection.style.background = 'linear-gradient(to right, transparent, rgba(255,105,180,0.7), transparent)';
        connection.style.opacity = '0';
        connection.style.transition = 'opacity 2s ease';
        document.body.appendChild(connection);
        
        setTimeout(() => {
            connection.style.opacity = '1';
        }, 100);
        
        setTimeout(() => connection.remove(), 3000);
    }
    
    function createFinalMomentEffects() {
        // Create final moment visualization
        const finalMoment = document.createElement('div');
        finalMoment.style.position = 'fixed';
        finalMoment.style.top = '0';
        finalMoment.style.left = '0';
        finalMoment.style.width = '100%';
        finalMoment.style.height = '100%';
        finalMoment.style.background = 'radial-gradient(circle, rgba(255,105,180,0.3), rgba(135,206,235,0.3))';
        finalMoment.style.opacity = '0';
        finalMoment.style.transition = 'opacity 2s ease';
        document.body.appendChild(finalMoment);
        
        setTimeout(() => {
            finalMoment.style.opacity = '1';
        }, 100);
        
        setTimeout(() => finalMoment.remove(), 3000);
        
        // Create final heart moment
        setTimeout(createFinalHeart, 2000);
    }
    
    function createFinalHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.top = '50%';
        heart.style.left = '50%';
        heart.style.transform = 'translate(-50%, -50%) scale(0)';
        heart.style.fontSize = '0px';
        heart.style.transition = 'all 2s ease';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.fontSize = '200px';
            heart.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        setTimeout(() => heart.remove(), 3000);
    }
    
    // Music and Animation Control
    function initAnimation() {
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes playful-bounce {
                0% { transform: translateY(0) rotate(-5deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
                100% { transform: translateY(0) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Start music if not playing
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🎵 Music On';
        }
        
        // Create unique story animation
        createUniqueStory();
    }
    
    // Initialize everything
    initAnimation();
});
