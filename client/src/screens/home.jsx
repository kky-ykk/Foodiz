import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Cards from '../components/cards'

export default function Home() {
    const [search,setSearch]=useState(""); 
    const [foodItems,setFootItem]=useState([]);
    const [foodCat,setFoodCat]=useState([]);

    const loadData=async ()=>{
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/foodData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        response=await response.json();
        if(response){

            setFootItem(response[0]);
            setFoodCat(response[1]);
        }
        
    }

    useEffect(()=>{
        loadData();

    },[]);

  return (
    <>
        <div>
            <Navbar></Navbar>
        </div>

        <div>
            
            <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"

      >
        <div className="carousel-inner">
          <div className=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">
              {" "}

              <input
                className="form-control me-2 w-75 bg-white text-dark "
                type="search"
                placeholder="Search foods..."
                aria-label="Search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0="
              className="d-block w-100 h-95"
              style={{
                filter: "brightness(55%)",
                " objectFit": " cover",
                height: "430px",
              }}
              alt="Biryani"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://th.bing.com/th/id/OIP.XzUnt5Afjbz_9Bmkng2IMQHaEK?rs=1&pid=ImgDetMain"
              className="d-block w-100 h-95"
              style={{
                filter: "brightness(55%)",
                " objectFit": " cover",
                height: "430px",
              }}
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/photos/spicy-paneer-or-chilli-paneer-or-paneer-tikka-or-cottage-cheese-in-picture-id697316634?b=1&k=20&m=697316634&s=170667a&w=0&h=bctfHdYTz9q2dJUnuxGRDUUwC9UBWjL_oQo5ECVVDAs="
              className="d-block w-100 h-95"
              style={{
                filter: "brightness(55%)",
                " objectFit": " cover",
                height: "400px",
              }}
              alt="Burger"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

        </div>
        {/* style={{display:'flex',flexWrap:"wrap",justifyContent:"space-around"}} */}
        <div className="cls" style={{padding:'0px 15px'}}>
            {
                foodCat.map((catData)=>{
                    return (
                        <div key={catData._id} className='row mb-3' >
                            <h2 className='fs-3 my-3 text-center font-weight-bold'>{catData.CategoryName}</h2>
                            <hr />
                            {
                                foodItems.filter((item)=>(item.CategoryName===catData.CategoryName && item.name.toLowerCase().includes(search))).map((item)=>{
                                    return(
                                        <div key={item._id} className='col-12 col-mid-6 col-lg-3 container ' style={{display: "flex",
                                          justifyContent: "center", flexWrap:"wrap"}}>
                                            <Cards 
                                                foodItem={item}
                                                options={item.options}
                                            ></Cards>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>

        <div>
            <Footer></Footer>
        </div>
    </>
  )
}
