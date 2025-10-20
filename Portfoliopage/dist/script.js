document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    Draggable,
    InertiaPlugin,
    SplitText,
    ScrollSmoother,
    ScrollTrigger,
    MorphSVGPlugin,
    MotionPathPlugin,
    Flip
  );
});
