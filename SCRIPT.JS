/* =====================================
   HOT BITE - SCRIPT.JS
   Modern Luxury Restaurant Website
===================================== */

// =============================
// DARK MODE
// =============================

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }
});

// =============================
// CART SYSTEM
// =============================

let cart = [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

const addToCartButtons =
document.querySelectorAll(".add-cart");

addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem =
        cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();
    });
});

// =============================
// UPDATE CART
// =============================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        totalItems += item.quantity;

        const itemDiv =
        document.createElement("div");

        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                ${item.price.toLocaleString()} XAF
            </div>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>
        `;

        cartItems.appendChild(itemDiv);

    });

    totalPrice.textContent =
    total.toLocaleString();

    cartCount.textContent =
    totalItems;
}

// =============================
// QUANTITY CONTROLS
// =============================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// =============================
// FAVORITES SYSTEM
// =============================

let favorites = [];

const favoriteCount =
document.getElementById("favoriteCount");

const favoriteButtons =
document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const foodName =
        button.dataset.name;

        if (!favorites.includes(foodName)) {

            favorites.push(foodName);

            button.style.background =
            "#ff4d6d";

            button.style.color =
            "white";

        }

        favoriteCount.textContent =
        favorites.length;
    });

});

// =============================
// SEARCH SYSTEM
// =============================

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    const menuItems =
    document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        const title =
        item.querySelector("h3")
        .textContent
        .toLowerCase();

        if (title.includes(value)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });

});

// =============================
// CATEGORY FILTER
// =============================

const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
        button.dataset.category;

        const menuItems =
        document.querySelectorAll(".menu-item");

        menuItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

// =============================
// WHATSAPP CHECKOUT
// =============================

const checkoutBtn =
document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }

    let message =
    "🍽 HOT BITE ORDER%0A%0A";

    let grandTotal = 0;

    cart.forEach(item => {

        const itemTotal =
        item.price * item.quantity;

        grandTotal += itemTotal;

        message +=
        `• ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()} XAF%0A`;

    });

    message +=
    `%0A💰 Total: ${grandTotal.toLocaleString()} XAF`;

    const phone =
    "237681602683";

    const whatsappURL =
    `https://wa.me/${phone}?text=${message}`;

    window.open(
        whatsappURL,
        "_blank"
    );

});

// =============================
// CART BUTTON SCROLL
// =============================

const cartBtn =
document.getElementById("cartBtn");

cartBtn.addEventListener("click", () => {

    document.querySelector(".cart-container")
    .scrollIntoView({
        behavior: "smooth"
    });

});

// =============================
// FAVORITES BUTTON
// =============================

const favoriteBtn =
document.getElementById("favoriteBtn");

favoriteBtn.addEventListener("click", () => {

    if (favorites.length === 0) {

        alert(
            "No favorite foods selected yet."
        );

        return;
    }

    alert(
        "❤️ Favorites:\n\n" +
        favorites.join("\n")
    );

});

// =============================
// TESTIMONIAL STAR RATING
// =============================

const testimonialCards =
document.querySelectorAll(
    ".testimonial-card"
);

testimonialCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
        "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "translateY(0px)";

    });

});

// =============================
// SCROLL ANIMATION
// =============================

const revealElements =
document.querySelectorAll(
    ".food-card, .testimonial-card"
);

window.addEventListener("scroll", () => {

    revealElements.forEach(element => {

        const position =
        element.getBoundingClientRect().top;

        const screenHeight =
        window.innerHeight;

        if (
            position <
            screenHeight - 100
        ) {

            element.style.opacity = "1";
            element.style.transform =
            "translateY(0px)";

        }

    });

});

// =============================
// INITIAL EFFECT
// =============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        revealElements.forEach(el => {

            el.style.opacity = "0";
            el.style.transform =
            "translateY(30px)";
            el.style.transition =
            "all 0.6s ease";

        });

    }
);

// =============================
// ORDER SUMMARY
// =============================

function getOrderSummary() {

    let summary =
    "===== HOT BITE ORDER =====\n\n";

    let total = 0;

    cart.forEach(item => {

        const amount =
        item.price * item.quantity;

        total += amount;

        summary +=
        `${item.name}\n` +
        `Qty: ${item.quantity}\n` +
        `Amount: ${amount.toLocaleString()} XAF\n\n`;

    });

    summary +=
    `TOTAL: ${total.toLocaleString()} XAF`;

    return summary;
}