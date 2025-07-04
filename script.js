const body = document.querySelector('body');
const modalContainer = document.querySelector(".modal");

// navbar shadow after scrolling //
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 1) {
    navbar.classList.add('navbar-shadow');
  } else {
    navbar.classList.remove('navbar-shadow');
  }
});

// Button svg change when toggled with //

const collapseElement = document.getElementById('collapsable');
const toggleButton = document.querySelector('[data-bs-target="#collapsable"]');

// Optional: listen to collapse show/hide events
collapseElement.addEventListener('shown.bs.collapse', () => {
  console.log('Collapse shown');
  // toggleButton.classList.remove('collapsed'); // Not needed, Bootstrap does this
});

collapseElement.addEventListener('hidden.bs.collapse', () => {
  console.log('Collapse hidden');
  // toggleButton.classList.add('collapsed'); // Not needed, Bootstrap does this
});

// modal for contACT //

document.getElementById("saveChangesBtn").addEventListener("click", function () {
  const fields = [
    document.getElementById("fullName"),
    document.getElementById("email"),
    document.getElementById("subject"),
    document.getElementById("message"),
  ];

  let allFilled = true;

  fields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid");
      allFilled = false;

      setTimeout(() => {
        field.classList.remove("is-invalid");
      }, 1500);
    } else {
      field.classList.remove("is-invalid");
    }
  });

  if (allFilled) {
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    modal.hide();

    // Clear fields
    fields.forEach(field => field.value = "");

    // Show Bootstrap alert
    const formAlertDiv = document.getElementById("formAlert");
    formAlertDiv.classList.remove("d-none");

    // Auto-hide after 3 seconds
    setTimeout(() => {
      formAlertDiv.classList.add("d-none");
    }, 3000);

    // Show JS popup alert
    window.alert("Form sent!");
  }
});

// modal for each card //

document.addEventListener("DOMContentLoaded", function () {
  const viewCardButtons = document.querySelectorAll('#modalCard');

  viewCardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = button.closest(".card");
      const title = card.querySelector(".card-title").textContent;
      const text = card.querySelector(".card-details").textContent;
      const link = card.querySelector(".card-link");

      const modalContent = document.querySelector("#exampleModal .modal-content");

      // Image sets per project title
      let images = [];

      if (title === "Word Guesser Gameshow") {
        images = [
          { src: "images/gameshow-1.jpg", alt: "Word Guesser Gameshow screenshot 1" },
          { src: "images/gameshow-2.jpg", alt: "Word Guesser Gameshow screenshot 2" },
          { src: "images/gameshow-3.jpg", alt: "Word Guesser Gameshow screenshot 3" }
        ];
      } else if (title === "Web Dashboard") {
        images = [
          { src: "images/dashboard-1.jpg", alt: "Web Dashboard screenshot 1" },
          { src: "images/dashboard-2.jpg", alt: "Web Dashboard screenshot 2" },
          { src: "images/dashboard-3.jpg", alt: "Web Dashboard screenshot 3" }
        ];
      } else if (title === "Employee Directory") {
        images = [
          { src: "images/gallery-1.jpg", alt: "Employee Directory screenshot 1" },
          { src: "images/gallery-2.jpg", alt: "Employee Directory screenshot 2" },
          { src: "images/gallery-3.jpg", alt: "Employee Directory screenshot 3" }
        ];
      } else {
        images = [
          { src: "images/not-found.png", alt: "Placeholder image - no preview available" }
        ];
      }

      const carouselId = "projectCarousel";

      // Build carousel indicators
      const indicatorsHTML = images.map((_, index) => `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>
      `).join("");

      // Build carousel inner slides
      const slidesHTML = images.map((image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${image.src}" class="d-block w-100 rounded" alt="${image.alt}">
        </div>
      `).join("");

      const carouselHTML = `
        <div id="${carouselId}" class="carousel slide carousel-fade mb-3" data-bs-ride="carousel">
          <div class="carousel-indicators">
            ${indicatorsHTML}
          </div>
          <div class="carousel-inner">
            ${slidesHTML}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      `;

      modalContent.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          ${carouselHTML}
          <p>${text}</p>
        </div>
        <div class="modal-footer justify-content-between">
          <a href="${link}" class="btn btn-secondary" target="_blank">Click here to view project</a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      `;
    });
  });
});


// image slideshow for the services section //

// img slide show 1 for the programming languages //

function startSlideshow(imageElementId, images, interval) {
  let index = 0;
  const imgElement = document.getElementById(imageElementId);

  setInterval(() => {
    // Rotate out (90° Y-axis)
    imgElement.style.transform = 'rotateY(90deg)';

    // After half the transition, swap image and rotate back
    setTimeout(() => {
      index = (index + 1) % images.length;
      imgElement.src = images[index];
      imgElement.style.transform = 'rotateY(0deg)';
    }, 500); // 250ms = half of 0.5s transition
  }, interval);
}

// Start multiple slideshows
startSlideshow('slideshow-solving', [
  'images/solving-1.png',
  'images/solving-2.png',
  'images/solving-3.png'
], 4000);

startSlideshow('slideshow-creativity', [
  'images/creativity-1.png',
  'images/creativity-2.png',
  'images/creativity-3.png'
], 4000);

startSlideshow('slideshow-coding', [
  'images/html.png',
  'images/css.png',
  'images/javascript.png'
], 4000);
