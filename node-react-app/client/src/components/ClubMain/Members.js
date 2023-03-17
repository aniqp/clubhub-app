import React, { useMemo } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import profile from "../../images/profile-icon.png";
import membersIcon from "../../images/members.png";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "../Firebase";
import { serverURL } from "../../constants/config";
import { async } from "@firebase/util";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: "20px 10px 20px 30px",
  },
  card: {
    display: "flex",
    margin: "10px 10px",
    padding: "10px 10px",
    alignItems: "center",
    height: "75px",
  },
  header: {
    display: "flex",
    padding: "0 10px 0px 10px",
    boxShadow: "none",
    background: "none",
  },
  profile: {
    height: "30px",
    padding: "0 15px 0 5px",
  },
  memberCount: {
    margin: "30px 0 30px 0",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerFont: {
    fontWeight: "600",
  },
  role: {
    padding: "5px 15px",
    borderRadius: "5px",
  },
  ownerRole: {
    background: "rgba(149, 0, 204, 0.1)",
  },
  adminRole: {
    background: "rgba(255, 104, 104, 0.1)",
  },
  userRole: {
    background: "rgba(136, 191, 255, 0.1)",
  },
  text1: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  text2: {
    fontWeight: "600",
    fontSize: "25pt",
  },
}));

const Application = ({ members, acceptAll }) => {
  const classes = useStyles();
  const { clubID } = useParams();
  const authHeader = useAuthHeader();
    const applicants = useMemo(
      () => members?.filter((_) => _.role === "pending"),
      [members]
    );
//   const applicants = [{ name: "George" }];

  const acceptUser = async (user) => {
    const request = {
      method: "POST",
      headers: {
        ...authHeader(),
        Accept: "*/*",
      },
      body: {
        user,
        clubID,
      },
    };
    const URL = serverURL + "/api/acceptUser";
    // Fetch accept user api
    try {
      const response = await fetch(URL, request);
    } catch {
      console.error("Could not accept user");
    }
  };

  return (
    <Grid xs={2} item>
      Application
      <Card className={classes.card}>
        Application Type: {acceptAll ? "AcceptAll" : "See Applicants"}
      </Card>
      {!acceptAll &&
        applicants?.map((app) => (
          <Card
            xs={2}
            key={app.uid}
            sx={{ justifyContent: "space-between" }}
            className={classes.Card}
          >
            <span>{app.name}</span>
            <Button onClick={() => acceptUser(app)}>Accept</Button>
          </Card>
        ))}
    </Grid>
  );
};

const Members = ({ name, members, isAdmin, acceptAll }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <Card className={classes.memberCount}>
          <img src={membersIcon} style={{ height: "50px" }}></img>
          <Typography className={classes.text2} color="secondary">
            {members.length}
          </Typography>
          <Typography className={classes.text1} color="text.secondary">
            Club Members
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={7} style={{ padding: "0 0 0 60px" }}>
        {members.length > 0 && (
          <Card className={classes.header}>
            <Grid xs={6} item>
              Name
            </Grid>
            <Grid xs={6} item>
              Role
            </Grid>
          </Card>
        )}
        {members
          .filter((member) => member.role !== "pending")
          .map((member) => (
            <Card className={classes.card}>
              <Grid xs={6} item>
                <img src={profile} className={classes.profile}></img>
                {member.name}
              </Grid>
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                {member.role === "owner" && (
                  <Typography className={[classes.role, classes.ownerRole]}>
                    {" "}
                    {member.role}
                  </Typography>
                )}
                {member.role === "admin" && (
                  <Typography className={[classes.role, classes.adminRole]}>
                    {" "}
                    {member.role}
                  </Typography>
                )}
                {member.role === "user" && (
                  <Typography className={[classes.role, classes.userRole]}>
                    {" "}
                    {member.role}
                  </Typography>
                )}
              </Grid>
            </Card>
          ))}
      </Grid>
      {/* <Grid item className={classes.memberCount}>
                <Typography>{name} has</Typography>
                &nbsp;
                <Typography color='secondary' className={classes.headerFont}>{members.length} members</Typography> 
            </Grid> */}
      {isAdmin && <Application applicants={members} isAdmin={isAdmin} />}
    </Grid>
  );
};
export default Members;
