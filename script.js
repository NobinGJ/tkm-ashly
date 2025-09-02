// DOM Elements
const btn = document.getElementById('btn');
const musicToggle = document.getElementById('musicToggle');
const volumeToggle = document.getElementById('volumeToggle');
const bgMusic = document.getElementById('bgMusic');
const slideshow = document.getElementById('slideshow');
const images = slideshow.getElementsByTagName('img');
let isMusicPlaying = false;

// Romantic messages in both languages
const messages = [
"You are my star, Ashly 💫",
  "Siempre serás mi luz 💜",
  "Forever with you 💖",
  "Eres mi razón de sonreír 😊",
  "Mi amor por ti es infinito 💫",
  "You complete me 💝",
  "Eres mi sueño hecho realidad ✨",
  "My heart belongs to you 💗",
  "You are my everything, my forever love 💞",
  "Eres la melodía que alegra mi vida 🎶",
  "Without you, life has no meaning 💔",
  "Eres mi lugar seguro 🏡❤️",
  "Your smile lights up my world 🌟",
  "Mi corazón late solo por ti 💓",
  "Every moment with you is magical 🪄",
  "Eres mi destino y mi fortuna 💎",
  "You are the melody that makes my soul dance 🎶",
  "Eres mi todo, mi amor eterno 💞",
  "You are my safe haven 🏡❤️",
  "Te amo más que a las estrellas del cielo 🌌",
  "My heart beats only for you 💓",
  "Contigo todo es perfecto 💍",
  "You are my destiny and my blessing 💎",
  "Sin ti, nada tendría sentido 💔",
  "With you, everything feels perfect 💍",
  "Cada momento contigo es mágico 🪄",
  "Eres mi razón de sonreír 😊",
  "You complete me 💝",
  "Tu sonrisa ilumina mi mundo 🌟",
  "Eres mi sueño hecho realidad ✨",
  "Forever with you 💖",
  "Mi amor por ti es infinito 💫",
  "Eres mi estrella, mi luz en la oscuridad 💜",
  "You are my star, Ashly 💫"
];

// Helper functions
function rand(min, max) { 
  return Math.random() * (max - min) + min; 
}

// Heart creation
function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  const hue = rand(270, 300); // Purple-pink range
  h.style.setProperty('--color', `hsl(${hue}, 80%, 65%)`);
  h.style.setProperty('--size', rand(16, 28) + 'px');
  h.style.setProperty('--x', rand(0, 100) + 'vw');
  h.style.setProperty('--dur', rand(2.5, 4.5) + 's');
  h.style.setProperty('--swayX', rand(-30, 30) + 'px');
  document.body.appendChild(h);
  
  // Remove heart after animation
  setTimeout(() => h.remove(), 5000);
}

// Create magical particles
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = rand(0, 100) + 'vw';
  p.style.top = '100vh';
  p.style.width = p.style.height = rand(2, 6) + 'px';
  p.style.animationDuration = rand(5, 15) + 's';
  p.style.animationDelay = rand(0, 5) + 's';
  document.body.appendChild(p);
  
  // Remove particle after animation
  setTimeout(() => p.remove(), 15000);
}

// Show floating message
function showMessage() {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];
  msg.style.left = rand(20, 80) + 'vw';
  document.body.appendChild(msg);
  
  // Remove message after animation
  setTimeout(() => msg.remove(), 5000);
}

// Fill screen with hearts
function fillHearts() {
  const heartCount = 50;
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      spawnHeart();
      if (i % 5 === 0) showMessage();
    }, i * 100);
  }
}

// Background slideshow (Nueva lógica de imágenes aleatorias)
const imageSources = Array.from(images).map(img => img.src);
Array.from(images).forEach(img => img.remove()); // Eliminar imágenes estáticas originales

function spawnRandomImage() {
  const slideshowContainer = document.getElementById('slideshow');
  
  const img = document.createElement('img');
  img.className = 'random-image';
  
  const randomSrc = imageSources[Math.floor(Math.random() * imageSources.length)];
  img.src = randomSrc;
  
  const size = rand(150, 400);
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  
  // Posicionar la imagen en cualquier lugar, incluso parcialmente fuera de la pantalla
  const top = rand(-20, 80);
  const left = rand(-20, 80);
  img.style.top = `${top}vh`;
  img.style.left = `${left}vw`;
  
  slideshowContainer.appendChild(img);
  
  // Animación de entrada
  setTimeout(() => {
    img.style.opacity = 0.6;
    img.style.transform = `scale(1)`;
  }, 100);
  
  // Animación de salida y eliminación
  setTimeout(() => {
    img.style.opacity = 0;
    img.style.transform = `scale(0.9)`;
    setTimeout(() => img.remove(), 4000); // Eliminar después de la transición
  }, 5000); // Mostrar durante 5 segundos
}

// Event Listeners
btn.addEventListener('click', fillHearts);

musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    musicToggle.title = 'Reproducir música';
  } else {
    bgMusic.play().catch(e => console.log('Audio playback failed:', e));
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    musicToggle.title = 'Pausar música';
  }
  isMusicPlaying = !isMusicPlaying;
});

volumeToggle.addEventListener('click', () => {
  // Reducir volumen en 0.1 (10%). Si es 0, volver a 1.0 (100%).
  let currentVolume = bgMusic.volume;
  let newVolume = Math.round((currentVolume - 0.1) * 10) / 10;

  if (newVolume < 0) {
    newVolume = 1.0;
  }
  
  bgMusic.volume = newVolume;
  
  const volumeIcon = volumeToggle.querySelector('i');
  if (newVolume === 0) {
    volumeIcon.className = 'fas fa-volume-xmark';
  } else if (newVolume <= 0.5) {
    volumeIcon.className = 'fas fa-volume-low';
  } else {
    volumeIcon.className = 'fas fa-volume-high';
  }
  volumeToggle.title = `Volumen: ${Math.round(newVolume * 100)}%`;
});

// Initialize
bgMusic.volume = 0.2; // Establecer volumen inicial al 20%
spawnRandomImage(); // Generar una imagen inmediatamente
setInterval(spawnRandomImage, 2500); // Generar una nueva imagen cada 2.5 segundos

// Create initial particles
for (let i = 0; i < 20; i++) {
  setTimeout(createParticle, i * 500);
  setTimeout(createParticle, i * 500 + 250);
}

// Continuous particle effect
setInterval(() => {
  if (Math.random() > 0.7) createParticle();
}, 300);
