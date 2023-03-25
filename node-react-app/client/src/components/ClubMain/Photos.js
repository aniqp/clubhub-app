import React, { useState, useEffect } from "react";
import { storage } from "../Firebase/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import ClubBoardHeader from './ClubBoardHeader';
import { useParams } from 'react-router-dom';
import { v4 } from "uuid"
import { Grid, ImageList, ImageListItem, Button, Typography, Modal } from '@material-ui/core'
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function ImageUploadAndDisplay() {

  const { clubID } = useParams()
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const getImageNameFromUrl = (url) => {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const encodedName = pathParts[pathParts.length - 1];
    return decodeURIComponent(encodedName);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const storageRef = ref(storage, `images/${clubID}/clubboard/${image.name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      () => { },
      (error) => {
        console.log(error);
        setIsUploading(false);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        setImages((prevState) => [...prevState, url]);
        setIsUploading(false);
      }
    );
  };

  const deleteImage = async (imageUrl) => {
    const imageName = getImageNameFromUrl(imageUrl);
    const imageRef = ref(storage, `${imageName}`);
    await deleteObject(imageRef);
    setImages((prevState) => prevState.filter((url) => url !== imageUrl));
  };

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, `images/${clubID}/clubboard`);
      const list = await listAll(listRef);
      const imageUrls = await Promise.all(list.items.map((item) => getDownloadURL(item)));
      setImages(imageUrls);
    };
    fetchImages();
  }, [clubID]);

  return (
    <div>
      <ClubBoardHeader active={"5"} />
      <Grid container style={{ padding: '30px 30px' }}>
        <Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <ImageList cols={3} gap={4} style={{ alignItems: 'center' }}>
            {images.map((image, index) => (
              <ImageListItem key={index} style={{ objectFit: 'cover' }}>
                <img src={image} alt="Club" style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '100%' }} />
                <button
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteImage(image)}
                >
                  X
                </button>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={4} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingBottom: '30px' }}>
          {/* <input type="file" onChange={handleChange} /> */}
          <SpeedDial
            ariaLabel="Speed Dial"
            icon={<MenuIcon />}
            direction='down'
            hidden={false}
            onOpen={() => { setOpenSpeedDial(true) }}
            onClose={() => { setOpenSpeedDial(false) }}
            open={openSpeedDial}
          >
            <SpeedDialAction
              key="Upload Image"
              icon={<CloudUploadIcon />}
              tooltipTitle="Upload Image"
            />
            <SpeedDialAction
              key="Select Images to Display on Explore Page"
              icon={<SendIcon />}
              tooltipTitle="Select Images to Display on Explore Page"
            />
            <SpeedDialAction
              key="Delete Images"
              icon={<DeleteForeverIcon />}
              tooltipTitle="Select an Image to Delete"
            />
          </SpeedDial>
          {/* <Button onClick={handleUpload} disabled={!image || isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default ImageUploadAndDisplay;
