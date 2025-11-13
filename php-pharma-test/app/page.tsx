import Layout from "./components/Layout";
import BlogSlider from "./components/BlogSlider";
import CompanyBanner from "./components/CompanyBanner";
import ProductCategories from "./components/ProductCategories";
import LatestNews from "./components/LatestNews";

export default function Home() {
  return (
    <Layout>
      <BlogSlider />
      <CompanyBanner />
      <ProductCategories />
      <LatestNews />
    </Layout>
  );
}
