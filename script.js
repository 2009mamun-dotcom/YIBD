// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Number Counter Animation
const counters = document.querySelectorAll('.count');
const speed = 200;

const startCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Start counter when achievement section is visible
let counterDone = false;
window.addEventListener('scroll', () => {
    const achSection = document.getElementById('achievement');
    const sectionPos = achSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !counterDone) {
        startCounter();
        counterDone = true;
    }
});
// Mobile Menu
document.getElementById('menu-btn').onclick = () => document.getElementById('menu').classList.toggle('show');

// Hero Slider
const hTrack = document.getElementById('slider-track');
let hIndex = 0;
setInterval(() => {
    hIndex = (hIndex + 1) % 4;
    if(hTrack) hTrack.style.left = `-${hIndex * 100}%`;
}, 5000);

// Fetch Gallery from JSON
fetch('gallery.json')
    .then(response => response.json())
    .then(data => {
        const galleryContainer = document.getElementById('gallery-container');
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.caption}">
                <div class="gallery-overlay">${item.caption}</div>
            `;
            galleryContainer.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading gallery:', error));
