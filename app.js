var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

var projectSchema = new mongoose.Schema({
	name:String,
	description:String
});

var Project=mongoose.model("Project",projectSchema);

app.use(bodyParser.urlencoded({extended:true,useNewUrlParser: true}));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/WIP");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/projects",function(req,res){
	Project.find({},function(err,allProjects){
		if(err){
			console.log(err);
		}else{
			res.render("projects",{projects:allProjects});
		}
	});
});

app.get("/projects/new",function(req,res){
	res.render("new");
});

app.post("/projects",function(req,res){
	var name=req.body.name;
	var desc=req.body.description;
	var newProject={name:name,description:desc};
	Project.create(newProject,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/projects");
		}
	});
});

app.get("/projects/:id",function(req,res){
	Project.findById(req.params.id),function(err,foundProject){
		if(err){
			console.log(err);
		}else{
			console.log(foundProject);
			res.render("show",{project:foundProject});
		}
	}
});


app.listen(3000,function(){
	console.log("Server has started!!");
});

