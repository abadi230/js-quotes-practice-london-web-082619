/****** API ******/
API.getQuotes().then(quotes => renderQuotes(quotes));

/****** Consts ******/
const divQuoteList = document.querySelector('#quote-list');
const form = document.querySelector('#new-quote-form')




/****** Functions ******/


const renderQuotes= (quotes)=>{
    quotes.forEach(qoute => renderQuote(qoute));
}

const renderQuote= (quote)=>{
    const li = document.createElement('li');
    li.className = "quote-card"
    li.id= quote.id
    li.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
        <br>
            <button id='success-${quote.id}'class='btn-success'>Likes: <span id="like">0</span></button>
            <button id='danger-${quote.id}' class='btn-danger'>Delete</button>
        </blockquote>
        `
    divQuoteList.append(li);

    const btnDel = document.querySelector(`#danger-${quote.id}`)
    btnDel.addEventListener('click', () => deleteQuote(quote.id))

    const btnLike = document.querySelector(`#success-${quote.id}`)
    btnLike.addEventListener('click', (e)=>{
        likeQuote(quote.id)
        renderQuote(quote)
    })
}

const likeQuote= (id)=>{
    const quoteToLike = document.querySelector(`li[id="${id}"]`)
    const like = document.querySelector(`button#success-${id} span`)
    let addLike = parseInt(like.innerText)+1
    like.innerText = addLike;

    newLike({quoteId: id})
}
const newLike = (quoteId) => API.postLike(quoteId)

const deleteQuote = (id)=>{
    const quoteToDelete = document.querySelector(`li[id="${id}"]`)

    quoteToDelete.remove()
    API.destroy(id)//.then(renderQuotes)
    
}

const addNewQuote= newQuote => API.postQuote(newQuote).then(renderQuote)

const qouteFormSubmitHandler = (event) =>{
    
    console.log('form subitted')
    event.preventDefault()
    addNewQuote({

        quote: event.target.quote.value,
        author: event.target.author.value
    });
    event.target.reset()
}




form.addEventListener('submit', qouteFormSubmitHandler)
