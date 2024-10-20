import express from "express"
import bodyParser from "body-parser"

const port=3000;
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/list",(req,res)=>{
    res.render("list.ejs");
});

app.get("/slinkedlist",(req,res)=>{
    res.render("partials/linked_list_webpage/sdes.ejs");
});

app.get("/dlinkedlist",(req,res)=>{
    res.render("partials/linked_list_webpage/ddes.ejs");
});

app.get("/clinkedlist",(req,res)=>{
    res.render("partials/linked_list_webpage/cdes.ejs");
});

app.get("/linkedlist",(req,res)=>{
    res.render("partials/linked_list_webpage/index.ejs");
});

app.get("/matrix",(req,res)=>{
    res.render("partials/matrix/index.ejs");
});

app.get("/dmatrix",(req,res)=>{
    res.render("partials/matrix/dindex.ejs");
});

app.get("/desmatrix",(req,res)=>{
    res.render("partials/matrix/des.ejs");
});

app.get("/desdmatrix",(req,res)=>{
    res.render("partials/matrix/desd.ejs");
});

app.get("/binarytree",(req,res)=>{
    res.render("partials/binarytree/index.ejs");
});

app.get("/desbinarytree",(req,res)=>{
    res.render("partials/binarytree/des.ejs");
});

app.get("/AVL",(req,res)=>{
    res.render("partials/AVL/index.ejs");
});

app.get("/desAVL",(req,res)=>{
    res.render("partials/AVL/des.ejs");
});

app.get("/graph",(req,res)=>{
    res.render("partials/graph/index.ejs");
});

app.get("/desgraph",(req,res)=>{
    res.render("partials/graph/des.ejs");
});

app.get("/queue",(req,res)=>{
    res.render("partials/queue/index.ejs");
});

app.get("/desqueue",(req,res)=>{
    res.render("partials/queue/des.ejs");
});

app.get("/stack",(req,res)=>{
    res.render("partials/stack/index.ejs");
});

app.get("/desstack",(req,res)=>{
    res.render("partials/stack/des.ejs");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port} `);
})