
    // // Hiệu ứng Matrix Rain
    // const canvas = document.getElementById('matrixRain');
    // const ctx = canvas.getContext('2d');
    
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    
    // const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    // const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // const nums = '0123456789';
    // const alphabet = katakana + latin + nums;
    
    // const fontSize = 16;
    // const columns = canvas.width / fontSize;
    
    // const rainDrops = [];
    // for (let x = 0; x < columns; x++) {
    //   rainDrops[x] = 1;
    // }
    
    // const draw = () => {
    //   ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      
    //   ctx.fillStyle = '#00ff41';
    //   ctx.font = fontSize + 'px monospace';
      
    //   for (let i = 0; i < rainDrops.length; i++) {
    //     const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    //     ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
    //     if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
    //       rainDrops[i] = 0;
    //     }
    //     rainDrops[i]++;
    //   }
    // };
    // setInterval(draw, 30);
    

    const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = ' アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array.from({ length: columns }, () => ({
  y: Math.random() * canvas.height,
  speed: Math.random() * 3 + 1,
}));

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // fade layer
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;

  drops.forEach((drop, index) => {
    const text = alphabet[Math.floor(Math.random() * alphabet.length)];
    const x = index * fontSize;
    const y = drop.y * fontSize;

    // Tail
    const gradient = ctx.createLinearGradient(x, y - fontSize * 2, x, y);
    gradient.addColorStop(0, 'rgba(0,255,65,0)');
    gradient.addColorStop(1, '#00FF41');

    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);

    // Update Y position
    drop.y += drop.speed;
    if (y > canvas.height && Math.random() > 0.95) {
      drop.y = 0;
      drop.speed = Math.random() * 3 + 1;
    }
  });
}

setInterval(drawMatrix, 33); // 30 FPS cho mượt
const hackerLines = [
  '[+] Connecting to TikTok servers...',
  '[+] Bypassing firewall...',
  '[✓] Access granted!',
  'injecting payload -> ███████████████ 100%',
  'Decryption key: 3F-29-00-FF-AC...',
  '[✓] Logs wiped successfully.',
  'Uploading spam module...',
  '[!] SYSTEM OVERRIDE ENABLED.',
  // 'Copyright: ADMIN ✅',
  'SPAM MODE: ACTIVE ✅',
];

let currentLine = 0;
const hackerCodeEl = document.getElementById('hackerCode');

function typeLine() {
  if (currentLine >= hackerLines.length) {
    currentLine = 0;
    hackerCodeEl.textContent = '';
  }

  let line = hackerLines[currentLine];
  let index = 0;

  const typer = setInterval(() => {
    if (index < line.length) {
      hackerCodeEl.textContent += line[index];
      index++;
    } else {
      hackerCodeEl.textContent += '\n';
      clearInterval(typer);
      currentLine++;
      setTimeout(typeLine, 700);
    }
  }, 30);
}

typeLine();


const countdownTarget = new Date("2025-06-07T22:00:00");
  countdownTarget.setDate(countdownTarget.getDate() + 2);
  countdownTarget.setHours(countdownTarget.getHours() + 12);

  const countdownItems = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
  };

  function animateValue(element, newValue) {
    const currentValue = parseInt(element.textContent);
    if (currentValue !== newValue) {
      element.classList.add('counting');
      element.textContent = newValue.toString().padStart(2, '0');
      setTimeout(() => element.classList.remove('counting'), 300);
    }
  }

  function updateCountdown() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
      countdownItems.days.textContent = '00';
      countdownItems.hours.textContent = '00';
      countdownItems.minutes.textContent = '00';
      countdownItems.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateValue(countdownItems.days, days);
    animateValue(countdownItems.hours, hours);
    animateValue(countdownItems.minutes, minutes);
    animateValue(countdownItems.seconds, seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

