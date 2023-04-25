import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useRef } from 'react';
import "./Data.css"


const Data = () => {
    const searchValue = useRef("");
    const [searchText, setSearchText] = useState("birds");
    const [imageData, setImageData] = useState([]);

    useEffect(()=>{
        const params = {
            method : "flickr.photos.search",
            api_key : "d0dfd882515d195151e1d05df18ff57c",
            text : searchText,
            sort : "",
            per_page: 30,
            liscence : "4",
            extras: "owner_name, liscence",
            format : "json",
            nojsoncallback : 1
        }
        const parameters = new URLSearchParams(params);
        const Url = `https://api.flickr.com/services/rest/?${parameters}`;

        Axios.get(Url).then((res)=>{
            // console.log(res.data)
            const arr = res.data.photos.photo.map((imgData)=>{
                return imageUrl(imgData, "q")

            })
        setImageData(arr);
        // debugger
        }).catch((error)=>{
            console.log(error)
        })

    },[searchText])
    const imageUrl =(photo, size)=>{
        let Url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
        if(size){
            Url += `_${size}`
        }
        Url += '.jpg'
        return Url
    }

  return (
    <>
     <div className='first-container'>
        <h1>SnapShot</h1>
        <input type="text" onChange={(e) =>{searchValue.current = e.target.value}}/>
        <button onClick={()=>{setSearchText(searchValue.current)}}>search</button>
    </div>
    <div className='second-container'>
        <button onClick={()=>{setSearchText("mountains")}}>Mountain</button>
        <button onClick={()=>{setSearchText("beaches")}}>Beaches</button>
        <button onClick={()=>{setSearchText("birds")}}>Birds</button>
        <button onClick={()=>{setSearchText("food")}}>Food</button>
    </div>
    <div className='image-container'>
        {imageData.map((url, i) =>{
            return <img src={url} alt="loading" key={i} />
        })}
    </div>
    </>
  )
}

export default Data