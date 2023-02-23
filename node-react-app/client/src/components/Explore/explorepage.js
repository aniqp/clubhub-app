import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

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
    console.log("clubs: ", clubs)
    console.log("clubs[0]", clubs[0])
    useEffect(() => {
      gitClubs();
      }, []);
    
      const gitClubs = () => {
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
    

  //console.log("clubs: ", clubs)
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

  return (
    <div className={classes.root}>
        <FormControl>
        <InputLabel id="category-filter-label">Filter by category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={categoryFilter}
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Academic">Academic</MenuItem>
          <MenuItem value="Business and Entrepreneurial">Business and Entrepreneurial</MenuItem>
          <MenuItem value="Charitable, Community Service, and International Development">Charitable, Community Service, and International Development</MenuItem>
          <MenuItem value="Creative Arts, Dance, and Music">Creative Arts, Dance, and Music</MenuItem>
          <MenuItem value="Cultural">Cultural</MenuItem>
          <MenuItem value="Environmental and Sustainability">Environmental and Sustainability</MenuItem>
          <MenuItem value="Games, Recreational, and Social">Games, Recreational, and Social</MenuItem>
          <MenuItem value="Health Promotion">Health Promotion</MenuItem>
          <MenuItem value="Media, Publications, and Web Development">Media, Publications, and Web Development</MenuItem>
          <MenuItem value="Political and Social Awareness">Political and Social Awareness</MenuItem>
          <MenuItem value="Religious and Spiritual">Religious and Spiritual</MenuItem>
          <MenuItem value="JYP">JYP</MenuItem>
          <MenuItem value="YG Entertainment">YG Entertainment</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        className={classes.search}

        variant="outlined"
        label="Search by club name"
        value={searchTerm}
        onChange={handleSearch}
        margin = "dense"
      />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Club Name</TableCell>
              <TableCell>Club Categories</TableCell>
              <TableCell>Club Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClubs.map((club) => (
              <TableRow key={club.id}>
                <TableCell>{club.id}</TableCell>
                <TableCell>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {club.name}
                        <span className={classes.category}>{club.categories}</span>
                      </Typography>
                    </CardContent>
                  </Card>
                </TableCell>
                <TableCell>{club.categories}</TableCell>
                <TableCell>{club.desciption}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExplorePage;