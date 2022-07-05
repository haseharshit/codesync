
import { useState } from 'react';
import './App.css';
import axios from "axios"
import Editor from './Editor/Editor';
function App() {
  const [code, setCode]= useState('');
  const [result, setResult]= useState('');
  
  const handleSubmit = async()=>{
    const payload={
      code,
      language: "c++"
    }
    try{
      const output= await axios.post("http://localhost:5500/code", payload);
      setResult(output.data.output);
      console.log(code);

    }
    catch(err){
      // console.log("doing error");
      console.log(err.response.data);
      // setResult(err.response.data);
      setResult("Error!!");
    }
  }
  
  return (
    <div className="App">
      <h1>Compiler</h1>
      <h2>Language Supported: c++</h2>
      
      <Editor setCode={setCode} />
      

      <br></br>
      <button onClick={handleSubmit}>Run</button>
     <p>
      {result}
     </p>
    </div>
  );
}

export default App;
