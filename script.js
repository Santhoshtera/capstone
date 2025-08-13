// User credentials
const users = {
    'admin': { password: '123', role: 'admin', name: 'Administrator' },
    'santhosh': { password: '123', role: 'agent', name: 'Santhosh' },
    'jeevan': { password: '123', role: 'customer', name: 'Jeevan' }
};

// Current user state
let currentUser = null;

// DOM elements
const loginModal = document.getElementById('loginModal');
const dashboardModal = document.getElementById('dashboardModal');
const dashboardTitle = document.getElementById('dashboardTitle');
const dashboardBody = document.getElementById('dashboardBody');

// Show login modal
function showLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close login modal
function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset all forms
    document.querySelectorAll('.role-form').forEach(form => form.reset());
}

// Close dashboard modal
function closeDashboard() {
    dashboardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentUser = null;
}

// Handle role-based login form submission
function handleRoleLogin(event, role) {
    event.preventDefault();
    
    const form = event.target;
    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    // Check credentials for the specific role
    if (users[username] && users[username].password === password && users[username].role === role) {
        currentUser = {
            username: username,
            role: users[username].role,
            name: users[username].name
        };
        
        closeLoginModal();
        showDashboard();
    } else {
        alert(`Invalid credentials for ${role} role. Please try again.`);
    }
}

// Show dashboard based on user role
function showDashboard() {
    dashboardTitle.textContent = `${currentUser.name}'s Dashboard`;
    
    let dashboardContent = '';
    
    switch (currentUser.role) {
        case 'admin':
            dashboardContent = getAdminDashboard();
            break;
        case 'agent':
            dashboardContent = getAgentDashboard();
            break;
        case 'customer':
            dashboardContent = getCustomerDashboard();
            break;
    }
    
    dashboardBody.innerHTML = dashboardContent;
    dashboardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Admin dashboard content
function getAdminDashboard() {
    return `
        <div class="dashboard-card">
            <h3><i class="fas fa-chart-line"></i> System Overview</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">1,247</span>
                    <span class="stat-label">Total Properties</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">89</span>
                    <span class="stat-label">Active Agents</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">2,156</span>
                    <span class="stat-label">Registered Users</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">$45.2M</span>
                    <span class="stat-label">Total Sales</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-users"></i> User Management</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">156</span>
                    <span class="stat-label">New Users (This Month)</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">23</span>
                    <span class="stat-label">Pending Approvals</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Support Tickets</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-home"></i> Property Management</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">89</span>
                    <span class="stat-label">New Listings</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">34</span>
                    <span class="stat-label">Pending Reviews</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">67</span>
                    <span class="stat-label">Sold This Month</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-cog"></i> System Actions</h3>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <button class="login-btn" onclick="alert('User management panel opened')">
                    <i class="fas fa-users"></i> Manage Users
                </button>
                <button class="login-btn" onclick="alert('Property review panel opened')">
                    <i class="fas fa-home"></i> Review Properties
                </button>
                <button class="login-btn" onclick="alert('System settings panel opened')">
                    <i class="fas fa-cog"></i> System Settings
                </button>
            </div>
        </div>
    `;
}

// Agent dashboard content
function getAgentDashboard() {
    return `
        <div class="dashboard-card">
            <h3><i class="fas fa-chart-bar"></i> My Performance</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">23</span>
                    <span class="stat-label">Active Listings</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">8</span>
                    <span class="stat-label">Properties Sold</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">$2.1M</span>
                    <span class="stat-label">Total Sales</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">156</span>
                    <span class="stat-label">Client Inquiries</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-calendar"></i> Recent Activities</h3>
            <div style="margin-top: 1rem;">
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>New inquiry received</strong> - Luxury Villa in Beverly Hills
                    <br><small style="color: #666;">2 hours ago</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>Property viewing scheduled</strong> - Modern Apartment
                    <br><small style="color: #666;">Yesterday</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <strong>Offer received</strong> - Family Home in Pasadena
                    <br><small style="color: #666;">3 days ago</small>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-tasks"></i> Quick Actions</h3>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <button class="login-btn" onclick="alert('Add new property form opened')">
                    <i class="fas fa-plus"></i> Add New Property
                </button>
                <button class="login-btn" onclick="alert('Client management panel opened')">
                    <i class="fas fa-user-friends"></i> Manage Clients
                </button>
                <button class="login-btn" onclick="alert('Schedule viewing form opened')">
                    <i class="fas fa-calendar-plus"></i> Schedule Viewing
                </button>
            </div>
        </div>
    `;
}

// Customer dashboard content
function getCustomerDashboard() {
    return `
        <div class="dashboard-card">
            <h3><i class="fas fa-heart"></i> My Favorites</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Saved Properties</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">5</span>
                    <span class="stat-label">Viewed Properties</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">3</span>
                    <span class="stat-label">Inquiries Sent</span>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-search"></i> Property Recommendations</h3>
            <div style="margin-top: 1rem;">
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>Luxury Villa</strong> - Beverly Hills, CA
                    <br><span style="color: #667eea; font-weight: 600;">$850,000</span>
                    <br><small style="color: #666;">Based on your preferences</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>Modern Apartment</strong> - Downtown LA
                    <br><span style="color: #667eea; font-weight: 600;">$450,000</span>
                    <br><small style="color: #666;">Similar to your saved properties</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <strong>Family Home</strong> - Pasadena, CA
                    <br><span style="color: #667eea; font-weight: 600;">$650,000</span>
                    <br><small style="color: #666;">In your preferred area</small>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-user"></i> My Account</h3>
            <div style="margin-top: 1rem;">
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>Profile Information</strong>
                    <br><small style="color: #666;">Update your preferences and contact details</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 0.5rem;">
                    <strong>Search History</strong>
                    <br><small style="color: #666;">View your recent property searches</small>
                </div>
                <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <strong>Notifications</strong>
                    <br><small style="color: #666;">Manage your email and SMS preferences</small>
                </div>
            </div>
        </div>
        
        <div class="dashboard-card">
            <h3><i class="fas fa-tools"></i> Quick Actions</h3>
            <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                <button class="login-btn" onclick="alert('Property search opened')">
                    <i class="fas fa-search"></i> Search Properties
                </button>
                <button class="login-btn" onclick="alert('Contact agent form opened')">
                    <i class="fas fa-phone"></i> Contact Agent
                </button>
                <button class="login-btn" onclick="alert('Schedule viewing form opened')">
                    <i class="fas fa-calendar"></i> Schedule Viewing
                </button>
            </div>
        </div>
    `;
}

// Logout function
function logout() {
    currentUser = null;
    closeDashboard();
    alert('You have been logged out successfully.');
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === dashboardModal) {
        closeDashboard();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
        closeDashboard();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('login-btn') || this.classList.contains('cta-button')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});

// Add hover effects to property cards
document.addEventListener('DOMContentLoaded', function() {
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
