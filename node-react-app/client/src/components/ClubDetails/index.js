import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useUser } from '../Firebase';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Button, CardHeader } from '@material-ui/core';
import Item from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import close from '../../images/close-icon.png';
import { TextField } from '@material-ui/core';
import { serverURL } from '../../constants/config';
import Alert from '@material-ui/lab/Alert';
import { storage } from "../Firebase/firebase";
import Modal from '@material-ui/core/Modal'
import {
    ref, getDownloadURL, listAll
} from "firebase/storage";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1500,
        alignItems: "center",
        justifycontent: "center",
        marginLeft: '100px'
    },
    title: {
        textAlign: 'justify',
        borderRadius: '3px',
        marginTop: '50px',
        maxWidth: 1150,
        marginLeft: '-15px',
        fontFamily: 'Arvo, serif'
    }
}));


const ClubDetails = () => {

    const classes = useStyles();
    const [clubTitle, setClubTitle] = React.useState("")
    const [clubDescription, setClubDescription] = React.useState("")
    const [editModalOpen, setEditModelOpen] = React.useState(false);
    const { clubID } = useParams();
    const user = useUser();
    const [admin, setAdmin] = React.useState(false);
    const [images, setImages] = React.useState([])
    const [selectedImage, setSelectedImage] = React.useState(null)

    //Success Message for Edited Descriptions
    const [isEdited, setIsEdited] = React.useState(false);

    useEffect(() => {
        getClubs();
        if (user) {
            let userID = user.uid;
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, []);

    useEffect(() => {
        console.log('changing users')
        if (user) {
            let userID = user.uid;
            getUserRole(userID);
        } else {
            setAdmin(false);
        }
    }, [user]);

    useEffect(() => {
        const fetchImages = async () => {
            const listRef = ref(storage, `images/${clubID}/explore`);
            const list = await listAll(listRef);
            const imageUrls = await Promise.all(list.items.map((item) => getDownloadURL(item)));
            setImages(imageUrls);
        };
        fetchImages();
    }, [clubID]);

    const getUserRole = (userID) => {
        callApiGetUserRole(userID)
            .then(res => {
                console.log('hello')

                var parsed = JSON.parse(res.express);
                if (parsed.length >= 1) {
                    if (parsed[0].role === 'owner' || parsed[0].role === 'admin') {
                        setAdmin(true);
                    }
                } else {
                    setAdmin(false);
                }
                console.log(parsed);
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

    const getClubs = () => {
        console.log("getClubs loaded")
        callApiGetClubs()
            .then(res => {
                console.log("callApiGetClubs returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetClubs: ", parsed);
                setClubTitle(parsed[0].name)
                setClubDescription(parsed[0].description)
            })
    }

    const callApiGetClubs = async () => {
        const url = serverURL + '/api/getClubs';
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
        console.log("Searched club: ", body);
        return body;
    }

    const handleEditClick = (description) => {
        callApiEditDescription(description);
        setTimeout(() => getClubs(), 1000);
        setEditModelOpen(false);
        setIsEdited(true);
        setTimeout(() => setIsEdited(false), 7000);
    }

    const callApiEditDescription = async (description) => {
        const url = serverURL + '/api/editClubDescription';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: clubID,
                description: description
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    return (
        <Grid className={classes.root}>
            <Typography className={classes.title} variant='h4' align="center">
                {clubTitle}
            </Typography>
            <br></br>
            <Grid container spacing={4} direction="column">
                <Grid item xs={9} style={{ padding: '20px 0' }}>
                    {isEdited && <Box style={{ margin: '0 0 20px 0' }}><Alert style={{ margin: '10px 0 10px 0' }} onClose={() => { setIsEdited(false) }} severity="success">
                        The club description was edited successfully!</Alert></Box>}
                    <Item>
                        <Card
                            variant="elevation"
                            style={{ backgroundColor: 'light-grey' }}>
                            <CardHeader title="Description"
                                action={<>
                                    {admin && <>
                                        <Button fullWidth style={{ color: '#fff', background: '#3f51b5' }} onClick={() => setEditModelOpen(true)}>Edit Description</Button>
                                        <EditModal name={clubTitle} description={clubDescription} open={editModalOpen} onClose={() => setEditModelOpen(false)} onSubmit={handleEditClick} />
                                    </>}
                                </>} />
                            <CardContent>
                                <Typography variant='p' color='textPrimary'>
                                    {clubDescription}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={9}>
                    <ImageList cols={3} gap={10} rowHeight={300}>
                        {images.map((image, index) => (
                            <ImageListItem key={index} style={{ objectFit: 'cover', minWidth: '200px' }}>
                                <img src={image} alt="Club" onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(70%)'}
                                    onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
                                    style={{ borderRadius: '16px', objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer' }}
                                    onClick={() => { setSelectedImage(image) }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
            <Modal
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
            >
                <img src={selectedImage} alt="Club" style={{ maxHeight: '90vh', maxWidth: '90vw', margin: 'auto', display: 'block' }} />
            </Modal>
        </Grid>
    )
}


export default ClubDetails;

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    zIndex: 1000,
    width: '40vw',
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

const EditModal = ({ description, open, onClose, onSubmit, name }) => {
    const [newDescription, setNewDescription] = React.useState(description);

    const handleEnteredDescription = (event) => {
        setNewDescription(event.target.value);
    }

    const handleDescriptionSubmission = () => {

        if (newDescription === "") {
            setNewDescription("No club description provided");
        }

        onSubmit(newDescription);
    }

    if (!open) return null

    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid item style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button onClick={onClose}><img src={close} style={{ height: '25px' }}></img></Button>
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                        <b>Edit {name}'s club description:</b>
                    </Grid>
                    <Grid item style={{ padding: '25px' }}>
                        <Box style={{ padding: '15px 0 0 0' }}>
                            <TextField
                                onChange={handleEnteredDescription}
                                required
                                label="Description"
                                defaultValue={description}
                                multiline
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onClick={onClose} variant='outlined' style={{ margin: '0 10px' }}>Cancel</Button>
                        <Button onClick={handleDescriptionSubmission} variant='outlined' style={{ margin: '0 10px' }}>Edit</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )

}
