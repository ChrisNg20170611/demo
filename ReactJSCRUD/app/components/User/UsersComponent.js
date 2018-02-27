import React from 'react';
import axios from 'axios';
import TableClass from '../../classes/TableClass.js';

class UserComponent extends React.Component{

	constructor(props) {
		super(props);
		this.getAllUserList();

		this.state = {
			cols : [
			    {key:'user_id',label:'User ID'},
			    {key:'name',label:'Show User'},
			    {key:'email',label:'Show Email'},
			    {key:'password',label:'Show Password'},
			    {key:'modify_by',label:'Modify By'},
			    {key:'modify_date',label:'Modify Date Time'}
			],
			data : [

			],
			selectedUser : '',
		};
	}

	getAllUserList(){
		toastr.info('Fetching All Users list...');
		var self = this;
		axios.get('http://10.89.73.15:3000/api/user').then(function(response){
			toastr.clear();
			self.setState({
				cols : self.state.cols,
				data : response.data
			});

		}).catch(function(error){
			toastr.clear();
			toastr.error(error);
		});
	}

	updateUser(data){
		//console.log('$(data.target):'+$(data.target));
		//console.log('$(name):'+$(data.target).data('name'));
		//console.log('$(id):'+$(data.target).data('id'));
		//alert('Update: '+$(data.target).data('id'));

		var id = $(data.target).data('id');
		location.href='#/user/edit/'+id;	
	}

	deleteUser(data){
		//console.log("data.target.data('id'): "+JSON.stringify($(data.target).data('id')));
		var id = $(data.target).data('id');
		$("#selectedUser").text(id);
		$("#deleteConfirmationModal").modal('show');
		$("#deleteButton").attr('data-dismiss',id);

	}

	doDeleteUser(data){
		var id = $(data.target).data('dismiss');
		//console.log('delete id: '+JSON.stringify($(data.target).data()));
		toastr.info('Deleting product...');
		$("#deleteConfirmationModal").modal('hide');
		axios.delete('http://10.89.73.15:3000/api/user/'+id).then(function(response){
			toastr.clear();
			$(".data-row[data-id='"+id+"']").slideUp();
		}).catch(function(error){
			toastr.clear();
			toastr.error(error);
		});
	}

	addNewUser(){
		location.href='#/user/new';	
	}

	render(){	
		return (
			<div>
				<p>[UsersComponent.js] page</p>
				<div className="panel panel-default">
				  	<div className="panel-heading">List of Users</div>
				  	<div className="panel-body">
					  	<button className="btn btn-xs btn-success" onClick={this.addNewUser} >Add New User from UsersComponent by Router</button>
						<br />
				  	</div>
				  	<div>
						<TableClass cols={this.state.cols} data={this.state.data} onDelete={this.deleteUser} onUpdate={this.updateUser}/>
						<div className="modal fade" id="deleteConfirmationModal" role="dialog">
						    <div className="modal-dialog">
						        <div className="modal-content">
						            <div className="modal-header">
						                <button type="button" className="close" data-dismiss="modal">&times;</button>
						                <h4 className="modal-title">Delete Item</h4>	
						            </div>
						            <div className="modal-body">
						                <p>Are you sure want to delete User with User ID <span id ="selectedUser" />?</p>
						            </div>
						            <div className="modal-footer">
						                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
						                <button type="button" className="btn btn-danger" 
						                		id="deleteButton" 
						                		onClick={this.doDeleteUser.bind(this)} 
						                		data-dismiss="modal">Delete Item</button>
						            </div>
						        </div>
						    </div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default UserComponent;
