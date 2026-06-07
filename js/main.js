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
        if (form.id === 'bulletin-admin-page-form') return;
        
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
    // Default values for resetting or fallback (scraped from June 7 bulletin)
    const defaults = {
        date: "Sunday, June 7, 2026",
        prelude: "“Meditation” — Gabriel DuPont",
        hymn1: "Will You Come and Follow Me (ELW Hymn 798)",
        prayerOfDay: "God of promise and mercy, you called Matthew to follow you, healed those who came to you in faith, and fulfilled your promises through Jesus Christ. Strengthen our trust in your grace, especially when we cannot see the way ahead. Help us welcome others as you have welcomed us and live as people shaped by your mercy; through Jesus Christ, our Savior and Lord.",
        firstReadingRef: "Romans 4:13-25",
        firstReadingText: "13 The promise that he would inherit the world did not come to Abraham or to his descendants through the law but through the righteousness of faith. 14 For if it is the adherents of the law who are to be the heirs, faith is null and the promise is void. 15 For the law brings wrath, but where there is no law, neither is there transgression.\n\n16 For this reason the promise depends on faith, in order that it may rest on grace, so that it may be guaranteed to all his descendants, not only to the adherents of the law but also to those who share the faith of Abraham (who is the father of all of us, 17 as it is written, “I have made you the father of many nations”), in the presence of the God in whom he believed, who gives life to the dead and calls into existence the things that do not exist. 18 Hoping against hope, he believed that he would become “the father of many nations,” according to what was said, “So shall your descendants be.” 19 He did not weaken in faith when he considered his own body, which was already as good as dead (for he was about a hundred years old), and the barrenness of Sarah’s womb. 20 No distrust made him waver concerning the promise of God, but he grew strong in his faith as he gave glory to God, 21 being fully convinced that God was able to do what he had promised. 22 Therefore “it was reckoned to him as righteousness.”\n\n23 Now the words, “it was reckoned to him,” were written not for his sake alone 24 but for ours also. It will be reckoned to us who believe in him who raised Jesus our Lord from the dead, 25 who was handed over for our trespasses and was raised for our justification.",
        gospelRef: "Matthew 9:9-13, 18-26",
        gospelText: "9 As Jesus was walking along, he saw a man called Matthew sitting at the tax-collection station, and he said to him, “Follow me.” And he got up and followed him.\n\n10 And as he sat at dinner in the house, many tax collectors and sinners came and were sitting with Jesus and his disciples. 11 When the Pharisees saw this, they said to his disciples, “Why does your teacher eat with tax collectors and sinners?” 12 But when he heard this, he said, “Those who are well have no need of a physician, but those who are sick. 13 Go and learn what this means, ‘I desire mercy, not sacrifice.’ For I have not come to call the righteous but sinners.”\n\n18 While he was saying these things to them, suddenly a leader came in and knelt before him, saying, “My daughter has just died, but come and lay your hand on her, and she will live.” 19 And Jesus got up and followed him, with his disciples. 20 Then suddenly a woman who had been suffering from a flow of blood for twelve years came up behind him and touched the fringe of his cloak, 21 for she was saying to herself, “If I only touch his cloak, I will be made well.” 22 Jesus turned, and seeing her he said, “Take heart, daughter; your faith has made you well.” And the woman was made well from that moment. 23 When Jesus came to the leader’s house and saw the flute players and the crowd making a commotion, 24 he said, “Go away, for the girl is not dead but sleeping.” And they laughed at him. 25 But when the crowd had been put outside, he went in and took her by the hand, and the girl got up. 26 And the report of this spread through all of that district.",
        hymn2: "Jesus Calls Us; o’er the Tumult (ELW Hymn 696)",
        hymn3: "I’m So Glad (ELW Hymn 860)",
        offeringMusic: "“God Adoring” — Katherine K. Davis (Chancel Choir)",
        postlude: "“March in D” — Flor Peeters",
        communionHymns: "All Are Welcome (ELW 641), As the Grains of Wheat (ELW 465), Lamb of God (ELW 336)",
        announcement: "Guatemala Mission Tag Sale Fundraiser: Saturday 6/20 from 9:00 AM – 4:00 PM at the Gloria Dei Campus. Drop off items during Joseph's Storehouse hours!",
        assistants: "Rev. Christian Cederstrom, Pastor\nNancy Barker, Worship Assistant\nRich Harris, Reader and Communion Assistant\nRichard Whitten, Minister of Music/Organist\nLaurie Haddock, Minister of Music/Youth & Family",
        pdfUrl: "Reference/Bulletin June 7.pdf",
        announcementsPdfUrl: "Reference/emailed Announcements June 7.pdf"
    };

    // 1. ADMIN PANEL LOGIC (bulletin-admin.html)
    const adminForm = document.getElementById('bulletin-admin-page-form');
    const resetBtn = document.getElementById('reset-defaults-btn');
    
    if (adminForm) {
        // Load existing data from localStorage or use defaults
        const savedData = JSON.parse(localStorage.getItem('ulc_bulletin_data')) || defaults;
        
        // Populate form fields
        document.getElementById('adm-date').value = savedData.date || defaults.date;
        document.getElementById('adm-prelude').value = savedData.prelude || defaults.prelude;
        document.getElementById('adm-hymn1').value = savedData.hymn1 || defaults.hymn1;
        document.getElementById('adm-prayer-of-day').value = savedData.prayerOfDay || defaults.prayerOfDay;
        document.getElementById('adm-first-lesson').value = savedData.firstReadingRef || defaults.firstReadingRef;
        document.getElementById('adm-first-lesson-text').value = savedData.firstReadingText || defaults.firstReadingText;
        document.getElementById('adm-gospel').value = savedData.gospelRef || defaults.gospelRef;
        document.getElementById('adm-gospel-text').value = savedData.gospelText || defaults.gospelText;
        document.getElementById('adm-hymn2').value = savedData.hymn2 || defaults.hymn2;
        document.getElementById('adm-hymn3').value = savedData.hymn3 || defaults.hymn3;
        document.getElementById('adm-offering-music').value = savedData.offeringMusic || defaults.offeringMusic;
        document.getElementById('adm-postlude').value = savedData.postlude || defaults.postlude;
        document.getElementById('adm-communion-hymns').value = savedData.communionHymns || defaults.communionHymns;
        document.getElementById('adm-announcement').value = savedData.announcement || defaults.announcement;
        document.getElementById('adm-assistants').value = savedData.assistants || defaults.assistants;
        document.getElementById('adm-pdf-url').value = savedData.pdfUrl || defaults.pdfUrl;
        document.getElementById('adm-announcements-pdf-url').value = savedData.announcementsPdfUrl || defaults.announcementsPdfUrl;

        // Form Submission
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newData = {
                date: document.getElementById('adm-date').value,
                prelude: document.getElementById('adm-prelude').value,
                hymn1: document.getElementById('adm-hymn1').value,
                prayerOfDay: document.getElementById('adm-prayer-of-day').value,
                firstReadingRef: document.getElementById('adm-first-lesson').value,
                firstReadingText: document.getElementById('adm-first-lesson-text').value,
                gospelRef: document.getElementById('adm-gospel').value,
                gospelText: document.getElementById('adm-gospel-text').value,
                hymn2: document.getElementById('adm-hymn2').value,
                hymn3: document.getElementById('adm-hymn3').value,
                offeringMusic: document.getElementById('adm-offering-music').value,
                postlude: document.getElementById('adm-postlude').value,
                communionHymns: document.getElementById('adm-communion-hymns').value,
                announcement: document.getElementById('adm-announcement').value,
                assistants: document.getElementById('adm-assistants').value,
                pdfUrl: document.getElementById('adm-pdf-url').value,
                announcementsPdfUrl: document.getElementById('adm-announcements-pdf-url').value
            };

            localStorage.setItem('ulc_bulletin_data', JSON.stringify(newData));

            // Show success alert
            const alertBox = document.getElementById('admin-alert');
            if (alertBox) {
                alertBox.style.display = 'block';
                alertBox.innerHTML = `
                    <div style="background-color: #d1fae5; border: 1px solid #10b981; color: #065f46; padding: 1rem; border-radius: var(--border-radius-sm); font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>Bulletin published successfully! Worshippers will now see these changes live.</span>
                    </div>
                `;
                // Auto scroll to alert
                alertBox.scrollIntoView({ behavior: 'smooth' });
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
                    document.getElementById('adm-prelude').value = defaults.prelude;
                    document.getElementById('adm-hymn1').value = defaults.hymn1;
                    document.getElementById('adm-prayer-of-day').value = defaults.prayerOfDay;
                    document.getElementById('adm-first-lesson').value = defaults.firstReadingRef;
                    document.getElementById('adm-first-lesson-text').value = defaults.firstReadingText;
                    document.getElementById('adm-gospel').value = defaults.gospelRef;
                    document.getElementById('adm-gospel-text').value = defaults.gospelText;
                    document.getElementById('adm-hymn2').value = defaults.hymn2;
                    document.getElementById('adm-hymn3').value = defaults.hymn3;
                    document.getElementById('adm-offering-music').value = defaults.offeringMusic;
                    document.getElementById('adm-postlude').value = defaults.postlude;
                    document.getElementById('adm-communion-hymns').value = defaults.communionHymns;
                    document.getElementById('adm-announcement').value = defaults.announcement;
                    document.getElementById('adm-assistants').value = defaults.assistants;
                    document.getElementById('adm-pdf-url').value = defaults.pdfUrl;
                    document.getElementById('adm-announcements-pdf-url').value = defaults.announcementsPdfUrl;

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
        simDate.textContent = savedData.date || defaults.date;
        
        const simPrelude = document.getElementById('sim-prelude');
        if (simPrelude) simPrelude.textContent = savedData.prelude || defaults.prelude;

        const simHymn1 = document.getElementById('sim-hymn1');
        if (simHymn1) simHymn1.textContent = savedData.hymn1 || defaults.hymn1;

        const simPrayerOfDay = document.getElementById('sim-prayer-of-day');
        if (simPrayerOfDay) simPrayerOfDay.textContent = savedData.prayerOfDay || defaults.prayerOfDay;

        const simFirstLessonRef = document.getElementById('sim-first-lesson-ref');
        if (simFirstLessonRef) simFirstLessonRef.textContent = savedData.firstReadingRef || defaults.firstReadingRef;

        const simFirstLessonText = document.getElementById('sim-first-lesson-text');
        if (simFirstLessonText) simFirstLessonText.textContent = savedData.firstReadingText || defaults.firstReadingText;

        const simGospelRef = document.getElementById('sim-gospel-ref');
        if (simGospelRef) simGospelRef.textContent = savedData.gospelRef || defaults.gospelRef;

        const simGospelText = document.getElementById('sim-gospel-text');
        if (simGospelText) simGospelText.textContent = savedData.gospelText || defaults.gospelText;

        const simHymn2 = document.getElementById('sim-hymn2');
        if (simHymn2) simHymn2.textContent = savedData.hymn2 || defaults.hymn2;

        const simHymn3 = document.getElementById('sim-hymn3');
        if (simHymn3) simHymn3.textContent = savedData.hymn3 || defaults.hymn3;

        const simOfferingMusic = document.getElementById('sim-offering-music');
        if (simOfferingMusic) simOfferingMusic.textContent = savedData.offeringMusic || defaults.offeringMusic;

        const simPostlude = document.getElementById('sim-postlude');
        if (simPostlude) simPostlude.textContent = savedData.postlude || defaults.postlude;

        const simCommunionHymns = document.getElementById('sim-communion-hymns');
        if (simCommunionHymns) simCommunionHymns.textContent = savedData.communionHymns || defaults.communionHymns;

        const simAnnouncement = document.getElementById('sim-announcement');
        if (simAnnouncement) simAnnouncement.textContent = savedData.announcement || defaults.announcement;

        const simAssistants = document.getElementById('sim-assistants');
        if (simAssistants) simAssistants.textContent = savedData.assistants || defaults.assistants;
        
        const simPdfLink = document.getElementById('sim-pdf-btn');
        if (simPdfLink) simPdfLink.href = savedData.pdfUrl || defaults.pdfUrl;

        const simAnnouncementsPdfLink = document.getElementById('sim-announcements-pdf-btn');
        if (simAnnouncementsPdfLink) simAnnouncementsPdfLink.href = savedData.announcementsPdfUrl || defaults.announcementsPdfUrl;

        // 3. FONT SIZE ACCESSIBILITY ADJUSTER LOGIC
        const scalableContent = document.getElementById('bulletin-scalable-content');
        const btnDec = document.getElementById('btn-font-dec');
        const btnReset = document.getElementById('btn-font-reset');
        const btnInc = document.getElementById('btn-font-inc');
        
        if (scalableContent && btnDec && btnReset && btnInc) {
            const minSize = 0.9;
            const maxSize = 1.5;
            const step = 0.15;
            const defaultSize = 1.05;
            
            let currentSize = parseFloat(localStorage.getItem('ulc_bulletin_font_size')) || defaultSize;
            
            const updateFontSize = (size) => {
                currentSize = Math.max(minSize, Math.min(maxSize, size));
                scalableContent.style.fontSize = `${currentSize}rem`;
                localStorage.setItem('ulc_bulletin_font_size', currentSize);
                
                // Enable/disable button states
                btnDec.disabled = currentSize <= minSize;
                btnInc.disabled = currentSize >= maxSize;
            };
            
            // Initialize sizing
            updateFontSize(currentSize);
            
            btnDec.addEventListener('click', () => updateFontSize(currentSize - step));
            btnReset.addEventListener('click', () => updateFontSize(defaultSize));
            btnInc.addEventListener('click', () => updateFontSize(currentSize + step));
        }
    }
}
