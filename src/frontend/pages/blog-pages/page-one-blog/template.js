import { html } from 'lit';
import '../../../components/blog-components/blog-component/index.js';
import '../../../components/comment-components/comment-component/index.js';
import '../../../components/comment-components/button-component/index.js';

export function template () {
  return html`

    
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>

      `
      : ''}

      ${Object.keys(this.blog).length ? html`
      <h2>Title: ${this.blog.title}</h2>
      <h3>Description: ${this.blog.description}</h3>
      
      <div> <h5> Created on ${new Date(this.blog.createdDate).toDateString()}| </h5></div>
      <div> <h5>Last updated on ${new Date(this.blog.updatedDate).toDateString()}</h5></div>

      <button @click="${this.editBlog}"> Edit </button> 
      <button @click= "${this.deleteBlog}"> Delete </button> 
      ${this.isEditing
? html`
         <blog-component @submit-blog="${this.updateBlog}" .blog="${this.blog}"></blog-component>
        `
          : ''

      }
      
      <br>
      <h2> Comments<h/2>
      ${!this.isEditing? this.comments.map(comment => {
        return html`
        <h4> Message: ${comment.message}</h4>
        <h5> Username: ${comment.username}</h5>
        <h6> Created on ${new Date(comment.createdDate).toDateString()}</h6>
        <h6> Last update it on ${new Date(comment.updatedDate).toDateString()}</h6>

        <button-component @submit-comment="${this.editComment}" .comment="${comment}"   text= "Edit"> </button-component> 
        <button-component @submit-comment="${this.deleteComment}" .comment="${comment}" text= "Delete"></button-component> 

        ${this.isEditingComment && (this.isEditingCommentId === comment.id)
? html`
        <comment-component @submit-comment="${this.updateComment}" .comment="${comment}" text="Edit Comment"></comment-component>
       `
         : ''}
        `;
      })
: ''}


      <comment-component @submit-comment="${this.createComment}"   .comment = "${this.blog}"  text="Add Comment" ></comment-component>
   
    
    `
: ''}
   
    
  `;
}
