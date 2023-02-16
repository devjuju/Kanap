// On initialise le panier
let Storage = JSON.parse(localStorage.getItem("produit"));
console.table(Storage);

// Cette fonction permet d'enregistrer le panier dans le localStorage
// L'idée est d'enregistrer une valeur par rapport à une clé
function saveCart(Storage){
    localStorage.setItem("produit",JSON.stringify(Storage));
}

const positionEmptyCart = document.querySelector("#cart__items");
function getCart() {
    if (Storage) {
        for (let sofa of Storage) {
            let optionsProduit = {
                idProduit: sofa.idProduit,
                couleurProduit: sofa.couleurProduit,
                quantiteProduit: sofa.quantiteProduit,
            };
    
            getSofas(sofa);
        }
    } else {
        // alert("Votre panier est vide");
        emptyCart("Votre panier est vide!");
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    }
}
getCart();


function getSofas(optionsProduit) {
    fetch("http://localhost:3000/api/products/" + optionsProduit.idProduit)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(async function(sofa) {
                        displaySofas(sofa, optionsProduit);
                    })
             
            } else {
                emptyCart(response);
            }
        })
        .catch(function(err) {
            emptyCart(err);
        });
}



function displaySofas(sofa, optionsProduit) {
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', optionsProduit.idProduit);

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = sofa.imageUrl;
    productImg.alt = sofa.altTxt;
    
    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = sofa.name;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = optionsProduit.couleurProduit;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = sofa.price + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Quantité : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = optionsProduit.quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";

}




// Cette fonction permet de calculer le total du prix dans le panier
function getTotalPrice(){

   let total = 0;
  
   total += optionsProduit.quantiteProduit * sofa.price;
   
   let productTotalPrice = document.getElementById('totalPrice');
   productTotalPrice.innerHTML = total;
   console.log(total)
}
getTotalPrice();

// Cette fonction permet de calculer la quantité
// L'idée est à partir du panier d'être capable de retourner la quantité de tous les produits 
//qui se trouve dans le panier
function getNumberProduct(){

    let number = 0;
    for(let sofa in Storage){
     number += optionsProduit.quantiteProduit
    }
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = number;
    console.log(number);
}
getNumberProduct();




// Cette fonction permet de retirer un produit du panier
function removeFromCart(){
    let button_remove = document.querySelectorAll(".deleteItem");
    for(let sofa in Storage){
        button_remove[sofa].addEventListener("click" , (event) => {
            event.preventDefault();

            let idRemove = optionsProduit.idProduit;
            let colorRemove = optionsProduit.couleurProduit;

            Storage = Storage.filter( el => el.idProduit !== idRemove || el.couleurProduit !== colorRemove );

            saveCart(Storage)
            
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
removeFromCart()





function changeQuantity() {

    let qttChange = document.querySelectorAll(".itemQuantity");

    for (let sofa in Storage){
        qttChange[sofa].addEventListener("change" , (event) => {
            event.preventDefault();

            let quantityChange = Storage[sofa].quantiteProduit;
            let qttChangeValue = qttChange[sofa].valueAsNumber;
            
            const FindSofa = Storage.find((el) => el.qttChangeValue !== quantityChange);
            
            FindSofa.quantiteProduit = qttChangeValue;
            Storage[sofa].quantiteProduit = FindSofa.quantiteProduit;

            saveCart(Storage);   
            // refresh rapide
            location.reload();
        })
    }
}
changeQuantity();

// Cette fonction permet d'instaurater le formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const button_order = document.getElementById("order");

    //Ecouter le panier
    button_order.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let sofa in Storage) {
            idProducts.push(Storage[sofa].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
    })
}
postForm();