// HTML DEFINITIONS

let pangolinHTML = `
<div id="bg"></div>
<button onclick="closeProject();" id="close-btn"><img src="imgs/darkmode_icons/close_icon.svg" alt="Close Button"></button>
<img src="imgs/other_work/pangolin_infographic.png" alt="An infographic about pangolin trafficking">`;

// ACTUAL CODE --------------------------------------------------------------------------------------

// Opens the project in other work
function openProject(projectHTML) {
    // Lock main scrolling
    let main = document.getElementsByTagName("main")[0];
    main.style.overflowY = "hidden";

    let content = document.createElement("div");
    content.id = "other-work";
    content.innerHTML = projectHTML;

    // Add the content
    document.body.appendChild(content);
}

// Closes the project view
function closeProject() {
    let projectView = document.getElementById("other-work");

    // Close it
    document.body.removeChild(projectView);
}