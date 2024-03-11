
function performSearch() {
  const searchTerm = document.querySelector(".input").value;
  // Storing the recent input in local storage
  storeRecentInput(searchTerm);
 
  window.location.href =
    "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);
}

// Function to store recent input in local storage
function storeRecentInput(input) {
  let recentInputs = JSON.parse(localStorage.getItem('recentInputs')) || [];
 
  recentInputs = recentInputs.filter(item => item !== input);
 
  recentInputs.unshift(input);

  recentInputs = recentInputs.slice(0, 10);
 
  localStorage.setItem('recentInputs', JSON.stringify(recentInputs));
}

// Function to provide auto-suggestions based on stored data
function provideAutoSuggestions() {
  const recentInputs = JSON.parse(localStorage.getItem('recentInputs')) || [];
  const suggestionList = document.querySelector('.suggestion-list');
  suggestionList.innerHTML = '';
  // Creating and appending list items for each recent input
  recentInputs.forEach(input => {
    const listItem = document.createElement('li');
    listItem.textContent = input;
    listItem.addEventListener('click', () => {
      // Filling the input field with the selected suggestion
      document.querySelector(".input").value = input;
    });
    suggestionList.appendChild(listItem);
  });
}


document.addEventListener('DOMContentLoaded', provideAutoSuggestions);
