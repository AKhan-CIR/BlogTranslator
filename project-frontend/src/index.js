//DOM CONTENT LOADED EVENT LISTENER
document.addEventListener("DOMContentLoaded", () => {
  getAndShowPosts()
})


//LOTS OF THINGS WE NEED TO ACCESS ****RIGHT HERE****

const postUrl = "http://localhost:3000/posts/"
const addBtn = document.querySelector('#new-blog-btn')
const blogForm = document.querySelector('#newBlogForm')
const addBlogForm = document.querySelector('.add-blog-form')
const blogContentInput = document.querySelector("input[name='blog']")
const blogAuthorInput = document.querySelector("input[name='author']")
const editContentInput = document.querySelector("input[name='edit-blog']")
const editAuthorInput = document.querySelector("input[name='edit-author']")
let addBlog = false


// TOGGLE ADD POST FORM - TOY STORY :(
addBtn.addEventListener('click', () => {
  addBlog = !addBlog
    if (addBlog) {
        blogForm.style.display = 'block'
        addBlogForm.addEventListener("submit", postNewBlog)
    } else {
        blogForm.style.display = 'none'
    }
})





//FETCH POSTS REQUEST HELPER FUNCTION
getPosts = () => {
    return fetch(postUrl)
    .then(response => response.json())
}


//FETCH AND ITERATE FUNCTION - GETS CALLED ON DOM CONTENT LOAD
getAndShowPosts = () =>{
  getPosts()
  .then(posts => {
    posts.forEach(post=> {
      createPosts(post)

    })
  })
}

//CREATE YOUR SINGLE POST
createPosts = (post) => {
  //GET TARGET
  let postsUL = document.getElementById("post-list")
  
  //CREATE LI
  let postLi = document.createElement("li")
  
  //ADD LI ATTRIBUTES
  postLi.setAttribute("class", "post-card")
  postLi.setAttribute("id", "post-li-" + post.id)
  
  //CREATE DIV TO STORE CONTENT
  let postDiv = document.createElement("div")
  postDiv.setAttribute("class", "jumbotron bg-dark text-white")
  
  //CREATE YOUR POST CONTENT
  let postP = document.createElement("p")
  postP.setAttribute("class", "post-content")
  postP.setAttribute("id", "post-content-id-" + post.id)
  postP.innerText = post.original
  
  //CREATE YOUR POST AUTHOR
  let postAuthor = document.createElement("p")
  postAuthor.setAttribute("class", "post-author")
  postAuthor.setAttribute("id", "post-author-name-" + post.id)
  postAuthor.innerText = post.user.name
  
  //CREATE BUTTON TO REVERT TRANSLATED TEXT
  let showOriginalButton = document.createElement("button")
  showOriginalButton.setAttribute("data-id", post.id)
  showOriginalButton.setAttribute("class", "btn btn-secondary")
  showOriginalButton.innerText = "Show Original"

  //EVENT LISTENER FOR ABOVE BUTTON (SHOW ORIGINAL TEXT) - CALLS RETURN POST FUNCTION
  showOriginalButton.addEventListener("click", () => {
    returnPost(post)
  })
  

  //CREATE BUTTON TO TRANSLATE TEXT
  let translateButton = document.createElement("button")
  translateButton.setAttribute("data-id", post.id)
  translateButton.setAttribute("class", "btn btn-primary")
  translateButton.innerText = "Translate"

  //EVENT LISTENER FOR ABOVE BUTTON (TRANSLATE TEXT) - CALLS TRANSLATE POST FUNCTION
  translateButton.addEventListener("click", () => {
    translatePost(post.original, post)
  })
  
  //CREATE BUTTON TO EDIT TEXT ON ORIGINAL POST
  let editButton = document.createElement("button")
  editButton.setAttribute("data-id", post.id)
  editButton.setAttribute("class", "btn btn-warning float-right")
  editButton.innerText = "Edit Text"

  //EVENT LISTENER FOR ABOVE BUTTON (EDIT POST TEXT) - CALLS ON EDIT POST FUNCTION
  editButton.addEventListener("click", (event) => {
    editBlogEvent(event, post)
  })
  //CREATE BUTTON TO DELETE POST
  let deleteButton = document.createElement("button")
  deleteButton.setAttribute("data-id", post.id)
  deleteButton.setAttribute("class", "btn btn-danger float-right")
  deleteButton.innerText = "Delete Post"
  
  //EVENT LISTENER FOR ABOVE BUTTON (DELETE POST) - CALLS ON DELETE BLOG EVENT FUNCTION
  deleteButton.addEventListener("click", (event) => {
    deleteBlogEvent(event, post)

  })
  
//APPEND ALL ELEMENTS TO TARGETS
  postsUL.appendChild(postLi)
  postDiv.appendChild(postP)
  postDiv.appendChild(postAuthor)
  postDiv.appendChild(translateButton)
  postDiv.appendChild(showOriginalButton)
  postDiv.appendChild(editButton)
  postDiv.appendChild(deleteButton)
  postLi.appendChild(postDiv)
}
  

