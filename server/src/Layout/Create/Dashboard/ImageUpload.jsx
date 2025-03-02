import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card} from "@/components/ui/card";
import {Trash2, UploadCloud, X} from "lucide-react"; // Icons from Lucide React
import {toast} from "sonner";

function ImageUpload({sendDataToParent}) {
    const [images,
        setImages] = useState([]);
    const [imageUploading, setImageUploading] = useState(false); // Separate state for image upload

   // Handle image upload
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
    
        setImageUploading(true); // Start uploading
        try {
            const newImages = Array.from(files).map((file) => ({
                src: URL.createObjectURL(file), // Generate preview URL
                file,
                url: URL.createObjectURL(file),
                alt: "", // Use file name or default alt
            }));
    
            setImages((prevImages) => [...prevImages, ...newImages]); // Append new images
            toast.success("Images uploaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload images.");
        } finally {
            setImageUploading(false); // Stop uploading
        }
    };

    

     // Delete uploaded image
     const deleteImage = (index) => {
         setImages((prevImages) => {
             const updatedImages = prevImages.filter((_, i) => i !== index);
             return updatedImages;
         });
     
         // Clear the file input value to allow re-uploading the same file
         const fileInput = document.getElementById("image");
         if (fileInput) fileInput.value = "";
     
         toast.info("Image deleted.");
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

    const handleChangeText = (e, index) => {
        const value = e.target.value;
        setImages(p => {
            const newData = [...p];
            newData[index].alt = value;
            return newData;
        })
    }


    return (
        <div className="w-[80vw] mx-auto mt-6">
        <Card className="p-4">
            <div className="space-y-4">
                <Label htmlFor="image">Upload Image</Label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="image"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                            imageUploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                            {imageUploading ? (
                                <p className="text-sm text-gray-500">Uploading...</p>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">JPG, PNG (MAX. 500KB)</p>
                                </>
                            )}
                        </div>
                        <Input
                            id="image" // Ensure this matches the ID used in deleteImage
                            type="file"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={imageUploading} // Disable input during upload
                            accept="image/*" // Only allow images
                            multiple // Allow multiple images
                        />
                    </label>
                </div>
                {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {images.map((img, index) => (
                            <div>
                                <div key={index} className="relative">
                                    <img
                                        src={img.src}
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-full h-[250px] rounded-lg"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute cursor-pointer top-1 right-1 bg-red-50 hover:bg-red-200 text-white"
                                        onClick={() => deleteImage(index)}
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                                <Textarea
                                    type="text"
                                    placeholder="Alt text"
                                    value={img.alt}
                                    className="my-2"
                                    onChange={(e) => handleChangeText(e, index)} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    </div>
    );
}

export default ImageUpload;
