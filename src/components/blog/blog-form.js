import React, { Component } from 'react';
import axios from 'axios';

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state={
            title:"",
            blog_status:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm(){
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);

        return formData;
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        axios.post("https://tannersmith.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), {withCredentials: true}
        ).then(response => {
            this.setState({
                title: "",
                blog_status: ""
            });
            
            this.props.handleSuccessfullFormSubmission(
                response.data.portfolio_blog
            );
        }).catch(error => {
            console.log("handle Submit blog form error", error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div  className="two-column">
                    <input type="text" onChange={this.handleChange} name="title" placeholder="Blog Post Title" value={this.state.title} />
                    <input type="text" onChange={this.handleChange} name="blog_status" placeholder="Blog Status" value={this.state.blog_status} />
                </div>
                
                <button className="btn">Save</button>
            </form>
        )
    }
}
