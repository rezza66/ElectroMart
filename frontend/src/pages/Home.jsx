import FeaturedProducts from "../components/FeaturedProduct/Featured-product"
import TopImage from "../components/TopImage/TopImage"
import WeeklyTopSelling from "../components/WeeklyTopSelling/WeeklyTopSelling"

function Home() {

  return (
    <>
    <div >
    <TopImage />
    <FeaturedProducts />
    <WeeklyTopSelling />
    </div>
    </>
  )
}

export default Home;
