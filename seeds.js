var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Pir Chanasi",
        image: "http://whatwhenwhy.net/wp-content/uploads/2017/01/Pir-Chanasi.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Ratti Gali Lake",
        image: "http://whatwhenwhy.net/wp-content/uploads/2017/01/Ratti-Gali-Lake.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Banjosa Lake",
        image: "http://whatwhenwhy.net/wp-content/uploads/2017/01/Banjosa-Lake-Azad-Kashmir.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

async function seedDB(){
    //Remove all campgrounds
  await  Campground.remove({});
   await  Comment.remove({})
            //add a few campgrounds
            data.forEach(async function(seed) {

          var campground   =  await   Campground.create(seed)
                campground.comments.push(   await Comment.create(
                    {
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }));
               await campground.save();
            })
    //add a few comments
}

module.exports = seedDB;