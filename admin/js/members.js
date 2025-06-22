document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let allMembers = [];
    let currentPage = 1;
    const membersPerPage = 10;
    let filteredMembers = [];
    
    // DOM elements
    const membersTable = document.getElementById('membersTable');
    const pagination = document.getElementById('pagination');
    const searchInput = document.getElementById('memberSearch');
    const searchButton = document.getElementById('searchButton');
    
    // Initialize the members management system
    initMembers();
    
    // Event listeners
    searchButton.addEventListener('click', filterMembers);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterMembers();
        }
    });
    document.getElementById('saveMemberBtn').addEventListener('click', addNewMember);
    document.getElementById('updateMemberBtn').addEventListener('click', updateMember);
    
    // Initialize members data
    function initMembers() {
        fetch('../data/data.json')
            .then(response => response.json())
            .then(data => {
                processMemberData(data);
                displayMembers();
                setupPagination();
            })
            .catch(error => {
                console.error('Error loading member data:', error);
                alert('Không thể tải dữ liệu thành viên. Vui lòng thử lại sau.');
            });
    }
    
    // Process the raw data from JSON
    function processMemberData(data) {
        const memberMap = new Map();
        
        // Process each day's data
        Object.entries(data).forEach(([date, entries]) => {
            entries.forEach(entry => {
                if (!memberMap.has(entry.name)) {
                    memberMap.set(entry.name, {
                        name: entry.name,
                        totalQuantity: 0,
                        totalSalary: 0,
                        lastActivity: date,
                        status: entry.status,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.name)}&background=random`
                    });
                }
                
                const member = memberMap.get(entry.name);
                member.totalQuantity += entry.quantity;
                member.totalSalary += entry.quantity * entry.unitPrice;
                
                // Update last activity date if this entry is newer
                const currentDate = new Date(date.split('/').reverse().join('-'));
                const lastDate = new Date(member.lastActivity.split('/').reverse().join('-'));
                if (currentDate > lastDate) {
                    member.lastActivity = date;
                    member.status = entry.status;
                }
            });
        });
        
        // Convert to array and sort by name
        allMembers = Array.from(memberMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        filteredMembers = [...allMembers];
    }
    
    // Display members for the current page
    function displayMembers() {
        membersTable.innerHTML = '';
        
        const startIndex = (currentPage - 1) * membersPerPage;
        const endIndex = startIndex + membersPerPage;
        const membersToShow = filteredMembers.slice(startIndex, endIndex);
        
        if (membersToShow.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="7" class="text-center py-4">Không tìm thấy thành viên nào</td>`;
            membersTable.appendChild(row);
            return;
        }
        
        membersToShow.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${member.avatar}" alt="${member.name}" class="member-avatar"></td>
                <td>${member.name}</td>
                <td>${member.totalQuantity}</td>
                <td>${member.totalSalary.toLocaleString()} VND</td>
                <td>${member.lastActivity}</td>
                <td>
                    <span class="badge ${member.status === 'Đã thanh toán' ? 'bg-success' : 'bg-warning'}">
                        ${member.status}
                    </span>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary me-1 edit-member" data-name="${member.name}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-member" data-name="${member.name}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            membersTable.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-member').forEach(button => {
            button.addEventListener('click', function() {
                const memberName = this.getAttribute('data-name');
                editMember(memberName);
            });
        });
        
        document.querySelectorAll('.delete-member').forEach(button => {
            button.addEventListener('click', function() {
                const memberName = this.getAttribute('data-name');
                deleteMember(memberName);
            });
        });
    }
    
    // Set up pagination
    function setupPagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(filteredMembers.length / membersPerPage);
        
        if (pageCount <= 1) return;
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayMembers();
                setupPagination();
            }
        });
        pagination.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= pageCount; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageLi.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayMembers();
                setupPagination();
            });
            pagination.appendChild(pageLi);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === pageCount ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < pageCount) {
                currentPage++;
                displayMembers();
                setupPagination();
            }
        });
        pagination.appendChild(nextLi);
    }
    
    // Filter members based on search input
    function filterMembers() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            filteredMembers = [...allMembers];
        } else {
            filteredMembers = allMembers.filter(member => 
                member.name.toLowerCase().includes(searchTerm)
            );
        }
        
        currentPage = 1;
        displayMembers();
        setupPagination();
    }
    
    // Add a new member
    function addNewMember() {
        const name = document.getElementById('memberName').value.trim();
        const quantity = parseInt(document.getElementById('memberQuantity').value);
        const unitPrice = parseInt(document.getElementById('memberUnitPrice').value);
        const status = document.getElementById('memberStatus').value;
        const avatar = document.getElementById('memberAvatar').value.trim();
        
        if (!name || isNaN(quantity) || isNaN(unitPrice)) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        
        // Get today's date in the format used in the JSON
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        
        // Create new member entry
        const newEntry = {
            name,
            quantity,
            unitPrice,
            status
        };
        
        // In a real application, you would send this to a server
        fetch('../data/data.json')
            .then(res => res.json())
            .then(data => {
                if (!data[formattedDate]) {
                    data[formattedDate] = [];
                }
                
                data[formattedDate].push(newEntry);
                
                // Here you would normally send the updated data back to the server
                console.log('New member added:', newEntry);
                
                // Close modal and reset form
                const modal = bootstrap.Modal.getInstance(document.getElementById('addMemberModal'));
                modal.hide();
                document.getElementById('addMemberForm').reset();
                
                // Refresh the member list
                initMembers();
                
                alert('Thêm thành viên mới thành công!');
            })
            .catch(error => {
                console.error('Error adding member:', error);
                alert('Có lỗi xảy ra khi thêm thành viên');
            });
    }
    
    // Edit member information
    function editMember(memberName) {
        const member = allMembers.find(m => m.name === memberName);
        if (!member) return;
        
        document.getElementById('editMemberId').value = memberName;
        document.getElementById('editMemberName').value = member.name;
        document.getElementById('editMemberAvatar').value = member.avatar;
        
        const modal = new bootstrap.Modal(document.getElementById('editMemberModal'));
        modal.show();
    }
    
    // Update member information
    function updateMember() {
        const memberName = document.getElementById('editMemberId').value;
        const newName = document.getElementById('editMemberName').value.trim();
        const newAvatar = document.getElementById('editMemberAvatar').value.trim();
        
        if (!newName) {
            alert('Tên thành viên không được để trống');
            return;
        }
        
        // In a real application, you would update this in the database
        // This is just a frontend simulation
        const memberIndex = allMembers.findIndex(m => m.name === memberName);
        if (memberIndex !== -1) {
            allMembers[memberIndex].name = newName;
            if (newAvatar) {
                allMembers[memberIndex].avatar = newAvatar;
            }
            
            // Update filtered members if needed
            const filteredIndex = filteredMembers.findIndex(m => m.name === memberName);
            if (filteredIndex !== -1) {
                filteredMembers[filteredIndex] = {...allMembers[memberIndex]};
            }
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editMemberModal'));
            modal.hide();
            
            // Refresh display
            displayMembers();
            
            alert('Cập nhật thông tin thành viên thành công!');
        }
    }
    
    // Delete a member
    function deleteMember(memberName) {
        if (!confirm(`Bạn có chắc chắn muốn xóa thành viên "${memberName}"?`)) {
            return;
        }
        
        // In a real application, you would send a delete request to the server
        // This is just a frontend simulation
        allMembers = allMembers.filter(member => member.name !== memberName);
        filteredMembers = filteredMembers.filter(member => member.name !== memberName);
        
        // Reset to first page if needed
        if (currentPage > 1 && filteredMembers.length <= (currentPage - 1) * membersPerPage) {
            currentPage = 1;
        }
        
        displayMembers();
        setupPagination();
        
        alert(`Đã xóa thành viên "${memberName}"`);
    }
});