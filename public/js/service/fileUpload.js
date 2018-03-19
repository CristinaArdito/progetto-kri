var kriApp = angular.module('kriapp');

kriApp.service('fileUpload', ['$q','dataHandler', 'productService', function ($q, dataHandler, productService) 
  {

        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };

    this.fileReader = function (file) {

            var reader = new FileReader();
            var result = null;

            reader.readAsDataURL(file);

            reader.onload = function(event) {
                dataHandler.set(event.target.result);

        productService.uploadImg(dataHandler.get_nonreset(), null)
        .then(function(data) {
          console.log(data.data.urlName);
        })
        .catch(function(err) { console.log(err);})
                alert("Caricamento completato");
            };
    }
  }])
  .run(function(fileUpload) {});