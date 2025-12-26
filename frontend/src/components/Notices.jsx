import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../store/slices/noticeSlice";

const Notices = () => {
  const dispatch = useDispatch();
  const { notices, loading, error } = useSelector((state) => state.notice);

  useEffect(() => {
    // Immediately fetch on mount
    dispatch(fetchNotices());

    // Set up 30-second polling
    const interval = setInterval(() => {
      dispatch(fetchNotices());
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    
    <div className="p-4">
      <button
        onClick={() => dispatch(fetchNotices())}
        className="mx-auto mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 block"
      >
        Refresh Notices
      </button>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notices?.map((notice, index) => (
          <a
            key={index}
            href={notice.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl hover:bg-blue-50"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-700">
              {notice.message}
            </h3>
            <p className="text-sm text-gray-500 break-all">{notice.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Notices;
