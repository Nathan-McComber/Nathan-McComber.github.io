// Creates the sidebar every time the page is shown
window.addEventListener("onpageshow", createSidebar());


// Inserts html into the element with the sidebar id
function createSidebar() {
    let sidebar = document.getElementById("sidebar");

    // HTML for sidebar
    let sidebarHTML = `
        <div id="name-box">
            <p class="name">Nathan McComber</p>
            <button id="open-nav" onclick="toggleMenu()"><img src="imgs/darkmode_icons/white_bars.svg" alt="Open menu button"></button>
        </div>

        <p>A UX Designer with a passion for helping people by solving end-user problems.</p>

        <div id="contact-buttons">
            <a href="google.com"><img src="imgs/darkmode_icons/email_icon.svg" alt="Email Icon"></a>
            <a href="google.com"><img src="imgs/darkmode_icons/linkedin_icon.svg" alt="LinkedIn Icon"></a>
        </div>

        <p class="nav-item"><a href="index.html">Home</a></p>
        <p class="nav-item"><a href="schedule_app.html">Scheduling App</a></p>
        <p class="nav-item"><a href="travel_website.html">Travel Website</a></p>
        <p class="nav-item"><a href="level_editor.html">Game Level Editor</a></p>

        <div id="secondary-links">
            <p class="nav-item"><a href="other_work.html">Other Work</a></p>
            <p class="nav-item"><a href="about.html">About Me</a></p>
            <!--<button id="modeToggle"><img src="imgs/darkmode_icons/darkmode_toggle.svg" alt="Toggle Button with Darkmode selected"></button>-->
        </div>
    `;
    
    // sets the html of the sidebar
    sidebar.innerHTML = sidebarHTML;

    // SET THE CURRENT PAGE
    // Get the current page's path
    let currentPage = document.location.href;
    currentPage = currentPage.substr(currentPage.lastIndexOf('/') + 1);

    // Get a list of all nav-items
    let navItems = document.getElementsByClassName("nav-item");

    // Add the selected class to the current page when it's found
    for (let i = 0; i < navItems.length; i++) {
        // Get the <a> element and href
        let href = navItems[i].firstChild;
        href = href.getAttribute("href");
        
        // If they're the same then add the selected class
        if (href == currentPage) {
            navItems[i].classList.add("selected");
            //navItems[i].firstChild.textContent = "| " + navItems[i].firstChild.textContent + " |";
        }
    }

    // Select other work if nothing has been selected
    if (document.getElementsByClassName("selected").length == 0) {
        navItems[4].classList.add("selected");
    }
}

/* Opens the menu in mobile view */
function toggleMenu() {
    // Track if it's on/off
    let open = false;

    // Get the sidebar
    let sidebar = document.getElementById("sidebar");

    // Get all children
    let navContent = sidebar.children;

    // Toggle all children (starting after name-box)
    for (let i = 1; i < navContent.length; i++) {
        let item = navContent[i];

        // Toggle
        if (item.style.display == "none") {
            item.style.display = "block";
            open = true;
        } else {
            item.style.display = "none";
            open = false;
        }
    }

    if (open) {
        sidebar.style.height = "auto";
        navContent[0].style.borderBottom = "2px solid var(--text-color)";
    } else {
        sidebar.style.height = "32px";
        navContent[0].style.borderBottom = "none";
    }
}

// RESET MENU WHEN SCREEN SIZE INCREASES -------------------------------------------------------------------
const mediaQuery = window.matchMedia('(min-width: 800px)');
// Actually resets the menu
function resetMenu(event) {
    let sidebar = document.getElementById("sidebar");
    let navContent = sidebar.children;

    if (event.matches) {
        // Add content (not name-box since it's already there)
        for (let i = 1; i < navContent.length; i++) {
            navContent[i].style.display = "block";
        }

        // Add border + sidebar height
        navContent[0].style.borderBottom = "2px solid var(--text-color)";
        sidebar.style.height = "85vh";
    } else {
        // Remove content (except for name-box)
        for (let i = 1; i < navContent.length; i++) {
            navContent[i].style.display = "none";
        }

        // Remove border + sidebar height
        navContent[0].style.borderBottom = "none";
        sidebar.style.height = "32px";
    }
}
mediaQuery.addListener(resetMenu);


// LIGHTBOX ------------------------------------------------------------------------------------------------
let main = document.getElementsByTagName("main")[0];
let allImages = main.getElementsByTagName("img");

