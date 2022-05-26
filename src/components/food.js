import '../App.css';
import { AiFillCalendar,AiFillStar } from "react-icons/ai";

const Food = (p) => {
    
    const { name, operation_time, images, profile_image_url, rating ,id} = p
    const current = new Date();
    return (

        <div className="card">
            <div className="card-title">
                <img src={profile_image_url} />
                <div className='card-text'>
                    <h3 className="card-name">
                        {name}
                    </h3>
                    <div className='card-decision'>
                        <div className='open'>
                            <AiFillCalendar/> {operation_time[current.getDay() - 1].time_open} - {operation_time[current.getDay() - 1].time_close}
                        </div>
                        <div className='rating'>
                            <AiFillStar/>{rating}
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-body'>
                <img src={images[0]} />
                <img src={images[1]} />
                <img src={images[2]} />
            </div>
        </div>

    )
}
export default Food