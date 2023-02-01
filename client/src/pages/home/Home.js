import { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import PropertyList from '../../components/propertyList/PropertyList'
import './home.scss'
import { useDispatch } from 'react-redux'
import { getTopHotels, getPropertyCountByType, getPropertyCountByCity } from '../../redux/hotelsSlice'

const Home = () => {
  const dispatch = useDispatch()
//getHotelsCountByCity
//getHotelsByPropertyType
//getHotels
  useEffect(() => {
    dispatch(getPropertyCountByCity())//[5, 0, 0]
    dispatch(getPropertyCountByType()) // getPropertyCountByType (hotel,villa,cabin)
    dispatch(getTopHotels({ minPrice: 10, maxPrice: 1000 })) 
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
