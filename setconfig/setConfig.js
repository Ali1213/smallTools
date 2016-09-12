var path = require("path");
var fs = require("fs");

var handleConfig = function() {

    this._localFile = path.join(__dirname,"info.ini");
    // console.log(this._localFile);
    this._content = {};
    this._pathArr = [];

    // setInterval(function(){
    //    console.log(_localFile);
    // },1000)
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

    return {
        "readConfig": function(cb) {
            fs.readFile(_localFile, function(err, data) {
                if (err) {
                    cb && cb(err, null);
                } else {
                    try{
                        _content = JSON.parse(data);
                    }catch (e){

                    }
                    cb && cb(err, _content);
                };

            });
        },
        "setConfig": function(sqlName, content, cb) {

            if (!JSON.stringify(content)) {
                cb && cb("content is not a json", null);
                return;
            };

            this.readConfig(function(err, result) {
                if (err) {
                    cb && cb(err, null);
                } else {
                    _content[sqlName] = _content[sqlName] ? _content[sqlName] : {};
                    Object.keys(content).forEach(function(item) {
                        _content[sqlName][item] = content[item];
                    });
                    writeFile(cb);
                }
            });
        },
        "setLocalFile": function(str){
            _localFile = path.join(str,"info.ini");
        },
        "init":function(cb){
            createFile(function(e,r){
                cb && cb(e,r);
            });
        }

    };

};

module.exports = handleConfig;