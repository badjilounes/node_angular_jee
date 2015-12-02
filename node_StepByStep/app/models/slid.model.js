//var fs =require("fs");
//var CONFIG = require("./config.json");

var SlidModel=function (smodel){

	
	
	smodel=check_attr(smodel);
//	console.log("class slid.model.js:"+smodel.type);
	
	this.type=smodel.type;
	this.id=smodel.id;
	this.title=smodel.title;
	this.fileName=smodel.fileName;
	var data=smodel.data;
	

	this.setData=function (data1){
		if (data1 === "undefined") {return -1;}
		this.data=data1;
	}

	this.getData=function(){
//		if (smodel === "undefined") {return -1;}
		return this.data;
	}
	
	function check_attr(smodel){
        if(typeof smodel === "undefined")
        {
        	smodel={type: null, id: null, title: null, fileName: null, data: null};
        }
        else{
            if(typeof smodel.type === "undefined")
                smodel["type"]=null;
            if(typeof smodel.id === "undefined")
                smodel["id"]=null;
			if(typeof smodel.title === "undefined")
                smodel["title"]=null;
			if(typeof smodel.fileName === "undefined")
                smodel["fileName"]=null;
			if(typeof smodel.data === "undefined")
                smodel["data"]=null;
        }
        return smodel;
    }
	
}




SlidModel.create=function(smodel, callback){
	var fs =require("fs");
	var CONFIG = JSON.parse(process.env.CONFIG);
	
//		
	if(smodel.id == null || typeof smodel.id === "undefined"){
		callback("Id du slide model null ou undefined");
	}
	else if(smodel.fileName == null || typeof smodel.fileName === "undefined"){
		
		callback("fileName du slide model null ou undefined");
	}
	else{
		var metadata_path = CONFIG.presentationDirectory + "/" +smodel.id +".meta.json";
		var fileName_path = CONFIG.presentationDirectory + "/" +smodel.fileName;
		var string_content = JSON.stringify(smodel);
		
		fs.writeFile(fileName_path, smodel.data, function(err) {
	        if(err) {
	          return callback(err);
	        } else {
	          console.log("Data:"+smodel.data+" saved to " + fileName_path);     
	          fs.writeFile(metadata_path, string_content, function(err) {
	              if(err) {
	            	 return callback(err);
	              } else {
	                console.log("meta:"+string_content+" saved to " + metadata_path);
	              }
	              callback(null, smodel);
	          });
	        }
	       
	    });  
		
	}
	
	
}

SlidModel.read=function(id, callback){
	var fs =require("fs");
	var CONFIG = JSON.parse(process.env.CONFIG);

//	var slidmodel= new SlidModel();
	var slid_path=CONFIG.presentationDirectory + "/" +id +".meta.json";
	
//	if( typeof slid !== "undefined" && slid.id != null && slid.id != "undefined"){
	fs.readFile(slid_path, function (err, data) {
		  //utils.js
		  if (err) return callback(err);
		  
//		  data_json=JSON.parse(data.toString());
		  var slid_ret = new SlidModel(data);

		  callback(null, slid_ret);
		  
		});
	
//	}
	
}
	

SlidModel.update=function(slid, callback){
	
//	SlidModel.read(slid.id,function(err, slid_lu){
//		if(err) return callback(err);
//		
		if( typeof slid !== "undefined" && slid.getData().length >0 && slid.getData() != "undefined" && typeof slid.getData() !== "undefined"&& slid.id != null && slid.id != "undefined" && typeof slid.id !== "undefined"){
			SlidModel.create(slid, function(err, slid_cree){	
				if(err) return callback(err);	
				callback(null, "slid updated");
			});
		}
		else{
			return callback("pas possible !");
		}
	
		
		
		
//	});
	
	
}

SlidModel.delete=function(id, callback){
	 var fs =require("fs");
	 var CONFIG = JSON.parse(process.env.CONFIG);
	 if( typeof slid !== "undefined" && slid.getData().length >0 && typeof slid.getData() !== "undefined" && slid.id != null && slid.id != "undefined"){
	 SlidModel.read(id, function(err, data){
		if(err) return callback(err);
		var slid_lu =data;
		console.log("slid_lu.id:"+slid_lu.id);
		fs.unlink(CONFIG.presentationDirectory + "/" + slid_lu.id +".meta.json",function(data, err){
		fs.unlink(CONFIG.presentationDirectory + "/"+slid_lu.fileName, function(data,err){
			callback();
			});
		});
	 });
	 }
	 else{
		 return callback(null, "pas possible !");
	 }
      
	} 
//}
module.exports = SlidModel;