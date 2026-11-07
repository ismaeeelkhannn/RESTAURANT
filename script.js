const RESTAURANT_WHATSAPP = "923014998983";
const MENU = [
  { id: 1, cat: "Pizza", name: "Special Creamy Pizza", desc: "Creamy special pizza", price: 750 },
  { id: 2, cat: "Pizza", name: "Special Bistro Pizza", desc: "Bistro style", price: 750 },
  { id: 3, cat: "Pizza", name: "Lazania Pizza", desc: "Lazania style pizza", price: 750 },
  { id: 4, cat: "Pizza", name: "Maxi Butti Pizza", desc: "Maxi butti", price: 750 },
  { id: 5, cat: "Pizza", name: "Khan's Special Pizza", desc: "Khan ki khaas pizza", price: 750 },
  { id: 6, cat: "Pizza", name: "Chicken Supreme Pizza", desc: "Chicken supreme", price: 800 },
  { id: 7, cat: "Pizza", name: "Chicken Crown Pizza", desc: "Chicken crown", price: 800 },
  { id: 8, cat: "Pizza", name: "Chicken Tikka Pizza", desc: "Chicken tikka topping", price: 600 },
  { id: 9, cat: "Pizza", name: "Chicken Fajita Pizza", desc: "Chicken fajita", price: 600 },
  { id: 10, cat: "Pizza", name: "Chicken Kebab Pizza", desc: "Chicken kebab", price: 600 },
  { id: 11, cat: "Pizza", name: "Beef Kebab Pizza", desc: "Beef kebab", price: 600 },
  { id: 12, cat: "Pizza", name: "Vegetable Pizza", desc: "Sabzi wali pizza", price: 500 },
  { id: 13, cat: "Pizza", name: "Mexican Pizza", desc: "Mexican style", price: 750 },
  { id: 14, cat: "Pizza", name: "Jalla Peno Pizza", desc: "Jalapeno topping", price: 750 },
  { id: 20, cat: "Fish Corner", name: "Fish Fry", desc: "Crispy fish fry", price: 1100 },
  { id: 21, cat: "Fish Corner", name: "Fish Fry Masala", desc: "Masala fish fry", price: 1100 },
  { id: 22, cat: "Fish Corner", name: "Bonless Fish Tikka", desc: "Boneless fish tikka", price: 1000 },
  { id: 30, cat: "Burgers", name: "Zinger Burger", desc: "Crispy chicken burger", price: 400 },
  { id: 31, cat: "Burgers", name: "Chicken Burger", desc: "Chicken burger", price: 350 },
  { id: 32, cat: "Burgers", name: "Beef Burger", desc: "Beef burger", price: 400 },
  { id: 40, cat: "Shake Corner", name: "Mix Dry Fruit Shake", desc: "Dry fruit shake", price: 350 },
  { id: 41, cat: "Shake Corner", name: "Pista Shake", desc: "Pista shake", price: 300 },
  { id: 42, cat: "Shake Corner", name: "Khan Special Mint Shake", desc: "Mint shake", price: 250 },
  { id: 43, cat: "Shake Corner", name: "Banana Shake", desc: "Banana shake", price: 250 },
  { id: 44, cat: "Shake Corner", name: "Mango Shake", desc: "Mango shake", price: 300 },
  { id: 45, cat: "Shake Corner", name: "Guava Shake", desc: "Guava shake", price: 250 },
  { id: 46, cat: "Shake Corner", name: "Strawberry Shake", desc: "Strawberry shake", price: 250 },
  { id: 50, cat: "Juice Corner", name: "Pomegranate Juice", desc: "Anaar ka juice", price: 250 },
  { id: 51, cat: "Juice Corner", name: "Apple Juice", desc: "Saib ka juice", price: 250 },
  { id: 52, cat: "Juice Corner", name: "Peach Juice", desc: "Aaru ka juice", price: 250 },
  { id: 53, cat: "Juice Corner", name: "Orange Juice", desc: "Malta / Orange juice", price: 250 },
  { id: 54, cat: "Juice Corner", name: "Mango Juice", desc: "Aam ka juice", price: 250 },
  { id: 60, cat: "Drinks", name: "Regular Drink", desc: "345 ml", price: 80 },
  { id: 61, cat: "Drinks", name: "Mineral Water", desc: "Bottle", price: 80 },
  { id: 62, cat: "Drinks", name: "Special Cocktail Drink", desc: "Cocktail drink", price: 250 },
  { id: 63, cat: "Drinks", name: "Green Tea", desc: "Chai", price: 150 },
  { id: 64, cat: "Drinks", name: "Kashmiri Chai", desc: "Kashmiri chai", price: 150 },
  { id: 70, cat: "Deals", name: "Deal 1", desc: "Deal ki tafseel menu se dekhein", price: 449 },
  { id: 71, cat: "Deals", name: "Deal 2", desc: "Deal ki tafseel menu se dekhein", price: 600 },
  { id: 72, cat: "Deals", name: "Deal 3", desc: "Deal ki tafseel menu se dekhein", price: 800 },
  { id: 73, cat: "Deals", name: "Deal 4", desc: "Deal ki tafseel menu se dekhein", price: 1000 },
  { id: 74, cat: "Deals", name: "Deal 5", desc: "Deal ki tafseel menu se dekhein", price: 1500 }
];

