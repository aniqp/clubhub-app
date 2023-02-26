import React from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { serverURL } from '../../constants/config'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root'); // this is necessary to avoid warnings in the console

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = () => {
    // handle the submit action here, for example by calling a function passed as a prop
    this.props.onSubmit(this.state.inputValue);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        style={customStyles}
      >
        <h2>Enter some text {this.props.clubid}:</h2>
        <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </Modal>
    );
  }
}

class MyButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
    }

  
    handleOpenModal = () => {
      this.setState({ isModalOpen: true });
    }
  
    handleCloseModal = () => {
      this.setState({ isModalOpen: false });
    }
  
    handleSubmit = (inputValue) => {
      // handle the submit action here, for example by updating the component state
      console.log("this mf input ", inputValue)

      const callApiGetClubs = async () => {
        const url = serverURL + '/api/editClubDescription';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                id: this.props.clubid,
                description: inputValue
            })
        });
        //const body = await response.json();
        //if (response.status !== 200) throw Error(body.message);
        //return body;
    }

      console.log('Submitted:', inputValue);
      callApiGetClubs();
      this.setState({ isModalOpen: false });
    }
  
    render() {
        console.log(this.props)
      return (
        
        <div>
          <Button variant='contained' color='primary' onClick={this.handleOpenModal}>Edit Description</Button>
          <MyModal clubid={this.props.clubid} isOpen={this.state.isModalOpen} onClose={this.handleCloseModal} onSubmit={this.handleSubmit} />
        </div>
      );
    }
  }

  export default MyButton;
