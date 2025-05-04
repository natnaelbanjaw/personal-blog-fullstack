const express = require("express");
const router = express.Router();
const Post = require("../model/post");

router.get("/", async (req, res)=>{

    try {
        const locals = {
            title: "NodeJS blog",
            description:"simple blog created with NodeJS, express, MongoDB"
        }
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAt: -1} }])
        .skip(perPage * page-perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments();
        const nextPage =  parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

res.render("index", {
     locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute : "/"
     });

    } catch (error) {
        console.error(error);
    }

});

// router.get("/", async (req, res)=>{
//     const locals = {
//         title: "NodeJS blog",
//         description:"simple blog created with NodeJS, express, MongoDB"
//     }
//     try {
//         const data = await Post.find();

// res.render("index", { locals, data });
//     } catch (error) {
//         console.error(error);
//     }
// });


// GET//POST

router.get("/post/:id", async (req, res) => {
    try {
        const slug = req.params.id; // Get the post ID from the URL
        const data = await Post.findById(slug); // Fetch the post from the database

        if (!data) {
            return res.status(404).send("Post not found");
        }

        res.render("post", {
            title: data.title,
            body: data.body,
            createdAt: data.createdAt.toDateString(),
            currentRoute : "/post/" + slug
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// POST//POST - SEARCH TERM
router.post("/search", async (req, res)=>{
    try {
        const locals = {
            title: "Search",
            description:"simple blog created with NodeJS, express, MongoDB"
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: {$regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });

res.render("search", {
     locals,
     data 
    });
    
    } catch (error) {
        console.error(error);
    }
});


router.get("/about", (req, res)=>{
    res.render("about", {
        currentRoute : "/about"
    });
    });

router.get("/contact", (req, res) => {

    res.render("contact", { currentRoute : "/contact" });
});


















    // function insertPostData(){
    //     Post.insertMany([
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //         {
    //             title: "Building a blog",
    //             body:"This is the body text"
    //         },
    //     ])
    // }
    
    // insertPostData();


module.exports = router;