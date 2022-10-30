const nodemailer = require("nodemailer");

module.exports.sendEmail =async (options)=>{

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "tariqshreem00@gmail.com", // generated ethereal user
      pass: "rcwdtacjqgzycpgs", // generated ethereal password
    },
  });

   transporter.sendMail({
    from: '"knowledge academy" <tariqshreem00@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world", // plain text body
    html: `
        <div style="background:teal;color:#fff">
            <h1>${options.message}</h1>
            <a href="http://localhost:3000/users/verify/${options.token}">verify your email</a>
        </div>
    
    `, // html body
  },(err,info)=>{
    if(err){console.log(err);}
    else {
        console.log(info);
    }
  });

 

}