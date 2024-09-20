import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./Addimage.css";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";
import { uploadImage } from "../../connecting";
import { redeemCoin } from "../../store/userData";

const Addimage = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [showModal, setShowModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const fileInputRef = useRef(null); // Reference to the file input
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const Dispatch = useDispatch()


  const handleUploadClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login to upload images.", {
        className: "toast-error",
        bodyClassName: "toast-error-body",
      });
    } else {
      setShowModal(true); // Show modal when button is clicked
    }
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setShowModal(false); // Close the modal after acceptance
    fileInputRef.current.click(); // Open the file input
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onSubmit(e.target.files); // Automatically submit the form when a file is selected
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data[0]); // Append the file to formData

    const responce = await handleExtractText(data[0]);

    const regex = /Lat\s([0-9.]+)[^\d]+Long\s([0-9.]+)/;
    const match = responce.match(regex);
    console.log(responce);

    

    if(match && match.length <3 ){
      toast.error("image from gps map camera is required" , {style: { backgroundColor: "red", color: "white" }});
      return 0;
    }

    let lat = Number( match[1]);
    let long = Number( match[2]);

    lat = parseFloat(lat.toFixed(4));
    long = parseFloat(long.toFixed(4));

    if(!lat || !long){
      toast.error("image from gps map camera is required" , {style: { backgroundColor: "red", color: "white" }});
      return 0;
    }

    //toast.success(lat , {style : {background : "green" , color : "white"}})
    formData.append("lat" , lat);
    formData.append("long" , long);
    
    await uploadImage(formData) 
    .then((res) => {
      console.log(res);
      toast.success(res.data , {style : {background : "green" , color : "white"}})
      Dispatch(redeemCoin(res?.message?.user?.coins))
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.toString() , {style: { backgroundColor: "#9c0e03", color: "white" }})
      });
  
    reset(); // Reset the form after submission
  };

  const handleExtractText = async (imageFile) => {
    const API_KEY = 'K83385653188957';
    if (!imageFile) {
      console.error('Please upload an image.');
      return;
    }
    //console.error('');

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('language', 'eng');
    formData.append('apikey', API_KEY);

    try {
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.IsErroredOnProcessing) {
        console.error('Error extracting text from the image.');
      } else {
        console.log(data.ParsedResults[0].ParsedText);
        return(data?.ParsedResults[0]?.ParsedText);
      }
    } catch (err) {
      console.error('Error with the OCR API.');
    }
  };

  return (
    <div className="fullcarbonuplod">
      
      <div className="binboxforuploadimg">
        <div className="fornav">
          <Navbar />
        </div>
        <h1 className="headinginupload">Upload Image here</h1>

        <div className="uploadimg">
          <button
            className="upload-button"
            onClick={handleUploadClick}
            disabled={!isLoggedIn} // Disable if not logged in
          >
            <img
              src={image}
              alt="Upload Icon"
              className="upload-icon"
            />
            Upload Image
          </button>

          <form>
            <input
              type="file"
              accept="image/*"
              {...register("file", {
                required: true,
              })}
              ref={fileInputRef} // Link the ref to input to trigger onAccept
              style={{ display: "none" }} // Hide input initially
              id="file"
              onChange={handleFileChange} // Automatically submit when a file is selected
            />
            {errors.file && <p className="error-message">{errors.file.message}</p>}
          </form>
        </div>
      </div>

      <div className="carbon">
        <div className="line"></div>
        <h1>Calculate your carbon footprints</h1>
        <Link to="/footprint">
          <button className="btn">Check</button>
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Important Notes Before Uploading</h2>
            <ul>
              <li>
                - The image must not be the same as a previously uploaded image.
                If it is, you will lose points.
              </li>
              <li>- The image must contain both a human and a plant.</li>
              <li>
                - The new plant should be at least 1 meter away from the
                previously uploaded plant.
              </li>
            </ul>
            <button onClick={handleAccept}>I Accept</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addimage;
