import { Search } from "lucide-react";
export default function Form() {
  return (
    <div className="border rounded-4xl shadow-lg bg-white focus-within:bg-stone-100">
      <form className="flex flex-row items-center pr-2">
        <Input
          type="text"
          label="Destination"
          placeholder="Choose your destination"
        />
        <Input type="date" label="Check-in" />
        <Input type="date" label="Check-out" />
        <Input type="number" label="Guests" placeholder="0" classes="w-24" />
        <button className="bg-rose-500 rounded-full w-12 h-12 flex items-center justify-center text-xl text-white hover:bg-red-500 hover:scale-102 transition-all duration-200 mx-4">
          <Search />
        </button>
      </form>
    </div>
  );
}

function Input({ type = "text", label = "", placeholder = "", classes = "" }) {
  return (
    <label
      className={`${classes} rounded-4xl px-8 py-4 
        hover:bg-stone-100 
        focus-within:bg-white 
        focus-within:shadow-xl 
        focus-within:hover:bg-white
        transition-all duration-200
        focus-within:border-1 focus-within:border-red-400
      `}
    >
      <span className="text-xs font-medium">{label}</span>
      <div className="flex flex-col">
        <input
          placeholder={placeholder}
          type={type}
          className="focus:outline-none text-md bg-transparent"
        />
      </div>
    </label>
  );
}
