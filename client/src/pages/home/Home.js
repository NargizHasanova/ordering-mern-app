import { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import PropertyList from '../../components/propertyList/PropertyList'
import './home.scss'
import { useDispatch } from 'react-redux'
import { getHotels, getHotelsByPropertyType, getHotelsCountByCity } from '../../redux/hotelsSlice'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotelsCountByCity())
    dispatch(getHotelsByPropertyType())
    dispatch(getHotels({ minPrice: 10, maxPrice: 1000 })) // limiti qeyd elemedim,ts olsa error vererdi
  }, [])


  return (
    <div>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
