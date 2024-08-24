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

/* menu vertical scrolling */
let sections = document.querySelectorAll('.section');
let navLinks = document.querySelectorAll('.menu a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop-700;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset+height) {
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
                    line.style.transform = 'translateX(-100%)';
                };
            });
        };
    });

};

/* smooth vertical scroll behavior for all browsers */
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
      }, 100, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


/* horizontal (infinite) scroll behaviour */
const scrollers = document.querySelectorAll(".scroller");

//check if user prefers horizontal animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    enableHorizontalScroll();
};

function enableHorizontalScroll() {
    scrollers.forEach((scroller) => {
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
    var clicked_img = document.getElementById(myid).children[0].children[0];
    var clicked_des = document.getElementById(myid).children[0].children[1];

    clicked_box.style.marginLeft = ((clicked_box.style.marginLeft!="250px") ? "250px" : "500px");
    clicked_img.style.width = ((clicked_img.style.width!="70%") ? "70%" : "30%");
    clicked_des.classList.toggle("project-display-description-open");
    el.classList.toggle("opened-project");
    var selector = el.parentElement;
    selector.style.width = ((selector.style.width!="250px") ? "250px" : "500px");

}


