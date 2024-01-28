const errorMessage = document.getElementById("error-message");
const queryParams = new URLSearchParams(window.location.search);
const error = queryParams.get("error");
errorMessage.innerHTML = error ?? "Unknown error !";
