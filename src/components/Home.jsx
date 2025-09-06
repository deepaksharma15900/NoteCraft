import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [parameter, setParameter] = useSearchParams();
  const pasteId = parameter.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const newPaste = pastes.find((paste) => paste._id === pasteId);
      if (newPaste) {
        setTitle(newPaste.title);
        setValue(newPaste.content);
      }
           
    }
  }, [pasteId]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      setError("⚠️ Both Title and Content are required!");
      return;
    }
    setError(""); // clear error if valid

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setParameter({});
  }

  return (
    <div className="flex flex-col max-w-auto mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-8">
      
      {/* Title Input + Button */}
      <div className="flex items-center space-x-4">
        <input
          className={`flex-1 border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            error && !title.trim()
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          type="text"
          name="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          className={`w-full h-64 border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none ${
            error && !value.trim()
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          name="value"
          placeholder="Enter your code/content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default Home
