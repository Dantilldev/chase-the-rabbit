import { ImCoinDollar } from "react-icons/im";

export default function Character1({ name, cost }) {
  return (
    <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      <div
        className={`w-[20px] h-[20px] bg-green-400 absolute  transition-all ease-out duration-150 top-[100px] right-[100px]`}
      >
        <div className="bg-red-500 w-[2px] h-[6px] bottom-0 left-0 absolute"></div>
        <div className="bg-red-500 w-[2px] h-[6px] top-0 left-0 absolute"></div>

        <div
          className="absolute bottom-2 left-2 bg-transparent"
          style={{
            width: "16px",
            height: "8px",
            borderTop: "2px solid red", // Mouth border
            borderRadius: "0 0 8px 8px", // Make it look like a smiling mouth
            transform: "rotate(180deg)", // Flip the mouth to face downwards
          }}
        />
      </div>

      <p className="text-white font-bold absolute bottom-0 left-0 p-2">
        {name}
      </p>

      <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex items-center gap-2">
        {cost} <ImCoinDollar className="text-amber-300" />
      </p>
    </div>
  );
}
