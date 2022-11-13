const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const linkedinBtn = document.getElementById("linkedin");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loader
function startLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide the loader
function stopLoader() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from an API
async function getQuote() {
  // start the loader
  startLoader();

  // avoiding CORS error by specifying a proxy Url
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is blank, add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce fontsize for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    
    // stop loader and show the content
    stopLoader();
  } catch (error) {
    getQuote();
  }
}

// share quote on LinkedIn
function shareLinkedIn() {
  const linkedinUrl = `http://www.linkedin.com/shareArticle?mini=true&url=https://devkristaps.github.io/Quote-Generator/`;
  window.open(linkedinUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", getQuote);
linkedinBtn.addEventListener("click", shareLinkedIn);

// On page load
getQuote();