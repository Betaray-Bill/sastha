import React, {useEffect, useState} from 'react'
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {variables} from '../../../utils/constants'
import {Button} from '../../../components/ui/button'
import {Textarea} from "@/components/ui/textarea"

// const variables = ["]
function Dashboard() {
    const [data,
        setData] = useState([])

    const [title,
        setTitle] = useState('')

    const addData = (variable) => {
        // console.log(variable)
        if (variable.value == 'LIST') {
            setData([
                ...data, {
                    type: variable.value,
                    content: {
                        header: '',
                        listItems: []
                    }
                }
            ])
        } else {
            setData([
                ...data, {
                    type: variable.value,
                    content: ''
                }
            ])
        }
    }

    const handleChange = (value, type, index) => {

        if (type == 'LIST') {
            setData(prevData => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: {
                        header: value,
                        listItems: [...newData[index].content.listItems]
                    }
                };
                return newData; // Update the state
            });
        } else {
            console.log("object")
            setData(prevData => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: value
                };
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
        newData[index]
            .content
            .listItems
            .splice(_i, 1)
        setData(newData)
    }

    const deleteTag = (index) => {
        const newData = data.filter((item, _index) => _index !== index)
        setData(newData)
    }

    const addList = (index) => {
        const newData = [...data]
        console.log(newData)
        if (!newData[index].content.listItems) {
            console.log(1)
            newData[index].content.listItems = [];
            newData[index]
                .content
                .listItems
                .push('');
        } else {
            newData[index]
                .content
                .listItems
                .push('');
        }
        setData(newData)
    }

    return (
        <div className='w-full'>
            <div className='flex items-start justify-around mt-5'>
                {/* Output */}
                <div className=' rounded-sm w-[50vw] p-2'>
                    <h4 className='text-2xl font-semibold'>Create a Generator Type</h4>
                    <p className='text-lg'></p>
                    <div className='mt-8'>
                        <div>
                            <Label htmlFor="email">Enter Title</Label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2"></Input>
                        </div>
                        <div>
                            {data && data
                                ?.map((item, index) => {
                                    if (item.type === 'H1') {
                                        return (
                                            <div key={index} className='my-4 border border-gray-300 p-2 rounded-md'>
                                                <div className='flex items-center justify-between'>
                                                    <Label>Enter Header</Label>
                                                    <div onClick={() => deleteTag(index)} className='ml-2 cursor-pointer   '>
                                                        <ion-icon
                                                            name="trash-outline"
                                                            style={{
                                                            color: "red"
                                                        }}></ion-icon>
                                                    </div>
                                                </div>

                                                <Input
                                                    type="text"
                                                    placeholder='Write header'
                                                    value={data[index]
                                                    ?.value}
                                                    className="mt-2"
                                                    onChange={(e) => handleChange(e.target.value, 'H1', index)}/>
                                            </div>
                                        )
                                    }
                                    if (item.type === 'LIST') {
                                        return (
                                            <div key={index} className='my-4 border border-gray-300 p-2 rounded-md'>
                                                {/* <div className='flex items-end'> */}
                                                <div>
                                                    <div className='flex items-center justify-between'>
                                                        <Label>Enter List</Label>
                                                        <div onClick={() => deleteTag(index)} className='ml-2 cursor-pointer   '>
                                                            <ion-icon
                                                                name="trash-outline"
                                                                style={{
                                                                color: "red"
                                                            }}></ion-icon>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-start mt-2'>
                                                        <Input
                                                            type="text"
                                                            placeholder='Write list Header item'
                                                            value={data[index]
                                                            ?.value}
                                                            className=""
                                                            onChange={(e) => handleChange(e.target.value, 'LIST', index)}/>
                                                        <Button onClick={() => addList(index)} className="ml-3">Add List Item</Button>
                                                    </div>
                                                </div>

                                                {/* </div> */}
                                                <ul className='mt-3'>
                                                    {data[index]
                                                        ?.content
                                                            ?.listItems
                                                                ?.length > 0 && data[index]
                                                                    .content
                                                                    .listItems
                                                                    .map((listItem, _i) => (
                                                                        <li key={_i} className='flex items-center justify-between my-2'>
                                                                            <span className='mr-2'>{_i + 1}.</span>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder="Write list item"
                                                                                value={listItem}
                                                                                onChange={(e) => handleChangeList(e.target.value, "List", index, _i)}/> {/* <ion-icon name="trash-outline"></ion-icon> */}
                                                                            <div onClick={() => deleteList(index, _i)} className='ml-2 cursor-pointer   '>
                                                                                <ion-icon
                                                                                    name="trash-outline"
                                                                                    style={{
                                                                                    color: "red"
                                                                                }}></ion-icon>
                                                                            </div>
                                                                        </li>
                                                                    ))
}

                                                </ul>
                                            </div>
                                        )
                                    }
                                    if (item.type === 'h2') {
                                        return (
                                            <div key={index} className='my-4 border border-gray-300 p-2 rounded-md'>
                                                <div className='flex items-center justify-between'>
                                                    <Label>Enter sub Heading</Label>
                                                    <div onClick={() => deleteTag(index)} className='ml-2 cursor-pointer   '>
                                                        <ion-icon
                                                            name="trash-outline"
                                                            style={{
                                                            color: "red"
                                                        }}></ion-icon>
                                                    </div>
                                                </div>

                                                <Input
                                                    type="text"
                                                    placeholder='Write header'
                                                    value={data[index]
                                                    ?.value}
                                                    className="mt-2"
                                                    onChange={(e) => handleChange(e.target.value, 'H2', index)}/>
                                            </div>
                                        )
                                    }
                                    if (item.type === 'Paragraph') {
                                        return (
                                            <div key={index} className='my-4 border border-gray-300 p-2 rounded-md'>
                                                <div className='flex items-center justify-between'>
                                                    <Label>Enter Paragraph</Label>
                                                    <div onClick={() => deleteTag(index)} className='ml-2 cursor-pointer   '>
                                                        <ion-icon
                                                            name="trash-outline"
                                                            style={{
                                                            color: "red"
                                                        }}></ion-icon>
                                                    </div>
                                                </div>

                                                <Textarea // type="text"
                                                    placeholder='Write Paragraph....' value={data[index]
                                                    ?.value} className="mt-2" onChange={(e) => handleChange(e.target.value, 'Paragraph', index)}/>
                                            </div>
                                        )
                                    }
                                })}
                        </div>
                    </div>
                </div>
                {/* Add Variables */}
                <div className='grid place-content-center  rounded-sm w-max p-2'>
                    <div className='w-[300px] p-4 grid place-content-center grid-cols-2'>
                        {variables && variables.map((variable, index) => {
                            return (
                                <Button
                                    key={index}
                                    className='rounded-none border-0 m-2 flex items-center w-max'
                                    onClick={() => addData(variable)}>
                                    <ion-icon name="add-outline"></ion-icon>
                                    <p>{variable.name}</p>
                                </Button>
                            )
                        })
}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard