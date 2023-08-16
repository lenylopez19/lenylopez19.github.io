const API = "https://dog.ceo/api";
const listAllDogs = "breeds/list/all";
let globalDogs = [];

function getRamdonDog(dogArr, maxDogs) {
  let newDogArr = [];
  let numberOfDogs = dogArr.length - 1;
  for (let i = 0; i < maxDogs; i++) {
    const randomDog = Math.round(Math.random() * numberOfDogs);

    if (!newDogArr.includes(dogArr[randomDog]))
      newDogArr.push(dogArr[randomDog]);
    else i--;
  }
  return newDogArr;
}

const getDogs = async (numberOfDogs) => {
  showLoading();
  let result;

  try {
    result = await fetch(`${API}/${listAllDogs}`);
  } catch {
    console.error("something went wrong fetching the dogs info", err);
  }

  if (result?.ok) {
    const dataJson = await result.json();
    globalDogs = Object.entries(dataJson.message);
    const dogsToDisplay = getRamdonDog(globalDogs, numberOfDogs);

    for (const dog of dogsToDisplay) {
      const [dogName, dogBreeds] = dog;
      const dogObj = {
        name: dogName,
        breed: dogBreeds,
      };
      getDogsImg(dogObj, renderDogs);
    }
  } else {
    console.log(`HTTP Response Code: ${result?.status}`);
  }
};

const getDogsImg = async (dogObj, fn) => {
  let result;
  try {
    result = await fetch(`${API}/breed/${dogObj.name}/images/random`);
  } catch (err) {
    console.error("error fetching img", err);
  }

  if (result?.ok) {
    const dataJson = await result.json();
    const dogImageUrl = dataJson.message;
    dogObj.imageUrl = dogImageUrl;
    fn(dogObj, 3);
  } else {
    console.log(result?.status);
  }
};

function renderDogs(dogObj, breedLimit) {
  const { name: dogName, breed: breeds, imageUrl: dogImageUrl } = dogObj;
  let breedList = "";
  const breedExist = breeds.length;

  if (breedExist) {
    for (let i = 0; i < breeds.length; i++) {
      if (i >= breedLimit) break;
      breedList += `<li>${breeds[i]}</li>`;
    }
  } else {
    breedList = `<li>no breed</li>`;
  }

  const htmlCard = `
    <article id = "dog_${dogName}"class="card">
        <div class="sub-breed">
            <ul>
                  ${breedList}
            </ul>
        </div>
        <img onerror="this.src='assets/errorImg.jpeg'" id="IMG_${dogName}" src="${dogImageUrl}" class="dogImage" alt="${dogName}">
        <h2 class="mainTitle">${dogName}</h2>
    </article>
    `;
  hideLoading();
  document.getElementById("contentHolder").innerHTML += htmlCard;

  setTimeout(() => {
    document.getElementById(`dog_${dogName}`).style.opacity = 1;
  }, 200);
}

function search(char) {
  showLoading();
  char = char.toLowerCase();
  const result = [...globalDogs].filter((dog) => dog[0].includes(char));
  if (result.length) {
    for (const dog of result) {
      const dogName = dog[0];
      const dogBreeds = dog[1];
      const newDog = {
        name: dogName,
        breed: dogBreeds,
      };
      getDogsImg(newDog, renderDogs);
    }
  } else {
    hideLoading();
  }
}

const searchInput = document.getElementById("searchDog");
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (this.value) {
      document.getElementById("contentHolder").innerHTML = "";
      search(this.value);
    }
  }
});

// Woops, something went wrong

function showError(errorMsg){
  const html = `
  <div class="errorMsj">
    <img src="assets/Group 1.png" alt="error" />
    <h2 class="errorTittle">${errorMsg}</h2>
    <button class="reload">Try Again</button>
  </div>
  `;
}

function hideError(){
  const errorElement = document.querySelector(".errorMsj");
  if(errorElement){
    document.querySelector(".errorMsj").remove();
  }
}

function showLoading() {
  const loading = document.querySelector(".loading");

  loading.style.display = "flex";
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
}

getDogs(16);

const logo = document.querySelector(".home");

logo.addEventListener("click", function () {

  document.getElementById("contentHolder").innerHTML = "";
  getDogs(16);
});
