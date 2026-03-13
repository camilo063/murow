"use client";

import { useState, useMemo } from "react";

export default function ROICalculator() {
  const [pageViews, setPageViews] = useState(500000);
  const [conversionRate, setConversionRate] = useState(2);
  const [subscriptionPrice, setSubscriptionPrice] = useState(10);

  const results = useMemo(() => {
    const subscribers = Math.round(pageViews * (conversionRate / 100));
    const mrr = subscribers * subscriptionPrice;
    const arr = mrr * 12;
    // Estimate MUROW cost based on page views
    let murowCost = 450; // Business
    if (pageViews > 500000) murowCost = 850; // Performance
    if (pageViews > 1000000) murowCost = 1900; // Enterprise
    const annualMurowCost = murowCost * 12;
    const roi = arr > 0 ? Math.round(((arr - annualMurowCost) / annualMurowCost) * 100) : 0;

    return { subscribers, mrr, arr, murowCost, roi };
  }, [pageViews, conversionRate, subscriptionPrice]);

  const formatNumber = (n: number) =>
    n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

  const sliderTrack =
    "w-full h-2 rounded-full appearance-none cursor-pointer accent-[#00B4D8] bg-gray-200";

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg md:p-10">
      <h3
        className="mb-2 text-2xl font-bold"
        style={{ color: "#0A2540" }}
      >
        Calculadora de ROI
      </h3>
      <p className="mb-8 text-sm" style={{ color: "#4A5568" }}>
        Ajusta los valores para proyectar el retorno de tu inversion con MUROW.
      </p>

      <div className="space-y-8">
        {/* Page Views */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: "#0A2540" }}>
              Page Views mensuales
            </label>
            <span
              className="rounded-full px-3 py-1 text-sm font-bold"
              style={{ background: "#F0F7FF", color: "#00B4D8" }}
            >
              {formatNumber(pageViews)}
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={pageViews}
            onChange={(e) => setPageViews(Number(e.target.value))}
            className={sliderTrack}
          />
          <div className="mt-1 flex justify-between text-xs" style={{ color: "#4A5568" }}>
            <span>50K</span>
            <span>5M</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: "#0A2540" }}>
              Tasa de conversion
            </label>
            <span
              className="rounded-full px-3 py-1 text-sm font-bold"
              style={{ background: "#F0F7FF", color: "#00B4D8" }}
            >
              {conversionRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.1}
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className={sliderTrack}
          />
          <div className="mt-1 flex justify-between text-xs" style={{ color: "#4A5568" }}>
            <span>0.5%</span>
            <span>5%</span>
          </div>
        </div>

        {/* Subscription Price */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium" style={{ color: "#0A2540" }}>
              Precio de suscripcion (USD/mes)
            </label>
            <span
              className="rounded-full px-3 py-1 text-sm font-bold"
              style={{ background: "#F0F7FF", color: "#00B4D8" }}
            >
              ${subscriptionPrice}
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={50}
            step={1}
            value={subscriptionPrice}
            onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
            className={sliderTrack}
          />
          <div className="mt-1 flex justify-between text-xs" style={{ color: "#4A5568" }}>
            <span>$3</span>
            <span>$50</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div
        className="mt-10 grid grid-cols-2 gap-4 rounded-xl p-6 md:grid-cols-4"
        style={{ background: "#F0F7FF" }}
      >
        <div className="text-center">
          <p className="text-2xl font-extrabold" style={{ color: "#0A2540" }}>
            {formatNumber(results.subscribers)}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#4A5568" }}>
            Suscriptores proyectados
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold" style={{ color: "#0A2540" }}>
            ${formatNumber(results.mrr)}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#4A5568" }}>
            MRR proyectado
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold" style={{ color: "#0A2540" }}>
            ${formatNumber(results.arr)}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#4A5568" }}>
            ARR proyectado
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-2xl font-extrabold"
            style={{ color: results.roi > 0 ? "#00B4D8" : "#FF6B35" }}
          >
            {results.roi > 0 ? "+" : ""}
            {formatNumber(results.roi)}%
          </p>
          <p className="mt-1 text-xs" style={{ color: "#4A5568" }}>
            ROI vs MUROW
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs" style={{ color: "#4A5568" }}>
        Costo estimado de MUROW: ${results.murowCost} USD/mes. Calculos basados en
        promedios de la industria.
      </p>
    </div>
  );
}
