/**
 * Created by rgwozdz on 8/7/15.
 */

var treeJson = require("./tree.json");
var Q = require("q");
var forEach = require('async-foreach').forEach;


/**
 *
 * A dummy async func using deferred
 */
function deferredFunc(name){

    var deferred = Q.defer();

    console.log("Fire Async at level", name);
    var async = setTimeout(function(){

        deferred.resolve(name + " has now returned\n")

    }, 500);

    return deferred.promise;

}

function allDone(notAborted, arr) {
    console.log("The recursive Async stuff is done, now u can proceed...");
}

function recur(item, done){

    forEach(item.children, function(item, index, arr) {

        var itemDone = this.async();

        deferredFunc(item.name)
            .then(function(response){

                console.log(response);
                recur(item, itemDone)

            })
            .catch(function(err){
                console.error(err);
            })
            .done()


    }, done);
}

var node0 = {name: "Level 0", children: treeJson};

console.log("\nStart recursion:\n")
recur(node0, allDone)



