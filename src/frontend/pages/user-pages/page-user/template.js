import { html } from 'lit';

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
      Look at Users
    </h2>
    <form @submit=${this.getUserData}>
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `

      : ''}

    <div class="label-input-group">
      <label for="username">
        User Name:
      </label>
      <input type="text" placeholder="username" id="username" name="username">
    </div>

    <div class="flex-group">
      <button>
        Get User Data
      </button>

    </div>

    ${Object.keys(this.userData).length
        ? html`
        <h4> User Name : ${this.userData.username}</h4>
        <h4> First Name : ${this.userData.firstName}</h4>
        <h4> Last Name : ${this.userData.lastName}</h4>
        <h4> Created Date : ${new Date(this.userData.createdDate).toDateString()}</h4>
        <h4> Latest Update Date : ${new Date(this.userData.updatedDate).toDateString()}</h4>

        `
        : ''

    }
    
  </form>


  
      

  `;
}
