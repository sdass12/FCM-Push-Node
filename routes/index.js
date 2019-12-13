const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../public/serviceAccountKey.json');
//const push = require('../public/javascripts/PushNotification');


admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/push-notification', (req,res) =>{
  const body = req.body;
  console.log(body.token+ body.title+ body.body);
  const registrationTokens = body.token;

  //http v1 api 요청 방식
  //push('https://fcm.googleapis.com/fcm/send',registrationTokens,body.body,body.title);

  //firebase admin sdk 를 이용한 요청 방식
  const messages = {
      notification : {
          title : body.title,
          body : body.body
      },
      data : {
        click_action : 'http://localhost:3000',
        icon : 'favicon.ico'
      },
      token : registrationTokens,
      icon : "favicon.ico"
  };

  console.log(messages);
  admin.messaging().send(messages)
      .then((response) => {
        console.log('Successfully sent message : ' + response);
      })
      .catch((error) => {
        console.log(error + "promise error");
    });
  res.render('success');
});
module.exports = router;
