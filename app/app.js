//In this file we are gonna define the modules
var myAngularApp = angular.module('myAngularApp',['ngRoute','ngAnimate']); //Also with this module name we have to pass the dependency if we want to use some additional features

 myAngularApp.config(['$routeProvider',function($routeProvider){
    
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'AppController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory',{
            templateUrl: 'views/directory.html',
            controller: 'AppController'
        }).otherwise({
            redirectTo: '/home'
        });
        // $locationProvider.html5Mode(true);
 }]);//This function will fire before your application start running
// myAngularApp.run(function(){   //This function will fire when  your application start running
  
// }
myAngularApp.directive('intern',[function(){
    return {
        restrict: 'E', //we restrict our directive to be used in a certain way..this can be done in 4 way a,e,c,m..here e stands for element and a stands for attribute. it means that we can only use our directive in the HTML as an element and if we put a that means we can use it as an attribute 
        scope: {
            interns: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,          //transclude property will show the output which is in another html file rather than this random.html..without including that it will not show the tag which is in another html file 
        //replace: true,             //it will replace the intern tag with div tag in our template random.html 
        controller: function($scope){
            $scope.random=Math.floor(Math.random() * 4);
        }
    };
}]);

myAngularApp.controller('AppController',['$scope','$http', function($scope,$http){  //minification of javascript file by putting that into the square bracket to protect the variables
//Scope  Object :It is the binding part between the HTML View and javascript cotroller
    $scope.message= "Controller check";
    $scope.removeIntern=function(intern){
        var removedIntern=$scope.interns.indexOf(intern);
        $scope.interns.splice(removedIntern,1);
    }
    $scope.addIntern=function(){
        $scope.interns.push({
            name: $scope.newintern.name,
            sirname: $scope.newintern.sirname,  //if you have integer in the data and if you add them into field,its going to be stored as a string so we can use parseInt which is a javascript function to turn that string into an integer
            belt: $scope.newintern.belt,
            available: true
        });
        $scope.newintern.name="";
        $scope.newintern.sirname="";
        $scope.newintern.belt="";
    };
    $scope.removeAll=function() {
        $scope.interns=[];
    };

    $http.get('data/interns.json').then(function(response){
    $scope.interns = response.data;
    });
// $scope.interns=['Akshata','prerna','vaidehi','asmita'];
// $scope.interns=[
//     {
//         name:"Akshata",
//         sirname:"Thorkar",
//         available: true,
//         belt: "green",
//         thumb: "content/img/akshata.jpg"
//     },
//     {
//         name:"Vaidehi",
//         sirname:"Hiwarkar",
//         available: true,
//         belt: "purple"
//     },
//     {
//         name:"prerna",
//         sirname:"chavan",
//         available: true,
//         belt: "blue"
//     },
//     {
//         name:"asmita",
//         sirname:"dhumal",
//         available: false,
//         belt: "pink"
//     }
// ];
//     console.log(angular.toJson($scope.interns));
}]);
myAngularApp.controller('ContactController',['$scope','$location',function($scope,$location){
    $scope.sendMessage=function(){
        $location.path('contact-success');
    }
}]);



//JSON Stands for javascript object notation