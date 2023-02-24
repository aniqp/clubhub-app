import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField, FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ClubCard from "./ClubCard";
import ReactPaginate from "react-paginate";

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
    const [currentPage, setCurrentPage] = useState(0);
    const [clubsPerPage, setClubsPerPage] = useState(4);

    useEffect(() => {
      getClubs();
    }, []);
    
    const getClubs = () => {
      fetchClubs()
        .then(res => {
          // console.log("fetchClubs returned: ", res)
          var parsed = JSON.parse(res.express);
          // console.log("fetchClubs: ", parsed);
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
        // console.log(data);
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
    setCurrentPage(0);
  };
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (categoryFilter === 'All' || club.categories.includes(categoryFilter))
  );

  // PAGINATION
  const indexOfLastClub = (currentPage + 1) * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);
  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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
          <ClubCard clubs={currentClubs}/>
      </Grid>
      <ReactPaginate
            forcePage = {currentPage}
            pageCount={Math.ceil(filteredClubs.length/clubsPerPage)} 
            marginPagesDisplayed={3} 
            pageRangeDisplayed={3} 
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
             />
    </div>
  );
};

export default ExplorePage;