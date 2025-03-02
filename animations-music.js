// animations-music.js - Music and lyrics synchronization

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const lyricsToggle = document.getElementById('lyricsToggle');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const lyricsWrapper = document.getElementById('lyricsWrapper');
    const currentLyric = document.getElementById('currentLyric');
    
    // Audio visualization elements
    let audioContext;
    let analyser;
    let dataArray;
    
    // Create visualization canvas
    const visualizer = document.createElement('canvas');
    visualizer.width = window.innerWidth;
    visualizer.height = 70;
    visualizer.style.position = 'fixed';
    visualizer.style.bottom = '0';
    visualizer.style.left = '0';
    visualizer.style.width = '100%';
    visualizer.style.height = '70px';
    visualizer.style.zIndex = '5';
    visualizer.style.opacity = '0.5';
    visualizer.style.pointerEvents = 'none';
    document.body.appendChild(visualizer);
    
    const canvasCtx = visualizer.getContext('2d');
    
    // Set up empty array for beat detection
    let beatHistory = [];
    let lastBeatTime = 0;
    
    // Lyrics data with timestamps in ms
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
    
    // Initialize audio context and analyzer
    function initAudio() {
        // Create audio context and connect to music source
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaElementSource(backgroundMusic);
            analyser = audioContext.createAnalyser();
            
            // Connect the source to the analyzer and then to the destination
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            // Set up analyzer
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            // Start visualization
            visualize();
        } catch (e) {
            console.error('Web Audio API error:', e);
        }
    }
    
    // Audio visualization function
    function visualize() {
        canvasCtx.clearRect(0, 0, visualizer.width, visualizer.height);
        
        if (!backgroundMusic.paused) {
            requestAnimationFrame(visualize);
            
            // Get frequency data
            analyser.getByteFrequencyData(dataArray);
            
            // Calculate average energy of low frequencies (bass)
            const lowFreqAvg = getAverageEnergy(dataArray, 0, 10);
            
            // Update beat history
            beatHistory.push(lowFreqAvg);
            if (beatHistory.length > 20) {
                beatHistory.shift();
            }
            
            // Calculate local average 
            const localAvg = beatHistory.reduce((sum, value) => sum + value, 0) / beatHistory.length;
            
            // Check for beats (significant increases in energy)
            const now = Date.now();
            if (lowFreqAvg > localAvg * 1.3 && now - lastBeatTime > 250) {
                lastBeatTime = now;
                onBeat();
            }
            
            // Draw visualization
            drawVisualization(dataArray);
        } else {
            // Draw flat line when paused
            canvasCtx.fillStyle = 'rgba(135, 206, 235, 0.2)';
            canvasCtx.fillRect(0, visualizer.height / 2 - 1, visualizer.width, 2);
            requestAnimationFrame(visualize);
        }
    }
    
    // Calculate average energy for a frequency range
    function getAverageEnergy(dataArray, startBin, endBin) {
        let sum = 0;
        for (let i = startBin; i <= endBin; i++) {
            sum += dataArray[i];
        }
        return sum / (endBin - startBin + 1);
    }
    
    // Draw audio visualization
    function drawVisualization(dataArray) {
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, visualizer.height);
        gradient.addColorStop(0, 'rgba(255, 160, 200, 0.8)');
        gradient.addColorStop(0.5, 'rgba(135, 206, 235, 0.5)');
        gradient.addColorStop(1, 'rgba(135, 206, 235, 0.2)');
        
        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        canvasCtx.fillRect(0, 0, visualizer.width, visualizer.height);
        
        const barWidth = (visualizer.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] / 2;
            
            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
            
            // Mirror effect at the top for more aesthetic look
            canvasCtx.fillRect(x, 0, barWidth, barHeight * 0.3);
            
            x += barWidth + 1;
        }
    }
    
    // Actions to take on detected beats
    function onBeat() {
        // Pulse the heart
        const heart = document.querySelector('.heart');
        if (heart) {
            heart.classList.add('pink');
            setTimeout(() => heart.classList.remove('pink'), 200);
        }
        
        // Create random hearts
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.7;
                createHeartTrail(x, y);
            }, i * 100);
        }
        
        // Pulse title
        const title = document.querySelector('h1');
        if (title) {
            title.style.transform = 'scale(1.03)';
            setTimeout(() => {
                title.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Create heart trail for beat visualization
    function createHeartTrail(x, y) {
        const heartTrail = document.createElement('div');
        heartTrail.className = 'heart-trail';
        heartTrail.innerHTML = '❤️';
        heartTrail.style.left = `${x}px`;
        heartTrail.style.top = `${y}px`;
        heartTrail.style.fontSize = `${Math.random() * 20 + 15}px`;
        document.body.appendChild(heartTrail);
        
        // Remove after animation complete
        setTimeout(() => {
            heartTrail.remove();
        }, 2000);
    }
    
    // Update lyrics based on current playback time
    function updateLyrics() {
        if (backgroundMusic.paused) return;
        
        const currentTime = backgroundMusic.currentTime * 1000;
        
        // Find the current lyric based on time
        let currentIndex = 0;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                currentIndex = i;
                break;
            }
        }
        
        // Find the next lyric
        const nextIndex = currentIndex < lyrics.length - 1 ? currentIndex + 1 : currentIndex;
        
        // Calculate progress through current lyric (for smooth transitions)
        let progress = 0;
        if (nextIndex > currentIndex) {
            const lyricDuration = lyrics[nextIndex].time - lyrics[currentIndex].time;
            progress = (currentTime - lyrics[currentIndex].time) / lyricDuration;
        }
        
        // Update current lyric text with animation
        if (currentLyric.textContent !== lyrics[currentIndex].text) {
            // Fade out current text
            currentLyric.style.opacity = '0';
            currentLyric.style.transform = 'translateY(10px)';
            
            // After fade out, update text and fade in
            setTimeout(() => {
                currentLyric.textContent = lyrics[currentIndex].text;
                currentLyric.style.opacity = '1';
                currentLyric.style.transform = 'translateY(0)';
                
                // Pulse heart on lyric change
                const heart = document.querySelector('.heart');
                if (heart) {
                    heart.classList.add('pink');
                    setTimeout(() => heart.classList.remove('pink'), 500);
                }
            }, 300);
        }
        
        // Populate lyrics wrapper with all lyrics (first time only)
        if (lyricsWrapper.children.length <= 1) {
            populateLyricsWrapper();
        } else {
            // Update active lyric in the wrapper
            const lyricElements = lyricsWrapper.querySelectorAll('.lyrics-line');
            
            lyricElements.forEach((el, i) => {
                el.classList.remove('active', 'pre-active');
                
                if (i === currentIndex) {
                    el.classList.add('active');
                } else if (i === currentIndex + 1) {
                    el.classList.add('pre-active');
                }
            });
            
            // Auto-scroll to keep active lyric visible
            const activeElement = lyricsWrapper.querySelector('.lyrics-line.active');
            if (activeElement) {
                const containerRect = lyricsWrapper.getBoundingClientRect();
                const activeRect = activeElement.getBoundingClientRect();
                
                // Calculate if active element is visible
                if (activeRect.bottom > containerRect.bottom || activeRect.top < containerRect.top) {
                    activeElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }
    
    // Populate lyrics wrapper with all lyrics for scrolling view
    function populateLyricsWrapper() {
        lyricsWrapper.innerHTML = '';
        
        lyrics.forEach((lyric, index) => {
            const line = document.createElement('div');
            line.className = 'lyrics-line';
            line.textContent = lyric.text;
            
            // Check if this is the current lyric
            const currentTime = backgroundMusic.currentTime * 1000;
            if (currentTime >= lyric.time && 
                (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)) {
                line.classList.add('active');
            }
            
            lyricsWrapper.appendChild(line);
        });
    }
    
    // Create visual time markers for key moments in the song
    function createTimeMarkers() {
        const markers = [
            { time: 30000, event: 'Amine appears' },
            { time: 60000, event: 'Gives flower' },
            { time: 90000, event: 'Dancing together' },
            { time: 120000, event: 'Special moment' },
            { time: 150000, event: 'Final scene' }
        ];
        
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-container';
        timelineContainer.style.position = 'fixed';
        timelineContainer.style.top = '50px';
        timelineContainer.style.right = '20px';
        timelineContainer.style.width = '10px';
        timelineContainer.style.height = '200px';
        timelineContainer.style.background = 'rgba(0, 0, 0, 0.3)';
        timelineContainer.style.borderRadius = '5px';
        timelineContainer.style.zIndex = '100';
        
        document.body.appendChild(timelineContainer);
        
        // Create progress indicator
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'progress-indicator';
        progressIndicator.style.position = 'absolute';
        progressIndicator.style.left = '0';
        progressIndicator.style.width = '100%';
        progressIndicator.style.height = '0%';
        progressIndicator.style.background = 'rgba(135, 206, 235, 0.8)';
        progressIndicator.style.borderRadius = '5px';
        progressIndicator.style.bottom = '0';
        progressIndicator.style.transition = 'height 0.3s linear';
        
        timelineContainer.appendChild(progressIndicator);
        
        // Add markers
        markers.forEach(marker => {
            const percent = (marker.time / (211000)) * 100; // Song duration
            
            const markerElement = document.createElement('div');
            markerElement.className = 'timeline-marker';
            markerElement.style.position = 'absolute';
            markerElement.style.width = '20px';
            markerElement.style.height = '4px';
            markerElement.style.background = '#fff';
            markerElement.style.left = '-5px';
            markerElement.style.bottom = `${percent}%`;
            markerElement.style.borderRadius = '2px';
            markerElement.title = marker.event;
            
            // Label for marker
            const label = document.createElement('div');
            label.className = 'marker-label';
            label.textContent = marker.event;
            label.style.position = 'absolute';
            label.style.right = '15px';
            label.style.transform = 'translateY(-50%)';
            label.style.color = '#fff';
            label.style.fontSize = '10px';
            label.style.opacity = '0';
            label.style.transition = 'opacity 0.3s ease';
            label.style.whiteSpace = 'nowrap';
            
            markerElement.appendChild(label);
            timelineContainer.appendChild(markerElement);
            
            // Show label on hover
            markerElement.addEventListener('mouseenter', () => {
                label.style.opacity = '1';
            });
            
            markerElement.addEventListener('mouseleave', () => {
                label.style.opacity = '0';
            });
        });
        
        // Update progress indicator
        function updateProgress() {
            if (!backgroundMusic.paused) {
                const progress = (backgroundMusic.currentTime / 211) * 100; // Song duration in seconds
                progressIndicator.style.height = `${progress}%`;
            }
            requestAnimationFrame(updateProgress);
        }
        
        updateProgress();
    }
    
    // Music toggle control
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    // Only initialize audio context after user interaction
                    if (!audioContext) {
                        initAudio();
                    } else if (audioContext.state === 'suspended') {
                        audioContext.resume();
                    }
                    musicToggle.textContent = '🎵 Music On';
                })
                .catch(err => {
                    console.error('Error playing audio:', err);
                });
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
            
            // Populate lyrics if not already done
            if (lyricsWrapper.children.length <= 1) {
                populateLyricsWrapper();
            }
        } else {
            lyricsContainer.style.display = 'none';
            lyricsToggle.textContent = '🎵 Show Lyrics';
        }
    });
    
    // Create animated waveform around the heart on beats
    function createHeartWaveform() {
        const heart = document.querySelector('.heart');
        if (!heart) return;
        
        const waveContainer = document.createElement('div');
        waveContainer.style.position = 'absolute';
        waveContainer.style.width = '100%';
        waveContainer.style.height = '100%';
        waveContainer.style.top = '0';
        waveContainer.style.left = '0';
        waveContainer.style.pointerEvents = 'none';
        waveContainer.style.zIndex = '-1';
        
        heart.appendChild(waveContainer);
        
        function createWave() {
            const wave = document.createElement('div');
            wave.style.position = 'absolute';
            wave.style.width = '100%';
            wave.style.height = '100%';
            wave.style.borderRadius = '50%';
            wave.style.border = '2px solid rgba(135, 206, 235, 0.8)';
            wave.style.opacity = '0.8';
            wave.style.transform = 'scale(1)';
            wave.style.top = '0';
            wave.style.left = '0';
            
            waveContainer.appendChild(wave);
            
            // Animate wave
            let scale = 1;
            let opacity = 0.8;
            
            function animate() {
                scale += 0.03;
                opacity -= 0.015;
                
                wave.style.transform = `scale(${scale})`;
                wave.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    wave.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Create waves on beat
        document.addEventListener('musicBeat', () => {
            createWave();
        });
        
        // Also create occasional waves
        setInterval(() => {
            if (!backgroundMusic.paused && Math.random() > 0.7) {
                createWave();
            }
        }, 1000);
    }
    
    // Initialize music-related features
    function init() {
        // Update lyrics every 100ms for smoother tracking
        setInterval(updateLyrics, 100);
        
        // Check if song ended and loop
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        });
        
        // Create timeline markers
        createTimeMarkers();
        
        // Create heart waveform
        createHeartWaveform();
        
        // Auto-play music after a short delay (many browsers require user interaction)
        setTimeout(() => {
            backgroundMusic.play()
                .then(() => {
                    initAudio();
                })
                .catch(err => {
                    console.log('Auto-play prevented. Click music toggle to play.', err);
                });
        }, 1000);
    }
    
    // Start everything
    init();
});
