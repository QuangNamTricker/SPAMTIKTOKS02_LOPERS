document.addEventListener('DOMContentLoaded', function() {
    // Load system information
    Promise.all([
        fetch('../data/data.json').then(res => res.json()),
        fetch('../data/qly.json').then(res => res.json())
    ]).then(([data, qly]) => {
        // Calculate total members
        const members = new Set();
        Object.values(data).forEach(dayData => {
            dayData.forEach(item => members.add(item.name));
        });
        document.getElementById('totalMembers').textContent = members.size;
        
        // Calculate total transactions
        let totalTransactions = 0;
        Object.values(data).forEach(dayData => {
            totalTransactions += dayData.length;
        });
        document.getElementById('totalTransactions').textContent = totalTransactions;
        
        // Calculate data sizes (approximate)
        const dataStr = JSON.stringify(data);
        const qlyStr = JSON.stringify(qly);
        document.getElementById('membersDataSize').textContent = Math.round(dataStr.length / 1024) + ' KB';
        document.getElementById('salaryDataSize').textContent = Math.round(qlyStr.length / 1024) + ' KB';
    }).catch(error => {
        console.error('Error loading system info:', error);
    });
    
    // Backup button
    document.getElementById('backupBtn').addEventListener('click', function() {
        // In a real app, this would send a request to the server to create a backup
        alert('Bản sao lưu đã được tạo thành công!');
    });
    
    // Restore button
    document.getElementById('restoreBtn').addEventListener('click', function() {
        if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu? Thao tác này sẽ ghi đè lên dữ liệu hiện tại.')) {
            // In a real app, this would send a request to the server to restore from backup
            alert('Dữ liệu đã được khôi phục thành công!');
        }
    });
    
    // Save settings
    document.getElementById('generalSettings').addEventListener('submit', function(e) {
        e.preventDefault();
        const unitPrice = document.getElementById('unitPrice').value;
        const currency = document.getElementById('currency').value;
        
        // In a real app, this would save to a settings file or database
        alert(`Cài đặt đã được lưu:\nĐơn giá: ${unitPrice} ${currency}`);
    });
});