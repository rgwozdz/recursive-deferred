/**
 * Created by rgwozdz on 8/7/15.
 */

var treeJson = require("./tree.json");
var Q = require("q");

/**
 * A recursive function that is deferred
 */
function recursive(nodeName, children){

    var deferred = Q.defer();

    deferredFunc(nodeName)
        .then(function(response){
            console.log(response);
            deferred.resolve("All recursion is complete.")
        })
        .catch(function(err){
            console.error(err);
            deferred.reject("Recursion error.")
        })
        .done();

    children.forEach(function(childNode){

        recursive(childNode.name, childNode.children);
    });

    return deferred.promise;
}

/**
 *
 * A dummy async func using deferred
 */
function deferredFunc(name){

    var deferred = Q.defer();

    var async = setTimeout(function(){

        deferred.resolve(name + " has now returned")
    }, 500);

    return deferred.promise;

}


// Execute the recursion.
recursive("Level 0, Node 0", treeJson)
    .then(function(response){

        console.log(response);

        console.log("/A function dependent on the recursive deferred could be execute here.")
    })
    .catch(function(err){
        console.error(err);
    })
    .done();


