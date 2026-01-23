import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";

export default function HomePage() {
  return (

    <div className="relative min-h-screen w-full bg-[url('/homePageImage.png')] bg-cover bg-center bg-fixed">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-8 md:px-8 lg:px-12">
          
          {/* Glassmorphism Effect */}
          <div className="w-full h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:p-10 shadow-2xl">
            
            <Routes>
              <Route path="/" element={
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <h1 className="text-3xl md:text-6xl font-bold text-white drop-shadow-1g">
                    Welcome to the Crystal Beauty Clear 
                  </h1>
                  <p className="mt-2 text-gray-200 text-lg">Discover our amazing products</p>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-4">
                    <a
                      href="/products"
                      className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-lg hover:bg-orange-600 transition"
                    >
                      Shop now 
                    </a>
                    <a
                      href="/about"
                      className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition"
                    >
                      About Us
                    </a>
                  </div>
                </div>
              }/>
              
              <Route path="/products" element={<ProductPage />} />
              <Route path="/contact" element={<ContactPage/>} />
              <Route path="/about" element={<AboutPage /> } />
              <Route path="/overview/:Id" element={<ProductOverview />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              <Route path="/*" element={
                <div className="text-center py-20">
                  <h1 className="text-5xl font-bold text-red-500">404</h1>
                  <p className="text-white text-xl">Oops! Page Not Found</p>
                </div>
              } />
            </Routes>

          </div>
        </main>

        {/* Simple Footer (Optional) */}
        <footer className="p-4 text-center text-white/60 text-sm">
          © Your Store Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
