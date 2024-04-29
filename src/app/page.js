"use client"
import { useEffect, useState } from "react";

export default function Home() {
 const [data, setData]= useState([
  {id:1, isClicked:false, isBox:true},
  {id:2, isClicked:false, isBox:true},
  {id:3, isClicked:false, isBox:true},
  {id:4, isClicked:false, isBox:true},
  {id:5, isClicked:false, isBox:false},
  {id:6, isClicked:false, isBox:true},
  {id:7, isClicked:false, isBox:true},
  {id:8, isClicked:false, isBox:true},
  {id:9, isClicked:false, isBox:true}
]);

const [clickOrder, setClickOrder] = useState([]);
const [resetting, setResetting] = useState(false);


const handleClick=(id)=>{
  setClickOrder((prev)=>{
    const updatedOrder = [...prev];
    if (!updatedOrder.includes(id)) {
      updatedOrder.push(id);
    }
    if (updatedOrder.length=== data.filter((d)=>d.isBox).length) {
      setResetting(true)
    }
      return updatedOrder;    
  });

  setData((prevdata)=>{
    return prevdata.map((item)=>{
      if (!clickOrder.includes(id)) {
        return item.id === id ? {...item, isClicked: !item.isClicked }: item
      }
      return item
    })
  })
}

useEffect(()=>{
  if (resetting) {
    let counter =0;
    const timer = setInterval(()=>{

      if (counter < clickOrder.length) {
        const idToReset = clickOrder[counter];
        setData((prevdata) => {
          return prevdata.map((item) => {
            return item.id === idToReset ? { ...item, isClicked: false } : item
          })
        })
        counter++;
      } else {
        clearInterval(timer);
        setResetting(false);
        setClickOrder([])
      }
    },300);

    return () => {
      clearInterval(timer)
    };
  }
},[resetting])

  return (
    <div className="grid grid-cols-3 gap-2 w-[200px] ml-auto mr-auto mt-16">
  {data.map((item) => (
    item.isBox ? (
    <div onClick={()=>handleClick(item.id)} style={{backgroundColor : item.isClicked ? "green":""}} className="w-[60px] h-[60px] border border-black flex items-center justify-center" key={item.id}>
    </div>
    ):(
      <span  key={item.id}></span>
    )
  ))}
</div>

  
  );
}
