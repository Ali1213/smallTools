var path = require("path");
var fs = require("fs");

module.exports = function(filePath,cb) {
    var _localFile = filePath;
        var writeFile = function(cb) {

                fs.writeFile(_localFile, JSON.stringify(_content), function(err, fd) {
                        cb && cb(err, "done");
                });
        };


        var createDir = function(arr, cb) {
                if (arr.length === 0) {
                        cb && cb(null, "done");
                        console.log("done");
                } else {
                        fs.mkdir(arr[0], function(e, r) {
                                if (e) {
                                        throw err;
                                }
                                arr.shift();
                                createDir(arr, cb);
                        });
                }
        };


        var createFile = function(file, cb) {
                if (typeof file == "function") {
                        cb = file;
                        file = null;
                };

                var filePath = file ? path.dirname(file) : path.dirname(_localFile);

                fs.stat(filePath, function(e) {
                        if (e) {
                                _pathArr.unshift(filePath);
                                createFile(filePath, cb);
                        } else {
                                if (_pathArr.length === 0) {
                                        writeFile(cb);
                                } else {
                                        createDir(_pathArr, function(e, r) {
                                                console.log(e, r)
                                                if (r) {
                                                        _pathArr = [];
                                                        writeFile(cb);
                                                }
                                        })
                                }

                        }
                });

        };

        createFile(function(e,r){
            cb && cb(e,r);
        })
}
