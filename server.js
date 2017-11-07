var express=require('express');
var cfenv = require("cfenv");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('index1.html');
});
app.get('/index1',function(req,res){
	res.render('index.html');
});
app.get('/registerclinic',function(req,res){
  res.render('registerclinic.html');
});
app.get('/registerpharmacy',function(req,res){
  res.render('registerpharmacy.html');
});
app.get('/registerlab',function(req,res){
  res.render('registerlab.html');
});
app.get('/clinicdashboard',function(req,res){
  res.render('clinicdashboard.html');
});
app.get('/doctordashboard',function(req,res){
  res.render('doctordashboard.html');
});
app.get('/modal',function(req,res){
  res.render('modal.html');
});

var path=require('path');
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 3002
app.listen(port, function() {
    console.log(" http://localhost:" + port);
});
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password='d6F3Efeq';
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var admin = require("firebase-admin");

var serviceAccount = require("medicalsolutionsforrural-india-firebase-adminsdk-6mgs8-de5008e479.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://medicalsolutionsforrural-india.firebaseio.com"
});

var id_email;
var docname;
var database = admin.database();

app.post('/api/clinic/post',function(req,res){
var name=req.body.name;
var address=req.body.address;
var pin=req.body.pin;
var district=req.body.district;
var pno1=req.body.pno1;
var pno2=req.body.pno2;
var email=req.body.email;
var password=req.body.password;
var clinic={"name":name,"address":address,"pin":pin,"district":district,"pno1":pno1,"pno2":pno2,"email":email,"password":password};
function writeUserData(name,address,pin,district,pno1,pno2,email,password) {
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  admin.database().ref('clinics/'+username+'/details').set({
    name:name,
    address:address,
    pin:pin,
    district:district,
    pno1:pno1,
    pno2:pno2,
    email:email,
    password:encrypt(password)
  });
}

writeUserData(name,address,pin,district,pno1,pno2,email,password);
 res.end("Submit");
});


app.post('/api/clinic_lat/post',function(req,res){

var email=req.body.email;
var lat=req.body.lat;
var longitude=req.body.longitude
console.log(lat+""+longitude+""+email);
function writeUserData(email,lat,longitude) {
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  admin.database().ref('clinics/'+username+'/details').push({
    latitude:lat,
    longitude:longitude
  })
}
writeUserData(email,lat,longitude);
 res.end("Submit");
});
app.post('/api/clinic_login/post',function(req,res){

var email=req.body.email;
var password=req.body.password;
console.log(email);
function findUserData(email,password) {
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  var ref=admin.database().ref('clinics/'+username+'/details');
  ref.on('value',gotdata,errdata);
  
}
function gotdata(data){
  var love=data.val();
  if(love.password==password&&love.email==email){
    id_email=love.email;
    res.end(love.email);
  }
}
function errdata(err){
  res.end(err);
}
password=encrypt(password);
findUserData(email,password);
 
});
app.post('/api/doctor_login/post',function(req,res){
docname=req.body.docname;

var email=req.body.email;
var password=req.body.password;
console.log(email);
function findUserData(email,password) {
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  var ref=admin.database().ref('clinics/'+username+'/details');
  ref.on('value',gotdata,errdata);
  
}
function gotdata(data){
  var love=data.val();
  if(love.password==password&&love.email==email){
    id_email=love.email;
    res.end(love.email);
  }
}
function errdata(err){
  res.end(err);
}
password=encrypt(password);
findUserData(email,password);
 
});
app.post('/api/addpatient/post',function(req,res){
var name=req.body.name;
var gender=req.body.gender;
var age=req.body.age;
var email=id_email;
function writeUserData(name,age,gender,email) {
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  admin.database().ref('clinics/'+username+'/patients').push({
    name:name,
    gender:gender,
    age:age
  });
}

writeUserData(name,gender,age,email);
 res.end("Submit");
});
app.get('/api/clinic/account',function(req,res){
  var email=id_email;
  
  var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  var ref=admin.database().ref('clinics/'+username+'/details');
  ref.on('value',gotdata,errdata);
  function gotdata(data){
  var love=data.val();
 res.send(love);
  
}
function errdata(err){
  res.end(err);
}

}

)
app.get('/api/listpatients/get',function(req,res){
  var email=id_email;
   var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
var data=[];
  var ref=admin.database().ref('clinics/'+username+'/patients');
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      data.push(childData);
      console.log(data);
      
    });
});
  res.json(data);
});
app.get('/api/doctor/account',function(req,res){
  res.json(docname);
})
app.post('/encrypt',function(req,res){
 var password=req.body.password;
var dead=encrypt(password);
var alive=decrypt(password);
console.log(alive);
res.json(dead);
})