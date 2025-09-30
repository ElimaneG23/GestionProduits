

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== Mettre à jour le compteur du panier =====
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// ===== Afficher les produits dans le panier =====
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
    document.getElementById("cart-total").textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center border p-2 mb-2";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        Prix: ${item.price} CFA
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary decrease">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-primary increase">+</button>
      </div>
      <div>
        <strong>${(item.price * item.quantity).toFixed(2)} CFA</strong>
      </div>
      <button class="btn btn-sm btn-danger remove">Supprimer</button>
    `;

    // Gestion des boutons
    div.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      displayCart();
    });

    div.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      displayCart();
    });

    div.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      displayCart();
    });

    cartContainer.appendChild(div);
  });

  updateTotal();
}

// ===== Calculer le total =====
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// ===== Sauvegarder le panier =====
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ===== Initialisation =====
updateCartCount();
displayCart();
