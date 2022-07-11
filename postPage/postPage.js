const id = JSON.parse(localStorage.getItem('post-id'))
const authorId = JSON.parse(localStorage.getItem('author-id'))


const title = document.querySelector('.post-title')
const body = document.querySelector('.post-body')
const author = document.querySelector('.post-author')
const email = document.querySelector('.post-email')
const phone = document.querySelector('.post-phone')

function getAuthor(){
    console.log('ds')
    fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`)
    .then(res => res.json())
    .then(res => {
        author.innerHTML = `&copy; ${res.name} (${res.username})`
        email.innerHTML = `${res.email}`
        phone.innerHTML = `${res.phone}`
    })
    .catch(err => console.log(err))
}

function getPost(){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(res => {
        title.innerText = res.title
        body.innerText = res.body
    })
    .catch(err => console.log(err))
}

getAuthor()
getPost()
