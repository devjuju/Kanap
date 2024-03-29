// On initialise le panier
let Storage = JSON.parse(localStorage.getItem("produit"));
console.table(Storage);

const positionEmptyCart = document.querySelector("#cart__items");

function getCart(){
    if (Storage === null || Storage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;

        // Total du panier
        let totalPrice = 0;

        let articleTotalPrice = document.getElementById('totalPrice');
        articleTotalPrice.innerHTML = totalPrice;
        console.log("Total du prix panier",totalPrice)

        // Nombre de produits présents dans le panier
        let numberSofas = 0;

        let articleTotalQuantity = document.getElementById('totalQuantity');
        articleTotalQuantity.innerHTML = numberSofas;
        console.log("nombre de produits",numberSofas);
    
    } else{
        let total = 0;
        let number = 0;
        for (let produit of Storage) {
         let optionsProduit = {
                idProduit: produit.idProduit,
                couleurProduit: produit.couleurProduit,
                quantiteProduit: produit.quantiteProduit,
            }; 
            fetch("http://localhost:3000/api/products/" + optionsProduit.idProduit)
            .then(function(response) {
                if (response.ok) {
                    response.json()
                    .then(function(produit) {

                        // Insertion de l'élément "article"
                        let articleSofa = document.createElement("article");
                        document.querySelector("#cart__items").appendChild(articleSofa);
                        articleSofa.className = "cart__item";
                        articleSofa.setAttribute("data-id", optionsProduit.idProduit);
                        articleSofa.setAttribute("data-color", optionsProduit.couleurProduit);

                        // Insertion de l'élément "div"
                        let articleDivImg = document.createElement("div");
                        articleSofa.appendChild(articleDivImg);
                        articleDivImg.className = "cart__item__img";

                        // Insertion de l'image
                        let articleImg = document.createElement("img");
                        articleDivImg.appendChild(articleImg);
                        articleImg.src = produit.imageUrl;
                        articleImg.alt = produit.altTxt;
   
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
                        articleTitle.innerHTML = produit.name;

                        // Insertion de la couleur
                        let articleColor = document.createElement("p");
                        articleTitle.appendChild(articleColor);
                        articleColor.innerHTML = optionsProduit.couleurProduit;
                        articleColor.style.fontSize = "20px";

                        // Insertion du prix
                        let articlePrice = document.createElement("p");
                        articleItemContentTitlePrice.appendChild(articlePrice);
                        articlePrice.innerHTML = produit.price + " €";

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
                        let quantiteProduit = document.createElement("input");
                        articleItemContentSettingsQuantity.appendChild(quantiteProduit);
                        quantiteProduit.value = optionsProduit.quantiteProduit;
                        quantiteProduit.className = "itemQuantity";
                        quantiteProduit.setAttribute("type", "number");
                        quantiteProduit.setAttribute("min", "1");
                        quantiteProduit.setAttribute("max", "100");
                        quantiteProduit.setAttribute("name", "itemQuantity");

                        // Insertion de l'élément "div"
                        let articleItemContentSettingsDelete = document.createElement("div");
                        articleItemContentSettings.appendChild(articleItemContentSettingsDelete);
                        articleItemContentSettingsDelete.className = "cart__item__content__settings__delete";

                        // Insertion de "p" supprimer
                        let articleSupprimer = document.createElement("p");
                        articleItemContentSettingsDelete.appendChild(articleSupprimer);
                        articleSupprimer.className = "deleteItem";
                        articleSupprimer.innerHTML = "Supprimer";
 
                        // Calculer le prix total
                        total += optionsProduit.quantiteProduit * produit.price;
  
                        let productTotalPrice = document.getElementById('totalPrice');
                        productTotalPrice.innerHTML = total;
                        console.log("Total du prix panier",total)

                        // Afficher le nombre de produits présents dans le panier
                        number += optionsProduit.quantiteProduit

                        let productTotalQuantity = document.getElementById('totalQuantity');
                        productTotalQuantity.innerHTML = number;
                        console.log("Nombre de produits",number);

                        // Changer la quantité du produit
                        quantiteProduit.addEventListener("change" , (event) => {
                            event.preventDefault();

                            let idChange = optionsProduit.idProduit;
                            let colorChange = optionsProduit.couleurProduit;

                            if (Storage) {
                                let resultFind = Storage.find(el => el.idProduit === idChange && el.couleurProduit === colorChange);
                         
                                if (resultFind) {
                                    resultFind.quantiteProduit = Number(quantiteProduit.value);
                                    localStorage.setItem("produit",JSON.stringify(Storage));
                                    console.table(Storage);

                                } else {
                                    Storage.push(produit);
                                    localStorage.setItem("produit",JSON.stringify(Storage));
                                    console.table(Storage);
                                }
                                location.reload();
                            } 
                        })
  
                        // Supprimer son produit
                        articleSupprimer.addEventListener("click" , (event) =>{

                            event.preventDefault();

                            let idRemove = optionsProduit.idProduit;
                            let colorRemove = optionsProduit.couleurProduit;
        
                            cartContent = Storage.filter( el => el.idProduit !== idRemove || el.couleurProduit !== colorRemove ); 

                            localStorage.setItem("produit",JSON.stringify(cartContent));

                            alert("Ce produit a bien été supprimé du panier");
                            location.reload();
                        })      
                    })
                 
                } else {
                    emptyCart(response);
                }
            })
            .catch(function(err) {
                emptyCart(err);
            });
           
        }
    }
}
getCart();

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
            errorFormFirstName = false;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            errorFormFirstName = true;
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
            errorFormLastName = false;
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            errorFormLastName = true;
            
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
            errorFormAddress = false;
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            errorFormAddress = true;
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
            errorFormCity = false;
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            errorFormCity = true;
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
            errorFormEmail = false;
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
            errorFormEmail = true;
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const button_order = document.getElementById("order");
    //Ecouter le panier
    button_order.addEventListener("click", (event)=>{
        event.preventDefault();
        //Récupération des coordonnées du formulaire client
        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');
        
        // Si le panier est vide. La commande n'est pas validée par l'utilisateur.
        if(Storage === null || Storage == 0){
            alert ("votre panier est vide");
        } else{
            // On vérifie que tous les champs sont bien renseignés, sinon on indique un message à l'utilisateur
            // On vérifie qu'aucun champ n'est vide
            if(!inputFirstName.value || !inputLastName.value || !inputAdress.value || !inputCity.value || !inputEmail.value){
                alert("Vous devez renseigner tous les champs !");
                event.preventDefault();
            }  
            // On vérifie que les champs sont correctement remplis suivant les regex mises en place
            else if(errorFormFirstName === true || errorFormLastName === true || errorFormAddress === true
                ||errorFormCity === true || errorFormEmail === true){
                alert("Veuillez vérifier les champs du formulaire et les remplir correctement !");
                event.preventDefault();
            }
            
            else {
            //Construction d'un array depuis le local storage
            let idProducts = [];
            for (let sofa in Storage) {
                idProducts.push(Storage[sofa].idProduit);
            }
            console.log(idProducts);

            const order = {
                contact : {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                products: idProducts,
            } 
        
            // On indique la méthode d'envoi des données
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
                document.location.href = 'confirmation.html?orderId=' + data.orderId;
            })
            .catch(error => {
                console.log('error', error);
                alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
            });

        }}
    })
}
postForm();
