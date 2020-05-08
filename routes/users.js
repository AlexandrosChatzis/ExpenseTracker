const express = require("express");
const router = express.Router();
//mail library
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILUSR2, // generated ethereal user
    pass: process.env.MAILPW2 // generated ethereal password
  }
});
//Encrypt Password
const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

//Register Handler
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill all fields" });
  }
  if (password != password2) {
    errors.push({ msg: "passwords dont match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password should be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "User already exists." });

        if (errors.length > 0) {
          res.json(errors);
        }
      } else {
        //Hash Password
        const encryptedPass = bcrypt.hashSync(password, 10);
        const user = new User({
          name: name,
          email: email,
          password: encryptedPass
        });
        user
          .save()
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.json({ message: err });
          });
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res) => {
  //Match User
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.json((message = "not found"));
      }
      //Match Password   plain,hash
      const dotheymatch = bcrypt.compareSync(req.body.password, user.password);
      if (dotheymatch) {
        res.json(user);
      } else {
        res.json((message = "wrong password"));
      }
    })
    .catch(err => console.log(err));
});
router.post("/checkmail", (req, res) => {
  const { email } = req.body;

  let errors = [];

  //Check required fields

  //Validation passed
  User.findOne({ email: email }).then(user => {
    if (user) {
      //send email with id
      let token = Math.random();
      const mailOptions = {
        from: process.env.MAILUSR2,
        to: email,
        subject: "Password Reset",
        html: `<html>
        <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
          /* FONTS */
            @media screen {
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 400;
              src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 700;
              src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
            }
            
            /* CLIENT-SPECIFIC STYLES */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; }
        
            /* RESET STYLES */
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
        
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] { margin: 0 !important; }
        </style>
        </head>
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            Looks like you tried signing in a few too many times. Let's see if we can get you back into your account.
        </div>
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#7c72dc" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- HERO -->
            <tr>
                <td bgcolor="#7c72dc" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                              <h1 style="font-size: 32px; font-weight: 400; margin: 0;">Trouble signing in?</h1>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- COPY BLOCK -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                      <!-- COPY -->
                      <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                          <p style="margin: 0;">Resetting your password is easy. Just press the button below and follow the instructions. We'll have you up and running in no time. </p>
                        </td>
                      </tr>
                      <!-- BULLETPROOF BUTTON -->
                      <tr>
                        <td bgcolor="#ffffff" align="left">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td align="center" style="border-radius: 3px;" bgcolor="#7c72dc"><a href="https://expensetrackergr.herokuapp.com/forgot?email=${email}&token=${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #7c72dc; display: inline-block;">Reset Password</a></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                </td>
            </tr>
            <!-- COPY CALLOUT -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <!-- HEADLINE -->
                        <tr>
                          <td bgcolor="#111111" align="left" style="padding: 40px 30px 20px 30px; color: #ffffff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                            <h2 style="font-size: 24px; font-weight: 400; margin: 0;">Unable to click on the button above?</h2>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td bgcolor="#111111" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                            <p style="margin: 0;">Click on the link below or copy/paste in the address bar.</p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td bgcolor="#111111" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                            <p style="margin: 0;"><a href="https://expensetrackergr.herokuapp.com/forgot?email=${email}&token=${token}" target="_blank" style="color: #7c72dc;">See how easy it is to get started</a></p>
                          </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- SUPPORT CALLOUT -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <!-- HEADLINE -->
                       
                    </table>
                </td>
            </tr>
            <!-- FOOTER -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                      
                      <!-- PERMISSION REMINDER -->
                      <tr>
                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                          <p style="margin: 0;">You received this email because you requested a password reset.</p>
                        </td>
                      </tr>
                 
                    </table>
                </td>
            </tr>
        </table>
        
        </body>
        </html>
        `
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          errors.push({ msg: "User does not exists." });
        } else {
          const updateToken = User.updateOne(
            { _id: user._id },
            {
              $set: {
                resetToken: token
              }
            }
          ).then(res.json({ message: "mail sent" }));
        }
      });
    } else {
      errors.push({ msg: "User does not exists." });
    }
    if (errors.length > 0) {
      res.json(errors);
    }
  });
});
router.post("/forget_token", (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user) {
      try {
        const updateToken = User.updateOne(
          { _id: user._id },
          {
            $set: {
              resetToken: ""
            }
          }
        ).then(res.json({ message: "token timeout" }));
      } catch (err) {
        res.json({ message: "something went wrong" });
      }
    }
  });
});
router.post("/get_token", (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user) {
      res.json({ dbtoken: user.resetToken });
    }
  });
});

router.post("/forgot", (req, res) => {
  const { email, password, password2 } = req.body;

  let errors = [];

  //Check required fields
  if (!password || !password2) {
    errors.push({ msg: "please fill all fields" });
  }
  if (password != password2) {
    errors.push({ msg: "passwords dont match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password should be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        const encryptedPass = bcrypt.hashSync(password, 10);
        try {
          const updatePassword = User.updateOne(
            { _id: user._id },
            {
              $set: {
                password: encryptedPass
              }
            }
          ).then(res.json({ message: "updated" }));
        } catch (err) {
          res.json({ message: "something went wrong" });
        }
      }
    });
  }
});

// router.put("/resetpassword/:id", (req, res) => {
//   const { email, password } = req.params;

//   if (req.params.id) {
//     const encryptedPass = bcrypt.hashSync(password, 10);
//     try {
//       const updatePassword = User.updateOne(
//         { _id: req.params.id },
//         {
//           $set: {
//             password: encryptedPass
//           }
//         }
//       );

//       res.json({ message: "updated" });
//     } catch (err) {
//       res.json({ message: "something went wrong" });
//     }
//   }
// });

module.exports = router;
