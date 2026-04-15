import { useState } from "react";

const today = new Date();
const dateStr = today.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });

const initialInspection = [
  { id: 1, location: "Відділення патрошіння (005)", time: "09:20", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 2, location: "Автоматичне патрошіння (005А)", time: "09:20", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 3, location: "Автомат 1", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent" },
  { id: 4, location: "Автомат 2", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent" },
  { id: 5, location: "Автомат 3", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent" },
  { id: 6, location: "Автомат 4", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent", note: true },
  { id: 7, location: "Автомат 5", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent", note: true },
  { id: 8, location: "Автомат 6", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent" },
  { id: 9, location: "Автомат 7", time: "09:20", indicator: "Продуктивність", unit: "%", type: "percent" },
  { id: 10, location: "Відділення патрошіння", time: "09:20", indicator: "Печінка з жовчним міхуром після автомату", unit: "%", type: "percent" },
  { id: 11, location: "Відділення патрошіння", time: "09:20", indicator: "Шлунок не очищений від кутикули після автомату", unit: "%", type: "percent" },
  { id: 12, location: "Камера 008", time: "09:10", indicator: "Температура ПО", unit: "°C", type: "temp" },
  { id: 13, location: "Камера 008", time: "09:10", indicator: "Температура ПКО", unit: "°C", type: "temp" },
  { id: 14, location: "Камера 008 — Ванна 1", time: "09:10", indicator: "Температура води", unit: "°C", type: "temp" },
  { id: 15, location: "Камера 008 — Ванна 2", time: "09:10", indicator: "Температура води", unit: "°C", type: "temp" },
  { id: 16, location: "Камера 008 — Ванна 3", time: "09:10", indicator: "Температура води", unit: "°C", type: "temp" },
  { id: 17, location: "Камера 008А", time: "09:25", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 18, location: "Камера 008А — Вода лід", time: "09:25", indicator: "Температура", unit: "°C", type: "temp" },
  { id: 19, location: "Камера 008А — Шнек 1", time: "09:25", indicator: "Температура", unit: "°C", type: "temp" },
  { id: 20, location: "Камера 008А — Шнек 2", time: "09:25", indicator: "Температура", unit: "°C", type: "temp" },
  { id: 21, location: "Камера 008А — Шнек 3", time: "09:25", indicator: "Температура", unit: "°C", type: "temp" },
  { id: 22, location: "Камера 008А — Шнек 4", time: "09:25", indicator: "Температура", unit: "°C", type: "temp" },
  { id: 23, location: "Дільниця 009С", time: "09:35", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 24, location: "Дільниця 009С — Серце", time: "09:35", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 25, location: "Дільниця 009С — Печінка", time: "09:35", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 26, location: "Дільниця 009С — Шиї", time: "09:35", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 27, location: "Дільниця 009С — Шлунки", time: "09:35", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 28, location: "Дільниця 009Д", time: "09:37", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 29, location: "Дільниця 009Д — Голови", time: "09:37", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 30, location: "Дільниця 009Д — Ноги", time: "09:37", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 31, location: "Камера 030", time: "09:30", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 32, location: "Дільниця 027", time: "09:30", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 33, location: "Дільниця 027 — Кіль", time: "09:30", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 34, location: "Дільниця 027 — Верхня спинка", time: "09:30", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 35, location: "Дільниця 027 — Кістки та хрящі", time: "09:30", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 36, location: "Дільниця 009", time: "09:40", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 37, location: "Дільниця 009 — Тушка (min)", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 38, location: "Дільниця 009 — Тушка (max)", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 39, location: "Дільниця 009 — Четверть", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 40, location: "Дільниця 009 — Крило", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 41, location: "Дільниця 009 — Спинка верх", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 42, location: "Дільниця 009 — Шкіра", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 43, location: "Дільниця 009 — Філе", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 44, location: "Дільниця 009 — Гузка", time: "09:40", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 45, location: "Дільниця 009А", time: "09:45", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 46, location: "Дільниця 009А — Стегно газ", time: "09:45", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 47, location: "Дільниця 009А — Гомілка ТФ", time: "09:45", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 48, location: "Дільниця 009А — Філе ТФ", time: "09:45", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 49, location: "Дільниця 009А — Тушка в/у", time: "09:45", indicator: "Температура продукту", unit: "°C", type: "temp" },
  { id: 50, location: "Дільниця 010", time: "09:50", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 51, location: "Камера 011", time: "09:50", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 52, location: "Камера 012", time: "09:50", indicator: "Температура повітря", unit: "°C", type: "temp" },
  { id: 53, location: "Камера 012А", time: "09:50", indicator: "Температура повітря", unit: "°C", type: "temp" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'IBM Plex Sans', sans-serif;
    background: #0d0f14;
    color: #c8cdd8;
    min-height: 100vh;
  }

  .app {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 0 60px;
  }

  .header {
    background: #0d0f14;
    border-bottom: 1px solid #1e2330;
    padding: 28px 32px 24px;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .header-left { display: flex; flex-direction: column; gap: 4px; }

  .header-tag {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #e87c2e;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-tag::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #e87c2e;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .header-title {
    font-size: 20px;
    font-weight: 600;
    color: #eef0f5;
    letter-spacing: -0.02em;
  }

  .date-block {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    color: #5a6070;
    background: #151820;
    border: 1px solid #1e2330;
    padding: 8px 16px;
    border-radius: 4px;
    white-space: nowrap;
  }

  .date-val {
    color: #c8cdd8;
    margin-left: 8px;
  }

  .progress-bar-wrap {
    background: #151820;
    border-bottom: 1px solid #1e2330;
    padding: 10px 32px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .progress-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #5a6070;
    white-space: nowrap;
  }

  .progress-track {
    flex: 1;
    height: 3px;
    background: #1e2330;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #e87c2e, #f5a55a);
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .progress-count {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #e87c2e;
    white-space: nowrap;
  }

  .section {
    margin: 0 32px;
    margin-top: 32px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #1e2330;
  }

  .section-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #e87c2e;
    background: rgba(232, 124, 46, 0.08);
    border: 1px solid rgba(232, 124, 46, 0.2);
    padding: 3px 8px;
    border-radius: 3px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #eef0f5;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .table-wrap {
    background: #111420;
    border: 1px solid #1e2330;
    border-radius: 6px;
    overflow: hidden;
  }

  .table-head {
    display: grid;
    background: #151820;
    border-bottom: 1px solid #1e2330;
    padding: 10px 16px;
  }

  .insp-grid { grid-template-columns: 32px 1fr 70px 1fr 130px; gap: 0 16px; }
  .auto-grid  { grid-template-columns: 1fr 100px 1fr; gap: 0 16px; }
  .temp-grid  { grid-template-columns: 1fr 1fr 70px 110px; gap: 0 16px; }

  .th {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #3d4558;
  }

  .table-row {
    display: grid;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid #181c28;
    min-height: 42px;
    transition: background 0.15s;
  }

  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: rgba(255,255,255,0.015); }

  .row-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #2e3345;
    text-align: center;
  }

  .cell {
    font-size: 12.5px;
    color: #8892a4;
    padding: 10px 0;
    line-height: 1.4;
  }

  .cell-time {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #4a5268;
  }

  .cell-indicator { color: #a0a8bc; }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .val-input {
    background: #0d0f14;
    border: 1px solid #2a2f40;
    border-radius: 4px;
    color: #e8c87a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    padding: 5px 10px;
    width: 80px;
    text-align: right;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    -moz-appearance: textfield;
  }

  .val-input::-webkit-outer-spin-button,
  .val-input::-webkit-inner-spin-button { -webkit-appearance: none; }

  .val-input:focus {
    border-color: #e87c2e;
    box-shadow: 0 0 0 2px rgba(232, 124, 46, 0.12);
  }

  .val-input.filled {
    border-color: #2a4a2a;
    color: #7ec87a;
    background: rgba(126, 200, 122, 0.03);
  }

  .note-input {
    background: #0d0f14;
    border: 1px solid #2a2f40;
    border-radius: 4px;
    color: #8892a4;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11.5px;
    padding: 5px 10px;
    width: 100%;
    outline: none;
    transition: border-color 0.15s;
  }

  .note-input:focus { border-color: #3d4558; }

  .unit {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: #3d4558;
    white-space: nowrap;
  }

  .wide-input {
    width: 110px;
  }

  .avg-row {
    background: #0f1219;
    border-top: 1px solid #1e2330 !important;
  }

  .avg-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    color: #e87c2e;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .avg-val {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: #e8c87a;
  }

  .footer {
    margin: 32px 32px 0;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: flex-end;
  }

  .btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    padding: 10px 24px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    text-transform: uppercase;
  }

  .btn-secondary {
    background: #151820;
    color: #5a6070;
    border: 1px solid #1e2330;
  }

  .btn-secondary:hover { background: #1a1e28; color: #8892a4; }

  .btn-primary {
    background: #e87c2e;
    color: #fff;
  }

  .btn-primary:hover { background: #f08d42; }
  .btn-primary:disabled { background: #2a2f40; color: #3d4558; cursor: not-allowed; }

  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: #1a2a1a;
    border: 1px solid #2e4a2e;
    color: #7ec87a;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    padding: 14px 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 200;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .section-divider {
    height: 1px;
    background: #1e2330;
    margin: 8px 0 0;
  }
`;

export default function App() {
  const [inspValues, setInspValues] = useState({});
  const [autoValues, setAutoValues] = useState({});
  const [autoNotes, setAutoNotes] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const automats = [1,2,3,4,5,6,7];
  const tempRows = [
    { loc: "Камера 008", prod: "Ванна 1", time: "09:10" },
    { loc: "Камера 008", prod: "Ванна 2", time: "09:10" },
    { loc: "Камера 008", prod: "Ванна 3", time: "09:10" },
    { loc: "Камера 008А", prod: "Вода лід", time: "09:25" },
    { loc: "Камера 008А", prod: "Шнек 1", time: "09:25" },
    { loc: "Камера 008А", prod: "Шнек 2", time: "09:25" },
    { loc: "Камера 008А", prod: "Шнек 3", time: "09:25" },
    { loc: "Камера 008А", prod: "Шнек 4", time: "09:25" },
    { loc: "Дільниця 009С", prod: "Серце", time: "09:35" },
    { loc: "Дільниця 009С", prod: "Печінка", time: "09:35" },
    { loc: "Дільниця 009С", prod: "Шиї", time: "09:35" },
    { loc: "Дільниця 009С", prod: "Шлунки", time: "09:35" },
    { loc: "Дільниця 009Д", prod: "Голови", time: "09:37" },
    { loc: "Дільниця 009Д", prod: "Ноги", time: "09:37" },
    { loc: "Дільниця 027", prod: "Кіль", time: "09:30" },
    { loc: "Дільниця 027", prod: "Верхня спинка", time: "09:30" },
    { loc: "Дільниця 027", prod: "Кістки та хрящі", time: "09:30" },
    { loc: "Дільниця 009", prod: "Тушка (min)", time: "09:40" },
    { loc: "Дільниця 009", prod: "Тушка (max)", time: "09:40" },
    { loc: "Дільниця 009", prod: "Четверть", time: "09:40" },
    { loc: "Дільниця 009", prod: "Крило", time: "09:40" },
    { loc: "Дільниця 009", prod: "Спинка верх", time: "09:40" },
    { loc: "Дільниця 009", prod: "Шкіра", time: "09:40" },
    { loc: "Дільниця 009", prod: "Філе", time: "09:40" },
    { loc: "Дільниця 009", prod: "Гузка", time: "09:40" },
    { loc: "Дільниця 009А", prod: "Стегно газ", time: "09:45" },
    { loc: "Дільниця 009А", prod: "Гомілка ТФ", time: "09:45" },
    { loc: "Дільниця 009А", prod: "Філе ТФ", time: "09:45" },
    { loc: "Дільниця 009А", prod: "Тушка в/у", time: "09:45" },
  ];

  const totalFields = initialInspection.length + automats.length + tempRows.length;
  const filledFields = Object.values(inspValues).filter(v => v !== "").length +
    Object.values(autoValues).filter(v => v !== "").length +
    Object.values(tempValues).filter(v => v !== "").length;
  const progress = Math.round((filledFields / totalFields) * 100);

  const avgAuto = () => {
    const vals = automats.map(n => parseFloat(autoValues[n])).filter(v => !isNaN(v));
    if (vals.length === 0) return "—";
    return (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(2);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-left">
            <div className="header-tag">Зведена інспекційна відомість</div>
            <div className="header-title">Введення показників</div>
          </div>
          <div className="date-block">
            Дата перевірки: <span className="date-val">{dateStr}</span>
          </div>
        </div>

        <div className="progress-bar-wrap">
          <span className="progress-label">Заповнено</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-count">{filledFields} / {totalFields} полів</span>
        </div>

        {/* SECTION 1 */}
        <div className="section">
          <div className="section-header">
            <span className="section-num">01</span>
            <span className="section-title">Інспекційна відомість</span>
          </div>
          <div className="table-wrap">
            <div className={`table-head insp-grid`}>
              <span className="th">#</span>
              <span className="th">Відділення / Локація</span>
              <span className="th">Час</span>
              <span className="th">Показник</span>
              <span className="th">Значення</span>
            </div>
            {initialInspection.map(row => (
              <div key={row.id} className={`table-row insp-grid`}>
                <span className="row-num">{row.id}</span>
                <span className="cell">{row.location}</span>
                <span className="cell cell-time">{row.time}</span>
                <span className="cell cell-indicator">{row.indicator}</span>
                <div className="input-wrap">
                  <input
                    className={`val-input${inspValues[row.id] ? " filled" : ""}`}
                    type="text"
                    placeholder="—"
                    value={inspValues[row.id] || ""}
                    onChange={e => setInspValues(p => ({ ...p, [row.id]: e.target.value }))}
                  />
                  <span className="unit">{row.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="section">
          <div className="section-header">
            <span className="section-num">02</span>
            <span className="section-title">Продуктивність автоматів — 09:20</span>
          </div>
          <div className="table-wrap">
            <div className={`table-head auto-grid`}>
              <span className="th">Автомат</span>
              <span className="th">Продуктивність</span>
              <span className="th">Примітка</span>
            </div>
            {automats.map(n => (
              <div key={n} className={`table-row auto-grid`}>
                <span className="cell">Автомат {n}</span>
                <div className="input-wrap">
                  <input
                    className={`val-input${autoValues[n] ? " filled" : ""}`}
                    type="number"
                    placeholder="—"
                    min="0"
                    max="100"
                    value={autoValues[n] || ""}
                    onChange={e => setAutoValues(p => ({ ...p, [n]: e.target.value }))}
                  />
                  <span className="unit">%</span>
                </div>
                <input
                  className="note-input"
                  type="text"
                  placeholder="Примітка (необов'язково)"
                  value={autoNotes[n] || ""}
                  onChange={e => setAutoNotes(p => ({ ...p, [n]: e.target.value }))}
                />
              </div>
            ))}
            <div className="table-row auto-grid avg-row">
              <span className="avg-label">Середня</span>
              <span className="avg-val">{avgAuto()}{avgAuto() !== "—" ? " %" : ""}</span>
              <span></span>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="section">
          <div className="section-header">
            <span className="section-num">03</span>
            <span className="section-title">Температури продуктів по дільницях</span>
          </div>
          <div className="table-wrap">
            <div className={`table-head temp-grid`}>
              <span className="th">Дільниця</span>
              <span className="th">Продукт</span>
              <span className="th">Час</span>
              <span className="th">Температура</span>
            </div>
            {tempRows.map((row, i) => (
              <div key={i} className={`table-row temp-grid`}>
                <span className="cell">{row.loc}</span>
                <span className="cell cell-indicator">{row.prod}</span>
                <span className="cell cell-time">{row.time}</span>
                <div className="input-wrap">
                  <input
                    className={`val-input wide-input${tempValues[i] ? " filled" : ""}`}
                    type="text"
                    placeholder="напр. +2,5"
                    value={tempValues[i] || ""}
                    onChange={e => setTempValues(p => ({ ...p, [i]: e.target.value }))}
                  />
                  <span className="unit">°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setInspValues({});
              setAutoValues({});
              setAutoNotes({});
              setTempValues({});
            }}
          >
            Очистити
          </button>
          <button
            className="btn btn-primary"
            disabled={filledFields < 10}
            onClick={() => setSubmitted(true)}
          >
            Зберегти відомість →
          </button>
        </div>
      </div>

      {submitted && (
        <div className="toast" onClick={() => setSubmitted(false)}>
          ✓ Відомість збережено · {dateStr}
        </div>
      )}
    </>
  );
}
