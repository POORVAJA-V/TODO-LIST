import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../reduxStore/TodoSlice';

const TodoList = ({ todo, _id }) => {
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  return (
    <motion.li
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { type: "spring", stiffness: 120 },
      }}
      className={`w-full font-titleFont font-medium px-0 py-2 mb-2 flex items-center justify-between border-b border-gray-200`}
      style={{ background: 'none', boxShadow: 'none' }}
    >
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={mark}
          onChange={() => setMark(!mark)}
          className="accent-green-500 w-5 h-5"
        />
        <span
          className={`flex-1 transition-colors duration-200 ${
            mark ? "line-through text-gray-400" : "text-white"
          }`}
        >
          {todo}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTodos(_id))}
        className="ml-4 text-xl text-gray-400 hover:text-red-500 transition-colors rounded-full p-1 hover:bg-gray-100"
        aria-label="Delete todo"
      >
        <MdDelete />
      </button>
    </motion.li>
  );
};

export default TodoList;