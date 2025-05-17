import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />

      <div className="mt-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-6">
          
          {/* Left Side: Image */}
          <div className="flex items-center justify-center border rounded-lg overflow-hidden h-96 bg-gray-100">
            <img
              className="object-contain h-full w-full"
              src={item?.imageUrl}
              alt={item?.title}
            />
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col justify-between space-y-4 relative">
            <div>
              <p className="text-3xl font-semibold text-green-600 mb-2">₹ {item?.price}</p>
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">{item?.category}</p>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{item?.title}</h1>
              <p className="text-gray-700">{item?.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 pt-4 border-t">
              <p><span className="font-semibold text-gray-700">Seller:</span> {item?.userName}</p>
              <p>{item?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <Sell toggleModal={toggleModalSell} status={openModalSell} />
    </div>
  );
};

export default Details;
