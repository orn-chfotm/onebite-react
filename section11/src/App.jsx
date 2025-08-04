import "./App.css";
import { useRef, useReducer, useCallback, createContext, useMemo } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const mockData = [
   {
      id: 0,
      isDone: false,
      content: "React Study",
      date: new Date().getTime(),
   },
   {
      id: 1,
      isDone: false,
      content: "빨래하기",
      date: new Date().getTime(),
   },
   {
      id: 2,
      isDone: false,
      content: "운동가기",
      date: new Date().getTime(),
   },
];

function reducer(state, action) {
   switch (action.type) {
      case "CREATE":
         return [action.data, ...state];
      case "UPDATE":
         return state.map(todo =>
            todo.id === action.targetId
               ? { ...todo, isDone: !todo.isDone }
               : todo
         );
      case "DELETE":
         return state.filter(todo => todo.id !== action.targetId);
      default:
         return state;
   }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
   const [todos, dispatch] = useReducer(reducer, mockData);
   const idRef = useRef(3);

   const onCreate = useCallback(content => {
      dispatch({
         type: "CREATE",
         data: {
            id: idRef.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
         },
      });
   }, []);

   const onUpdate = useCallback(targetId => {
      dispatch({
         type: "UPDATE",
         targetId: targetId,
      });
   }, []);

   const onDelete = useCallback(targetId => {
      dispatch({
         type: "DELETE",
         targetId,
      });
   }, []);

   const memoizedDispatch = useMemo(() => {
      return { onCreate, onUpdate, onDelete };
   }, []);

   return (
      <div className="App">
         <Header />
         <TodoStateContext.Provider value={todos}>
            <TodoDispatchContext value={memoizedDispatch}>
               <Editor />
               <List />
            </TodoDispatchContext>
         </TodoStateContext.Provider>
      </div>
   );
}

export default App;
