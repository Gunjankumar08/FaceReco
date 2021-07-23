
var app = angular.module('routingFaceRecognition',['ui.router','ui.bootstrap','flash']);
// var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngAside', 'ngDraggable', 'flash', 'chart.js', 'ngTagsInput', 'ui.tinymce', 'hljs', 'mwl.confirm', 'ngAudio', 'uiSwitch', 'rzModule' ]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
                // For any unmatched url, send to /business
                $urlRouterProvider.otherwise("/")

                $stateProvider
                        .state('EmployeeSingup', {
                            url: "/",
                            templateUrl: "/static/ngTemplates/EmployeeSingup.html",
                            controller: "EmployeeSingup"
                        })

                        .state('EmployeeAttendance', {
                            url: "/EmployeeAttendance",
                            templateUrl: "/static/ngTemplates/EmployeeAttendance.html",
                            controller: "EmployeeAttendance"
                        })
                        .state('DeleteTraining', {
                            url: "/DeleteTraining",
                            templateUrl: "/static/ngTemplates/DeleteTraining.html",
                            controller: "DeleteTraining"
                        })
                        .state('EmployeeAttendanceResult', {
                            url: "/EmployeeAttendanceResult",
                            templateUrl: "/static/ngTemplates/EmployeeAttendanceResult.html",
                            controller: "EmployeeAttendanceResult"
                        })

            }])
var emptyFile = new File([""], "");
app.controller("main", function($scope, $state, $stateParams, $http, $rootScope , $filter) {
  $scope.EmployeeAttendance = function(){
      $state.go('EmployeeAttendance')
  }
  $scope.DeleteTraining = function(){
      $state.go('DeleteTraining')
  }
  $scope.EmployeeAttendanceResult = function(){
      $state.go('EmployeeAttendanceResult')
  }
})


