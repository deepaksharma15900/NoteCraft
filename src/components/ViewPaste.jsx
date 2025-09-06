import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">⚠️ Paste not found.</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{paste.title}</h1>

      {/* Content */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 overflow-auto h-96">
        <pre className="whitespace-pre-wrap break-words text-gray-700">
          {paste.content}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Created at: {new Date(paste.createdAt).toLocaleString()}
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
