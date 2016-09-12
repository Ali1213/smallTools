var path = require("path");
var config = require("./setConfig.js")();

config的格式,目前是写死的；
{
	"key1":{
		"littlekey1":"value",
		"littlekey2":"value"
	},
	"key2":{
		"littlekey1":"value",
		"littlekey2":"value"		
	}
}


/* 所有拥有回调函数，回调函数参数均为，1:err，2:result
* config有以下方法：
* setLocalFile : 设置config的文件所在文件夹；
* init : 创建config文件,1参，参数为回调函数，
*  setConfig：设置config文件，3参，1为key；2参为json，littlekey和value，3参为回调函数
* readConfig：读取config文件，1参，回调函数；
*/



config.setLocalFile(__dirname);

config.init();


config.setConfig("lalala",{
    "version":2
},function(err,r){
    console.log(err,r)
});



config.readConfig(function(e,r){
   console.log(e,r);
})