'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});

exports.handler = async (event, context) => {
    
  const documentClient  = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});
  let responseBody = "";
  let statusCode = 0;
  
  const  {id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Products",
    Key: { id:  id },
    UpdateExpression: "set productname = :n",
    ExpressionAttributeValues: {
      ":n": productname
    },
    ReturnValues: "UPDATED_NEW"
   };
  
    try {
      const data = await documentClient.update(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 204;
    } catch (error) {
      responseBody = `unable to Update product: ${error}`;
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