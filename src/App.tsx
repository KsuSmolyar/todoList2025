import "./App.css"
import { Header } from './components/Header/Header'
import "./styles/vars.css"
import "./styles/palette.css"
import { TodoList } from "./components/TodoList"
import "react-datepicker/dist/react-datepicker.css";
import { TodoListContextProvider } from "./store/todoList/provider"

function App() {
  
  return (
    <>
      <Header/>
      <main className={"main"}>
        <TodoListContextProvider>
          <TodoList />
        </TodoListContextProvider>
      </main>
    </>
   
  )
}

export default App
