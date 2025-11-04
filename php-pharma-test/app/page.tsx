import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import CompanyBanner from "./components/CompanyBanner";
import ProductCategories from "./components/ProductCategories";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider />
        <CompanyBanner />
        <ProductCategories />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}
