import { useEffect, useState } from 'react'
import './App.css';
import Food from './components/food';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillBell } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

function App() {

  const customData = require('./data/example_data.json');
  const [foodData, setFoodData] = useState(customData)
  const [word, setWord] = useState('')
  const [dataFilter] = useState(["name", "operation_time"])
  const [dataInPage, setDataInPage] = useState([])
  const [page, setPage] = useState(0)
  const [btn, setBtn] = useState('btn')

  const pagination = () => {
    const foodPerPage = 9
    const pages = Math.ceil(customData.length / foodPerPage)
    const newFood = Array.from({ length: pages }, (data, index) => {
      const start = index * foodPerPage
      return customData.slice(start, start + foodPerPage)
    })
    return newFood
  }

  useEffect(() => {
    const paginate = pagination()
    setDataInPage(paginate)
    setFoodData(paginate[page])
  }, [page])

  const paginate = pagination()
  const search = (customData) => {
    return customData.filter((item) => {
      return dataFilter.some((filter) => {
        return item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) > -1
      })
    })
  }
  useEffect(() => {
    if (!word) {
      setFoodData(paginate[page])
      setBtn('btn')
    } else {
      setFoodData(customData)
      setBtn('dis')
    }
  }, [word])
  return (
    <div>
      <nav>
        <div className='logo'>
        <img src='https://img.blognone.com/logo/prod/118x118/logo/icreativesystems-co-ltd.jpg' />
        </div>
        <header>
          <span className='icon'><AiFillBell /></span>
          <span className='icon'><CgProfile /></span>
          <h2>Akkarapol</h2>
        </header>
      </nav>
      <div className='bar'><img src='https://img.blognone.com/logo/prod/118x118/logo/icreativesystems-co-ltd.jpg' /></div>
      <div className="inputbox">
        <h2>Pleace List</h2>
        <input type="text"
          className="search-input"
          placeholder="ค้นหาร้านของคุณ"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
      <div className="container2">
        {search(foodData).map((data) => {
          return (
            <Food key={data.id} name={data.name} operation_time={data.operation_time} images={data.images} profile_image_url={data.profile_image_url} rating={data.rating} />
          )
        })}

      </div>
      <div className="container">
        {page != 0 ? <button onClick={() => setPage(page - 1)} className={btn} ><AiOutlineArrowLeft /></button> : null}
        <button className={btn}>{page + 1}</button>
        {page < (paginate.length - 1) ? <button onClick={() => setPage(page + 1)} className={btn}><AiOutlineArrowRight /></button> : null}
      </div>
    </div>
  );
}

export default App;
