import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Download,
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Code2,
  Layers,
} from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Plataforma FinOps Cloud",
    description:
      "Herramienta de análisis y optimización de costes para entornos multi-cloud. Integración con AWS, GCP y Azure para monitorización en tiempo real.",
    tags: ["React", "Python", "AWS", "GCP", "Azure"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Dashboard de Infraestructura",
    description:
      "Panel de control centralizado para gestión de recursos cloud. Visualización de métricas, alertas automáticas y reportes de costes.",
    tags: ["TypeScript", "Terraform", "Kubernetes", "Grafana"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "API de Automatización CI/CD",
    description:
      "Sistema de integración y despliegue continuo con pipelines automatizados, pruebas de seguridad y despliegue multi-entorno.",
    tags: ["Node.js", "Docker", "Jenkins", "GitHub Actions"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Microservicios de Autenticación",
    description:
      "Arquitectura de microservicios con autenticación OAuth2, gestión de tokens JWT y rate limiting avanzado.",
    tags: ["Go", "Redis", "PostgreSQL", "OAuth2"],
    link: "#",
    github: "#",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  React: { bg: "#e0f7ff", text: "#0077B6" },
  Python: { bg: "#e8f4fd", text: "#023E8A" },
  AWS: { bg: "#fff3e0", text: "#e65100" },
  GCP: { bg: "#e8f5e9", text: "#2e7d32" },
  Azure: { bg: "#e3f2fd", text: "#1565c0" },
  TypeScript: { bg: "#e8eaf6", text: "#283593" },
  Terraform: { bg: "#f3e5f5", text: "#6a1b9a" },
  Kubernetes: { bg: "#e0f2f1", text: "#00695c" },
  Grafana: { bg: "#fce4ec", text: "#880e4f" },
  "Node.js": { bg: "#e8f5e9", text: "#1b5e20" },
  Docker: { bg: "#e3f2fd", text: "#0d47a1" },
  Jenkins: { bg: "#fbe9e7", text: "#bf360c" },
  "GitHub Actions": { bg: "#f3e5f5", text: "#4a148c" },
  Go: { bg: "#e0f7fa", text: "#006064" },
  Redis: { bg: "#ffebee", text: "#b71c1c" },
  PostgreSQL: { bg: "#e8eaf6", text: "#1a237e" },
  OAuth2: { bg: "#f9fbe7", text: "#558b2f" },
};

// Technology logos using inline SVG
const TECHNOLOGIES = [
  {
    name: "React",
    color: "#61DAFB",
    bg: "#E0F7FF",
    logo: (
      <svg viewBox="0 0 24 24" fill="#61DAFB" width="30" height="30">
        <circle cx="12" cy="11.998" r="2.14" />
        <path d="M12 6.578c3.968 0 7.67.742 10.438 1.985C25.184 9.897 27 11.653 27 13.42c0 1.837-1.92 3.678-5.005 4.967C19.2 19.63 15.661 20.4 12 20.4c-3.666 0-7.204-.77-9.995-2.013C-1.12 17.098-3 15.257-3 13.42c0-1.768 1.815-3.523 4.562-4.857C4.33 7.32 8.033 6.578 12 6.578zm0-1.5c-4.176 0-8.166.773-11.196 2.17C-2.534 8.694-4.5 10.904-4.5 13.42c0 2.591 2.086 4.872 5.563 6.324C4.138 21.176 7.958 21.9 12 21.9c4.037 0 7.857-.724 10.938-2.156C26.417 18.292 28.5 16.01 28.5 13.42c0-2.516-1.966-4.726-5.304-6.172C20.167 5.852 16.176 5.078 12 5.078z" transform="scale(0.445) translate(0,0)"/>
      </svg>
    ),
    simpleLogo: (
      <svg viewBox="-11.5 -10.232 23 20.463" fill="none" width="30" height="30">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120)"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    bg: "#E8F0FB",
    simpleLogo: (
      <svg viewBox="0 0 28 28" width="30" height="30">
        <rect width="28" height="28" rx="4" fill="#3178C6"/>
        <text x="4" y="21" fill="white" fontSize="15" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    name: "Python",
    color: "#3776AB",
    bg: "#EEF4FB",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.884S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963H5.77v-2.868s-.13-3.403 3.346-3.403h5.77s3.24.052 3.24-3.13V3.26S18.614 0 11.914 0zm-3.21 1.876a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z"/>
        <path fill="#FFD43B" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.137S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963H18.23v2.868s.13 3.403-3.346 3.403h-5.77s-3.24-.052-3.24 3.13V20.74S5.386 24 12.086 24zm3.21-1.876a1.047 1.047 0 1 1 0-2.094 1.047 1.047 0 0 1 0 2.094z"/>
      </svg>
    ),
  },
  {
    name: "AWS",
    color: "#FF9900",
    bg: "#FFF3E0",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
        <path fill="#FF9900" d="M20.869 16.09c-2.589 1.912-6.345 2.927-9.576 2.927-4.529 0-8.607-1.675-11.689-4.461-.24-.215-.024-.51.264-.343 3.328 1.931 7.44 3.098 11.689 3.098 2.866 0 6.016-.591 8.917-1.82.43-.191.8.28.395.599zm1.048-1.19c-.328-.423-2.168-.199-2.99-.1-.252.032-.29-.19-.064-.351 1.462-1.028 3.864-.734 4.143-.39.28.352-.072 2.786-1.44 3.948-.208.176-.409.08-.316-.151.307-.764.998-2.48.667-2.956z"/>
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    color: "#4285F4",
    bg: "#E8F0FE",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    name: "Azure",
    color: "#0078D4",
    bg: "#E3F2FD",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M13.05 4.24L6.56 18.05l-5.74.01 5.09-6.56-4.2-1.63L13.27 3l-.22 1.24zM13.63 5.19L22 19.86H8.9l7.03-3.11-5.62-6.94 3.32-4.62z" fill="#0078D4"/>
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "#2496ED",
    bg: "#E3F2FD",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.184.184 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.57.587-.914l.098-.288z"/>
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    bg: "#E8EFFE",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.494 3.43l2.28-1.882v-.027zm5.426 2.126a.44.44 0 0 0 .484-.606l.007-.01-.999-2.413a5.143 5.143 0 0 1 2.075 2.597l-2.578-.437-.004.005a.437.437 0 0 0 .015.864zM12 9.073a1.006 1.006 0 1 0 0-2.012A1.006 1.006 0 0 0 12 9.073zm0 7.927a1.006 1.006 0 1 0 0-2.013A1.006 1.006 0 0 0 12 17zm5.523-3.473a.44.44 0 0 0-.44-.44h-2.62a.44.44 0 0 0 0 .88h2.62a.44.44 0 0 0 .44-.44zm-7.506 0a.44.44 0 0 0-.44-.44H6.957a.44.44 0 0 0 0 .88h2.62a.44.44 0 0 0 .44-.44zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Terraform",
    color: "#7B42BC",
    bg: "#F3E8FE",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#7B42BC" d="M15.316 4.338l5.54 3.198v6.395l-5.54-3.199V4.338zm0 12.727l5.54-3.198V7.472L15.316 10.67v6.395zM8.368 7.536l5.54 3.199v6.395l-5.54-3.199V7.536zM0 7.472v6.395l5.54 3.198V10.67L0 7.472z"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "#339933",
    bg: "#E8F5E9",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#339933" d="M11.998.001a1.008 1.008 0 0 0-.504.135L1.24 5.932A1.01 1.01 0 0 0 .736 6.8v11.395c0 .357.19.686.504.869l10.254 5.796a1.008 1.008 0 0 0 1.008 0l10.254-5.796a1.01 1.01 0 0 0 .504-.869V6.8a1.01 1.01 0 0 0-.504-.869L12.502.136a1.008 1.008 0 0 0-.504-.135z"/>
        <path fill="#fff" d="M12 5.8l5.4 3.1v6.2L12 18.2l-5.4-3.1V8.9L12 5.8z"/>
        <text x="9" y="15" fill="#339933" fontSize="5" fontWeight="bold">JS</text>
      </svg>
    ),
  },
  {
    name: "Go",
    color: "#00ADD8",
    bg: "#E0F7FA",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <rect width="24" height="24" rx="4" fill="#00ADD8"/>
        <text x="3" y="17" fill="white" fontSize="12" fontWeight="bold" fontFamily="monospace">Go</text>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    bg: "#E8EEF6",
    simpleLogo: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#336791" d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.423.258 10.338.71 9.66 1.487c-.16-.055-.316-.112-.477-.159A10.814 10.814 0 0 0 8.013.943C5.395.943 3.17 2.91 2.14 5.772c-.777 2.193-.682 4.318.238 5.938.552.975 1.32 1.658 2.195 1.928-.016.125-.025.252-.025.38 0 1.217.579 2.232 1.537 2.7a2.97 2.97 0 0 0 2.724-.136c.116.26.286.484.505.657.743.588 1.73.75 2.675.75.396 0 .78-.04 1.138-.1a3.434 3.434 0 0 0 1.535.683 3.5 3.5 0 0 0 2.29-.55l.147.04c.552.145 1.072.21 1.554.21 1.504 0 2.67-.6 3.225-1.658.49-.94.45-2.099-.11-3.271.255-.266.455-.57.587-.914.263-.678.215-1.39-.142-1.99a2.645 2.645 0 0 0-.245-.326c.07-.195.124-.397.162-.6.189-1.004.032-2.017-.505-2.872C19.773.982 18.516.116 17.128 0z"/>
      </svg>
    ),
  },
];

