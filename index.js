
// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
});

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

// // Example animation
// gsap.to(".section", {
//     scrollTrigger: {
//         trigger: ".section",
//         scroller: "[data-scroll-container]", // Use Locomotive Scroll's container
//         start: "top center",
//         end: "bottom center",
//         scrub: true
//     },
//     backgroundColor: "#3F72AF",
//     color: "#fff"
// });

// Refresh ScrollTrigger and Locomotive Scroll
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

document.querySelector('.container').addEventListener('mouseenter', () => {
    gsap.to('.first_arrow', {
        x: 100,
        duration: 0.0001,
        ease: 'none'
    })
    gsap.to('.second_arrow', {
        x: 0,
        duration: 0.0001,
        ease: 'none'
    })
    gsap.to('.container::after', {
        width: 10
    })

})

document.querySelector('.container').addEventListener('mouseleave', () => {
    gsap.to('.first_arrow', {
        x: 0,
        duration: 0.0001,
        ease: 'none'
    })
    gsap.to('.second_arrow', {
        x: -100,
        duration: 0.0001,
        ease: 'none'
    })
})