document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const amine = document.getElementById('amine');
    const douae = document.getElementById('douae');
    const amineImg = amine.querySelector('img');
    const douaeImg = douae.querySelector('img');
    const container = document.querySelector('.container');
    
    // Game configuration
    const GAME_CONFIG = {
        groundHeight: 50,
        gravity: 0.5,
        jumpStrength: 10,
        gameSpeed: 5,
        obstacleSpawnInterval: 1500,
        containerWidth: window.innerWidth,
        containerHeight: window.innerHeight
    };

    // Game state
    let gameState = {
        isGameRunning: false,
        score: 0,
        obstacleSpeed: GAME_CONFIG.gameSpeed,
        highScore: localStorage.getItem('jumpGameHighScore') || 0
    };

    // Create game container
    function createGameContainer() {
        const gameContainer = document.createElement('div');
        gameContainer.id = 'game-container';
        gameContainer.style.position = 'fixed';
        gameContainer.style.top = '0';
        gameContainer.style.left = '0';
        gameContainer.style.width = '100%';
        gameContainer.style.height = '100%';
        gameContainer.style.backgroundColor = 'rgba(135, 206, 235, 0.2)';
        gameContainer.style.overflow = 'hidden';
        gameContainer.style.zIndex = '1000';
        
        // Ground
        const ground = document.createElement('div');
        ground.id = 'game-ground';
        ground.style.position = 'absolute';
        ground.style.bottom = '0';
        ground.style.width = '100%';
        ground.style.height = `${GAME_CONFIG.groundHeight}px`;
        ground.style.backgroundColor = '#8B4513';
        
        gameContainer.appendChild(ground);
        
        // Score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'score-display';
        scoreDisplay.style.position = 'absolute';
        scoreDisplay.style.top = '20px';
        scoreDisplay.style.left = '20px';
        scoreDisplay.style.color = 'white';
        scoreDisplay.style.fontSize = '24px';
        scoreDisplay.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        
        gameContainer.appendChild(scoreDisplay);
        
        document.body.appendChild(gameContainer);
        
        return gameContainer;
    }

    // Position characters for the game
    function positionCharactersForGame(gameContainer) {
        // Reset character styles
        amine.style.position = 'absolute';
        douae.style.position = 'absolute';
        
        // Position characters on the ground
        const groundHeight = GAME_CONFIG.groundHeight;
        const characterWidth = 100; // Adjust based on your character images
        
        amine.style.bottom = `${groundHeight}px`;
        amine.style.left = '20%';
        
        douae.style.bottom = `${groundHeight}px`;
        douae.style.right = '20%';
        
        // Add to game container
        gameContainer.appendChild(amine);
        gameContainer.appendChild(douae);
    }

    // Jump mechanics
    function initializeJumpMechanics() {
        let isJumping = false;
        let verticalVelocity = 0;
        
        function jump(character) {
            if (!isJumping) {
                isJumping = true;
                verticalVelocity = GAME_CONFIG.jumpStrength;
                
                // Apply jumping animation
                character.classList.add('jumping');
            }
        }
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                // Alternate jumping between characters
                if (!gameState.isGameRunning) {
                    startGame();
                } else {
                    jump(gameState.score % 2 === 0 ? amine : douae);
                }
            }
        });
        
        // Touch/click controls
        container.addEventListener('click', function() {
            if (!gameState.isGameRunning) {
                startGame();
            } else {
                jump(gameState.score % 2 === 0 ? amine : douae);
            }
        });
        
        // Gravity and jumping update
        function updateCharacterPosition() {
            if (!gameState.isGameRunning) return;
            
            const characters = [amine, douae];
            
            characters.forEach(character => {
                const currentBottom = parseInt(character.style.bottom);
                
                // Apply gravity
                verticalVelocity -= GAME_CONFIG.gravity;
                const newBottom = Math.max(currentBottom + verticalVelocity, GAME_CONFIG.groundHeight);
                
                character.style.bottom = `${newBottom}px`;
                
                // Landing detection
                if (newBottom <= GAME_CONFIG.groundHeight) {
                    isJumping = false;
                    verticalVelocity = 0;
                    character.classList.remove('jumping');
                }
            });
            
            requestAnimationFrame(updateCharacterPosition);
        }
        
        updateCharacterPosition();
    }

    // Obstacle creation
    function createObstacle(gameContainer) {
        if (!gameState.isGameRunning) return;
        
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.position = 'absolute';
        obstacle.style.bottom = `${GAME_CONFIG.groundHeight}px`;
        obstacle.style.right = '-50px';
        obstacle.style.width = '30px';
        obstacle.style.height = '50px';
        obstacle.style.backgroundColor = '#FF6347'; // Tomato red
        
        // Randomly choose obstacle type
        const obstacleTypes = ['🌵', '🪨', '🍄'];
        obstacle.innerHTML = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        obstacle.style.fontSize = '30px';
        obstacle.style.display = 'flex';
        obstacle.style.justifyContent = 'center';
        obstacle.style.alignItems = 'center';
        
        gameContainer.appendChild(obstacle);
        
        // Move obstacle
        function moveObstacle() {
            if (!gameState.isGameRunning) return;
            
            const currentRight = parseInt(obstacle.style.right);
            const newRight = currentRight + gameState.obstacleSpeed;
            obstacle.style.right = `${newRight}px`;
            
            // Check for collision
            const obstacleRect = obstacle.getBoundingClientRect();
            const amineRect = amine.getBoundingClientRect();
            const douaeRect = douae.getBoundingClientRect();
            
            const checkCollision = (characterRect) => {
                return !(
                    obstacleRect.right < characterRect.left || 
                    obstacleRect.left > characterRect.right ||
                    obstacleRect.bottom < characterRect.top || 
                    obstacleRect.top > characterRect.bottom
                );
            };
            
            // Increment score if passed
            if (obstacleRect.right < 0) {
                gameState.score++;
                document.getElementById('score-display').textContent = `Score: ${gameState.score}`;
                
                // Increase difficulty
                if (gameState.score % 5 === 0) {
                    gameState.obstacleSpeed += 0.5;
                }
                
                obstacle.remove();
                return;
            }
            
            // Game over on collision
            if (checkCollision(amineRect) || checkCollision(douaeRect)) {
                endGame();
                return;
            }
            
            // Continue moving if game is running
            if (gameState.isGameRunning) {
                requestAnimationFrame(moveObstacle);
            }
        }
        
        moveObstacle();
    }

    // Start game
    function startGame() {
        if (gameState.isGameRunning) return;
        
        // Reset game state
        gameState.isGameRunning = true;
        gameState.score = 0;
        gameState.obstacleSpeed = GAME_CONFIG.gameSpeed;
        
        // Create game container
        const gameContainer = createGameContainer();
        
        // Position characters
        positionCharactersForGame(gameContainer);
        
        // Update score display
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = `Score: ${gameState.score}`;
        
        // Start obstacle spawning
        const obstacleInterval = setInterval(() => {
            if (gameState.isGameRunning) {
                createObstacle(gameContainer);
            } else {
                clearInterval(obstacleInterval);
            }
        }, GAME_CONFIG.obstacleSpawnInterval);
    }

    // End game
    function endGame() {
        gameState.isGameRunning = false;
        
        // Update high score
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem('jumpGameHighScore', gameState.highScore);
        }
        
        // Create game over screen
        const gameOverlay = document.createElement('div');
        gameOverlay.style.position = 'fixed';
        gameOverlay.style.top = '0';
        gameOverlay.style.left = '0';
        gameOverlay.style.width = '100%';
        gameOverlay.style.height = '100%';
        gameOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        gameOverlay.style.display = 'flex';
        gameOverlay.style.flexDirection = 'column';
        gameOverlay.style.justifyContent = 'center';
        gameOverlay.style.alignItems = 'center';
        gameOverlay.style.zIndex = '2000';
        
        gameOverlay.innerHTML = `
            <h2 style="color: white; font-size: 36px;">Game Over!</h2>
            <p style="color: white; font-size: 24px;">Score: ${gameState.score}</p>
            <p style="color: white; font-size: 24px;">High Score: ${gameState.highScore}</p>
            <button id="restart-btn" style="
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 20px;
                cursor: pointer;
                border-radius: 10px;
            ">Restart</button>
        `;
        
        // Restart button
        gameOverlay.querySelector('#restart-btn').addEventListener('click', () => {
            // Remove game container and overlay
            document.getElementById('game-container')?.remove();
            gameOverlay.remove();
            
            // Restore original positions
            document.body.appendChild(amine);
            document.body.appendChild(douae);
            
            // Reset character positions
            amine.style.position = '';
            douae.style.position = '';
            
            // Restart game
            startGame();
        });
        
        document.body.appendChild(gameOverlay);
        
        // Remove game container
        document.getElementById('game-container')?.remove();
    }

    // Initialize game mechanics
    initializeJumpMechanics();
});