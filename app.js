const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');


//Lorem ipsum dummy content to populate the fields  for home page
const homeStartingContent = "This is home Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturie"; 
//Lorem ipsum dummy content to populate the fields  for about page
const aboutContent = "This is about Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetu";
//Lorem ipsum dummy content to populate the fields  for contacts page
const contactContent = "This is contact us Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetu";


const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


//Global or variables to be used to store the content of the app
let posts = [];


//To get a get request on the home route
app.get("/",function(req,res){

    res.render("home",{homeContent : homeStartingContent ,postsArray : posts});
});


//To get a get request on the about route
app.get("/about",function(req,res){
    res.render("about",{abtContent : aboutContent});
});


//To get a get request on the conatct us route
app.get("/contact",function(req,res){
    res.render("contact",{cntContent : contactContent});
});


//To get a get request on the post  route
app.get("/compose",function(req,res){
    res.render("compose");
});


//Express routing parameter
app.get("/posts/:postCategory",function(req,res){
    
    var requestedParameter = req.params.postCategory;

    posts.forEach(function(element){
        if(_.lowerCase(element.title) === _.lowerCase(requestedParameter)){
           res.render("post",{postTitle : element.title , postBody : element.content});
        }
    });
});


//To get the post request on Compose route
app.post("/compose",function(req,res){
   var newPost = {
       title : req.body.postTitle,
       content : req.body.postBody
   };
  
   posts.push(newPost);

   res.redirect("/");
});

//Listening on port 3000 to spin up the server there should be one port
// on which u listen using the app for express
app.listen(3000,function(){
    console.log("Server is up and running on Port 3000 !!")
})