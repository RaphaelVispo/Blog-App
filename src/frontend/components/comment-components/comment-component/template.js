import { html } from 'lit';

export function template () {
  return html`
    <style>
      .todo-create-form {
        display: block;
        width: 100%;
        padding: 10px;
      }
      form .label-input-group {
        display: block;
        padding: 10px;
      }
      form .flex-group {
        display: flex;
        padding: 10px;
        flex: 1;
      }
      form button {
        margin-right: 10px;
        margin-left: 10px;
      }
    </style>
    <form class="todo-create-form" @submit="${this.submitComment}">
      <div class="label-input-group">
        <label for="message">
          Message:
        </label>
        <input type="text" placeholder="Message" id="message" name="message" value="${this.comment?.message}">
      </div>


      <div class="flex-group">
        <button>
          Comment
        </button>
      </div>
    </form>
  `;
}
