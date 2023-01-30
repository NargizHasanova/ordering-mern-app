import './hotel.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
  const { user } = useContext(AuthContext)
  const { date, options } = useContext(SearchContext)
  const { id: hotelId } = useParams()
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data, error, loading, refetch } = useFetch(
    `/hotels/findById/${hotelId}`,
  )

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  const days = dayDifference(date[0].endDate, date[0].startDate)
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  function reserveTrip() {
    // if (user) {
      setOpenModal(true)
    // } else {
    //   navigate('/login')
    // }
  }

  return (
    <div>
      <Header type="list" />
      {loading ? (
        'loading please wait'
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove('l')}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={reserveTrip} className="bookNow">
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img
                    onClick={handleOpen}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">
                  {data.title + " "}
                  Stay in the heart of City
                </h1>
                <p className="hotelDesc">
                  {data.desc + " "}
                  Located a 5-minute walk from St. Florian's Gate in Krakow,
                  Tower Street Apartments has accommodations with air
                  conditioning and free WiFi. The units come with hardwood
                  floors and feature a fully equipped kitchenette with a
                  microwave, a flat-screen TV, and a private bathroom with
                  shower and a hairdryer. A fridge is also offered, as well as
                  an electric tea pot and a coffee machine. Popular points of
                  interest near the apartment include Cloth Hall, Main Market
                  Square and Town Hall Tower. The nearest airport is John Paul
                  II International Kraków–Balice, 16.1 km from Tower Street
                  Apartments, and the property offers a paid airport shuttle
                  service.
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> (
                  {days === 1 ? days + ' night' : days + ' nights'})
                  {/* 2gun 200manat 2otaq */}
                </h2>
                <button onClick={reserveTrip}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={hotelId} />}
    </div>
  )
}

export default Hotel
