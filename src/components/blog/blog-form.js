import React, { Component } from 'react';
import axios from 'axios';

import RichTextEditor from '../forms/rich-text-editor';
import { DropzoneComponent } from 'react-dropzone-component';

export default class BlogForm extends Component {
    constructor(props){
        super(props);

        this.state={
            title:"",
            blog_status:"",
            content:"",
            featured_image:"",
            apiUrl: "https://tannersmith.devcamp.space/portfolio/portfolio_blogs",
            apiAction:"post",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.featuredImageRef = React.createRef();
    }

    deleteImage(imageType)
    {
        axios.delete(`https://tannersmith.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`, { withCredentials: true }
        ).then(response =>
        {
            this.props.handelFeaturedImageDelete();
        }).catch(error =>
        {

        });
    }

    componentConfig(){
        return{
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon:true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig(){
        return{
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop(){
        return{
            addedfile: file => this.setState({featured_image : file})
        }
    }

    handleRichTextEditorChange(content){
        this.setState({ content });
    }
    
    buildForm(){
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if(this.state.featured_image){
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }

        return formData;
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        axios({ method: this.state.apiAction, url: this.state.apiUrl, data: this.buildForm(), withCredentials: true }
        ).then(response => {
            if(this.state.featured_image){
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }

            this.setState({
                id:"",
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            });
            
            if(this.props.editMode){
                this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
            }
            else{
                this.props.handleSuccessfullFormSubmission(
                    response.data.portfolio_blog
                );
            }
        }).catch(error => {
            console.log("handle Submit blog form error", error);
        });
        event.preventDefault();
    }

    componentWillMount() {
        if (this.props.editMode) {
          this.setState({
            id: this.props.blog.id,
            title: this.props.blog.title,
            blog_status: this.props.blog.blog_status,
            content:this.props.content,
            apiUrl: `https://tannersmith.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
            apiAction: "patch",
          });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div  className="two-column">
                    <input type="text" onChange={this.handleChange} name="title" placeholder="Blog Post Title" value={this.state.title} />
                    <input type="text" onChange={this.handleChange} name="blog_status" placeholder="Blog Status" value={this.state.blog_status} />
                </div>
                <div className = "one-column">
                    <RichTextEditor editMode={this.props.editMode} handleRichTextEditorChange={this.handleRichTextEditorChange} contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}/>
                </div>

                <div className= "image-uploaders">
                    {this.props.editMode && this.props.blog.featured_image_url ? (
                        <div className="portfolio-manager-image-wrapper">
                        <img src={this.props.blog.featured_image_url} />

                        <div onClick={() => this.deleteImage("featured_image")} className="image-removal-link">
                            <a>Remove file</a>
                        </div>
                        </div>
                    ) : (
                        <DropzoneComponent
                        ref={this.featuredImageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaturedImageDrop()}
                        >
                        <div className="dz-message">Featured Image</div>
                        </DropzoneComponent>
                    )}
                </div>

                <button className="btn">Save</button>
            </form>
        )
    }
}
