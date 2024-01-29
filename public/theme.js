let theme = window.localStorage.getItem("theme") ?? "light";
window.theme = theme;

const themeButton = document.getElementById("switch-theme");
themeButton.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  window.localStorage.setItem("theme", theme);
  switchTheme(theme);
});

window.addEventListener("load", () => {
  const svgIconIndex = window.theme === "light" ? 0 : 1;
  themeButton.innerHTML = svgThemeIcons[svgIconIndex];
  switchTheme(window.theme);
});

const svgThemeIcons = [
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path></svg>`,
  `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg>`,
];

function switchTheme(newTheme) {
  if (newTheme === "dark") {
    const allElements = document.getElementsByTagName("*");
    for (let element of allElements) {
      element.classList.add("dark");
    }
    window.theme = newTheme;
    themeButton.innerHTML = svgThemeIcons[1];
    console.log(`Theme has been updated to ${newTheme}`);
  } else {
    const allElements = document.getElementsByTagName("*");
    for (let element of allElements) {
      element.classList.remove("dark");
    }
    window.theme = newTheme;
    themeButton.innerHTML = svgThemeIcons[0];
    console.log(`Theme has been updated to ${newTheme}`);
  }
}
