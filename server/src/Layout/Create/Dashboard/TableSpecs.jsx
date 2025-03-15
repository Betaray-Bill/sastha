import React, {Fragment, useState} from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GensetSpecifications} from '../../../utils/constants';
import {toast} from "sonner";
import {Input} from "@/components/ui/input"
import {structureValueConstruction} from '../../../utils/functions';

function TableSpecs() {
    const [selectedItems,
        setSelectedItems] = useState([]);

    const [tableData,
        setTableData] = useState([]);
    const [modelNumber,
        setModelNumber] = useState(0);
    const [model,
        setModel] = useState([]);

    const handleSelect = (value) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [
                ...prev,
                value
            ]);

            if (value === GensetSpecifications.PRIME_RATING_AT_RATED_RPM) {
                const structure = {
                    name: value,
                    isSingle:false,
                    units: [
                        "KVa", "KW"
                    ],
                    type: []
                }
                structure.value = structureValueConstruction(structure, modelNumber)
                setTableData(p =>[
                    ...p,
                    structure
                ]);
            }

            if (value === GensetSpecifications.OVERALL_DIMENSIONS_OF_GENSET) {
                const structure = {
                    name: value,
                    isSingle:false,
                    units: ["mm"],
                    type: ["Length", "Width", "Height"]
                }
                structure.value = structureValueConstruction(structure, modelNumber)
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.FUEL_CONSUMPTION) {
                const structure = {
                    name: value,
                    units: ["Ltrs/Hr"],
                    isSingle:false,
                    type: ["At 100% Load","At 75% Load","At 50% Load"]
                }
                structure.value = structureValueConstruction(structure, modelNumber)
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.FREQUENCY) {
                const structure = {
                    name: value,
                    units: ["Hz"],
                    isSingle:true,
                }
                structure.value = 50
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.POWER_FACTOR) {
                const structure = {
                    name: value,
                    units: ["Lagging"],
                    isSingle:true,
                }
                structure.value = 0.8
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.VOLTAGE) {
                const structure = {
                    name: value,
                    units: ["V"],
                    value:'',
                    isSingle:true,
                }
                // structure.value = 50
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.ELECTRICAL_BATTERY_STARTING_VOLTAGE) {
                const structure = {
                    name: value,
                    units: ["Volts-DC"],
                    value:[],
                    isSingle:true,
                }
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.WEIGHT_OF_GENSET_WITH_CANOPY_APPROX) {
                const structure = {
                    name: value,
                    units: ["Kg"],
                    type: ["Dry"],
                    isSingle:false,
                    value:''
                }
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.DG_SET_NOISE_LEVEL_AT_1MTR_WITH_GENSET_CANOPY_DBA_CONTACT) {
                const structure = {
                    name: value,
                    units: ["Kg"],
                    type: ["Dry"],
                    value:'',
                    isSingle:true,
                }
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.FUEL_TANK_CAPACITY) {
                const structure = {
                    name: value,
                    units: ["Ltrs"],
                    type:[],
                    value:[],
                    isSingle:false,
                }
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            if (value === GensetSpecifications.GOVERNING_CLASS) {
                const structure = {
                    name: value,
                    units: [""],
                    value:'',
                    isSingle:true,
                }
                setTableData([
                    ...tableData,
                    structure
                ]);
            }

            // if (value === GensetSpecifications.ELECTRICAL_BATTERY_STARTING_VOLTAGE) {
            //     const structure = {
            //         name: value,
            //         units: ["Volts-DC"],
            //         value:''
            //     }
            //     setTableData([
            //         ...tableData,
            //         structure
            //     ]);
            // }
        } else {
            toast.success("Already Added");
        }
    };
    console.log(tableData)

    const handleSingleChange = (value, name) => {
        console.log(value, name)
        let u = tableData?.map(e => {
            if (e.name === name) {
                return {
                   ...e,
                    value
                };
            }
            return e;
        });
        
        console.log(u);
        setTableData(u);
    }


    const handleChange = (val, inputIndex, unitsIndex, key, name) => {
        console.log(val, inputIndex, unitsIndex, key, name) 
        if(key === "units"){
            let u = tableData?.map(e => {
                if (e.name === name) {
                    return {
                        ...e,
                        value:e.value?.map((vals, index) =>
                            index === unitsIndex
                                ? vals.map((v, i) => (i === inputIndex ? val : v)) // Modify the inner array properly
                                : vals
                        )
                    };
                }
                return e;
            });
            
            console.log(u);
            setTableData(u);
        }else{
            let u = tableData?.map(e => {
                if (e.name === name) {
                    return {
                        ...e,
                        value:e.value?.map((vals, index) =>
                            index === unitsIndex
                                ? vals.map((v, i) => (i === inputIndex ? val : v)) // Modify the inner array properly
                                : vals
                        )
                    };
                }
                return e;
            });
            
            console.log(u);
            setTableData(u);
        }
    }

    console.log(tableData)
    return (
        <div className="w-[80vw] mx-auto mt-6">
            <Card className="p-4">
                <CardContent>
                    <div className="text-lg font-semibold">Select Genset specifications</div>
                </CardContent>
                <div className='border p-4 rounded-md'>
                    <div className='flex items-center'>
                        <label>Number of Generators</label>
                        <Input
                            type="number"
                            onChange={e => setModelNumber(e.target.value)}
                            className="w-20 ml-5"/>
                    </div>

                    <div className='grid grid-cols-3 gap-4 my-6'>
                        {modelNumber > 0 && Array
                            .from({length: modelNumber})
                            .map((e, _i) => (
                                <div className='flex items-center'>
                                    <label>Enter Model Number {_i + 1}</label>
                                    <Input
                                        type="text"
                                        onChange={e => setModel(p => {
                                        const u = [...p];
                                        u[_i] = e.target.value;
                                        return u;
                                    })}
                                        className="w-[150px] ml-5"/>
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

                    {tableData?.map((structure, index) => <div key={`${index}-${index}`} className='mt-2 border px-3 py-2 rounded-md'>
                        {/* Only apply rowSpan to the first unit row */}
                        <div className="font-semibold text-md">
                            {index + 1}. {structure.name}
                        </div>
                        {/* is Single */}
                        {
                            structure.isSingle ? 
                            <div> 
                                <Input 
                                    className="w-max mt-3"
                                    onChange={(val) => {
                                        handleSingleChange(val.target.value, structure.name)
                                    }}
                                    value={structure.value}/>
                            </div>
                        :
                        structure.type.length == 0
                            ? <div className='flex flex-col'>
                                    
                                    {structure
                                        .units
                                        .map((e, _i) => (
                                            <div key={_i} className='flex items-center'>
                                                <label className=''>{structure.units[_i]}</label>
                                                {
                                                    Array.from({length:modelNumber}).map((v, __i) => (
                                                        <Input 
                                                            className="w-max m-2"
                                                            onChange={(val) => {
                                                                handleChange(val.target.value, __i, _i, "units", structure.name)
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        ))
}
                                </div>
                            : <div className='p-3'>
                                {structure
                                        .type
                                        .map((e, _i) => (
                                            <div key={_i} className='flex items-center'>
                                                <label className=''>{structure.type[_i]}</label>
                                                <label className='ml-3'>({structure.units[0]})</label>
                                                {
                                                    Array.from({length:modelNumber}).map((v, __i) => (
                                                        <Input 
                                                            className="w-max m-2"
                                                            onChange={(val) => {
                                                                handleChange(val.target.value, __i, _i, "type", structure.name)
                                                                
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        ))
}
                            </div>
}
                        {/* <div className="">{unit}</div>
                            <div className="">{structure.type[unitIndex] || "-"}</div> */}
                    </div>)}
                </div>
            </Card>

        </div>
    )
}

export default TableSpecs
