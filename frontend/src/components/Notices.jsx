// src/components/Notices.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../store/slices/noticeSlice";

const Notices = () => {
  const dispatch = useDispatch();
  const { notices, loading, error } = useSelector((state) => state.notice);

  useEffect(() => {
     const initialTimeout = setTimeout(() => {
      dispatch(fetchNotices());

      // After first fetch, start polling every 30 seconds
      const interval = setInterval(() => {
        dispatch(fetchNotices());
      }, 30000);

      // Store interval ID to clean up later
      return () => clearInterval(interval);
    }, 30000);

    // Cleanup initial timeout as well
    return () => clearTimeout(initialTimeout);
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notices?.map((notice, index) => (
        <a
          key={index}
          href={notice.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl hover:bg-blue-50"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-700">{notice.message}</h3>
          <p className="text-sm text-gray-500 break-all">{notice.url}</p>
        </a>
      ))}
    </div>
  );
};

export default Notices;
