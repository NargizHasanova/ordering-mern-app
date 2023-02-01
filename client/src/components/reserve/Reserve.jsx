import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './reserve.scss'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getRoom } from '../../redux/roomsSlice'


const Reserve = ({ setOpenModal, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  // const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
  // const { date } = useContext(SearchContext)

  const dispatch = useDispatch()
  const { roomsData } = useSelector(state => state.rooms)
  const { date } = useSelector(state => state.hotels)


  useEffect(() => {
    dispatch(getRoom(hotelId))
  }, [])

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const alldates = getDatesInRange(date[0].startDate, date[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((item) =>
      alldates.includes(new Date(item).getTime()),
    )

    return isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value),
    )
  }

  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomNumId) => {
          const { data } = Axios.put(`/rooms/availability/${roomNumId}`, {
            unavailableDates: alldates,
          })
          return data
        }),
      )
      setOpenModal(false)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Select your rooms:</span>
        {roomsData.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve
