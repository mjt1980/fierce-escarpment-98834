const express = require('express');
const app = express();
var http = require('http');
const { connect } = require('http2');
var jsforce = require('jsforce');

              //process.env.PORT
app.set('port', process.env.PORT || 3001);//3001 the local PORT

try {
    app.get('/', (req, appRes) => {
        appRes.send('Welcome to my test heroku node Web !! muhahahahaha!');
    });
    app.get('/mySF_accounts', (req, appRes) => {
        var conn = new jsforce.Connection();
        var userName = 'mjt198010@wise-koala-jxkz5w.com';
        var pw_securitytoken = '!mjt_108003' + 'C921W8O0J86OeEWWQQvtoAe7';
        var allAccounts = [];
        conn.login(userName, pw_securitytoken, function (err, userInfo) {
            if (err) { return console.error(err); }
            conn.query('SELECT Id, Name FROM Account', function (err, res) {
                if (err) { return console.error(err); }
                console.log(conn.accessToken);
                console.log(conn.instanceUrl);
                console.log("User ID: " + userInfo.id);
                console.log("Org ID: " + userInfo.organizationId);
                if (res.records) {
                    //allAccounts = res.records;
                    appRes.render('hello.ejs',{accs:res.records});
                }else{
                    appRes.send('can not get any account!');
                }

                // accList.forEach(element => {
                //     console.log('Account ID:'+element.Id +' Name:'+element.Name);
                // });
                //appRes.send('JSForce Connect Successed!');
                //appRes.render('hello.ejs',{accs:allAccounts});
                
                //console.log(res);
            });
        })

    });
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/**
app.get('/', (req, res) => {
    res.render('hello.ejs');
});

app.get('/test1', (req, res) => {
    res.send('test1');
});

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})


app.listen(3000);
*/

//localhost:3000
//Get-ExecutionPolicy
//Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
//nodemon app.js