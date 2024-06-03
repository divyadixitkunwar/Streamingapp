import admin from 'firebase-admin'


const serviceAccount = {
  type: "service_account",
  project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
  auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
  token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_CERT_URL,
  universe_domain: process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: `gs://${process.env.GOOGLE_CLOUD_PROJECT_ID}.appspot.com`
});

const bucket = admin.storage().bucket();

export default bucket;
