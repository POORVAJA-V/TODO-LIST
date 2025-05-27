import React from "react";
import { useSelector } from "react-redux";
import Category from "./components/category/Category";
import Footer from "./components/Footer";
import InputForm from "./components/InputForm";

function App() {
  const todosItem = useSelector((state) => state.todos.todosList);
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-start py-10 px-2">
      <header className="mb-4 text-center">
        <h1 className="text-3xl text-black-700 font-bold mt-0">Stay Organized and Productive!</h1>
      </header>
      <main className="w-full h-50 max-w-2xl bg-white/90 rounded-xl shadow-lg p-5 flex flex-col gap-5">
        <InputForm />
        {todosItem.length > 0 ? (
          <div className="mb-4">
            <Category />
          </div>
        ) : (
          <div className="text-center text-gray-900 font-medium mt-8">
            No todos yet. Add your first task!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
