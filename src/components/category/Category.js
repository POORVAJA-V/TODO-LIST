import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import TodoList from '../TodoList';

const categories = [
  { key: 'personal', label: 'Personal' },
  { key: 'business', label: 'Business' },
  { key: 'education', label: 'Education' },
  { key: 'others', label: 'Others' },
];

const Category = () => {
  const todosItem = useSelector((state) => state.todos.todosList);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (activeCategory) {
      setFilteredTodos(todosItem.filter(item => item.category === activeCategory));
    } else {
      setFilteredTodos([]);
    }
  }, [todosItem, activeCategory]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-bodyColor rounded-lg shadow p-4 sm:p-6 md:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-4 gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-2 rounded transition 
              ${activeCategory === cat.key ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}
              font-semibold text-sm sm:text-base`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div>
        {!activeCategory && (
          <p className="text-center text-base font-titleFont font-semibold tracking-wider text-green-500">
            Click on a tab to choose your todos category
          </p>
        )}
        {activeCategory && (
          <ul className="flex flex-col items-center gap-2 px-1 sm:px-2 max-h-[60vh] overflow-y-auto">
            {filteredTodos.length > 0 ? (
              filteredTodos.map(item => (
                <TodoList key={item._id} todo={item.todo} _id={item._id} />
              ))
            ) : (
              <motion.li
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-base sm:text-lg flex justify-center items-center text-red-500 text-center font-semibold"
              >
                {categories.find(c => c.key === activeCategory).label} todo list is empty!
              </motion.li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Category;
