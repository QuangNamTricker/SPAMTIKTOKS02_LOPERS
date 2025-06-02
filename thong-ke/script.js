
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Xử lý tab kỹ thuật
  document.querySelectorAll('.tech-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Ẩn tất cả nội dung và xóa active
      document.querySelectorAll('.tech-content').forEach(content => {
        content.classList.remove('active');
      });
      document.querySelectorAll('.tech-tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Hiển thị nội dung được chọn
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      this.classList.add('active');
    });
  });
