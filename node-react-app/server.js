let mysql = require('mysql');
let config = require('./config.js');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

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

	const sql = `SELECT a.title, a.body, a.time_posted, a.id 
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
    let data = req.body;

    let sql = `INSERT into announcements (club_id, title, body, time_posted)
	values(?,?,?,?)`
    let announcement = [data.clubID, data.title, data.body, data.time_posted]

    connection.query(sql, announcement, (error, results, fields) => {
        if (error) {
            connection.query(`ROLLBACK`, dataEmpty, (error, results, fields) => {
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

})

app.post('/api/deleteAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcementID = req.body.id;

    let sql = `DELETE FROM announcements where id = ?`

	const data = [announcementID]

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

	// console.log(newTitle, newBody)

    let sql = `UPDATE announcements
	SET title = ?, body = ?
	WHERE id = ?`

	const data = [newTitle, newBody, announcementID]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
		console.log(string)
	});
	connection.end();

})

app.post('/api/getClubMembers', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;

	let sql = `SELECT u.name, m.role 
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

	let sql = `SELECT clubs.name, a.title, a.body, a.time_posted, a.id, clubs.id club_id from announcements a
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
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
