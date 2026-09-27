import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaServer,
  FaHome,
  FaGlobe,
  FaLock,
  FaQuestionCircle,
  FaBalanceScale,
  FaDatabase,
  FaBolt,
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

const getEnvironmentInfo = () => {
  const { protocol, hostname, port } = window.location;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return { type: "local", icon: <FaHome />, label: "Local", description: `${hostname}:${port}`, color: "#3b82f6" };
  }

  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) && protocol === "http:") {
    return { type: "ip-http", icon: <FaGlobe />, label: "IP Direto", description: `${hostname}${port ? ":" + port : ""}`, color: "#f59e0b" };
  }

  if (protocol === "http:" && hostname.includes(".elb.")) {
    return { type: "alb-http", icon: <FaBalanceScale />, label: "ALB HTTP", description: hostname, color: "#ef4444" };
  }

  if (protocol === "https:") {
    return { type: "domain-https", icon: <FaLock />, label: "Produção", description: hostname, color: "#22c55e" };
  }

  return { type: "other", icon: <FaQuestionCircle />, label: "Outro", description: `${hostname}${port ? ":" + port : ""}`, color: "#6b7280" };
};

const Versao = () => {
  const [apiStatus, setApiStatus] = useState("checking"); // 'checking' | 'online' | 'offline'
  const [apiVersion, setApiVersion] = useState(null);
  const [cacheConfig, setCacheConfig] = useState(null);
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

        // Busca configuração do cache (opcional)
        try {
          const cacheRes = await fetch(`${apiUrl}/api/cache-config`, { cache: "no-cache" });
          if (cacheRes.ok) {
            setCacheConfig(await cacheRes.json());
          }
        } catch {
          // cache-config não disponível — não é crítico
        }
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
  const envInfo = getEnvironmentInfo();

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

      {/* Card — Ambiente */}
      <div className="versao-card">
        <div className="versao-card-header">
          <span className="versao-card-icon" style={{ color: envInfo.color }}>{envInfo.icon}</span>
          <span className="versao-card-label">Ambiente</span>
        </div>
        <div className="versao-card-body">
          <div className="versao-info-row">
            <span className="versao-info-label">Tipo</span>
            <span className="versao-badge" style={{ background: envInfo.color + "22", color: envInfo.color, border: `1px solid ${envInfo.color}44` }}>
              {envInfo.icon}&nbsp;{envInfo.label}
            </span>
          </div>

          <div className="versao-info-row">
            <span className="versao-info-label">Host</span>
            <span className="versao-info-value versao-monospace">{envInfo.description}</span>
          </div>

          <div className="versao-info-row">
            <span className="versao-info-label">URL da API</span>
            <span className="versao-info-value versao-monospace">{apiUrl}</span>
          </div>
        </div>
      </div>

      {/* Card — Cache */}
      <div className="versao-card">
        <div className="versao-card-header">
          <span className="versao-card-icon"><FaBolt /></span>
          <span className="versao-card-label">Cache</span>
        </div>
        <div className="versao-card-body">
          {cacheConfig ? (
            <>
              <div className="versao-info-row">
                <span className="versao-info-label">Status</span>
                {cacheConfig.enabled ? (
                  <span className="versao-badge versao-badge-online"><FaCheckCircle /> Ativo</span>
                ) : (
                  <span className="versao-badge versao-badge-offline"><FaTimesCircle /> Inativo</span>
                )}
              </div>
              {cacheConfig.enabled && (
                <>
                  <div className="versao-info-row">
                    <span className="versao-info-label">Endpoint</span>
                    <span className="versao-info-value versao-monospace">
                      {cacheConfig.endpoint}:{cacheConfig.port}
                    </span>
                  </div>
                  <div className="versao-info-row">
                    <span className="versao-info-label">TTL</span>
                    <span className="versao-badge" style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44" }}>
                      <FaBolt /> {cacheConfig.ttl}s
                    </span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="versao-info-row">
              <span className="versao-info-label">Status</span>
              <span className="versao-muted">
                {apiStatus === "checking" ? (
                  <><FaSpinner className="spin" /> Verificando...</>
                ) : (
                  <>
                    <span className="versao-badge versao-badge-database"><FaDatabase /> Sem cache</span>
                  </>
                )}
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
