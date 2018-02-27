import React from 'react';
import axios from 'axios';

class UserNewComponent extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			name : '',
			email : '',
			password: ''
		}
	}

	submitForm(event){
		event.preventDefault();
		var data = $(event.target).serialize();
		toastr.clear();
		var isError = false;
		/*
		//validations
		if(this.state.name===""){
			toastr.error("Product name must be filled!");
			isError=true;
		}
		if(this.state.price===0 || this.state.price===''){
			toastr.error("Product price must be filled!");
			isError=true;
		}
		*/
		if(!isError){
			toastr.info('Inserting new user data...');
			axios.post('http://10.89.73.15:3000/api/user',{
				name : this.state.name,
				email : this.state.email,
				password : this.state.password,
			}).then(function(response){
				toastr.clear();
				location.href = "#/";
			}).catch(function(error){
				toastr.clear();
				toastr.error(error);
			});
		}
	}

	onUserNameChange(e){
		this.setState({
			id : this.state.id,
			name : e.target.value.trim(),
			email : this.state.email,
			password: this.state.password
		});
	}

	onUserEmailChange(e){
		this.setState({
			id : this.state.id,
			name : this.state.name,
			email : e.target.value.trim(),
			password: this.state.password
		});
	}

	onUserPWChange(e){
		this.setState({
			id : this.state.id,
			name : this.state.name,
			email : this.state.email,
			password: e.target.value.trim()
		});
	}
	
	listUser(){
		location.href='#/';	
	}

	render(){
		return (
			<div>
				<div>
					<p>[UserNewComponent.js] page</p>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">Add New User</div>
					<div className="panel-body">
						<form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>
						    <div className="form-group">
						        <label className="control-label col-sm-2" htmlFor="userName">Name : </label>
						        <div className="col-sm-10">
						            <input 	type="text" name='userName' 
						            		onChange={this.onUserNameChange.bind(this)}
						            		id="userName" className="form-control" placeholder="User Name" />
						        </div>
						    </div>
						    <div className="form-group">
						        <label className="control-label col-sm-2" htmlFor="userEmail">Email : </label>
						        <div className="col-sm-10">
						            <input 	type="text" name='userEmail' 
						            		onChange={this.onUserEmailChange.bind(this)}
						            		id="userEmail" className="form-control" placeholder="User Email" />
						        </div>
						    </div>
						    <div className="form-group">
						        <label className="control-label col-sm-2" htmlFor="userPassword">Password : </label>
						        <div className="col-sm-10">
						            <input 	type="text" name='userPassword' 
						            		onChange={this.onUserPWChange.bind(this)}
						            		id="userPassword" className="form-control" placeholder="User Password" />
						        </div>
						    </div>
						    <div className="form-group">
						        <div className="col-sm-offset-2 col-sm-10">
						        	<button type="button" className="btn btn-default" onClick={this.listUser} >Cancel</button>
						            <span>{' '}</span>
						            <button type="submit" className="btn btn-info">Save</button>
						        </div>
						    </div>
						</form>
					</div>
				</div>
			</div>
		);
	}

}

export default UserNewComponent;