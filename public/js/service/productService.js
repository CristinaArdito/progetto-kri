var kriApp = angular.module('kriapp');

kriApp.service('productService', ['$q', '$http', function($q, $http) {

this.addProduct = function(product) {
	/*   In alternativa
		$http.post("././api/product/add", {
        'data' : product
      })
      .then(function(){
          return "success";
      })
      .catch(function(){
        return "error";
      })
	*/
	var deferred = $q.defer();
	$http.post("././api/product/add", {'data' : product})
	.then(function(data) {
		deferred.resolve(data);
    }).catch(function(err, code) {
    	deferred.reject(err);
    });
    return deferred.promise;
}

this.getProducts = function() {
    var deferred = $q.defer();
    $http.post("././api/product/all")
    .then(function(data){
          //data.data returns all the object
          //data.data.msg returns the message
          //data.data.data returns the list of products
    deferred.resolve(data.data.data);
    })
    return deferred.promise;
}

this.uploadImg = function(data, url) {
	var deferred = $q.defer();
      if(url == null){
        $http.post("././api/product/upload", {
          'data' : data, 'url' : null
        })
        .then(function(urlName){
          deferred.resolve(urlName);
        })
      }else{
        $http.post("././api/product/upload", {
          'data' : data, 'url' : url
        })
        .then(function(urlName){
          deferred.resolve(urlName);
        })
      }
      return deferred.promise;
}


}]).run(function(productService) {});
