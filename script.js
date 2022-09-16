const countrys = document.querySelector(".countrys"),
  search = document.querySelector(".input__container input"),
  buttonBackToTop = document.querySelector(".backToTop"),
  buttonShowAll = document.querySelector(".input__button");

const translate = (string, from, to) => {
  return new Promise((resolve) => {
    fetch(
      `https://api.mymemory.translated.net/get?q=${string}!&langpair=${from}|${to}`
    ).then((response) => {
      const promiseBody = response.json();
      promiseBody.then((body) => {
        string = body.responseData.translatedText;
        resolve(string);
      });
    });
  });
};

const captalizeString = (string) => {
  const splitString = string.split(" ");
  let newString = "";
  splitString.forEach((element) => {
    newString +=
      element[0].toUpperCase() + element.slice(1).toLowerCase() + " ";
  });
  return newString.trim();
};

const createCards = (element) => {
  const countryContainer = document.createElement("div");
  countryContainer.classList.add(
    "country__container",
    "flex",
    "align-items",
    "justify-content"
  );

  const flagContainer = document.createElement("div");
  flagContainer.classList.add(
    "flag__container",
    "flex",
    "align-items",
    "justify-content"
  );

  const title = document.createElement("h1");
  title.textContent = element.name;

  const flag = document.createElement("img");
  flag.src = element.flag;
  flag.classList.add("flag");
  flagContainer.append(title, flag);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info__container", "flex", "align-items");

  for (let i = 1; i <= 3; i++) {
    const infoBox = document.createElement("div");
    infoBox.classList.add("info__box");
    const spanInfoBox = document.createElement("span");
    const pInfoBox = document.createElement("p");

    if (i === 1) {
      spanInfoBox.textContent = "Região";
      pInfoBox.textContent = element.region;
    } else if (i === 2) {
      spanInfoBox.textContent = "Capital";
      pInfoBox.textContent = element.capital;
    } else if (i === 3) {
      spanInfoBox.textContent = "População";
      pInfoBox.textContent = element.population;
    }
    infoBox.append(spanInfoBox, pInfoBox);
    infoContainer.append(infoBox);
  }

  const button = document.createElement("button");
  button.classList.add("buttonCard");
  const iconMap = document.createElement("img");
  iconMap.src = "assets/location-pin.svg";
  iconMap.width = "20";

  const linkMaps = document.createElement("a");
  linkMaps.href = `https://www.google.com.br/maps/place/${title.textContent}`;
  linkMaps.target = "_blank";

  const titleButton = document.createElement("span");
  titleButton.append(linkMaps);
  linkMaps.textContent = "VER NO MAPA";

  button.append(iconMap, titleButton);

  countryContainer.append(flagContainer, infoContainer, button);
  countrys.append(countryContainer);
};

fetch("https://restcountries.com/v2/all").then((response) => {
  const promiseBody = response.json();
  promiseBody.then((body) => {
    body.forEach((element) => {
      createCards(element);
    });
  });
});

search.addEventListener("keydown", async (event) => {
  if (event.key != "Enter" || search.value === "") return;

  let researchedCountry = captalizeString(search.value);
  researchedCountry.trim();

  researchedCountry = await translate(researchedCountry, "pt-br", "en");

  const allCountrys = countrys.querySelectorAll(".country__container");
  allCountrys.forEach((element) => {
    const nameCountry = element.children[0].firstChild.textContent;

    if (nameCountry != researchedCountry) {
      element.classList.add("hidden");
    } else if (nameCountry === researchedCountry) {
      element.classList.remove("hidden");
    }
  });
});

buttonBackToTop.addEventListener("click", () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
});

buttonShowAll.addEventListener("click", () => {
  const allCountrys = countrys.querySelectorAll(".country__container");
  allCountrys.forEach((element) => {
    element.classList.remove("hidden");
    search.value = "";
  });
});
