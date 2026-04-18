import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, HardDrive, Wifi, BarChart3, TrendingDown, AlertCircle, Info } from "lucide-react";

// ─── PRICING DATA ────────────────────────────────────────────────────────────
const INSTANCE_TYPES = {
  aws: [
    { id: "t3.small",    label: "Small (2 vCPU, 2GB RAM)",   priceHour: 0.0208 },
    { id: "t3.medium",   label: "Medium (2 vCPU, 4GB RAM)",  priceHour: 0.0416 },
    { id: "m5.large",    label: "Large (2 vCPU, 8GB RAM)",   priceHour: 0.096  },
    { id: "m5.xlarge",   label: "XLarge (4 vCPU, 16GB RAM)", priceHour: 0.192  },
    { id: "m5.2xlarge",  label: "2XLarge (8 vCPU, 32GB RAM)",priceHour: 0.384  },
  ],
  gcp: [
    { id: "e2-small",    label: "Small (2 vCPU, 2GB RAM)",   priceHour: 0.0175 },
    { id: "e2-medium",   label: "Medium (2 vCPU, 4GB RAM)",  priceHour: 0.0350 },
    { id: "n1-standard-2",label: "Large (2 vCPU, 7.5GB RAM)",priceHour: 0.0950 },
    { id: "n1-standard-4",label: "XLarge (4 vCPU, 15GB RAM)",priceHour: 0.1900 },
    { id: "n1-standard-8",label: "2XLarge (8 vCPU, 30GB RAM)",priceHour: 0.3800 },
  ],
  azure: [
    { id: "B2s",         label: "Small (2 vCPU, 4GB RAM)",   priceHour: 0.0416 },
    { id: "B2ms",        label: "Medium (2 vCPU, 8GB RAM)",  priceHour: 0.0832 },
    { id: "D2s_v3",      label: "Large (2 vCPU, 8GB RAM)",   priceHour: 0.096  },
    { id: "D4s_v3",      label: "XLarge (4 vCPU, 16GB RAM)", priceHour: 0.192  },
    { id: "D8s_v3",      label: "2XLarge (8 vCPU, 32GB RAM)",priceHour: 0.384  },
  ],
};

const STORAGE_TYPES = {
  aws: [
    { id: "s3-standard",   label: "S3 Standard",        priceGB: 0.023  },
    { id: "s3-ia",         label: "S3 Infrequent Access",priceGB: 0.0125 },
    { id: "s3-glacier",    label: "S3 Glacier",          priceGB: 0.004  },
    { id: "ebs-gp3",       label: "EBS gp3 (SSD)",       priceGB: 0.08   },
  ],
  gcp: [
    { id: "gcs-standard",  label: "Standard Storage",    priceGB: 0.02   },
    { id: "gcs-nearline",  label: "Nearline Storage",    priceGB: 0.01   },
    { id: "gcs-coldline",  label: "Coldline Storage",    priceGB: 0.004  },
    { id: "pd-ssd",        label: "Persistent Disk SSD", priceGB: 0.17   },
  ],
  azure: [
    { id: "blob-hot",      label: "Blob Hot",            priceGB: 0.018  },
    { id: "blob-cool",     label: "Blob Cool",           priceGB: 0.01   },
    { id: "blob-archive",  label: "Blob Archive",        priceGB: 0.00099},
    { id: "disk-premium",  label: "Managed Disk Premium",priceGB: 0.135  },
  ],
};

const TRANSFER_PRICES = {
  aws:   { first10TB: 0.09,  next40TB: 0.085, over50TB: 0.07  },
  gcp:   { first10TB: 0.08,  next40TB: 0.06,  over50TB: 0.05  },
  azure: { first10TB: 0.087, next40TB: 0.083, over50TB: 0.07  },
};

const PROVIDERS = [
  { key: "aws",   label: "Amazon Web Services (AWS)", color: "#FF9900", bg: "#FFF3E0" },
  { key: "gcp",   label: "Google Cloud Platform (GCP)", color: "#4285F4", bg: "#E8F0FE" },
  { key: "azure", label: "Microsoft Azure",  color: "#0078D4", bg: "#E3F2FD" },
] as const;
type ProviderKey = "aws" | "gcp" | "azure";

