"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PopUpEdit from "./popUpEdit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToDo = () => {
  const [isDarkMode, setIsDarkMode] = useState("dark");

  const [inputValue, setInputValue] = useState("");

  const [checkedItems, setCheckedItems] = useState([]);

  const [data, setData] = useState([]);

  const [opened, setOpened] = useState(false);

  const [currentItemTitle, setCurrentItemTitle] = useState("");

  const [currentItemId, setCurrentItemId] = useState("");

  const createItem = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/todo/createToDo",
        { title: inputValue }
      );
    } catch (error) {
      //setError(error);
    }
  };

  const deleteAllItems = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/todo/deleteToDo"
      );
      toast.success('All items deleted successfully!', {
        position: 'bottom-right', 
        
        autoClose: 4000, 
        
      });
    } catch (error) {
      toast.error('An error occured!', {
        position: 'bottom-right', 
        
        autoClose: 4000, 
        
      });
    }
  };
  const deleteItems = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/todo/deleteToDo",
        { data: { delete_ids: checkedItems } }
      );
      toast.success('Items deleted successfully!', {
        position: 'bottom-right', 
        
        autoClose: 4000, 
        
      });
    } catch (error) {
      toast.error('An error occured!', {
        position: 'bottom-right', 
        
        autoClose: 4000, 
        
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed! Value:", inputValue);
      createItem();
      setInputValue("");
    }
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode) {
      setIsDarkMode(mode);
    }
  }, []);

  const toggleMode = () => {
    const newMode = isDarkMode === "dark" ? "light" : "dark";
    setIsDarkMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const toggleCheck = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(itemId)) {
        return prevCheckedItems.filter((id) => id !== itemId);
      } else {
        console.log("Item is checked, so uncheck it", [
          ...prevCheckedItems,
          itemId,
        ]);
        // Item is not checked, so check it
        return [...prevCheckedItems, itemId];
      }
    });
  };

  const isItemChecked = (itemId) => {
    return checkedItems.includes(itemId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo/getToDos");

        setData(response.data);
      } catch (error) {}
    };

    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 500);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(fetchDataInterval);
  }, []);

  const openPopUp = (title, id) => {
    setCurrentItemTitle(title);
    setCurrentItemId(id);
    setOpened(true);
  };

  const closePopUp = () => {
    setOpened(false);
  };

  return (
    <div
      className={`${
        isDarkMode === "dark" ? "bg-dark-image " : "bg-light-image"
      } ${isDarkMode === "dark" ? "bg-bgdark " : "bg-bglight"} h-screen `}
    >
      <div className="flex items-center justify-between  py-12 px-7 md:justify-around">
        <h1 className="text-white text-3xl font-bold tracking-widest md:text-5xl">
          TODO
        </h1>
        {isDarkMode === "dark" ? (
          <img
            onClick={toggleMode}
            className="cursor-pointer"
            src="icon-sun.svg"
            alt="Sun Icon"
          ></img>
        ) : (
          <img
            onClick={toggleMode}
            className="cursor-pointer"
            src="icon-moon.svg"
            alt="Moon Icon"
          ></img>
        )}
      </div>

      <div className="  flex justify-center relative">
        <input
          className={`h-14 w-[90%] px-4 md:w-[60%] ${
            isDarkMode === "dark" ? "bg-darkblue" : "bg-lightgrayishblue"
          } rounded-lg md:h-16`}
          type="textarea"
          placeholder="Create a new ToDo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div
        className={` mt-10 md:w-[60%]  ${
          isDarkMode === "dark" ? "bg-darkblue" : "bg-lightgrayishblue"
        } rounded-lg w-[90%] mx-auto `}
      >
        {data.map((item, index) => (
          <div
            className={`${
              isDarkMode === "dark" ? "text-white" : "text-darkgrayish"
            } p-5 text-xl border-b border-solid `}
            key={item.id}
          >
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2  ">
                <div
                  className={`${
                    isItemChecked(item.id) ? "check" : ""
                  } flex items-center   justify-center w-[30px] h-[30px] rounded-full border border-solid border-darkgrayishblue cursor-pointer`}
                  onClick={() => toggleCheck(item.id)}
                >
                  {isItemChecked(item.id) && <img src="icon-check.svg"></img>}
                </div>
                <h1
                  className={`${
                    isItemChecked(item.id) ? "line-through " : ""
                  } `}
                >
                  {" "}
                  {item.title}
                </h1>
              </div>
              {/* <p className="cursor-pointer" onClick={()=> openPopUp(item.title , item.id)} >edit</p> */}
              <img
                className="h-4 cursor-pointer"
                onClick={() => openPopUp(item.title, item.id)}
                src="pencil-solid.svg"
              ></img>
            </div>
          </div>
        ))}

        <div className="flex justify-between p-5">
          <p
            className={`${
              isDarkMode === "dark" ? "text-lightblue" : "text-darkgrayishblue"
            }`}
          >
            {data.length} items left
          </p>
          <div className="flex justify-between gap-4">
            <p
              className={`${
                isDarkMode === "dark"
                  ? "text-lightblue"
                  : "text-darkgrayishblue"
              }  ${checkedItems.length === 0 ? `cursor-none` : 'cursor-pointer'} `}
              onClick={deleteItems}
            >
              Clear items
            </p>
            <p
            
              className={`${
                isDarkMode === "dark"
                  ? "text-lightblue"
                  : "text-darkgrayishblue"
              } cursor-pointer  `}
              onClick={deleteAllItems}
            >
              Clear All
            </p>
          </div>
        </div>
        {opened && (
          <PopUpEdit
            close={closePopUp}
            value={currentItemTitle}
            id={currentItemId}
          />
        )}
      </div>
      <ToastContainer />
      <div className={`${isDarkMode === "dark" ? "text-white" : "text-black"}  absolute bottom-5 left-1/2 transform -translate-x-1/2`}>Powred By Malek Bentaher</div>
    </div>
  );
};

export default ToDo;
