  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });

  // Hiệu ứng toggle category
  function toggleCategory(element) {
    const ruleList = element.nextElementSibling;
    ruleList.style.maxHeight = ruleList.style.maxHeight ? null : ruleList.scrollHeight + "px";
  }

  // Mở tất cả category khi trang load
  document.querySelectorAll('.rule-category h2').forEach(header => {
    toggleCategory(header);
  });
