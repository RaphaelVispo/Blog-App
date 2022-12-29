
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
        type: 'object',
        properties: {

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

  GetBlogObject: {
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
          type: 'object',
          properties: {
            id: {
              type: 'string'

            },
            message: {
              type: 'string'
            },
            username: {
              type: 'string'
            },

            createdDate: {
              type: 'number'
            },
            updatedDate: {
              type: 'number'

            }

          }
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

  CommentRequestRequiredObject: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'

      }

    },
    required: [
      'message'
    ]
  },

  CommentObject: {
    type: 'object',
    properties: {
      id: {
        type: 'string'

      },
      message: {
        type: 'string'
      },
      username: {
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

  CommentRequestObject: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      }
    }

  },

  BlogRequestObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
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
