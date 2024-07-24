const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
   const username = req.body.username;
   const password = req.body.password;
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("getting books")
    },6000)})
    myPromise1.then((booksuccess) =>{
        console.log(booksuccess);
        res.send(JSON.stringify({books}, null, 4));
    })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let book = books[isbn];
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("getting isbn")
    },1000)})

    myPromise1.then((isbnsuccess) =>{
        console.log(isbnsuccess);
        if(book != null){
            return res.send(JSON.stringify({book},null,4));
            
          }else{
            return res.status(400).json({message: "book does not exist"});
          }
    })
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  const matchingBooks = [];
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("getting author")
    },1000)})
  for(let key in books){
    if (books.hasOwnProperty(key)) {
        // Check if the author of the current book matches the specified author
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
          matchingBooks.push(books[key]);
        }
      }
  }
//   if (bookAuthor.includes(inputAuthor)) {
//     matchingBooks.push(books[key]);
//   }

myPromise1.then((authorsuccess) =>{
    console.log(authorsuccess);
    if(matchingBooks.length != 0){
        res.send(JSON.stringify({matchingBooks},null,4));
    }else{
    return res.status(400).json({message: "no such author"});
    }
})
  

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const booktitle = req.params.title;
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("getting title")
    },1000)})

    myPromise1.then((authorsuccess) =>{
        console.log(authorsuccess)
        for(let key in books){
            if(books.hasOwnProperty(key)){
                if(books[key].title.toLowerCase() === booktitle.toLocaleLowerCase()){
                    let book = books[key];
                    return res.send(JSON.stringify({book},null,4));
                }
            }
        
          }
          return res.status(400).json({message: "No such book Title"});
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    if(book != null){
        let review = books[isbn].reviews; 
      return res.send(JSON.stringify({review},null,4));
    }else{
      return res.status(400).json({message: "book does not exist"});
    }
});

module.exports.general = public_users;