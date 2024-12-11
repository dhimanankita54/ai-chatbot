import './App.css';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center flex-col gap-10">
      <h1 className='font-bold text-white text-4xl mt-10 font-roboto'>React Chatbot</h1>
      <Chatbot />
    </div>
  );
}

export default App;
