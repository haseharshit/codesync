
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from "axios"
// import Editor from './Editor/Editor';
import CodeMirror from "@uiw/react-codemirror";
import { initSocket } from './socket';





function App() {
  const [code, setCode]= useState('');
  const [result, setResult]= useState('');
  const socketRef= useRef(null);
  useEffect(()=>{
    const init = async ()=>{
      socketRef.current= await initSocket();

      // socketRef.current.emit('join', {
      //   //data can be sent on Join
      // });
      socketRef.current.on('connect_error', (err)=>alert("Something Went Wrong"));
      socketRef.current.on("connect_failed", (err)=>alert("Something went Wrong!"))
      socketRef.current.on('code sync',(msg)=>{
        console.log("Code, recieved: ", msg);
        setCode(msg);
      })
      socketRef.current.on('code change',(CODE)=>{
        console.log("Code, recieved: ", CODE);

        setCode(CODE);
      })
      
    }
    init();
  },[])

  const onChange=  (value)=>{
    console.log(value);
     socketRef.current.emit('code change', value);
    setCode(value);
  }
  
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
      <h1 >Compiler</h1>
      <h2>Language Supported: c++</h2>
      
      {/* <Editor setCode={setCode} /> */}
      <div style={{textAlign: "left"}}>
        <CodeMirror
          value={code}
          height="200px"
          theme="dark"
        //   extensions={[javascript({ jsx: true })]}
         
          onChange={onChange}
        />

      </div>

      <br></br>
      <button onClick={handleSubmit}>Run</button>
     <p>
      {result}
     </p>
    </div>
  );
}

export default App;
