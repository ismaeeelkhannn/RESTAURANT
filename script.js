const menuItems = {
  "Burgers": [
    { name: "Zinger Burger", description: "Crispy chicken, fresh lettuce, house sauce", price: 650, image: "photo-1568901346375-23c9450c58cd" },
    { name: "Beef Smash Burger", description: "Grilled beef patty, cheddar, caramelised onion", price: 850, image: "photo-1553979459-d2229ba7433a" },
    { name: "Chicken Chapli Burger", description: "Chapli kebab, mint chutney, crunchy salad", price: 720, image: "photo-1550547660-d9450f859349" },
    { name: "Double Khan Burger", description: "Two grilled patties, double cheese, house sauce", price: 1050, image: "photo-1571091718767-18b5b1457add" }
  ],
  "Pizza": [
    { name: "Chicken Tikka Pizza", description: "Tikka chicken, onion, green pepper, mozzarella", price: 1250, image: "photo-1579751626657-72bc17010498" },
    { name: "Fajita Pizza", description: "Spiced chicken, capsicum, olives, cheese", price: 1250, image: "photo-1571407970349-bc81e7e96d47" },
    { name: "Malai Boti Pizza", description: "Creamy malai boti, onion, herbs, mozzarella", price: 1390, image: "photo-1513104890138-7c749659a591" },
    { name: "Khan Special Pizza", description: "Chicken, beef, olives, peppers, extra cheese", price: 1590, image: "photo-1579751626657-72bc17010498" }
  ],
  "Shinwari": [
    { name: "Chicken Karahi", description: "Tomato, ginger, green chilli, fresh coriander", price: 1850, image: "photo-1603894584373-5ac82b2ae398" },
    { name: "Mutton Karahi", description: "Traditional karahi, ginger, green chilli", price: 2950, image: "photo-1545247181-516773cae754" },
    { name: "Chicken Namkeen Tikka", description: "Smoky grilled chicken, lemon, house spices", price: 1650, image: "photo-1529042410759-befb1204b468" },
    { name: "Mutton Rosh", description: "Slow-cooked mutton, simple Shinwari seasoning", price: 2850, image: "photo-1544025162-d76694265947" }
  ],
  "Deals": [
    { name: "Solo Burger Deal", description: "Zinger burger, fries and a regular drink", price: 890, image: "photo-1568901346375-23c9450c58cd" },
    { name: "Pizza Night Deal", description: "Large pizza with two regular drinks", price: 1690, image: "photo-1513104890138-7c749659a591" },
    { name: "Family Feast", description: "Two burgers, sharing fries and four drinks", price: 2490, image: "photo-1553979459-d2229ba7433a" },
    { name: "Karahi Dinner Deal", description: "Chicken karahi, naan and two cold drinks", price: 2190, image: "photo-1603894584373-5ac82b2ae398" }
  ],
  "Drinks & Shakes": [
    { name: "Mango Shake", description: "Creamy mango shake, made fresh", price: 450, image: "photo-1572490122747-3968b75cc699" },
    { name: "Chocolate Shake", description: "Chocolate, chilled milk, a little extra", price: 480, image: "photo-1577805947697-89e18249d767" },
    { name: "Mint Margarita", description: "Fresh mint, lemon, crushed ice", price: 390, image: "photo-1513558161293-cdab765edfd7" },
    { name: "Cold Drink", description: "Chilled soft drink", price: 180, image: "photo-1513558161293-cdab765edfd7" }
  ]
};

const menuContainer = document.querySelector("#menuItems");
const categoriesContainer = document.querySelector("#categories");
const cartPanel = document.querySelector("#cart");
const overlay = document.querySelector("#overlay");
const cart = new Map();
const allItems = Object.values(menuItems).flat();
let activeCategory = Object.keys(menuItems)[0];

// Menu prices are sample values; replace them with the restaurant's current prices.
categoriesContainer.innerHTML = Object.keys(menuItems).map((category, index) => `
  <button class="category-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" tabindex="${index === 0 ? "0" : "-1"}" data-category="${category}">${category}</button>
`).join("");

