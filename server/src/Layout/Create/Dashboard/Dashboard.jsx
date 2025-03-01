import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { variables } from '../../../utils/constants';
import { Trash2, PlusCircle } from 'lucide-react';

function Dashboard() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');

    const addData = (variable) => {
        setData(prev => [
            ...prev, 
            { type: variable.value, content: variable.value === 'LIST' ? { header: '', listItems: [] } : '' }
        ]);
    };

    const handleChange = (value, type, index) => {
        setData(prevData => {
            const newData = [...prevData];
            if (type === 'LIST') {
                newData[index].content.header = value;
            } else {
                newData[index].content = value;
            }
            return newData;
        });
    };

    const handleChangeList = (value, index, _i) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].content.listItems[_i] = value;
            return newData;
        });
    };

    const deleteList = (index, _i) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].content.listItems.splice(_i, 1);
            return newData;
        });
    };

    const deleteTag = (index) => {
        setData(prevData => prevData.filter((_, _index) => _index !== index));
    };

    const addList = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].content.listItems.push('');
            return newData;
        });
    };


    console.log(data)
    return (
        <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Output Section */}
                <div className='col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg'>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Create a Generator Type</h2>
                    <div className='mt-4'>
                        <Label htmlFor='title'>Enter Title</Label>
                        <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='mt-2' />
                    </div>
                    <div className='mt-6 space-y-6'>
                        {data.map((item, index) => (
                            <div key={index} className='p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700'>
                                <div className='flex justify-between items-center'>
                                    <Label>{item.type === 'LIST' ? 'Enter List Header' : 'Enter Content'}</Label>
                                    <Button variant='ghost' onClick={() => deleteTag(index)}>
                                        <Trash2 className='text-red-500' size={18} />
                                    </Button>
                                </div>
                                {item.type === 'LIST' ? (
                                    <>
                                        <Input type='text' placeholder='List Header' value={item.content.header} onChange={(e) => handleChange(e.target.value, 'LIST', index)} className='mt-2' />
                                        <Button onClick={() => addList(index)} variant='outline' className='mt-2 w-full flex items-center'>
                                            <PlusCircle size={16} className='mr-2' /> Add List Item
                                        </Button>
                                        <ul className='mt-3 space-y-2'>
                                            {item.content.listItems.map((listItem, _i) => (
                                                <li key={_i} className='flex items-center space-x-2'>
                                                    <Input type='text' placeholder='List item' value={listItem} onChange={(e) => handleChangeList(e.target.value, index, _i)} />
                                                    <Button variant='ghost' onClick={() => deleteList(index, _i)}>
                                                        <Trash2 className='text-red-500' size={18} />
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Textarea placeholder='Enter content...' value={item.content} onChange={(e) => handleChange(e.target.value, item.type, index)} className='mt-2' />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Variables Section */}
                <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Add Variables</h3>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        {variables.map((variable, index) => (
                            <Button key={index} className='flex items-center' onClick={() => addData(variable)}>
                                <PlusCircle size={16} className='mr-2' /> {variable.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
