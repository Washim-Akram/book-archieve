document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Clear Data
    searchField.value = '';

    // Handle Empty Search Request
    if (searchText === '') {
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide Error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // Load Data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
};

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

};
// Display Search Result
const displaySearchResult = docs => {
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const bookList = docs.docs;
    if (bookList === null) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${bookList.length}`;

        bookList.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Image Not Found">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author Name: ${book.author_name}</p>
                    <p class="card-text">First Publish: ${book.	first_publish_year}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    <p class="card-text">Language: ${book.language}</p>

                    
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    };

};