function renderMenu(category) {
  activeCategory = category;
  categoriesContainer.querySelectorAll(".category-tab").forEach((tab) => {
    const selected = tab.dataset.category === category;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  menuContainer.setAttribute("aria-label", `${category} menu items`);
  menuContainer.innerHTML = menuItems[category].map((item) => `
    <article class="menu-card">
      <div class="menu-photo"><img src="https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=85" alt="${item.name}" loading="lazy"><span class="photo-tag">KHAN'S PICK</span></div>
      <div class="menu-card-body"><div class="menu-card-title"><h3>${item.name}</h3><span class="menu-price">Rs. ${item.price.toLocaleString("en-PK")}</span></div><p>${item.description}</p><button class="add-button" type="button" data-add="${item.name}">Add to order <span aria-hidden="true">+</span></button></div>
    </article>`).join("");
}

function renderCart() {
  const entries = [...cart.entries()];
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [name, quantity]) => sum + allItems.find((item) => item.name === name).price * quantity, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = `Rs. ${total.toLocaleString("en-PK")}`;
  document.querySelector("#cartItems").innerHTML = entries.length ? entries.map(([name, quantity]) => {
    const item = allItems.find((menuItem) => menuItem.name === name);
    return `<article class="cart-item"><div><strong>${name}</strong><span>Rs. ${(item.price * quantity).toLocaleString("en-PK")}</span></div><div class="quantity-control"><button type="button" data-quantity="${name}" data-change="-1" aria-label="Remove one ${name}">−</button><span>${quantity}</span><button type="button" data-quantity="${name}" data-change="1" aria-label="Add one ${name}">+</button></div></article>`;
  }).join("") : '<p class="empty">Cart khali hai. Menu se kuch pasand karein!</p>';
}

function setCartOpen(isOpen) {
  cartPanel.classList.toggle("is-open", isOpen);
  cartPanel.setAttribute("aria-hidden", String(!isOpen));
  cartPanel.inert = !isOpen;
  overlay.classList.toggle("is-visible", isOpen);
  overlay.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("cart-open", isOpen);
  document.querySelector("#cartToggle").setAttribute("aria-expanded", String(isOpen));
  if (isOpen) document.querySelector("#custName").focus();
}

categoriesContainer.addEventListener("click", (event) => {
  const tab = event.target.closest(".category-tab");
  if (tab) renderMenu(tab.dataset.category);
});
categoriesContainer.addEventListener("keydown", (event) => {
  const tabs = [...categoriesContainer.querySelectorAll(".category-tab")];
  const index = tabs.indexOf(document.activeElement);
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
  tabs[next].focus();
  renderMenu(tabs[next].dataset.category);
});
menuContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  cart.set(button.dataset.add, (cart.get(button.dataset.add) || 0) + 1);
  renderCart();
  button.classList.add("just-added");
  button.innerHTML = 'Added <span aria-hidden="true">✓</span>';
  window.setTimeout(() => {
    if (button.isConnected) {
      button.classList.remove("just-added");
      button.innerHTML = 'Add to order <span aria-hidden="true">+</span>';
    }
  }, 1100);
});
document.querySelector("#cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  const name = button.dataset.quantity;
  const next = (cart.get(name) || 0) + Number(button.dataset.change);
  if (next <= 0) cart.delete(name);
  else cart.set(name, next);
  renderCart();
});
document.querySelector("#cartToggle").addEventListener("click", () => setCartOpen(true));
document.querySelector("#closeCart").addEventListener("click", () => {
  setCartOpen(false);
  document.querySelector("#cartToggle").focus();
});
document.querySelectorAll("[data-open-cart]").forEach((button) => button.addEventListener("click", () => setCartOpen(true)));
overlay.addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartPanel.classList.contains("is-open")) {
    setCartOpen(false);
    document.querySelector("#cartToggle").focus();
  }
});

const addressField = document.querySelector("#custAddress");
document.querySelectorAll('input[name="orderType"]').forEach((radio) => radio.addEventListener("change", () => {
  const needsAddress = document.querySelector('input[name="orderType"]:checked').value === "Delivery";
  addressField.required = needsAddress;
  addressField.disabled = !needsAddress;
  addressField.classList.toggle("is-hidden", !needsAddress);
  document.querySelector('label[for="custAddress"]').classList.toggle("is-hidden", !needsAddress);
}));

document.querySelector("#orderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#formMsg");
  message.textContent = "";
  message.classList.remove("is-error");
  if (!cart.size) {
    message.textContent = "Pehle menu se kuch items add karein.";
    message.classList.add("is-error");
    return;
  }
  if (!form.reportValidity()) {
    message.textContent = "Apna naam, sahi phone number aur delivery address check karein.";
    message.classList.add("is-error");
    return;
  }
  const orderType = form.elements.orderType.value;
  const orderLines = [...cart.entries()].map(([name, quantity]) => {
    const item = allItems.find((menuItem) => menuItem.name === name);
    return `${quantity} x ${name} - Rs. ${(item.price * quantity).toLocaleString("en-PK")}`;
  });
  const total = [...cart.entries()].reduce((sum, [name, quantity]) => sum + allItems.find((item) => item.name === name).price * quantity, 0);
  const details = [
    "Assalam-o-alaikum, Khan Burger! Mera order:",
    ...orderLines,
    `Total: Rs. ${total.toLocaleString("en-PK")}`,
    `Naam: ${form.elements.name.value.trim()}`,
    `Phone: ${form.elements.phone.value.trim()}`,
    `Order type: ${orderType}`,
    ...(orderType === "Delivery" ? [`Address: ${addressField.value.trim()}`] : []),
    ...(form.elements.note.value.trim() ? [`Note: ${form.elements.note.value.trim()}`] : [])
  ].join("\n");
  const whatsappUrl = `https://wa.me/923014998983?text=${encodeURIComponent(details)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  message.textContent = "WhatsApp khul raha hai. Wahan se order send karein.";
});

renderMenu(activeCategory);
renderCart();