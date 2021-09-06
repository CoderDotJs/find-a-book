const input = document.getElementById('input');

  //fetch data from the api

const getData = () =>{
    fetch(`http://openlibrary.org/search.json?q=${input.value}`)
    .then(res => res.json())
    .then(data => displayData(data))
}

//spinenr 
const spinner = (spin) =>{
  const display = document.getElementById('display');
  const searchFound = document.getElementById('search-found');

  if(spin === !false){
    display.innerHTML = `<div class="spinner-border"  role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
  searchFound.innerHTML = '';
  }
}
//display data from the api to the dom

const displayData = (data) => {
    const booksDisplay= document.getElementById('books-display');
    const display = document.getElementById('display')
    const searchFound = document.getElementById('search-found');
    // document.querySelector('title').innerText = `Search for: ${input.value}`
      //error handalling

    if(data === null || data === undefined || data.numFound === 0){
      display.innerHTML = `<div>
      <h1 class="text-center my-5">No Searches Found!!!</h1>
      </div>`
    }else{
      display.innerHTML = ''
    }

    //display total search found

    searchFound.innerHTML = `Total searches found: ${data.numFound}`;

    //append all the books data to this 

    const newBook = document.createElement('div');
        newBook.classList.add('row', 'container', 'mx-auto', 'row-cols-1' ,'row-cols-md-3', 'g-4','my-4');

          //display every books search to the dom only 29 will be shown no matter how much serches are found

      data.docs.slice(0,30).forEach( (book) => {
        let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

        //check if the book image is available or not

        if(!book.cover_i){
          img = `https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png`
        }

          //add the books to the dom

        const books = document.createElement('div');
        books.classList.add('col')
        books.innerHTML = `
        <div class="card h-100 shadow-lg">
          <img src="${img}" class="card-img-top d-block mx-auto" alt="${book.conver_i ? book.title : 'No image found'}">
            <div class="card-body">
              <h5 class="card-title">
              <span class="fw-bold">Title: </span> ${book.title ? book.title : '<i>No Title Found</i>'}</h5>
              <p class="card-text">
              <span class="fw-bold">Author: </span> ${book.author_name ? book.author_name : '<i>No Author Found</i>'}</p>
              <p class="card-text">
              <span class="fw-bold">Publisher: </span> ${book.publisher ? book.publisher : '<i>No Publisher Found</i>'}</p>
              <p class="card-text">
              <span class="fw-bold">First Published: </span> ${book.first_publish_year ? book.first_publish_year : '<i>No First Published Year Found</i>'}</p>
            </div>
        </div>`;
          newBook.appendChild(books);
          spinner(false);
          display.appendChild(newBook);
          input.value = '';
          console.log(book)
    });
};




//add event listener to the search button

document.getElementById('search').addEventListener('click', (e) =>{
    e.preventDefault();
    spinner(true);
    getData();
})