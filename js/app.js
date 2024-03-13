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

/* scrolling */
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
        };
    });
};

/* smooth scroll behavior for all browsers */
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
      }, 200, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleA(clicked,notclicked) {
    clicked.classList.toggle("active");
    var tag1=document.getElementById("popupA");
    var tag2=document.getElementById("popupB");
    var transform1 = "translateY(0%)";
    var transform2 = "translateY(-300%)";
    var state1 = "visible";
    var state2 = "hidden";

    if (tag1.style.visibility == "hidden" && tag2.style.visibility == "visible"){
        notclicked.classList.toggle("active");
        tag1.style.visibility = state1;
        tag1.style.transform = transform1;
        tag2.style.visibility = state2;
        tag2.style.transform = transform2;
    }
    else if (tag1.style.visibility == "visible"){
        tag1.style.visibility = state2;
        tag1.style.transform = transform2;
    }
    else {
        tag1.style.visibility = state1;
        tag1.style.transform = transform1;
        tag2.style.visibility = state2;
    }
}
function toggleB(clicked,notclicked) {
    clicked.classList.toggle("active");
    var tag1=document.getElementById("popupA");
    var tag2=document.getElementById("popupB");
    var transform1 = "translateY(0%)";
    var transform2 = "translateY(-300%)";
    var state1 = "visible";
    var state2 = "hidden";

    if (tag2.style.visibility == "hidden" && tag1.style.visibility == "visible"){
        notclicked.classList.toggle("active");
        tag2.style.visibility = state1;
        tag1.style.visibility = state2;
        tag2.style.transform = transform1;
        tag1.style.transform = transform2;
    }
    else if (tag2.style.visibility == "visible"){
        tag2.style.visibility = state2;
        tag2.style.transform = transform2;
    }
    else {
        tag2.style.visibility = state1;
        tag2.style.transform = transform1;
        tag1.style.visibility = state2;
    }
}


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
