const express = require("express");
require("../dbConfig/config");
const {email_pass} = require("../configuration.js");
const uuid = require("uuid");
const buildUrl = require("build-url");

var nodemailer = require('nodemailer');
var User = require("../models/user.js");
const userRouter = express.Router();

userRouter.post("/",(req,res)=>{
    const {email,firstname} = req.body;
    req.body.status = "non-active";
var url = buildUrl('http://randugdugllskjug.com', {
  path: uuid.v4()+uuid.v4()+uuid.v4(),
  lowerCase: true,
});

    console.log(req.body);
    
    const saveUser = async () => {
        const newUser = new User({
            email: req.body.email,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            password: req.body.password,
            status:req.body.status
        });
      
        try {
          const result = await newUser.save()
          console.log(result);

          var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "akhil33.knl@gmail.com",
          pass: email_pass
        }
      });
      
      var mailOptions = {
        from: 'akhil33.knl@gmail.com',
        to: email,
        subject: 'please click the below link to verify your mail',
       html: `
       <html>
       <body>
       <p id = "url">${url}</p>
       <input type = "text" id = "action" style = "visibility: hidden;">/user/verify</input>
       <input type = "text" id = "method" style = "visibility: hidden;">POST</input>
       </body>
       <script>
       document.getElementById("url").addEventListener("click", myFunction);

        function myFunction(){
            var action = document.getElementById("action")
            var method = document.getElementById("method").innerHTML;
           console.log("hi");
           console.log(action);
           console.log(method);
        fetch(action, {
            method: method.toUpperCase(),
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(${{firstname:firstname}})
          })
            .then(response => {
              console.log(response.status);
              if (response.status === 200) {
                return response.json()
              }
              else {
                throw (new error(response.status))
              }
            })
            .then(data => {
              alert(data.message);
              //window.location.href = "/teacher-students/" + teacherID
            })
            .catch(error => {
              if (error.meaasage == "400")
                alert("please check the form details..")
              else if (error.message == "500")
                alert("please try after some time!!")
              else
                alert(error.meaasage)
            });
       }
       </script>
       </html>
       `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

            res.status(200).json({message:"please check your mail and verify the link!!!"});
        } catch (e) {
          console.error(e);
          res.status(500).send("inrernal server error");
        }
      };
      
      saveUser();




    


})


userRouter.post("/verify",(req,res)=>{
    console.log("firstname"+req.body.firstname);
    res.status(200).json({message:"successfully verified"});
})

module.exports = {
    userRouter
}














