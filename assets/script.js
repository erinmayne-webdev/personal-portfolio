/*Landing page Vanta Animation*/
function initVanta() {
    const landing = document.getElementById("landing-page");

    if (!landing) return;

    if (typeof VANTA === "undefined" || !VANTA.NET) {
        console.error("Vanta failed to load");
        return;
    }

    VANTA.NET({
        el: "#landing-page",

        mouseControls: true,
        touchControls: true,
        gyroControls: true,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,

        color: 0x20B2AA,
        backgroundColor: 0x111111,

        points: 12,
        maxDistance: 22,
        spacing: 18
    });
}

/* MOBILE NAVIGATION */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

if (hamburger && navMenu) {
hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    });
}

/* SUCCESS MESSAGE POP-UP */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent default form submissiom

    const form = this;
    // send form data to FormSubmit.co
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            // show success overlay
            const overlay = document.getElementById("success-overlay");
            if (overlay) {
                overlay.classList.add("show");

                setTimeout(() => {
                    overlay.classList.remove("show");
                }, 5000);
            }
            form.reset();

        } else {
            alert("There was an error sending your message. Please try again later.");
        }
    })
        .catch(() => {
            alert("There was an error sending your message. Please try again later.");
        });
    });
}

// Close button for success message
const closeSuccessBtn = document.getElementById("close-success");

if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", function () {
        const overlay = document.getElementById("success-overlay");

        if (overlay) {
            overlay.classList.remove("show");
        }
    });
}
// Photography Carousel
document.addEventListener("DOMContentLoaded", () => {
    // DOM ELEMENTS
const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");

const closeBtn = document.querySelector(".close-button")
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const albums = document.querySelectorAll(".album");
    // GALLERY DATA
const galleries = {
    nature: [
            "assets/canon_city.JPG",
            "assets/autumn_river.jpg",
            "assets/tortoise.JPG",
            "assets/alligator.JPG",
            "assets/ostrich.JPG"
        ],
    objects: [
            "assets/HPlights.JPG",
            "assets/jack.jpeg",
            "assets/church.JPG",
        ],
    pets: [
            "assets/honey_bone.jpg",
            "assets/atlas.JPG",
            "assets/timothy.JPG",
        ]
};
    // STATE
let currentGallery = []; 
let currentIndex = 0;

    // FUNCTIONS
function openGallery(type) { // OPEN GALLERY
    currentGallery = galleries[type];
    currentIndex = 0;

    modalImage.src = currentGallery[currentIndex];
    modal.style.display = "flex";

    const showArrows = currentGallery.length > 1;

    if (prevBtn) prevBtn.style.display = showArrows ? "block" : "none";
    if (nextBtn) nextBtn.style.display = showArrows ? "block" : "none";
}

function changeSlide(direction) { // Slide Control: Next, Previous
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1; // wrap to last image
    }
    if (currentIndex >= currentGallery.length) {
        currentIndex = 0; // wrap to first image
    }

    modalImage.src = currentGallery[currentIndex];
}
function closeModal() {
    if (modal) modal.style.display = "none";
}
    // EVENTS
albums.forEach(album => { // album click
    album.addEventListener("click", () => {
        const type = album.dataset.gallery;
        openGallery(type);
    });
});
    // close, prev, next button clicks
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => changeSlide(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => changeSlide(1));
    }
});

// GITHUB INTEGRATION
const username="erinmayne-webdev"

/* Thumbnail Generation */
function getThumbnail(repo) {
    return `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
}
/* Format Titles */
function formatTitle(name) {
    return name.replace(/[-_]/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
}

async function loadRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const grid = document.getElementById("repo-grid");

    repos   
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .forEach(repo => {

            const thumb = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <div class="project-thumbnail">
                    <img src="${thumb}" alt="${repo.name}">
                </div> 

                <h3>${formatTitle(repo.name)}</h3>
                <p>${repo.description || "No description provided"}</p>

                    <div class="terminal">
                        <pre>
 Repo: ${repo.name}
 Stars: ${repo.stargazers_count}
 Updated: ${new Date(repo.updated_at).toLocaleDateString()}
                        </pre>
                    </div>

                    <div class="tags">
                        <span>${repo.language || "Code"}</span>
                        <span>GitHub</span>
                    </div>

                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="github-button">GitHub</a>

                        ${
                            repo.homepage
                            ? `<a href="${repo.homepage}" target="_blank" class="btn demo">Live Demo</a>`
                            : `<span class="btn-demo-disabled">CLI App</span>`
                        }
                    </div>
            `;
            grid.appendChild(card);
        });
}

/* DOM Elements */
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("repo-grid")) {
        loadRepos();
    }
    if (document.getElementById("landing-page")) {
        initVanta();
    }

    /*Hamburger Menu*/
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        // open, close menu
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation(); // prevents instant closure
            navLinks.classList.toggle("active");
        });
        // prevent clicks inside menu from closing menu
        navLinks.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        // outside click closes menu
        document.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
        // link click closes menu
        document.querySelectorAll("#nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
});
