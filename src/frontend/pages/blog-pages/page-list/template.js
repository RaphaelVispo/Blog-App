import { html } from 'lit';
import '../../../components/blog-components/blog-component/index.js';

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
    <h2>
      Blogs
    </h2>
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
    <div class="todo-list">
      ${this.blogs.map(blog => html`
        <div class="todo">
          <a href="/blog/${blog.id}">
            <div> ${blog.title}</div>
            <div> ${new Date(blog.createdDate).toDateString()}</div>
          </a>
          
          <p>
            ${blog.description}
          </p>

        </div>
      `)}
    </div>

    <blog-component @submit-blog="${this.createBlog}"></blog-component>
   
  `;
}

// <todo-component @submit-todo="${this.createTodo}"></todo-component>
