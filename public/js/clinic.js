angular.module("clinic",['ngRoute',"firebase","ngCookies"])
.config(function($routeProvider){

$routeProvider
    .when("/", {
        templateUrl : "templates/addpatient.html"
    })
     .when("/inventory", {
        templateUrl : "templates/inventory.html"
    })
    .when("/addinventory", {
        templateUrl : "templates/addinventory.html"
    })
    .when("/docschedule",{
        templateUrl : "templates/docschedule.html"
    })
    .when("/addpatient",{
        templateUrl : "templates/addpatient.html"
    })
    .when("/addappointment",{
        templateUrl : "templates/addappointment.html"
    })
    .when("/distress",{
        templateUrl : "templates/distress.html"
    })
    .otherwise({
        redirectTo: "/"
    })
}

)
.controller("appointmentCtrl",appointmentCtrl)
function appointmentCtrl($http,$location,$scope,$window,$firebaseObject,$timeout,$cookies,$cookieStore){
var appointment=this;
appointment.today = new Date();
appointment.user=$cookies.get('user');
appointment.clinic_name=$cookies.get('clinic_name');
console.log(appointment.user);
  appointment.number=[1,2,3];
  
    appointment.addPatient=function(name,gender,age){

    var email=$cookies.user;

  firebase.database().ref('clinics/'+email+'/patients').push({
    name:name,
    gender:gender,
    age:age
  });
 

    }
    appointment.addmedicine=function(name){

    var email=appointment.fir.email;
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  var duma=firebase.database().ref('clinics/'+username+'/inventory/');
  duma.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      appointment.meddata=childData;
      console.log(childData);
      appointment.meddata=childData;
    });
});$timeout(function(){
     ;
  

},3000)
  console.log(duma);
  var lump=duma.val();
  console.log(lump);}
    appointment.listPatient=function(){
var email=appointment.fir.email;
         var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
appointment.data=[];
  var ref=firebase.database().ref('clinics/'+username+'/patients');
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      appointment.data.push(childData);
      console.log(appointment.data);
      
    });
});$timeout(function(){
     console.log(appointment.data);
  

},3000)
    
    }
     appointment.bookappointment=function(docname,patname,gender,age,date){

    var email=appointment.fir.email;
var username=email.split("@");
username=username.join("%");
username=username.split(".");
username=username.join("&");
  firebase.database().ref('clinics/'+username+'/doctor/'+docname+'/pending/'+date).push({
    patient_name:patname,
    gender:gender,
    age:age
  });
 firebase.database().ref('clinics/'+username+'/doctor/'+docname+'/pending/').on('value',function(snapshot){
     snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      
      console.log(childData);
      
    });
});$timeout(function(){
     
  

},3000)
 

    };
    //appointment.addmedicine=function(index,quantity){
  //      var email=appointment.fir.email;
  //       var username=email.split("@");
//username=username.join("%");
//username=username.split(".");
//username=username.join("&");
  //      firebase.database().ref('clinics/'+username+'/inventory/medicines/'+index).set({
    //        quantity:quantity+1
      //  });
    //}
}
