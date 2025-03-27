import Button from "./Button";

export default function HowToPlay({ onClose }) {
  return (
    <div className="bg-yellow-500 p-6 rounded-lg shadow-lg w-[600px] text-center border-4 border-yellow-700">
      <h2 className="text-2xl mb-6 text-brown-900 font-serif">
        Styr din karaktär med <span className="font-bold">WASD</span> eller{" "}
        <span className="font-bold">piltangenterna</span>, ät upp kaninen och
        undvik blocken och spelplanens gränser.
        <br />
        <br />
        Krockar du är spelet över.
      </h2>

      <Button href="#" text="Stäng" onClick={onClose} />
    </div>
  );
}
