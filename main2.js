//https://gist.github.com/WorkerBNTU/c41b478d07863c1ab3c87d03caacab3a

//15.Дальнейшая работа будет вестись в js. Рекомендую подключить другой js файл и в нём писать логику. Начинаем добавлять товары. 
// Сначала нужно получить данные из localStorage. Привычным образом их "распарсить" - превратить в объект.
// 16.Находим наш div class="products" в js, чтобы дальше с ним работать.
// Пишем код, который будет обновлять нашу корзину. Логика уже известна: перебираем наши объекты, полученные из объекта (пункт 15), и добавляем в наш div class="products".
// for (const key in productData) {
//   const product = productData[key];
//   // создать и добавить элементы для одного товара
// }
//Обратите внимание, что сейчас мы в цикле перебираем КЛЮЧИ (key) из ОБЪЕКТА (productData), а потом обращаемся по этому ключи. Зачем - можете узнать, написав парочку косноль.лог с вашими переменными.


const productData = JSON.parse(localStorage.getItem("cart"));
const productsContainer = document.querySelector(".products");

//  //обновление цифры в корзине
//   function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || {};
//   let itemCount = 0;
//   for (const key in cart) {
//     itemCount += cart[key].amount;
//   }
//   document.querySelector("#cart-count").textContent = itemCount;
// }
// Инициализация корзины товаров

updateCartCount();

productsContainer.innerHTML = "";

for (const key in productData) {
  const product = productData[key];

    // создать и добавить элементы для одного товара
  const productElement = document.createElement("div");
  productElement.className = `product ${product.id}`;

  productElement.innerHTML = `
                        <div class="product-info">
                            <img class name="close-circle" class="delete"></img class>
                             <img src="images/${product.id}.jpg">
                            <div class="product-name">${product.name}</div>
                        </div>
                        <div class="product_price">₽${product.price}</div>
                        <div class="product_quantity">
                            <img class="decrease" name="arrow-dropleft-circle"></img>
                            <span>${product.amount}</span>
                            <img class="increase" name="arrow-dropright-circle"></img>
                        </div>
                        <div class="product_total">₽${
                          product.price * product.amount
                        }</div>
                    `;

  productsContainer.appendChild(productElement);

  productElement.addEventListener("click", (event) =>
    cartButtons(event, product)
  );

  productElement.addEventListener("mousedown", (event) => {
    // Если есть дополнительные нажатия, например, при двойном клике, предотвратим выделение текста
    if (event.detail > 1) {
      event.preventDefault();
    }
  });
}

function updateProductQuantity(product) {
  const span = document.querySelector(`.${product.id} .product_quantity span`);
  span.textContent = `${product.amount}`;
}

function deleteProduct(product) {
  const deleting = document.querySelector(`.product.${product.id}`);
  deleting.remove();
}

function cartButtons(event, product) {
  if (event.target.classList.contains("delete")) {
    delete productData[product.id];
    deleteProduct(product);
  } else if (event.target.classList.contains("increase")) {
    productData[product.id].amount += 1;
    updateProductQuantity(product);
  } else if (event.target.classList.contains("decrease")) {
    if (productData[product.id].amount > 1) {
      productData[product.id].amount -= 1;
      updateProductQuantity(product);
    } else {
      delete productData[product.id];
      deleteProduct(product);
    }
  }

  localStorage.setItem("cart", JSON.stringify(productData));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let itemCount = 0;

  for (const key in cart) {
    itemCount += cart[key].amount;
  }

  document.querySelector("#cart-count").textContent = itemCount;
}