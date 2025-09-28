const products = [
    {
        id: 1,
        name: "LOS ANGELES LAKERS",
        price: 45000,
        image: "images/lbjames.avif",
        detailsUrl: "produit.html?id=1"
    },
    {
        id: 2,
        name: "ORLANDO MAGIC",
        price: 16000,
        image: "images/magics.avif",
        detailsUrl: "produit.html?id=2"
    },
    {
        id: 3,
        name: "DALLAS MAVERICKS",
        price: 17000,
        image: "images/mavs.avif",
        detailsUrl: "produit.html?id=3"
    },
    {
        id: 4,
        name: "NEW YORK KNICKS",
        price: 19500,
        image: "images/newYork.avif",
        detailsUrl: "produit.html?id=4"
    },
    {
        id: 5,
        name: "NEW ORLEANS PELICANS",
        price: 22000,
        image: "images/nola.avif",
        detailsUrl: "produit.html?id=5"
    },
    {
        id: 6,
        name: "PORTLAND TRAIL BLAZERS",
        price: 25000,
        image: "images/ripcity.jpg",
        detailsUrl: "produit.html?id=6"
    },
    {
        id: 7,
        name: "HOUSTON ROCKETS",
        price: 17500,
        image: "images/rockets.png",
        detailsUrl: "produit.html?id=7"
    },
    {
        id: 8,
        name: "SAN ANTONIO SPURS",
        price: 11000,
        image: "images/spurs.webp",
        detailsUrl: "produit.html?id=8"
    },
    {
        id: 9,
        name: "PHOENIX SUNS",
        price: 40000,
        image: "images/suns.avif",
        detailsUrl: "produit.html?id=9"
    },
    {
        id: 10,
        name: "GOLDEN STATE WARRIORS",
        price: 38000,
        image: "images/warriors.avif",
        detailsUrl: "produit.html?id=10"
    },
    {
        id: 11,
        name: "SACRAMENTO KINGS",
        price: 17500,
        image: "images/kings.jpg",
        detailsUrl: "produit.html?id=11"
    },
    {
        id: 12,
        name: "UTAH JAZZ",
        price: 15000,
        image: "images/jazz.avif",
        detailsUrl: "produit.html?id=12"
    },
    {
        id: 13,
        name: "MILWAUKEE BUCKS",
        price: 19000,
        image: "images/milwaukee-bucks-nike-city-edition-swingman-jersey-2024-custom-unisex_ss5_p-201315937+u-m8jh0negikgtdfezsmjf+v-ykrwrswpg2issyfdf0mt.avif",
        detailsUrl: "produit.html?id=13"
    },
    {
        id: 14,
        name: "DENVER NUGGETS",
        price: 18000,
        image: "images/denver.avif",
        detailsUrl: "produit.html?id=14"
    },
    {
        id: 15,
        name: "BOSTON CELTICS",
        price: 14000,
        image: "images/boston.jpg",
        detailsUrl: "produit.html?id=15"
    },
    {
        id: 16,
        name: "CHICAGO BULLS",
        price: 12000,
        image: "images/bulls.jpg",
        detailsUrl: "produit.html?id=16"
    },
];


let cart = JSON.parse(localStorage.getItem("cart")) || []

// fonction pour afficher la liste des produits
function afficherListeProduits() {
    // Récupération de l'élément HTML qui contiendra la liste des produits
    const container = document.getElementById("product");

    // Je parcours la liste des produits
    products.forEach((produit) => {
        const existingProduct = cart.find(item => item.id === produit.id)
        // Création d'un élément HTML pour chaque produit
        const card = document.createElement("div");
        card.className = "photo-cards";


        card.innerHTML = `
             <img src="./${produit.image}" alt="${produit.name}" class="product-image">
            <div class="product-info">
                <h3>${produit.name}</h3>
                <p>Prix: ${produit.price}CFA</p>
                <button class="add-to-cart" class="add-to-cart already-in-cart " id="btn-${produit.id}">Ajouter au Panier</button> 
            </div>
        `;
        container.appendChild(card)
    })
}
afficherListeProduits()
// ===== Mettre à jour le compteur du panier =====
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// ===== Ajouter un produit au panier =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Vérifie si le produit existe déjà dans le panier
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    // Sauvegarde dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mise à jour du compteur
    updateCartCount();
}

// ===== Attacher les événements aux boutons =====
function setupCartButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const productId = products[index].id;
            addToCart(productId);
        });
    });
}

// ===== Ajouter un produit depuis le bouton "+" de la nav =====
document.getElementById("add-product").addEventListener("click", (e) => {
    e.preventDefault();

    // Exemple : ajouter automatiquement le 1er produit (Lakers)
    addToCart(products[0].id);
    alert(products[0].name + " ajouté au panier !");
});

// ===== Initialisation =====
updateCartCount();
setupCartButtons();
