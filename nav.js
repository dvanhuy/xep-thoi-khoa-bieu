const nav = document.getElementById('nav-choose')
const clickmenu = document.getElementById('button-menu')
const contentshow = document.getElementById('main-content')
clickmenu.onclick = function(){
    nav.classList.toggle("menu-hide")
    contentshow.classList.toggle("content-show")
}