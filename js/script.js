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
        for (let sofa of sofas) {
          document.getElementById("items").innerHTML += 
          "<a href= "+"./product.html?id="+sofa._id+">"+
            "<article>"+
             "<img src="+sofa.imageUrl+" alt="+'"'+sofa.altTxt+'"'+">"+
              "<h3 class="+"productName"+">"+sofa.name+"</h3>"+
              "<p class="+"productDescription"+">"+
                sofa.description+
              "</p>"+
            "</article>"+
          "</a>"
        }
      })
  .catch (function(error){
    return error;
  });
}