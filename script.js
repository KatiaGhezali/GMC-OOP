// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Shopping Cart Item class

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// Shopping Cart class

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(new ShoppingCartItem(product, 1));
    }

    this.displayCart();
  }

  removeItem(productId) {
    const item = this.items.find((item) => item.product.id === productId);

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.items = this.items.filter((item) => item.product.id !== productId);
    }

    this.displayCart();
  }

  displayCart() {
    const cartElement = document.getElementById("cart");

    cartElement.innerHTML = "";

    if (this.items.length === 0) {
      cartElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    this.items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
                <span>
                    ${item.product.name} -
                    $${item.product.price.toFixed(2)}
                </span>

                <div>
                    <button onclick="cart.removeItem(${item.product.id})">
                        -
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button onclick="cart.addItem(getProduct(${item.product.id}))">
                        +
                    </button>
                </div>

                <strong>
                    $${item.getTotalPrice().toFixed(2)}
                </strong>
            `;

      cartElement.appendChild(itemElement);
    });

    const total = this.items.reduce((sum, item) => {
      return sum + item.getTotalPrice();
    }, 0);

    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");

    totalElement.innerHTML = `
            <p>Items: ${this.getTotalItems()}</p>
            <h3>Total: $${total.toFixed(2)}</h3>
        `;

    cartElement.appendChild(totalElement);
  }
}

// Create products
const products = [
  new Product(1, "Laptop", 800),
  new Product(2, "Mouse", 25),
  new Product(3, "Keyboard", 50),
];

// Create cart
const cart = new ShoppingCart();

// Find a product by  ID

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

// Display products
function displayProducts() {
  const productsElement = document.getElementById("products");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </div>

            <button onclick="cart.addItem(getProduct(${product.id}))">
                Add to Cart
            </button>
        `;

    productsElement.appendChild(productElement);
  });
}

// Display products when the page loads
displayProducts();

// Display empty cart
cart.displayCart();
