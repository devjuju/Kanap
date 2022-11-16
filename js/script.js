const host = "https://kanapjmax.herokuapp.com/";
const getUrl = host + "api/products/";
  fetch(getUrl)
.then(function (res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function (value){
  for (let i of value) {
    document.getElementById("items").innerHTML += 
          "<a href= "+"./product.html?id="+i._id+">"+
            "<article>"+
             "<img src="+i.imageUrl+"alt="+'"'+i.altTxt+'"'+">"+
              "<h3 class="+"productName"+">"+i.name+"</h3>"+
              "<p class="+"productDescription"+">"+
                i.description+
              "</p>"+
            "</article>"+
          "</a>"
        ;
      }
    })
    .catch((error) => {
      console.log(error);
    });
      


