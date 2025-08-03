const Controller = ({ onClickButtons }) => {
   return (
      <div>
         <button
            onClick={() => {
               onClickButtons(-1);
            }}
         >
            -1
         </button>
         <button
            onClick={() => {
               onClickButtons(-10);
            }}
         >
            -10
         </button>
         <button
            onClick={() => {
               onClickButtons(-100);
            }}
         >
            -100
         </button>
         <button
            onClick={() => {
               onClickButtons(100);
            }}
         >
            +100
         </button>
         <button
            onClick={() => {
               onClickButtons(10);
            }}
         >
            +10
         </button>
         <button
            onClick={() => {
               onClickButtons(1);
            }}
         >
            +1
         </button>
      </div>
   );
};

export default Controller;
