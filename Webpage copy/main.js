document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".fest-image");
    let index = 0;  
    function showImage() {
      images.forEach(image => image.classList.remove("active"));
      images[index].classList.add("active");
      index = (index + 1) % images.length;
    }  
    showImage();  
    setInterval(showImage, 4000); 
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".artist-image");
    let index = 0;
  
    function showImage() {
      images.forEach(image => image.classList.remove("active"));
      images[index].classList.add("active");
      index = (index + 1) % images.length;
    }
  
    showImage(); 
  
    setInterval(showImage, 3500);
  });
 
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopButton").style.display = "block";
  } else {
    document.getElementById("scrollToTopButton").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

document.addEventListener('DOMContentLoaded', function () {
    const ticketButton = document.getElementById('ticketButton');
    ticketButton.addEventListener('click', function () {
        const half = document.body.scrollHeight / 2;
        window.scrollTo({
            top: half,
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const navigationIcon = document.querySelector('.navigation-icon');
    const menu = document.querySelector('.menu');

    navigationIcon.addEventListener('click', function () {
        menu.classList.toggle('active');
    });
});

function reloadPage(event) {
    event.preventDefault();
    window.location.reload();
  }

document.addEventListener("DOMContentLoaded", function() {
  const searchIcon = document.querySelector('.search-icon');
  const searchContainer = document.querySelector('.search-container');

  searchIcon.addEventListener('click', function() {
      searchContainer.style.display = (searchContainer.style.display === 'block') ? 'none' : 'block';
  });
});