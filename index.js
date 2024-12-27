
// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
});
console.log("Locomotive Scroll initialized", locoScroll);

// Update ScrollTrigger whenever Locomotive Scroll updates
locoScroll.on("scroll", ScrollTrigger.update);

// Set ScrollTrigger to use Locomotive Scroll's scroller
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform
        ? "transform"
        : "fixed"
});

// Refresh ScrollTrigger and Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

document.querySelector('.container').addEventListener('mouseenter', () => {
    gsap.to('.first_arrow', {
        x: 100,
        duration: 0.1,
        ease: 'none'
    })
    gsap.to('.second_arrow', {
        x: 0,
        duration: 0.1,
        ease: 'none'
    })
    gsap.to('.container::after', {
        width: 10
    })

})

document.querySelector('.container').addEventListener('mouseleave', () => {
    gsap.to('.first_arrow', {
        x: 0,
        duration: 0.1,
        ease: 'none'
    })
    gsap.to('.second_arrow', {
        x: -100,
        duration: 0.1,
        ease: 'none'
    })
})

// gsap.to(".subscribe_div", {
//     xPercent: -100,
//     duration: 60,
//     repeat: -1,
//     ease: "none",
// });

function landingPageLoadingAnimation() {
    gsap.from(".landing_page_box_2 h2 div div", {
        delay: 0.5,
        y: 100,
        duration: 1.2,
    });

    const tl = gsap.timeline();

    tl.from('.subscribe_track', {
        delay: 0.5,
        y: 400,
        duration: 1,
    })

    tl.from('.nav', {
        y: 40,
        duration: 0.8,
        opacity: 0,
    }, "-=0.1")

    tl.from('.landing_page_box_1', {
        y: 40,
        duration: 0.8,
        opacity: 0,
    }, "-=0.7")
}
gsap.to('.subscribe_section', {
    scale: 1.5,
    scrollTrigger: {
        trigger: '.subscribe_section',
        scroller: '[data-scroll-container]', // Ensure this is correctly set for smooth scrolling
        markers: true,  // Optional, only for debugging
        start: 'top 45%',  // Adjust this if the trigger isn't starting as expected
        end: 'top -80%',    // Adjust this if the animation is ending too soon or too late
        scrub: 3,      // Use true for a smooth scrub effect
    }
});