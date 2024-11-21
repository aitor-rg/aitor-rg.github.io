const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show-t');
        }
    });
});

const hiddenElements1 = document.querySelectorAll('.hidden');
hiddenElements1.forEach((el) => observer1.observe(el));

const hiddenElements2 = document.querySelectorAll('.hidden-t');
hiddenElements2.forEach((el) => observer2.observe(el));


/* enable smooth vertical scroll behavior for all browsers */
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (500) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });

    } // End if

  });
});


/* left menu animations on vertical scrolling */
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('.menu a');

var timer = null;
var currentPos = 0;
var currentSection = 0;

let scrollDir = 0;
window.addEventListener('wheel', (event) => {

    event.preventDefault();
    event.stopPropagation();
    scrollDir = event.deltaY > 0 ? 1 : -1;

    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(snapScroll, 75);

}, { passive: false });


// snap to next section and animate menu
function snapScroll() {
    currentSection += scrollDir;
    if (currentSection < 0) currentSection = 0;
    if (currentSection >= sections.length) currentSection = sections.length - 1;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });

    let id = sections[currentSection].getAttribute('id');
    animateMenu(id);
};

function scrollToSec(id) {

    const sectionList = ["about","projects","research","publications"];
    const isSection = (element) => element === id;

    currentSection = sectionList.findIndex(isSection);
    animateMenu(id);

};

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

/* toggle projects */
function toggle_project(myid,el) {
    var clicked_box = document.getElementById(myid);
    //var clicked_img = document.getElementById(myid).children[0].children[0];
    //var clicked_des = document.getElementById(myid).children[0].children[1];

    var boxes = document.querySelectorAll(".project-selected");
    boxes.forEach((box) => {
        // box.style.opacity = "0%";
        box.style.transform  = "translate(105%)";
        box.style.zIndex = "1";
    });
    // clicked_box.style.opacity = ((clicked_box.style.opacity!="100%") ? "100%" : "0%");;
    clicked_box.style.transform = ((clicked_box.style.transform!="translate(0%)") ? "translate(0%)" : "translate(105%)");
    clicked_box.style.zIndex = "10";

    var selectors = document.querySelectorAll(".project-title");
    selectors.forEach((selector) => {
        selector.classList.remove("opened-project");
        selector.classList.add("closed-project");
    });
    el.classList.remove("closed-project");;
    el.classList.add("opened-project");;
}

/* expand research description */
function expand_description(el) {
    el.style.height = ((el.style.height!="auto") ? "auto" : "148px");
    // div class research-plus-button
    el.children[1].style.transform = ((el.children[1].style.transform!="rotate(135deg)") ? "rotate(135deg)" : "rotate(0deg)" );
    // div class research-ellipsis
    el.children[3].style.display = ((el.children[3].style.display!="none") ? "none" : "block" );
}
