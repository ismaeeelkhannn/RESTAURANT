const menuItems = {
  starters: [
    { name: "Tandoori broccoli", description: "Charred florets, hung curd, sesame crunch", price: "₹340", image: "photo-1512621776951-a57141f2eefd" },
    { name: "Smoky paneer tikka", description: "Kasundi marinade, pickled onion, mint", price: "₹420", image: "photo-1547592180-85f173990554" },
    { name: "Crispy lotus stem", description: "Jaggery chilli glaze, toasted peanuts", price: "₹360", image: "photo-1540189549336-e6e99c3679fe" },
    { name: "Little samosa chaat", description: "Peas, tamarind, a generous yoghurt drizzle", price: "₹290", image: "photo-1565557623262-b51c2513a641" }
  ],
  mains: [
    { name: "Butter chicken, our way", description: "Tandoor-kissed chicken, slow tomato makhani", price: "₹680", image: "photo-1565557623262-b51c2513a641" },
    { name: "Goan coconut curry", description: "Seasonal catch, kokum, steamed rice", price: "₹740", image: "photo-1547592180-85f173990554" },
    { name: "Dal makhani overnight", description: "Black lentils, cultured butter, a slow flame", price: "₹520", image: "photo-1512621776951-a57141f2eefd" },
    { name: "Paneer tikka masala", description: "Coal-roasted paneer, ginger, green cardamom", price: "₹590", image: "photo-1540189549336-e6e99c3679fe" }
  ],
  desserts: [
    { name: "Gulab jamun cheesecake", description: "Saffron cream, pistachio crumb", price: "₹320", image: "photo-1488477181946-6428a0291777" },
    { name: "Mango kulfi", description: "Alphonso mango, a pinch of chilli salt", price: "₹260", image: "photo-1501446529957-6226bd447c46" },
    { name: "Dark chocolate shahi tukda", description: "Brioche, rose rabri, cocoa nibs", price: "₹340", image: "photo-1578985545062-69928b1d9587" },
    { name: "Seasonal fruit & cream", description: "Market fruit, cardamom, honey", price: "₹280", image: "photo-1488477181946-6428a0291777" }
  ],
  drinks: [
    { name: "House nimbu soda", description: "Fresh lime, black salt, a little fizz", price: "₹180", image: "photo-1513558161293-cdab765edfd7" },
    { name: "Mango & chilli spritz", description: "Alphonso, lime, Kashmiri chilli", price: "₹280", image: "photo-1546173159-315724a31696" },
    { name: "Masala chai", description: "Our own spice blend, brewed to order", price: "₹140", image: "photo-1571934811356-5cc061b6821f" },
    { name: "Rose & cardamom lassi", description: "Thick yoghurt, rose petal, crushed ice", price: "₹220", image: "photo-1556679343-c7306c1976bc" }
  ]
};

const menuGrid = document.querySelector("#menu-panel");
const menuTabs = [...document.querySelectorAll(".menu-tab")];

// Render each category in place and keep the tab accessibility state in sync.
function renderMenu(category) {
  const activeTab = menuTabs.find((tab) => tab.dataset.category === category);
  menuTabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  menuGrid.setAttribute("aria-labelledby", activeTab.id);
  menuGrid.innerHTML = menuItems[category].map((item, index) => `
    <article class="menu-card" style="animation-delay:${index * 55}ms">
      <div class="menu-card-photo"><img src="https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80" alt="${item.name}" loading="lazy"></div>
      <div class="menu-card-meta"><h3>${item.name}</h3><span class="menu-price">${item.price}</span></div>
      <p>${item.description}</p>
    </article>`).join("");
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderMenu(tab.dataset.category));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? menuTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : menuTabs.length - 1)) % menuTabs.length;
    menuTabs[nextIndex].focus();
    renderMenu(menuTabs[nextIndex].dataset.category);
  });
});
renderMenu("starters");

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");
navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  mainNav.classList.remove("is-open");
}));

const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");
const dateInput = reservationForm.elements.date;
const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

// This static page validates the request locally; it does not send a booking.
reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.classList.remove("is-error");
  if (!reservationForm.reportValidity()) {
    formMessage.textContent = "Please check the highlighted fields.";
    formMessage.classList.add("is-error");
    return;
  }
  if (dateInput.value < localToday) {
    dateInput.setCustomValidity("Please choose today or a future date.");
    dateInput.reportValidity();
    dateInput.setCustomValidity("");
    formMessage.textContent = "Choose a date that is today or later.";
    formMessage.classList.add("is-error");
    return;
  }
  const guestName = reservationForm.elements.name.value.trim();
  formMessage.textContent = `Thanks, ${guestName}. Your details are valid. Please call to confirm your table.`;
  reservationForm.reset();
  dateInput.min = localToday;
});

const reviewSlides = [...document.querySelectorAll(".review-slide")];
const reviewCount = document.querySelector("#review-current");
let currentReview = 0;
function showReview(index) {
  currentReview = (index + reviewSlides.length) % reviewSlides.length;
  reviewSlides.forEach((slide, slideIndex) => slide.classList.toggle("is-current", slideIndex === currentReview));
  reviewCount.textContent = String(currentReview + 1).padStart(2, "0");
}
document.querySelectorAll(".review-arrow").forEach((button) => {
  button.addEventListener("click", () => showReview(currentReview + (button.dataset.direction === "next" ? 1 : -1)));
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
let currentImage = 0;
let lastFocusedElement;

// Cycle gallery images while the lightbox is open, then restore focus on close.
function showGalleryImage(index) {
  currentImage = (index + galleryItems.length) % galleryItems.length;
  const selectedItem = galleryItems[currentImage];
  lightboxImage.src = selectedItem.dataset.full;
  lightboxImage.alt = selectedItem.querySelector("img").alt;
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lastFocusedElement?.focus();
}
galleryItems.forEach((item, index) => item.addEventListener("click", () => {
  lastFocusedElement = item;
  showGalleryImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightbox.querySelector(".lightbox-close").focus();
}));
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showGalleryImage(currentImage - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showGalleryImage(currentImage + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryImage(currentImage - 1);
  if (event.key === "ArrowRight") showGalleryImage(currentImage + 1);
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}