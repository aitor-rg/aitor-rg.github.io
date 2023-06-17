const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleup(el) {
    var tag=document.getElementById(el);
    tag.style.visibility = tag.style.visibility === 'visible' ? 'hidden' : 'visible';
    tag.style.transform = tag.style.transform === "translateY(0%)" ? "translateY(-200%)" : "translateY(0%)";
}
function toggledown(el) {
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
