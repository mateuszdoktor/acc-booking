import { Search } from "lucide-react";
export default function Form() {
  return (
    <div className="p-4 mt-12 bg-white border border-orange-400 rounded-3xl shadow-md">
      <form className="flex flex-row gap-8">
        <Input
          type="text"
          label="Destination"
          placeholder="Choose your destination"
          classes="border-r-2 border-stone-300 pr-4"
        />
        <Input
          type="date"
          label="Check-in"
          classes="border-r-2 border-stone-300 pr-4"
        />
        <Input
          type="date"
          label="Check-out"
          classes="border-r-2 border-stone-300 pr-4"
        />
        <Input type="number" label="Guests" placeholder="0" classes="w-8" />
        <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-700 rounded-full w-12 h-12 items-center justify-center flex text-xl text-white hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-gradient-to-r hover:from-yellow-500 hover:via-orange-500 hover:to-pink-800">
          <Search />
        </button>
      </form>
    </div>
  );
}

function Input({ type = "text", label = "", placeholder = "", classes = "" }) {
  return (
    <div className={`flex flex-col ${classes}`}>
      <label className="text-sm font-semibold">{label}</label>
      <input placeholder={placeholder} type={type}></input>
    </div>
  );
}
