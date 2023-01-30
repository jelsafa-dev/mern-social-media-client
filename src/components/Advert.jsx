import React from "react";

const Advert = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-4 lg:px-6 lg:py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div className="flex justify-between">
        <h5 className="font-medium text-lg">Sponsored</h5>
        <span className="text-gray-400 md:hidden">Create Ad</span>
      </div>
      <img
        className="rounded-lg my-3 max-h-60 lg:max-h-80 w-full object-cover"
        src="http://localhost:3001/assets/info1.jpeg"
      />
      <div className="flex justify-between flex-col lg:flex-row">
        <h5 className="font-medium">MikaCosmetics</h5>
        <span className="text-gray-400">mikacosmetics.com</span>
      </div>
      <p className="my-2 text-gray-400 hidden lg:block">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </div>
  );
};

export default Advert;
