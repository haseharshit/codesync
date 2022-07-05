import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import "codemirror/keymap/sublime";
// import "codemirror/theme/monokai.css";

// const code = "const a = 0;";

export default function Editors({code,setCode}) {
  return (
    <CodeMirror
      value={code}
      options={{
        theme: "monokai",
        keyMap: "sublime",
        mode: "cpp"
      }}
      onChange={(e)=>setCode(e.target.value)}
    />
  );
}
