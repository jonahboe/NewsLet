// For keeping the menu at the top when scrolling
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

document.getElementById("searchBar").hidden = true;
function toggleSearch() {
    switch (document.getElementById("searchBar").hidden) {
        case true:
            document.getElementById("searchBar").hidden = false;
            break;
        default:
            document.getElementById("searchBar").hidden = true;
            break;
    }
}