const TABS = [
  { id: "compute",  label: "Cómputo",            icon: <Cloud size={16} /> },
  { id: "storage",  label: "Almacenamiento",      icon: <HardDrive size={16} /> },
  { id: "transfer", label: "Transferencia",       icon: <Wifi size={16} /> },
  { id: "multicloud",label: "Multi-Cloud",        icon: <BarChart3 size={16} /> },
] as const;
type TabId = typeof TABS[number]["id"];

// ─── SELECT COMPONENT ─────────────────────────────────────────────────────────
function StyledSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest uppercase" style={{ color: "#0077B6" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 cursor-pointer appearance-none"
        style={{
          borderColor: "#90E0EF",
          color: "#023E8A",
          backgroundColor: "white",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230077B6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#0077B6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#90E0EF")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── NUMBER INPUT ─────────────────────────────────────────────────────────────
function NumberInput({
  label,
  value,
  onChange,
  min = 1,
  max = 9999,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs tracking-widest uppercase" style={{ color: "#0077B6" }}>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
          className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200"
          style={{
            borderColor: "#90E0EF",
            color: "#023E8A",
            backgroundColor: "white",
            paddingRight: unit ? "52px" : "16px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
          onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
        />
        {unit && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "#90E0EF" }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── RESULT CARD ──────────────────────────────────────────────────────────────
function ResultCard({
  title,
  provider,
  instances,
  onDemand,
  reserved,
  spot,
  savingsReserved,
  savingsSpot,
  tips,
}: {
  title: string;
  provider: ProviderKey;
  instances?: number;
  onDemand: number;
  reserved: number;
  spot: number;
  savingsReserved: number;
  savingsSpot: number;
  tips: string[];
}) {
  const prov = PROVIDERS.find((p) => p.key === provider)!;
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{ border: `2px solid ${prov.color}40` }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{ backgroundColor: "#023E8A" }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#00B4D8" }}
        />
        <span className="text-xs tracking-widest uppercase" style={{ color: "#90E0EF" }}>
          {title}
          {instances && instances > 1 ? ` · ${instances} Instancias` : ""}
        </span>
      </div>

      {/* Pricing columns */}
      <div
        className="grid grid-cols-3 gap-px"
        style={{ backgroundColor: "#90E0EF20" }}
      >
        {/* On-demand */}
        <div className="p-5" style={{ backgroundColor: "white" }}>
          <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: "#0077B6" }}>
            On-Demand
          </p>
          <p className="text-2xl font-bold" style={{ color: "#023E8A" }}>
            {fmt(onDemand)}
          </p>
          <p className="text-xs mt-1" style={{ color: "#90E0EF" }}>
            ${(onDemand / (instances || 1) / 720).toFixed(4)}/hora · inst.
          </p>
        </div>

        {/* Reserved */}
        <div className="p-5" style={{ backgroundColor: "white" }}>
          <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: "#0077B6" }}>
            Reserved (1 año)
          </p>
          <p className="text-2xl font-bold" style={{ color: "#00B4D8" }}>
            {fmt(reserved)}
          </p>
          <p className="text-xs mt-1" style={{ color: "#90E0EF" }}>
            Ahorro: {fmt(savingsReserved)}/mes
          </p>
        </div>

        {/* Spot */}
        <div className="p-5" style={{ backgroundColor: "white" }}>
          <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: "#0077B6" }}>
            Spot / Preemptible
          </p>
          <p className="text-2xl font-bold" style={{ color: "#0077B6" }}>
            {fmt(spot)}
          </p>
          <p className="text-xs mt-1" style={{ color: "#90E0EF" }}>
            Ahorro: {fmt(savingsSpot)}/mes
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 py-4 space-y-2" style={{ backgroundColor: "#CAF0F820" }}>
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#023E8A" }}>
            <TrendingDown size={14} className="mt-0.5 shrink-0" style={{ color: "#0077B6" }} />
            <span dangerouslySetInnerHTML={{ __html: tip }} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── COMPUTE TAB ──────────────────────────────────────────────────────────────
function ComputeTab() {
  const [provider, setProvider] = useState<ProviderKey>("aws");
  const [instanceIdx, setInstanceIdx] = useState("0");
  const [hours, setHours] = useState(720);
  const [instances, setInstances] = useState(1);

  const selectedInstance = INSTANCE_TYPES[provider][Number(instanceIdx)];
  const basePrice = selectedInstance.priceHour * hours * instances;
  const reserved = basePrice * 0.62;
  const spot = basePrice * 0.30;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Proveedor Cloud"
          value={provider}
          onChange={(v) => { setProvider(v as ProviderKey); setInstanceIdx("0"); }}
          options={PROVIDERS.map((p) => ({ value: p.key, label: p.label }))}
        />
        <StyledSelect
          label="Tipo de Instancia"
          value={instanceIdx}
          onChange={setInstanceIdx}
          options={INSTANCE_TYPES[provider].map((inst, i) => ({ value: String(i), label: inst.label }))}
        />
        <NumberInput label="Horas/Mes" value={hours} onChange={setHours} min={1} max={744} unit="h" />
        <NumberInput label="Número de Instancias" value={instances} onChange={setInstances} min={1} max={500} unit="inst." />
      </div>

      <ResultCard
        title={`Estimación Mensual · ${provider.toUpperCase()}`}
        provider={provider}
        instances={instances}
        onDemand={basePrice}
        reserved={reserved}
        spot={spot}
        savingsReserved={basePrice - reserved}
        savingsSpot={basePrice - spot}
        tips={[
          `Usa <strong>Reserved Instances</strong> para workloads 24/7 — ahorra ${((basePrice - reserved) * 12).toFixed(0)}$/año con compromiso de 1 año.`,
          `<strong>Spot/Preemptible instances</strong> ideales para batch jobs — hasta 70% menos coste, acepta interrupciones.`,
          `Configura <strong>auto-scaling</strong> y apaga instancias fuera de horario laboral para reducir horas facturables.`,
        ]}
      />
    </div>
  );
}

