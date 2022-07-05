const router= require("express").Router();
const createFile =require("./createFile") ;
const  runCpp = require("./runCodes/runcpp");
router.post("/code", async(req, res)=>{
    const {language, code}= req.body;
    if(!code){
        res.status(400).json({message: "Do Some Code Dude!"});
    }
    var map={};
    map["c++"]="cpp";
    map["c"]="c";
    const format= map[language];
    const codeLocation=await createFile({format, code});
    try{
        const output= await runCpp({codeLocation});
        res.send({codeLocation, output});
    }
    catch(error){
        res.status(500).json({codeLocation, error});
        
    }
    
})
module.exports=router;