document.addEventListener('DOMContentLoaded', () => {
    // Initialize LocomotiveScroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,         // Enable smooth scrolling
        smoothMobile: true,   // Enable smooth scrolling on mobile
        multiplier: 0.8,      // Adjust scroll multiplier
        friction: 0.1          // Adjust the friction for a smoother deceleration
    });

    // Update ScrollTrigger when LocomotiveScroll fires a scroll event
    locoScroll.on("scroll", ScrollTrigger.update);

    // ScrollTrigger scroller proxy for smooth scroll container
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform
            ? "transform"
            : "fixed"
    });

    // Hover events for arrows
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            gsap.to('.first_arrow', {
                x: 100,
                duration: 0.1,
                ease: 'none'
            });
            gsap.to('.second_arrow', {
                x: 0,
                duration: 0.1,
                ease: 'none'
            });
            gsap.to('.container::after', {
                width: 10
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to('.first_arrow', {
                x: 0,
                duration: 0.1,
                ease: 'none'
            });
            gsap.to('.second_arrow', {
                x: -100,
                duration: 0.1,
                ease: 'none'
            });
        });
    }

    // Infinite scrolling effect for subscribe div
    gsap.to(".subscribe_div", {
        xPercent: -100,
        duration: 150,
        repeat: -1,
        ease: "none",
    });

    // Subscribe section scaling animation with ScrollTrigger
    gsap.to('.subscribe_section', {
        scale: 1.5,
        y: 40,
        scrollTrigger: {
            trigger: '.subscribe_section',
            scroller: '[data-scroll-container]',
            start: 'top 50%',
            end: 'top -90%',
            scrub: 1,
        },
        ease: "slow(0.1,0.4,false)",
    });

    // Loader animation timeline
    function loaderAnimation() {
        const loaderTimeline = gsap.timeline();

        loaderTimeline.from("#mask-rect", {
            delay: 0.5,
            duration: 2,
            attr: { y: "100%", height: "0%" },
            ease: "slow(0.1,0.9,false)",
        });

        loaderTimeline.to("figure svg", {
            delay: 0.3,
            scale: 0.8,
            y: -100,
            duration: 0.5,
        });

        loaderTimeline.from(".loader_container div", {
            y: "100%",
            duration: 1,
        }, "-=0.5");

        loaderTimeline.to(".loader_container", {
            opacity: 0,
            display: "none",
        });

        loaderTimeline.from(".landing_page_box_2 h2 div div", {
            y: 100,
            duration: 1.2,
        });

        loaderTimeline.from('.subscribe_track', {
            y: 400,
            duration: 1,
        }, "<");

        loaderTimeline.from('.nav', {
            y: 40,
            duration: 0.8,
            opacity: 0,
        }, "-=0.1");

        loaderTimeline.from('.landing_page_box_1', {
            y: 40,
            duration: 0.8,
            opacity: 0,
        }, "-=0.7");
    }

    // Description section animations on scroll
    gsap.from('.description_para_1 div div', {
        y: 100,
        duration: 1.5,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '.description_section',
            scroller: '[data-scroll-container]',
            markers: false,
            start: 'top 85%',
            end: 'top 20%',
        }
    });

    gsap.from('.description_para_2 div div', {
        y: 100,
        duration: 2,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '.description_section',
            scroller: '[data-scroll-container]',
            markers: false,
            start: 'top 65%',
            end: 'top -30%',
        }
    });

    // Feature section scroll animation
    gsap.from('.feature_section', {
        y: 40,
        duration: 1,
        scrollTrigger: {
            trigger: '.feature_section',
            scroller: '[data-scroll-container]',
            start: 'top 90%',
        }
    });

    // Project video section scroll animation
    gsap.from('.project_section_video_gsap', {
        scale: 0.32,
        y: '-80%',
        x: '3%',
        scrollTrigger: {
            trigger: '.project_section_video_gsap',
            scroller: '[data-scroll-container]',
            markers: true,
            start: 'top 25%',
            end: 'top -40%',
            scrub: 2.25,
        },
        ease: "power1.in",
    });

    gsap.to('.project_section_work div:nth-child(1)', {
        x: '55%',
        scrollTrigger: {
            trigger: '.project_section_video_gsap',
            scroller: '[data-scroll-container]',
            markers: true,
            start: 'top 25%',
            end: 'top -30%',
            scrub: 4,
        },
        ease: "slow(0.1,0.4,false)",

    });

    gsap.to('.project_section_work div:nth-child(3)', {
        x: '-55%',
        scrollTrigger: {
            trigger: '.project_section_video_gsap',
            scroller: '[data-scroll-container]',
            markers: true,
            start: 'top 25%',
            end: 'top -30%',
            scrub: 4,
        },
        ease: "slow(0.1,0.4,false)",

    });

    const circle = document.querySelector('.project_video_cursor');

    document.addEventListener('mousemove', (e) => {
        const scrollContainer = document.querySelector('[data-scroll-container]');
        const scrollY = locoScroll.scroll.instance.scroll.y; // Get the current scroll position from Locomotive Scroll

        const x = e.clientX; // Horizontal position of the mouse
        const y = e.clientY; // Vertical position of the mouse adjusted by scroll position

        gsap.to(circle, {
            duration: 0.9,
            x: x,
            y: y,
            ease: "power3.out",
            overwrite: "auto",
        });
    });

    document.querySelector('.project_section_video_gsap').addEventListener("mouseenter", () => {
        gsap.to(circle, {
            scale: 1,
        })
    })

    document.querySelector('.project_section_video_gsap').addEventListener("mouseleave", () => {
        gsap.to(circle, {
            scale: 0,
        })
    })


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

});
