const express = require('express');
const path = require('path');

const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;

const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "public", "student")))


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(username, password, done) {
  return done(null, {"email": username, "password": password});
}
));


router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "student", "user.html"));
});

router.post("/login",(req,res)=>{

  const email = req.body.email;
  const password = req.body.password;

  const user = {email,password};
   //not sure about the procedure thats why emply now
   db.query('SELECT password FROM users WHERE email = ?',[email],function(err,results,fields){
  
    if(!(results.length===0))
    {
      req.login(user, function(err) {
        return res.redirect('/user.html');
      });
    }
   });
});


passport.serializeUser(function(user, done) {
  done(null, JSON.stringify({"email":user.email, "password": user.password}));
});

passport.deserializeUser(function(user, done) {
  done(err, user);
});
  
router.use(passport.initialize());
router.use(passport.session());



module.exports = router;
