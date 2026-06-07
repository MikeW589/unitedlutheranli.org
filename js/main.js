/* ==========================================================================
   United Lutheran Church of Long Island - Core JS & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation
    initMobileMenu();

    // 2. Tab Components Initialization
    initTabComponents();

    // 3. Contact & Enrollment Form Handling
    initFormHandlers();

    // 4. Digital Bulletin Simulator (Live Updates)
    initBulletinSimulator();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggle hamburger animation
            menuToggle.classList.toggle('open');
            
            // Toggle menu display
            navMenu.classList.toggle('active');
            
            // If active, expand under the header
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '5rem';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'white';
                navMenu.style.padding = '1.5rem';
                navMenu.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                navMenu.style.gap = '1.5rem';
                navMenu.style.borderTop = '1px solid rgba(0,0,0,0.05)';
            } else {
                navMenu.style.display = '';
            }
        });
    }
}

/**
 * Interactive Tab Switcher
 * Looks for buttons with [data-tab] and panels with corresponding IDs
 */
function initTabComponents() {
    const tabContainers = document.querySelectorAll('.tab-container');
    
    tabContainers.forEach(container => {
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabPanes = container.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTabId = btn.getAttribute('data-tab');
                
                // Deactivate all buttons in this container
                tabBtns.forEach(b => b.classList.remove('active'));
                // Hide all panes in this container
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Activate clicked button and target pane
                btn.classList.add('active');
                const targetPane = container.querySelector(`#${targetTabId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Contact & Inquiry Forms validation and simulation
 */
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Exclude the bulletin update form
        if (form.id === 'bulletin-admin-form') return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--clr-secondary)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Success message replacement
                const container = form.parentElement;
                container.innerHTML = `
                    <div class="animate-fade-in" style="text-align: center; padding: 2.5rem; background: var(--clr-bg-white); border-radius: var(--border-radius-md);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
                        <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
                        <p style="margin: 0; font-size: 0.95rem;">Your message has been sent successfully. The church office will be in touch shortly.</p>
                    </div>
                `;
            }
        });
    });
}

/**
 * Weekly Bulletin Update Simulator
 * Syncs the admin fields with the simulated visitor mobile screen
 */
function initBulletinSimulator() {
    const adminForm = document.getElementById('bulletin-admin-form');
    if (!adminForm) return;

    // Admin Inputs
    const inputDate = document.getElementById('adm-date');
    const inputFirstLesson = document.getElementById('adm-first-lesson');
    const inputGospel = document.getElementById('adm-gospel');
    const inputHymn1 = document.getElementById('adm-hymn1');
    const inputHymn2 = document.getElementById('adm-hymn2');
    const inputHymn3 = document.getElementById('adm-hymn3');
    const inputAnnouncement = document.getElementById('adm-announcement');
    const inputPdfLink = document.getElementById('adm-pdf-url');

    // Phone Sim Outputs
    const simDate = document.getElementById('sim-date');
    const simFirstLesson = document.getElementById('sim-first-lesson');
    const simGospel = document.getElementById('sim-gospel');
    const simHymn1 = document.getElementById('sim-hymn1');
    const simHymn2 = document.getElementById('sim-hymn2');
    const simHymn3 = document.getElementById('sim-hymn3');
    const simAnnouncement = document.getElementById('sim-announcement');
    const simPdfLink = document.getElementById('sim-pdf-btn');

    // Update function
    function updateSimulator() {
        if (simDate && inputDate) simDate.textContent = inputDate.value;
        if (simFirstLesson && inputFirstLesson) simFirstLesson.textContent = inputFirstLesson.value;
        if (simGospel && inputGospel) simGospel.textContent = inputGospel.value;
        if (simHymn1 && inputHymn1) simHymn1.textContent = inputHymn1.value;
        if (simHymn2 && inputHymn2) simHymn2.textContent = inputHymn2.value;
        if (simHymn3 && inputHymn3) simHymn3.textContent = inputHymn3.value;
        if (simAnnouncement && inputAnnouncement) simAnnouncement.textContent = inputAnnouncement.value;
        if (simPdfLink && inputPdfLink) {
            simPdfLink.href = inputPdfLink.value;
        }
    }

    // Bind event listeners to input elements for real-time preview
    const inputs = [inputDate, inputFirstLesson, inputGospel, inputHymn1, inputHymn2, inputHymn3, inputAnnouncement, inputPdfLink];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', updateSimulator);
        }
    });

    // Handle form submit
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success alert
        const submitBtn = adminForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Updating Live Portal...';
        submitBtn.style.backgroundColor = 'var(--clr-secondary)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Weekly Bulletin Live!';
            submitBtn.style.backgroundColor = 'green';
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 2000);
        }, 1200);
    });
}
