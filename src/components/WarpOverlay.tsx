import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  color: string;
}

const colors = ["#6366F1", "#F97316", "#10B981", "#EC4899", "#3B82F6"];

const WarpOverlay = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [input, setInput] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setTodo([...todo, newTodo]);
    setInput("");
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const confirmDelete = () => {
    if (selected.length > 0) {
      setShowOverlay(true);
    }
  };

  const handleDelete = () => {
    setTodo(todo.filter((t) => !selected.includes(t.id)));
    setSelected([]);
    setShowOverlay(false);
  };

  const cancelDelete = () => {
    setShowOverlay(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Ripple Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <>
            <motion.div
  initial={{ scale: 0, opacity: 1 }}
  animate={{ scale: 15, opacity: 1 }}
  exit={{ scale: 0, opacity: 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="absolute w-80 h-80 rounded-full z-50 overflow-hidden shadow-xl"
  style={{
    bottom: "0%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(to bottom right, #fca5a5, #ef4444, #b91c1c)"
  }}
>
  {/* Grain Layer */}
  <div
    className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage:
        "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')",
      backgroundSize: "50px 50px",
      backgroundRepeat: "repeat",
    }}
  />
</motion.div>


           
             
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-20 z-50 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-lg font-semibold mb-4">
                Delete {selected.length} task
                {selected.length > 1 ? "s" : ""}?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg shadow"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="w-96 relative z-10">
        {/* Input Box */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition-all"
          >
            ➕
          </button>
          {selected.length > 0 && (
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all"
            >
              🗑
            </button>
          )}
        </div>

        {/* Todo List */}
        <AnimatePresence>
          {todo.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleSelect(t.id)}
              className={`relative p-4 mb-3 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg cursor-pointer overflow-hidden group border ${
                selected.includes(t.id)
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            >
              {/* Color bar */}
              <motion.span
                className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
                style={{ backgroundColor: t.color }}
                layoutId={`bar-${t.id}`}
              />

              {/* Todo text */}
              <p className="text-lg tracking-wide">{t.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WarpOverlay;
