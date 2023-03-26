let mysql = require('mysql');
let config = require('./config.js');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const { start } = require('repl');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


// Allow localhost to make calls to API
app.use((req, res, next) => {
	console.log(req.headers.origin)
	if (req.headers.origin?.includes('://localhost:')) {
		console.log('Accepted')
		res.header('Access-Control-Allow-Origin', req.headers.origin)
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	}
	next()
})

app.use(decodeIDToken);
// Middleware to decode Bearer Token 
// if logged in, Firebase user added to req['currentUser']
async function decodeIDToken(req, res, next) {
	if (req.headers?.authorization?.startsWith('Bearer ')) {
		const idToken = req.headers.authorization.split('Bearer ')[1];

		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req['currentUser'] = decodedToken;
		} catch (err) {
			console.log(err);
		}
	}

	next();
}

/** Example of using user authentication: */
app.get('/hello', (req, res) => {

	const user = req['currentUser'];

	if (!user) {
		res.status(403).send('You must be logged in to say hello!');
	} else {
		console.log(`${user.name} said hello`)
		res.header('Access-Control-Allow-Origin: ').send(`Hello ${user.name}!`)
	}
})

app.put('/api/login', (req, res) => {
	
	const user = req['currentUser'];

	if (!user) {
		res.status(403).send('You are not logged in');
	} else {
		// Initialize connection to db
		let connection = mysql.createConnection(config);


		// SQL Query to upsert user in database
		const {uid, name, email} = user;

		console.log(`User: ${name} logged in`);
		
		const sql =
		`
		INSERT INTO users (uid, name, email)
		VALUES (?, ?, ?)
		ON DUPLICATE KEY 
		UPDATE name = ?, email = ?;
		`;
		const data = [uid, name, email, name, email]

		connection.query(sql, data, (error, results, fields) => {
			if (error) {
				res.status(500).send('could not make database request');
				return console.error(error.message);
			}
			res.status(201).send('Logged in, user updated');
		})
		connection.end();

	}
}
)

app.post('/api/getClubs', (req, res) => {

	let connection = mysql.createConnection(config)
	let clubID = req.body.clubID

	// let sql = `SELECT name, description
	// FROM clubs
	// WHERE clubs.id = ${clubID}`;
	
	const sql = `SELECT name, description
	FROM clubs
	WHERE clubs.id = ?`;

	const data = [clubID]


	//console.log(sql);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getClubAnnouncements', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;

	const sql = `SELECT a.title, a.body, a.time_posted, a.id, a.visibility, a.placeholderPhoto, a.time_posted_text
	from announcements as a, clubs as c 
	where c.id = a.club_id and c.id = ?
	order by time_posted desc;`;

	const data = [clubID]

	//console.log(sql);
	

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
	connection.end();


});

app.post('/api/postAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcement = req.body;

    let sql = `INSERT into announcements (club_id, title, body, time_posted, visibility, placeholderPhoto, time_posted_text)
	values(?,?,?,?,?,?,?)`
    let data = [
		announcement.clubID, 
		announcement.title, 
		announcement.body, 
		announcement.time_posted, 
		announcement.visibility, 
		announcement.placeholderImage,
		announcement.time_posted_text];

	console.log(sql)
	console.log(data)
    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.post('/api/deleteAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcementID = req.body.id;

    let sql = `DELETE FROM announcements where id = ?`

	const data = [announcementID]
	console.log(sql)
	console.log(data)
    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({ express: string });
	});
	connection.end();

})

app.post('/api/editAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcementID = req.body.id;
	let newTitle = req.body.newTitle;
	let newBody = req.body.newBody;
	let visibility = req.body.visibility;
	let placeholderPhoto = req.body.placeholderImage;


	// console.log(newTitle, newBody)

    let sql = `UPDATE announcements
	SET title = ?, body = ?, visibility= ?, placeholderPhoto = ?
	WHERE id = ?`

	const data = [newTitle, newBody, visibility, placeholderPhoto, announcementID]
	console.log(data);
    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		// console.log(string)
	});
	connection.end();

})

app.post('/api/getClubMembers', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;

	let sql = `SELECT u.name, m.role, u.uid
	FROM memberships as m, users as u 
	WHERE m.club_id= ? and m.uid = u.uid
	order by role desc;`;

	const data = [clubID]

	//console.log(sql);
	

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		// console.log(string)
	});
	connection.end();

});

app.post('/api/getCurrentUserRole', (req,res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	let clubID = req.body.clubID;

	let sql = `SELECT role FROM memberships WHERE club_id= ? and uid = ?`;

	const data = [clubID, userID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		// console.log(string)
	});
	connection.end();

});

app.post('/api/getAllClubs', (req, res) => {
	// Query all clubs from the clubs table
	let connection = mysql.createConnection(config)
	const query = `SELECT * FROM clubs`;
	// console.log(query)
	connection.query(query, (error, results, fields) => {
	  if (error) {
		// Return an error if the query failed
		res.status(500).json({ error: error.message });
	  } else {
		// Return the results as JSON
		let string = JSON.stringify(results);
		res.setHeader('Content-Type', 'application/json');
		res.send({express: string});
		//res.send( results);
	  }
	});
	connection.end();
});

app.post('/api/checkMembership', (req,res) => {

	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `select club_id from memberships where uid = ?`;

	const data = [userID];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
	connection.end();


});

