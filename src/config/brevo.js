import sibapi from 'sib-api-v3-sdk';

const client = sibapi.ApiClient.instance;
const apiKey = client.authentications['api-key'];

apiKey.apiKey = process.env.BREVO_API_KEY;

export const brevoEmailClient = new sibapi.TransactionalEmailsApi();