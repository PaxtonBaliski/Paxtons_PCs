// =====================================================
// PAXTON'S PC's - JAVASCRIPT
// Handles mobile menu, smooth scrolling, and form submission
// =====================================================

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===================== MOBILE MENU TOGGLE ===================== */
    // Get references to mobile menu elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu when hamburger is clicked
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Toggle 'active' class on both toggle button and menu
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    
    /* ===================== SMOOTH SCROLLING ===================== */
    // Add smooth scroll behavior for all anchor links
    // (HTML already has scroll-behavior: smooth, but this adds offset for sticky nav)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" (no target)
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Get navbar height to offset scroll position
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                // Calculate position with offset
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /* ===================== NAVBAR SCROLL EFFECT ===================== */
    // Add shadow to navbar when scrolling down
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove shadow based on scroll position
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    
    /* ===================== CONTACT FORM HANDLING ===================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.service || !formData.message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Create email subject and body
            const subject = `New Quote Request from ${formData.name}`;
            const body = `
Name: ${formData.name}
Email: ${formData.email}
Service Needed: ${formData.service}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}
            `.trim();
            
            // Create mailto link with form data
            const mailtoLink = `mailto:baliskip17@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showFormStatus('Opening your email client... Please send the message to complete your request.', 'success');
            
            // Reset form after a delay
            setTimeout(function() {
                contactForm.reset();
                hideFormStatus();
            }, 5000);
        });
    }
    
    /**
     * Display a status message on the form
     * @param {string} message - The message to display
     * @param {string} type - 'success' or 'error'
     */
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Scroll to the status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    /**
     * Hide the form status message
     */
    function hideFormStatus() {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }
    
    
    /* ===================== ANIMATION ON SCROLL ===================== */
    // Add fade-in animation to elements as they come into view
    // This is a simple implementation - for more complex animations, consider using a library like AOS or Intersection Observer API
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.service-card, .build-card, .review-card');
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Start observing
        observer.observe(element);
    });
    
    
    /* ===================== CONSOLE MESSAGE ===================== */
    // Fun message for developers who open the console
    console.log('%cPAXTON\'S PC\'s', 'font-size: 24px; font-weight: bold; color: #0066ff;');
    console.log('%cLike what you see? This site was built with HTML, CSS, and vanilla JavaScript.', 'font-size: 14px; color: #6c757d;');
    console.log('%cInterested in a custom PC build? Get in touch!', 'font-size: 14px; color: #0066ff;');
    
});


/* ===================== ALTERNATIVE FORM SUBMISSION METHODS ===================== */
/*
    NOTE FOR BEGINNERS: The current form uses "mailto" which opens the user's email client.
    This works, but isn't ideal for all situations. Here are some alternatives:
    
    1. FORMSPREE (Easy, Free tier available)
       - Sign up at https://formspree.io
       - Replace the form handling code above with:
       
       <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
           <!-- your form fields -->
       </form>
    
    2. EMAILJS (Free tier available)
       - Sign up at https://www.emailjs.com
       - Install their library and use their API
       
    3. GOOGLE FORMS (Free, but requires embedding)
       - Create a Google Form
       - Embed it or use the form URL
       
    4. BACKEND SERVER (Most flexible, requires hosting)
       - Use Node.js with Express and Nodemailer
       - Or PHP with mail() function
       - Or Python with Flask/Django and SMTP
    
    For a production website, option 1 (Formspree) or 2 (EmailJS) are recommended
    as they're beginner-friendly and don't require backend development.
*/