app.post('/api/joinClub', (req,res) => {
	let data = req.body;

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `insert into memberships(uid, club_id, role)
	values(?, ?, 'user')`;

	const values = [userID, clubID];
	
	connection.query(sql, values, (error, results, fields) => {
        if (error) {
            connection.query(`ROLLBACK`, (error, results, fields) => {
                let string = JSON.stringify('Error')
                res.send({ express: string });
                connection.end();
            });
        } else {
            connection.query(`COMMIT`, data, (error, results, fields) => {
                let string = JSON.stringify('Success')
                res.send({ express: string });
                connection.end();
            })
        };
    })

});


  app.post('/api/editClubDescription', (req, res) => {
	//Query to update the description of a club given the clubID
	let connection = mysql.createConnection(config);
	const clubId = req.body.id;
  	const newDescription = req.body.description;

	const sql = `UPDATE clubs SET description = ? WHERE id = ?`;

	const data = [newDescription, clubId];

	connection.query(sql, data, (err, result) => {
		if (err) throw err;
		// console.log(`Updated description for club with ID ${clubId}`);
		// res.send("Updated description for club with ID ${clubId}");
	});
	connection.end();
});
app.post('/api/getMyClubs', (req,res) => {

	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `SELECT clubs.id, clubs.name, clubs.description, clubs.categories FROM clubs
	JOIN memberships ON
	clubs.id = memberships.club_id
	AND memberships.uid = ?`;

	const data = userID

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
	connection.end();
});

app.post('/api/getAnnouncements', (req,res) => {

	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `SELECT clubs.name, a.title, a.body, a.time_posted, a.id, a.visibility, memberships.role, clubs.id club_id, a.placeholderPhoto, a.time_posted_text from announcements a
	INNER JOIN memberships on memberships.club_id = a.club_id
	INNER JOIN clubs on clubs.id = memberships.club_id
	WHERE memberships.uid = ?
	AND DATE(a.time_posted) >= DATE(DATE_SUB(NOW(), INTERVAL 1 WEEK))`;

	const data = userID

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
});

app.post('/api/leaveClub', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubId;
	let userID = req.body.userId;
	let sql = `DELETE FROM memberships WHERE uid = ? AND club_id = ?`;
	const data = [userID, clubID];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
	connection.end();
});

app.post('/api/getPastEvents', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let todaysDate = req.body.todaysDate;

	let sql = `select * from events where club_id = ? and start_time < ?`
	const data = [clubID, todaysDate];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});

})

app.post('/api/getUpcomingEvents', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let todaysDate = req.body.todaysDate;

	let sql = `select * from events where club_id = ? and start_time >= ? order by start_time asc`
	const data = [clubID, todaysDate];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.post('/api/addEvent', (req,res) => {
	let connection = mysql.createConnection(config);
	let club_id = req.body.clubID;
	let title = req.body.title;
	let body = req.body.description;
	let start_time = req.body.startDateTime;
	let end_time = req.body.endDateTime;
	let allDay = req.body.allDay;
	let location_type = req.body.locationType;
	let location = req.body.location;
	let price = req.body.price;
	let additionalDetails = req.body.details;
	let placeholderImage = req.body.placeholderImg;
	let start_time_text = req.body.startDateTimeText;
	let end_time_text = req.body.endDateTimeText;
	let time_posted = req.body.timestamp;

	let sql = `insert into events (club_id, title, location, start_time, end_time, body, time_posted, price, allDay, placeholderPhoto, additionalDetails, location_type, start_time_text, end_time_text)
	values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
	data = [club_id, title, location, start_time, end_time, body, time_posted, price, allDay, placeholderImage, additionalDetails ,location_type, start_time_text, end_time_text]
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.post('/api/editEvent', (req,res) => {
	let connection = mysql.createConnection(config);
	

})

app.post('/api/deleteEvent', (req,res) => {
	let connection = mysql.createConnection(config);
	

})

app.post('/api/getAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;

	let sql = `select * from attendance where event_id = ?`
	const data = [eventID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.post('/api/setAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;
	let userID = req.body.userID;
	let status = req.body.attendanceStatus;
	let name = req.body.name;

	let sql = `INSERT into attendance (event_id, uid, status, name) values (?,?,?,?)`
	const data = [eventID, userID, status, name];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.post('/api/changeAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;
	let userID = req.body.userID;
	let status = req.body.attendanceStatus;

	let sql = `UPDATE attendance SET status = ? WHERE uid=? and event_id = ?`
	const data = [status, userID, eventID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		//console.log(string)
	});
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server


app.post('/api/addAdmin', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

	// console.log(newTitle, newBody)

    let sql = `UPDATE memberships as m, users as u
	SET role = 'admin'
	WHERE m.uid = u.uid and u.uid=?`

	const data = [userID]
	// console.log(userID)
	
    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

})

app.post('/api/removeAdmin', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

	// console.log(newTitle, newBody)

    let sql = `UPDATE memberships as m, users as u
	SET role = 'user'
	WHERE m.uid = u.uid and u.uid=?`

	const data = [userID]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		// console.log(string)
	});
	connection.end();

});

app.post('/api/transferClubOwnership', (req, res) => {
    let connection = mysql.createConnection(config);
    let newOwnerID = req.body.newOwnerID;
	let oldOwnerID = req.body.oldOwnerID;
	let clubID = req.body.clubID;
	let newRole = req.body.role;

    let sql = `UPDATE memberships as m1
	JOIN 
	(
		SELECT ? as uid, ? as club_id, 'owner' as role
		UNION
		select ? as CustomerID, ? as club_id, ? as role
	) as m2 on m1.uid=m2.uid and m1.club_id=m2.club_id
	set m1.role=m2.role;`

	const data = [newOwnerID, clubID, oldOwnerID, clubID, newRole]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		console.log(string)
	});
	connection.end();

});

