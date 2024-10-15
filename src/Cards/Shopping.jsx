import shopping from "../utils/Shopping/Shopping.jsx"
import { useRef } from "react";

const Shopping = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div className="relative flex items-center justify-between">
      <button
        className="absolute left-0 z-10 p-2 bg-black text-white rounded-full"
        onClick={scrollLeft}
      >
        &lt;
      </button>

      <div
        ref={scrollRef}
        className={`flex overflow-x-auto ml-0 md:ml-10 scroll-smooth w-full md:w-[93%] mr-0 md:mr-8 snap-x snap-mandatory hide-scrollbar relative`}
      >
        {shopping.map((place, index) => (
          <div
            key={index}
            className="flex-none w-[430px] h-72 my-2 mx-2 snap-start shadow-md bg-cover bg-center flex flex-col" 
            style={{ backgroundImage: `url(${place.image})` }}
          >
            <p className="w-full items-center bg-opacity-75 my-5 mx-3 text-white text-2xl font-extrabold">
              {place.name}
            </p>
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 z-10 p-2 bg-black text-white rounded-full"
        onClick={scrollRight}
      >
        &gt;
      </button>
    </div>
  );
};

export default Shopping;
