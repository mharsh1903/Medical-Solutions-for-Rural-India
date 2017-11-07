angular.module("app",['ngRoute','ui.bootstrap','dialogs',"firebase",'ngCookies'])
.controller("mainctrl",mainctrl)
function mainctrl($window,$dialogs,$http,$scope,$cookies,$cookieStore){
    var main=this;
    main.registerClinic=function(){
        console.log("hfjg");
    }
    main.ClinicLogin=function(email,password){
        
        var data={email:email,
            password:password};
        console.log(data);
        $http.post('/api/clinic_login/post', JSON.stringify(data)).then(function (response) {
    if (response.data){
       console.log(response.data);
       
    $window.location.href = '/clinicdashboard';
}
    }
    
    , function (response) {
    console.log("Service not Exists");
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
});
    }
     main.DoctorLogin=function(email,password,docname){
        var data={email:email,
            password:password,
        docname:docname};
        console.log(data);
        $http.post('/api/doctor_login/post', JSON.stringify(data)).then(function (response) {
    if (response.data){
       console.log(response.data);
       $window.location.href = '/doctordashboard';
   
}
    }
    
    , function (response) {
    console.log("Service not Exists");
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
});
     }

main.clinicLogin=function(email,password){
    var user=email;
    console.log(email+" "+password);
    var flip;
     var data={password:password};
      $http.post('/encrypt', JSON.stringify(data)).then(function (response) {
    if (response.data){
      console.log(response.data);
       flip=response.data;
   
}
    }
    
    , function (response) {
    console.log("Service not Exists");
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
});
    email=email.split('@').join('%').split('.').join('&');
   firebase.database().ref().child('clinics').child(email).child('details').on("value",snapshot=>{
    var userData=snapshot.val();

    if (userData){
      if(userData.password==flip){
          $cookieStore.put("clinic_user",email);
          $cookieStore.put("clinic_name",userData.name);
          
           $window.location.href = '/clinicdashboard'
      }
        
 
    
    }
   })

}
main.doctorLogin=function(email,password){
    var user=email;
    console.log(email+" "+password);
    var flip;
     var data={password:password};
      $http.post('/encrypt', JSON.stringify(data)).then(function (response) {
    if (response.data){
      console.log(response.data);
       flip=response.data;
   
}
    }
    
    , function (response) {
    console.log("Service not Exists");
    $scope.statusval = response.status;
    $scope.statustext = response.statusText;
    $scope.headers = response.headers();
});
    email=email.split('@').join('%').split('.').join('&');
   firebase.database().ref().child('doctors').child(email).child('details').on("value",snapshot=>{
    var userData=snapshot.val();

    if (userData){
      if(userData.password==flip){
          $cookieStore.put("doctor_user",email);
          $cookieStore.put("doctor_name",userData.name);
          
           $window.location.href = '/doctordashboard'
      }
        
 
    
    }
   })

}
}
