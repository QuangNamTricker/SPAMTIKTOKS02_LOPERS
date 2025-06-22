document.addEventListener('DOMContentLoaded', function() {
    // Load salary data
    fetch('../data/data.json')
        .then(res => res.json())
        .then(data => {
            let totalSalary = 0;
            let paidSalary = 0;
            let pendingSalary = 0;
            
            const salaryDetails = [];
            
            // Process all data to get salary statistics
            Object.entries(data).forEach(([date, dayData]) => {
                dayData.forEach(item => {
                    const total = item.quantity * item.unitPrice;
                    totalSalary += total;
                    
                    if (item.status === 'Đã thanh toán') {
                        paidSalary += total;
                    } else {
                        pendingSalary += total;
                    }
                    
                    salaryDetails.push({
                        date,
                        name: item.name,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total,
                        status: item.status
                    });
                });
            });
            
            // Update summary
            document.getElementById('totalSalary').textContent = totalSalary.toLocaleString() + ' VND';
            document.getElementById('paidSalary').textContent = paidSalary.toLocaleString() + ' VND';
            
            // Populate salary details table
            const salaryTable = document.getElementById('salaryDetails');
            salaryDetails.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')))
                        .forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice.toLocaleString()} VND</td>
                    <td>${item.total.toLocaleString()} VND</td>
                    <td>
                        <span class="badge ${item.status === 'Đã thanh toán' ? 'bg-success' : 'bg-warning'}">
                            ${item.status}
                        </span>
                    </td>
                    <td>
                        ${item.status === 'Chờ xử lý' ? 
                            '<button class="btn btn-sm btn-success">Thanh toán</button>' : 
                            '<button class="btn btn-sm btn-secondary" disabled>Đã thanh toán</button>'}
                    </td>
                `;
                salaryTable.appendChild(row);
            });
            
            // Add event listeners for payment buttons
            document.querySelectorAll('.btn-success').forEach(button => {
                button.addEventListener('click', function() {
                    const row = this.closest('tr');
                    const name = row.cells[1].textContent;
                    const date = row.cells[0].textContent;
                    
                    // In a real app, this would update the status in the database
                    alert(`Đã thanh toán lương cho ${name} vào ngày ${date}`);
                    row.cells[5].innerHTML = '<span class="badge bg-success">Đã thanh toán</span>';
                    row.cells[6].innerHTML = '<button class="btn btn-sm btn-secondary" disabled>Đã thanh toán</button>';
                    
                    // Update the paid salary total
                    const amount = parseInt(row.cells[4].textContent.replace(/\D/g, ''));
                    paidSalary += amount;
                    document.getElementById('paidSalary').textContent = paidSalary.toLocaleString() + ' VND';
                });
            });
        })
        .catch(error => {
            console.error('Error loading salary data:', error);
        });
});