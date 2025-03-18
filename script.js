document.addEventListener('DOMContentLoaded', function () {
  var counter = 0;
  if (localStorage.getItem("counter")) {
    counter = Number(localStorage.getItem("counter"));
  } else {
    localStorage.setItem("counter", 0);
  }

  function createProdcut(product) {
    counter += 1;
    localStorage.setItem("counter", counter);
    localStorage.setItem(
      "card" + counter,
      JSON.stringify({
        image: product.image,
        rating: product.rating,
        value: product.value,
        name: product.name,
        cost: product.cost,
        data : counter,
      })
    );
  }

  function showProdcuts() {
    let keys = Object.keys(localStorage);
    keys.sort();

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == "counter") {
        continue;
      } else {
        let card = JSON.parse(localStorage.getItem(keys[i]));

        let products = document.querySelector(".products");

        let product = document.createElement("div");
        product.className = "products__card";
        product.innerHTML = `
            
            <div class="card__image-block">  
              <img src="pictures/delete.svg" class="card__delete" data-number="${card.data}" />
              <img src="${card.image}" alt="Фото продукта" class="card__image" />
            </div>
            <div class="card__description">
              <div class="card__meta">
                <div class="card__rating">${card.rating}</div>
                <div class="card__value">${card.value}</div>
              </div>
              <div class="card__name">${card.name}</div>
              <div class="card__cost">${card.cost}</div>
            </div>
        `;
        products.prepend(product);
      }
    }
  }

  function hidePlusShowForms() {
    console.log("проверка");
    let add_picture = document.querySelector(".add_picture");
    add_picture.classList.add("hide");

    let form__fields = document.querySelector(".form__fields");
    form__fields.classList.add("show");
  }

  function addProduct() {}

  let products__add = document.querySelector(".products__add");
  products__add.addEventListener("click", hidePlusShowForms);
  let form__button = document.querySelector(".form__button");

  form__button.addEventListener("click", function (event) {
    event.preventDefault();
    let add__form = document.querySelector(".add__form");

    let form__image_path = document.querySelector(".form__image-path");
    let form__rating = document.querySelector(".form__rating");
    let form__value = document.querySelector(".form__value");
    let form__name = document.querySelector(".form__name");
    let form__cost = document.querySelector(".form__cost");

    if (add__form.checkValidity()) {
      createProdcut({
        image: form__image_path.value,
        rating: form__rating.value,
        value: form__value.value,
        name: form__name.value,
        cost: form__cost.value,
        data: counter,
      });
      location.reload();
    } else {
      alert("Заполните все поля!");
    }

    let add_picture = document.querySelector(".hide");
    add_picture.classList.remove("hide");

    let form__fields = document.querySelector(".show");
    form__fields.classList.remove("show");
  });


  showProdcuts();

  
  let del_buttons = document.querySelectorAll('.card__delete');
  
  del_buttons.forEach(function(del_button){
    del_button.addEventListener('click', function(){
      let del_button_number = del_button.getAttribute('data-number')
      let modal = document.querySelector('.modal');
      
      modal.classList.remove('closed');
      modal.classList.add('active');

      let nope_button = document.querySelector("#no")
      let yep_button = document.querySelector("#yes")

      nope_button.addEventListener('click', function(){
        modal.classList.add('closed');
        modal.classList.remove('active');   
      })
      yep_button.addEventListener('click', function(){
        console.log('u r amazing')

        modal.classList.add('closed');
        modal.classList.remove('active');

        localStorage.removeItem(`card${del_button_number}`)
        setTimeout(function(){
          location.reload()
        }, 600)
        
      })
    })
  })
  
  
})