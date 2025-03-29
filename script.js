// Countdown Timer to 30th March 00:00
function startCountdown() {
    const targetDate = new Date("March 30, 2025 00:00:00").getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            document.getElementById("timer").textContent = "00:00:00";
            startCelebration();
            return;
        }

        // Calculate remaining time
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Display countdown with days
        document.getElementById("timer").textContent = 
            `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Start Countdown
startCountdown();

// Show Surprise and Confetti
function startCelebration() {
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("surprise").classList.remove("hidden");
    document.getElementById("music").play();
    startConfetti();
    startFloatingHearts();
}

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiParticles = [];
    const colors = ["#ff1493", "#ff69b4", "#ff007f", "#ff4500", "#ff0"];

    function ConfettiPiece() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 5 + 2;
        this.speedX = Math.random() * 4 - 2;
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            confettiParticles.push(new ConfettiPiece());
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(drawConfetti);
    }

    createConfetti();
    drawConfetti();
}

// Floating Hearts Animation Everywhere
function startFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";
        document.body.appendChild(heart);

        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// Image lists for Left & Right Portraits
const leftImages = ["images/left1.jpg", "images/left2.jpg", "images/left3.jpg", "images/left4.jpg", "images/left5.jpg"];
const rightImages = ["images/right1.jpg", "images/right2.jpg", "images/right3.jpg", "images/right4.jpg", "images/right5.jpg"];

let leftIndex = 0;
let rightIndex = 0;

// Preload all images to prevent loading delay
function preloadImages(imageArray) {
    imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages(leftImages);
preloadImages(rightImages);

// Function to smoothly change images
function changeImages() {
    const leftImg = document.getElementById("leftPortrait");
    const rightImg = document.getElementById("rightPortrait");

    // Remove active class for smooth fade-out
    leftImg.classList.remove("active");
    rightImg.classList.remove("active");

    // Wait before changing the image to avoid flickering
    setTimeout(() => {
        leftIndex = (leftIndex + 1) % leftImages.length;
        rightIndex = (rightIndex + 1) % rightImages.length;

        leftImg.src = leftImages[leftIndex];
        rightImg.src = rightImages[rightIndex];

        // Add active class back for fade-in effect
        leftImg.classList.add("active");
        rightImg.classList.add("active");
    }, 500);  // Shorter delay for quicker transition
}

// Change images every 5 seconds
setInterval(changeImages, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const loveLetterContainer = document.getElementById("loveLetterContainer");
    const openButton = document.getElementById("loveLetterBtn");
    const closeButton = document.getElementById("closeLetter");

    // Open Love Letter
    openButton.addEventListener("click", function () {
        loveLetterContainer.classList.add("active");
        loveLetterContainer.style.opacity = "1";
        openButton.style.zIndex = "1"; // Lower the button z-index
    });

    // Close Love Letter
    closeButton.addEventListener("click", function () {
        loveLetterContainer.style.opacity = "0";
        setTimeout(() => loveLetterContainer.classList.remove("active"), 300);
        openButton.style.zIndex = "1000"; // Restore button z-index
    });

    // Close when clicking outside the love letter box
    loveLetterContainer.addEventListener("click", function (event) {
        if (event.target === loveLetterContainer) {
            loveLetterContainer.style.opacity = "0";
            setTimeout(() => loveLetterContainer.classList.remove("active"), 300);
            openButton.style.zIndex = "1000"; // Restore button z-index
        }
    });
});


