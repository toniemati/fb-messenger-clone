import { Button, FormControl, InputLabel, Input, IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Message from './components/Message/Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  //* Getting all messages from firebase
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })));
      });
  }, []);

  //* Set username
  useEffect(() => {
    setUsername(prompt('Please enter your name 👦') || 'Unknown');
  }, [])

  //* All the logic to send a message goes
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    db.collection('messages').add({
      text: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt="messenger logo" />
      <h1>fb-msg-clone 💙🔥</h1>
      <h2>Welcome { username }</h2>

      <form onSubmit={sendMessage} className="app__form">
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton disabled={!input.trim()} variant="contained" color="primary" type="submit">
            <SendRoundedIcon color="primary" />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove className="messages">
        {
          messages.map((message) => (
            <Message key={message.id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
