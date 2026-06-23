document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const nav = document.querySelector('.nav');

  // Add box-shadow & white background on scroll past 80px
  const handleScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once at load in case page starts scrolled
  handleScroll();

  // Hamburger toggle for mobile (Dropdown menu)
  if (hamburgerBtn && nav) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = nav.classList.toggle('active');
      hamburgerBtn.classList.toggle('active', isExpanded);
      header.classList.toggle('menu-open', isExpanded);
    });

    // Close mobile dropdown when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        header.classList.remove('menu-open');
      });
    });

    // Close mobile dropdown when clicking outside the header
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && !header.contains(e.target)) {
        nav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        header.classList.remove('menu-open');
      }
    });
  }

  // 1. Create and append Floating Social Menu (with WhatsApp, Facebook, Instagram, Phone Call)
  const container = document.createElement('div');
  container.className = 'floating-socials-container';

  const subMenu = document.createElement('div');
  subMenu.className = 'floating-socials-menu';

  // Sub-button 1: Phone Call
  const phoneBtn = document.createElement('a');
  phoneBtn.href = 'tel:+918767715490';
  phoneBtn.className = 'social-sub-btn phone-btn';
  phoneBtn.setAttribute('aria-label', 'Call Us');
  phoneBtn.innerHTML = `
    <i class="ti ti-phone"></i>
    <span class="social-tooltip">Call Us</span>
  `;

  // Sub-button 2: Instagram
  const instaBtn = document.createElement('a');
  instaBtn.href = 'https://instagram.com'; // Change to actual Instagram URL if needed
  instaBtn.target = '_blank';
  instaBtn.rel = 'noopener noreferrer';
  instaBtn.className = 'social-sub-btn instagram-btn';
  instaBtn.setAttribute('aria-label', 'Instagram');
  instaBtn.innerHTML = `
    <i class="ti ti-brand-instagram"></i>
    <span class="social-tooltip">Instagram</span>
  `;

  // Sub-button 3: Facebook
  const fbBtn = document.createElement('a');
  fbBtn.href = 'https://facebook.com'; // Change to actual Facebook URL if needed
  fbBtn.target = '_blank';
  fbBtn.rel = 'noopener noreferrer';
  fbBtn.className = 'social-sub-btn facebook-btn';
  fbBtn.setAttribute('aria-label', 'Facebook');
  fbBtn.innerHTML = `
    <i class="ti ti-brand-facebook"></i>
    <span class="social-tooltip">Facebook</span>
  `;

  // Main WhatsApp Button
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/918767715490';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.className = 'whatsapp-floating-btn';
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.195-1.106a7.9 7.9 0 0 0 3.79.982h.003c4.366 0 7.925-3.558 7.929-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.6-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.6 6.592m3.629-4.902c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
    <span class="wa-tooltip">Chat on WhatsApp</span>
  `;

  // Assemble floating socials container
  subMenu.appendChild(phoneBtn);
  subMenu.appendChild(instaBtn);
  subMenu.appendChild(fbBtn);
  container.appendChild(subMenu);
  container.appendChild(waBtn);
  document.body.appendChild(container);

  // 2. Create and append Scroll-to-Top Button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // 3. Scroll Reveal Animation via IntersectionObserver
  const sections = document.querySelectorAll('section');

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12 // Trigger slightly early
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
});
