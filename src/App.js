import React, { Component } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import * as firebase from 'firebase';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  paper: {
   backgroundColor:"white"
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datacmg: [],
      ordered: [],
      open: false,
      name1: ""
    }
    // this.Child = this.Child.bind(this);
    var config = {
      apiKey: "AIzaSyBu6_k9uyJaNeN3QqxFaZHeVTqN5Yq4Eus",
      authDomain: "technicalsolutions-2fd6c.firebaseapp.com",
      databaseURL: "https://technicalsolutions-2fd6c.firebaseio.com",
      projectId: "technicalsolutions-2fd6c",
      storageBucket: "technicalsolutions-2fd6c.appspot.com",
      messagingSenderId: "800730417694"
    };
    firebase.initializeApp(config);
  }
  componentDidMount() {
    firebase.database().ref('Orders').once("value").then(success => {
      const product = success.val();
      const keys = Object.keys(product);
      const array = [];
      for (let e of keys) {
        array.push(product[e])
      }
      this.setState({ datacmg: array });
    })
      .catch(err => {
        alert(err)
      })
  }
  handleOpen = (name) => {
    console.log(name);
    this.setState({ open: true, name1: name });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone no.</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>No. of Services</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.datacmg && this.state.datacmg.map((donors, index) => {
              return (
                <TableRow key={index} onClick={() => this.handleOpen(donors.ordered)}>
                  <TableCell component="th" scope="row">{donors.name}</TableCell>
                  <TableCell>{donors.email}</TableCell>
                  <TableCell>{donors.phoneno1}</TableCell>
                  <TableCell>{donors.location}</TableCell>
                  {/* <TableCell>{donors.ordered.length}</TableCell> */}
                  <TableCell>{donors.totalPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose} 
        >
          <div style={{backgroundColor:"wheat"}}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:"bold",color:"blue",fontSize:20}}>Issue Name</TableCell>
                  <TableCell style={{fontWeight:"bold",color:"blue",fontSize:20}}>Price</TableCell>
                  <TableCell style={{fontWeight:"bold",color:"blue",fontSize:20}}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.name1 && this.state.name1.map((donors, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{donors.name}</TableCell>
                      <TableCell>{donors.price}</TableCell>
                      <TableCell>{donors.Quantity}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Modal>
      </Paper>
    );
  }
}
// CustomizedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default App;
