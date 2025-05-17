import React from "react";
import { Link } from "react-router-dom";

function Card({ items = [], loading = false }) {
  if (loading) {
    return (
      <div className="p-6 sm:p-12 mt-24 min-h-screen bg-gray-50">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="w-full h-96 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-56 w-full bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-6 w-4/5 rounded bg-gray-200" />
                <div className="h-4 w-3/5 rounded bg-gray-200" />
                <div className="h-4 w-2/5 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-12 flex justify-center items-center min-h-[70vh] bg-gray-50">
        <p className="text-2xl font-medium text-gray-500 tracking-wide">
          No items found. Be the first to sell something!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-12 min-h-screen bg-gray-50">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <Link to="/Details"  state={{item}} key={item.id} style={{borderWidth: '1px'}}>
            <div
              key={item.id}
              className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              <div className="h-56 w-full bg-gray-100 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <p className="text-gray-400 font-medium">No image</p>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h1 className="font-bold text-2xl text-teal-800 tracking-tight">
                  ₹ {item.price}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                  {item.category}
                </p>
                <p className="mt-2 font-semibold text-gray-800 text-lg line-clamp-1">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
