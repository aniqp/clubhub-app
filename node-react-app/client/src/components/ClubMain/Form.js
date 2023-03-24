import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'none',
        fontSize: '14px',
        padding: '6px 12px',
        minWidth: 'unset',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'none'
        }
      }
    }));
function FormButton({ clubId, userId }) {
  const [showForm, setShowForm] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setShowForm(true);
  };

  function Form({ onClose }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      onClose();
      const getUser = await fetch('/api/changeUserTitle', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
                //let clubID = req.body.clubId;
	            //let userID = req.body.userId;
	            //let title = req.body.title;
        },
        body: JSON.stringify({
            userId: userId,
            clubId: clubId,
            title: inputValue
            })
        });
        //const body = await response.json();
        //if (response.status !== 200) throw Error(body.message);
        //return body;

      onClose();
    };

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    return (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>
            Role:
            <input type="text" value={inputValue} onChange={handleChange} />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <button variant="text" className={classes.button} onClick={handleClick}>Edit</button>

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </>
  );
}

export default FormButton;