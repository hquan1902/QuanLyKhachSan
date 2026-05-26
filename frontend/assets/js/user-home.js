/**
 * User Home Page - JavaScript
 * Handles user portal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadRooms();
    updateAuthDisplay();

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Navigation functions
function showSection(section) {
    // Hide all sections
    ['home', 'rooms', 'bookings', 'profile', 'bills'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
    });

    // Show selected section
    if (section === 'home') {
        const home = document.getElementById('home');
        const rooms = document.getElementById('rooms');
        if (home) home.classList.remove('hidden');
        if (rooms) rooms.classList.remove('hidden');
    } else if (section === 'rooms') {
        const home = document.getElementById('home');
        const rooms = document.getElementById('rooms');
        if (home) home.classList.remove('hidden');
        if (rooms) rooms.classList.remove('hidden');
    } else if (section === 'bookings') {
        if (!isAuthenticated()) {
            alert('Vui lòng đăng nhập để xem đặt phòng của bạn!');
            window.location.href = 'login.html';
            return;
        }
        const bookings = document.getElementById('bookings');
        if (bookings) bookings.classList.remove('hidden');
        loadBookings();
    } else if (section === 'profile') {
        if (!isAuthenticated()) {
            alert('Vui lòng đăng nhập để xem thông tin cá nhân!');
            window.location.href = 'login.html';
            return;
        }
        const profile = document.getElementById('profile');
        if (profile) profile.classList.remove('hidden');
    } else if (section === 'bills') {
        if (!isAuthenticated()) {
            alert('Vui lòng đăng nhập để xem bills!');
            window.location.href = 'login.html';
            return;
        }
        const bills = document.getElementById('bills');
        if (bills) bills.classList.remove('hidden');
    }
}

// Dropdown functions
function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function closeDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Auth functions
function isAuthenticated() {
    const authUser = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
    return !!authUser;
}

function getAuthUser() {
    try {
        const userStr = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
        return userStr ? JSON.parse(userStr) : null;
    } catch {
        return null;
    }
}

function updateAuthDisplay() {
    const user = getAuthUser();
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    const userDropdown = document.getElementById('userDropdown');

    if (user) {
        if (loginBtnContainer) {
            loginBtnContainer.classList.add('hidden');
        }
        if (userDropdown) {
            userDropdown.classList.remove('hidden');
        }

        const initial = user.username ? user.username.charAt(0).toUpperCase() : 'U';
        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        const userName = document.getElementById('userName');
        const dropdownUserName = document.getElementById('dropdownUserName');
        const dropdownUserEmail = document.getElementById('dropdownUserEmail');

        if (userAvatar) userAvatar.textContent = initial;
        if (dropdownAvatar) dropdownAvatar.textContent = initial;
        if (userName) userName.textContent = user.username || user.email;
        if (dropdownUserName) dropdownUserName.textContent = user.fullName || user.username;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || user.username;
    } else {
        if (loginBtnContainer) {
            loginBtnContainer.classList.remove('hidden');
        }
        if (userDropdown) {
            userDropdown.classList.add('hidden');
        }
    }
}

function handleLogout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('authUser');
        sessionStorage.removeItem('authUser');
        updateAuthDisplay();
        closeDropdown();
        showSection('home');
        
        setTimeout(() => {
            alert('Đã đăng xuất thành công!');
        }, 100);
    }
}

// Load rooms
const mockRooms = [
    {
        id: 1,
        name: 'Phòng Standard',
        capacity: 2,
        basePrice: 500000,
        description: 'Phòng tiêu chuẩn thoải mái',
        status: 'available',
        image: 'https://vinapad.com/wp-content/uploads/2020/07/phong-standard-la-gi.jpg'
    },
    {
        id: 2,
        name: 'Phòng Deluxe',
        capacity: 3,
        basePrice: 800000,
        description: 'Phòng cao cấp với view đẹp',
        status: 'available',
        image: 'https://thuanhuehotelnamhoian.com/wp-content/uploads/2023/08/1-2-scaled.jpg'
    },
    {
        id: 3,
        name: 'Phòng Suite',
        capacity: 4,
        basePrice: 1500000,
        description: 'Phòng sang trọng, rộng rãi',
        status: 'available',
        image: 'https://thecastlehotel.vn/wp-content/uploads/2023/10/Media-Win-Win-94-copy-min.jpeg'
    }
];

function loadRooms() {
    const roomList = document.getElementById('roomList');
    if (!roomList) return;

    roomList.innerHTML = '';

    mockRooms.forEach(room => {
        const roomCard = `
            <div class="room-card">
                <div class="room-image">
                    <img src="${room.image}" alt="${room.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                </div>
                <div class="room-content">
                    <h3 class="room-name">${room.name}</h3>
                    <p class="room-info">
                        Sức chứa: ${room.capacity} người<br>
                        ${room.description}
                    </p>
                    <div class="room-price">${formatPrice(room.basePrice)}</div>
                    <button class="btn btn-full" onclick="bookRoom(${room.id})">
                        Đặt Phòng
                    </button>
                </div>
            </div>
        `;
        roomList.innerHTML += roomCard;
    });
}

function bookRoom(roomId) {
    if (!isAuthenticated()) {
        alert('Vui lòng đăng nhập để đặt phòng!');
        window.location.href = 'login.html';
        return;
    }
    alert('Chức năng đặt phòng đang được phát triển!');
}

function loadBookings() {
    const bookingList = document.getElementById('bookingList');
    if (bookingList) {
        bookingList.innerHTML = '<p style="text-align: center; color: #666;">Bạn chưa có đặt phòng nào.</p>';
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
