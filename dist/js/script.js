//Navbar Fixed
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

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

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
