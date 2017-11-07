angular.module("doctor",['ngRoute',"firebase"])
.config(function($routeProvider){

$routeProvider
    .when("/", {
        templateUrl : "templates/schedule.html"
    })
     .when("/mypatients", {
        templateUrl : "templates/mypatients.html"
    })
    
    .otherwise({
        redirectTo: "/"
    })
}

)
.controller("docCtrl",docCtrl)
function docCtrl($http,$location,$scope,$window,$firebaseObject,$timeout){
var doc=this;
doc.today = new Date();
doc.number=[1,2,3,4,5,6,7,8,9,10];
doc.array=[];
doc.name;
$http.get("/api/doctor/account")
  .then(function(response) {
      doc.content = response.data;
      doc.name=doc.content;
     
      doc.statuscode = response.status;
      doc.statustext = response.statusText;            
  });
  $timeout(function(){ console.log(doc.name);},22);
  
    doc.addPatient=function(name,gender,age){

    var email=doc.fir.email;
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  firebase.database().ref('clinics/'+username+'/doctor').push({
    name:name,
    gender:gender,
    age:age
  });
 

    }
    doc.addmedicine=function(name){

    var email=doc.fir.email;
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  var duma=firebase.database().ref('clinics/'+username+'/inventory/medicines/');
  duma.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      doc.meddata=childData;
      console.log(childData);
      doc.meddata=childData;
    });
});$timeout(function(){
     console.log(doc.meddata);
  

},3000)
  console.log(duma);
  var lump=duma.val();
  console.log(lump);}
    doc.listPatient=function(){
var email=doc.fir.email;
         var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
doc.data=[];
  var ref=firebase.database().ref('clinics/'+username+'/patients');
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      doc.data.push(childData);
      console.log(doc.data);
      
    });
});$timeout(function(){
     console.log(doc.data);
  

},3000)
    
    }
     doc.bookdoc=function(date){

   
 console.log("Perfect");
 firebase.database().ref('clinics/aalcock4w%tamu&edu/doctor/'+doc.name+'/pending/'+date).on('value',function(snapshot){
     snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      doc.array.push(childData);
      console.log(childData);
      
    });
});$timeout(function(){
     
  

},3000)
 

    };
    
}
