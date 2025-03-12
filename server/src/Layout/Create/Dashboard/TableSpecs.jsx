import React, {Fragment, useState} from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GensetSpecifications} from '../../../utils/constants';
import {toast} from "sonner";
import { Input } from "@/components/ui/input"
import { structureValueConstruction } from '../../../utils/functions';

function TableSpecs() {
    const [selectedItems,
        setSelectedItems] = useState([]);

    const [tableData, setTableData] = useState([]);
    const [modelNumber, setModelNumber] = useState(0);
    const [model, setModel] = useState([]);

    const handleSelect = (value) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [
                ...prev,
                value
            ]);

            if(value === GensetSpecifications.PRIME_RATING_AT_RATED_RPM){
                const structure = {
                    name : value,
                    units:["KVa", "KW"],
                    type:[],
                }
                structure.value = structureValueConstruction(structure, modelNumber)
                setTableData([...tableData, structure]);
            }

            if(value === GensetSpecifications.OVERALL_DIMENSIONS_OF_GENSET){
                const structure = {
                    name : value,
                    units:["mm"],
                    type:["Length", "Width", "Height"]
                }
                structure.value = structureValueConstruction(structure, modelNumber)
                setTableData([...tableData, structure]);
            }

            if(value === GensetSpecifications.FREQUENCY){
                const structure = {
                    name : value,
                    units:["Hz"],
                }
                structure.value = 50
                setTableData([...tableData, structure]);
            }

            if(value === GensetSpecifications.POWER_FACTOR){
                const structure = {
                    name : value,
                    units:["Lagging"],
                }
                structure.value = 50
                setTableData([...tableData, structure]);
            }
        } else {
            toast.success("Already Added");
        }
    };
    console.log(model)
    return (
        <div className="w-[80vw] mx-auto mt-6">
            <Card className="p-4">
                <CardContent>
                    <div className="text-lg font-semibold">Select Genset specifications</div>
                </CardContent>
                <div className='border p-4 rounded-md'>
                    <div className='flex items-center'>
                        <label>Number of Generators</label>
                        <Input type="number"   onChange={e => setModelNumber(e.target.value)} className="w-20 ml-5" />
                    </div>
                    
                    <div className='grid grid-cols-3 gap-4 my-6'>
                        {
                            modelNumber > 0 && Array.from({ length: modelNumber }).map((e, _i) => (
                                <div className='flex items-center'>
                                    <label>Enter Model Number {_i+1}</label>
                                    <Input type="text" onChange={e => setModel(p => {
                                        const u = [...p];
                                        u[_i] = e.target.value;
                                        return u;
                                    })} className="w-[150px] ml-5" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="space-y-4">
                    <Select onValueChange={handleSelect} className="w-max">
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select a Genset Specification"/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object
                                .values(GensetSpecifications)
                                .map((spec) => (
                                    <SelectItem key={spec} value={spec}>
                                        {spec}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Current Table Data</h2>
                    <table className="w-full border-collapse  border-2 mt-2">
                    <thead>
                        <tr>
                        {/* <th className="border p-2">Name</th>
                        <th className="border p-2">Units</th>
                        <th className="border p-2">Type</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((structure, index) =>
                        structure.units.map((unit, unitIndex) => (
                            <tr key={`${index}-${unitIndex}`}>
                                {/* Only apply rowSpan to the first unit row */}
                                
                                {unitIndex === 0 && (
                                    <td className="border p-2" rowSpan={structure.units.length}>
                                    {structure.name}
                                    </td>
                                )}
                                
                                <td className="border p-2">{unit}</td>
                                <td className="border p-2">{structure.type[unitIndex] || "-"}</td>
                            </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
            </Card>

        </div>
    )
}

export default TableSpecs
