import { customElement, property } from 'lit/decorators.js';

import { changeUrl } from '../../../utils/helpers/change-url.js';
import { LitPage } from '../../../utils/lit-page/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('page-todo-one')
class Page extends LitPage {
  @property({ type: Object })
  blog = {}

  @property({ type: Array })
  comments = []

  @property({ type: Boolean })
  isEditing= false;

  @property({ type: Boolean })
  isEditingComment= false;

  @property({ type: String })
  isEditingCommentId= '';

  @property({ type: String })
  errorMessage = ''

  render () {
    return template.bind(this)();
  }

  async updated (changedMap) {
    await super.updated(changedMap);
    if (changedMap.has('paramObject')) {
      const { id } = this.paramObject || {};
      if (id) {
        await this.getBlog(id);
      }
    }
  }

  async editBlog (event) {
    this.isEditing = true;
  }

  async editComment (event) {
    event.preventDefault();
    this.isEditingComment = true;
    console.log(event);
    this.isEditingCommentId = event.detail.id;
  }

  async getBlog (id) {
    const response = await window.fetch(`/api/blog/${id}`);
    if (response.status !== 200) {
      return this.setErrorMessage(await response.json(), response.status);
    }
    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
        this.comments = this.blog.comments;
        console.log(this.blog);
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async updateBlog (event) {
    event.preventDefault();
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
    });
    try {
      if (response.status !== 200) {
        this.isEditing = false;
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async deleteBlog (event) {
    event.preventDefault();
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
    });
    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        this.blog = await response.json();
        changeUrl('/blog');
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async updateComment (event) {
    event.preventDefault();

    console.log(event);
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}/comment/${detail.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: detail.message })
    });
    try {
      if (response.status !== 200) {
        this.isEditingComment = false;
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        const comm = await response.json();
        // console.log(comm)
        // console.log(this.comments)
        this.comments = this.comments.map(obj => comm.id === obj.id ? comm : obj);
        // console.log(this.comments)
        this.isEditingComment = false;
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async createComment (event) {
    event.preventDefault();
    console.log(event);
    // we get the data from the detail being sent by the todo-component
    const { detail } = event;

    const response = await window.fetch(`/api/blog/${detail.id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: detail.message })
    });
    try {
      const data = await response.json();
      // appends the new object
      this.comments = [
        ...this.comments,
        data
      ];
      console.log(this.comments);
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async deleteComment (event) {
    event.preventDefault();
    console.log(event);

    // we get the data from the detail being sent by the todo-component
    const { detail } = event;
    const response = await window.fetch(`/api/blog/${this.blog.id}/comment/${detail.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: detail.id })
    });
    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        console.log(this.comments.filter((obj) => obj.id !== detail.id));
        this.comments = this.comments.filter((obj) => obj.id !== detail.id);
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async setErrorMessage (data, status) {
    const { message, error } = data;
    this.errorMessage = `HTTP Code: ${status} - ${error} - ${message}`;
  }
}

export { Page };
