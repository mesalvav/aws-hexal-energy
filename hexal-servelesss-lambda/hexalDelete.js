'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    
  const documentClient  = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});
  let responseBody = "";
  let statusCode = 0;
  
  const { id } = event.pathParameters;

  const params = {
    TableName: "Products",
    Key: { id:  id }
   };
  
    try {
      const data = await documentClient.delete(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 204;
    } catch (error) {
      responseBody = `unable to Delete product: ${error}`;
      statusCode = 403;
    }
    const response = { 
      statusCode: statusCode,
      headers: {
        "Content-type": "application/json"
      },
      body: responseBody
    };

    return response;
};