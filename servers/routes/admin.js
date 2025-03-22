const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layout/admin";
const jwtSecret = process.env.JWT_SECRET;

// - CHECK LOGIN 
const authMiddleware = (req, res, next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message:"Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message:"Unauthorized" });
    }
}


// GET//ADMIN - LOGIN PAGE

router.get("/admin", async (req, res)=>{
    try {
        const locals = {
            title: "Admin",
            description:"simple blog created with NodeJS, express, MongoDB"
        }

res.render("admin/index", { locals, layout: adminLayout});
    } catch (error) {
        console.error(error);
    }
});

// GET//ADMIN - CHECK LOGIN PAGE
router.post("/admin", async (req, res)=>{
    try {
        
        const password = req.body.password;
        const username = req.body.username;

        const user = await User.findOne({ username});
       
        if(!user){
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, {httpOnly: true });
        res.redirect("/dashboard");

        // res.render("admin/index", { locals, layout: adminLayout});
    } catch (error) {
        console.error(error);
    }
});

// GET//ADMIN - CHECK LOGIN PAGE
router.get("/dashboard", authMiddleware, async (req, res)=>{
    try {
        const locals = {
            title:"Dashboard",
            description:"Simple Blog created with nodeJS, Express & MongoDb."
        }
        const data = await Post.find();
        res.render("admin/dashboard",{
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.error(error);

    }    
});

// GET//ADMIN - ADD-POST PAGE
router.get("/add-post", authMiddleware, async (req, res)=>{
    try {
        const locals = {
            title:"Add Post",
            description:"Simple Blog created with nodeJS, Express & MongoDb."
        }
        const data = await Post.find();
        res.render("admin/add-post",{
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.error(error);

    }    
});


router.post("/add-post", authMiddleware, async (req, res)=>{
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newPost);
            res.redirect("/dashboard");
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.error(error);

    }    
});


router.put("/edit-post/:id", authMiddleware, async (req, res)=>{
    try {
       await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
       });
       
       res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.error(error);

    }    
});



router.get("/edit-post/:id", authMiddleware, async (req, res)=>{
   try{
    const locals = {
        title:"Edit Post",
        description:"Simple Blog created with nodeJS, Express & MongoDb."
    };

    const data = await Post.findOne({_id: req.params.id});

       res.render("admin/edit-post", {
        locals,
        data,
        layout: adminLayout
       });

    } catch (error) {
        console.error(error);
    }    
});

//DELETE - ADMIN POST

router.delete("/delete-post/:id", authMiddleware, async (req, res)=>{
   
    try{

    await Post.deleteOne({_id: req.params.id});
    res.redirect("/dashboard");

     } catch (error) {
         console.error(error);
     }    

 });

 
 //LOGOUT - ADMIN LOGOUT

 router.get("/logout", (req, res)=>{
   res.clearCookie("token");
   res.redirect("/");
 });


















// GET//ADMIN - REGISTER PAGE
// router.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Validate input
//         if (!username || !password) {
//             return res.status(400).json({ message: "Username and password are required" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//             // Create the user
//             const user = await User.create({ username, password: hashedPassword });

//             // Respond with success
//             res.status(201).json({ message: "User Created", user: { username: user.username } });
//         } catch (error) {
//             if (error.code === 11000) {
//                 return res.status(409).json({ message: "Username is already in use" });
//             }
//             console.error(error);
//             res.status(500).json({ message: "Internal server error" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router;