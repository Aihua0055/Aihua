// const { BCardTitle } = require("bootstrap-vue");

const url =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

let container = document.querySelector('#results');
let loading_img = document.querySelector('#loading');

function createBeverageCard(imageURL,name){
  let gridItem = document.createElement('div');
  gridItem.className = "grid-item";
  container.append(gridItem);

  let figureElement = document.createElement('figure');
  gridItem.append(figureElement);

  let myImage = new Image();
  myImage.src = imageURL;
  myImage.alt = "Beverage image:" + name;
  myImage.title = "beverage title";
  myImage.className = "image"
  figureElement.append(myImage);


  let beverageName = document.createElement('p')
  beverageName.className = "title";
  const beverageNameContent = document.createTextNode(name);
  beverageName.appendChild(beverageNameContent);
  figureElement.append(beverageName)


}

async function fetchData(){
  let response = await fetch(url);
  console.log(response.status);
  if (!response.ok){
    throw new Error(`HTTP error! status: ${response.statusText}`);
  } else{
    return await response.json();
  }

}

fetchData().then((data)=>{
  loading_img.remove();
  data.drinks.forEach((item)=>{
    createBeverageCard(item.strDrinkThumb,item.strDrink)
  });
}).catch(e=>{
  console.log(e);
  loading_img.remove();
  let errorElement = document.createElement('p');
  const errorContent = document.createTextNode(e + ".Please try again.");
  errorElement.appendChild(errorContent);
  container.append(errorElement)

});