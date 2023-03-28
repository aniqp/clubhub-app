import React, { useState, useEffect, useRef } from "react";
import { storage } from "../Firebase/firebase";
import {
  ref, uploadBytes, uploadBytesResumable, getDownloadURL, listAll, deleteObject, getMetadata
} from "firebase/storage";
import ClubBoardHeader from './ClubBoardHeader';
import { useParams } from 'react-router-dom';
import { v4 } from "uuid"
import { Grid, ImageList, ImageListItem, Button, Typography, Modal, Card, CardContent, Box, Checkbox, Fab, CircularProgress } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudUploadIconOutlined from '@material-ui/icons/CloudUploadOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import InputIcon from '@material-ui/icons/Input';
import { toast } from 'react-toastify';
import { useUser } from '../Firebase';
import "react-toastify/dist/ReactToastify.css";
import history from "../Navigation/history";
import { serverURL } from '../../constants/config';

const ImageUploadAndDisplay = () => {

  const { clubID } = useParams()
  const user = useUser();
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [incorrectFileAlert, setIncorrectFileAlert] = useState(false)
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectMenu, setSelectMenu] = useState(false)
  const [checkedImages, setCheckedImages] = useState([])
  const [showMoveButton, setShowMoveButton] = useState(false)
  const [exploreImages, setExploreImages] = useState([])
  const [selectImagesModal, setSelectImagesModal] = useState(false)
  const [admin, setAdmin] = useState(false)
  // const [selectedImage, setSelectedImage] = useState(null)
  const [isPermitted, setIsPermitted] = React.useState(false);
  const [photosEmpty, setPhotosEmpty] = useState(false)

  React.useEffect(() => {
    if (user) {
      let userID = user.uid;
      // console.log(userID)
      getUserRole(userID);
    } else {
      setAdmin(false);
    }
  }, [user]);

  React.useEffect(() => {
    getClubMembers()
  })

  const getClubMembers = () => {
    // console.log('getting members');
    callApiGetClubMembers()
      .then(res => {
        var parsed = JSON.parse(res.express);
        if (parsed.length > 0 && user) {
          let x = parsed.find((member) => member.uid === user.uid)

          if (!x) {
            history.push('/')
          } else {
            setIsPermitted(true);
          }
        }
        if (parsed.length == 0) {
          history.push('/')
        }
      })
  }


  const callApiGetClubMembers = async () => {
    const url = serverURL + '/api/getClubMembers';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        clubID: clubID
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const getUserRole = (userID) => {
    callApiGetUserRole(userID)
      .then(res => {
        var parsed = JSON.parse(res.express);
        if (parsed.length >= 1) {
          if (parsed[0].role === 'owner' || parsed[0].role === 'admin') {
            setAdmin(true);
          }
        } else {
          setAdmin(false);
        }
        // console.log(parsed);
      })
  }

  const callApiGetUserRole = async (userID) => {
    const url = serverURL + '/api/getCurrentUserRole';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        clubID: clubID,
        userID: userID,
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  console.log(checkedImages)

  const fileInputRef = useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
    setIncorrectFileAlert(false)
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
      successfulUpload()
    }
  };

  const handleCheckChange = (event, image) => {
    let tempCheckedImages = checkedImages.slice()
    if (event.target.checked) {
      tempCheckedImages.push(image)
    }
    else {
      tempCheckedImages = tempCheckedImages.filter((storedImage) => storedImage !== image)
    }
    setCheckedImages(tempCheckedImages)
  }

  const handleExploreUpload = async () => {
    const listRef = ref(storage, `images/${clubID}/explore`);
    const list = await listAll(listRef);
    if (checkedImages.length > 0) {
      await Promise.all(list.items.map((fileRef) => deleteObject(fileRef)));
    }

    for (let i = 0; i < checkedImages.length; i++) {
      const checkedImage = ref(storage, checkedImages[i]);
      const checkedImageMetadata = await getMetadata(checkedImage)
      const checkedImageName = checkedImageMetadata.name
      const checkedImageUrl = await getDownloadURL(checkedImage)
      const targetRef = ref(storage, `images/${clubID}/explore/${checkedImageName}`);

      const response = await fetch(checkedImageUrl)
      const imageData = await response.blob()

      await uploadBytes(targetRef, imageData)
    }
  }

  const deleteImage = async (imageUrl) => {
    const imageName = getImageNameFromUrl(imageUrl);
    const imageRef = ref(storage, `${imageName}`);
    const exploreFileName = decodeURIComponent(imageUrl.split('/').pop().split('?')[0]).split("clubboard/")[1];
    const exploreFileRef = ref(storage, `images/${clubID}/explore/${exploreFileName}`)
    const exploreFileRefExists = await getDownloadURL(exploreFileRef)
      .then(() => true)
      .catch(() => false)
    await deleteObject(imageRef);
    if (exploreFileRefExists) {
      await deleteObject(exploreFileRef)
    }
    setImages((prevState) => prevState.filter((url) => url !== imageUrl));
    successfulDelete();
  };

  const formatFileName = async (item) => {
    const downloadUrl = await getDownloadURL(item);
    const filePath = decodeURIComponent(downloadUrl.split('/').pop().split('?')[0]);
    const fileName = filePath.split("explore/")[1]
    return fileName;
  }

  toast.configure();
  const alert = () => {
    toast.error("You can only select a maximum of 3 images to display on the explore page!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulDelete = () => {
    toast.success("Image successfully deleted.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulUpload = () => {
    toast.success("Image successfully uploaded.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  const successfulMove = () => {
    toast.success("Image(s) will be displayed on Explore page.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true
    });
  }

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, `images/${clubID}/clubboard`);
      const list = await listAll(listRef);
      const imageUrls = await Promise.all(list.items.map((item) => getDownloadURL(item)));
      setImages(imageUrls);
      if (imageUrls.length === 0) {
        setPhotosEmpty(true)
      }
    };
    fetchImages();
  }, [clubID]);

  useEffect(() => {
    const fetchExploreImages = async () => {
      const listRef = ref(storage, `images/${clubID}/explore`);
      const list = await listAll(listRef);
      // const imageUrlStrings = await Promise.all(list.items.map((item) => item.name))
      const checkedImageUrls = await Promise.all(list.items.map(async (item) => {
        const downloadUrl = await getDownloadURL(item);
        const fileName = decodeURIComponent(downloadUrl.split('/').pop().split('?')[0]).split("explore/")[1];
        const clubboardFileRef = ref(storage, `images/${clubID}/clubboard/${fileName}`)
        const clubboardDownloadUrl = await getDownloadURL(clubboardFileRef)
        return clubboardDownloadUrl
      }));
      setCheckedImages(checkedImageUrls)
    };
    fetchExploreImages();
  }, [selectImagesModal, selectMenu, clubID]);

  if (!isPermitted) {
    return null
  }

  return (
    <div>
      {/* <ClubBoardHeader active={"4"} /> */}
      <Grid container style={{ padding: '30px 30px' }}>
        <Grid item xs={7} style={{ display: 'flex', justifyContent: 'start', alignItems: photosEmpty === false ? 'flex-end' : 'flex-start' }}>
          <ImageGrid
            images={images}
            deleteImage={deleteImage}
            deleteMenu={deleteMenu}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            selectMenu={selectMenu}
            checkedImages={checkedImages}
            setCheckedImages={setCheckedImages}
            handleCheckChange={handleCheckChange}
            exploreImages={exploreImages}
            formatFileName={formatFileName}
            photosEmpty={photosEmpty}
          />
        </Grid>
        {/* if an image has been checked, show the option to display it on the explore page */}
        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
          {checkedImages.length > 0 && selectMenu &&
            <Fab size="large" variant="extended" color="secondary" aria-label="set explore page images"
              onClick={() => {
                if (checkedImages.length <= 3) {
                  handleExploreUpload();
                  setCheckedImages([]);
                  setSelectMenu(false);
                  setSelectImagesModal(true);
                  setTimeout(() => {
                    setSelectImagesModal(false)
                    setSelectMenu(false)
                    successfulMove()
                  }, 5000)
                } else {
                  alert();
                }
              }}>
              Display
              <InputIcon style={{ paddingLeft: '5px' }} />
            </Fab>
          }
        </Grid>
        <Grid item xs={2} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingBottom: '30px' }}>
          <ImageModal
            openModal={openModal}
            setImage={setImage}
            setOpenModal={setOpenModal}
            handleFileSelect={handleFileSelect}
            handleChange={handleChange}
            handleUpload={handleUpload}
            image={image}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            handleIncorrectFileAlert={handleIncorrectFileAlert}
            incorrectFileAlert={incorrectFileAlert}
            setIncorrectFileAlert={setIncorrectFileAlert}
          />
          {admin &&
            <ImageSpeedDial
              setOpenSpeedDial={setOpenSpeedDial}
              openSpeedDial={openSpeedDial}
              setOpenModal={setOpenModal}
              setDeleteMenu={setDeleteMenu}
              deleteMenu={deleteMenu}
              selectMenu={selectMenu}
              setSelectMenu={setSelectMenu}
              setCheckedImages={setCheckedImages}
            />
          }
        </Grid>
      </Grid>
      <Modal
        open={selectImagesModal}>
        <Card>
          <CardContent>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container item xs={12} justifyContent='center'>
                <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                  Uploading Images to Explore Page...
                </Typography>
              </Grid>
              <Grid container item xs={12} justifyContent='center'>
                <CircularProgress />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </div >
  );
}

