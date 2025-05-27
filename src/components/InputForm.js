import React, { useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, removeTodos } from '../reduxStore/TodoSlice';
import { motion, AnimatePresence } from 'framer-motion';
import ErrMsg from './msg/ErrMsg';
import SuccessMsg from './msg/SuccessMsg';
import TodoList from './TodoList';

const InputForm = () => {
  const dispatch = useDispatch();
  const todosItem = useSelector((state) => state.todos.todosList);
  const [todoValue, setTodoValue] = useState("");
  const [category, setCategory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const options = [
    { _id: 1000, title: "categories" },
    { _id: 1001, title: "personal" },
    { _id: 1002, title: "business" },
    { _id: 1003, title: "education" },
    { _id: 1004, title: "others" },
  ];

  const handleTodo = (e) => {
    e.preventDefault();
    if (todoValue === "") {
      setErrMsg("Please write your todo!");
      setShowErr(true);
      setShowSuccess(false);
    } else if (category === "") {
      setErrMsg("Select a category!");
      setShowErr(true);
      setShowSuccess(false);
    } else if (category === "categories") {
      setErrMsg("Select a valid Category!");
      setShowErr(true);
      setShowSuccess(false);
    } else {
      dispatch(
        addTodos({
          _id: Math.random(),
          todo: todoValue,
          category: category,
        })
      );
      setTodoValue("");
      setShowSuccess(true);
      setShowErr(false);
      setSuccessMsg("Todo added Successfully!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showErr && setShowErr(false);
      showSuccess && setShowSuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showErr, showSuccess]);

  // Calculate if scroll is needed
  const isScrollable = todosItem.length > 4;

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col gap-6 p-6 rounded-xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col mdl:flex-row items-center gap-4 mdl:h-14"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          className="w-full mdl:w-[70%] h-14 mdl:h-full bg-gray-800 border-2 border-gray-600 py-3 px-5 placeholder:text-gray-400 text-white text-lg rounded-lg outline-none focus:border-blue-500 hover:border-blue-400 transition-all duration-300 shadow-lg"
          type="text"
          placeholder="Enter your Todo..."
          whileFocus={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(89, 60, 251)" }}
        />
        <motion.div
          className="w-full mdl:w-[30%] h-14 mdl:h-full relative"
          whileHover={{ scale: 1.03 }}
        >
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full text-center capitalize outline-none bg-gray-800 border-2 border-gray-600 px-2 cursor-pointer appearance-none rounded-lg focus:border-blue-500 hover:border-blue-400 transition-all duration-300 text-white"
          >
            {options.map((item) => (
              <option key={item._id}>{item.title}</option>
            ))}
          </select>
          <span className="absolute right-4 top-5 text-blue-400 pointer-events-none">
            <FaChevronDown />
          </span>
        </motion.div>
      </motion.div>
      <motion.button
        onClick={handleTodo}
        className="w-full border-2 border-blue-500 hover:border-blue-400 duration-300 font-titleFont font-bold tracking-wider text-white hover:text-blue-500 h-12 uppercase rounded-lg bg-gradient-to-r from-blue-500/20 to-transparent shadow-md hover:scale-105 active:scale-95 transition-all"
        whileHover={{ scale: 1.04, backgroundColor: "rgba(89, 60, 251, 0.81) text-white" }}
        whileTap={{ scale: 0.97 }}
      >
        Add Todo
      </motion.button>
      <div className="flex flex-col gap-4">
        <ul
          className={`grid grid-cols-1 gap-4 border border-gray-700 shadow-lg mt-6 p-4 rounded-xl bg-gray-900/80 transition-all duration-300 ${
            isScrollable ? "max-h-80 overflow-y-auto" : ""
          }`}
          style={isScrollable ? { scrollbarWidth: "none", msOverflowStyle: "none" } : {}}
        >
          <style>
            {isScrollable
              ? `
                ul::-webkit-scrollbar {
                  display: none;
                }
              `
              : ""}
          </style>
          <AnimatePresence>
            {todosItem.length > 0 ? (
              todosItem.map((item, idx) => (
                <motion.li
                  key={item._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="list-none"
                >
                  <TodoList todo={item.todo} _id={item._id} />
                </motion.li>
              ))
            ) : (
              <motion.p
                className="text-center text-base text-yellow-400 font-titleFont font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Your todo list is Empty!
              </motion.p>
            )}
          </AnimatePresence>
        </ul>
        {todosItem.length > 0 && (
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowRemove(true)}
            className="w-44 h-10 text-base font-titleFont text-blue-400 hover:text-red-500 font-semibold mx-auto bg-transparent border-2 border-gray-600 hover:border-red-500 duration-300 rounded-lg shadow hover:scale-105 transition-all"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            Remove Todos
          </motion.button>
        )}
      </div>
      {/* ========================= Error Message start here ======================== */}
      <AnimatePresence>
        {showErr && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ErrMsg errMsg={errMsg} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ========================= Success Message start here ====================== */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SuccessMsg successMsg={successMsg} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ========================= Remove Modal ======================== */}
      <AnimatePresence>
        {showRemove && (
          <motion.div
            className="w-full h-screen fixed bg-black bg-opacity-60 top-0 left-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="px-10 py-8 bg-gray-900 border-2 border-red-500 rounded-2xl z-50 flex flex-col gap-6 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl text-center font-medium text-red-500">
                Are you sure to{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                  remove
                </span>{" "}
                all the todos?
              </p>
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  onClick={() => {
                    dispatch(removeTodos());
                    setShowRemove(false);
                  }}
                  className="px-8 py-2 text-lg font-titleFont text-orange-400 hover:text-red-500 font-semibold bg-transparent border-2 border-gray-600 hover:border-red-500 duration-300 rounded-lg shadow"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Yes
                </motion.button>
                <motion.button
                  onClick={() => setShowRemove(false)}
                  className="px-8 py-2 text-lg font-titleFont text-orange-400 hover:text-green-400 font-semibold bg-transparent border-2 border-gray-600 hover:border-green-500 duration-300 rounded-lg shadow"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InputForm;