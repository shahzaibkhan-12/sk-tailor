
const designCards = document.querySelectorAll(".design-card");
const designMessage = document.getElementById("design-message");
const orderForm = document.getElementById("order-form");
const orderResult = document.getElementById("order-result");
const topButton = document.getElementById("top-button");

// Show the current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Design selection
let selectedDesign = "";

designCards.forEach(function (card) {
    card.addEventListener("click", function () {
        designCards.forEach(function (item) {
            item.classList.remove("selected");
        });

        card.classList.add("selected");
        selectedDesign = card.dataset.design;

        designMessage.textContent =
            "Your selected design: " + selectedDesign;

        // Update the order form's service choice
        const serviceSelect = document.getElementById("service");

        if (selectedDesign === "Classic Shalwar Qameez") {
            serviceSelect.value = "Shalwar Qameez";
        } else if (selectedDesign === "Custom Design") {
            serviceSelect.value = "Custom Design";
        } else {
            serviceSelect.value = "";
        }

        // Clear an old order result after changing the design
        orderResult.hidden = true;
    });
});

// Handle order form submission
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const service =
        document.getElementById("service").value;

    const measurements =
        document.getElementById("measurements").value.trim();

    // Check that the essential details are provided
    if (!customerName || !customerPhone || !service) {
        alert("Please fill in your name, phone number, and service.");
        return;
    }

    // Build the order confirmation safely
    const heading = document.createElement("h3");
    heading.textContent = "Order Details";

    const details = [
        ["Customer", customerName],
        ["Phone", customerPhone],
        ["Service", service],
        ["Design", selectedDesign || "Not selected"],
        ["Measurements / Instructions", measurements || "Not provided"]
    ];

    const resultContent = document.createElement("div");

    details.forEach(function (detail) {
        const paragraph = document.createElement("p");
        const label = document.createElement("strong");

        label.textContent = detail[0] + ": ";
        paragraph.appendChild(label);
        paragraph.appendChild(document.createTextNode(detail[1]));

        resultContent.appendChild(paragraph);
    });

    orderResult.replaceChildren(heading, resultContent);
    orderResult.hidden = false;

    orderResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    alert(
        "Your order details have been prepared! " +
        "Please contact the shop to confirm your order."
    );
});

// Show the back-to-top button when scrolling
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topButton.classList.add("visible");
    } else {
        topButton.classList.remove("visible");
    }
});

// Scroll back to the top
topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
