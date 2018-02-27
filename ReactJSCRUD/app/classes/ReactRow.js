import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');
import UserEditComponent from '../components/User/UserEditComponent';

var tableRow = null; //displaying table row data

var dataHeadFromUser = null;
var dataFromUser = null;


const ReactRow = createReactClass({

	onDelete:function(){
		alert('click update button');
	},

	bindTableRow:function(updateStr){
		var dataHeadFromUser = this.props.cols;

		var dataFromUser = this.props.data;

		return dataFromUser.map(function(value){
			return <tr key={value.user_id}>
						<td>{value.user_id}</td>
						<td>{value.name}</td>
						<td>{value.email}</td>
						<td>{value.password}</td>
						<td key="actionColumn">
							<div className="col-md-2">
								<button className="btn btn-xs btn-primary" data-id={value.user_id} onClick={updateStr}>Edit</button>
							</div>
							<div className="col-md-2">
								<button className="btn btn-xs btn-danger" data-id={value.user_id}>Delete</button>
							</div>
						</td>
					</tr>
		});
	},


    render:function(){

    	// init onUpdate function
    	var updateStr = this.props.onUpdate;
    	console.log(updateStr);

    	var tableRow = this.bindTableRow(updateStr);


    	//alert('self.props.onUpdate: '+this.props.onUpdate);

        return (
        	<tbody>{tableRow}</tbody>
        );
    }

});

export default ReactRow;