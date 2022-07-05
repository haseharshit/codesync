const {exec} =require("child_process") ;
const fs= require("fs");
const path =require("path");
const outFolder=path.join(__dirname, "outputs");
if(!fs.existsSync(outFolder)){
    fs.mkdirSync(outFolder, {recursive:true});
}

const executeCpp= ({codeLocation})=>{
    console.log(codeLocation);
    const fileName= path.basename(codeLocation).split('.')[0]+'.out';
    const outPath=path.join(outFolder, fileName);
    return new Promise((resolve, reject)=>{
        exec( `g++ ${codeLocation} -o ${outPath} && cd ${outFolder} && ./${fileName}`, 
        (error, stdout, stderr)=>{
            if(error){
                reject(error);
            }
            else if(stderr){
                reject(stderr);
            }
            else{
                resolve(stdout);
            }
        });
    });
}
module.exports=executeCpp;