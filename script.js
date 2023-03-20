// Get elements
const searchInputEl = document.getElementById("searchInput");
const searchResultsEl = document.getElementById("searchResults");
const spinnerEl = document.getElementById("spinner");

// Create and append a search result
function createAndAppendSearchResult(result) {
  const { link, title, description } = result;

  const resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  const titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  const titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  const urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  const linkBreakEl = document.createElement("br");
  resultItemEl.appendChild(linkBreakEl);

  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

// Display search results
function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");

  for (const result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

// Search Wikipedia API
function searchWikipedia(event) {
  if (event.key !== "Enter") {
    return;
  }

  // Show spinner and clear previous results
  spinnerEl.classList.remove("d-none");
  searchResultsEl.textContent = "";

  const searchInput = searchInputEl.value;
  const url = `https://apis.ccbp.in/wiki-search?search=${searchInput}`;
  const options = {
    method: "GET",
  };

  fetch(url, options)
    .then(response => response.json())
    .then(jsonData => {
      const { search_results } = jsonData;
      displayResults(search_results);
    });
}

// Listen for search input
searchInputEl.addEventListener("keydown", searchWikipedia);
