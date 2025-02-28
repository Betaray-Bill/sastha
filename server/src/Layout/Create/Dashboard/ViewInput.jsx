import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../../../components/ui/button'


function ViewInput({values}) {
    const [data, setData] =  useState([])

    useEffect(() => {
        setData([...values])
    }, [])

    console.log(data)

    const handleChange = (value, type, index) => {

        if(type == 'LIST') {
          setData(prevData => {
            const newData = [...prevData]; // Create a shallow copy of the state array
            newData[index] = { ...newData[index], content:{
              header: value,
              listItems: [...newData[index].content.listItems]
            } }; // Update the specific index
            return newData; // Update the state
          });
        }else{
          console.log("object")
          setData(prevData => {
            const newData = [...prevData]; // Create a shallow copy of the state array
            newData[index] = {...newData[index] , content: value }; // Update the specific index
            return newData; // Update the state
          });
          // setData([...data, { type: value,  content: value }])
        }
      }
    
      const handleChangeList = (value, type, index, _i) => {
        const newData = [...data]
        newData[index].content.listItems[_i] = value
        setData(newData)
      }
    
      const deleteList = (index, _i) => {
        const newData = [...data]
        newData[index].content.listItems.splice(_i, 1)
        setData(newData)
      }
    
  return (
    <div>
    {data && data?.map((item, index) => {
      if (item.type === 'H1') {
        return (
          <div key={index}>
            <Input type="text" placeholder='Write header' value={data[index]?.value} onChange={(e) => handleChange(e.target.value, 'H1', index)}/>
          </div>
        )
      }
      if (item.type === 'List') {
        return (
          <div key={index}>
            <Input type="text" placeholder='Write list Header item' value={data[index]?.value} onChange={(e) => handleChange(e.target.value, 'List', index)}/>
            <Button onClick={() => addList(index)}>Add List Item</Button>
            <ul>
              {data[index]?.content?.listItems?.length > 0 &&
                data[index].content.listItems.map((listItem, _i) => (
                  <li key={_i}>
                    <input 
                      type="text" 
                      placeholder="Write list item" 
                      value={listItem} 
                      onChange={(e) => handleChangeList(e.target.value,"List" , index, _i)}
                    />
                    <button onClick={() => deleteList(index, _i)}>Delete</button>
                  </li>
                ))
              }

            </ul>
          </div>
        )
      }
      if (item.type === 'h2') {
        return <h2 key={index}>{item.content}</h2>
      }
      if (item.type === 'para') {
        return <p key={index}>{item.content}</p>
      }
    })}
  </div>
  )
}

export default ViewInput
