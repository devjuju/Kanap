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
    // Insertion de l'image
    let articleImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(articleImg);
    articleImg.src = sofa.imageUrl;
    articleImg.alt = sofa.altTxt;

    // Modification du titre "h1"
    let articleName = document.getElementById('title');
    articleName.innerHTML = sofa.name;

    // Modification du prix
    let articlePrice = document.getElementById('price');
    articlePrice.innerHTML = sofa.price;

    // Modification de la description
    let articleDescription = document.getElementById('description');
    articleDescription.innerHTML = sofa.description;

    // Insertion des options de couleurs
    for (let colors of sofa.colors){
        console.table(colors);
        let articleColors = document.createElement("option");
        document.querySelector("#colors").appendChild(articleColors);
        articleColors.value = colors;
        articleColors.innerHTML = colors;
    }
   
}


joinEvent();
 // Fonction pour joindre un événement
function joinEvent(){
    const button_addToCart = document.querySelector("#addToCart");
    button_addToCart.addEventListener("click",  (event)=>{
        addToCart();
    })
}

// Cette fonction permet d'ajouter le produit au panier
function addToCart(){
    //Recupération du choix de la couleur
    let choixCouleur = choiceColor.value;
    if(choixCouleur == "") {
        alert("veuillez choisir une couleur");
        return;
    }
    
    //Recupération du choix de la quantité
    let choixQuantite = choiceQuantity.value;
    if (Number(choixQuantite) < 1 || Number(choixQuantite) > 100) {
        alert("veuillez choisir une quantitée entre 1 et 100");
        return;
    }

    else {
        //Récupération des options de l'article à ajouter au panier
        let optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
        };

        //Importation dans le local storage
        let Storage = JSON.parse(localStorage.getItem("produit"));

        //Si le panier comporte déjà au moins 1 article
        if (Storage) {
            let resultFind = Storage.find(el => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
            //Si le produit commandé est déjà dans le panier
            if (resultFind != undefined) {
                let newQuantite =
                parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                resultFind.quantiteProduit = newQuantite;
                localStorage.setItem("produit",JSON.stringify(Storage));
                console.table(Storage);
               
            //Si le produit commandé n'est pas dans le panier
            } else {
                Storage.push(optionsProduit);
                localStorage.setItem("produit",JSON.stringify(Storage));
                console.table(Storage);
            }
        //Si le panier est vide
        } else {
            Storage =[];
            Storage.push(optionsProduit);
            localStorage.setItem("produit",JSON.stringify(Storage));
            console.table(Storage);
        }
    }   
}  

