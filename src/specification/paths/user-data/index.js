export const userData = {
  '/user/:userId': {
    get: {
      summary: 'Get a user data',
      operationId: 'getUserData',
      parameters: [
        {
          $ref: '#/components/parameters/UserParameterId'
        }
      ],
      responses: {
        200: {
          description: 'A todo object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserObject'
              }
            }
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    },
    put: {
      summary: 'Edit user data',
      operationId: 'updateUserData',
      parameters: [
        {
          $ref: '#/components/parameters/UserParameterId'
        }
      ],
      requestBody: {
        description: 'The request body for todo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserEditRequestObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A todo object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserObject'
              }
            }
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  },
  '/change-password': {
    post: {
      summary: 'Change user password',
      operationId: 'changePassword',

      requestBody: {
        description: 'The request body for todo',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                newPassword: {
                  type: 'string'
                }
              }
            }

          }
        },
        required: true
      },

      responses: {
        200: {
          description: 'Change password',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean'
                  }
                }
              }
            }
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  }
};
