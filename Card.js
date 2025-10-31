const products = [
  { id:1, title:"Nike Cosmic", price:50, img:"https://media.istockphoto.com/id/1320501530/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.jpg?s=612x612&w=0&k=20&c=dgnAb4BsW_O8LEPUaEurgYj82H6x7fA_OCcuBTDUVCA=" },
  { id:2, title:"Nike Shoe", price:70, img:"https://www.cosmossport.gr/3124396-product_large/nike-w-zoomx-vaporfly-next-4.jpg" },
  { id:3, title:"Nike Zoom fly", price:88, img:"https://img01.ztat.net/article/spp-media-p1/55f6132734e846df8d000a3ba2e53aa7/fa23757476e742a192fc9dce20ff0653.jpg?imwidth=762&filter=packshot" }
];
let cart = [];

const cartContainer = document.getElementById("cart");

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const exist = cart.find(c => c.id === id);
  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...product, qty:1 });
  }
  renderCart();
}

function increaseQty(id) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty++;
    renderCart();
  }
}

function decreaseQty(id) {
  const item = cart.find(c => c.id === id);
  if (item) {
    if (item.qty > 1) {
      item.qty--;
    } else {
      cart = cart.filter(c => c.id !== id);
    }
    renderCart();
  }
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function renderCart() {
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty</p>";
    return;
  }
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex items-center justify-between border-b py-2";

    div.innerHTML = `
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

      <button onclick="removeItem(${item.id})" class="text-red-500">🗑 Remove</button>
    `;

    cartContainer.appendChild(div);
  });
}
