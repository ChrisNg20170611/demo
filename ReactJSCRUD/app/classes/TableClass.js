import React from 'react';
var createReactClass = require('create-react-class');

const TableClass = createReactClass({

	bindHeader:function(){
		var cols = this.props.cols;
		var elements = cols.map(function(colHeader){
			return <th key={colHeader.key}>{colHeader.label}</th>
		});
		//action column
		elements.push(<th key="dataHeaderAction">Action</th>);
		return elements;
	},

	bindData:function(){
		var data = this.props.data;
		var self = this;
		return data.map(function(colData){
			var rowElement = [];
			$.each(colData,function(key,val){
				rowElement.push(<td key={key}>{val}</td>);				
			});
			//action column
			rowElement.push(
				<td key="actionColumn">
					<div className="col-md-3">
						<button className="btn btn-xs btn-primary" onClick={self.props.onUpdate} data-id={colData.user_id}>Edit</button>
					</div>
					<div className="col-md-5">
						<button className="btn btn-xs btn-danger" onClick={self.props.onDelete} data-id={colData.user_id}>Delete</button>
					</div>
				</td>
			);
			return <tr className='data-row' data-id={colData.user_id} key={colData.user_id}>{rowElement}</tr>;
		});
	},

    render:function(){

    	var tableHeader = this.bindHeader();
        var tableData = this.bindData();

        return (
        	<div>[TableClass.js] page
        	<table className='table table-hover table-striped table-bordered'>
        		<thead>
        			<tr>{tableHeader}</tr>
        		</thead>
        		<tbody>
        			{tableData}
        		</tbody>
        	</table>
        	</div>
        );
    }

});

export default TableClass;