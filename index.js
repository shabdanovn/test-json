const API_URL = "https://jsonplaceholder.typicode.com"
const GET_POSTS_API = `${API_URL}/posts`
const GET_USERS_API = `${API_URL}/users`

const postsPerPage = 16

window.addEventListener('load', () => {
    getPosts()
    getUsers()
})

let data, users, searchedByAuthor, searchedByTitle, page=0;

async function getPosts() {
    try {
        const res = await fetch(GET_POSTS_API)
        data = await res.json()
        createPagination(data.length)
        getPagePosts(page)
    } catch (error) {
        const p = document.createElement('p')
        p.innerText = `Error occured: ${error}`
    }
}

async function getUsers() {
    try {
        const res = await fetch(GET_USERS_API)
        users = await res.json()
    } catch (error) {
        const p = document.createElement('p')
        p.innerText = `Error occured: ${error}`
    }
}

const createPagination = (length) => {
    const ul = document.querySelector('.pagination__list')
    ul.innerHTML=""
    for(let i=1; i<=Math.ceil(length/postsPerPage);i++){
        const li = document.createElement('li')
        li.innerHTML = `
            <button onClick="getPagePosts(${i-1})">${i}</button>
        `
        ul.appendChild(li)
    }
}

const getPagePosts = (clickedPage, arr=data) => {
    page=clickedPage
    const pagination = document.querySelectorAll('li')
    
    for(let i=0; i<pagination.length; i++) 
        pagination[i].classList.remove("active")
    
    pagination[page].classList.add("active")
    drawPosts(page*postsPerPage, (page+1)*postsPerPage, arr)
}

const input = document.querySelector('input')
input.addEventListener('change', () => {
    if(!input.value) {
        getPosts()
        searchedByAuthor=[]
        searchedByTitle=[]
    }
})

function searchClick(){
    const input = document.querySelector('input')
    getSearchedPosts(input.value)
}

const getSearchedPosts = (word) => {
    if(word){
        searchedByTitle = data.filter(item => item.title.includes(word.toLowerCase()))
        const filteredAuthors = users.filter(item => item.name.toLowerCase().includes(word.toLowerCase())).map(item => item.id)
        if(filteredAuthors && filteredAuthors.length > 0)
            searchedByAuthor = data.filter(item => filteredAuthors.includes(item.userId))
    
        if(searchedByTitle && searchedByTitle.length > 0){
            drawPosts(0, searchedByTitle.length, searchedByTitle)
            const ul = document.querySelector('ul')
            ul.innerHTML=""
        }else if(searchedByAuthor && searchedByAuthor.length > 0){
            drawPosts(0, searchedByAuthor.length, searchedByAuthor)
            const ul = document.querySelector('ul')
            ul.innerHTML=""
        }else{
            drawPosts(0,0,[])
        }
    }

}

const drawPosts = (start, end, arr) => {
    const posts = document.querySelector('.posts-list')
    posts.innerHTML = ""

    if(arr.length===0){
        const ul = document.querySelector('.pagination__list')
        ul.innerHTML=""
        const p = document.createElement('p')
        p.innerText="No posts"
        posts.appendChild(p)
        return
    }

    for(let i = start; i<end;i++){
        if(arr[i]){
            const div = document.createElement('div')
            div.className = "post-item"
            div.innerHTML = `
                <img class="avatar" src="https://img.wallpapersafari.com/tablet/768/1024/51/26/vNyj7g.jpg" alt="Post pic"/>
                <div class="post-content">
                    <p class="post-title">${arr[i].title}</p>
                    <p class="post-author">&copy; ${users?.find(user => user.id === arr[i].userId).name}</p>
                </div>
            `

            div.addEventListener('click', (e) => {
                localStorage.setItem("post-id", JSON.stringify(arr[i].id))
                localStorage.setItem("author-id", JSON.stringify(arr[i].userId))
                window.location.href = "./postPage/postPage.html"
            })

            posts.appendChild(div)
        }else break
    } 
} 