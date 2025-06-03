
    // Hiệu ứng Particle Network
    const canvas = document.getElementById('particle-network');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    const maxDistance = 100;
    
    // Tạo particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    
    // Kết nối các particles
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(255, 0, 170, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cập nhật và vẽ particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Di chuyển particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Đảo hướng khi chạm biên
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Vẽ particles
        ctx.fillStyle = '#ff00aa';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      connect();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Xử lý form
    document.querySelector('.notify-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Cảm ơn bạn! Chúng tôi sẽ thông báo khi hệ thống hoạt động.');
      this.reset();
    });
    
    // Responsive
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });