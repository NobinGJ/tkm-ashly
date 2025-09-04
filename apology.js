// Apology messages in both languages
const apologyMessages = [
    "Sé que he cometido un error y lamento mucho haberte lastimado. Eres lo más importante para mí.",
    "Perdón por mi reaccion asi. Prometo ser mejor persona por ti.",
    "Lamento mucho el dolor que te he causado. No hay excusa para mi accion.",
];

// DOM Elements
const btnForgive = document.getElementById('btnForgive');
const btnLove = document.getElementById('btnLove');
const apologyText = document.getElementById('apologyText');

// Show random apology message
function showApology() {
  // Remove any existing 'show' class
  apologyText.classList.remove('show');
  
  // Force reflow to reset animation
  void apologyText.offsetWidth;
  
  // Get random message and update text
  const randomMessage = apologyMessages[Math.floor(Math.random() * apologyMessages.length)];
  apologyText.textContent = randomMessage;
  
  // Add show class to trigger animation
  setTimeout(() => {
    apologyText.classList.add('show');
  }, 10);
}

// Add click event for the forgive button
btnForgive.addEventListener('click', showApology);

// Add click event for the love button
btnLove.addEventListener('click', () => {
  // Redirect to main page
  window.location.href = 'index.html';
});

// Show initial message when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Show first message after a short delay
  setTimeout(showApology, 1000);
  
  // Change the title to show a sad face when tab is not active
  let originalTitle = document.title;
  let isTabActive = true;
  
  window.addEventListener('blur', () => {
    isTabActive = false;
    document.title = '😢 Por favor, vuelve...';
  });
  
  window.addEventListener('focus', () => {
    isTabActive = true;
    document.title = originalTitle;
  });
  
  // Add sad face to title when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    if (isTabActive) {
      document.title = '😢 No te vayas, por favor...';
    }
  });
  
  document.addEventListener('mousemove', () => {
    if (isTabActive) {
      document.title = originalTitle;
    }
  });
});

// Add floating sad face emojis when clicking the forgive button
btnForgive.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  for (let i = 0; i < 5; i++) {
    createSadFace(x, y);
  }
});

function createSadFace(x, y) {
  const sadFace = document.createElement('div');
  sadFace.textContent = '😢';
  sadFace.style.position = 'fixed';
  sadFace.style.left = `${x}px`;
  sadFace.style.top = `${y}px`;
  sadFace.style.fontSize = '24px';
  sadFace.style.pointerEvents = 'none';
  sadFace.style.zIndex = '1000';
  sadFace.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(sadFace);
  
  // Random animation
  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 3;
  const rotation = (Math.random() - 0.5) * 20;
  
  let posX = x;
  let posY = y;
  let opacity = 1;
  let scale = 1;
  
  const animate = () => {
    posX += Math.cos(angle) * velocity;
    posY += Math.sin(angle) * velocity - 1; // Slight upward movement
    opacity -= 0.01;
    scale += 0.01;
    
    sadFace.style.left = `${posX}px`;
    sadFace.style.top = `${posY}px`;
    sadFace.style.opacity = opacity;
    sadFace.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      sadFace.remove();
    }
  };
  
  requestAnimationFrame(animate);
}
