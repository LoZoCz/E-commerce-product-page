const sideBarBtn = document.querySelector(".side-bar-btn");
const sideBarCloseBtn = document.querySelector(".close-side-bar-btn");
const sideBarBox = document.querySelector(".option-list");
const cartBtn = document.querySelector(".cart-btn");
const cartIndicator = document.querySelector(".cart-item");
const cartBox = document.querySelector(".cart-wrapper");
const cartInside = document.querySelector(".cart-inside");
const mainProdImage = document.querySelector(".main-product-image");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const thumbImgs = document.querySelectorAll(".thumbnail-wrapper");
const minusNumBtn = document.querySelector(".minus-btn");
const plusNumBtn = document.querySelector(".plus-btn");
const productQuantity = document.querySelector(".product-number");
const buyBtn = document.querySelector(".buy-btn");
const dialogSlider = document.querySelector(".slider-dialog");
const dialogMainImg = document.querySelector(".dialog-product-image");
const dialogThumbImgs = document.querySelectorAll(".dialog-thumbnail-wrapper");
const dialogArrowLeft = document.querySelector(".dialog-arrow-left");
const dialogArrowRight = document.querySelector(".dialog-arrow-right");
const dialogCloseBtn = document.querySelector(".dialog-close");

//Cart open
cartBtn.addEventListener("click", () => {
  let cartState = cartBox.getAttribute("data-checked");

  if (cartState == "false") {
    cartBox.setAttribute("data-checked", "true");
    cartBox.style.display = "grid";
  } else if ((cartState = "true")) {
    cartBox.setAttribute("data-checked", "false");
    cartBox.style.display = "none";
  }
});

//Chenaging main image
for (let i = 0; i < thumbImgs.length; i++) {
  thumbImgs[i].addEventListener("click", () => {
    let imgIndex = i + 1;
    mainProdImage.src = `images/image-product-${imgIndex}.jpg`;
    for (let thumb of thumbImgs) {
      thumb.setAttribute("data-checked", "false");
    }
    thumbImgs[i].setAttribute("data-checked", "true");
  });
}

//Main image slider
let dialogImgIndex = 1;

function showSlider() {
  dialogSlider.showModal();
  dialogSlider.style.display = "grid";
}

mainProdImage.addEventListener("click", showSlider);

dialogCloseBtn.addEventListener("click", () => {
  dialogSlider.close();
  dialogSlider.style.display = "none";
});

function dialogImgChange() {
  if (dialogImgIndex > dialogThumbImgs.length) {
    dialogImgIndex = 1;
  }

  if (dialogImgIndex < 1) {
    dialogImgIndex = dialogThumbImgs.length;
  }

  dialogMainImg.src = `images/image-product-${dialogImgIndex}.jpg`;

  for (let thumb of dialogThumbImgs) {
    thumb.setAttribute("data-checked", "false");
  }

  dialogThumbImgs[dialogImgIndex - 1].setAttribute("data-checked", "true");
}

dialogArrowLeft.addEventListener("click", () => {
  dialogImgIndex--;

  dialogImgChange();
});

dialogArrowRight.addEventListener("click", () => {
  dialogImgIndex++;
  dialogImgChange();
});

for (let a = 0; a < dialogThumbImgs.length; a++) {
  dialogThumbImgs[a].addEventListener("click", () => {
    let dialogThumbIndex = dialogThumbImgs[a].getAttribute("data-index");

    dialogImgIndex = dialogThumbIndex;

    dialogMainImg.src = `images/image-product-${dialogThumbIndex}.jpg`;
    for (let thumb of dialogThumbImgs) {
      thumb.setAttribute("data-checked", "false");
    }

    dialogThumbImgs[a].setAttribute("data-checked", "true");
  });
}

//Number of products, adding a product to cart and diplaying product in cart
let quantity = 0;
productQuantity.textContent = quantity;

minusNumBtn.addEventListener("click", () => {
  if (quantity <= 0) {
    return;
  }

  quantity--;
  productQuantity.textContent = quantity;
});

plusNumBtn.addEventListener("click", () => {
  quantity++;
  productQuantity.textContent = quantity;
});

buyBtn.addEventListener("click", () => {
  if (quantity == 0) {
    return;
  }
  cartInside.innerHTML = "";

  let orderPrice = quantity * 125;

  let productOrder = document.createElement("div");
  productOrder.classList.add("order-box");
  productOrder.innerHTML = `
    <div class="order-info-box">
      <img
        src="images/image-product-1-thumbnail.jpg"
        class="order-img"
      />
    <div class="order-text">
      <p class="order-title">Fall Limited Edition Sneakers</p>
      <p class="order-price-info">
        $125.00 x <span class="order-quantity">${quantity}</span>
        <strong class="order-price">$${orderPrice}.00</strong>
      </p>
    </div>
      <button class="delete-btn">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
    <button class="checkout-btn btn">Checkout</button>`;
  cartInside.appendChild(productOrder);

  const checkoutBtn = document.querySelector(".checkout-btn");
  const deleteOrderBtn = document.querySelector(".delete-btn");

  deleteOrderBtn.addEventListener("click", () => {
    cartInside.innerHTML = `<p class="empty-cart-text">Your cart is empty</p>`;

    quantity = 0;
    productQuantity.textContent = 0;

    cartIndicator.style.display = "none";
    cartIndicator.textContent = "";
  });

  cartIndicator.style.display = "grid";
  cartIndicator.textContent = quantity;
});

//Side bar (viewport width < 950px)

console.log(sideBarBtn);
console.log(sideBarBox);

sideBarBtn.addEventListener("click", () => {
  let sideBarState = sideBarBox.getAttribute("data-checked");

  if (sideBarState === "false") {
    sideBarBox.setAttribute("data-checked", "true");
  }
});

sideBarCloseBtn.addEventListener("click", () => {
  let sideBarState = sideBarBox.getAttribute("data-checked");

  if (sideBarState === "true") {
    sideBarBox.setAttribute("data-checked", "false");
  }
});

if (window.innerWidth <= 600) {
  mainProdImage.removeEventListener("click", showSlider);
  let smallSliderIndex = 1;

  leftArrow.addEventListener("click", () => {
    smallSliderIndex--;

    if (smallSliderIndex <= 0) {
      smallSliderIndex = thumbImgs.length;
    }

    mainProdImage.src = `images/image-product-${smallSliderIndex}.jpg`;
  });

  rightArrow.addEventListener("click", () => {
    smallSliderIndex++;

    if (smallSliderIndex > thumbImgs.length) {
      smallSliderIndex = 1;
    }

    mainProdImage.src = `images/image-product-${smallSliderIndex}.jpg`;
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 600) {
    mainProdImage.removeEventListener("click", showSlider);
    let smallSliderIndex = 1;

    leftArrow.addEventListener("click", () => {
      smallSliderIndex--;

      if (smallSliderIndex <= 0) {
        smallSliderIndex = thumbImgs.length;
      }

      mainProdImage.src = `images/image-product-${smallSliderIndex}.jpg`;
    });

    rightArrow.addEventListener("click", () => {
      smallSliderIndex++;

      if (smallSliderIndex > thumbImgs.length) {
        smallSliderIndex = 1;
      }

      mainProdImage.src = `images/image-product-${smallSliderIndex}.jpg`;
    });
  } else {
    mainProdImage.addEventListener("click", showSlider);
  }
});