const MENU_IMAGES = {
  Pizza: "photo-1513104890138-7c749659a591",
  "Fish Corner": "photo-1519708227418-c8fd9a32b7a2",
  Burgers: "photo-1568901346375-23c9450c58cd",
  "Shake Corner": "photo-1572490122747-3968b75cc699",
  "Juice Corner": "photo-1622597467836-f3285f2131b8",
  Drinks: "photo-1513558161293-cdab765edfd7",
  Deals: "photo-1555939594-58d7cb561ad1"
};

const STORAGE_KEY = "khanCart";
const ORDER_HISTORY_KEY = "khanOrders";
const menuContainer = document.querySelector("#menuItems");
const categoriesContainer = document.querySelector("#categories");
const cartPanel = document.querySelector("#cart");
const overlay = document.querySelector("#overlay");
const orderForm = document.querySelector("#orderForm");
const formMsg = document.querySelector("#formMsg");
const addressEl = document.querySelector("#custAddress");
const categories = ["All", ...new Set(MENU.map((item) => item.cat))];
const menuById = new Map(MENU.map((item) => [item.id, item]));
let cart = loadCart();
let activeCategory = "All";

function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    formMsg.textContent = "Cart is available until this page is closed.";
  }
}

function loadCart() {
  const saved = readStorage(STORAGE_KEY, []);
  if (!Array.isArray(saved)) return [];
  return saved.flatMap((entry) => {
    const item = menuById.get(Number(entry.id));
    const quantity = Number(entry.qty);
    return item && Number.isInteger(quantity) && quantity > 0
      ? [{ id: item.id, name: item.name, price: item.price, qty: quantity }]
      : [];
  });
}

function renderCategories() {
  categoriesContainer.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement("button");
    const selected = category === activeCategory;
    button.className = `category-tab${selected ? " is-active" : ""}`;
    button.type = "button";
    button.role = "tab";
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
    button.dataset.category = category;
    button.textContent = category;
    categoriesContainer.append(button);
  });
}

function createMenuCard(item) {
  const card = document.createElement("article");
  card.className = "menu-card";
  const photo = document.createElement("div");
  photo.className = "menu-photo";
  const image = document.createElement("img");
  image.src = `https://images.unsplash.com/${MENU_IMAGES[item.cat]}?auto=format&fit=crop&w=800&q=85`;
  image.alt = item.name;
  image.loading = "lazy";
  const tag = document.createElement("span");
  tag.className = "photo-tag";
  tag.textContent = "KHAN'S PICK";
  photo.append(image, tag);

  const body = document.createElement("div");
  body.className = "menu-card-body";
  const title = document.createElement("div");
  title.className = "menu-card-title";
  const name = document.createElement("h3");
  name.textContent = item.name;
  const price = document.createElement("span");
  price.className = "menu-price";
  price.textContent = formatPrice(item.price);
  title.append(name, price);
  const description = document.createElement("p");
  description.textContent = item.desc;
  const addButton = document.createElement("button");
  addButton.className = "add-button";
  addButton.type = "button";
  addButton.dataset.add = item.id;
  addButton.textContent = "Cart mein daalo +";
  body.append(title, description, addButton);
  card.append(photo, body);
  return card;
}

function renderMenu() {
  menuContainer.replaceChildren();
  const visibleCategories = activeCategory === "All" ? categories.slice(1) : [activeCategory];
  menuContainer.setAttribute("aria-label", activeCategory === "All" ? "Complete menu" : `${activeCategory} menu`);
  visibleCategories.forEach((category) => {
    const heading = document.createElement("h2");
    heading.className = "cat-title";
    heading.textContent = category;
    menuContainer.append(heading);
    MENU.filter((item) => item.cat === category).forEach((item) => menuContainer.append(createMenuCard(item)));
  });
}

function getTotal() {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

function renderCart() {
  const itemsContainer = document.querySelector("#cartItems");
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = formatPrice(getTotal());
  itemsContainer.replaceChildren();
  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Cart khali hai. Menu se kuch pasand karein!";
    itemsContainer.append(empty);
    return;
  }
  cart.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-row";
    const info = document.createElement("div");
    info.className = "info";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const details = document.createElement("small");
    details.textContent = `${formatPrice(item.price)} x ${item.qty} = ${formatPrice(item.price * item.qty)}`;
    info.append(name, document.createElement("br"), details);
    const quantity = document.createElement("div");
    quantity.className = "qty";
    quantity.append(createCartButton("minus", item, "−"));
    const countLabel = document.createElement("span");
    countLabel.textContent = item.qty;
    quantity.append(countLabel, createCartButton("plus", item, "+"));
    const remove = createCartButton("remove", item, "×");
    remove.className = "remove-btn";
    remove.setAttribute("aria-label", `Remove ${item.name}`);
    row.append(info, quantity, remove);
    itemsContainer.append(row);
  });
}

