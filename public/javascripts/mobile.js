// For mobile screens
if (screen.width < 700 || document.documentElement.clientWidth < 700) {
    document.getElementById("content").style.width = "100%";
}
else {
    document.getElementById("content").style.width = "700px";
}

// For a resized screen
function resize() {
    if (document.documentElement.clientWidth < 700) {
        document.getElementById("content").style.width = "100%";
    }
    else {
        document.getElementById("content").style.width = "700px";
    }
}