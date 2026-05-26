/**
 * Authentication Utilities
 * Provides helper functions for role-based access control
 */

const AuthUtils = {
    /**
     * Get current user's authentication data
     * @returns {Object|null} User data {username, role, employeeId, employeeName, loginTime}
     */
    getCurrentUser() {
        // Check localStorage first
        const authData = localStorage.getItem('authUser') || 
                        localStorage.getItem('authAdmin') ||
                        sessionStorage.getItem('authUser') || 
                        sessionStorage.getItem('authAdmin');
        
        return authData ? JSON.parse(authData) : null;
    },

    /**
     * Get current user's role
     * @returns {string|null} Role name: 'MANAGER', 'EMPLOYEE', or null if not logged in
     */
    getUserRole() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    },

    /**
     * Check if current user is a Manager
     * @returns {boolean}
     */
    isManager() {
        const role = this.getUserRole();
        return role === 'MANAGER' || role === 'admin'; // Support old 'admin' for backward compatibility
    },

    /**
     * Check if current user is an Employee
     * @returns {boolean}
     */
    isEmployee() {
        const role = this.getUserRole();
        return role === 'EMPLOYEE' || role === 'user'; // Support old 'user' for backward compatibility
    },

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authAdmin');
        sessionStorage.removeItem('authUser');
        sessionStorage.removeItem('authAdmin');
        window.location.href = 'login.html';
    },

    /**
     * Hide elements for Employee role
     * Elements with class 'manager-only' will be hidden for employees
     */
    applyRoleBasedUI() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        const isEmployee = this.isEmployee();
        
        if (isEmployee) {
            // Apply restrictions for employee
            this.hideManagerElements();

            // Set up MutationObserver to watch for dynamically added elements
            this.observeDOMChanges();
        }

        // Initialize logout button
        this.initLogout();
    },

    /**
     * Hide all manager-only elements
     */
    hideManagerElements() {
        // Hide manager-only elements (excluding logout button)
        const managerOnlyElements = document.querySelectorAll('.manager-only');
        managerOnlyElements.forEach(el => {
            // Don't hide logout button
            if (el.id !== 'logoutBtn' && !el.closest('#logoutBtn')) {
                el.style.display = 'none';
            }
        });

        // Disable manager-only buttons (excluding logout button)
        const managerOnlyButtons = document.querySelectorAll('button.manager-only, a.manager-only');
        managerOnlyButtons.forEach(btn => {
            // Don't disable logout button
            if (btn.id !== 'logoutBtn' && !btn.closest('#logoutBtn')) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                // Prevent click event
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, true);
            }
        });

        // Change "Quản Trị" to "Nhân Viên" in header
        const userRoleElements = document.querySelectorAll('.user-name, .text-sm.font-medium, #userRoleText');
        userRoleElements.forEach(el => {
            if (el.textContent.trim() === 'Quản Trị') {
                el.textContent = 'Nhân Viên';
            }
        });
    },

    /**
     * Observe DOM changes to hide dynamically added manager-only elements
     */
    observeDOMChanges() {
        if (!this.isEmployee()) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // Re-apply hiding for newly added elements
                    this.hideManagerElements();
                }
            });
        });

        // Start observing the document body for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    /**
     * Initialize logout button click handler
     */
    initLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            // Remove any existing event listeners by cloning
            const newLogoutBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
            
            // Add click event
            newLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    this.logout();
                }
            });
        }
    },

    /**
     * Get employee ID from current user
     * @returns {number|null}
     */
    getEmployeeId() {
        const user = this.getCurrentUser();
        return user ? user.employeeId : null;
    },

    /**
     * Get employee name from current user
     * @returns {string|null}
     */
    getEmployeeName() {
        const user = this.getCurrentUser();
        return user ? user.employeeName : null;
    },

    /**
     * Check if user has permission to perform an action
     * @param {string} action - Action name: 'create', 'update', 'delete', 'view_revenue'
     * @returns {boolean}
     */
    hasPermission(action) {
        if (this.isManager()) {
            return true; // Managers have all permissions
        }

        if (this.isEmployee()) {
            // Employees can only view and create bookings, not delete or view revenue
            const employeePermissions = ['view', 'create', 'checkin', 'checkout'];
            return employeePermissions.includes(action);
        }

        return false;
    },

    /**
     * Show permission denied message
     */
    showPermissionDenied() {
        alert('Bạn không có quyền thực hiện thao tác này!\nChỉ có Manager mới có quyền này.');
    }
};

// Auto-apply role-based UI when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only apply if not on login page
    if (!window.location.pathname.includes('login.html')) {
        AuthUtils.applyRoleBasedUI();
    }
});