// ─── STORAGE TAB ──────────────────────────────────────────────────────────────
function StorageTab() {
  const [provider, setProvider] = useState<ProviderKey>("aws");
  const [storageIdx, setStorageIdx] = useState("0");
  const [sizeGB, setSizeGB] = useState(500);

  const selectedType = STORAGE_TYPES[provider][Number(storageIdx)];
  const basePrice = selectedType.priceGB * sizeGB;
  const reserved = basePrice * 0.8;
  const spot = basePrice * 0.6;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Proveedor Cloud"
          value={provider}
          onChange={(v) => { setProvider(v as ProviderKey); setStorageIdx("0"); }}
          options={PROVIDERS.map((p) => ({ value: p.key, label: p.label }))}
        />
        <StyledSelect
          label="Tipo de Almacenamiento"
          value={storageIdx}
          onChange={setStorageIdx}
          options={STORAGE_TYPES[provider].map((t, i) => ({ value: String(i), label: t.label }))}
        />
        <NumberInput label="Capacidad (GB)" value={sizeGB} onChange={setSizeGB} min={1} max={1000000} unit="GB" />
      </div>

      <ResultCard
        title={`Estimación Mensual · ${provider.toUpperCase()} · ${selectedType.label}`}
        provider={provider}
        onDemand={basePrice}
        reserved={reserved}
        spot={spot}
        savingsReserved={basePrice - reserved}
        savingsSpot={basePrice - spot}
        tips={[
          `Usa <strong>almacenamiento de acceso infrecuente</strong> para datos que no accedes a diario — ahorra hasta un 45%.`,
          `<strong>Comprime y deduplica</strong> datos antes de subirlos para reducir el volumen almacenado.`,
          `Implementa <strong>políticas de ciclo de vida</strong> para mover datos a clases más baratas automáticamente.`,
        ]}
      />
    </div>
  );
}

