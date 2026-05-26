/**
 * Login Page - JavaScript
 * Handles authentication and form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // State
    let currentRole = 'user';

    // DOM Elements
    const roleButtons = document.querySelectorAll('.role-btn');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const registerSection = document.getElementById('registerSection');

    // Role Selection
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            roleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentRole = this.dataset.role;
            
            // Update register section visibility
            if (currentRole === 'admin') {
                registerSection.style.display = 'none';
            } else {
                registerSection.style.display = 'block';
            }

            // Clear messages
            hideMessages();
            
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    });

    // Toggle Password Visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            const icon = type === 'password' ? 'eye' : 'eye-off';
            this.setAttribute('data-feather', icon);
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    }

    // Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Validate
            if (!username || !password) {
                showError('Vui lòng nhập đầy đủ thông tin!');
                return;
            }

            // Simulate login
            handleLogin(username, password, remember);
        });
    }

    async function handleLogin(username, password, remember) {
        // Hide previous messages
        hideMessages();

        try {
            // Call backend API
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    account: username,
                    password: password
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const loginData = result.data;
                
                // Prepare user data
                const userData = {
                    username: loginData.account,
                    role: loginData.role, // MANAGER or EMPLOYEE from backend
                    employeeId: loginData.employeeId,
                    employeeName: loginData.employeeName,
                    userId: loginData.userId,
                    token: loginData.token,
                    loginTime: new Date().toISOString()
                };

                // Save to storage based on remember checkbox
                const storage = remember ? localStorage : sessionStorage;
                
                // Save with appropriate key based on role
                if (loginData.role === 'MANAGER') {
                    storage.setItem('authAdmin', JSON.stringify(userData));
                } else {
                    storage.setItem('authUser', JSON.stringify(userData));
                }

                showSuccess('Đăng nhập thành công! Đang chuyển hướng...');

                // Both MANAGER and EMPLOYEE go to main dashboard (index.html)
                // Employee will see limited features based on role-based UI hiding
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);

            } else {
                showError(result.message || 'Sai tên đăng nhập hoặc mật khẩu!');
            }

        } catch (error) {
            console.error('Login error:', error);
            showError('Lỗi kết nối đến server! Vui lòng thử lại.');
        }
    }

    function showError(message) {
        if (errorMessage) {
            errorMessage.innerHTML = message;
            errorMessage.style.display = 'block';
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }
    }

    function showSuccess(message) {
        if (successMessage) {
            successMessage.innerHTML = message;
            successMessage.style.display = 'block';
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    }

    function hideMessages() {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }

    // Register link (only for user)
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chức năng đăng ký sẽ được triển khai sau!\nDemo: Sử dụng bất kỳ email/password nào để đăng nhập.');
        });
    }

    // Check if already logged in
    window.addEventListener('load', function() {
        const authUser = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
        const authAdmin = localStorage.getItem('authAdmin') || sessionStorage.getItem('authAdmin');
        
        if (authUser) {
            window.location.href = 'user-home.html';
        } else if (authAdmin) {
            window.location.href = 'index.html';
        }
    });
});
