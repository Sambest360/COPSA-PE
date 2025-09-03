document.addEventListener('DOMContentLoaded', function() {
    const bannerBg = document.querySelector('.banner-bg');
    const bannerSection = document.querySelector('.banner-section');
    
    // Only run if banner elements exist
    if (!bannerBg || !bannerSection) return;

    // Set initial position
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Calculate the maximum scroll amount
    const bannerHeight = bannerSection.offsetHeight;
    const maxScroll = bannerHeight * 0.3; // Adjust this value to control the parallax intensity
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const bannerTop = bannerSection.getBoundingClientRect().top + window.scrollY;
        const bannerBottom = bannerTop + bannerHeight;
        
        // Only apply effect when banner is in viewport
        if (scrollY + window.innerHeight > bannerTop && scrollY < bannerBottom) {
            // Calculate scroll progress within the banner
            const scrollProgress = (scrollY - bannerTop) / bannerHeight;
            // Apply inverted parallax effect (moves in the opposite direction of scroll)
            const translateY = -scrollProgress * maxScroll;
            bannerBg.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
        
        ticking = false;
    }
    
    // Use requestAnimationFrame for smoother performance
    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial position update
    updateParallax();
});
