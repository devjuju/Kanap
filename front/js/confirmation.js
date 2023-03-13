let orderId = new URL(window.location.href).searchParams;
let id = orderId.get("orderId");
function main(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = id;
    localStorage.clear();
}

main();