// Add an event listener to every image in main
for (let i = 0; i < allImages.length; i++) {
    // Only allow gallery with the class expandable
    if (allImages[i].classList.contains("expandable")) {
        allImages[i].addEventListener("click", openLightbox.bind(this, allImages[i]));
    }
}

// Opens the lightbox
function openLightbox(imgElement) {
    // Block scrolling
    document.body.style.overflowY = "hidden";

    // Make a background
    let background = document.createElement("div");
    background.id = "lightbox-bg";

    // Make the bigger image
    let image = document.createElement("img");
    image.src = imgElement.src;
    image.id = "light-img";
    

    // Make a close button
    let closeBtn = document.createElement("button");
    closeBtn.id = "close-btn";
    closeBtn.addEventListener("click", closeLightbox.bind(this));

    let btnIcon = document.createElement("img");
    btnIcon.src = "imgs/darkmode_icons/close_icon.svg";
    btnIcon.alt = "Close button";
    btnIcon.id = "close-btn-icon";
    closeBtn.appendChild(btnIcon); // Add the image to the button

    // Add the elements
    document.body.appendChild(background);
    document.body.appendChild(image);
    document.body.appendChild(closeBtn);
}

// Closes the lightbox
function closeLightbox() {
    // Allow scrolling
    document.body.style.overflowY = "scroll";

    let background = document.getElementById("lightbox-bg");
    let image = document.getElementById("light-img");
    let closeBtn = document.getElementById("close-btn");

    document.body.removeChild(background);
    document.body.removeChild(image);
    document.body.removeChild(closeBtn);
}

// GALLERY / SLIDE VIEWER
let imgNum; // declare variable to use in the galleries

function openGallery(imgPath, numOfImgs) {
    // Block scrolling
    document.body.style.overflowY = "hidden";

    // Reset image count
    imgNum = 0;

    // Create background 
    let background = document.createElement("div");
    background.id = "gallery-bg";
    
    // Create image
    let image = document.createElement("img");
    image.id = "gallery-img";
    image.src = imgPath + "0.png";

    // Create buttons + img count
    let btnContainer = document.createElement("div");
    btnContainer.id = "gallery-btns";
    btnContainer.innerHTML = 
    `<button class="gallery-btn" onclick="updateGalleryImg(false, '${imgPath}', ${numOfImgs})"><img src="imgs/darkmode_icons/left_white.svg" alt="Previous image button"></button>
    <p id="gallery-label">${imgNum + 1}/${numOfImgs}</p>
    <button class="gallery-btn" onclick="updateGalleryImg(true, '${imgPath}', ${numOfImgs})"><img src="imgs/darkmode_icons/right_white.svg" alt="Next image button"></button>
    `;

    // Create close button
    let closeBtn = document.createElement("button");
    closeBtn.id = "close-btn";
    closeBtn.addEventListener("click", closeGallery.bind(this));

    let btnIcon = document.createElement("img");
    btnIcon.src = "imgs/darkmode_icons/close_icon.svg";
    btnIcon.alt = "Close button";
    btnIcon.id = "close-btn-icon";
    closeBtn.appendChild(btnIcon); // Add the image to the button

    // Add the elements to the page
    document.body.appendChild(background);
    document.body.appendChild(image);
    document.body.appendChild(btnContainer);
    document.body.appendChild(closeBtn);
}

// Updates the image
function updateGalleryImg(isNext, imgPath, numOfImgs) {
    // Allow scrolling
    document.body.style.overflowY = "scroll";

    // Get relevant elements
    let image = document.getElementById("gallery-img");
    let label = document.getElementById("gallery-label");

    // Update number to the next image
    if (isNext) {
        imgNum++;

        if (imgNum >= numOfImgs) {
            imgNum = 0;
        }
    } else {
        imgNum--;

        if (imgNum < 0) {
            imgNum = numOfImgs - 1;
        }
    }

    // Update the image
    image.src = imgPath + imgNum + ".png";
    label.textContent = (imgNum + 1) + "/" + numOfImgs;
}

// Close the gallery
function closeGallery() {
    // Get all relevant elements
    let background = document.getElementById("gallery-bg");
    let image = document.getElementById("gallery-img");
    let btnContainer = document.getElementById("gallery-btns");
    let closeBtn = document.getElementById("close-btn");

    // Remove elements
    document.body.removeChild(background);
    document.body.removeChild(image);
    document.body.removeChild(btnContainer);
    document.body.removeChild(closeBtn);
}

/*
    NOTES:
    - Add arrow keys for gallery
    - Allow ESC key for exiting lightbox + gallery
    - Can only put lightboxes on certain images
*/