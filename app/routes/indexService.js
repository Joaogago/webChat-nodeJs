module.exports = function(application){

    application.get('/', function(req, res){
        console.log("VER O QUE TEM NO application DENTRO DO HARUKO>>:",application);
        application.app.controllers.indexController.home(application, req, res);
    });

}