import { useState } from "react";

const App = () => {
  const [ text, setText] = useState('')
  // console.log(text);
  const [ response, setResponse] = useState('')

  const getCompletion = async() => {
      const response = await fetch('http://localhost:8000/completion', {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //from server.js res.send(completion.choices[0])//send response to frontend!
      //this data is the Object{message.content}
      const data = await response.json()
      console.log(data);
      setResponse(data.message.content)
  }

  return (
    <div >
      <h1>Hello! How can I help you?</h1>
      <input onChange={e => setText(e.target.value)}/>
      <button onClick={getCompletion}>Enter</button>
      <p>AI: {response}</p>
    </div>
  );
}

export default App;
