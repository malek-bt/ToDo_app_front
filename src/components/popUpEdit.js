import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PopUpEdit = ({close , value , id}) => {
   const [editValue , setEditValue] = useState(value)
   
   
   const updateItem = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/todo/updateToDo/${id}`,{title:editValue}); 
        close()
        toast.success('Item updated successfully!', {
          position: 'bottom-right', 
          autoClose: 4000, 
          
        });
       
      } catch (error) {
        toastast.error('An error occured!', {
          position: 'bottom-right', 
          autoClose: 4000, 
          
        });
      }
    };
  
   return (
    <div className="absolute top-1/4  z-50 bg-darkgrayishblue w-[90%] md:w-[50%] h-36 rounded-lg p-4 ">
       <input
          className={`h-14 w-[100%]  px-4 
            bg-lightgrayishblue
           rounded-lg `}
          type="textarea"
          placeholder="Create a new ToDo..."
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          //onKeyDown={handleKeyPress}
        />
        <div className="flex gap-2 mt-2  justify-end">
        
        <button className="bg-darkblue rounded-xl p-2 text-lightgrayishblue hover:scale-105" onClick={close}>Cancel</button>
        <button className="bg-darkblue rounded-xl p-2 text-lightgrayishblue hover:scale-105" onClick={updateItem}> Save</button>
        </div>
    </div>
   )
}

export default PopUpEdit