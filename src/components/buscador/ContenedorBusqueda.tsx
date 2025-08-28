import React from "react";
import { Box, Typography } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import SelectorPestanas from "./contenedorBusqueda/pestanias/SelectorPestanas";
import SearchInputs from "./contenedorBusqueda/camposBusqueda/SearchFields";
import BotonBusqueda from "./boton/BotonBusqueda";

const ContenedorBusqueda: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Cargando datos de la agencia...</Typography>;
  }

  // 🎯 Fallbacks desde Buscador -> Generales
  const fontFamily = buscador?.tipografia || datosGenerales.tipografiaAgencia || "Arial, sans-serif";
  const textColor = buscador?.tipografiaColor || datosGenerales.colorTipografiaAgencia || "#000";

  // Fondo del contenedor = inputFondoColor ≡ Secundario
  const fondoColor = buscador?.color.secundario ||
                    buscador?.color?.secundario ||
                    datosGenerales.color?.secundario ||
                    "#FFFFFF";

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        backgroundColor: fondoColor,
        color: textColor,
        fontFamily,
        borderRadius: { xs: '20px', sm: '35px' },
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        border: '1px solid transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 4 },
        pb: { xs: 5, sm: 6 },
        minHeight: '125px',
        margin: '0 auto',
      }}
    >
      {/* Selector de Pestañas */}
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4
      }}>
        <SelectorPestanas />
      </Box>

      {/* Sección de Inputs */}
      <Box sx={{ width: '100%' }}>
        <SearchInputs />
      </Box>

      {/* Botón de Búsqueda */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          zIndex: 5,
        }}
      >
        <BotonBusqueda />
      </Box>
    </Box>
  );
};

export default ContenedorBusqueda;
