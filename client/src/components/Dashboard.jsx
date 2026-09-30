import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSync } from "react-icons/fa";
import { useLog } from "../contexts/LogContext.jsx";
import TaskChart from "./TaskChart.jsx";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Agrega tarefas por prioridade
const aggregateData = (tasks) => {
  const important = tasks.filter((task) => task.importante === true).length;
  const normal = tasks.filter((task) => task.importante === false).length;

  return [
    { name: "Importantes", value: important, fill: "#ef4444" },
    { name: "Normais", value: normal, fill: "#3b82f6" },
  ];
};

// Card reutilizável no padrão visual do projeto
const Card = ({ children, style }) => (
  <div
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      padding: "1.5rem",
      boxShadow: "var(--shadow)",
      ...style,
    }}
  >
    {children}
  </div>
);

// Stat item para exibir métricas
const StatItem = ({ label, value, color }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.25rem",
      flex: 1,
    }}
  >
    <span
      style={{
        fontSize: "1.75rem",
        fontWeight: 700,
        color: color || "var(--text-primary)",
        lineHeight: 1,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontSize: "0.75rem",
        color: "var(--text-secondary)",
        textAlign: "center",
      }}
    >
      {label}
    </span>
  </div>
);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addLog, logApiRequest, logApiResponse, logApiError } = useLog();

  useEffect(() => {
    addLog("INFO", "Dashboard aberto", "Iniciando carregamento de tarefas");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    const url = `${apiUrl}/api/tarefas`;
    logApiRequest("GET", url);

    try {
      const res = await fetch(url);
      const data = await res.json();

      logApiResponse("GET", url, res.status, data);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      // A API pode retornar { data: [...] } ou diretamente um array
      const taskList = Array.isArray(data) ? data : data.data || [];
      setTasks(taskList);
      addLog(
        "SUCCESS",
        "Dashboard carregado",
        `${taskList.length} tarefa(s) carregada(s)`
      );
    } catch (err) {
      logApiError("GET", url, err);
      setError(err.message);
      addLog("ERROR", "Falha ao carregar dashboard", err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = aggregateData(tasks);
  const total = tasks.length;
  const important = chartData[0].value;
  const normal = chartData[1].value;
  const percentImportant =
    total > 0 ? ((important / total) * 100).toFixed(0) : 0;

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Cabeçalho da página */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "0.4rem 0.6rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontSize: "0.875rem",
            }}
            title="Voltar para home"
          >
            <FaArrowLeft />
          </Link>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Dashboard de Tarefas
          </h2>
        </div>

        <button
          onClick={fetchTasks}
          disabled={loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            padding: "0.4rem 0.75rem",
            cursor: loading ? "not-allowed" : "pointer",
            color: "var(--text-secondary)",
            fontSize: "0.8rem",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
          title="Atualizar dados"
        >
          <FaSync style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Atualizar
        </button>
      </div>

      {/* Estado de loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 0",
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
          }}
        >
          <p>Carregando dados...</p>
        </div>
      )}

      {/* Estado de erro */}
      {!loading && error && (
        <Card
          style={{
            borderLeft: "3px solid var(--accent-danger)",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              color: "var(--accent-danger)",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "0.25rem",
            }}
          >
            Erro ao carregar dados
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
            {error}
          </p>
          <button
            onClick={fetchTasks}
            style={{
              marginTop: "0.75rem",
              background: "var(--accent-danger)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            Tentar novamente
          </button>
        </Card>
      )}

      {/* Conteúdo principal */}
      {!loading && !error && (
        <>
          {/* Cards de estatísticas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <Card style={{ padding: "1rem" }}>
              <StatItem label="Total" value={total} color="var(--text-primary)" />
            </Card>
            <Card style={{ padding: "1rem" }}>
              <StatItem
                label="Importantes"
                value={important}
                color="var(--accent-danger)"
              />
            </Card>
            <Card style={{ padding: "1rem" }}>
              <StatItem
                label="Normais"
                value={normal}
                color="var(--accent-primary)"
              />
            </Card>
            <Card style={{ padding: "1rem" }}>
              <StatItem
                label="% Importantes"
                value={`${percentImportant}%`}
                color={
                  Number(percentImportant) >= 50
                    ? "var(--accent-danger)"
                    : "var(--accent-success)"
                }
              />
            </Card>
          </div>

          {/* Gráfico de pizza */}
          <Card>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              Distribuição por Prioridade
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
              }}
            >
              {total > 0
                ? `${total} tarefa${total !== 1 ? "s" : ""} no total`
                : "Nenhuma tarefa cadastrada"}
            </p>
            <TaskChart data={chartData} />
          </Card>
        </>
      )}

      {/* Animação de spin para o botão de refresh */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
