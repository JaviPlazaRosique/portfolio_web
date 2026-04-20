import { useNavigate } from "react-router";
import { useState } from "react";
import { Mail, User, MessageSquare, Send, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const CONTACT_LINKS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label: "Email",
    value: "j.plazarosique@gmail.com",
    href: "mailto:j.plazarosique@gmail.com",
    color: "#0077B6",
    bg: "#E3F4FB",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    label: "GitHub",
    value: "JaviPlazaRosique",
    href: "https://github.com/JaviPlazaRosique",
    color: "#1a1919",
    bg: "#F0F0F0",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "in/javiplaza",
    href: "https://www.linkedin.com/in/javiplaza",
    color: "#0A66C2",
    bg: "#E8F0FA",
  },
];

export function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "#CAF0F8" }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#90E0EF" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full opacity-5"
          style={{ backgroundColor: "#CAF0F8" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Avatar */}
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Foto de perfil de Javi Plaza"
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-2xl border-4"
            style={{ borderColor: "#90E0EF" }}
          />

          <h1
            className="mb-4 tracking-tight"
            style={{ color: "#CAF0F8", fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            Web de Javi Plaza
          </h1>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "#90E0EF", fontSize: "1.2rem" }}>
            Data Engineer apasionado con la tecnología y la innovación digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/sobre-mi")}
              className="px-8 py-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "#CAF0F8", color: "#023E8A", fontWeight: 600 }}
            >
              Sobre Mí
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/calculadora-finops")}
              className="px-8 py-4 rounded-xl border-2 shadow-lg transition-all duration-200 cursor-pointer"
              style={{ borderColor: "#CAF0F8", color: "#CAF0F8", backgroundColor: "transparent", fontWeight: 600 }}
            >
              Calculadora FinOps
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: "#90E0EF" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6" style={{ backgroundColor: "#CAF0F8" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: "#90E0EF", color: "#023E8A" }}
            >
              <Mail size={16} />
              <span className="text-sm font-medium">Contacto</span>
            </div>
            <h2 style={{ color: "#023E8A", fontSize: "2rem", fontWeight: 700 }}>¿Hablamos?</h2>
            <p className="mt-2" style={{ color: "#0077B6" }}>
              Encuéntrame en cualquiera de estas plataformas o escríbeme directamente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: contact links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              {CONTACT_LINKS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-5 rounded-2xl p-5 shadow-md group"
                  style={{ backgroundColor: "white", border: `1.5px solid ${item.color}25`, textDecoration: "none" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#90A4B4" }}>
                      {item.label}
                    </p>
                    <p className="font-semibold" style={{ color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: item.color }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 shadow-xl"
                style={{ backgroundColor: "white" }}
              >
                <div className="mb-5">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ color: "#023E8A" }}>
                    <User size={15} />
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200"
                    style={{ borderColor: "#90E0EF", color: "#023E8A", backgroundColor: "#f9fffe" }}
                    onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                    onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                  />
                </div>

                <div className="mb-5">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ color: "#023E8A" }}>
                    <Mail size={15} />
                    Tu email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200"
                    style={{ borderColor: "#90E0EF", color: "#023E8A", backgroundColor: "#f9fffe" }}
                    onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                    onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                  />
                </div>

                <div className="mb-7">
                  <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ color: "#023E8A" }}>
                    <MessageSquare size={15} />
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Escribe tu mensaje aquí..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 resize-none"
                    style={{ borderColor: "#90E0EF", color: "#023E8A", backgroundColor: "#f9fffe" }}
                    onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                    onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0077B6", color: "white", fontWeight: 600 }}
                >
                  {status === "sending" ? (
                    <span>Enviando...</span>
                  ) : status === "success" ? (
                    <span>¡Mensaje enviado!</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </motion.button>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-4 text-sm"
                    style={{ color: "#0077B6" }}
                  >
                    Gracias por tu mensaje. Te responderé pronto 👋
                  </motion.p>
                )}

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-4 text-sm"
                    style={{ color: "#d62828" }}
                  >
                    No se pudo enviar el mensaje. Inténtalo de nuevo.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}