import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

const mockDate = [
   {
      id: 1,
      createdDate: new Date().getTime(),
      emotionId: 1,
      content: "1번 일기 내용",
   },
   {
      id: 2,
      createdDate: new Date().getTime(),
      emotionId: 2,
      content: "2번 일기 내용",
   },
];

function reducer(state, action) {
   switch (action.type) {
      case "CREATE":
         return [action.data, ...state];
      case "UPDATE":
         return state.map(item =>
            String(item.id) === String(action.data.id) ? action.data : item
         );
      case "DELETE":
         return state.filter(
            item => String(item.id) !== String(action.data.id)
         );
      default:
         return state;
   }
}

const DiaryStateContext = createContext();
const DiaryDispatchContent = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
   const [data, dispatch] = useReducer(reducer, mockDate);
   const idRef = useRef(3);

   // 새로운 일기 추가
   const onCreate = (createDate, emotionId, content) => {
      dispatch({
         type: "CREATE",
         data: {
            id: idRef.current++,
            createDate,
            emotionId,
            content,
         },
      });
   };

   // 기존 일기 수정
   const onUpdate = (id, createDate, emotionId, content) => {
      dispatch({
         type: "UPDATE",
         data: {
            id,
            createDate,
            emotionId,
            content,
         },
      });
   };

   // 기존 일기 삭제
   const onDelete = id => {
      dispatch({
         type: "DELETE",
         data: {
            id,
         },
      });
   };

   return (
      <>
         <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContent.Provider
               value={{ onCreate, onUpdate, onDelete }}
            >
               <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/new" element={<New />}></Route>
                  <Route path="/diary/:id" element={<Diary />}></Route>
                  <Route path="/edit/:id" element={<Edit />}></Route>
                  <Route path="*" element={<Notfound />}></Route>
               </Routes>
            </DiaryDispatchContent.Provider>
         </DiaryStateContext.Provider>
      </>
   );
}

export default App;
