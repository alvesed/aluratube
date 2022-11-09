import React from "react";

export const ColorModeContext = React.createContext({
  mode: "",
  setMode: () => { alert("Você precisa me configurar") },
  toggleMode: () => { alert("Você precisa me configurar") }
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
      if (mode === "dark") setMode("light");
      if (mode === "light") setMode("dark");
    }

    return (
      // Entender pq esta ignorado?
      <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
        {props.children}
      </ColorModeContext.Provider>
    )
}