// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Mobile menu toggle with animations
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        
        if (navLinks.classList.contains('active')) {
            // Close menu
            navLinks.classList.remove('active');
            // Reset animations for menu items
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
        } else {
            // Open menu
            navLinks.classList.add('active');
            // Animate menu items with staggered delay
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        }
    });
    
    // Close menu when clicking on a nav link
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(26, 54, 93, 0.98)';
        }
        
        lastScroll = currentScroll;
    });
});
