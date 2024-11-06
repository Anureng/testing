import './App.css';
import Password from './components/Password';
import Tree from './components/Tree';
import DATA from '../src/data'
import Input from './components/Input';

const data = [{
  name: "Anurag", value: "AN", Counrtry: ["Sidhu ", "Shab"]
},
{
  name: "India", value: "IN", Country: ["Alibhag", "Chennai"]
},
{
  name: "China", value: "CN", Country: ["Korea", "Hongkong"]
}
]

function App() {

  console.log(data);

  return (
    <div className="App">
      {/* <Password /> */}
      <Input />
      {/* <Tree DATA={DATA} /> */}
    </div>
  );
}

export default App;
