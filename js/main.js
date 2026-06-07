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
 * Weekly Bulletin Persistent System (localStorage Database simulation)
 * Handles both the Admin Dashboard and the Worshipper View
 */
function initBulletinSimulator() {
    // Default values for resetting or fallback
    const defaults = {
        date: "Sunday, June 7, 2026",
        firstLesson: "Romans 4:13-25",
        gospel: "Matthew 9:9-13, 18-26",
        hymn1: "Will You Come and Follow Me (ELW 798)",
        hymn2: "Jesus Calls Us; o'er the Tumult (ELW 696)",
        hymn3: "I'm So Glad (ELW 860)",
        announcement: "Guatemala Mission Tag Sale Fundraiser: Saturday 6/20 from 9:00 AM – 4:00 PM at the Gloria Dei Campus. Drop off items during Joseph's Storehouse hours!",
        pdfUrl: "Reference/Bulletin June 7.pdf"
    };

    // 1. ADMIN PANEL LOGIC (bulletin-admin.html)
    const adminForm = document.getElementById('bulletin-admin-page-form');
    const resetBtn = document.getElementById('reset-defaults-btn');
    
    if (adminForm) {
        // Load existing data from localStorage or use defaults
        const savedData = JSON.parse(localStorage.getItem('ulc_bulletin_data')) || defaults;
        
        // Populate form fields
        document.getElementById('adm-date').value = savedData.date;
        document.getElementById('adm-first-lesson').value = savedData.firstLesson;
        document.getElementById('adm-gospel').value = savedData.gospel;
        document.getElementById('adm-hymn1').value = savedData.hymn1;
        document.getElementById('adm-hymn2').value = savedData.hymn2;
        document.getElementById('adm-hymn3').value = savedData.hymn3;
        document.getElementById('adm-announcement').value = savedData.announcement;
        document.getElementById('adm-pdf-url').value = savedData.pdfUrl;

        // Form Submission
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newData = {
                date: document.getElementById('adm-date').value,
                firstLesson: document.getElementById('adm-first-lesson').value,
                gospel: document.getElementById('adm-gospel').value,
                hymn1: document.getElementById('adm-hymn1').value,
                hymn2: document.getElementById('adm-hymn2').value,
                hymn3: document.getElementById('adm-hymn3').value,
                announcement: document.getElementById('adm-announcement').value,
                pdfUrl: document.getElementById('adm-pdf-url').value
            };

            localStorage.setItem('ulc_bulletin_data', JSON.stringify(newData));

            // Show success alert
            const alertBox = document.getElementById('admin-alert');
            if (alertBox) {
                alertBox.style.display = 'block';
                alertBox.innerHTML = `
                    <div style="background-color: #d1fae5; border: 1px solid #10b981; color: #065f46; padding: 1rem; border-radius: var(--border-radius-sm); font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>Bulletin updated successfully! Worshippers will now see these changes live.</span>
                    </div>
                `;
                // Auto hide after 4 seconds
                setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
            }
        });

        // Reset Button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to reset the bulletin back to the default June 7th service details?")) {
                    localStorage.removeItem('ulc_bulletin_data');
                    
                    // Reset inputs
                    document.getElementById('adm-date').value = defaults.date;
                    document.getElementById('adm-first-lesson').value = defaults.firstLesson;
                    document.getElementById('adm-gospel').value = defaults.gospel;
                    document.getElementById('adm-hymn1').value = defaults.hymn1;
                    document.getElementById('adm-hymn2').value = defaults.hymn2;
                    document.getElementById('adm-hymn3').value = defaults.hymn3;
                    document.getElementById('adm-announcement').value = defaults.announcement;
                    document.getElementById('adm-pdf-url').value = defaults.pdfUrl;

                    // Show reset alert
                    const alertBox = document.getElementById('admin-alert');
                    if (alertBox) {
                        alertBox.style.display = 'block';
                        alertBox.innerHTML = `
                            <div style="background-color: #fef3c7; border: 1px solid #d97706; color: #92400e; padding: 1rem; border-radius: var(--border-radius-sm); font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
                                <span>Reset to parish defaults. Local changes cleared.</span>
                            </div>
                        `;
                        setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
                    }
                }
            });
        }
    }

    // 2. WORSHIPPER VIEW LOGIC (bulletin.html)
    const simDate = document.getElementById('sim-date');
    if (simDate) {
        const savedData = JSON.parse(localStorage.getItem('ulc_bulletin_data')) || defaults;
        
        // Populate elements on worshipper screen
        simDate.textContent = savedData.date;
        
        const simFirstLesson = document.getElementById('sim-first-lesson');
        if (simFirstLesson) simFirstLesson.textContent = savedData.firstLesson;
        
        const simGospel = document.getElementById('sim-gospel');
        if (simGospel) simGospel.textContent = savedData.gospel;
        
        const simHymn1 = document.getElementById('sim-hymn1');
        if (simHymn1) simHymn1.textContent = savedData.hymn1;
        
        const simHymn2 = document.getElementById('sim-hymn2');
        if (simHymn2) simHymn2.textContent = savedData.hymn2;
        
        const simHymn3 = document.getElementById('sim-hymn3');
        if (simHymn3) simHymn3.textContent = savedData.hymn3;
        
        const simAnnouncement = document.getElementById('sim-announcement');
        if (simAnnouncement) simAnnouncement.textContent = savedData.announcement;
        
        const simPdfLink = document.getElementById('sim-pdf-btn');
        if (simPdfLink) simPdfLink.href = savedData.pdfUrl;
    }
}
