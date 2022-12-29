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
    }
  }
};
