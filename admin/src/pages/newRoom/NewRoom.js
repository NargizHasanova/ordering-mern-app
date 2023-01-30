import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { Axios } from "../../Axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState(undefined);
  const navigate = useNavigate()

  const { data, loading, error } = useFetch("/hotels")

  function handleChange(e) {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  async function sendFormHandler(e) {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room => ({ number: room }))
    try {
      await Axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers })
      navigate("/rooms")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={e => setRooms(e.target.value)}
                  placeholder="give coma between room numbers" />
              </div>
              <div className="formInput" >
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                  {loading ? "loading" : data?.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={sendFormHandler}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
