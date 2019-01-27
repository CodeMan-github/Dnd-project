import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { TableData } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardIconTitle: {
    ...cardTitle
  }
};

class DynaTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  
    }

    

  async componentDidMount() 
  {
    if (this.props.data)
    {
      const { dataRows } = await TableData(this.props.data.dataRef);
      this.setState({ data: dataRows });
     
      var cols = [];
      var json = this.props.data.columns;
      Object.keys(json).forEach(function(key) {
        cols.push(json[key].accessor);
      });
      

      this.state = 
      {
      data: dataRows.map((prop, key) => {
        let dynaactions = null;
       // for (let i=0; i<cols.length; i++) {
         
          //console.log("obj: ", this.state.data[key]._id, " - ", prop._id, " === ", dataRows);
          return {
        
            actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o._id === prop._id);
                  console.log("You've clicked LIKE button on: ", this.state.data[key]._id, " - ", prop._id, " === ", dataRows);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                      obj.prop[cols[0]] +
                      ", \nposition: " +
                      obj.prop[cols[1]] +
                      ", \noffice: " +
                      obj.prop[cols[2]] +
                      ", \nage: " +
                      obj.prop[cols[3]] +
                      "\n}."
                  );
                }}
                color="info"
                className="like"
              >
                <Favorite />
              </Button>{" "}
              {/* use this button to add a edit kind of action */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.prop[cols[0]] +
                      ", \nposition: " +
                      obj.prop[cols[1]] +
                      ", \noffice: " +
                      obj.prop[cols[2]] +
                      ", \nage: " +
                      obj.prop[cols[3]] +
                      "\n}."
                  );
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        ///}
        //console.log("dataRows cols actions", this.state);

       
        };
      })
    }

    
    }

}

  render() {
    const { classes } = this.props;
    const { data } = this.props;
    console.log("dataRows", data , "this.props 666", this.state);
    return (

      <GridContainer xs={12}>
        <GridItem xs={12}>
          <Card xs={12}>
            <CardHeader color="primary" icon xs={12}>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>React===Table</h4>
            </CardHeader>
            <CardBody xs={12}>
              <ReactTable xs={12} 
                data={this.state.data}
                filterable
                columns= { data.columns.map((key) => key) }
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(DynaTables);
