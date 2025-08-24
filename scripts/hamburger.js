var menuEnabled = false;

// Turns the hamburger menu on/off
function toggleMenu() {
    let menu = document.getElementById("hamburger-menu");

    // Show/hide menu
    if (!menuEnabled) {
        // SHOW MENU
        menu.style.top = "5vh";

        menuEnabled = true;
    } else {
        // HIDE MENU
        menu.style.top = "-12vh";

        menuEnabled = false;
    }
}