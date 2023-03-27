import React, { useMemo } from "react";
import {
  Grid,
  Card,
  Button,
  Switch,
  FormControlLabel,
  CardContent,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import profile from "../../images/profile-icon.png";
import membersIcon from "../../images/members.png";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "../Firebase";
import { serverURL } from "../../constants/config";

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
  applicant: {
    display: "flex",
    margin: "10px 10px",
    padding: "10px 10px",
    alignItems: "center",
    height: "75px",
    justifyContent: "space-between",
  },
  application: {
    margin: "10px 10px",
    padding: "10px 10px",
    alignItems: "center",
    height: "75px",
    justifyContent: "space-between",
  },
  accept: {
    background: "#BBFFBB",
  },
  deny: {
    background: "#FFBBBB",
  },
}));

const Application = ({ members }) => {
  const classes = useStyles();
  const { clubID } = useParams();
  const authHeader = useAuthHeader();

  const [acceptAll, setAcceptAll] = useState(false);

  const applicants = useMemo(
    () => members?.filter((member) => member.role === "pending") || [],
    [members]
  );
  // const applicants = [{ name: "George", role: "pending" }];

  const acceptUser = async (user) => {
    console.log("Trying to accept user", user)
    const data = {
      user,
      clubID,
    }
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    };
    const URL = serverURL + "/api/acceptUser";
    // Fetch accept user api
    let response
    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      console.log(await response.text());
    } else {
      console.error("Could not accept user. ERROR:", await response.text());
    }

  };

  const denyUser = async (user) => {
    console.log("Trying to deny user", user)
    const data = {
      user,
      clubID,
    }
    
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    };
    const URL = serverURL + "/api/denyUser";
    // Fetch deny user api
    let response
    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      console.log(await response.text());
    } else {
      console.error("Could not deny user. ERROR:", await response.text());
    }
  };

  const getApplicationType = async () => {
    const request = {
      method: "GET",
      headers: {
        ...authHeader(),
        Accept: "*/*",
      },
    }
    const URL = serverURL + "/api/getApplicationType/" + clubID;
    let response
    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response.status === 200) {
      const data = await response.json()
      console.log("Accept All:", data["acceptAll"]);
      return data["acceptAll"];
    } else {
      console.error("Could not accept user. ERROR:", await response.text());
      return false;
    }

  };

  useEffect(() => {
    (async () => {
      // console.log(await getApplicationType())
      setAcceptAll(await getApplicationType())
  })()}, [])
        ...authHeader(),
        Accept: "*/*",
      },
      body: {
        user,
        clubID,
      },
    };
    const URL = serverURL + "/api/denyUser";
    // Fetch accept user api
    try {
      const response = await fetch(URL, request);
    } catch {
      console.error("Could not deny user");
    }
  };

  return (
    <Grid xs={2} item>
      <Grid container direction="row">
        Application
        <Card className={classes.application}>
          <Typography>
            Application Type: {acceptAll ? "AcceptAll" : "See Applicants"}
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={!!acceptAll} disabled={!!applicants?.length} />
            }
            label={!!applicants?.length ? "Must have empty list" : "Accept All"}
          />
        </Card>
        {!acceptAll &&
          applicants?.map((app) => (
            <Card key={app.name} className={classes.applicant}>
              <span>{app.name}</span>
              <Button className={classes.deny} onClick={() => denyUser(app)}>
                Deny
              </Button>
              <Button
                className={classes.accept}
                onClick={() => acceptUser(app)}
              >
                Accept
              </Button>
            </Card>
          ))}
      </Grid>
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
          <Typography className={classes.text1} color="textSecondary">
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
            <Card key={member.name} className={classes.card}>
              <Grid xs={6} item>
                <img src={profile} className={classes.profile}></img>
                {member.name}
              </Grid>
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                {member.role === "owner" && (
                  <Typography
                    className={`${classes.role} ${classes.ownerRole}`}
                  >
                    {" "}
                    {member.role}
                  </Typography>
                )}
                {member.role === "admin" && (
                  <Typography
                    className={`${classes.role} ${classes.adminRole}`}
                  >
                    {" "}
                    {member.role}
                  </Typography>
                )}
                {member.role === "user" && (
                  <Typography className={`${classes.role} ${classes.userRole}`}>
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
      {isAdmin && <Application members={members} acceptAll={isAdmin} />}
    </Grid>
  );
};
export default Members;
