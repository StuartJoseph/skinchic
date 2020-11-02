// ------------------------- CATALOGUE SECTION -----------------------
let product = document.getElementsByClassName("about");
const productPage = [];

for (let i = 0; i < product.length; i++) {
  let productInfo = product[i];

  productInfo.addEventListener("click", function () {
    let name = productInfo.getAttribute("data-name");
    let price = productInfo.getAttribute("data-price");
    let image = productInfo.getAttribute("data-img");
    let image1 = productInfo.getAttribute("data-img1");
    let image2 = productInfo.getAttribute("data-img2");
    let image3 = productInfo.getAttribute("data-img3");

    let details = { name, price, image, image1, image2, image3 };

    localStorage.setItem("details", JSON.stringify(details));
  });
}

// ----------------------------------------------------------------
// ------------------------- CART SECTION -------------------------
let cart = [];

const cartList = document.getElementById("cartList");
const cartQuantity = document.getElementById("cartQuantity");
const subTotal = document.getElementById("subTotal");
const vatTotal = document.getElementById("vatTotal");
const cartTotal = document.getElementById("cartTotal");
const code = document.getElementById("code");
const discountTotal = document.getElementById("discount");
const deliveryTotal = document.getElementById("delivery");
const transport = document.getElementsByClassName("transport");
const grandTotal = document.getElementById("grandTotal");
const reference = document.getElementById("reference");
// ----------------------------------------------------------------
// get the values of the item
let addToCart = document.getElementsByClassName("buy");

for (let i = 0; i < addToCart.length; i++) {
  let button = addToCart[i];

  button.addEventListener("click", function () {
    let name = button.getAttribute("data-name");
    let price = button.getAttribute("data-price");
    let image = button.getAttribute("data-img");

    addItem(name, price, image);
  });
}
// ----------------------------------------------------------------
// Add item to cart or if it exists already just increase quantity
function addItem(name, price, image) {
  loadCart();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity += 1;
      saveCart();
      alert(
        `Your cart total including VAT is now R${getCartTotal().toFixed(2)}`
      );
      return;
    }
  }
  let item = { name, price, image, quantity: 1 };
  cart.push(item);
  saveCart();
  alert(`Your cart total including VAT is now R${getCartTotal().toFixed(2)}`);
}
// ----------------------------------------------------------------
// Show all items in cart
function showCart() {
  loadCart();

  cartQuantity.innerHTML = `You have ${getQuantity()} items in your cart`;

  let itemStr = "";
  for (let i = 0; i < cart.length; i++) {
    itemStr += `
    <div><img src="${cart[i].image}" width="100px" height="150px"><h4>${
      cart[i].name
    } R${cart[i].price} x ${cart[i].quantity} 
    = R${
      cart[i].quantity * cart[i].price
    }</h4><button class="remove" data-name="${
      cart[i].name
    }">Remove</button><button class="add-one" onclick="addItem('${
      cart[i].name
    }')"  data-name="${
      cart[i].name
    }">+</button><button class="remove-one" onclick="RemoveItem('${
      cart[i].name
    }',1)" data-name="${cart[i].name}">-</button></div>`;
  }
  cartList.innerHTML = itemStr;
  subTotal.innerHTML = `Sub total R${getTotal().toFixed(2)}`;
  vatTotal.innerHTML = `VAT R${getVat().toFixed(2)}`;
  cartTotal.innerHTML = `Cart total R${getCartTotal().toFixed(2)}`;

  // target remove button to remove item
  cartList.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove")) {
      let name = e.target.dataset.name;
      RemoveItem(name);
      // target add-one button to add 1 to quantity
    } else if (e.target && e.target.classList.contains("add-one")) {
      showCart();
    }
  });
}
// ----------------------------------------------------------------
// Get total quantities in cart
function getQuantity() {
  let quantity = 0;

  for (let i = 0; i < cart.length; i++) {
    quantity += cart[i].quantity;
  }
  return quantity;
}
// ----------------------------------------------------------------
// Get total value of cart
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
// ----------------------------------------------------------------
// Get VAT
function getVat() {
  let vat = 0;
  for (let i = 0; i < cart.length; i++) {
    vat += cart[i].price * cart[i].quantity * 0.15;
  }
  return vat;
}
// ----------------------------------------------------------------
// Get Cart Total
function getCartTotal() {
  let CartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    CartTotal +=
      cart[i].price * cart[i].quantity * 0.15 +
      cart[i].price * cart[i].quantity;
  }
  return CartTotal;
}
// ----------------------------------------------------------------
// Remove item from cart
function RemoveItem(name, quantity = 0) {
  if (localStorage.getItem("shoppingCart")) {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (cart[i].quantity > 0) {
        cart[i].quantity -= quantity;
        saveCart();
        showCart();
      }
      if (cart[i].quantity < 1 || quantity === 0) {
        cart.splice(i, 1);
        saveCart();
        showCart();
        return;
      }
    }
  }
}
// ----------------------------------------------------------------
// save cart to local storage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
// ----------------------------------------------------------------
// load storage back into cart
function loadCart() {
  if (localStorage.getItem("shoppingCart")) {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
}

function discount() {
  if (getCartTotal() < 1 || code.value != "SkinChic") {
    alert("Add an item to your cart first and if you entered the correct code");
  } else {
    let coupon = 0;
    for (let i = 0; i < cart.length; i++) {
      coupon += cart[i].price * cart[i].quantity * 0.1;
    }

    return (discountTotal.value = coupon);
  }
}

function express() {
  if (getCartTotal() < 1) {
    alert("Add an item to your cart first");
  } else {
    deliveryTotal.value = document.getElementById("trans1").value;
  }
}
function economy() {
  if (getCartTotal() < 1) {
    alert("Add an item to your cart first");
  } else {
    deliveryTotal.value = document.getElementById("trans2").value;
  }
}

function totals() {
  let someTotals = getCartTotal() - discountTotal.value;
  console.log(someTotals);
  let allTotals = +someTotals + +deliveryTotal.value;
  return (grandTotal.value = allTotals);
}

function confirmOrder() {
  if (deliveryTotal.value < 1) {
    alert("choose a delivery option");
  } else {
    totals();
    alert("Your order number is" + " " + Math.floor(Math.random() * 100000));
    localStorage.clear();
    cart = [];
  }
}
