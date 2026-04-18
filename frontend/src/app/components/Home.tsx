import { useNavigate } from "react-router";
import { useState } from "react";
import { Mail, Phone, User, MessageSquare, Send, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", contactType: "email", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", contactType: "email", contact: "", message: "" });
    }, 3000);
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
          <div
            className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border-4"
            style={{ backgroundColor: "#00B4D8", borderColor: "#90E0EF" }}
          >
            <span className="text-white" style={{ fontSize: "3rem", fontWeight: 700 }}>J</span>
          </div>

          <h1
            className="mb-4 tracking-tight"
            style={{ color: "#CAF0F8", fontSize: "3.5rem", fontWeight: 700, lineHeight: 1.2 }}
          >
            Web de Javi Plaza
          </h1>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "#90E0EF", fontSize: "1.2rem" }}>
            Desarrollador apasionado por la tecnología cloud, el FinOps y la innovación digital.
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ backgroundColor: "#90E0EF", color: "#023E8A" }}
              >
                <Mail size={16} />
                <span className="text-sm font-medium">Contacto</span>
              </div>
              <h2 style={{ color: "#023E8A", fontSize: "2rem", fontWeight: 700 }}>
                ¿Hablamos?
              </h2>
              <p className="mt-2" style={{ color: "#0077B6" }}>
                Rellena el formulario y me pondré en contacto contigo lo antes posible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 shadow-xl"
              style={{ backgroundColor: "white" }}
            >
              {/* Name */}
              <div className="mb-5">
                <label className="flex items-center gap-2 mb-2" style={{ color: "#023E8A" }}>
                  <User size={16} />
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200"
                  style={{
                    borderColor: "#90E0EF",
                    color: "#023E8A",
                    backgroundColor: "#f9fffe",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                  onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                />
              </div>

              {/* Contact */}
              <div className="mb-5">
                <label className="flex items-center gap-2 mb-2" style={{ color: "#023E8A" }}>
                  <Phone size={16} />
                  Método de contacto
                </label>
                <div className="flex gap-3 mb-3">
                  <select
                    value={form.contactType}
                    onChange={(e) => setForm({ ...form, contactType: e.target.value, contact: "" })}
                    className="px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: "#90E0EF",
                      color: "#023E8A",
                      backgroundColor: "#f9fffe",
                      minWidth: "140px",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0077B6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#90E0EF")}
                  >
                    <option value="email">Email</option>
                    <option value="telefono">Teléfono</option>
                  </select>
                  <input
                    type={form.contactType === "email" ? "email" : "tel"}
                    required
                    placeholder={form.contactType === "email" ? "tucorreo@ejemplo.com" : "+34 600 000 000"}
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200"
                    style={{
                      borderColor: "#90E0EF",
                      color: "#023E8A",
                      backgroundColor: "#f9fffe",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                    onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-7">
                <label className="flex items-center gap-2 mb-2" style={{ color: "#023E8A" }}>
                  <MessageSquare size={16} />
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 resize-none"
                  style={{
                    borderColor: "#90E0EF",
                    color: "#023E8A",
                    backgroundColor: "#f9fffe",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0077B6")}
                  onBlur={(e) => (e.target.style.borderColor = "#90E0EF")}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: "#0077B6", color: "white", fontWeight: 600 }}
              >
                {submitted ? (
                  <>
                    <span>¡Mensaje enviado!</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4 text-sm"
                  style={{ color: "#0077B6" }}
                >
                  Gracias por tu mensaje. Te responderé pronto 👋
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}