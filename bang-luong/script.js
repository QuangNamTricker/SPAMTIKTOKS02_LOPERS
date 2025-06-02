
  const tbody = document.querySelector('.salary-table tbody');
  const summary = document.querySelector('.summary');
  const dateSelect = document.getElementById('date-select');
  let salaryData = {};

  function renderSalaryTable(data) {
    tbody.innerHTML = '';
    let total = 0, totalQty = 0, paid = 0, pending = 0;

    data.forEach((item, index) => {
      const amount = item.quantity * item.unitPrice;
      total += amount;
      totalQty += item.quantity;
      if (item.status === "Đã thanh toán") paid += amount;
      if (item.status === "Chờ xử lý") pending += amount;

      const color = item.status === "Đã thanh toán" ? '#00ffcc' : item.status === "Chờ xử lý" ? '#ffff00' : '#ff0000';
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.unitPrice.toLocaleString()}đ</td>
          <td class="highlight">${amount.toLocaleString()}đ</td>
          <td><span style="color: ${color};">${item.status}</span></td>
        </tr>`;
    });

    summary.innerHTML = `
      <div class="summary-item">Tổng số lượng: <span>${totalQty}</span></div>
      <div class="summary-item">Tổng thành tiền: <span>${total.toLocaleString()}đ</span></div>
      <div class="summary-item">Đã thanh toán: <span>${paid.toLocaleString()}đ</span></div>
      <div class="summary-item">Chờ xử lý: <span>${pending.toLocaleString()}đ</span></div>`;
  }

  async function fetchSalaryData() {
    try {
      const res = await fetch('../data/data.json');
      salaryData = await res.json();
      const defaultDate = dateSelect.value;
      renderSalaryTable(salaryData[defaultDate] || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      tbody.innerHTML = '<tr><td colspan="6">Không thể tải dữ liệu</td></tr>';
    }
  }

  dateSelect.addEventListener('change', () => {
    const selected = dateSelect.value;
    renderSalaryTable(salaryData[selected] || []);
  });

  fetchSalaryData();

  // Mobile nav toggle
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('active');
  });
