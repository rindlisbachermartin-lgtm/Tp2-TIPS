import { useState, useEffect } from "react";

function App() {
  // 1. Datos base de la aplicación
  const listaDeTips = [
    {
      texto: "Usa la técnica Pomodoro (25 min trabajo / 5 min descanso).",
      votos: 0,
    },
    {
      texto: "Escribe tus 3 tareas más importantes al iniciar el día.",
      votos: 0,
    },
    {
      texto: "Apaga las notificaciones del celular mientras trabajas.",
      votos: 0,
    },
    {
      texto: "Aplica la regla de los 2 minutos: si algo lleva menos, hazlo ya.",
      votos: 0,
    },
    {
      texto: "Planifica tu jornada la noche anterior para empezar enfocado.",
      votos: 0,
    },
  ];

  // 2. Función para mezclar la lista (Shuffle)
  const mezclarLista = (lista) => [...lista].sort(() => Math.random() - 0.5);

  // 3. Estados: Tips (mezclados al inicio) e Índice actual
  const [tips, setTips] = useState(() => mezclarLista(listaDeTips));
  const [indice, setIndice] = useState(0);

  // Efecto para el fondo interactivo
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 4. Lógica de Votación
  function votar() {
    const nuevaLista = [...tips];
    nuevaLista[indice].votos = nuevaLista[indice].votos + 1;
    setTips(nuevaLista);
  }

  // 5. Lógica de Navegación (Bucle Infinito con Re-mezcla)
  function siguiente() {
    if (indice < tips.length - 1) {
      setIndice(indice + 1);
    } else {
      // Al llegar al final, mezclamos de nuevo y volvemos al principio
      setTips(mezclarLista(tips));
      setIndice(0);
    }
  }

  // 6. Tip más valorado (Lógica derivada)
  const masVotado = tips.reduce((anterior, actual) =>
    anterior.votos > actual.votos ? anterior : actual,
  );

  // --- ESTILOS (Objetos JS) ---
  const styles = {
    page: {
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    glow: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(59, 130, 246, 0.15), transparent 80%)",
      pointerEvents: "none",
      zIndex: 0,
    },
    contentContainer: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    card: {
      backgroundColor: "#1e293b",
      borderRadius: "32px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      maxWidth: "500px",
      width: "100%",
      padding: "40px",
      marginBottom: "30px",
    },
    tipText: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#f8fafc",
      lineHeight: "1.4",
      textAlign: "center",
      minHeight: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 0 30px 0",
    },
    actionBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid #334155",
      paddingTop: "25px",
    },
    voteBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      backgroundColor: "#1e3a8a",
      color: "#bfdbfe",
      border: "none",
      borderRadius: "16px",
      fontWeight: "700",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "transform 0.1s ease",
      fontFamily: "inherit",
    },
    nextBtn: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "12px 24px",
      border: "none",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
    },
    leaderBoard: {
      maxWidth: "500px",
      width: "100%",
      padding: "20px",
      backgroundColor: "#1e293b",
      borderRadius: "20px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.page}>
      {/* Fondo interactivo */}
      <div style={styles.glow} />

      {/* Contenedor principal para mantener el z-index por encima del fondo */}
      <div style={styles.contentContainer}>
        <h1
          style={{ color: "#f8fafc", marginBottom: "40px", fontSize: "2rem" }}
        >
          Tips de Productividad
        </h1>

        {/* Tarjeta de Tip */}
        <div style={styles.card}>
          <p style={styles.tipText}>"{tips[indice].texto}"</p>

          <div style={styles.actionBar}>
            {/* Botón de Votos (Messirve) */}
            <button
              style={styles.voteBtn}
              onClick={votar}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.95)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Votar </span>
              <span>{tips[indice].votos}</span>
            </button>

            {/* Botón Siguiente con Animación Simple */}
            <button
              style={styles.nextBtn}
              onClick={siguiente}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              Next Tip
              <span style={{ fontSize: "1.2rem" }}>➡️</span>
            </button>
          </div>
        </div>

        {/* Ranking en tiempo real */}
        <div style={styles.leaderBoard}>
          <h3
            style={{
              color: "#94a3b8",
              margin: "0 0 10px 0",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            🏆 Tip más útil:
          </h3>
          {masVotado.votos > 0 ? (
            <p style={{ color: "#f8fafc", fontWeight: "600", margin: 0 }}>
              "{masVotado.texto}"
            </p>
          ) : (
            <p style={{ color: "#64748b", margin: 0 }}>
              Esperando primer voto...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
