import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const copyLink = (paste) => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="🔍 Search pastes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Paste Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition bg-white flex flex-col justify-between"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {paste.title}
              </h2>

              {/* Content Preview */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {paste.content}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center mt-auto">
                <NavLink
                  to={`/?pasteId=${paste._id}`}
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </NavLink>
                <NavLink
                  to={`/pastes/${paste._id}`}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View
                </NavLink>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!");
                  }}
                  className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => copyLink(paste)}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Share
                </button>
              </div>

              {/* Footer (CreatedAt) */}
              <div className="mt-4 text-xs text-gray-400 text-right">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pastes;
