const products = [
  { id: 1, title: "Nike Cosmic", price: 50, img: "https://media.istockphoto.com/id/1320501530/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.jpg?s=612x612&w=0&k=20&c=dgnAb4BsW_O8LEPUaEurgYj82H6x7fA_OCcuBTDUVCA=" },
  { id: 2, title: "Nike Zoom Fly", price: 80, img: "https://img01.ztat.net/article/spp-media-p1/55f6132734e846df8d000a3ba2e53aa7/fa23757476e742a192fc9dce20ff0653.jpg?imwidth=762&filter=packshot" },
  { id: 3, title: "Nike Air Max", price: 95, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000" }
];

let cart = [];
let nextId = Math.max(...products.map(p => p.id), 0) + 1;
const discountInput = document.getElementById("discountInput");
const applyDiscount = document.getElementById("applyDiscount");
let discountRate = 0; 


const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const totalContainer = document.getElementById("totalContainer");
const addProductBtn = document.getElementById("addProductBtn");

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow flex flex-col items-center text-center";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" class="w-40 h-40 object-cover rounded mb-3">
      <h3 class="font-semibold">${p.title}</h3>
      <p class="text-gray-600 mb-3">$${p.price}</p>
      <button onclick="addToCart(${p.id})" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const exist = cart.find(c => c.id === id);
  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty</p>";
    totalContainer.innerHTML = "";
    return;
  }

  


  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between border-b py-2";
    row.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.img}" class="w-12 h-12 rounded" alt="${item.title}">
        <div>
          <p class="font-semibold">${item.title}</p>
          <p class="text-gray-600">$${item.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="decreaseQty(${item.id})" class="bg-gray-200 px-2 rounded">-</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${item.id})" class="bg-gray-200 px-2 rounded">+</button>
      </div>

      <button onclick="removeItem(${item.id})" class="text-red-500">Remove</button>
    `;
    cartContainer.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = total * discountRate;
  const finalTotal = total - discount;

  totalContainer.innerHTML = totalContainer.innerHTML = `
  <p>Subtotal: $${total.toFixed(2)}</p>
  <p class="text-green-600">Discount: -$${discount.toFixed(2)}</p>
  <p class="font-bold text-lg">Total: $${finalTotal.toFixed(2)}</p>
`;

  
}

function increaseQty(id) {
  const item = cart.find(c => c.id === id);
  if (item) item.qty++;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  if (item.qty > 1) item.qty--;
  else cart = cart.filter(c => c.id !== id);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

addProductBtn.onclick = () => {
  const title = prompt("Enter product name:");
  const price = parseFloat(prompt("Enter price:"));
  const img = prompt("Enter image URL:");

  const newProduct = { id: nextId++, title, price, img };
  products.push(newProduct);
  renderProducts();
  alert("New product added successfully!");
};

applyDiscount.onclick = () => {
  const value = discountInput.value
    if ( value == "save"){
      discountRate = 0.1
    }
    else if ( value == "save1"){
      discountRate = 0.2
    };

  renderCart(); 
};

renderProducts();
