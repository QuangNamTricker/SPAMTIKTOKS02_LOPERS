// Main admin dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load data from JSON files
    Promise.all([
        fetch('../data/data.json').then(res => res.json()),
        fetch('../data/qly.json').then(res => res.json())
    ]).then(([data, qly]) => {
        // Process data
        const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '/');
        const formattedToday = today.split('/').reverse().join('-');
        
        // Today's stats
        const todayData = data[today] || [];
        const todayQly = qly.find(item => item.date === formattedToday) || {customers: 0, salary: 0};
        
        document.getElementById('today-customers').textContent = todayQly.customers;
        
        // Calculate today's salary
        const paidToday = todayData.filter(item => item.status === 'Đã thanh toán')
                                  .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const pendingToday = todayData.filter(item => item.status === 'Chờ xử lý')
                                    .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        
        document.getElementById('today-salary').textContent = paidToday.toLocaleString();
        document.getElementById('pending-salary').textContent = pendingToday.toLocaleString();
        
        // Top members
        const memberStats = {};
        Object.values(data).forEach(dayData => {
            dayData.forEach(item => {
                if (!memberStats[item.name]) {
                    memberStats[item.name] = { quantity: 0, salary: 0 };
                }
                memberStats[item.name].quantity += item.quantity;
                memberStats[item.name].salary += item.quantity * item.unitPrice;
            });
        });
        
        const topMembers = Object.entries(memberStats)
            .sort((a, b) => b[1].salary - a[1].salary)
            .slice(0, 5);
        
        const topMembersTable = document.getElementById('top-members');
        topMembers.forEach(([name, stats]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${stats.quantity}</td>
                <td>${stats.salary.toLocaleString()} VND</td>
            `;
            topMembersTable.appendChild(row);
        });
        
        // Recent transactions
        const recentTransactions = [];
        Object.entries(data).forEach(([date, dayData]) => {
            dayData.forEach(item => {
                recentTransactions.push({
                    date,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    total: item.quantity * item.unitPrice,
                    status: item.status
                });
            });
        });
        
        recentTransactions.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
        
        const transactionsTable = document.getElementById('recent-transactions');
        recentTransactions.slice(0, 10).forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.name}</td>
                <td>${transaction.quantity}</td>
                <td>${transaction.unitPrice.toLocaleString()} VND</td>
                <td>${transaction.total.toLocaleString()} VND</td>
                <td>
                    <span class="badge ${transaction.status === 'Đã thanh toán' ? 'bg-success' : 'bg-warning'}">
                        ${transaction.status}
                    </span>
                </td>
            `;
            transactionsTable.appendChild(row);
        });
        
        // Weekly chart
        const last7Days = qly.slice(-7).reverse();
        const ctx = document.getElementById('weekChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: last7Days.map(item => item.date),
                datasets: [
                    {
                        label: 'Khách',
                        data: last7Days.map(item => item.customers),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Thành viên'
                        }
                    },
                }
            }
        });
    }).catch(error => {
        console.error('Error loading data:', error);
    });
});