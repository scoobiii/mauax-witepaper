let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let autoplayInterval;
let isPlaying = true;

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const emojis = ['💎', '⚡', '🚀', '💰', '🌟', '🔥', '💡', '🎯', '🔗', '🌱', '☀️', '♻️'];
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 5 + 5) + 's';
        emoji.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(emoji);
    }
}

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index < currentSlide) {
            slide.classList.add('prev');
        }
    });
    
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

function startAutoplay() {
    stopAutoplay(); // Ensure no multiple intervals are running
    autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    const btn = document.getElementById('playBtn');
    if (isPlaying) {
        stopAutoplay();
        btn.textContent = '▶️';
        isPlaying = false;
    } else {
        startAutoplay();
        btn.textContent = '⏸️';
        isPlaying = true;
    }
}

function scrollToContact() {
    const contactSlideIndex = Array.from(slides).findIndex(slide => slide.id === 'contact-slide');
    if (contactSlideIndex !== -1) {
        currentSlide = contactSlideIndex;
        updateSlide();
    }
}

// Touch/swipe support
let startY = 0;
document.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; });
document.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    const diffY = startY - endY;
    if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
    }
});

// Initialize
createFloatingElements();
startAutoplay();
updateSlide();