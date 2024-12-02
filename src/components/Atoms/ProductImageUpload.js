import React, {useCallback, useContext, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import {Card, Button} from "react-bootstrap";
import {AiOutlineUpload} from "react-icons/ai";
import {VendorContext} from "../../context/VendorContext";
import "../../assets/Css/ProductForm.css";
const ProductImageUpload = () => {
    const {setimages, images} = useContext(VendorContext);

    const onDrop = useCallback((acceptedFiles) => {
        setimages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);

    useEffect(() => {
        console.log("Updated images array:", images);
    }, [images]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: "image/png, image/jpeg, video/mp4",
        maxSize: 50 * 1024 * 1024, // 50 MB
    });

    return (
        <Card className="mx-auto shadow-sm body mt-4" style={{maxWidth: "400px", width: "100%"}}>
            <h5 className="subHeading p-3 text-center">Add Product Image</h5>
            <hr className="divider" />
            <Card.Body className="p-3">
                <div
                    {...getRootProps()}
                    className={`image-upload-area border border-dashed rounded text-center mb-3 p-4 ${
                        isDragActive ? "active-dropzone" : ""
                    }`}
                    style={{
                        minHeight: "150px",
                        maxWidth: "100%",
                        margin: "0 auto",
                    }}
                >
                    <input {...getInputProps()} />
                    <AiOutlineUpload size={30} className="mb-2" />
                    <p className="mb-1 fs-6">
                        {isDragActive ? "Drop the files here..." : "Drag and drop or browse files"}
                    </p>
                    <small className="text-muted">PNG, JPG, and MP4 format, up to 50 mb</small>
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="outline-secondary" className="d-flex align-items-center">
                        <AiOutlineUpload className="me-2" />
                        Add Another Image
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductImageUpload;
