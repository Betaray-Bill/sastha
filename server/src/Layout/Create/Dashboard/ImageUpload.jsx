import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import {Trash2} from "lucide-react"; // Icons from Lucide React
import {toast} from "sonner";

function ImageUpload({sendDataToParent}) {
    const [images,
        setImages] = useState([]);

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        // alert(file.size)
        if (!file) 
            return;
        
        const isValidSize = file.size <= 10200 * 1024; // 500 KB
        // alert(isValidSize)
        if (!isValidSize) {
            toast("File Exceeds 500KB size", {
                // description: "Sunday, December 03, 2023 at 9:00 AM",
                variant: "success",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo")
                }
            })
            // alert(`${file.name} exceeds the 500 KB size limit.`);
            return
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const data = [...images]; // Copy the current images array
                data[index] = {
                    src: reader.result,
                    alt: file.name
                }; // Store the data URL
                setImages(data);
            };
        }
    };

    const removeImage = (index) => {
        const data = [...images]; // Copy the current images array
        data.splice(index, 1); // Remove the specific index
        setImages(data); // Update the state
    };

    const handleChange = (e, index) => {
        //
        const value = e.target.value;
        setImages(p => {
            const newData = [...p];
            newData[index].alt = value;
            return newData;
        })
    }

    useEffect(() => {
        sendDataToParent(images)
    }, [images])

    const uploadToCloudinary = async (file) => {
        const cloudName = "de2i4bxdq";
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "silverWhite-demo");

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to upload image to Cloudinary");
            }
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
    };

    return (
        <div>
            <Card className="w-[80vw] mt-10 mx-auto p-4">
                {/* Upload Product Images */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Upload Images</h2>
                    
                </div>
                <Card className="p-4">
                    <div>
                        <div className="flex items-center pb-4">
                            <Label htmlFor="images" className="font-semibold">Upload Product Images</Label>
                            <Button
                                className="ml-5"
                                onClick={() => {
                                setImages([
                                    ...images, {
                                        src: '',
                                        alt: ''
                                    }
                                ]);
                            }}>
                                Add Image
                            </Button>
                        </div>
                      
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="border rounded-md p-3">
                                    {images[index]
                                        ?.src
                                            ? (
                                                <div className="flex items-start justify-between">
                                                    <div className="mx-2">
                                                        <img
                                                            src={images[index].src}
                                                            alt={images[index]
                                                            ?.alt}
                                                            className="w-[140px] h-[150px] object-fill"/>
                                                    </div>
                                                    <div>
                                                        <Textarea className="w-[200px]" placeholder="Description" onChange={(e) => handleChange(e, index)}/>
                                                    </div>
                                                    <Trash2
                                                        className="cursor-pointer"
                                                        style={{
                                                        color: "red"
                                                    }}
                                                        size={20}
                                                        onClick={() => removeImage(index)}/>
                                                </div>
                                            )
                                            : (
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor={`images-${index}`} className="w-max">Upload Image</Label>
                                                    <Input
                                                        type="file"
                                                        id={`images-${index}`}
                                                        name={`images-${index}`}
                                                        accept="image/*"
                                                        className="w-max"
                                                        onChange={(e) => handleImageUpload(e, index)}/>
                                                    <Trash2
                                                        className="cursor-pointer"
                                                        style={{
                                                        color: "red"
                                                    }}
                                                        size={20}
                                                        onClick={() => removeImage(index)}/>
                                                </div>
                                            )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </Card>
        </div>
    );
}

export default ImageUpload;
