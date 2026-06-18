document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-track');
  
  if (carouselTrack) {
    // Pause animation when mouse enters the carousel track
    carouselTrack.addEventListener('mouseenter', () => {
      carouselTrack.style.animationPlayState = 'paused';
    });
    
    // Resume animation when mouse leaves the carousel track
    carouselTrack.addEventListener('mouseleave', () => {
      carouselTrack.style.animationPlayState = 'running';
    });
    
    // Support touch devices (pause on touch, resume on lift/scroll)
    carouselTrack.addEventListener('touchstart', () => {
      carouselTrack.style.animationPlayState = 'paused';
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', () => {
      carouselTrack.style.animationPlayState = 'running';
    }, { passive: true });
  }
});