function createCartButton(action, item, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;
  button.dataset.id = item.id;
  button.textContent = label;
  if (action !== "remove") button.setAttribute("aria-label", `${action === "plus" ? "Add one" : "Remove one"} ${item.name}`);
  return button;
}

function addToCart(id) {
  const item = menuById.get(id);
  if (!item) return;
  const existing = cart.find((entry) => entry.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  saveCart();
  renderCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((entry) => entry.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function openCart() {
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartPanel.inert = false;
  overlay.classList.add("is-visible");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  document.querySelector("#cartToggle").setAttribute("aria-expanded", "true");
  document.querySelector("#custName").focus();
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartPanel.inert = true;
  overlay.classList.remove("is-visible");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
  document.querySelector("#cartToggle").setAttribute("aria-expanded", "false");
}

categoriesContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
});
categoriesContainer.addEventListener("keydown", (event) => {
  const buttons = [...categoriesContainer.querySelectorAll("[data-category]")];
  const index = buttons.indexOf(document.activeElement);
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length;
  activeCategory = buttons[next].dataset.category;
  renderCategories();
  renderMenu();
  categoriesContainer.querySelector(`[data-category="${CSS.escape(activeCategory)}"]`).focus();
});
menuContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});
document.querySelector("#cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "plus") changeQty(id, 1);
  if (button.dataset.action === "minus") changeQty(id, -1);
  if (button.dataset.action === "remove") removeFromCart(id);
});
document.querySelector("#cartToggle").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", () => {
  closeCart();
  document.querySelector("#cartToggle").focus();
});
document.querySelectorAll("[data-open-cart]").forEach((button) => button.addEventListener("click", openCart));
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartPanel.classList.contains("is-open")) {
    closeCart();
    document.querySelector("#cartToggle").focus();
  }
});

document.querySelectorAll('input[name="orderType"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isDelivery = document.querySelector('input[name="orderType"]:checked').value === "Delivery";
    addressEl.required = isDelivery;
    addressEl.disabled = !isDelivery;
    addressEl.placeholder = isDelivery ? "Address (zaroori hai)" : "Address (pickup par zaroori nahi)";
    addressEl.classList.toggle("is-hidden", !isDelivery);
    document.querySelector('label[for="custAddress"]').classList.toggle("is-hidden", !isDelivery);
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMsg.textContent = "";
  formMsg.classList.remove("is-error");
  if (cart.length === 0) {
    formMsg.textContent = "Pehle cart mein kuch items daalein.";
    formMsg.classList.add("is-error");
    return;
  }
  if (!orderForm.reportValidity()) {
    formMsg.textContent = "Naam, sahi phone number aur zaroori address check karein.";
    formMsg.classList.add("is-error");
    return;
  }

  const name = orderForm.elements.name.value.trim();
  const phone = orderForm.elements.phone.value.trim();
  const address = addressEl.value.trim();
  const note = orderForm.elements.note.value.trim();
  const orderType = orderForm.elements.orderType.value;
  const details = [
    "*Naya Order - Khan Burger*",
    "",
    `*Naam:* ${name}`,
    `*Phone:* ${phone}`,
    `*Order Type:* ${orderType}`,
    ...(orderType === "Delivery" ? [`*Address:* ${address}`] : []),
    "",
    "*Items:*",
    ...cart.map((item, index) => `${index + 1}. ${item.name} x ${item.qty} = ${formatPrice(item.price * item.qty)}`),
    "",
    `*Total: ${formatPrice(getTotal())}*`,
    ...(note ? ["", `*Note:* ${note}`] : [])
  ].join("\n");
  const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(details)}`;
  const orders = readStorage(ORDER_HISTORY_KEY, []);
  try {
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([
      ...(Array.isArray(orders) ? orders : []),
      { date: new Date().toISOString(), name, phone, orderType, items: cart, total: getTotal() }
    ]));
  } catch {
    formMsg.textContent = "WhatsApp khul raha hai. Order history save nahi ho saki.";
  }
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  cart = [];
  saveCart();
  renderCart();
  orderForm.reset();
  addressEl.required = true;
  addressEl.disabled = false;
  addressEl.classList.remove("is-hidden");
  document.querySelector('label[for="custAddress"]').classList.remove("is-hidden");
  closeCart();
});

renderCategories();
renderMenu();
renderCart();