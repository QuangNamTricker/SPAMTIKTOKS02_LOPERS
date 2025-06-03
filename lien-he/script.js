  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
  // Hiệu ứng parallax 3D
  document.addEventListener('mousemove', (e) => {
    const contactContainer = document.querySelector('.contact-container');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 250;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 250;
    contactContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Reset khi không di chuột
  document.querySelector('.contact-container').addEventListener('mouseleave', () => {
    document.querySelector('.contact-container').style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
  
  const token = "7315329822:AAEfzCe8NSQM6yvWH0zwzJxsvKYMvHxYhHU";
  const chatId = "5674777894";
  const proxyUrl = "https://bottelegramtqn.tuquangnamht2007.workers.dev/"; // 👉 Thay bằng URL proxy của bạn

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Soạn tin nhắn
    const text = `
📩 *Có tin nhắn mới từ Website !*

👤 *Họ tên:* ${name}
📧 *Email:* ${email}
📌 *Tiêu đề:* ${subject}
📝 *Nội dung:*
${message}
    `;

    // Gửi tới Telegram qua proxy
    fetch(`https://bottelegramtqn.tuquangnamht2007.workers.dev/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert("Tin nhắn đã được gửi tới Telegram thành công!");
        document.getElementById('contactForm').reset();
      } else {
        alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.");
        console.error(data);
      }
    })
    .catch(err => {
      alert("Không thể kết nối Telegram Bot.");
      console.error(err);
    });
  });

  // Hiệu ứng parallax 3D
  document.addEventListener('mousemove', (e) => {
    const contactContainer = document.querySelector('.contact-container');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 250;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 250;
    contactContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  document.querySelector('.contact-container').addEventListener('mouseleave', () => {
    document.querySelector('.contact-container').style.transform = 'rotateY(0deg) rotateX(0deg)';
  });