export const blog = {
  '/blog/:blogId': {
    get: {
      summary: 'Get a blog',
      operationId: 'getBlog',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      responses: {
        200: {
          description: 'A todo object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BlogObject'
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
      summary: 'Update a blog',
      operationId: 'updateBlog',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      requestBody: {
        description: 'The request body for todo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BlogRequestObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A Blog object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BlogObject'
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
  //   delete: {
  //     summary: 'Delete a todo',
  //     operationId: 'deleteTodo',
  //     parameters: [
  //       {
  //         $ref: '#/components/parameters/TodoParameterId'
  //       }
  //     ],
  //     responses: {
  //       200: {
  //         description: 'successful response',
  //         content: {
  //           'application/json': {
  //             schema: {
  //               type: 'object',
  //               properties: {
  //                 success: {
  //                   type: 'boolean'
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     },
  //     security: [
  //       {
  //         cookieAuth: []
  //       }
  //     ]
  //   }
  },
  '/blog': {
    post: {
      summary: 'Create a blog',
      operationId: 'createBlog',
      requestBody: {
        description: 'THe request body for todo',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BlogRequestRequiredObject'
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
                $ref: '#/components/schemas/BlogObject'
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
    //   get: {
    //     summary: 'Get many todo',
    //     operationId: 'getManyTodo',
    //     parameters: [
    //       {
    //         name: 'limit',
    //         in: 'query',
    //         description: 'The number of items returned',
    //         schema: {
    //           type: 'number'
    //         }
    //       }
    //     ],
    //     responses: {
    //       200: {
    //         description: 'A todo object',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               type: 'array',
    //               items: {
    //                 $ref: '#/components/schemas/TodoObject'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     },
    //     security: [
    //       {
    //         cookieAuth: []
    //       }
    //     ]
    //   }
  }
};
