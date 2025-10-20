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
    Flip,
    PixiPlugin
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
    autoAlpha: 0,
    y: 300,
    ease: "elastic.out(1,0.3)",
    delay: 1.5,
  });

  gsap.from("#gradasibmud1", {
    duration: 5.5,
    autoAlpha: 0,
    y: 300,
    ease: "elastic.out(1,0.3)",
    delay: 1.5,
  });

  gsap.from("#gradasibmud2", {
    duration: 5.5,
    autoAlpha: 0,
    y: 600,
    ease: "elastic.out(1,0)",
    delay: 1.5,
  });

  gsap.from("#gradasibmud3", {
    width: 0,
    duration: 5.9,
    autoAlpha: 0,
    ease: "power3.out",
    delay: 4,
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

  let splitdefinisi = SplitText.create(".definisi", {
    type: "words, chars, lines",
    aria: "hidden",
  });

  gsap.from(splitdefinisi.words, {
    duration: 2,
    y: 50,
    autoAlpha: 0,
    stagger: 0.01,
    ease: "power4.out",
    delay: 3.5,
  });

  let splitdefinisi2 = SplitText.create(".definisi2", {
    type: "words, chars, lines",
    aria: "hidden",
  });

  gsap.from(splitdefinisi2.words, {
    duration: 2,
    y: 50,
    autoAlpha: 0,
    stagger: 0.01,
    ease: "power4.out",
    delay: 4.5,
  });

  gsap.from(".panahdefin", {
    duration: 2,
    y: 50,
    autoAlpha: 0,
    ease: "power4.out",
    delay: 4.5,
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
    aria: "hidden",
  });

  let splitabout = SplitText.create(".tentang", {
    type: "words, chars, lines",
    aria: "hidden",
    // mask: "lines",
  });

  let splitblog = SplitText.create(".blogu", {
    type: "words, chars, lines",
    aria: "hidden",
    // mask: "lines",
  });

  // let splitcp = SplitText.create(".textport", {
  //   type: "words, chars, lines",
  //   aria: "hidden",
  //   // mask: "lines",
  // });

  // gsap.from(splitabout.words, {
  //   scrollTrigger: ".tent",
  //   yPercent: 100,
  //   autoAlpha: 0,
  //   duration: 1.5,
  //   easae: "power3.out",
  // });

  // gsap.from(splitblog.words, {
  //   scrollTrigger: ".blogu",
  //   yPercent: 100,
  //   autoAlpha: 0,
  //   duration: 1.5,
  //   easae: "power3.out",
  // });

  // let tlblogu = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#blog",
  //     pin: true,
  //     start: "top top",
  //     end: "+=500",
  //     scrub: 1,
  //     snap: {
  //       snapTo: "labels",
  //       duration: { min: 0.2, max: 7 },
  //       delay: 1,
  //       ease: "power3.out",
  //     },
  //   },
  // });

  // tlblogu
  //   .addLabel("start")
  //   .from(splitblog.chars, {
  //     yPercent: 50,
  //     autoAlpha: 0,
  //     filter: "blur(8px)",
  //     duration: 2,
  //     stagger: 0.1,
  //   })
  //   .addLabel("end");

  gsap.from(splitblog.words, {
    autoAlpha: 0,
    duration: 3,
    filter: "blur(8px)",
    ease: "sine.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".blogu",
      toggleActions: "restart pause resume none",
    },
  });

  gsap.from(splitabout.words, {
    autoAlpha: 0,
    duration: 3,
    filter: "blur(8px)",
    ease: "sine.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".tentang",
      toggleActions: "restart pause resume none",
      // start: "clamp(top center)",
      // end: "clamp(bottom center)",
    },
  });

  gsap.from(splitport.words, {
    yPercent: 100,
    autoAlpha: 0,
    duration: 1.5,
    filter: "blur(8px)",
    ease: "sine.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".textportfolio",
      toggleActions: "restart pause resume none",
      // start: "clamp(top center)",
      // end: "clamp(bottom center)",
    },
  });

  gsap.from(".button--stroke", {
    height: 0,
    width: 0,
    autoAlpha: 0,
    duration: 2,
    delay: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".button--stroke",
      toggleActions: "restart pause resume none",
    },
  });

  gsap.from(".button--stroke .button__label", {
    autoAlpha: 0,
    duration: 1.5,
    delay: 2.9,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".button--stroke",
      toggleActions: "restart pause resume none",
    },
  });

  // let tlabout = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#about",
  //     pin: true,
  //     start: "top top",
  //     end: "+=500",
  //     scrub: 1,
  //     snap: {
  //       snapTo: "labels",
  //       duration: { min: 0.2, max: 7 },
  //       delay: 1,
  //       ease: "since.out",
  //     },
  //   },
  // });

  // tlabout
  //   .addLabel("start")
  //   .from(splitabout.words, {
  //     yPercent: 100,
  //     autoAlpha: 0,
  //     filter: "blur(8px)",
  //     duration: 2,
  //     stagger: 0.1,
  //   })
  //   .addLabel("end");

  const cp = document.querySelector("#portfolio");
  const panels = gsap.utils.toArray(".panel");

  smoother.effects(".panel", {
    speed: 1,
    lag: (i) => i * 1,
  });

  // -------------------------------------------------------------scroll--------------------------------------//
  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: cp,
      pin: true,
      start: "top top",
      end: () => "+=" + cp.offsetWidth,
      scrub: 1,
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 30 },
        delay: 3,
        ease: "power4.out",
      },
    },
  });

  tl1
    .addLabel("start")
    // .from(".textproject", {
    //   yPercent: 100,
    //   autoAlpha: 0,
    //   filter: "blur(8px)",
    //   duration: 1,
    // })
    // .addLabel("judul")
    // .from(splitport.words, {
    //   yPercent: 100,
    //   autoAlpha: 0,
    //   filter: "blur(8px)",
    //   duration: 2,
    // })
    // .addLabel("button1")
    // .from(".button", {
    //   scale: 0,
    //   height: 0,
    //   autoAlpha: 0,
    //   duration: 2,
    // })
    // .addLabel("button")
    // .from(".button", { width: 0, duration: 2 })
    // .addLabel("button_label")
    // .from(".button__label", { autoAlpha: 0, duration: 2 })
    // .addLabel("panel")
    .to(".panel", {
      yPercent: -170 * (panels.length - 1),
      duration: 7,
      ease: "none",
    })
    // .addLabel("button_labelend")
    // .to(".button__label", { autoAlpha: 0, duration: 2 })
    // .addLabel("buttonend")
    // .to(".button", { width: 0, duration: 3 })
    // .addLabel("button1end")
    // .to(".button", { scale: 0, height: 0, autoAlpha: 0, duration: 2 })
    // .addLabel("tengah")
    // .to(splitport.words, {
    //   yPercent: -100,
    //   autoAlpha: 0,
    //   duration: 2,
    //   filter: "blur(8px)",
    // })
    // .addLabel("judulend")
    // .to(".textproject", {
    //   yPercent: -100,
    //   autoAlpha: 0,
    //   filter: "blur(8px)",
    // })

    .addLabel("end");

  // gsap.from(splitcp.chars, {
  //   autoAlpha: 0,
  //   duration: 3,
  //   filter: "blur(8px)",
  //   ease: "sine.out",
  //   stagger: 0.1,
  //   scrollTrigger: {
  //     trigger: "#portfolio",
  //     start: "clamp(top center)",
  //     end: "clamp(bottom center)",
  //   },
  // });
});
