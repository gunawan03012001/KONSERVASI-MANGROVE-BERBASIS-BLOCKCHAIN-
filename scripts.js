// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Update datetime
    function updateDateTime() {
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const dateTimeStr = now.toLocaleString('id-ID', options);
        const datetimeElements = document.querySelectorAll('.datetime');
        
        datetimeElements.forEach(el => {
            el.textContent = dateTimeStr;
        });
    }
    
    // Update every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Toggle submenus
    const toggleSubmenus = document.querySelectorAll('.toggle-submenu');
    toggleSubmenus.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const submenu = this.parentElement.querySelector('.submenu');
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
                this.textContent = '+';
            } else {
                submenu.style.display = 'block';
                this.textContent = '-';
            }
        });
    });
    
    // Highlight active TOC item
    const tocLinks = document.querySelectorAll('.toc-list a');
    const currentHash = window.location.hash;
    
    if (currentHash) {
        const activeLink = document.querySelector(`.toc-list a[href="${currentHash}"]`);
        if (activeLink) {
            // Remove active class from all links
            tocLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current link
            activeLink.classList.add('active');
            
            // Expand parent submenu if exists
            const parentSubmenu = activeLink.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.style.display = 'block';
                const toggle = activeLink.closest('.has-submenu').querySelector('.toggle-submenu');
                if (toggle) {
                    toggle.textContent = '-';
                }
            }
            
            // Scroll to section
            setTimeout(() => {
                const targetSection = document.querySelector(currentHash);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }
    
    // Add click event to all TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            tocLinks.forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add fade-in effect to content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.add('fade-in');
    });
});

// Logout function
function logout() {
    window.location.href = 'index.html';
}
