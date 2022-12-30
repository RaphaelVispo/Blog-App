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
  }
};
