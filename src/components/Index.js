import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'

class Index extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			products     : [
				{id : 11, productname : "Potatos", description:"From UK", can_expire_indicator : true, exp_date : "31/03/2024", category: "vegetable", price: "£4.00", spl_indicator: true },
				{id : 12, productname : "Chicken", description:"From Europe", can_expire_indicator : true, exp_date : "10/03/2024", category: "meat", price: "£14.00", spl_indicator: true },
				{id : 13, productname : "Mangos", description:"From India", can_expire_indicator : true, exp_date : "05/03/2024", category: "fruits", price: "£20.00", spl_indicator: true }
				],
			editProduct : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Update state variable while any product insert or update ---//
	handleUpdateState(data, operation) {
		//--- 'operation==1' means update product ---//
		if(operation === 1) {
			this.setState(prevState => ({
				products : prevState.products.filter(product => {
					if(product.id === data.id)
						return Object.assign(product, data);
					else
						return product;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert product ---//
		var new_products = this.state.products.concat(data);
		this.setState({
			products : new_products
		})
	}
	//--- Find editable product and update state variable ---//
	handleEditProduct(productId) {
		this.setState({
			editProduct : this.state.products.find(x => x.id === productId)
		})
	}
	//--- Delete product and update state ---//
	handleDeleteProduct(id) {
		this.setState(prevState => ({
			products : prevState.products.filter((product, i) => {
				return i !== id;
			})
		}))
		toastr.error('Product has been deleted successfully!', {position : 'top-right', heading: 'Done'});
	}

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Products </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add Product </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
									<th> Name </th>
                                    <th> Description </th>
                                    <th> Can Expire </th>
                                    <th> Expiry Date </th>
                                    <th> Category  </th>
									<th> Price  </th>
									<th> isSpecial  </th>
									<th> Action  </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map((product, i) => (
                                <tr key={i}>
                                    <td> {product.id} </td>
									<td> {product.productname} </td>
                                    <td> {product.description} </td>
                                    <td> <input  type="checkbox" checked={product.can_expire_indicator}  onclick="return false;"/>  </td>
                                    <td> {product.exp_date} </td>
									<td> {product.category} </td>
									<td> {product.price} </td>
									<td> <input  type="checkbox" checked={product.spl_indicator}  onclick="return false;"/> </td>
                                    <td>
                                        <button className="btn btn-info btn-sm mr-2" onClick={this.handleEditProduct.bind(this, product.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteProduct.bind(this, i)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} product = {this.state.editProduct} />
			</div>
        )
    }
}
export default Index