// ─── TRANSFER TAB ─────────────────────────────────────────────────────────────
function TransferTab() {
  const [provider, setProvider] = useState<ProviderKey>("aws");
  const [gbOut, setGbOut] = useState(1000);
  const [gbIn, setGbIn] = useState(100);

  const prices = TRANSFER_PRICES[provider];
  const calcCost = (gb: number): number => {
    if (gb <= 0) return 0;
    const first = Math.min(gb, 10240);
    const second = Math.min(Math.max(gb - 10240, 0), 40960);
    const third = Math.max(gb - 51200, 0);
    return first * prices.first10TB + second * prices.next40TB + third * prices.over50TB;
  };

  const outCost = calcCost(gbOut);
  const inCost = 0; // Ingress is free for all major providers
  const total = outCost + inCost;
  const reserved = total * 0.75;
  const spot = total * 0.55;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Proveedor Cloud"
          value={provider}
          onChange={(v) => setProvider(v as ProviderKey)}
          options={PROVIDERS.map((p) => ({ value: p.key, label: p.label }))}
        />
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-2"
          style={{ backgroundColor: "#CAF0F8", border: "1px solid #90E0EF" }}
        >
          <Info size={16} style={{ color: "#0077B6" }} />
          <span className="text-sm" style={{ color: "#023E8A" }}>
            La transferencia <strong>entrante</strong> es gratuita en todos los proveedores.
          </span>
        </div>
        <NumberInput label="Datos Salientes (GB)" value={gbOut} onChange={setGbOut} min={0} max={1000000} unit="GB" />
        <NumberInput label="Datos Entrantes (GB)" value={gbIn} onChange={setGbIn} min={0} max={1000000} unit="GB" />
      </div>

      <ResultCard
        title={`Estimación Mensual · ${provider.toUpperCase()} · Transferencia`}
        provider={provider}
        onDemand={total}
        reserved={reserved}
        spot={spot}
        savingsReserved={total - reserved}
        savingsSpot={total - spot}
        tips={[
          `Usa <strong>CDN</strong> (CloudFront, Cloud CDN, Azure CDN) para cachear contenido estático y reducir la transferencia de origen.`,
          `Mantén el tráfico <strong>dentro de la misma región</strong> para evitar cargos entre zonas de disponibilidad.`,
          `Considera usar <strong>AWS Direct Connect / Cloud Interconnect / ExpressRoute</strong> para tráfico alto: reduce costes hasta un 25%.`,
        ]}
      />
    </div>
  );
}

