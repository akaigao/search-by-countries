const countries = document.querySelector(".countries");

export default async function (element) {
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
  countries.append(countryContainer);
}
