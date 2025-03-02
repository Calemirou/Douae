// animations.js - Basic character animations

// Character movement functions
function walkCharacter(character, direction, distance, duration) {
    return new Promise(resolve => {
        character.classList.add('walking');
        
        const property = direction === 'left' ? 'right' : 'left';
        character.style.transition = `${property} ${duration}s ease-in-out`;
        character.style[property] = `${distance}px`;
        
        setTimeout(() => {
            character.classList.remove('walking');
            resolve();
        }, duration * 1000);
    });
}

function jumpCharacter(character, height = 30, duration = 0.6) {
    return new Promise(resolve => {
        character.classList.add('jumping');
        
        setTimeout(() => {
            character.classList.remove('jumping');
            resolve();
        }, duration * 1000);
    });
}

function danceCharacter(character, duration = 2) {
    return new Promise(resolve => {
        character.classList.add('dancing');
        
        setTimeout(() => {
            character.classList.remove('dancing');
            resolve();
        }, duration * 1000);
    });
}

function spinCharacter(character, duration = 1) {
    return new Promise(resolve => {
        character.classList.add('spinning');
        
        setTimeout(() => {
            character.classList.remove('spinning');
            resolve();
        }, duration * 1000);
    });
}

function waveCharacter(character, duration = 1) {
    return new Promise(resolve => {
        character.classList.add('waving');
        
        setTimeout(() => {
            character.classList.remove('waving');
            resolve();
        }, duration * 1000);
    });
}

function showReaction(character, reactionType, duration = 2) {
    return new Promise(resolve => {
        const reaction = character.querySelector(`.reaction.${reactionType}`);
        
        // Show reaction
        reaction.classList.remove('hidden');
        reaction.classList.add('visible');
        
        // Make it float
        setTimeout(() => {
            reaction.classList.add('floating');
        }, 500);
        
        // Hide after duration
        setTimeout(() => {
            reaction.classList.remove('visible', 'floating');
            reaction.classList.add('hidden');
            resolve();
        }, duration * 1000);
    });
}

function showGift(character, giftType, duration = 2) {
    return new Promise(resolve => {
        const gift = character.querySelector(`.gift.${giftType}`);
        
        // Show gift
        gift.classList.remove('hidden');
        gift.classList.add('visible');
        
        // Make it float
        setTimeout(() => {
            gift.classList.add('floating');
        }, 500);
        
        // Hide after duration
        setTimeout(() => {
            gift.classList.remove('visible', 'floating');
            gift.classList.add('hidden');
            resolve();
        }, duration * 1000);
    });
}

function meetCharacters(amine, douae, duration = 2) {
    return new Promise(resolve => {
        // Position characters to meet in the center
        amine.style.transition = 'left 1.5s ease-in-out';
        douae.style.transition = 'right 1.5s ease-in-out';
        
        amine.style.left = 'calc(50% - 100px)';
        douae.style.right = 'calc(50% - 100px)';
        
        // Wait for them to reach center
        setTimeout(() => {
            // Happy reaction
            amine.classList.add('happy-meeting');
            douae.classList.add('happy-meeting');
            
            setTimeout(() => {
                amine.classList.remove('happy-meeting');
                douae.classList.remove('happy-meeting');
                resolve();
            }, duration * 1000);
        }, 1500);
    });
}

function pauseCharacters(amine, douae, duration = 1) {
    return new Promise(resolve => {
        amine.classList.add('paused');
        douae.classList.add('paused');
        
        setTimeout(() => {
            amine.classList.remove('paused');
            douae.classList.remove('paused');
            resolve();
        }, duration * 1000);
    });
}

// Heart trail effect
function createHeartTrail(x, y, duration = 2) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('heart-trail');
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Add CSS animations for these movements
const style = document.createElement('style');
style.textContent = `
    /* Dancing animation */
    @keyframes dance {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(5deg); }
        50% { transform: translateY(0) rotate(0deg); }
        75% { transform: translateY(-15px) rotate(-5deg); }
    }
    
    .dancing img {
        animation: dance 0.8s infinite;
    }
    
    /* Spinning animation */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .spinning img {
        animation: spin 1s ease-in-out;
        transform-origin: bottom center;
    }
    
    /* Waving animation */
    @keyframes wave {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(20deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-20deg); }
        100% { transform: rotate(0deg); }
    }
    
    .waving img {
        animation: wave 0.5s infinite;
        transform-origin: 70% 80%;
    }
`;
document.head.appendChild(style);
