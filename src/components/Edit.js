import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor() {
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			product_id   : '',
			productname  : '',
			description : '',
			can_expire_indicator : '',
			exp_date: '',
			category: '',
			price: '',
			spl_indicator: ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(product_data) {
		this.setState({
			product_id   : product_data.product.id,
			productname  : product_data.product.productname,
			description : product_data.product.description,
			can_expire_indicator : product_data.product.can_expire_indicator,
			exp_date: product_data.product.exp_date,
			category: product_data.product.category,
			price: product_data.product.price,
			spl_indicator: product_data.product.spl_indicator
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	handleCheckboxChange = (event) => {
		this.setState({[event.target.name] : event.target.checked ? true: false})
	};

	//--- Update state products variable by props method ---//
	handleUpdateProduct(e) {
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			id        : this.state.product_id,
			productname  : this.state.productname,
			description : this.state.description,
			can_expire_indicator : this.state.can_expire_indicator,
			exp_date: this.state.exp_date,
			category: this.state.category,
			price: this.state.price,
			spl_indicator: this.state.spl_indicator
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
			toastr.warn('Product data updated successfully!', {position : 'top-right', heading: 'Done'});
		}
	}
    //--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
		if(fields.productname.length === 0) {
    		error.productname = ['This field is required!'];
    	}
    	if(fields.can_expire_indicator === true && fields.exp_date.length === 0) {
    		error.exp_date = ['This field is required!'];
    	}else if(fields.can_expire_indicator === false){
			fields.exp_date = null;
		}
		if(fields.category.length === 0) {
    		error.category = ['This field is required!'];
    	}
		if(fields.price.length === 0) {
    		error.price = ['This field is required!'];
    	}
		this.setState({
			errors : error
		})

		if(fields.productname.length === 0 || fields.category.length === 0|| fields.price.length === 0
			||(fields.can_expire_indicator === true && fields.exp_date.length === 0)) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while update product ---//
	reset() {
        this.setState(this.baseState);
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update Product Information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateProduct}>
			      		<div className="modal-body">
						  <div className="form-group">
			            		<label htmlFor="productname" className="col-form-label">Name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('productname') ? 'is-invalid' : ''}`}
			            		 id="productname" name="productname" placeholder="Product name" onChange={this.handleInputFieldChange} value={this.state.productname}/>
			            		{this.renderErrorFor('productname')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="description" className="col-form-label">Description:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
			            		 id="description" name="description" placeholder="Description" onChange={this.handleInputFieldChange} value={this.state.description}/>
			            		{this.renderErrorFor('description')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="can_expire_indicator" className="col-form-label">Can Expire ?:</label>
			            		<input type="checkbox"
			            		 id="can_expire_indicator" name="can_expire_indicator"  onChange={this.handleCheckboxChange } checked={this.state.can_expire_indicator}/>
			            		{this.renderErrorFor('can_expire_indicator')}
			          		</div>

							  <div className="form-group">
			            		<label htmlFor="exp_date" className="col-form-label">Expiry Date:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('exp_date') ? 'is-invalid' : ''}`}
			            		 id="exp_date" name="exp_date" placeholder="Expiryt Date" onChange={this.handleInputFieldChange} value={this.state.exp_date}/>
			            		{this.renderErrorFor('exp_date')}
			          		</div>


							  <div className="form-group">
			            		<label htmlFor="category" className="col-form-label">Category:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('category') ? 'is-invalid' : ''}`}
			            		 id="category" name="category" placeholder="Category" onChange={this.handleInputFieldChange} value={this.state.category}/>
			            		{this.renderErrorFor('category')}
			          		</div>

							  <div className="form-group">
			            		<label htmlFor="price" className="col-form-label">Price:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('price') ? 'is-invalid' : ''}`}
			            		 id="price" name="price" placeholder="Price" onChange={this.handleInputFieldChange} value={this.state.price}/>
			            		{this.renderErrorFor('price')}
			          		</div>

							  <div className="form-group">
			            		<label htmlFor="spl_indicator" className="col-form-label">is Special?:</label>
			            		<input type="checkbox"
			            		 id="spl_indicator" name="spl_indicator"  onChange={this.handleCheckboxChange} checked={this.state.spl_indicator}/>
			            		{this.renderErrorFor('spl_indicator')}
			          		</div>

			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit