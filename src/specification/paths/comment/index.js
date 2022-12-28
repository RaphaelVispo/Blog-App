export const comment = {
  '/blog/:blogId/comment': {
    post: {
      summary: 'Create a comment on a blog',
      operationId: 'addComment',
      parameters: [
        {
          $ref: '#/components/parameters/BlogParameterId'
        }
      ],
      requestBody: {
        description: 'THe request body for comment',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CommentRequestRequiredObject'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'A comment object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CommentRequestRequiredObject'
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
  //   '/blog': {
  //     post: {
  //       summary: 'Create a blog',
  //       operationId: 'createBlog',
  //       requestBody: {
  //         description: 'THe request body for todo',
  //         content: {
  //           'application/json': {
  //             schema: {
  //               $ref: '#/components/schemas/BlogRequestRequiredObject'
  //             }
  //           }
  //         },
  //         required: true
  //       },
  //       responses: {
  //         200: {
  //           description: 'A todo object',
  //           content: {
  //             'application/json': {
  //               schema: {
  //                 $ref: '#/components/schemas/BlogObject'
  //               }
  //             }
  //           }
  //         }
  //       },
  //       security: [
  //         {
  //           cookieAuth: []
  //         }
  //       ]
  //     }

};
