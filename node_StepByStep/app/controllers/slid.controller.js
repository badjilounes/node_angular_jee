var SlidModel=require("./../models/slid.model.js");
var CONFIG = require("./../../config.json");
var getListFile = require("./../../myListFile.js");
var path =require("path");

module.exports =function (){
	getListFile(CONFIG.presentationDirectoryFromController, "json", function(err, files) {
        if(err){
            console.error(err);
        }
        else{
                    var LoadPres = {};
                    files.forEach(function(file){
                        var jfile_path = path.join(CONFIG.presentationDirectoryFromController, file);
                        jfile_path = CONFIG.presentationDirectoryFromController + "/" + file;
                        //console.log("jpath file: " +jfile_path);
                        var jfile = require(jfile_path);
                        var slid = new SlidModel(jfile);
                        LoadPres[jfile.id] = JSON.stringify(slid);
                        });
                    //console.log("LoadPres: " + LoadPres);
                    //console.log("stringify: " +JSON.stringify(LoadPres));
                    return JSON.stringify(LoadPres);
                }
            });
//            files.forEach(function(file){
//                var jfile_path = path.join(CONFIG.contentDirectoryFromController, file);
//                console.log(flie);
//                jfile_path = CONFIG.contentDirectoryFromController + "/" + file;
//                //console.log("jpath file: " +jfile_path);
//                var jfile = require(jfile_path);
//                var slidmodel = new SlidModel(jfile);
//                
//                SlidModel.read(slidmodel.id, function(err, str_slid){
//                	console.log("slid_lu controller:"+ str_slid);
//                })
//                
//                var json_sm = JSON.parse(slidmodel);
//                
//                list_slid[jfile.id] = json_sm;
//                });
            //console.log("LoadPres: " + LoadPres);
            //console.log("stringify: " +JSON.stringify(LoadPres));
//        }
////        return list_slid;
//	});
	
}
//function create(){
//	
//}
//
//function read(){
//	
//}
