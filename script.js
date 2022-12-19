const countries = document.querySelector(".countries");
const select = document.querySelector(".input__container select");
const buttonBackToTop = document.querySelector(".backToTop");
const switchButton = document.querySelector(".switch__site--mode input");
const cssDarkMode = document.querySelector("#darkMode");
import api from "./utils/api.js";
import createCards from "./utils/createCards.js";

let initialTheme = localStorage.getItem("theme");

try {
  const countriesAPI = await api();

  countriesAPI.map((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.append(item.name);
    select.append(option);

    createCards(item);
  });
} catch (error) {
  console.log(error.message);
}

select.addEventListener("change", (e) => {
  let researchedCountry = e.target.value;

  const allCountries = countries.querySelectorAll(".country__container");
  allCountries.forEach((element) => {
    const nameCountry = element.children[0].firstChild.textContent;

    if (researchedCountry === "all" || nameCountry === researchedCountry) {
      element.classList.remove("hidden");
      return;
    }

    if (nameCountry != researchedCountry) {
      element.classList.add("hidden");
    }
  });
});

buttonBackToTop.addEventListener("click", () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
});

if (initialTheme === "dark") {
  switchButton.checked = "true";
  cssDarkMode.href = "css/dark-mode/style.css";
  buttonBackToTop.children[0].src = "assets/uparrow-white.svg";
}

switchButton.addEventListener("click", (e) => {
  const checked = e.target.checked;

  if (checked) {
    cssDarkMode.href = "css/dark-mode/style.css";
    buttonBackToTop.children[0].src = "assets/uparrow-white.svg";
  }

  if (!checked) {
    cssDarkMode.href = "";
    buttonBackToTop.children[0].src = "assets/uparrow.svg";
  }

  localStorage.setItem(
    "theme",
    !initialTheme || initialTheme === "light" ? "dark" : "light"
  );

  initialTheme = localStorage.getItem("theme");
  localStorage.theme = initialTheme;
});
