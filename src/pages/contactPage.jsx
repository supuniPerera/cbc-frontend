import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="w-full text-white space-y-24 py-10 px-4 md:px-0 relative">

      {/* Hero Section */}
      <section className="text-center space-y-8 animate-fade-in">
        <span className="
            inline-block px-6 py-2 text-xs font-bold tracking-[0.2em]
            rounded-full bg-white/5 text-[var(--color-accent)]
            border border-[var(--color-accent)]/30 backdrop-blur-sm
            uppercase
          ">
          Connect With Us
        </span>

        <h1 className="
            text-5xl md:text-7xl font-black tracking-tight
            text-transparent bg-clip-text
            bg-gradient-to-b from-white via-white to-[var(--color-accent)]
          ">
          Let's Talk Beauty
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary/80 leading-relaxed font-medium">
          Have a question or want to visit us? We’re always here to help you shine.
        </p>
      </section>

      {/* Contact Content Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch relative z-10">
        
        {/* Contact Info Card */}
        <div className="
            space-y-10 p-10 rounded-[2.5rem]
            bg-white/[0.03] backdrop-blur-xl
            border border-white/10 flex flex-col justify-between
          ">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white">Contact Details</h2>
            <p className="text-primary/70 leading-relaxed">
              Reach out to us directly through any of these channels.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <FaMapMarkerAlt className="text-[var(--color-accent)] text-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase tracking-widest">Our Studio</p>
                <p className="text-lg font-semibold text-white">Colombo, Sri Lanka</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <FaPhoneAlt className="text-[var(--color-accent)] text-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase tracking-widest">Call Us</p>
                <p className="text-lg font-semibold text-white">+94 75 XXX XXXX</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <FaEnvelope className="text-[var(--color-accent)] text-xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary/50 uppercase tracking-widest">Email Address</p>
                <p className="text-lg font-semibold text-white">support@crystalbeauty.com</p>
              </div>
            </div>
          </div>

          <div className="pt-8 opacity-20">
             <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
          </div>
        </div>

        {/* Quick Action Card (WhatsApp Only) */}
        <div className="
            space-y-10 p-10 rounded-[2.5rem]
            bg-white/[0.05] backdrop-blur-2xl
            border border-white/20 shadow-2xl flex flex-col justify-center
          ">
          <div className="text-center space-y-8">
            <div className="mx-auto w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-[#25D366] text-4xl" />
            </div>
            
            <div className="space-y-4">
                <h2 className="text-3xl font-black text-white">Direct Support</h2>
                <p className="text-primary/70 max-w-xs mx-auto">
                  Click the button below to start a conversation with our beauty experts.
                </p>
            </div>
            
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="
                flex items-center justify-center gap-4 w-full py-6 rounded-2xl 
                bg-[#25D366] text-white font-black text-xl
                hover:scale-[1.03] transition-all duration-300 
                shadow-[0_20px_40px_-15px_rgba(37,211,102,0.4)]
                active:scale-95
              "
            >
              <FaWhatsapp className="text-3xl" />
              Chat on WhatsApp
            </a>
            
            <p className="text-xs text-primary/40 uppercase tracking-[0.2em]">Typically replies within minutes</p>
          </div>
        </div>
      </section>

      {/* Decorative Blur Backgrounds */}
      <div className="fixed top-1/4 -left-20 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

    </div>
  );
}