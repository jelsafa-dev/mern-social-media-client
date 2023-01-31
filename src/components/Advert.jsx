import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Advert = () => {
  const [advert, setAdvert] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getAdvert = async () => {
    const response = await fetch(`http://localhost:3001/adverts/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAdvert(data);
  };

  useEffect(() => {
    getAdvert();
  }, []);

  if (!advert) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-4 lg:px-6 lg:py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div className="flex justify-between">
        <h5 className="font-medium text-lg">Sponsored</h5>
        <span className="text-gray-500 hover:text-gray-400 hidden lg:block cursor-pointer">
          Create Ad
        </span>
      </div>
      <img
        className="rounded-lg my-3 max-h-60 lg:max-h-80 w-full object-cover"
        src={`http://localhost:3001/assets/${advert.picturePath}`}
      />
      <div className="flex flex-col gap-2">
        <h5 className="font-medium text-base">{advert.title}</h5>
        <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
          {advert.website}
        </span>
      </div>
      <p className="my-2 text-gray-400 hidden lg:block">{advert.description}</p>
    </div>
  );
};

export default Advert;
