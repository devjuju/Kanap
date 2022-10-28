
function items() {
  fetch("localhost" , { method: 'GET' })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
     // ETAPE 3 Créer une boucle - Modifiez le DOM - Récupérez des données d'un service web
  })
  .catch(function(err) {
    // Une erreur est survenue
  })
}

