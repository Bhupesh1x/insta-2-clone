import React from "react";

function Suggestions() {
  const suggestion = [
    {
      id: 1,
      name: "james12",
      occ: "works at microsoft",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtALV6HmrS30mehszlmFAz3UbADreFNYopQ&usqp=CAU",
    },
    {
      id: 2,
      name: "Pearlie.jacob95",
      occ: "works at green swift",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uOhNmWyNz36e2avplNpyIkhaWfCbzhEiwQ&usqp=CAU",
    },
    {
      id: 3,
      name: "marco.jacob12",
      occ: "works at swift green",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKFdbxoHD-dTd4B9cd5lpqXsdhijRK01Dgw&usqp=CAU",
    },
    {
      id: 4,
      name: "Ahmed56",
      occ: "works at walter",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6bHvhl2doIWMx3d9E_lRHLbAnGtRBt-uHQ&usqp=CAU",
    },
  ];

  return (
    <div className="ml-12 mt-3">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-400 font-semibold text-sm">
          Suggestions for you
        </h1>
        <p className="font-semibold text-sm">See All</p>
      </div>
      {suggestion.map((data) => (
        <div className="flex items-center justify-between mt-2" key={data.id}>
          <img
            src={data.img}
            alt=""
            className="h-10 w-10 rounded-full border border-gray-300 p-[3px]"
          />

          <div className="flex-1 mx-4">
            <p className="text-sm font-bold">{data.name}</p>
            <p className="text-xs text-gray-400">{data.occ}</p>
          </div>

          <button className="text-sm text-blue-400 font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
