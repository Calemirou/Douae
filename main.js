/**
 * main.js - Main script for the "I Love You Douae" webpage
 * This file initializes all the animation systems by linking to the separate animation files
 */

// Wait for the DOM to be fully loaded before initializing animations
document.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing animations and music system...");
    
    // Initialize animations from animations.js
    if (typeof initAnimations === 'function') {
        initAnimations();
    } else {
        console.error("Animation system not found! Make sure animations.js is loaded before main.js");
    }
    
    // Initialize music system from animations-music.js
    if (typeof initMusicSystem === 'function') {
        initMusicSystem();
    } else {
        console.error("Music system not found! Make sure animations-music.js is loaded before main.js");
    }
    
    // Initialize enhanced animations (more intimate interactions)
    if (typeof initEnhancedAnimations === 'function') {
        initEnhancedAnimations();
    } else {
        console.error("Enhanced animations not found! Make sure enhanced-animations.js is loaded before main.js");
    }
    
    console.log("Animation and music systems initialized successfully!");
});

// Master function to restart all animations (can be called from console)
function restartAllAnimations() {
    console.log("Restarting all animations...");
    
    // Get character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (!amineChar || !douaeChar) {
        console.error("Character elements not found!");
        return;
    }
    
    // Reset character positions and states
    amineChar.style.left = "-150px";
    douaeChar.style.right = "-150px";
    
    // Remove any active animation classes
    amineChar.classList.remove('walking', 'jumping', 'dancing', 'happy-meeting');
    douaeChar.classList.remove('walking', 'jumping', 'dancing', 'happy-meeting');
    
    // Reset any transforms
    amineChar.style.transform = '';
    douaeChar.style.transform = '';
    
    // Hide all gifts and reactions
    if (typeof hideGift === 'function') {
        hideGift(amineChar, 'flower');
        hideGift(amineChar, 'heart');
        hideGift(amineChar, 'gift-box');
    }
    
    if (typeof hideReaction === 'function') {
        hideReaction(douaeChar, 'love');
        hideReaction(douaeChar, 'surprise');
        hideReaction(douaeChar, 'happy');
    }
    
    // Restart the animations
    if (typeof startCharacterAnimation === 'function') {
        setTimeout(() => {
            startCharacterAnimation(amineChar, douaeChar);
        }, 1000);
    }
    
    // Restart the music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Restart enhanced animations if available
    if (typeof enhanceCharacterAnimations === 'function') {
        setTimeout(() => {
            enhanceCharacterAnimations();
        }, 2000);
    }
    
    console.log("All animations restarted!");
}

// Function to pause all animations (can be called from console)
function pauseAllAnimations() {
    console.log("Pausing all animations...");
    
    // Pause music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
    
    // Pause character animations
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (amineChar && douaeChar) {
        amineChar.classList.add('paused');
        douaeChar.classList.add('paused');
    }
    
    console.log("All animations paused!");
}

// Function to resume all animations (can be called from console)
function resumeAllAnimations() {
    console.log("Resuming all animations...");
    
    // Resume music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Resume character animations
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    if (amineChar && douaeChar) {
        amineChar.classList.remove('paused');
        douaeChar.classList.remove('paused');
    }
    
    console.log("All animations resumed!");
}

// Function to skip to a specific time in the animation sequence
function skipToTime(timeInSeconds) {
    console.log(`Skipping to ${timeInSeconds} seconds`);
    
    // Set music to specific time
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.currentTime = timeInSeconds;
        
        // Make sure music is playing
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    console.log(`Skipped to ${timeInSeconds} seconds`);
}
