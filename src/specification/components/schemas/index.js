
export const schemas = {
  BlogObject: {
    type: 'object',
    properties: {
      id: {
        type: 'string'

      },
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      comments: {
        type: 'array',
        items: {
          type: 'string'
        }
      },

      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'

      }

    }
  },
  BlogRequestRequiredObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    },
    required: [
      'title',
      'description'
    ]
  },

  TodoRequestObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      isDone: {
        type: 'boolean'
      }
    }

  },

  NewUserObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    }
  },

  UserObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  LoginObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  },
  SuccessfulObject: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean'
      }
    }
  }
};