const ImageGrid = (props) => {

  const [deletedImage, setImageDeleted] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleDeleteConfirm = () => {
    props.deleteImage(deletedImage);
    props.setOpenDeleteModal(false);
  };

  return (<>
    {props.photosEmpty === false ?
      <ImageList cols={3} gap={4} rowHeight={300} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', minWidth: '200px' }}>
        {props.images.map((image, index) => (
          <ImageListItem key={index} style={{ objectFit: 'cover', width: '250px' }}>
            <img src={image} alt="Club" onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(70%)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
              style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={() => { setSelectedImage(image) }}
            />
            {props.deleteMenu &&
              <div>
                <button
                  style={{
                    position: "absolute", top: 0, right: 0, background: "red", color: "white", borderRadius: "50%", border: "none", cursor: "pointer",
                  }}
                  onClick={() => {
                    props.setOpenDeleteModal(true);
                    setImageDeleted(image);
                  }}>
                  X
                </button>
              </div>
            }
            {props.selectMenu && <Checkbox ariaLabel='Checkbox' color="primary" icon={<CheckCircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
              onChange={(event) => props.handleCheckChange(event, image)}
              checked={props.checkedImages.includes(image)}
              style={{
                position: "absolute", top: 0, right: 0, borderRadius: "50%", border: "none", cursor: "pointer",
              }}
            />}
          </ImageListItem>
        ))}
      </ImageList>
      : <Typography variant="h5">This club has no photos.</Typography>}
    <ConfirmImageDeleteModal
      openDeleteModal={props.openDeleteModal}
      setOpenDeleteModal={props.setOpenDeleteModal}
      handleDeleteConfirm={handleDeleteConfirm}
    />
    <Modal
      open={Boolean(selectedImage)}
      onClose={() => setSelectedImage(null)}
    >
      <img src={selectedImage} alt="Club" style={{ maxHeight: '90vh', maxWidth: '90vw', margin: 'auto', display: 'block' }} />
    </Modal>
  </>
  )
}

const ImageModal = (props) => {
  return (
    <Modal
      open={props.openModal}
      onClose={() => {
        props.setImage(null)
        props.setOpenModal(false)
        props.setIncorrectFileAlert(false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ position: 'absolute', display: 'flex', alignContent: 'center', justifyContent: 'center', top: '15%' }}
    >
      <Card style={{ width: '550px', height: '450px', borderRadius: '10px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
        <CardContent style={{ justifyContent: 'center' }}>
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600, display: 'flex', justifyContent: 'center' }} variant="h5">Upload an image</Typography>
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 400, paddingBottom: '10px', display: 'flex', justifyContent: 'center' }} variant="h6">.PNG and .JPEG formats are accepted</Typography>
          <Grid container style={{ border: '2px dashed grey', height: '300px', display: 'flex', justifyContent: 'space-around', direction: 'column' }}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <CloudUploadIconOutlined style={{ height: '5em', width: '5em' }} />
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" color="primary" onClick={() => props.handleFileSelect()} style={{ display: 'flex', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                Choose File
              </Button>
              <input type="file" accept="image/jpeg, image/png" ref={props.fileInputRef} onChange={props.handleChange} style={{ display: 'none' }} />
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={
                () => (props.image.type === 'image/jpeg' || props.image.type === 'image/png') ?
                  props.handleUpload() : props.handleIncorrectFileAlert()}
                disabled={!props.image || props.isUploading} color="secondary" variant="contained" style={{ display: 'flex', padding: '10px', alignContent: 'flex-end', width: '10em', height: '3em' }}>
                {props.isUploading ? "Uploading..." : "Upload"}
              </Button>
            </Grid>
          </Grid>
          <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
            {props.image &&
              <Typography style={{ backgroundColor: '#D3D3D3', borderRadius: '10px' }}>Selected file: {props.image.name}</Typography>
            }
            {props.incorrectFileAlert &&
              <Alert severity="warning">
                You have selected a file that is not in .jpeg or .png format. File not uploaded. Please choose a .jpeg or .png file.
              </Alert>}
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

const ImageSpeedDial = (props) => {

  return (
    <SpeedDial
      ariaLabel="Speed Dial"
      icon={<MenuIcon />}
      direction='down'
      hidden={false}
      onOpen={() => { props.setOpenSpeedDial(true) }}
      onClose={() => {
        props.setOpenSpeedDial(false);
      }}
      open={props.openSpeedDial}
    >
      <SpeedDialAction
        key="Upload Image"
        icon={<CloudUploadIcon />}
        tooltipTitle="Upload Image"
        onClick={() => {
          props.setOpenModal(true);
          props.setDeleteMenu(false);
          props.setSelectMenu(false)
        }
        }
      />
      <SpeedDialAction
        key={props.deleteMenu === false ? "Delete Images" : "Escape View"}
        icon={props.deleteMenu === false ? <DeleteForeverIcon /> : <KeyboardReturnIcon />}
        tooltipTitle={props.deleteMenu === false ? "Select Images to Delete" : "Escape View"}
        onClick={
          () =>
          (props.deleteMenu === false ?
            (props.setDeleteMenu(true), props.setSelectMenu(false)) : props.setDeleteMenu(false)
          )}
      />
      <SpeedDialAction
        key={props.selectMenu === false ? "Select Images to Display on Explore Page" : "Escape View"}
        icon={props.selectMenu === false ? <SendIcon /> : <KeyboardReturnIcon />}
        tooltipTitle={props.selectMenu === false ? "Select Images to Display on Explore Page" : "Escape View"}
        onClick={() =>
        (props.selectMenu === false ?
          (props.setSelectMenu(true), props.setDeleteMenu(false)) : props.setSelectMenu(false)
        )}
      />
    </SpeedDial>
  )
}

const ConfirmImageDeleteModal = (props) => {
  return (
    <Modal
      open={props.openDeleteModal}
      onClose={() => props.setOpenDeleteModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ position: 'absolute', display: 'flex', alignContent: 'center', justifyContent: 'center', top: '20%' }}
    >
      <Card style={{ width: '25%', height: '30%', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent style={{ display: 'flex' }}>
          <Grid container style={{}}>
            <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography id="modal-modal-title" variant="h6" style={{ fontFamily: 'Montserrat', fontWeight: 400, display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                Delete this image?
              </Typography>
            </Grid>
            <Grid container item xs={6} justifyContent='center'>
              <Button variant="contained" color="secondary" onClick={() => props.setOpenDeleteModal(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid container item xs={6} justifyContent='center'>
              <Button variant="contained" coloar="primary" onClick={props.handleDeleteConfirm} sx={{ ml: 2 }}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default ImageUploadAndDisplay;
