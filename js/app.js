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

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleup(el,clicked) {
    clicked.classList.toggle("active");
    var tag=document.getElementById(el);
    tag.style.visibility = tag.style.visibility === 'visible' ? 'hidden' : 'visible';
    tag.style.transform = tag.style.transform === "translateY(0%)" ? "translateY(-200%)" : "translateY(0%)";
}
function toggledown(el,clicked) {
    clicked.classList.toggle("active");
    clicked.classList.toggle("deactive");
    var tag=document.getElementById(el);
    tag.style.visibility = tag.style.visibility === 'hidden' ? 'visible' : 'hidden';
    tag.style.transform = tag.style.transform === "translateY(-200%)" ? "translateY(0%)" : "translateY(-200%)";
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
