
import { useState } from "react";
const zones = ["Zona 1","Zona 2","Zona 3"];
const players = ["Victor Areales","Fabio Alvira","Pablo del Moral","Hugo Exposito","Zequi","Pescio","Arnaldo Baez","Aranda","Nicolas","Enzo Baez","Nacho Gomez","Titi del Rey","Murilo","Carlos Gomez"];

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [input, setInput] = useState("");

  const addLog = nombre => {
    setLogs([{ tiempo: new Date().toLocaleTimeString(), tipo, zona, jugador: nombre }, ...logs]);
    setTipo(""); setZona(""); setInput(""); setStep(0);
  };

  const exportCSV = () => {
    const header = ["Tiempo","Tipo","Zona","Jugador"].join(",");
    const rows = logs.map(e => [e.tiempo,e.tipo,e.zona,e.jugador].join(","));
    const blob = new Blob([header+"\n"+rows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `eventos_futsal_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold text-center">Registrar Evento</h2>
        {step===0 && (
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => {setTipo("Pérdida"); setStep(1);}} className="px-6 py-2 bg-red-500 text-white rounded">Pérdida</button>
            <button onClick={() => {setTipo("Recuperación"); setStep(1);}} className="px-6 py-2 bg-green-500 text-white rounded">Recuperación</button>
          </div>
        )}
        {step===1 && (
          <div className="mt-4 text-center">
            <p className="font-semibold">Selecciona la zona:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {zones.map(z => <button key={z} onClick={() => {setZona(z);setStep(2);}} className="px-4 py-2 bg-blue-500 text-white rounded">{z}</button>)}
            </div>
          </div>
        )}
        {step===2 && (
          <div className="mt-4">
            <p className="font-semibold text-center">Jugador:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {players.map(j => <button key={j} onClick={() => addLog(j)} className="px-3 py-1 bg-purple-500 text-white rounded">{j}</button>)}
            </div>
            <div className="mt-4">
              <input type="text" value={input} placeholder="Nombre manual" onChange={e => setInput(e.target.value)} className="w-full p-2 border rounded" />
              <button onClick={() => addLog(input)} disabled={!input.trim()} className="mt-2 w-full px-4 py-2 bg-indigo-500 text-white rounded disabled:bg-gray-300">Confirmar nombre</button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Historial</h2>
          <button onClick={exportCSV} className="px-3 py-1 bg-yellow-500 text-white rounded">Exportar CSV</button>
        </div>
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {logs.map((e,i)=><li key={i} className="p-2 border rounded"><strong>{e.tiempo}</strong>: {e.tipo} — <em>{e.zona}</em> — {e.jugador}</li>)}
        </ul>
      </div>
    </div>
  );
}
