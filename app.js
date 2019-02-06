var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");
//Requiring Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://test:123qwe@ds255754.mlab.com:55754/db_test");
mongoose.connect("mongodb://rabiataj:123456rt@ds221645.mlab.com:21645/local_db");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
seedDB();
   //PASSPORT CONFIGRATION
app.use(require("express-session")({
    secret : "once again",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


//Database connection command
// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath "E:\MOC\Web\Udemy - The Web Developer Bootcamp\webdevbootcamp-master\YelpCamp\v2\data"


// Campground.create(
//      {
//          name: "Granite Hill",
//          image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//          description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"

//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });


app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(5000, function(){
   console.log("The YelpCamp Server Has Started!");
});