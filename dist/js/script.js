// //Three JS
// import * as THREE from "three";

// const canvas = document.getElementById(".badan");
// const renderer = new THREE.WebGLRenderer({
//   canvas,
//   antialias: true,
//   preserveDrawingBuffer: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.main(window.devicePixelRatio, 2));

// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xe3edb);
// const camera = new THREE.PerspectiveCamera(
//   45,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100
// );

// Gsap
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

  console.clear();

  window.onscroll = function () {
    const header = document.querySelector("header");
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
      header.classList.add("navbar-fixed");
    } else {
      header.classList.remove("navbar-fixed");
    }
  };

  //Hamburger
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  const menuList = document.querySelector("#menu-list");
  const navLinks = navMenu.querySelectorAll("a");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
    // Saat menu aktif (hamburger-active), ubah tata letak ul menjadi vertikal.
    if (hamburger.classList.contains("hamburger-active")) {
      menuList.classList.remove("flex"); // Hapus flex horizontal
      navMenu.classList.remove(
        "rounded-full",
        "left-1/2",
        "translate-x-[-50%]"
      );
      slider.classList.add("hidden");
      navMenu.classList.add("left-0", "mt-16", "rounded-2xl");
      menuList.classList.add("flex-col", "items-start");
    } else {
      slider.classList.remove("hidden");
      menuList.classList.remove("flex-col", "items-start");
      navMenu.classList.remove("left-0", "mt-16", "rounded-2xl");
      navMenu.classList.add("rounded-full", "left-1/2", "translate-x-[-50%]");
      menuList.classList.add("flex"); // Kembalikan ke flex horizontal
    }
  });

  // ---------------------------------------------Slider Vertikal------------------------------------//

  // let slider = document.querySelector("#slider");
  // let list_items = document.querySelectorAll("#nav-menu ul li");

  // let index_value = 0;
  // let top_position = 0; // Mengubah dari 'left_position' menjadi 'top_position'
  // let left_position = 0;

  // hamburger.addEventListener("click", function () {
  //   hamburger.classList.toggle("hamburger-active");
  //   navMenu.classList.toggle("hidden");
  //   // Saat menu aktif (hamburger-active), ubah tata letak ul menjadi vertikal.
  //   if (hamburger.classList.contains("hamburger-active")) {
  //     list_items.forEach((list_item, index) => {
  //       // Mengatur tinggi dan lebar awal slider
  //       slider.style.height = list_items[0].clientHeight + "px";
  //       slider.style.width = "100%"; // Mengatur lebar penuh agar slider terlihat rapi secara vertikal

  //       list_item.onclick = function () {
  //         // Mengubah dari 'width' menjadi 'height' dan 'clientWidth' menjadi 'clientHeight'
  //         slider.style.height = list_item.clientHeight + "px";
  //         index_value = index;
  //         get_top_position(); // Memanggil fungsi baru untuk posisi vertikal
  //         slider.style.top = top_position + "px"; // Mengubah dari 'left' menjadi 'top'
  //         top_position = 0; // Mengatur ulang posisi untuk perhitungan berikutnya
  //       };
  //     });

  //     // Mengubah fungsi 'get_left_position' menjadi 'get_top_position'
  //     function get_top_position() {
  //       for (let i = 0; i < index_value; i++) {
  //         const element = list_items[i];
  //         top_position += element.clientHeight; // Menambahkan tinggi elemen, bukan lebar
  //       }
  //     }
  //   }
  // });

  // ---------------------------------------------Slider Horizontal------------------------------------//

  let slider = document.querySelector("#slider");
  let list_items = document.querySelectorAll("#nav-menu ul li");

  let index_value = 0;
  let left_position = 0;

  list_items.forEach((list_item, index) => {
    //setting intial left position and width of slider.
    slider.style.width = list_items[0].clientWidth + "px";
    slider.style.width = "0px";

    list_item.onclick = function () {
      slider.style.width = list_item.clientWidth + "px";
      index_value = index;
      get_left_position();
      slider.style.left = left_position + "px";
      left_position = 0;
    };
  });

  function get_left_position() {
    for (let i = 0; i < index_value; i++) {
      const element = list_items[i];
      left_position += element.clientWidth;
    }
  }

  //Menambahkan event listener ke setiap tautan
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Hapus kelas text-opacity-100 dan tambahkan text-opacity-50 dari semua tautan
      navLinks.forEach((otherLink) => {
        otherLink.classList.remove("opacity-100");
        otherLink.classList.remove("font-bold");
        otherLink.classList.remove("text-white");
        otherLink.classList.add("opacity-50");
      });

      // Tambahkan text-opacity-100 dan hapus text-opacity-50 dari tautan yang diklik
      link.classList.remove("opacity-50");
      link.classList.add("text-white");
      link.classList.add("font-bold");
      link.classList.add("opacity-100");
    });
  });

  // Tombol Flair Lihat Portfolio start
  class Button {
    constructor(buttonElement) {
      this.block = buttonElement;
      this.init();
      this.initEvents();
    }

    init() {
      const el = gsap.utils.selector(this.block);

      this.DOM = {
        button: this.block,
        flair: el(".button__flair"),
      };

      this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
      this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
    }

    getXY(e) {
      const { left, top, width, height } =
        this.DOM.button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    }

    initEvents() {
      this.DOM.button.addEventListener("mouseenter", (e) => {
        const { x, y } = this.getXY(e);

        this.xSet(x);
        this.ySet(y);

        gsap.to(this.DOM.flair, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      this.DOM.button.addEventListener("mouseleave", (e) => {
        const { x, y } = this.getXY(e);

        gsap.killTweensOf(this.DOM.flair);

        gsap.to(this.DOM.flair, {
          xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
          yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      this.DOM.button.addEventListener("mousemove", (e) => {
        const { x, y } = this.getXY(e);

        gsap.to(this.DOM.flair, {
          xPercent: x,
          yPercent: y,
          duration: 0.4,
          ease: "power2",
        });
      });
    }
  }

  const buttonElements = document.querySelectorAll('[data-block="button"]');

  buttonElements.forEach((buttonElement) => {
    new Button(buttonElement);
  });

  const tbh = document.querySelector(".button");
  const combinedHoverTimeline = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5, ease: "power2.inOut" },
  });

  combinedHoverTimeline.to("#panah", {
    // Properti khusus MorphSVG: targetkan ID path tujuan
    delay: 0.3,
    morphSVG: "#tambah",
    duration: 0.4,
  });
  // Saat Mouse Masuk (Hover)
  tbh.addEventListener("mouseenter", () => {
    combinedHoverTimeline.play(); // Memainkan timeline (termasuk morphing)
  });

  // Saat Mouse Keluar
  tbh.addEventListener("mouseleave", () => {
    combinedHoverTimeline.reverse(); // Membalikkan timeline (kembali ke bentuk awal)
  });

  // Tombol Flair Lihat Portfolio End

  // gsap code here!
  Draggable.create("#bintang1", {
    type: "rotation",
    inertia: true,
  });

  Draggable.create("#bintang2", {
    type: "rotation",
    inertia: true,
  });

  gsap.from("#logo", {
    duration: 2,
    opacity: 0,
    ease: "power4.out",
    delay: 1,
    x: -100,
  });

  gsap.from("#nav-menu ul li a", {
    duration: 2.5,
    ease: CustomEase.create("custom", "M0,0 C0.92,-0.064 0.486,1 1,1 "),
    width: 0,
    height: 0,
    opacity: 0,
    clearProps: "all",
  });

  gsap.from("#gradasibmud", {
    duration: 5.5,
    ease: "elastic.out(1,0.3)",
    y: 300,
    delay: 1.5,
  });

  gsap.from("#gradasibmud2", {
    duration: 5.5,
    ease: "elastic.out(1,0)",
    y: 600,
    delay: 1.5,
  });

  SplitText.create("#judul", {
    type: "lines, words, chars",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        duration: 3,
        y: 200,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "elastic.out(1,1)",
        delay: 1,
      });
    },
  });

  SplitText.create("#subjudul", {
    type: "lines, chars, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        duration: 2,
        x: 700,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "elastic.out(1,1)",
        delay: 2,
      });
    },
  });

  gsap.from("#bintang1", {
    duration: 5,
    rotation: 720,
    ease: "elastic.out(1,0.3)",
    scale: 0,
    delay: 2.5,
  });

  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
    smoothTouch: 0.5,
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Mencegah perilaku default jump

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: targetElement,
            offsetY: 0, // Atur offset jika diperlukan (misalnya untuk header fixed)
          },
          ease: "back.out",
          // gsap.to(smoother, {
          //   duration: 2,
          //   scrollTop: smoother.offset(targetId, "center center"),
          //   ease: "back.out",
        });
      }
    });
  });

  let splitport = SplitText.create(".textportfolio", {
    type: "words, chars, lines",
    mask: "lines",
  });

  let splitabout = SplitText.create(".tent", {
    type: "words, chars, lines",
    mask: "lines",
  });

  let tlabout = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: "#about",
      pin: true, // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=500", // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: { min: 0.2, max: 7 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 1, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.29,0 0.408,0.263 0.408,0.263 0.484,0.402 0.439,0.929 0.579,0.929 0.759,0.929 0.695,0.7 0.8,0.7 0.876,0.7 0.81,1 1,1 "
        ), // the ease of the snap animation ("power3" by default)
      },
    },
  });

  tlabout
    .addLabel("start")
    .from(splitabout.words, {
      yPercent: 100,
      opacity: 0,
      autoAlpha: 0,
    })
    .addLabel("end");

  const cp = document.querySelector("#portfolio");
  const panels = gsap.utils.toArray(".panel");

  smoother.effects(".panel", {
    speed: 1,
    lag: (i) => i * 1,
  });

  let tl1 = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: cp,
      pin: true, // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: () => "+=" + cp.offsetWidth, // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: { min: 0.2, max: 7 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 3, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.29,0 0.408,0.263 0.408,0.263 0.484,0.402 0.439,0.929 0.579,0.929 0.759,0.929 0.695,0.7 0.8,0.7 0.876,0.7 0.81,1 1,1 "
        ), // the ease of the snap animation ("power3" by default)
      },
    },
  });

  // add animations and labels to the timeline
  tl1
    .addLabel("start")
    .from(".textproject", {
      yPercent: 100,
      opacity: 0,
      autoAlpha: 0,
    })
    .addLabel("judul")
    .from(splitport.words, {
      yPercent: 100,
      autoAlpha: 0,
      duration: 2,
    })
    .addLabel("button1")
    .from(".button", { scale: 0, height: 0, autoAlpha: 0, duration: 2 })
    .addLabel("button")
    .from(".button", { width: 0, duration: 2 })
    .addLabel("button_label")
    .from(".button__label", { autoAlpha: 0, duration: 2 })
    .addLabel("panel")
    .to(".panel", {
      yPercent: -100 * (panels.length - 1),
      duration: 2,
      ease: "none",
    })
    .addLabel("end");
});
