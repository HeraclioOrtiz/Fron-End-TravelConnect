import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormulario } from "../contextos/formulario/FormularioContext";
import type { PaqueteData } from "../interfaces/PaqueteData";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://travelconnect.com.ar";

export const useBusqueda = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    ciudadOrigen,
    destino,
    fechaSalida,
    viajeros, // { adultos, menores }
    resetFormulario,
  } = useFormulario();

  const guardarValoresPrevios = () => {
    localStorage.setItem(
      "valoresPrevios",
      JSON.stringify({
        ciudadOrigen,
        destino,
        fechaSalida,
        viajeros,
      })
    );
  };

  const handleClick = async () => {
    setLoading(true);

    const payload = {
      ciudadOrigen: ciudadOrigen ?? "",
      destino: destino ?? "",
      fechaSalida: fechaSalida ? fechaSalida.toISOString() : null,
      viajeros, // { adultos, menores }
    };

    console.log("📤 Enviando solicitud con los siguientes datos:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/paquetes2/filtrar2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        
      });

      let paquetes: PaqueteData[] = [];

      if (response.status === 404) {
        console.warn("⚠️ No se encontraron paquetes para la búsqueda.");
        paquetes = [];
      } else if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      } else {
        paquetes = (await response.json()) as PaqueteData[];
      }

      console.log("📦 Paquetes recibidos:", paquetes);

      localStorage.setItem("resultadosBusqueda", JSON.stringify(paquetes));
      guardarValoresPrevios();
      resetFormulario();
      window.dispatchEvent(new Event("actualizarPaquetes"));
      navigate("/paquetes-busqueda");
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      alert("Hubo un error en la búsqueda. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleClick };
};
