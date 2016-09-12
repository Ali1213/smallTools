# setConfig

config的格式,目前是写死的；

```json
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
```


/* 所有拥有回调函数，回调函数参数均为，1:err，2:result
* config有以下方法：
* setLocalFile : 设置config的文件所在文件夹；
* init : 创建config文件,1参，参数为回调函数，
*  setConfig：设置config文件，3参，1为key；2参为json，littlekey和value，3参为回调函数
* readConfig：读取config文件，1参，回调函数；
*/


# setFile

今天想在某个路径创建一个文件，但该路径不一定存在，所以写了个这个小工具
如果路径不存在，则依次创建文件夹，知道创建一个该文件；
如果路径存在，则直接创建该文件；

直接引用即可，有两个参数，1参为，传入的路径；2参为回调函数；

代码未整理，略微有点乱