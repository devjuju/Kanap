var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let sofa = "";

const choiceColor = document. querySelector("#colors");
const choiceQuantity = document.querySelector("#quantity");

getSofa();

// Récupération des articles de l'API
function getSofa() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        sofa = await resultatAPI;
        console.table(sofa);
        if (sofa){
            getPost(sofa);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(sofa){
    let img = document.querySelector(".item__img");
    img.innerHTML = "<img src="+sofa.imageUrl+" alt="+'"'+sofa.altTxt+'"'+">";
          
    let name = document.getElementById("title");
    name.innerHTML =  sofa.name;
        
    let price = document.getElementById("price");
    price.innerHTML = sofa.price;
        
    let description = document.getElementById("description");
    description.innerHTML = sofa.description;

    // Insertion des options de couleurs
    
    for (let colors of sofa.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
  
}

//Gestion du panier
 // événement d'appel au clic
 joinEvent();
 // Fonction pour joindre un événement
 function joinEvent(){
     const button_addToCart = document.querySelector("#addToCart");
     button_addToCart.addEventListener("click",  (event)=>{
         
         addToCart(sofa)
     })
 }


 // Cette fonction permet d'enregistrer le panier dans le localStorage
 // L'idée est d'enregistrer une valeur par rapport à une clé
 function saveCart(Storage){
    localStorage.setItem("produit",JSON.stringify(Storage));
  }

 

  function addToCart(sofa){
    if (choiceQuantity.value > 0 && choiceQuantity.value <=100 && choiceQuantity.value != 0){

        //Recupération du choix de la couleur
        let choixCouleur = choiceColor.value;
                    
        //Recupération du choix de la quantité
        let choixQuantite = choiceQuantity.value;
    
        //Récupération des options de l'article à ajouter au panier
        let optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            nomProduit: sofa.name,
            prixProduit: sofa.price,
            descriptionProduit: sofa.description,
            imgProduit: sofa.imageUrl,
            altImgProduit: sofa.altTxt
        };
    
   
    
        //fenêtre pop-up
        const popupConfirmation =() =>{
            if(window.confirm(`Votre commande de ${choixQuantite} ${sofa.name} ${choixCouleur} est ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }
        let Storage = JSON.parse(localStorage.getItem("produit"));
        //Importation dans le local storage
        //Si le panier comporte déjà au moins 1 article
        if (Storage) {
        let resultFind = Storage.find(el => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
            //Si le produit commandé est déjà dans le panier
            if (resultFind != undefined) {
                let newQuantite =
                parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                resultFind.quantiteProduit = newQuantite;
                saveCart(Storage);
                console.table(Storage);
                popupConfirmation();
            //Si le produit commandé n'est pas dans le panier
            } else {
                Storage.push(optionsProduit);
                saveCart(Storage);
                console.table(Storage);
                popupConfirmation();
            }
        //Si le panier est vide
        } else {
            emptyCart();
            popupConfirmation();
        }}
  }  

  function emptyCart(){
    let Storage = localStorage.getItem("produit");
    if(Storage == null){
        Storage =[];
    } else{
        return JSON.parse(Storage);
    }
 }
