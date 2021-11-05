//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


require('dotenv').config();

const homeStartingContent = "Hi my name is Gerald & Welcome to my coding journal/blog. This is something that i created as a early project in my coding journey and i have the plan to use this as a reference tool to look back on and possibly help others with the same problem. I have an interest in crypto and future technologies, so i will post about some of these things too, its all coding related right 🤷🏾‍♂️. ";
const aboutContent = "I started this blog at the beginning of my career change from coaching gymnastics.It was recommended as a great way to keep track of my progress.";
const contactContent = "Email: Gerald Cameron118@gmail.com   Github: www.github.com/geraldc118";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-Gerald:WhatistheHYpem8@blogdb.qpwlc.mongodb.net/BlogDB?retryWrites=true&w=majority");


const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