app.controller("EmployeeSingup", function($scope, Flash,$state, $stateParams, $http, $rootScope ,$filter) {
var data=''
$scope.OpenCam = function() {
         let constraintObj = {
             audio: false,
             video: {
                 facingMode: "user",
                 width:320,
                 height:320,
             }
         };
         // width: 1280, height: 720  -- preference only
         // facingMode: {exact: "user"}
         // facingMode: "environment"

         //handle older browsers that might implement getUserMedia in some way
         if (navigator.mediaDevices === undefined) {
             navigator.mediaDevices = {};
             navigator.mediaDevices.getUserMedia = function(constraintObj) {
                 let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                 if (!getUserMedia) {
                     return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                 }
                 return new Promise(function(resolve, reject) {
                     getUserMedia.call(navigator, constraintObj, resolve, reject);
                 });
             }
         }else{
             navigator.mediaDevices.enumerateDevices()
             .then(devices => {
                 devices.forEach(device=>{
                     console.log(device.kind.toUpperCase(), device.label);
                     //, device.deviceId
                 })
             })
             .catch(err=>{
                 console.log(err.name, err.message);
             })
         }

         navigator.mediaDevices.getUserMedia(constraintObj)
         .then(function(mediaStreamObj) {
             //connect the media stream to the first video element
             let video = document.querySelector('video');
             if ("srcObject" in video) {
                 video.srcObject = mediaStreamObj;
                 console.log(video.srcObject,"aaaaa");
             } else {
                 //old version
                 video.src = window.URL.createObjectURL(mediaStreamObj);
             }

             video.onloadedmetadata = function(ev) {
                 //show in the video element what is being captured by the webcam

                 video.play();
             };

             //add listeners for saving video/audio
             let start = document.getElementById('btnStart');
             let stop = document.getElementById('btnStop');
             let vidSave = document.getElementById('vid2');
             let mediaRecorder = new MediaRecorder(mediaStreamObj);
             let chunks = [];

             start.addEventListener('click', (ev)=>{
                 mediaRecorder.start();
                 console.log(mediaRecorder.state);
             })
             stop.addEventListener('click', (ev)=>{
                 mediaRecorder.stop();
                 console.log(mediaRecorder.state);
             });
             mediaRecorder.ondataavailable = function(ev) {
                 chunks.push(ev.data);
                 console.log(ev.data,"ev data");
             }
             mediaRecorder.onstop = (ev)=>{
               // alert("GGGG");
               console.log(chunks,"chusn");
                 let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                 console.log(blob,"blob");
                 chunks = [];
                 console.log(chunks,"chunks");
                 let videoURL = window.URL.createObjectURL(blob);
                 vidSave.src = videoURL;
                 $scope.data=vidSave.src;
                 console.log( videoURL,"hellloooo")


                     //              let blob = new Blob(chunks, { 'type': "video/mp4;" });
                     // // The full Blob Object can be seen
                     // // in the Console of the Browser
                     // console.log('Blob - ', blob);

                     var reader = new FileReader();
                     reader.readAsDataURL(blob);
                     reader.onloadend = function () {
                     var base64String = reader.result;
                     $scope.data=base64String;

                     console.log('Base64 String - ', base64String);

                     // Simply Print the Base64 Encoded String,
                     // without additional data: Attributes.
                     console.log('Base64 String without Tags- ',
                    base64String.substr(base64String.indexOf(', ') + 1));
                  }
             }
         })
         .catch(function(err) {
             console.log(err.name, err.message);
         });

}
// var data=''
//   $scope.OpenCam = function() {
//   Webcam.set({
//    width: 320,
//    height: 240,
//    image_format: 'png',
//    png_quality: 90
//  });
//   Webcam.attach( '#my_camera' );
// }
// $scope.take_snapshot = function() {
//
//   // take snapshot and get image data
//   Webcam.snap( function(data_uri) {
//    // display results in page
//    $scope.data=data_uri
//    console.log($scope.data,"imagee");
//    document.getElementById('results').innerHTML =
//    '<img src="'+data_uri+'"/>';
//    } );
//
//
//  }
  $scope.resetForm = function() {
$scope.form={
      employee_id:'',
      user_email:'',
      first_name:'',
      last_name:'',
      group_name:'',
      imagePath:'',
      }
    }
    // console.log($scope.form.imagePath,"fdfsdf")
      $scope.saveEmp = function() {
        $scope.msg = ''
          $scope.errmsg = ''
          var fd = new FormData()
          fd.append('employee_id', $scope.form.employee_id);
          fd.append('user_email', $scope.form.user_email);
          fd.append('first_name', $scope.form.first_name);
          fd.append('last_name', $scope.form.last_name);
          fd.append('group_name', $scope.form.group_name);
          // if (typeof $scope.form.imagePath != 'string' && $scope.form.imagePath != emptyFile && $scope.form.imagePath != null) {
          //   fd.append('imagePath', $scope.form.imagePath)
          // }
          fd.append('imagePath', $scope.data);
          console.log($scope.data,"alfaaaaaaaaa");

        var method = 'POST'
        var url = '/faceRecognition/image_capture/'
        if ($scope.form.pk){
          method = 'PATCH';
          url = url+$scope.form.pk + '/';
        }
        $scope.display=true;
        $http({
          method: method,
          url: url,
          data: fd,
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }).
        then(function(response) {
          Flash.create('success', 'Employee Singup  successfully!')
          $scope.msg = 'Employee Singup  Successfully!'
          // $state.go('EmployeeAttendance')
            $scope.resetForm();
      })
      }
})
app.controller("EmployeeAttendance", function($scope, $state, $stateParams, $http, $rootScope ,$filter) {
  var data=''
  $scope.OpenCam = function() {
           let constraintObj = {
               audio: false,
               video: {
                   facingMode: "user",
                   width:320,
                   height:320,
               }
           };
           // width: 1280, height: 720  -- preference only
           // facingMode: {exact: "user"}
           // facingMode: "environment"

           //handle older browsers that might implement getUserMedia in some way
           if (navigator.mediaDevices === undefined) {
               navigator.mediaDevices = {};
               navigator.mediaDevices.getUserMedia = function(constraintObj) {
                   let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                   if (!getUserMedia) {
                       return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                   }
                   return new Promise(function(resolve, reject) {
                       getUserMedia.call(navigator, constraintObj, resolve, reject);
                   });
               }
           }else{
               navigator.mediaDevices.enumerateDevices()
               .then(devices => {
                   devices.forEach(device=>{
                       console.log(device.kind.toUpperCase(), device.label);
                       //, device.deviceId
                   })
               })
               .catch(err=>{
                   console.log(err.name, err.message);
               })
           }

           navigator.mediaDevices.getUserMedia(constraintObj)
           .then(function(mediaStreamObj) {
               //connect the media stream to the first video element
               let video = document.querySelector('video');
               if ("srcObject" in video) {
                   video.srcObject = mediaStreamObj;
                   console.log(video.srcObject,"aaaaa");
               } else {
                   //old version
                   video.src = window.URL.createObjectURL(mediaStreamObj);
               }

               video.onloadedmetadata = function(ev) {
                   //show in the video element what is being captured by the webcam

                   video.play();
               };

               //add listeners for saving video/audio
               let start = document.getElementById('btnStart');
               let stop = document.getElementById('btnStop');
               let vidSave = document.getElementById('vid2');
               let mediaRecorder = new MediaRecorder(mediaStreamObj);
               let chunks = [];

               start.addEventListener('click', (ev)=>{
                   mediaRecorder.start();
                   console.log(mediaRecorder.state);
               })
               stop.addEventListener('click', (ev)=>{
                   mediaRecorder.stop();
                   console.log(mediaRecorder.state);
               });
               mediaRecorder.ondataavailable = function(ev) {
                   chunks.push(ev.data);
                   console.log(ev.data,"ev data");
               }
               mediaRecorder.onstop = (ev)=>{
                 // alert("GGGG");
                 console.log(chunks,"chusn");
                   let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                   console.log(blob,"blob");
                   chunks = [];
                   console.log(chunks,"chunks");
                   let videoURL = window.URL.createObjectURL(blob);
                   vidSave.src = videoURL;
                   $scope.data=vidSave.src;
                   console.log( videoURL,"hellloooo")


                       //              let blob = new Blob(chunks, { 'type': "video/mp4;" });
                       // // The full Blob Object can be seen
                       // // in the Console of the Browser
                       // console.log('Blob - ', blob);

                       var reader = new FileReader();
                       reader.readAsDataURL(blob);
                       reader.onloadend = function () {
                       var base64String = reader.result;
                       $scope.data=base64String;

                       console.log('Base64 String - ', base64String);

                       // Simply Print the Base64 Encoded String,
                       // without additional data: Attributes.
                       console.log('Base64 String without Tags- ',
                      base64String.substr(base64String.indexOf(', ') + 1));
                    }
               }
           })
           .catch(function(err) {
               console.log(err.name, err.message);
           });

  }
  $scope.getEmpDetails = function(){
        $http.get('/faceRecognition/employeeSingup')
        .then(function(response){
          $scope.empData=response.data
        })
      }
      $scope.getEmpDetails()
  $scope.resetForm = function() {
$scope.form={
      employee:'',
      // marked_time:'',
      imagePath:'',
      empMessage:'',
      empAddress:'',
      }
    }
      $scope.saveEmpAttendance = function() {
          $scope.msg = ''
          var fd = new FormData()
          // if ($scope.form.marked_time != '' ) {
          //   fd.append('marked_time' , $filter('date')($scope.form.marked_time , "yyyy-MM-dd'T'HH:mm:ss") );
          // }
          fd.append('employee', $scope.form.employee.pk);
          fd.append('empMessage', $scope.form.empMessage);
          fd.append('empAddress', $scope.form.empAddress);
          fd.append('imagePath', $scope.data);

        var method = 'POST'
        var url = '/faceRecognition/employee_Attendance/'
        if ($scope.form.pk){
          method = 'PATCH';
          url = url+$scope.form.pk + '/';
        }
        $scope.display=true;
        $http({
          method: method,
          url: url,
          data: fd,
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }).
        then(function(response) {
          // Flash.create('success', 'Enquiry created successfully!')
          $scope.msg = ' Attendance Added  Successfully!'

          // $state.go('')
            $scope.resetForm();
      })
      }
})
app.controller("DeleteTraining", function($scope, $state, $stateParams, $http, $rootScope ,$filter) {
  $scope.resetForm = function() {
$scope.form={
      employee_id:'',
      user_email:'',
      group_name:'',
      }
    }
    $scope.DeleteEmp = function() {
        $scope.msg = ''

        var fd = new FormData()

        fd.append('employee_id', $scope.form.employee_id);
        fd.append('user_email', $scope.form.user_email);
        fd.append('group_name', $scope.form.group_name);

      var method = 'POST'
      var url = '/faceRecognition/DeleteTraining/'
      if ($scope.form.pk){
        method = 'PATCH';
        url = url+$scope.form.pk + '/';
      }
      $scope.display=true;
      $http({
        method: method,
        url: url,
        data: fd,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).
      then(function(response) {
        // Flash.create('success', 'Enquiry created successfully!')
        // $scope.msg = 'Employee Data Deleted  Successfully!'

        // $state.go('')
          $scope.resetForm();
    })
    }
})
app.controller("EmployeeAttendanceResult", function($scope, Flash,$state, $stateParams, $http, $rootScope ,$filter) {
  $scope.form={
      employee_id:'',
      user_email:'',
    }


    $scope.SearchingResult = function() {

    $http({
      method:'GET',
      // url:'/api/homepage/paymentAdviceCreate/?date='+$scope.form.fromDate.toJSON().split('T')[0]
      url:'/faceRecognition/employeeAttendance/?employee__employee_id='+$scope.form.employee_id+'&employee__user_email='+$scope.form.user_email
    }).then(function(response){
      $scope.AttendanceResult = response.data
      if(response.data.length == 0){
        alert("Data Not Available")
      }

      // $scope.enqdata = response.data.results

      console.log(response.data.length,"sdfsdfsdfsdfffffffffff");
      $scope.count = response.data.count

    })
  }

})
