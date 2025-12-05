const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements1 = document.querySelectorAll('.hidden');
hiddenElements1.forEach((el) => observer1.observe(el));


/* left menu animations on vertical scrolling */
const sectionList = ["about","projects","research","publications","talks"];
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('.menu a');

// Smooth scrolling on click
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// var timer = null;
// var currentPos = 0;
// var currentSection = 0;

// let scrollDir = 0;
// window.addEventListener('wheel', (event) => {

//     event.preventDefault();
//     event.stopPropagation();
//     scrollDir = event.deltaY > 0 ? 1 : -1;

//     if (timer !== null) {
//         clearTimeout(timer);
//     }
//     timer = setTimeout(snapScroll, 75);

// }, { passive: false });


// // snap to next section and animate menu
// function snapScroll() {
//     currentSection += scrollDir;
//     if (currentSection < 0) currentSection = 0;
//     if (currentSection >= sections.length) currentSection = sections.length - 1;
//     sections[currentSection].scrollIntoView({ behavior: 'smooth' });

//     let id = sections[currentSection].getAttribute('id');
//     animateMenu(id);
// };

// function scrollToSec(id) {

//     const sectionList = ["about","projects","research","publications","talks"];
//     const isSection = (element) => element === id;

//     currentSection = sectionList.findIndex(isSection);
//     if (currentSection > 1) currentSection += 2; // sum the number of projects
//     if (currentSection > 2) currentSection += 0; // sum the number of research lines
//     animateMenu(id);

// };

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            animateMenu(id);
        }
    });
}, {
    rootMargin: '-20% 0px -70% 0px',  // Triggers when section is roughly in the upper-middle of viewport
    threshold: 0
});

// Observe all sections
sections.forEach(section => observer2.observe(section));

function animateMenu(id) {

    navLinks.forEach(link => {
        link.classList.remove('current');
        document.querySelector('.menu a[href*=' + id + ']').classList.add('current');
    });

    let lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        if(line.getAttribute('id') == id + '-dyn') {
            line.style.transform = 'translateX(0%)';
        }
        else{
            line.style.transform = 'translateX(-101%)';
        };
    });
};

// toggle project collapse
function toggle_collapse(element) {
    element.classList.toggle("project-active");
    element.children[0].classList.toggle("opened-project");
    element.children[1].classList.toggle("expanded-hr");
}


/* horizontal (infinite) scroll behaviour */
const horizontalScrollers = document.querySelectorAll(".scroller");

//check if user prefers horizontal animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    enableHorizontalScroll();
};

function enableHorizontalScroll() {
    horizontalScrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInside = scroller.querySelector(".scroller_inside");
        const scrollerContent = Array.from(scrollerInside.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInside.appendChild(duplicatedItem);
        });
    });
};


/* collapsible behaviour */
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    this.classList.toggle("active");
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


/* toggle presenation text */
function display_presentation(myid) {
    var el = document.getElementById(myid);
    el.style.opacity = ((el.style.opacity!="100%") ? "100%" : "0%");
}
function hide_presentation(myid) {
    var el = document.getElementById(myid);
    el.style.opacity = ((el.style.opacity!="0%") ? "0%" : "100%");
}


/* expand research description */
function expand_description(el) {
    el.style.height = ((el.style.height!="auto") ? "auto" : "148px");
    // div class research-plus-button
    el.children[1].style.transform = ((el.children[1].style.transform!="rotate(135deg)") ? "rotate(135deg)" : "rotate(0deg)" );
    // div class research-ellipsis
    el.children[3].style.display = ((el.children[3].style.display!="none") ? "none" : "block" );
}
