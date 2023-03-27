import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  FormControlLabel,
  Button,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthHeader } from "../Firebase/";

const useStyles = makeStyles((theme) => ({
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

export const Application = ({
  members,
  refetchMembers
}) => {
  const classes = useStyles();
  const {
    clubID
  } = useParams();
  const authHeader = useAuthHeader();
  const [acceptAll, setAcceptAll] = useState(false);
  const applicants = useMemo(() => members?.filter(member => member.role === "pending") || [], [members]); // const applicants = [{ name: "George", role: "pending" }];

  const acceptUser = async user => {
    console.log("Trying to accept user", user);
    const data = {
      user,
      clubID
    };
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*"
      },
      body: JSON.stringify(data)
    };
    const URL = serverURL + "/api/acceptUser"; // Fetch accept user api

    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      console.log(await response.text());
      refetchMembers();
    } else {
      console.error("Could not accept user. ERROR:", (await response.text()));
    }
  };

  const denyUser = async user => {
    console.log("Trying to deny user", user);
    const data = {
      user,
      clubID
    };
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*"
      },
      body: JSON.stringify(data)
    };
    const URL = serverURL + "/api/denyUser"; // Fetch deny user api

    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response?.status === 200) {
      console.log(await response.text());
      refetchMembers();
    } else {
      console.error("Could not deny user. ERROR:", (await response.text()));
    }
  };

  const getApplicationType = async () => {
    const request = {
      method: "GET",
      headers: { ...authHeader(),
        Accept: "*/*"
      }
    };
    const URL = serverURL + "/api/getApplicationType/" + clubID;
    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response.status === 200) {
      const data = await response.json();
      console.log("Accept All:", data["acceptAll"]);
      return data["acceptAll"];
    } else {
      console.error("Could not accept user. ERROR:", (await response.text()));
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      // console.log(await getApplicationType())
      setAcceptAll((await getApplicationType()));
    })();
  }, []);

  const changeApplicationType = async () => {
    const applicationType = !acceptAll;
    setAcceptAll(applicationType);
    const data = {
      clubID,
      applicationType
    };
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        Accept: "*/*"
      },
      body: JSON.stringify(data)
    };
    const URL = serverURL + "/api/changeApplicationType";
    let response;

    try {
      response = await fetch(URL, request);
    } catch (error) {
      console.error(error);
    }

    if (response.status === 200) {
      console.log(await response.text());
      setAcceptAll(applicationType);
    } else {
      console.error("Could not accept user. ERROR:", (await response.text()));
      setAcceptAll(cur => !cur);
    }
  };

  return <Grid xs={2} item>
      <Grid container direction="column">
        Application
        <Card className={classes.application}>
          <Typography>
            Application Type: {acceptAll ? "Accept All" : "Hold Applications"}
          </Typography>
          <FormControlLabel control={<Switch checked={!!acceptAll} disabled={!!applicants?.length} onChange={changeApplicationType} />} label={!!applicants?.length ? "Empty List to change type" : "Accept All"} />
        </Card>
        {!acceptAll && applicants?.map(app => <Card xs={2} key={app.name} className={classes.applicant}>
              <Typography>{app.name}</Typography>
              <Button className={classes.deny} onClick={() => denyUser(app)}>
                Deny
              </Button>
              <Button className={classes.accept} onClick={() => acceptUser(app)}>
                Accept
              </Button>
            </Card>)}
      </Grid>
    </Grid>;
};
  

  