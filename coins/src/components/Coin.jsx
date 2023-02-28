import  axios from 'axios'
import React, { useEffect, useState } from "react";


export const Coin = () => {

    const [coins,setCoins]=useState([])
    const [search,setSearch]=useState("")

    useEffect(()=>{
      getData()
    },[])

    const getData=async()=>{
      const {data}=await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")

      setCoins(data)
    }

    const filtros=coins.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())||item.symbol.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="container">
        <h1 className="text-center fw-bold mt-5 text-white">SEARCH</h1>
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <div className="col-6">
            <form>
              <div className="mb-5">
                <input type="text" placeholder='Search' className="form-control" autoFocus onChange={e=>setSearch(e.target.value)}/>
              </div>
            </form>
          </div>
        </div>
        
        {/* <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Price Change</th>
            </tr>
          </thead>
          <tbody>
            {filtros.map((coin)=>(
              <tr key={coin.id}>
                <td>
                  <img src={coin.image} alt="img" className="img-fluid" style={{width:"35px",height:"35px"}}/>
                </td>
                <td className="text-center">
                  {coin.name}
                </td>
                <td className="text-center">
                  {coin.Symbol} 
                </td>
                <td className="text-center">
                  ${coin.current_price}
                </td>
                <td className={coin.price_change_percentage_24h<0?"text-danger text-cente":"text-success text-center"}>
                  {Match.round(coin.price_change_percentage_24h*100)/100}% 
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <div className="row g-4">
          {filtros.map(coin=>(
            <div className="col-3" key={coin.id}>

              <div className="card text-center shadow">

                <div className="d-flex justify-content-center align-items-center">
                  <img src={coin.image} alt="" className="card-img-top mt-3" style={{width:"75px",height:"75px"}}/>
                </div>

                <h5 className="card-title text-bold">{coin.name}</h5>

                <div className="card-body">

                  {coin.Symbol} 

                  <p>${coin.current_price}</p>

                  <span className={coin.price_change_percentage_24h < 0 ? "badge bg-danger" : "badge bg-success"}>{Math.round(coin.price_change_percentage_24h*100)/100}%</span>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
