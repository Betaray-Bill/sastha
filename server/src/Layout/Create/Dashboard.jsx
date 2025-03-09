import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus, UploadCloud, X } from "lucide-react";
import { variables } from "../../utils/constants";
import { toast } from "sonner";
import { db } from "../../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import ImageUpload from "./Dashboard/ImageUpload";
import Loading from "../Components/Loading";
import { useDispatch } from "react-redux";
import { resetGeneratorData, setGeneratorData } from "../../app/feature/generatorSlice";

function Dashboard() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [pdf, setPdf] = useState(null);
    const [pdfUploading, setPdfUploading] = useState(false); // Separate state for PDF upload
    const [images, setImages] = useState([]);
    const [IsLoading, setIsLoading] = useState(false); // Separate state for image upload
   
   
    // Function to receive data from the child
    const handleChildData = (childData) => {
        setImages(childData);
    };

   

    // Add data for variables
    const addData = (variable) => {
        if (variable.value === "LIST") {
            setData([
                ...data,
                {
                    type: variable.value,
                    content: {
                        header: "",
                        listItems: [],
                    },
                },
            ]);
        } else {
            setData([
                ...data,
                {
                    type: variable.value,
                    content: "",
                },
            ]);
        }
    };

    // Handle changes in input fields
    const handleChange = (value, type, index) => {
        if (type === "LIST") {
            setData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: {
                        header: value,
                        listItems: [...newData[index].content.listItems],
                    },
                };
                return newData;
            });
        } else {
            setData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    content: value,
                };
                return newData;
            });
        }
    };

    // Handle changes in list items
    const handleChangeList = (value, index, _i) => {
        const newData = [...data];
        newData[index].content.listItems[_i] = value;
        setData(newData);
    };

    // Delete a list item
    const deleteList = (index, _i) => {
        const newData = [...data];
        newData[index].content.listItems.splice(_i, 1);
        setData(newData);
    };

    // Delete a tag
    const deleteTag = (index) => {
        const newData = data.filter((_, _index) => _index !== index);
        setData(newData);
    };

    // Add a list item
    const addList = (index) => {
        const newData = [...data];
        if (!newData[index].content.listItems) {
            newData[index].content.listItems = [];
        }
        newData[index].content.listItems.push("");
        setData(newData);
    };

    // Upload PDF
    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if the file is a PDF
        if (file.type !== "application/pdf") {
            toast.error("Please upload a valid PDF file.");
            return;
        }

        setPdfUploading(true); // Start uploading
        try {
            // Simulate a delay for uploading (replace with actual upload logic)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setPdf(file);
            toast.success("PDF uploaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload PDF.");
        } finally {
            setPdfUploading(false); // Stop uploading
        }
    };

    // Delete uploaded PDF
    const deletePdf = () => {
        setPdf(null);
        // Clear the file input value to allow re-uploading the same file
        const fileInput = document.getElementById("pdf");
        if (fileInput) fileInput.value = "";
        toast.info("PDF deleted.");
    };


    // Upload to Cloudinary
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

    const uploadPDFToCloudinary = async (file) => {
        const cloudName = "de2i4bxdq"; // Replace with your Cloudinary cloud name
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`; // Use 'raw' type for PDFs
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "silverWhite-demo"); // Replace with your preset
        formData.append("resource_type", "raw"); // Explicitly setting resource type as raw
    
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("Failed to upload PDF to Cloudinary");
            }
    
            const data = await response.json();
            console.log(data)
            return data.secure_url; // Return the uploaded PDF URL
        } catch (error) {
            console.error("Cloudinary PDF upload error:", error);
            throw error;
        }
    };
    

    
      const fetchData = async () => {
        try {
          const generatorRef = collection(db, "generator");
          const querySnapshot = await getDocs(generatorRef);
          const generatorData = querySnapshot
              .docs
              .map((doc) => ({
                  id: doc.id,
                  ...doc.data()
              }));
          // setData(generatorData);
          dispatch(setGeneratorData(generatorData));
          
      } catch (error) {
          console.error("Error fetching car data:", error);
          alert("Failed to fetch car data. Please try again.");
      }
    }
    console.log(images)
    const dispatch = useDispatch()
    // Upload Images and Save Data to Firebase
    const uploadData = async () => {
      setIsLoading(p => !p)
      // check if the data is empty or nor
      if (data.length === 0) {
          toast.error("Please add data to save.");
          setIsLoading(p => !p)
          return;
      }

      // Check images are empty 
      if (images.length === 0) {
          toast.error("Please upload images to save.");
          setIsLoading(p => !p)
          return;
      }

      if(pdf === null){
        toast.error("Please upload a PDF to save.");
        setIsLoading(p => !p)
        return;
      }
      try {
          // Upload only the file to Cloudinary and get the URL
          const uploadedImageUrls = await Promise.all(
              images.map(async (img) => {
                  const url = await uploadToCloudinary(img.file);
                  return { src: url, alt: img.alt }; // Map back to its alt
              })
          );

          const uploadPdf = await uploadPDFToCloudinary(pdf)
  
        //   console.log(uploadedImageUrls);
  
          // Append images with src and alt to sendData 
          const sendData = {
              data:data,
              title:title,
              pdf:uploadPdf,
              images: uploadedImageUrls, // Now includes both src and alt
          };
  
          console.log(sendData);
  
          // Upload to Firestore
          const generatorDocRef = await addDoc(collection(db, "generator"), sendData);
          toast.success("Data uploaded successfully!");
          setIsLoading(p => !p)
          dispatch(resetGeneratorData())
          fetchData()
        //   dispatch()
      } catch (err) {
          console.error(err);
          toast.error("Failed to upload data.");
      setIsLoading(p => !p)

      }
  };
  

    return (
        <div className="w-full p-14">
        {/* <Loading /> */}
            <div className="flex items-center justify-between w-[80vw] mx-auto bg-black opacity-90 rounded-md px-3 py-1 my-3">
                <span className="text-gray-300 text-sm">Changes made need to be saved</span>
                <Button className="text-white   hover:opacity-40" onClick={uploadData}>{IsLoading ? "Saving..." : "Save"}</Button>
            </div>
            
            <div className="flex gap-6 w-[80vw] mx-auto">
                {/* Output Section */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center justify-between border-b py-4">
                                <div className="text-xl font-semibold">Create a Generator Type</div>
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
                                    className="mt-2"
                                />
                            </div>

                            {/* Upload PDF Section */}
                            <Card className="p-4">
                                <div className="space-y-4">
                                    <Label htmlFor="pdf">Upload PDF</Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="pdf"
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                                                pdfUploading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                                                {pdfUploading ? (
                                                    <p className="text-sm text-gray-500">Uploading...</p>
                                                ) : (
                                                    <>
                                                        <p className="text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                                                    </>
                                                )}
                                            </div>
                                            <Input
                                                id="pdf"
                                                type="file"
                                                onChange={handlePdfUpload}
                                                className="hidden"
                                                disabled={pdfUploading} // Disable input during upload
                                                accept="application/pdf" // Only allow PDFs
                                            />
                                        </label>
                                    </div>
                                    {pdf && (
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-sm text-gray-700">Uploaded PDF: {pdf.name}</p>
                                            <Button variant="ghost" size="icon" onClick={deletePdf}>
                                                <X className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Display Data */}
                            {data.map((item, index) => {
                                if (item.type === "H1") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter Header</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="Write header"
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "H1", index)}
                                                className="mt-2"
                                            />
                                        </Card>
                                    );
                                }

                                if (item.type === "LIST") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter List</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                            <div className="flex items-start gap-2 mt-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Write list header"
                                                    value={item.content.header}
                                                    onChange={(e) => handleChange(e.target.value, "LIST", index)}
                                                />
                                                <Button onClick={() => addList(index)}>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add List Item
                                                </Button>
                                            </div>
                                            <ul className="mt-4 space-y-2">
                                                {item.content.listItems?.map((listItem, _i) => (
                                                    <li key={_i} className="flex items-center gap-2">
                                                        <span>{_i + 1}.</span>
                                                        <Input
                                                            type="text"
                                                            placeholder="Write list item"
                                                            value={listItem}
                                                            onChange={(e) => handleChangeList(e.target.value, index, _i)}
                                                        />
                                                        <Button variant="ghost" size="icon" onClick={() => deleteList(index, _i)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
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
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="Write sub heading"
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "h2", index)}
                                                className="mt-2"
                                            />
                                        </Card>
                                    );
                                }

                                if (item.type === "Paragraph") {
                                    return (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Enter Paragraph</Label>
                                                <Button variant="ghost" size="icon" onClick={() => deleteTag(index)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                            <Textarea
                                                placeholder="Write paragraph..."
                                                value={item.content}
                                                onChange={(e) => handleChange(e.target.value, "Paragraph", index)}
                                                className="mt-2"
                                            />
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
                                <Button
                                    key={index}
                                    className="flex items-center px-4 py-2"
                                    onClick={() => addData(variable)}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>{variable.name}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Image Upload Section */}
            <ImageUpload sendDataToParent={handleChildData} />
        </div>
    );
}

export default Dashboard;