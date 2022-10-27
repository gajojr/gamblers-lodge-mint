// JavaScript For Responsive Menu

const menu_toggler = document.querySelector(".menu-toggler");
const menu = document.querySelector(".menu");

menu_toggler.addEventListener("click", function(){
    this.classList.toggle("active");
    menu.classList.toggle("active");
})

