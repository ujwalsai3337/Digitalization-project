import  React,{useState} from "react";
import './ColorSlider.css';


export function Rating(){
    const [data,setdata]=useState(0)

    return(
        <div class="slider">
            <input type="range" min='0' max='100'  value={data} onChange={(e)=>setdata(e.target.value)}/>
            <h2> {data} </h2>
            
        </div>
    )
}

export default Rating;