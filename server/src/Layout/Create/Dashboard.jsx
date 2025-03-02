import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Trash2, Plus} from "lucide-react"; // Icons from Lucide React
import {variables} from "../../utils/constants";
import {toast} from "sonner"
import ImageUpload from "./Dashboard/ImageUpload";

function Dashboard() {
    const [data,
        setData] = useState([]);
    const [title,
        setTitle] = useState("");
    const [pdf,
        setPdf] = useState("");

    const addData = (variable) => {
        if (variable.value === "LIST") {
            setData([
                ...data, {
                    type: variable.value,
                    content: {
                        header: "",
                        listItems: []
                    }
                }
            ]);
        } else {
            setData([
                ...data, {
                    type: variable.value,
                    content: ""
                }
            ]);
        }
    };

    const handleChange = (value, type, index) => {
        if (type === "LIST") {
            setData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: {
                        header: value,
                        listItems: [...newData[index].content.listItems]
                    }
                };
                return newData;
            });
        } else {
            setData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: value
                };
                return newData;
            });
        }
    };

    const handleChangeList = (value, index, _i) => {
        const newData = [...data];
        newData[index].content.listItems[_i] = value;
        setData(newData);
    };

    const deleteList = (index, _i) => {
        const newData = [...data];
        newData[index]
            .content
            .listItems
            .splice(_i, 1);
        setData(newData);
    };

    const deleteTag = (index) => {
        const newData = data.filter((_, _index) => _index !== index);
        setData(newData);
    };

    const addList = (index) => {
        const newData = [...data];
        if (!newData[index].content.listItems) {
            newData[index].content.listItems = [];
        }
        newData[index]
            .content
            .listItems
            .push("");
        setData(newData);
    };

    // Upload PDF
    const handlePdfUpload = (e) => {
        try {
            // Upload PDF to firebase
            setPdf(e.target.files[0])
            toast("File has been Uploaded", {
                // description: "Sunday, December 03, 2023 at 9:00 AM",
                variant: "success",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo")
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    // Function to receive data from the child
    const [images, setImages] = useState([]);
    const handleChildData = (childData) => {
      setImages(childData);
    };

    // Upload Images Save Data to firebase
    const uploadData = async() => {
        try {
            // Upload data to firebase
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-full p-14">
            <div className="flex gap-6 w-[80vw] mx-auto">
                {/* Output Section */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center justify-between border-b py-4">
                                <div className="text-xl font-semibold">
                                    Create a Generator Type
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
               
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="title">Enter Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-2"/>
                            </div>

                            {/* Upload PDF */}
                            <Card className="p-4">
                                <div>
                                    <Label htmlFor="pdf">Upload PDF</Label>
                                    <Input id="pdf" type="file" onChange={handlePdfUpload} className="mt-2 w-max"/>

                                </div>
                            </Card>

                            {data.map((item, index) => {
                                if (item.type === "H1") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter Header</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500"/>
                                                </Button>
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="Write header"
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "H1", index)}
                                                className="mt-2"/>
                                        </Card>
                                    );
                                }

                                if (item.type === "LIST") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter List</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500"/>
                                                </Button>
                                            </div>
                                            <div className="flex items-start gap-2 mt-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Write list header"
                                                    value={item.content.header}
                                                    onChange={(e) => handleChange(e.target.value, "LIST", index)}/>
                                                <Button onClick={() => addList(index)}>
                                                    <Plus className="h-4 w-4 mr-2"/>
                                                    Add List Item
                                                </Button>
                                            </div>
                                            <ul className="mt-4 space-y-2">
                                                {item.content.listItems
                                                    ?.map((listItem, _i) => (
                                                        <li key={_i} className="flex items-center gap-2">
                                                            <span>{_i + 1}.</span>
                                                            <Input
                                                                type="text"
                                                                placeholder="Write list item"
                                                                value={listItem}
                                                                onChange={(e) => handleChangeList(e.target.value, index, _i)}/>
                                                            <Button variant="ghost" size="icon" onClick={() => deleteList(index, _i)}>
                                                                <Trash2 className="h-4 w-4 text-red-500"/>
                                                            </Button>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </Card>
                                    );
                                }

                                if (item.type === "H2") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter Sub Heading</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500"/>
                                                </Button>
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="Write sub heading"
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "h2", index)}
                                                className="mt-2"/>
                                        </Card>
                                    );
                                }

                                if (item.type === "Paragraph") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter Paragraph</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500"/>
                                                </Button>
                                            </div>
                                            <Textarea
                                                placeholder="Write paragraph..."
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "Paragraph", index)}
                                                className="mt-2"/>
                                        </Card>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Add Variables Section */}
                <Card className="w-[350px] h-[fit-content]">
                    <CardHeader>
                        <CardTitle>Add Variables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {variables.map((variable, index) => (
                                <Button key={index} // variant="outline"
    className="flex items-center px-4 py-2 " onClick={() => addData(variable)}>
                                    <Plus className="h-4 w-4"/>
                                    <span>{variable.name}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ImageUpload sendDataToParent={handleChildData}/>
        </div>
    );
}

export default Dashboard;