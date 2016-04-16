// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'ngCordova'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {

    $ionicAnalytics.register();

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

	if(window.plugins && window.plugins.AdMob) {
			var admob_key = device.platform == "Android" ? 
			"ca-app-pub-5062366829669199/9949852666" : "ca-app-pub-5062366829669199/9949852666";
			var admob = window.plugins.AdMob;
			admob.createBannerView( 
				{
					'publisherId': admob_key,
					'adSize': admob.AD_SIZE.BANNER,
					'bannerAtTop': false
				}, 
				function() {
					admob.requestAd(
						{ 'isTesting': false }, 
						function() {
							admob.showAd(true);
						}, 
						function() { console.log('failed to request ad'); }
					);
				}, 
				function() { console.log('failed to create banner view'); }
			);
		}

  });

})

.controller('MyCtrl', function ($scope, $cordovaClipboard, $ionicPopup) {

  $scope.change = function(choice){
	  if (choice == 'A')
	  {
		$scope.inputArea = 'English';
		$scope.outputArea = '한글';
	  }else{
		$scope.inputArea = '한글';
		$scope.outputArea = 'English';
	  }
  }  

  $scope.clear = function(data){
	  data.input='';
      data.output='';
  }

  $scope.paste = function(data){
	  $cordovaClipboard
		  .paste()
		  .then(function (result) {
			  data.input=result;
	  }, function (){
		  alert('paste failed');
	  });
  }

  $scope.copy = function(data){
	  
	  $cordovaClipboard
		  .copy(data.output)
		  .then(function () {
			$scope.showAlert();
	  }, function (){
		  alert('copy failed');
	  });
  }

  $scope.convert = function(data, choice){
	  if (choice == 'A')
	  {
		  data.output = engTypeToKor(data.input);
	  }
	  else
	  {
		  data.output = korTypeToEng(data.input);
	  }
  }

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Copy Success!',
     template: '쿨립보드에 복사되었습니다'
   });

   alertPopup.then(function(res) {
     console.log('Alert Success');
   });
 };

});