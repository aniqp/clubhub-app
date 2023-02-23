import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
  },
  search: {
    marginBottom: theme.spacing(2),
    paddingHorizontal: "100px",
    alignItems: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 5,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: 16,
  },
  category: {
    backgroundColor: "red",
    color: "white",
    display: "inline-block",
    borderRadius: "3px",
    padding: "0.2rem 0.5rem",
    marginLeft: "0.5rem"
  },
}));

const ExplorePage = () => {
    const [clubs, setClubs] = useState([]);
    // console.log("clubs: ", clubs)
    // console.log("clubs[0]", clubs[0])
    useEffect(() => {
      getClubs();
    }, []);
    
    const getClubs = () => {
      fetchClubs()
        .then(res => {
          console.log("fetchClubs returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("fetchClubs: ", parsed);
          setClubs(parsed);
          //console.log("clubs: ", clubs)
          return parsed;
        })
        .then(data => {
          setClubs(data);
        })
    };

    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/getAllClubs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    

  const [categoryFilter, setCategoryFilter] = useState("All");
  const categories = [
    "All",
    "Academic",
    "Business and Entrepreneurial",
    "Charitable, Community Service, and International Development",
    "Creative Arts, Dance, and Music",
    "Cultural",
    "Environmental and Sustainability",
    "Games, Recreational, and Social",
    "Health Promotion",
    "Media, Publications, and Web Development",
    "Political and Social Awareness",
    "Religious and Spiritual",
    "JYP",
    "YG Entertainment"
  ];
  const handleChange = (event) => {
    setCategoryFilter(event.target.value);
  };
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (categoryFilter === 'All' || club.categories.includes(categoryFilter))

  );

  const truncate = (input) => {
    // console.log('input' + input);
    if (input.length > 100) {
       return input.substring(0, 200) + '...';
    }
    return input;
  };

  const categoryFormat = (input) => {
    input = input.replace(/-/g, ' ');
    return input
  }

  return (
    <div className={classes.root}>
      <Grid container style={{display:'flex', justifyContent:'space-between'}}>
        <Grid item style={{padding:'25px 25px 15px 0'}}>
        <FormControl style={{width:'250px'}}>
          <InputLabel id="category-filter-label">Filter by category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="academic">Academic</MenuItem>
            <MenuItem value="business-and-entrepreneurial">Business and Entrepreneurial</MenuItem>
            <MenuItem value="Charitable, Community Service, and International Development">Charitable, Community Service, and International Development</MenuItem>
            <MenuItem value="creative-arts-dance-and-music">Creative Arts, Dance, and Music</MenuItem>
            <MenuItem value="cultural">Cultural</MenuItem>
            <MenuItem value="environmental-and-sustainability">Environmental and Sustainability</MenuItem>
            <MenuItem value="games-recreational-and-social">Games, Recreational, and Social</MenuItem>
            <MenuItem value="health-promotion">Health Promotion</MenuItem>
            <MenuItem value="media-publications-and-web-development">Media, Publications, and Web Development</MenuItem>
            <MenuItem value="political-and-social-awareness">Political and Social Awareness</MenuItem>
            <MenuItem value="religious-and-spiritual">Religious and Spiritual</MenuItem>
            <MenuItem value="JYP">JYP</MenuItem>
            <MenuItem value="YG Entertainment">YG Entertainment</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item style={{width:'300px',padding:'25px 0 15px 0'}}>
          <TextField
            className={classes.search}
            variant="outlined"
            label="Search by club name"
            value={searchTerm}
            onChange={handleSearch}
            margin = "dense"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container style={{ display:'flex', flexDirection:'column'}}>
        {filteredClubs.map((club) => (
          <Card variant="outlined" style={{margin:'0 0 20px 0',padding:'10px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Grid item xs={8}>
              <Typography variant='h6' style={{padding:'0 0 10px 0'}}>{club.name}</Typography>
              <Typography style={{fontSize:'0.8rem'}}>{truncate(club.description)}</Typography>
            </Grid>
            <Grid item xs={3} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
              <Button color='primary' variant='outlined'>Club Details</Button>
              <Button color='secondary' variant='outlined'>Join Club</Button>
            </Grid>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default ExplorePage;