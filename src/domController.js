/******* display *******/

API.get().then(renderQuotes)

function renderQuotes(quotes){
    quotes.forEach(renderQuote)
}

function renderQuote(quote){
    // create quote elements
    const liQuote = document.createElement('li')
    liQuote.className= 'quote-card'
    liQuote.id = `quote-${quote.id}`;
    let like = 0
    liQuote.innerHTML =`
    <blockquote class="blockquote">
          <p class="mb-0" id="${quote.id}">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success' id="like-${quote.id}">Likes: <span id="like-${quote.id}">${like}</span></button>
          <button class='btn-danger' id="delete-${quote.id}">Delete</button>
          <button class='btn-danger' id="edit-${quote.id}">Edit</button>
        </blockquote>
    `
    const ulQuoteList= document.querySelector("#quote-list");
    ulQuoteList.append(liQuote)

    // buttons 
    
    const btnLike = document.querySelector(`#like-${quote.id}`)
    const btnDelete = document.querySelector(`#delete-${quote.id}`)
    const btnEdit = document.getElementById(`edit-${quote.id}`)

    // like
    btnLike.addEventListener('click', handleLike(quote.id));
    // delete
    btnDelete.addEventListener('click', handleDelete(quote.id));

    btnEdit.addEventListener('click', handleEdit(quote))
}
/******* edit Quote *******/
const editQuote = (quote) => API.patch(quote)

const handleEdit = (data) => {
    return (event) =>{
        data.quote = "new Quote",
        data.author =  "new Autohr"
        editQuote(data)
        .then(renderQuote(data))
    }
}
//delete
const handleDelete = (id) => {
    return event =>{
        const li = document.querySelector(`li#quote-${id}`);
        li.remove();
        API.destroy(id)
    }
}
 function handleLike(id, like){
     return (event)=> {
        const spanLike = document.querySelector(`span#like-${id}`)
        let increase = parseInt(spanLike.innerText)
        increase++
        spanLike.innerText = increase;
        addLike({quoteId: id})
     }
    
 }
const addLike = quoteId => API.postLike(quoteId);

/******* add Quote *******/
/** 1 find the the form
 * 2 create a function for post from the api
 * 3 create handeler form function with preventDefault()
 * 4 create another function to add data to the server
 * 5 add data from event target inside the form
 * 6 add eventlistener to the form with 
 */
// find the form
const form = document.querySelector('form#new-quote-form');
// add event
const addQuote = newQuote => API.postQuote(newQuote).then(renderQuote(newQuote))

const handeleForm = () => {
    event.preventDefault();
    addQuote({
        quote: event.target.elements.quote.value,
        author: event.target.elements.author.value
    })
    event.target.reset()
}

form.addEventListener('submit', handeleForm)


