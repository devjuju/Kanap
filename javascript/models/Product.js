const newLocal_1 = "107fb5b75607497b96722bda5b504926";
const newLocal_2 = "415b7cacb65d43b2b5c1ff70f3393ad1";
const newLocal_3 = "055743915a544fde83cfdfc904935ee7";
const newLocal_4 = "a557292fe5814ea2b15c6ef4bd73ed83";
const newLocal_5 = "8906dfda133f4c20a9d0e34f18adcf06";
const newLocal_6 = "77711f0e466b4ddf953f677d30b0efc9";
const newLocal_7 = "034707184e8e4eefb46400b5a3774b5f";
const newLocal_8 = "a6ec5b49bd164d7fbe10f37b6363f9fb";
const name_1 = "Kanap Sinopé";
const name_2 = "Kanap Cyllène";
const name_3 = "Kanap Calycé";
const name_4 = "Kanap Autonoé";
const name_5 = "Kanap Eurydomé";
const name_6 = "Kanap Hélicé";
const name_7 = "Kanap Thyoné";
const name_8 = "Kanap orthosie";
const image_01 = "kanap01.jpeg";
const image_02 = "kanap02.jpeg";
const image_03 = "kanap03.jpeg";
const image_04 = "kanap04.jpeg";
const image_05 = "kanap05.jpeg";
const image_06 = "kanap06.jpeg";
const image_07 = "kanap07.jpeg";
const image_08 = "kanap08.jpeg";
const products = [
  {
    "colors": ["Blue", "White", "Black"],
    "_id": newLocal_1,
    "name": name_1,
    "price": 1849,
    "imageUrl": image_01,
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "_id": newLocal_2,
    "name": name_2,
    "price": 4499,
    "imageUrl": image_02,
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": "Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "_id": newLocal_3,
    "name": name_3,
    "price": 3199,
    "imageUrl": image_03,
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors": ["Pink", "White"],
    "_id": newLocal_4,
    "name": name_4,
    "price": 1499,
    "imageUrl": image_04,
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "_id": newLocal_5,
    "name": name_5,
    "price": 2249,
    "imageUrl": image_05,
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": "Photo d'un canapé gris, trois places"
  },
  {
    "colors": ["Grey", "Navy"],
    "_id": newLocal_6,
    "name": name_6,
    "price": 999,
    "imageUrl": image_06,
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": "Photo d'un canapé gris, deux places"
  },
  {
    "colors": ["Red", "Silver"],
    "_id": newLocal_7,
    "name": name_7,
    "price": 1999,
    "imageUrl": image_07,
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": "Photo d'un canapé rouge, deux places"
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "_id": newLocal_8,
    "name": name_8,
    "price": 3999,
    "imageUrl": image_08,
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": "Photo d'un canapé rose, trois places"
  }
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(products))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(products)).find(product =>
      product._id == id)
    )
  );
}




