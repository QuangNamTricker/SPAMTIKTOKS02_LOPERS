  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
  // Hiệu ứng chuyển động 3D theo chuột
  document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    document.querySelector('.error-content').style.transform = 
      `translateY(0) rotateX(${yAxis}deg) rotateY(${-xAxis}deg)`;
  });
  
  // Hiệu ứng cho các khối 3D
  const cubes = document.querySelectorAll('.cube');
  cubes.forEach((cube, index) => {
    cube.style.animationDelay = `${index * 2}s`;
  });