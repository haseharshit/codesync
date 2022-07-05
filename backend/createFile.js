const path= require("path");
const fs= require("fs");
const { fork } = require("child_process");
const {v4: uuid } =require("uuid");

const dest= path.join(__dirname, "codes");

if(!fs.existsSync(dest)){
    fs.mkdirSync(dest, {recursive:true});
};
//these things will get executed except the function(which will be executed when called) when imported.
const createFile= async ({format, code})=>{
    const fileName=uuid();
    fileLocation= path.join(dest, (fileName+'.'+format));
    await fs.writeFileSync(fileLocation, code);
    return fileLocation;
}
module.exports=createFile;