editBlogEvent = (event, post) => {
  //GRAB TARGET
  let jumboTron = event.target.parentElement
  //GRAB CURRENT TEXT CONTENT FROM OUR QUOTE AND AUTHOR
  let pContent = document.getElementById("post-content-id-"+post.id)
  let pCText = pContent.textContent
  let pAuthor = document.getElementById("post-author-name-"+post.id)
  let pAText = pAuthor.textContent
  //CREATE TEXT AREA FOR CONTENT
  let tContent = document.createElement("textarea")
  tContent.rows = "5"
  tContent.cols = "50"
  tContent.setAttribute("class", "edited-content")
  tContent.innerText = pCText
  
  //CREATE TEXT AREA FOR AUTHOR
  let tAuthor = document.createElement("textarea")
  tAuthor.rows = "1"
  tAuthor.cols = "50"
  tAuthor.setAttribute("class", "edited-author")
  tAuthor.innerText = pAText

  //CREATE P FOR LABEL CONTENT
  let pEditContent = document.createElement("p")
  pEditContent.textContent = "Change Content"
  //CREATE P FOR LABEL AUTHOR
  let pEditAuthor = document.createElement("p")
  pEditAuthor.textContent = "Change Author"
  //BREAKS
  let br = document.createElement("br")
  
  //CREATE SUBMIT BUTTON FOR UPDATE QUOTE FORM
  let submitEditButton = document.createElement("button")
  submitEditButton.setAttribute("data-id", post.id)
  submitEditButton.innerText = "Submit Edited Text"

  //CREATE EVENT LISTENER FOR ABOVE BUTTON - CALLS ON EDIT BLOG FUNCTION
  submitEditButton.addEventListener("click", (event) => editBlog(event, post, tContent.value, tAuthor.value,))
  submitEditButton.setAttribute("class", "btn btn-info float-left")

  //CLEAR CONTENT OF OUR CURRENT QUOTE
  jumboTron.innerHTML = ""
  
  //ADD ALL ELEMENTS TO TARGER
  jumboTron.appendChild(pEditContent)
  jumboTron.appendChild(tContent)
  jumboTron.appendChild(pEditAuthor)
  jumboTron.appendChild(tAuthor)
  jumboTron.appendChild(br)
  jumboTron.appendChild(br)
  jumboTron.appendChild(submitEditButton)
  

}

//////CRUD REQUESTS ///////


//EDIT POST REQUEST ____________UPDATE____________ 
editBlog = (event, post, content, author) => {
  event.preventDefault()
  let item = event.target.parentElement
  fetch(postUrl + post.id, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          original: content,
          name: author        
      })
  })
  .then(response => response.json())
  .then(getAndShowPosts)
  .then(() => deleteBlog(item))
}


//POST NEW POST REQUEST _______CREATE__________
postNewBlog = (event, post) => {
  event.preventDefault()
  fetch(postUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        original: blogContentInput.value,
        name: blogAuthorInput.value        
    })
  })
  .then(response => response.json())
  .then(getAndShowPosts)

}

//DELETE POST REQUEST _________DELETE_____________
deleteBlogEvent = (event, post) => {
event.preventDefault()
console.log(post.id)

let item = event.target.parentElement
fetch(postUrl + post.id, {
  method: "DELETE",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({id: post.id})
})
.then(() => deleteBlog(item))

}

//DELETES POST'S CONTAINER USE TO REMOVE ELEMENT FROM DOM
deleteBlog = (item) => {
  console.log(item)
  item.remove()

}


///TRANSLATE POSTS/////


//TIED TO SHOW ORIGINAL BUTTON - REVERTS POST BACK TO PREVIOUS LANGUAGE
returnPost = (post) => {
  let postO = document.getElementById("post-content-id-"+post.id)
  postO.innerText = post.original

}
//TIED TO TRANSLATE BUTTON - TRANSLATES POST - CALLS ON GET TRANSLATED FUNCTION
translatePost = (quote, post) => {
  //console.log(quote)
  getTranslated(quote, post)
}

//HAS LANGUAGES AND FETCH REQUEST TO API - CALLS ON SHOW TRANSLATED FUNCTION
getTranslated = (quote, post) => {   
  sourceText = quote
  let sourceLang = 'auto';
  let targetLang = 'zh';

 fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText))
  .then(result => result.json())
  // ?
  .then(data => showTranslated(data, post))
  .then(console.log("Translation Sent"))
  .catch(err => console.log(err))
}

//GETS TRANSLATED TEXT - GRABS TRANSLATION ITERATES THROUGH IT 
showTranslated = (data, post) => {
  translatedText = ""
  //console.log(data)
  //console.log(data[0].length)
  data[0].forEach(line => {
  translatedText += line[0]})
  switchQuoteContent(translatedText, post)
}


//EXCHANGES ORIGINAL POST TEXT FOR TRANSLATED TEXT
switchQuoteContent = (translatedText, post) => {
  // console.log(post.id)
  //first time through post is undefined
  //second time through post has value 
  let postT = document.getElementById("post-content-id-"+post.id)
  postT.innerText = translatedText
}


  //CSS 

  //CARDS DID NOT WORK 
  //JUMBOTRON IS OK, BUT LOOKS TACKY 
  //ASK ABOUT OTHER OPTIONS 
  //COLUMNS / ROWS ??