import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import Input from "../Input/Input";
import { UserAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFirestore, fireStore } from "../Firebase/Firebase";
import fileUpload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from "../../assets/close.svg";
import { toast } from 'react-toastify';



const Sell = (props) => {
  const { toggmodalSell, status, setItems } = props;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user } = UserAuth();

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Handle close
  const handleCloseClick = (e) => {
    e.stopPropagation();
    toggmodalSell();
  };

  const handleImageUpload = (event) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!user) {
      toast.warn("Please login to continue");
      return;
    }

    setSubmitting(true);

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedTitle ||
      !trimmedCategory ||
      !trimmedPrice ||
      !trimmedDescription
    ) {
      setError("All fields are required");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      const cloudName = "dwe66cwnj";
      const uploadPreset = "olx products";

      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();


      const docRef = await addDoc(collection(fireStore, "products"), {
        title: trimmedTitle,
        category: trimmedCategory,
        price: parseFloat(trimmedPrice),
        description: trimmedDescription,
        imageUrl: data.secure_url,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        createdAt: new Date().toISOString(),
      });

      console.log("Document written with ID:", docRef.id);

    
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);

     
      try {
        const datas = await fetchFromFirestore();
        if (typeof setItems === "function") {
          setItems(datas);
        }
      } catch (fetchError) {
        console.error("Error fetching updated items:", fetchError);
      }
      toast.success("Item listed successfully!");

      toggmodalSell();
    } catch (error) {
      console.error("Firestore error:", error);
      setError("Failed to add item to the database. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
        onClick={toggmodalSell}
        show={status}
        className="bg-black"
        position={"center"}
        size="md"
        popup={true}
      >
        <ModalBody
          className="bg-white h-96 p-0 rounded-md"
          onClick={stopPropagation}
        >
          <img
            onClick={handleCloseClick}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt="Close"
          />

          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">Sell Item</p>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input setInput={setTitle} placeholder="Title" value={title} />
              <Input
                setInput={setCategory}
                placeholder="Category"
                value={category}
              />
              <Input setInput={setPrice} placeholder="Price" value={price} />
              <Input
                setInput={setDescription}
                placeholder="Description"
                value={description}
              />

              <div className="pt-2 w-full relative">
                {image ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt="Product"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
                      accept="image/*"
                    />

                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="Upload" />
                      <p className="text-center text-sm pt-2">
                        Click to upload images
                      </p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img
                    className="w-32 object-cover"
                    src={loading}
                    alt="Loading"
                  />
                </div>
              ) : (
                <div className="w-full pt-4">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-lg text-white"
                    style={{ backgroundColor: "#002f34" }}
                  >
                    Sell Item
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;