// ─── MULTI-CLOUD TAB ──────────────────────────────────────────────────────────
function MultiCloudTab() {
  const [instanceIdx, setInstanceIdx] = useState("2"); // Large by default
  const [hours, setHours] = useState(720);
  const [instances, setInstances] = useState(3);

  const results = useMemo(() => {
    return PROVIDERS.map((prov) => {
      const inst = INSTANCE_TYPES[prov.key][Number(instanceIdx)] || INSTANCE_TYPES[prov.key][2];
      const base = inst.priceHour * hours * instances;
      return { ...prov, label2: inst.label, base, reserved: base * 0.62, spot: base * 0.30 };
    });
  }, [instanceIdx, hours, instances]);

  const cheapest = results.reduce((min, r) => (r.base < min.base ? r : min), results[0]);
  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StyledSelect
          label="Tipo de Instancia (equivalente)"
          value={instanceIdx}
          onChange={setInstanceIdx}
          options={INSTANCE_TYPES.aws.map((inst, i) => ({ value: String(i), label: inst.label }))}
        />
        <NumberInput label="Horas/Mes" value={hours} onChange={setHours} min={1} max={744} unit="h" />
        <NumberInput label="Nº de Instancias" value={instances} onChange={setInstances} min={1} max={500} unit="inst." />
      </div>

      {/* Best option banner */}
      <div
        className="rounded-xl px-5 py-4 flex items-center gap-3"
        style={{ background: "linear-gradient(90deg, #023E8A, #0077B6)", color: "white" }}
      >
        <TrendingDown size={22} style={{ color: "#90E0EF" }} />
        <div>
          <p className="text-xs" style={{ color: "#90E0EF" }}>Opción más económica (On-Demand)</p>
          <p className="font-bold" style={{ color: "#CAF0F8" }}>
            {cheapest.label} — {fmt(cheapest.base)}/mes
          </p>
        </div>
      </div>

      {/* Provider comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((r, i) => {
          const isCheapest = r.key === cheapest.key;
          return (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden shadow-md"
              style={{
                border: isCheapest ? `2px solid ${r.color}` : `1px solid #90E0EF`,
                boxShadow: isCheapest ? `0 4px 24px ${r.color}30` : undefined,
              }}
            >
              <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: r.bg }}>
                <span style={{ color: r.color, fontWeight: 700 }}>{r.key.toUpperCase()}</span>
                {isCheapest && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: r.color, color: "white" }}
                  >
                    Mejor precio
                  </span>
                )}
              </div>
              <div className="p-5 space-y-3" style={{ backgroundColor: "white" }}>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#0077B6" }}>On-Demand</span>
                  <span style={{ color: "#023E8A", fontWeight: 700 }}>{fmt(r.base)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#0077B6" }}>Reserved 1 año</span>
                  <span style={{ color: "#00B4D8", fontWeight: 700 }}>{fmt(r.reserved)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#0077B6" }}>Spot</span>
                  <span style={{ color: "#0077B6", fontWeight: 700 }}>{fmt(r.spot)}</span>
                </div>
                {/* bar */}
                <div className="w-full h-1.5 rounded-full mt-1" style={{ backgroundColor: "#CAF0F8" }}>
                  <motion.div
                    animate={{ width: `${Math.max(5, (r.base / Math.max(...results.map((x) => x.base))) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        className="rounded-xl p-4 flex items-start gap-2 text-xs"
        style={{ backgroundColor: "#90E0EF30", color: "#0077B6", border: "1px solid #90E0EF" }}
      >
        <AlertCircle size={14} className="shrink-0 mt-0.5" />
        <span>
          Los precios son aproximados y pueden variar según región, contrato y descuentos por volumen.
          Las instancias equivalentes entre proveedores no son idénticas en rendimiento.
        </span>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function CalculadoraFinOps() {
  const [activeTab, setActiveTab] = useState<TabId>("compute");

  return (
    <div style={{ backgroundColor: "#CAF0F8" }} className="min-h-screen">
      {/* Header */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Cloud size={34} color="#90E0EF" />
            <h1 style={{ color: "#CAF0F8", fontSize: "2.4rem", fontWeight: 700 }}>
              Calculadora FinOps
            </h1>
          </div>
          <p className="max-w-2xl mx-auto" style={{ color: "#90E0EF" }}>
            Estima y compara costes cloud en <strong style={{ color: "#CAF0F8" }}>AWS, GCP y Azure</strong> para
            cómputo, almacenamiento, transferencia de datos y más.
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{ backgroundColor: "white", border: "1px solid #90E0EF" }}
        >
          {/* Tab bar */}
          <div
            className="flex overflow-x-auto"
            style={{ borderBottom: "2px solid #CAF0F8" }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all duration-200 cursor-pointer relative"
                  style={{
                    color: isActive ? "#0077B6" : "#90E0EF",
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: "transparent",
                    borderBottom: isActive ? "3px solid #0077B6" : "3px solid transparent",
                    marginBottom: "-2px",
                  }}
                >
                  {tab.icon}
                  <span className="text-sm uppercase tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "compute"   && <ComputeTab />}
                {activeTab === "storage"   && <StorageTab />}
                {activeTab === "transfer"  && <TransferTab />}
                {activeTab === "multicloud"&& <MultiCloudTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global disclaimer */}
        <p className="text-center text-xs mt-6" style={{ color: "#0077B6" }}>
          ⚠️ Precios orientativos. Consulta{" "}
          <a href="https://aws.amazon.com/pricing/" target="_blank" rel="noreferrer" style={{ color: "#0077B6", textDecoration: "underline" }}>AWS</a>,{" "}
          <a href="https://cloud.google.com/pricing" target="_blank" rel="noreferrer" style={{ color: "#0077B6", textDecoration: "underline" }}>GCP</a> y{" "}
          <a href="https://azure.microsoft.com/pricing/" target="_blank" rel="noreferrer" style={{ color: "#0077B6", textDecoration: "underline" }}>Azure</a>{" "}
          para precios actualizados.
        </p>
      </div>
    </div>
  );
}
