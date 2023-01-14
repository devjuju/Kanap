const positionEmptyCart = document.querySelector("#cart__items");
let Storage = JSON.parse(localStorage.getItem("produit"));
console.table(Storage);
// Cette fonction permet d'enregistrer le panier dans le localStorage
    // L'idée est d'enregistrer une valeur par rapport à une clé
    function saveCart(Storage){
        localStorage.setItem("produit",JSON.stringify(Storage));
      }

// Si le panier est vide
function getCart(){
    if (Storage === null || Storage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        const sofas = Storage;
        console.table(sofas);
        
        for (let sofa in sofas){
          
            document.getElementById("cart__items").innerHTML += 
            '<article class= "cart__item data-id="'+sofas[sofa].idProduit+'"data-color="'+sofas[sofa].couleurProduit+'"'+">"+
            '<div class= "cart__item__img"'+">"+
                '<img src="'+sofas[sofa].imgProduit
                +'" alt="'+'"'+sofas[sofa].descriptionProduit
                +'"'+">"+
              "</div>"+
    
                '<div class="cart__item__content"'+">"+
    
                    '<div class="cart__item__content__description"'+">"+
                        '<h2 class="productName"'+">"+sofas[sofa].nomProduit+"</h2>"+
                        "<p>"+sofas[sofa].couleurProduit+"</p>"+
                        "<p>"+sofas[sofa].prixProduit+"€</p>"+
                    "</div>"+
    
                    '<div class="cart__item__content__settings"'+">"+
    
                        '<div class="cart__item__content__settings__quantity"'+">"+
                            "<p>quantité</p>"+
                            '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+sofas[sofa].quantiteProduit+'"'+">"+
                        "</div>"+ 
    
                        '<div class="cart__item__content__settings__delete"'+">"+
                            "<p class="+"deleteItem"+">supprimer</p>"+
                     
                        "</div>"+ 
                    "</div>"+
                "</div>"+
            "</article>";
           
    
    
        }
    }



}
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


function removeFromCart(){
    let button_remove = document.querySelectorAll(".deleteItem");
    for(let sofa in Storage){
        button_remove[sofa].addEventListener("click" , (event) => {
            event.preventDefault();

            let idRemove = Storage[sofa].idProduit;
            let colorRemove = Storage[sofa].couleurProduit;

            Storage = Storage.filter( el => el.idProduit !== idRemove || el.couleurProduit !== colorRemove );

            saveCart(Storage)
            
            //Alerte produit supprimé et refresh
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

            //Selection de l'element à modifier en fonction de son id ET sa couleur
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


//Instauration formulaire avec regex
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