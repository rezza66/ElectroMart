import FeaturedProducts from "../components/FeaturedProduct/Featured-product"
import TopImage from "../components/TopImage/TopImage"
import WeeklyTopSelling from "../components/WeeklyTopSelling/WeeklyTopSelling"

function Home() {

  return (
    <>
    <div className="py-16 bg-slate-300">
    <TopImage />
    <FeaturedProducts />
    <WeeklyTopSelling />
    </div>
    </>
  )
}

export default Home;
