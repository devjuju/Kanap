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
    let img = document.querySelector(".item__img");
    img.innerHTML = "<img src="+i.imageUrl+"alt="+'"'+i.altTxt+'"'+">";
  
    let name = document.getElementById("title");
    name.innerHTML =  i.name;

    let price = document.getElementById("price");
    price.innerHTML = i.price;

    let description = document.getElementById("description");
    description.innerHTML = i.description;
 
    let color = document.getElementById("colors");
    for (let j of i.colors) {
      color.innerHTML += "<option value="+j+">"+j+"</option>";
    }
      }
    })
    .catch((error) => {
      console.log(error);
    });
      
productsFetch();

function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

const toCartBtn = document.getElementById("addToCart");
const goToCartButton = document.getElementById("goToCart");
goToCartButton.style.display = "none";

toCartBtn.addEventListener("click", () => {
  let qty = parseInt(qtyValue());
  let color = colorValue();
  add2Cart(id, color, qty);
  goToCartButton.style.display = "block";
});

goToCartButton.addEventListener("click", () => {
  window.location.href = "./cart.html";
});