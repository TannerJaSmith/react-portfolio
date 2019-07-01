import React, { Component } from 'react'

export default class portfolioForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:"",
            description:"",
            category:"",
            position:"",
            url:"",
            thumb_image:"",
            banner_imager:"",
            logo:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>portfolioForm</div>
                <form>
                    <div>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        <input type="text" name="url" placeholder="Link" value={this.state.url} onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange} />
                        <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="text" name="Description" placeholder="description" value={this.state.description} onChange={this.handleChange} />
                    </div>

                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
