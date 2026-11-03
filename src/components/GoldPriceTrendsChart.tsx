import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import {
  TrendingUp,
  Globe,
  Scale,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/expeditionData';

interface HistoricalGoldPoint {
  date: string;
  periodLabel: string;
  usdPerOz: number;
  volatilityNote?: string;
}

// Historical LBMA Gold Spot trajectory (USD per Troy Oz, 3-Year series up to Q1 2026)
const HISTORICAL_GOLD_USD_OZ: HistoricalGoldPoint[] = [
  { date: '2023-03', periodLabel: 'Mar 23', usdPerOz: 1968, volatilityNote: 'Global banking liquidity shift' },
  { date: '2023-05', periodLabel: 'May 23', usdPerOz: 1992 },
  { date: '2023-07', periodLabel: 'Jul 23', usdPerOz: 1954 },
  { date: '2023-09', periodLabel: 'Sep 23', usdPerOz: 1918 },
  { date: '2023-11', periodLabel: 'Nov 23', usdPerOz: 1998, volatilityNote: 'Central bank bullion accumulation' },
  { date: '2024-01', periodLabel: 'Jan 24', usdPerOz: 2042 },
  { date: '2024-03', periodLabel: 'Mar 24', usdPerOz: 2165, volatilityNote: 'Breakout above $2,100/oz' },
  { date: '2024-05', periodLabel: 'May 24', usdPerOz: 2350 },
  { date: '2024-07', periodLabel: 'Jul 24', usdPerOz: 2415 },
  { date: '2024-09', periodLabel: 'Sep 24', usdPerOz: 2585, volatilityNote: 'Sovereign reserve reallocation' },
  { date: '2024-11', periodLabel: 'Nov 24', usdPerOz: 2660 },
  { date: '2025-01', periodLabel: 'Jan 25', usdPerOz: 2715 },
  { date: '2025-03', periodLabel: 'Mar 25', usdPerOz: 2775 },
  { date: '2025-05', periodLabel: 'May 25', usdPerOz: 2810 },
  { date: '2025-07', periodLabel: 'Jul 25', usdPerOz: 2845 },
  { date: '2025-09', periodLabel: 'Sep 25', usdPerOz: 2878, volatilityNote: 'DMCC & Zurich refinery tight physical spread' },
  { date: '2025-11', periodLabel: 'Nov 25', usdPerOz: 2905 },
  { date: '2026-01', periodLabel: 'Jan 26', usdPerOz: 2922 },
  { date: '2026-02', periodLabel: 'Feb 26', usdPerOz: 2931 },
  { date: '2026-03', periodLabel: 'Mar 26', usdPerOz: 2938, volatilityNote: 'Current LBMA Benchmark ($94,458 / kg)' }
];

const TROY_OZ_PER_KG = 32.1507;

interface GoldPriceTrendsChartProps {
  initialCurrency?: Currency;
  portalContext?: 'admin' | 'client';
}

export const GoldPriceTrendsChart: React.FC<GoldPriceTrendsChartProps> = ({
  initialCurrency = 'USD',
  portalContext = 'client'
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(initialCurrency);
  const [timeframe, setTimeframe] = useState<'6M' | '1Y' | '3Y'>('1Y');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'oz'>('kg');
  const [showKampalaRefinery, setShowKampalaRefinery] = useState(true);
  const [showUraLanded, setShowUraLanded] = useState(true);
  const [showScamBaitLine, setShowScamBaitLine] = useState(true);

  const currencyMeta = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES.USD;

  const filteredRawPoints = useMemo(() => {
    if (timeframe === '6M') return HISTORICAL_GOLD_USD_OZ.slice(-6);
    if (timeframe === '1Y') return HISTORICAL_GOLD_USD_OZ.slice(-10);
    return HISTORICAL_GOLD_USD_OZ;
  }, [timeframe]);

  const chartData = useMemo(() => {
    const unitMultiplier = weightUnit === 'kg' ? TROY_OZ_PER_KG : 1;
    const fxRate = currencyMeta.rate;

    return filteredRawPoints.map((pt) => {
      const lbmaSpot = Math.round(pt.usdPerOz * unitMultiplier * fxRate);
      const kampalaVerifiedCash = Math.round(lbmaSpot * 0.985); // 98.5% LBMA cash floor at accredited Kampala refineries
      const uraClearedExport = Math.round(lbmaSpot * 1.035); // Net landed with 5% URA statutory export levy
      const fraudulentFcoBait = Math.round(lbmaSpot * 0.82); // -18% discount scam FCO bait price

      return {
        ...pt,
        lbmaSpot,
        kampalaVerifiedCash,
        uraClearedExport,
        fraudulentFcoBait
      };
    });
  }, [filteredRawPoints, weightUnit, currencyMeta]);

  const latestPoint = chartData[chartData.length - 1];
  const earliestPoint = chartData[0];
  const periodChangePercent = earliestPoint
    ? (((latestPoint.lbmaSpot - earliestPoint.lbmaSpot) / earliestPoint.lbmaSpot) * 100).toFixed(1)
    : '0.0';

  const formatPriceValue = (val: number, code: Currency = selectedCurrency) => {
    const meta = CURRENCY_RATES[code] || CURRENCY_RATES.USD;
    if (code === 'UGX') {
      if (val >= 1_000_000) {
        return `${meta.symbol} ${(val / 1_000_000).toFixed(2)}M`;
      }
      return `${meta.symbol} ${val.toLocaleString()}`;
    }
    return `${meta.symbol}${val.toLocaleString()}`;
  };

  const formatYAxisTick = (val: number) => {
    if (selectedCurrency === 'UGX') {
      return `${(val / 1_000_000).toFixed(0)}M`;
    }
    if (val >= 1000) {
      return `${currencyMeta.symbol}${(val / 1000).toFixed(0)}k`;
    }
    return `${currencyMeta.symbol}${val}`;
  };

  return (
    <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden shadow-xl">
      {/* Top Control & Header Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#0E141F] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-data uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/30 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>
                {portalContext === 'admin'
                  ? 'ADMIN TREASURY & FORENSIC BENCHMARK TELEMETRY'
                  : 'CLIENT MULTI-CURRENCY BULLION BENCHMARK'}
              </span>
            </span>
            <span className="text-xs font-mono-data text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{periodChangePercent}% ({timeframe})</span>
            </span>
          </div>
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
            Historical Gold Price Trends & Kampala Physical Settlement Spread ({selectedCurrency})
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare LBMA International Spot against Accredited Kampala Refinery Cash Settlement (98.5%), URA 5% Export Cleared Value, and Illicit FCO Scam Bait (-18%).
          </p>
        </div>

        {/* Interactive Currency, Unit & Timeframe Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Currency Selector Pills */}
          <div className="flex items-center bg-[#0B0F17] p-1 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37] ml-2 mr-1.5 shrink-0" />
            {(Object.keys(CURRENCY_RATES) as Currency[]).map((code) => (
              <button
                key={code}
                onClick={() => setSelectedCurrency(code)}
                className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-colors ${
                  selectedCurrency === code
                    ? 'bg-[#D4AF37] text-[#0B0F17]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Weight Unit Toggle (1 kg vs 1 oz) */}
          <div className="flex items-center bg-[#0B0F17] p-1 rounded-lg border border-slate-800">
            <Scale className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1.5 shrink-0" />
            <button
              onClick={() => setWeightUnit('kg')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-colors ${
                weightUnit === 'kg'
                  ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1 KG Bar
            </button>
            <button
              onClick={() => setWeightUnit('oz')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-colors ${
                weightUnit === 'oz'
                  ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1 Troy Oz
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#0B0F17] p-1 rounded-lg border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1.5 shrink-0" />
            {(['6M', '1Y', '3Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-colors ${
                  timeframe === tf
                    ? 'bg-[#182232] text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Summary Strip (Tabular-Nums) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5 sm:px-6 bg-[#0B0F17]/60 border-b border-slate-800">
        <div className="p-3.5 rounded-lg bg-[#111722] border border-[#D4AF37]/30">
          <div className="text-[11px] font-mono-data text-slate-400 uppercase flex items-center justify-between">
            <span>LBMA International Spot ({weightUnit.toUpperCase()})</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
          </div>
          <div className="text-lg sm:text-xl font-mono-data font-bold text-white mt-1">
            {formatPriceValue(latestPoint.lbmaSpot)}
          </div>
          <div className="text-[11px] font-mono-data text-[#D4AF37] mt-0.5">
            100.0% Global Bullion Benchmark
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowKampalaRefinery(!showKampalaRefinery)}
          className={`p-3.5 rounded-lg text-left border transition-all ${
            showKampalaRefinery
              ? 'bg-[#111722] border-emerald-500/40'
              : 'bg-[#0B0F17] border-slate-800 opacity-60'
          }`}
        >
          <div className="text-[11px] font-mono-data text-slate-400 uppercase flex items-center justify-between">
            <span>Kampala Refinery Cash (98.5%)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-mono-data font-bold text-emerald-400 mt-1">
            {formatPriceValue(latestPoint.kampalaVerifiedCash)}
          </div>
          <div className="text-[11px] font-mono-data text-slate-400 mt-0.5">
            Legitimate Pithead / Smelter Floor
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowUraLanded(!showUraLanded)}
          className={`p-3.5 rounded-lg text-left border transition-all ${
            showUraLanded
              ? 'bg-[#111722] border-sky-500/40'
              : 'bg-[#0B0F17] border-slate-800 opacity-60'
          }`}
        >
          <div className="text-[11px] font-mono-data text-slate-400 uppercase flex items-center justify-between">
            <span>URA 5% Levy Cleared Export</span>
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          </div>
          <div className="text-lg sm:text-xl font-mono-data font-bold text-sky-300 mt-1">
            {formatPriceValue(latestPoint.uraClearedExport)}
          </div>
          <div className="text-[11px] font-mono-data text-slate-400 mt-0.5">
            Includes Statutory 5% URA Export Tax
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowScamBaitLine(!showScamBaitLine)}
          className={`p-3.5 rounded-lg text-left border transition-all ${
            showScamBaitLine
              ? 'bg-rose-950/20 border-rose-500/40'
              : 'bg-[#0B0F17] border-slate-800 opacity-60'
          }`}
        >
          <div className="text-[11px] font-mono-data text-rose-300 uppercase flex items-center justify-between">
            <span>Scam FCO Bait Threshold (-18%)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="text-lg sm:text-xl font-mono-data font-bold text-rose-400 mt-1">
            {formatPriceValue(latestPoint.fraudulentFcoBait)}
          </div>
          <div className="text-[11px] font-mono-data text-rose-300/80 mt-0.5">
            Advance-Fee Fraud Zone (Click to toggle)
          </div>
        </button>
      </div>

      {/* Recharts Interactive Historical Visualization */}
      <div className="p-5 sm:p-6">
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 12, right: 18, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="lbmaSpotGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis
                dataKey="periodLabel"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
              />
              <YAxis
                stroke="#64748B"
                tickFormatter={formatYAxisTick}
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
                width={72}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  const dataPoint = payload[0].payload;
                  return (
                    <div className="rounded-xl bg-[#0B0F17]/95 border border-[#D4AF37]/50 p-3.5 shadow-2xl text-xs space-y-2 min-w-[250px]">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-mono-data font-bold text-white">
                          {label} ({dataPoint.date})
                        </span>
                        <span className="font-mono-data text-[11px] text-[#D4AF37]">
                          {selectedCurrency} / {weightUnit === 'kg' ? '1 KG' : '1 OZ'}
                        </span>
                      </div>

                      <div className="space-y-1.5 font-mono-data">
                        <div className="flex items-center justify-between text-white">
                          <span className="text-slate-300">LBMA Spot (100%):</span>
                          <span className="font-bold text-[#D4AF37]">
                            {formatPriceValue(dataPoint.lbmaSpot)}
                          </span>
                        </div>
                        {showKampalaRefinery && (
                          <div className="flex items-center justify-between text-emerald-400">
                            <span>Kampala Refinery (98.5%):</span>
                            <span className="font-bold">
                              {formatPriceValue(dataPoint.kampalaVerifiedCash)}
                            </span>
                          </div>
                        )}
                        {showUraLanded && (
                          <div className="flex items-center justify-between text-sky-300">
                            <span>URA Cleared Export (103.5%):</span>
                            <span className="font-bold">
                              {formatPriceValue(dataPoint.uraClearedExport)}
                            </span>
                          </div>
                        )}
                        {showScamBaitLine && (
                          <div className="flex items-center justify-between text-rose-400 pt-1 border-t border-slate-800/80">
                            <span>Scam FCO Bait (-18%):</span>
                            <span className="font-bold">
                              {formatPriceValue(dataPoint.fraudulentFcoBait)}
                            </span>
                          </div>
                        )}
                      </div>

                      {dataPoint.volatilityNote && (
                        <div className="text-[11px] text-amber-200 bg-amber-950/40 border border-amber-700/40 rounded px-2 py-1">
                          {dataPoint.volatilityNote}
                        </div>
                      )}
                    </div>
                  );
                }}
              />

              {/* Primary LBMA Spot Area + Line */}
              <Area
                type="monotone"
                dataKey="lbmaSpot"
                name="LBMA International Spot"
                stroke="#D4AF37"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#lbmaSpotGradient)"
              />

              {/* Kampala Verified Refinery Cash Settlement (98.5%) */}
              {showKampalaRefinery && (
                <Line
                  type="monotone"
                  dataKey="kampalaVerifiedCash"
                  name="Kampala Verified Cash (98.5%)"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              )}

              {/* URA 5% Export Levy Landed Benchmark */}
              {showUraLanded && (
                <Line
                  type="monotone"
                  dataKey="uraClearedExport"
                  name="URA 5% Export Cleared"
                  stroke="#38BDF8"
                  strokeWidth={1.8}
                  strokeDasharray="4 4"
                  dot={false}
                />
              )}

              {/* Fraudulent FCO Bait Line (-18%) */}
              {showScamBaitLine && (
                <Line
                  type="monotone"
                  dataKey="fraudulentFcoBait"
                  name="Scam FCO Bait (-18%)"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Multi-Currency Live Parity Matrix Table */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-xs font-mono-data uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>
                Cross-Currency Physical Bullion Parity Matrix ({weightUnit === 'kg' ? 'Per 1 KG Bar · 999.9 Fine' : 'Per 1 Troy Oz'})
              </span>
            </h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Offers priced near the Red Scam Bait column require immediate forensic audit</span>
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B0F17] border-b border-slate-800 text-[11px] font-mono-data text-slate-400 uppercase">
                  <th className="py-2.5 px-3.5">Currency</th>
                  <th className="py-2.5 px-3.5 text-right">LBMA Spot (100%)</th>
                  <th className="py-2.5 px-3.5 text-right text-emerald-400">Kampala Verified (98.5%)</th>
                  <th className="py-2.5 px-3.5 text-right text-sky-300">URA Export Cleared (+5%)</th>
                  <th className="py-2.5 px-3.5 text-right text-rose-400">Illicit FCO Bait (-18%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs font-mono-data">
                {(Object.keys(CURRENCY_RATES) as Currency[]).map((code) => {
                  const meta = CURRENCY_RATES[code];
                  const mult = (weightUnit === 'kg' ? TROY_OZ_PER_KG : 1) * meta.rate;
                  const latestUsdOz = HISTORICAL_GOLD_USD_OZ[HISTORICAL_GOLD_USD_OZ.length - 1].usdPerOz;
                  const spot = Math.round(latestUsdOz * mult);
                  const kla = Math.round(spot * 0.985);
                  const ura = Math.round(spot * 1.035);
                  const scam = Math.round(spot * 0.82);
                  const isActiveRow = code === selectedCurrency;

                  return (
                    <tr
                      key={code}
                      onClick={() => setSelectedCurrency(code)}
                      className={`cursor-pointer transition-colors ${
                        isActiveRow ? 'bg-[#182232]/90' : 'bg-[#0E141F]/60 hover:bg-[#141C2B]'
                      }`}
                    >
                      <td className="py-2.5 px-3.5 font-bold text-white flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            isActiveRow
                              ? 'bg-[#D4AF37] text-[#0B0F17]'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {code}
                        </span>
                        <span className="text-slate-400 font-sans font-normal text-[11px]">
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-right font-bold text-white">
                        {formatPriceValue(spot, code)}
                      </td>
                      <td className="py-2.5 px-3.5 text-right text-emerald-400 font-semibold">
                        {formatPriceValue(kla, code)}
                      </td>
                      <td className="py-2.5 px-3.5 text-right text-sky-300">
                        {formatPriceValue(ura, code)}
                      </td>
                      <td className="py-2.5 px-3.5 text-right text-rose-400">
                        {formatPriceValue(scam, code)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
