const fetch = require('node-fetch');
global.Headers = fetch.Headers;
function NotificationPush(url,token,body,title){
    const message = {
        "notification" :{
            "body" : body,
            "title": title,
            "click_action": "http://localhost:3000/"
        },
        "to" : token
    };
    fetch(url ,{
        method: 'POST',
        body: JSON.stringify(message),
        headers: new Headers({
            'Content-type': 'application/json',
            'Authorization' : 'key=AIzaSyCL9c8L08MHXivzXNesveX-AuH925oooW8'
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        }
    }).catch(e =>{
        console.log(e)
    })
}

module.exports = NotificationPush;
