document.addEventListener('DOMContentLoaded', () => {
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-btn.next-btn');

  if (carouselWrapper && carouselTrack) {
    let scrollSpeed = 0.8; // Pixels to scroll per frame
    let isPaused = false;
    let pauseTimeout = null;

    function getHalfWidth() {
      return carouselTrack.scrollWidth / 2;
    }

    // Auto scroll step function
    function step() {
      const halfWidth = getHalfWidth();
      if (!isPaused) {
        carouselWrapper.scrollLeft += scrollSpeed;

        // If we scrolled past the first group, wrap around seamlessly
        if (carouselWrapper.scrollLeft >= halfWidth) {
          carouselWrapper.scrollLeft -= halfWidth;
        }
      } else {
        // Even when paused/manually scrolling, wrap around infinitely to prevent hitting bounds
        if (carouselWrapper.scrollLeft >= halfWidth) {
          carouselWrapper.scrollLeft -= halfWidth;
        } else if (carouselWrapper.scrollLeft <= 0) {
          carouselWrapper.scrollLeft += halfWidth;
        }
      }
      requestAnimationFrame(step);
    }

    // Start auto scroll
    requestAnimationFrame(step);

    // Pause on hover
    carouselWrapper.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
      if (!pauseTimeout) {
        isPaused = false;
      }
    });

    // Touch support (pause on touch, resume on lift)
    carouselWrapper.addEventListener('touchstart', () => {
      isPaused = true;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', () => {
      if (!pauseTimeout) {
        isPaused = false;
      }
    }, { passive: true });

    // Function to handle manual scroll clicks
    function manualScroll(direction) {
      isPaused = true;
      
      // Clear any existing resume timeout
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }

      // Calculate scroll step (width of card + gap)
      const card = carouselTrack.querySelector('.testimonial-card');
      const cardWidth = card ? card.offsetWidth : 320;
      const gap = 32;
      const scrollStep = cardWidth + gap;
      const halfWidth = getHalfWidth();

      // Wrap check before manual scroll
      if (direction === -1 && carouselWrapper.scrollLeft <= 10) {
        carouselWrapper.scrollLeft += halfWidth;
      } else if (direction === 1 && carouselWrapper.scrollLeft >= halfWidth - 10) {
        carouselWrapper.scrollLeft -= halfWidth;
      }

      let targetScrollLeft = carouselWrapper.scrollLeft + (direction * scrollStep);

      // Perform smooth scroll
      carouselWrapper.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      // Resume auto-scrolling after 2.5 seconds of inactivity
      pauseTimeout = setTimeout(() => {
        isPaused = false;
        pauseTimeout = null;
      }, 2500);
    }

    // Click events for buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        manualScroll(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        manualScroll(1);
      });
    }
  }
});
