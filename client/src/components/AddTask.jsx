import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

// Registra o locale pt-BR para exibição do calendário em português
registerLocale("pt-BR", ptBR);

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  // dia agora é um objeto Date (ou null), em vez de string
  const [dia, setDia] = useState(null);
  const [importante, setImportante] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    // Converte o objeto Date para string no formato pt-BR (DD/MM/YYYY)
    // Se nenhuma data for selecionada, usa a data atual
    const diaFormatado = dia
      ? dia.toLocaleDateString("pt-BR")
      : new Date().toLocaleDateString("pt-BR");

    onAdd({
      titulo: titulo.trim(),
      dia_atividade: diaFormatado,
      importante,
    });

    setTitulo("");
    setDia(null);
    setImportante(true);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Data/Prazo</label>
        {/*
          DatePicker substitui o input de texto.
          - selected: recebe o objeto Date (ou null)
          - onChange: atualiza o estado com o objeto Date selecionado
          - dateFormat: exibe no formato DD/MM/YYYY
          - locale: exibe o calendário em português brasileiro
          - placeholderText: texto de placeholder quando nenhuma data está selecionada
          - A conversão para string pt-BR acontece no onSubmit antes de enviar ao backend
        */}
        <DatePicker
          selected={dia}
          onChange={(date) => setDia(date)}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          placeholderText="Quando?"
          className="datepicker-input"
          calendarClassName="datepicker-calendar"
          wrapperClassName="datepicker-wrapper"
          autoComplete="off"
        />
      </div>

      <div className="form-control-check">
        <input
          type="checkbox"
          id="importante"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
        />
        <label htmlFor="importante">Importante</label>
      </div>

      <button type="submit" className="btn btn-block success">
        Add New Task
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Campo obrigatório"
        message="Por favor, adicione uma descrição para a tarefa"
        type="warning"
      />
    </form>
  );
};

export default AddTask;
