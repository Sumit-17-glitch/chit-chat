import { useEffect } from "react";

function App() {
  useEffect(() => {
    const connection = new WebSocket("ws://localhost:3000");
    
    connection.onopen = () => {
      connection.send(JSON.stringify({message:"hello"}));
    }

    connection.onmessage = (message) => {
      console.log(message.data);
    }
  }, []);

  return (
    <div>hello</div>
  )
}

export default App
