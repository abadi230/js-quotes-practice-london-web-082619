const API_URL = "http://localhost:3000/quotes?_embed=likes"
const QUOTES_URL = "http://localhost:3000/quotes"
const LIKES_URL = "http://localhost:3000/likes"

const jsonify = res =>{
    try {
        return res.json();
    } catch (error) {
        throw "not valid json"
    }
}
//get quotes
const get = () => {return fetch(API_URL).then(jsonify)}

const fetchConfig = (url, data, httpMethod) => {
    return fetch(url,{
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(jsonify)
}

const postQuote = (data)=> fetchConfig(QUOTES_URL, data, "POST");
    

 const postLike = data => fetchConfig(LIKES_URL, data, "POST");

 
 const destroy = (id) => {
     return fetch(`${QUOTES_URL}/${id}`,{ method: "DELETE" }).then(jsonify)
    }

const patch = (quote) =>  fetchConfig(`${QUOTES_URL}/${quote.id}`, quote, "PATCH")

const API = { get, postQuote, postLike, destroy, patch}
