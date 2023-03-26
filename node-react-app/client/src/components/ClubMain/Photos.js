import React, { useState, useEffect, useRef } from "react";
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
import { Grid, ImageList, ImageListItem, Button, Typography, Modal, Card, CardContent, Box } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudUploadIconOutlined from '@material-ui/icons/CloudUploadOutlined';
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
  const [incorrectFileAlert, setIncorrectFileAlert] = useState(false)

  const fileInputRef = useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const getImageNameFromUrl = (url) => {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const encodedName = pathParts[pathParts.length - 1];
    return decodeURIComponent(encodedName);
  };

  const handleIncorrectFileAlert = () => {
    setIncorrectFileAlert(true);
    setImage(null)
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (incorrectFileAlert === false) {
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
      setOpenModal(false)
      setImage(null)
    }
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
          <ImageList cols={3} gap={4} rowHeight={300} style={{ alignItems: 'center' }}>
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
          <Modal
            open={openModal}
            onClose={() => {
              setImage(null)
              setOpenModal(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: 'absolute', display: 'flex', alignContent: 'center', justifyContent: 'center', top: '15%' }}
          >
            <Card style={{ width: '40%', height: '90%', borderRadius: '10px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
              <CardContent style = {{justifyContent: 'center'}}>
                <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600, display: 'flex', justifyContent: 'center' }} variant="h5">Upload an image</Typography>
                <Typography style={{ fontFamily: 'Montserrat', fontWeight: 400, paddingBottom: '10px', display: 'flex', justifyContent: 'center' }} variant="h6">.PNG and .JPEG formats are accepted</Typography>
                <Grid container style={{ border: '2px dashed grey', height: '65%', display: 'flex', justifyContent: 'space-around', direction: 'column' }}>
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <CloudUploadIconOutlined style={{ height: '5em', width: '5em' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => handleFileSelect()} style={{ display: 'flex', padding: '10px', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                      Choose File
                    </Button>
                    <input type="file" accept="image/jpeg, image/png" ref={fileInputRef} onChange={(handleChange)} style={{ display: 'none' }} />
                  </Grid>
                  <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={
                      () =>
                        (image !== null & image.type === 'image/jpeg' || image.type === 'image.png') ?
                          handleUpload() : handleIncorrectFileAlert()
                    } disabled={!image || isUploading} color="secondary" variant="contained" style={{ display: 'flex', padding: '10px', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </Grid>
                </Grid>
                <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  {image &&
                    <Typography style={{ backgroundColor: '#D3D3D3', borderRadius: '10px' }}>Selected file: {image.name}</Typography>
                  }
                  {incorrectFileAlert &&
                    <Alert severity="warning">
                      You have selected a file that is not in .jpeg or .png format. File not uploaded.
                    </Alert>}
                </Grid>
              </CardContent>
            </Card>
          </Modal>
          <SpeedDial
            ariaLabel="Speed Dial"
            icon={<MenuIcon />}
            direction='down'
            hidden={false}
            onOpen={() => { setOpenSpeedDial(true) }}
            onClose={() => {
              setOpenSpeedDial(false);
            }}
            open={openSpeedDial}
          >
            <SpeedDialAction
              key="Upload Image"
              icon={<CloudUploadIcon />}
              tooltipTitle="Upload Image"
              onClick={() => setOpenModal(true)}
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
        </Grid>
      </Grid>
    </div >
  );
}

export default ImageUploadAndDisplay;
