fillSection();

// Récupération des articles de l'API
async function getSofas() {
    var sofasCatch = await fetch("http://localhost:3000/api/products")
    return await sofasCatch.json();
}

// Répartition des données de l'API dans le DOM
async function fillSection() {
    var result = await getSofas ()
    .then(function (resultatAPI){
        const sofas = resultatAPI;
        console.table(sofas);
        for (let sofa in sofas) {

            // Insertion de l'élément "a"
            let articleLink = document.createElement("a");
            document.querySelector(".items").appendChild(articleLink);
            articleLink.href = `product.html?id=${resultatAPI[sofa]._id}`;

            // Insertion de l'élément "article"
            let articleSofa = document.createElement("article");
            articleLink.appendChild(articleSofa);

            // Insertion de l'image
            let articleImg = document.createElement("img");
            articleSofa.appendChild(articleImg);
            articleImg.src = resultatAPI[sofa].imageUrl;
            articleImg.alt = resultatAPI[sofa].altTxt;

            // Insertion du titre "h3"
            let articleName = document.createElement("h3");
            articleSofa.appendChild(articleName);
            articleName.classList.add("productName");
            articleName.innerHTML = resultatAPI[sofa].name;

            // Insertion de la description "p"
            let articleDescription = document.createElement("p");
            articleSofa.appendChild(articleDescription);
            articleDescription.classList.add("productName");
            articleDescription.innerHTML = resultatAPI[sofa].description;
        }
    })
    .catch (function(error){
        return error;
    });
}