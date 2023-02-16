


const positionEmptyCart = document.querySelector("#cart__items");
let Storage = JSON.parse(localStorage.getItem("produit"));
console.table(Storage);

// Cette fonction permet d'enregistrer le panier dans le localStorage
// L'idée est d'enregistrer une valeur par rapport à une clé
function saveCart(Storage){
    localStorage.setItem("produit",JSON.stringify(Storage));
}

function getCart(){
    
    if (Storage === null || Storage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
    for (let sofa in Storage){
        // Insertion de l'élément "article"
        let articleSofa = document.createElement("article");
        document.querySelector("#cart__items").appendChild(articleSofa);
        articleSofa.className = "cart__item";
        articleSofa.setAttribute('data-id', Storage[sofa].idProduit);
    
        // Insertion de l'élément "div"
        let articleDivImg = document.createElement("div");
        articleSofa.appendChild(articleDivImg);
        articleDivImg.className = "cart__item__img";
    
        // Insertion de l'image
        let articleImg = document.createElement("img");
        articleDivImg.appendChild(articleImg);
        articleImg.src = Storage[sofa].imgProduit;
        articleImg.alt = Storage[sofa].altImgProduit;
        
        // Insertion de l'élément "div"
        let articleItemContent = document.createElement("div");
        articleSofa.appendChild(articleItemContent);
        articleItemContent.className = "cart__item__content";
    
        // Insertion de l'élément "div"
        let articleItemContentTitlePrice = document.createElement("div");
        articleItemContent.appendChild(articleItemContentTitlePrice);
        articleItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion du titre h3
        let articleTitle = document.createElement("h2");
        articleItemContentTitlePrice.appendChild(articleTitle);
        articleTitle.innerHTML = Storage[sofa].nomProduit;
    
        // Insertion de la couleur
        let articleColor = document.createElement("p");
        articleTitle.appendChild(articleColor);
        articleColor.innerHTML = Storage[sofa].couleurProduit;
        articleColor.style.fontSize = "20px";
    
        // Insertion du prix
        let articlePrice = document.createElement("p");
        articleItemContentTitlePrice.appendChild(articlePrice);
        articlePrice.innerHTML = Storage[sofa].prixProduit + " €";
    
        // Insertion de l'élément "div"
        let articleItemContentSettings = document.createElement("div");
        articleItemContent.appendChild(articleItemContentSettings);
        articleItemContentSettings.className = "cart__item__content__settings";
    
        // Insertion de l'élément "div"
        let articleItemContentSettingsQuantity = document.createElement("div");
        articleItemContentSettings.appendChild(articleItemContentSettingsQuantity);
        articleItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion de "Qté : "
        let articleQte = document.createElement("p");
        articleItemContentSettingsQuantity.appendChild(articleQte);
        articleQte.innerHTML = "Qantité : ";
    
        // Insertion de la quantité
        let articleQuantity = document.createElement("input");
        articleItemContentSettingsQuantity.appendChild(articleQuantity);
        articleQuantity.value = Storage[sofa].quantiteProduit;
        articleQuantity.className = "itemQuantity";
        articleQuantity.setAttribute("type", "number");
        articleQuantity.setAttribute("min", "1");
        articleQuantity.setAttribute("max", "100");
        articleQuantity.setAttribute("name", "itemQuantity");
    
        // Insertion de l'élément "div"
        let articleItemContentSettingsDelete = document.createElement("div");
        articleItemContentSettings.appendChild(articleItemContentSettingsDelete);
        articleItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
        // Insertion de "p" supprimer
        let articleSupprimer = document.createElement("p");
        articleItemContentSettingsDelete.appendChild(articleSupprimer);
        articleSupprimer.className = "deleteItem";
        articleSupprimer.innerHTML = "Supprimer";
    }
    }}
    getCart();
    


// Cette fonction permet de calculer le total du prix dans le panier
function getTotalPrice(){

   let total = 0;
   for(let sofa in Storage){
    total += Storage[sofa].quantiteProduit * Storage[sofa].prixProduit;
   }
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
     number += Storage[sofa].quantiteProduit
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

            let idRemove = Storage[sofa].idProduit;
            let colorRemove = Storage[sofa].couleurProduit;

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