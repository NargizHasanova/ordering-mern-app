import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './reserve.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getRoom, updateRoomAvailability } from '../../redux/roomsSlice'


const Reserve = ({ setOpenModal, hotelId }) => {
  const dispatch = useDispatch()
  // const [selectedRooms, setSelectedRooms] = useState([])
  const [roomId, setRoomId] = useState(null)

  const { roomsData } = useSelector(state => state.rooms)
  const { date, hotel } = useSelector(state => state.hotels)


  useEffect(() => {
    dispatch(getRoom(hotelId))
    // getDatesInRange(date[0].startDate, date[0].endDate)
  }, [])

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())
    // date === startDate === start === Sat Feb 04 2023 00:00:00 GMT+0400 (Азербайджан, стандартное время)

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return dates
  }

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate)

  // const handleSelect = (e) => {

  //   const checked = e.target.checked
  //   const value = e.target.value
  //   setSelectedRooms(
  //     checked
  //       ? [...selectedRooms, value]
  //       : selectedRooms.filter((item) => item !== value),
  //   )
  // }

  const navigate = useNavigate()



  function selectRoom(roomId) {
    // const allDates = getDatesInRange(date[0].startDate, date[0].endDate)
    setRoomId(roomId)
    let isUnavailable = false

    roomsData.map((room) => {
      if (isUnavailable) return room // dongunu dayandir demek isteyirem ,elece return yazanda yazirki nese return elemelidi map
      isUnavailable = room.bookedDate.some(item => {
        // console.log(allDates);
        // console.log(new Date(item).getTime());
        return allDates.includes(new Date(item).getTime())
      })
      // console.log(isUnavailable)
      return isUnavailable
    })
    console.log(isUnavailable);
  }
  // function check(room) {
  //   let isUnavailable =  room.bookedDate.some(item => allDates.includes(new Date(item).getTime()))
  //   return isUnavailable
  // }

  const handleClick = async () => {
    try {
      // if (!isUnavailable) {
      console.log('sorgu getdi');
      dispatch(updateRoomAvailability({ roomId, unavailableDates: allDates }))
      setOpenModal(false)
      // }
      setOpenModal(false)
      // navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  function check(room) {
    console.log(room.bookedDate.some(item => allDates.includes(new Date(item).getTime())));
    return room.bookedDate.some(item => allDates.includes(new Date(item).getTime()))
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <h3 style={{ marginBottom: '5px' }}>{hotel?.name}</h3>
        <span>Select your room(s):</span>
        <div className="rItem " >
          {roomsData.length > 0 && roomsData.map((item) => (
            <button
              className="rTitle"
              key={item._id}
              disabled={check(item)}
              onClick={() => selectRoom(item._id)}>
              {item.otaqSayi} {item.otaqSayi > 1 ? 'rooms' : "room"}
            </button>
          ))}
        </div>
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve
