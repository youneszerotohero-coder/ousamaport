import Header from "./components/Header"
import Hero from "./pages/Hero"
import Services from "./components/Services"
import About from "./components/About"
import Portfolio from "./components/Portfolio"
import TestimonialsSection from "./components/TestimonialsSection"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

const App = () => {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </div>
  )
}

export default App