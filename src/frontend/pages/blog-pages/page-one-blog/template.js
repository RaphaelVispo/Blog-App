import { html } from 'lit';
import '../../../components/blog-components/blog-component/index.js';
import '../../../components/comment-components/comment-component/index.js';


export function template () {
  return html`
    <style>
      .todo {
        display: flex;
        align-items: center;
        padding: 12px;
      }
      .todo * {
        flex: 1;
      }
    </style>
    
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>

      `
      : ''}

      ${Object.keys(this.blog).length ? html`
      <h2>${this.blog.title}</h2>
      <h3>${this.blog.description}</h3>
      
      <div> <h5> Created on ${new Date(this.blog.createdDate).toDateString()}| </h5></div>
      <div> <h5>Last updated on ${new Date( this.blog.updatedDate).toDateString()}</h5></div>

      <button @click="${this.editBlog}"> Edit </button> 
      <button @click= "${this.deleteBlog}"> Delete </button> 
      ${this.isEditing ?  html`
         <blog-component @submit-blog="${this.updateBlog}" .blog="${this.blog}"></blog-component>
        `
          :''

      }
      
    
      ${ !this.isEditing ?   this.comments.map(comment =>{
        return html`
        <h4>${comment.message}</h4>
        <h5>${comment.username}</h5>
        <h6>${comment.createdDate}</h6>
        <h6>${comment.updatedDate}</h6>

        <button @click="${this.editComment}"> Edit </button> 
        <button @click=> Delete </button> 

        ${this.isEditingComment ?  html`
        <comment-component @submit-comment="${this.updateComment}" .comment="${comment}"></comment-component>
       `
         :''}
        `
      }): ''}


      <comment-component @submit-comment="${this.createComment}"   .comment = "${this.blog}" ></comment-component>
      <button> Comment </button> 
    
    `: ''}
   
    
  `;
}


 