const CV_CONTENT = `JAVI PLAZA
Desarrollador Cloud & FinOps Specialist

──────────────────────────────────────
EXPERIENCIA
──────────────────────────────────────

Cloud Engineer Senior · TechCloud SL (2022 - Presente)
• Diseño e implementación de arquitecturas multi-cloud
• Optimización de costes cloud mediante prácticas FinOps
• Liderazgo técnico en proyectos de migración a la nube

DevOps Engineer · Innovatech (2020 - 2022)
• Automatización de pipelines CI/CD con Jenkins y GitHub Actions
• Gestión de infraestructura como código con Terraform
• Implementación de Kubernetes para orquestación de contenedores

──────────────────────────────────────
EDUCACIÓN
──────────────────────────────────────

Grado en Ingeniería Informática
Universidad Politécnica de Madrid · 2016 - 2020

──────────────────────────────────────
CERTIFICACIONES
──────────────────────────────────────

• AWS Certified Solutions Architect – Professional
• Google Cloud Professional Cloud Architect
• Microsoft Azure Solutions Architect Expert
• FinOps Certified Practitioner (FinOps Foundation)

──────────────────────────────────────
IDIOMAS
──────────────────────────────────────

• Español: Nativo
• Inglés: C1 (Avanzado)`;

export function SobreMi() {
  const [cvOpen, setCvOpen] = useState(false);

  const handleDownloadCV = () => {
    const blob = new Blob([CV_CONTENT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CV_Javi_Plaza.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ backgroundColor: "#CAF0F8" }} className="min-h-screen">
      {/* Header */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-2xl border-4"
            style={{ backgroundColor: "#00B4D8", borderColor: "#90E0EF", fontSize: "2.5rem", fontWeight: 700 }}
          >
            J
          </div>
          <h1 style={{ color: "#CAF0F8", fontSize: "2.5rem", fontWeight: 700 }}>Sobre Mí</h1>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "#90E0EF" }}>
            Soy un desarrollador apasionado por el cloud computing, FinOps y la automatización. Me encanta
            construir soluciones escalables y eficientes.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0077B6" }}
            >
              <Code2 size={20} color="white" />
            </div>
            <h2 style={{ color: "#023E8A", fontSize: "1.8rem", fontWeight: 700 }}>Proyectos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "white", border: "1px solid #90E0EF" }}
              >
                <h3 style={{ color: "#023E8A", fontWeight: 600, fontSize: "1.1rem" }}>{project.title}</h3>
                <p className="mt-2 mb-4 text-sm leading-relaxed" style={{ color: "#0077B6" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => {
                    const color = TAG_COLORS[tag] || { bg: "#e0f2fe", text: "#0369a1" };
                    return (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: color.bg, color: color.text }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-1 text-sm transition-colors duration-200"
                    style={{ color: "#0077B6" }}
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a
                    href={project.link}
                    className="flex items-center gap-1 text-sm transition-colors duration-200"
                    style={{ color: "#00B4D8" }}
                  >
                    <ExternalLink size={15} /> Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CV Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0077B6" }}
            >
              <Download size={20} color="white" />
            </div>
            <h2 style={{ color: "#023E8A", fontSize: "1.8rem", fontWeight: 700 }}>Currículum Vitae</h2>
          </div>

          <div
            className="rounded-2xl p-8 shadow-md"
            style={{ backgroundColor: "white", border: "1px solid #90E0EF" }}
          >
            <p className="mb-6" style={{ color: "#0077B6" }}>
              Descarga mi CV o despliégalo aquí mismo para conocer mi trayectoria profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all duration-200"
                style={{ backgroundColor: "#0077B6", color: "white", fontWeight: 600 }}
              >
                <Download size={18} />
                Descargar CV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCvOpen(!cvOpen)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
                style={{ borderColor: "#0077B6", color: "#0077B6", backgroundColor: "transparent", fontWeight: 600 }}
              >
                {cvOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                {cvOpen ? "Ocultar CV" : "Ver CV aquí"}
              </motion.button>
            </div>

            <AnimatePresence>
              {cvOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <pre
                    className="mt-6 p-6 rounded-xl text-sm leading-relaxed whitespace-pre-wrap font-mono"
                    style={{ backgroundColor: "#CAF0F8", color: "#023E8A", border: "1px solid #90E0EF" }}
                  >
                    {CV_CONTENT}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Technologies Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0077B6" }}
            >
              <Layers size={20} color="white" />
            </div>
            <h2 style={{ color: "#023E8A", fontSize: "1.8rem", fontWeight: 700 }}>Tecnologías</h2>
          </div>

          <div
            className="rounded-2xl p-8 shadow-md"
            style={{ backgroundColor: "white", border: "1px solid #90E0EF" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {TECHNOLOGIES.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-default transition-all duration-200"
                  style={{
                    backgroundColor: tech.bg,
                    border: `1.5px solid ${tech.color}30`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: "white" }}
                  >
                    {tech.simpleLogo}
                  </div>
                  <span
                    className="text-xs text-center leading-tight"
                    style={{ color: "#023E8A", fontWeight: 600 }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
