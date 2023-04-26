//Variables
let theAllUsersDiv = document.getElementById("users");
let theAllPostsDiv = document.getElementById("posts");
let MyUser = document.getElementsByClassName("myuser");
let MyPost = document.getElementsByClassName("mypost");

let theonlyUsers = document.getElementById("onlyUsers");
let theonlyPosts = document.getElementById("onlyPosts");
let theusersArea = document.getElementById("usersArea");
let thepostsArea = document.getElementById("postsArea");
let thegoBack = document.getElementsByClassName("goBack");


//Get Data From API : JSON Placeholder

//Get All Users
let urlUsers = "https://jsonplaceholder.typicode.com/users";
function getAllUsers(urlUsers){
    
    return new Promise((resolve, reject) => {
        
    fetch(urlUsers).then(response => response.json()).then(data => {
        //console.log(data);
        //Show All Users
        theAllUsersDiv.innerHTML = "";
        let theUserDivContent="";
        data.forEach(element => {
            theUserDivContent +=`
            <div class="shadow p-3 bg-body rounded my-3 brd myuser" onclick="showPostsByUserId(${element.id},this)">
             <h6>${element.name}</h6>
             <span class="text-secondary">${element.email}</span>
            </div>`;
        });
       
       theAllUsersDiv.innerHTML = theUserDivContent;

       resolve();

    }).catch(err =>{
        console.log(err);
        reject("Erorr in request users");
    });

    });
}
//Get All Posts
let urlPosts ="https://jsonplaceholder.typicode.com/posts";
function getAllPosts(urlPosts){
    fetch(urlPosts).then(response => response.json()).then(data =>{
        //console.log(data);
        //Show All Posts
        theAllPostsDiv.innerHTML="";
        let thePostDivContent="";
        data.forEach(element => {
            thePostDivContent += `
            <div class="shadow p-3 bg-body rounded my-3 mypost"> 
               <h4>Title:${element.title} </h4>
               <p>Description:${element.body}</p>
            </div> 
            `;
        }); 
        theAllPostsDiv.innerHTML = thePostDivContent;  
    }).catch(err => console.log(err));
}

 //Get Posts By UserId
function showPostsByUserId(userId,divThis){
    let urlPostsById ="https://jsonplaceholder.typicode.com/posts?userId="+userId;
    getAllPosts(urlPostsById);
    let choosenElements = document.getElementsByClassName("choosen");
    //console.log(choosenElements);
    for(let elem of choosenElements){
        elem.classList.remove("choosen");
        elem.classList.add("brd");
    }
    divThis.classList.add("choosen");
    divThis.classList.remove("brd");
}   

//Only Users and Only Posts
for(ele of thegoBack){
    ele.style.display = "none";
}
theonlyUsers.addEventListener("click",()=>{
    thepostsArea.style.display = "none";
    theusersArea.style.margin = "0px auto";
    theonlyUsers.style.display="none";
   thegoBack[0].style.display="inline";
});

theonlyPosts.addEventListener("click", ()=>{
    theusersArea.style.display="none";
    theonlyPosts.style.display ="none";
    thepostsArea.style.margin = "0px auto";
    thepostsArea.style.width = "100%";
    thegoBack[1].style.display="inline";
});

 //Get All Posts After Get All Users Using Promises
getAllUsers(urlUsers).then(()=>{
    getAllPosts(urlPosts);
}).catch(err => console.log(err));
