var menuEnabled = false;

// Turns the hamburger menu on/off
function toggleMenu() {
    let menu = document.getElementById("hamburger-menu");
    let nav = document.getElementsByTagName("nav")[0];

    // Show/hide menu
    if (!menuEnabled) {
        // SHOW MENU
        menu.style.top = nav.style.height + "5vh";
        menuEnabled = true;

    } else {
        // HIDE MENU
        menu.style.top = "-16vh";

        menuEnabled = false;
    }
}