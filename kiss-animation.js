// Kiss Animation - Super Mario style
document.addEventListener('DOMContentLoaded', function() {
    // Character elements
    const amineChar = document.getElementById('amine');
    const douaeChar = document.getElementById('douae');
    
    // Kiss animation function - this is the complete implementation
    function kissAnimation() {
        // Move characters close to each other
        moveCharacterTo(amineChar, 'center-left');
        moveCharacterTo(douaeChar, 'center-right');
        
        setTimeout(() => {
            // Add bounce effect before kiss
            amineChar.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(20px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 500,
                easing: 'ease-in-out'
            });
            
            douaeChar.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-20px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 500,
                easing: 'ease-in-out'
            });
            
            // After bounce, create kiss
            setTimeout(() => {
                const amineRect = amineChar.getBoundingClientRect();
                const douaeRect = douaeChar.getBoundingClientRect();
                
                // Create Super Mario style power-up sound effect (optional)
                const kissSound = new Audio('kiss.mp3');
                if (kissSound) {
                    kissSound.play().catch(e => {
                        console.log('Sound play prevented by browser policy');
                    });
                }
                
                // Create kiss animation with multiple elements for Mario-style effect
                
                // 1. Create main kiss emoji
                const kiss = document.createElement('div');
                kiss.innerHTML = '💋';
                kiss.style.position = 'absolute';
                kiss.style.fontSize = '30px';
                kiss.style.left = ((amineRect.right + douaeRect.left) / 2) + 'px';
                kiss.style.top = ((amineRect.top + douaeRect.top) / 2) + 'px';
                kiss.style.zIndex = '100';
                document.body.appendChild(kiss);
                
                // 2. Create star effect around kiss (like Mario power-up)
                for (let i = 0; i < 8; i++) {
                    const star = document.createElement('div');
                    star.innerHTML = '⭐';
                    star.style.position = 'absolute';
                    star.style.fontSize = '20px';
                    star.style.zIndex = '99';
                    
                    // Position stars in a circle around the kiss
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 50;
                    const x = ((amineRect.right + douaeRect.left) / 2) + Math.cos(angle) * radius;
                    const y = ((amineRect.top + douaeRect.top) / 2) + Math.sin(angle) * radius;
                    
                    star.style.left = x + 'px';
                    star.style.top = y + 'px';
                    
                    document.body.appendChild(star);
                    
                    // Animate stars exploding outward
                    star.animate([
                        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                        { transform: 'scale(1) rotate(180deg)', opacity: 1 },
                        { transform: 'scale(1.5) rotate(360deg)', opacity: 0 }
                    ], {
                        duration: 1500,
                        easing: 'ease-out'
                    });
                    
                    // Remove stars after animation
                    setTimeout(() => {
                        star.remove();
                    }, 1500);
                }
                
                // 3. Animate main kiss with Super Mario style pop
                kiss.animate([
                    { transform: 'scale(0)', opacity: 0 },
                    { transform: 'scale(2)', opacity: 1 },
                    { transform: 'scale(1.5)', opacity: 1 },
                    { transform: 'scale(0)', opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)' // Bouncy effect
                });
                
                // 4. Create heart trail between characters
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.innerHTML = '❤️';
                        heart.style.position = 'absolute';
                        heart.style.fontSize = '24px';
                        heart.style.zIndex = '98';
                        
                        // Position hearts along path between characters with random variation
                        const progress = i / 9; // 0 to 1
                        const x = amineRect.right + (douaeRect.left - amineRect.right) * progress;
                        const y = amineRect.top + (douaeRect.top - amineRect.top) * progress - 
                                Math.sin(Math.PI * progress) * (30 + Math.random() * 20); // Arc path with randomness
                        
                        heart.style.left = x + 'px';
                        heart.style.top = y + 'px';
                        document.body.appendChild(heart);
                        
                        // Animate hearts floating up and fading
                        heart.animate([
                            { transform: 'translateY(0) scale(1)', opacity: 1 },
                            { transform: 'translateY(-40px) scale(0.5)', opacity: 0 }
                        ], {
                            duration: 2000,
                            easing: 'ease-out'
                        });
                        
                        // Remove hearts after animation
                        setTimeout(() => {
                            heart.remove();
                        }, 2000);
                    }, i * 200);
                }
                
                // 5. Add Mario-style power-up effect to characters
                const powerUpStyle = document.createElement('style');
                powerUpStyle.id = 'powerUpStyle';
                powerUpStyle.textContent = `
                    @keyframes powerUp {
                        0%, 100% { filter: brightness(1); }
                        25% { filter: brightness(1.5) hue-rotate(45deg); }
                        50% { filter: brightness(1.3) hue-rotate(90deg); }
                        75% { filter: brightness(1.5) hue-rotate(45deg); }
                    }
                    
                    .powered-up {
                        animation: powerUp 1s;
                    }
                `;
                document.head.appendChild(powerUpStyle);
                
                // Add power-up effect to characters
                amineChar.classList.add('powered-up');
                douaeChar.classList.add('powered-up');
                
                // Remove power-up class after animation
                setTimeout(() => {
                    amineChar.classList.remove('powered-up');
                    douaeChar.classList.remove('powered-up');
                }, 1000);
                
                // 6. Characters jump with joy after kiss
                setTimeout(() => {
                    // Create function for Super Mario style jump
                    function superJump(character) {
                        character.animate([
                            { transform: 'translateY(0) scale(1)' },
                            { transform: 'translateY(-80px) scale(1.1)' },
                            { transform: 'translateY(0) scale(1)' }
                        ], {
                            duration: 800,
                            easing: 'cubic-bezier(0.7, 0, 0.3, 1)' // Mario-like jump physics
                        });
                    }
                    
                    // Execute jumps
                    superJump(amineChar);
                    setTimeout(() => {
                        superJump(douaeChar);
                    }, 400);
                    
                    // Second round of jumps
                    setTimeout(() => {
                        superJump(amineChar);
                        superJump(douaeChar);
                        
                        // Create "level complete" effect
                        setTimeout(() => {
                            // Create level complete banner
                            const banner = document.createElement('div');
                            banner.textContent = 'MISSION COMPLETE!';
                            banner.style.position = 'fixed';
                            banner.style.top = '40%';
                            banner.style.left = '50%';
                            banner.style.transform = 'translate(-50%, -50%)';
                            banner.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            banner.style.color = 'gold';
                            banner.style.padding = '15px 30px';
                            banner.style.fontSize = '24px';
                            banner.style.fontFamily = "'Press Start 2P', monospace";
                            banner.style.borderRadius = '10px';
                            banner.style.zIndex = '200';
                            banner.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
                            document.body.appendChild(banner);
                            
                            // Animate banner
                            banner.animate([
                                { transform: 'translate(-50%, -300%)', opacity: 0 },
                                { transform: 'translate(-50%, -50%)', opacity: 1 }
                            ], {
                                duration: 1000,
                                easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)'
                            });
                            
                            // Remove banner after some time
                            setTimeout(() => {
                                banner.animate([
                                    { transform: 'translate(-50%, -50%)', opacity: 1 },
                                    { transform: 'translate(-50%, 300%)', opacity: 0 }
                                ], {
                                    duration: 1000,
                                    easing: 'cubic-bezier(0.7, 0.3, 0.8, 0.3)'
                                });
                                
                                setTimeout(() => {
                                    banner.remove();
                                }, 1000);
                            }, 3000);
                        }, 2000);
                    }, 1500);
                }, 2500);
                
                // Remove kiss after animation
                setTimeout(() => {
                    kiss.remove();
                }, 2000);
            }, 500);
        }, 1000);
    }
    
    // Helper function for character movement
    function moveCharacterTo(character, position) {
        // Make sure this function exists or is imported from main.js
        if (window.gameHelpers && window.gameHelpers.moveCharacterTo) {
            window.gameHelpers.moveCharacterTo(character, position);
        } else {
            // Fallback implementation
            const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            
            // Define positions relative to viewport width
            const positions = {
                'center-left': viewport * 0.3,
                'center-right': viewport * 0.7 - 100 // Adjust for character width
            };
            
            // Determine if this is Amine or Douae to set correct property
            if (character.id === 'amine') {
                character.style.left = positions[position] + 'px';
            } else {
                // For Douae, convert to right positioning
                character.style.right = (viewport - positions[position] - 100) + 'px';
            }
        }
    }
    
    // Expose the function to the global scope for use by other scripts
    window.kissAnimation = kissAnimation;
});