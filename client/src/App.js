import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';
function App() {
  return (
    <div>
      <div className='container' style={{maxWidth: "800px"}}>
        <InputTodo />
        <ListTodo />
      </div>
    </div>
  );
}

export default App;
