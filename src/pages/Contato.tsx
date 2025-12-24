import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contato - Emannare | Agende sua Consulta</title>
        <meta
          name="description"
          content="Entre em contato conosco para agendar sua consulta de terapias integrativas. Atendemos em Porto Alegre, RS."
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-24 min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Estamos aqui para ajudá-lo em sua jornada de bem-estar. 
              Entre em contato para agendar sua consulta.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                  Informações de Contato
                </h2>

                <div className="space-y-6">
                  <a
                    href="https://wa.me/5551999010411"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground">WhatsApp</h3>
                      <p className="font-body text-muted-foreground">(51) 99901-0411</p>
                      <p className="font-body text-sm text-primary mt-1">Helena Cuppari</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5551993063122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground">WhatsApp</h3>
                      <p className="font-body text-muted-foreground">(51) 99306-3122</p>
                      <p className="font-body text-sm text-primary mt-1">Márcia Cristina Issa</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground">E-mail</h3>
                      <p className="font-body text-muted-foreground">contato@emannare.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground">Localização</h3>
                      <p className="font-body text-muted-foreground">Porto Alegre, RS</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground">Horário</h3>
                      <p className="font-body text-muted-foreground">Segunda a Sexta: 8h - 18h</p>
                      <p className="font-body text-muted-foreground">Sábado: 8h - 12h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                  Envie uma Mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="font-body text-sm font-medium text-foreground mb-2 block">
                      Nome completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="font-body text-sm font-medium text-foreground mb-2 block">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="font-body text-sm font-medium text-foreground mb-2 block">
                      Telefone / WhatsApp
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="(51) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="font-body text-sm font-medium text-foreground mb-2 block">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Como podemos ajudá-lo?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 font-body font-medium"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Enviar Mensagem
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contato;
