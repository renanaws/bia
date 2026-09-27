import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaServer,
  FaSyncAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (window.location.port === "8080") {
    return window.location.origin;
  }
  return "http://localhost:8080";
};

const Versao = () => {
  const [apiStatus, setApiStatus] = useState("checking"); // 'checking' | 'online' | 'offline'
  const [apiVersion, setApiVersion] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkApiHealth = async () => {
    setApiStatus("checking");
    const apiUrl = getApiUrl();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${apiUrl}/api/versao`, {
        signal: controller.signal,
        method: "GET",
        cache: "no-cache",
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const versionText = await response.text();
        setApiVersion(versionText.trim());
        setApiStatus("online");
      } else {
        setApiStatus("offline");
      }
    } catch {
      setApiStatus("offline");
    }

    setLastChecked(new Date());
  };

  useEffect(() => {
    checkApiHealth();
    const interval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const apiUrl = getApiUrl();

  const StatusBadge = ({ status }) => {
    if (status === "online") {
      return (
        <span className="versao-badge versao-badge-online">
          <FaCheckCircle /> Online
        </span>
      );
    }
    if (status === "offline") {
      return (
        <span className="versao-badge versao-badge-offline">
          <FaTimesCircle /> Offline
        </span>
      );
    }
    return (
      <span className="versao-badge versao-badge-checking">
        <FaSpinner className="spin" /> Verificando...
      </span>
    );
  };

  return (
    <div className="versao-page">
      {/* Cabeçalho da página */}
      <div className="versao-header">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Voltar
        </Link>
        <h2 className="versao-title">
          <FaServer /> Informações da API
        </h2>
      </div>

      {/* Card principal — Versão e Status */}
      <div className="versao-card">
        <div className="versao-card-header">
          <span className="versao-card-icon"><FaServer /></span>
          <span className="versao-card-label">Versão da Aplicação</span>
        </div>
        <div className="versao-card-body">
          <div className="versao-info-row">
            <span className="versao-info-label">Versão</span>
            <span className="versao-info-value versao-version-text">
              {apiStatus === "checking" && !apiVersion ? (
                <span className="versao-muted"><FaSpinner className="spin" /> Carregando...</span>
              ) : (
                apiVersion || "—"
              )}
            </span>
          </div>

          <div className="versao-info-row">
            <span className="versao-info-label">Status da API</span>
            <StatusBadge status={apiStatus} />
          </div>

          {lastChecked && (
            <div className="versao-info-row">
              <span className="versao-info-label">Última verificação</span>
              <span className="versao-info-value versao-muted">
                {lastChecked.toLocaleTimeString("pt-BR")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="versao-actions">
        <button
          className="versao-btn versao-btn-secondary"
          onClick={checkApiHealth}
          disabled={apiStatus === "checking"}
          title="Verificar status da API"
        >
          <FaSyncAlt className={apiStatus === "checking" ? "spin" : ""} />
          {apiStatus === "checking" ? "Verificando..." : "Atualizar"}
        </button>

        <a
          className="versao-btn versao-btn-primary"
          href={`${apiUrl}/api/versao`}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir endpoint /api/versao"
        >
          <FaExternalLinkAlt /> /api/versao
        </a>
      </div>
    </div>
  );
};

export default Versao;
