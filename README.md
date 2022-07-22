Note App 
A todo app, built with ApolloClient and ApolloServer, with a user's profile, filters for completed task, pending tasks.


Built with a bunch of things, but to name a few:


Create React App
Express
Reach Router
GraphQL
MongoDB 
Redux Toolkit


Setup
cd client && npm install

index.js
change the uri to your to the server endpoint port
i.e http://localhost:PORT

in server.js file in the server folder

change the cors option to
origin: ['http://localhost:3000', 'https://studio.apollographql.com',],



Create an .env file inside root of the server of the project 

.env

PORT=5000
MONGODB="your mongodb endpoint"
ACCESS='your_accesstoken_secret'
REFRESH='your_refreshtoken_secret'
ADMINEMAIL='your_admin_email'
CLOUD_NAME="your_cloudinary_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"


cd client && npm install
cd server && npm install

cd server  && npm run dev

Deploying to Heroku
cd client && run npm build
drop the build folder in the server file

heroku create app-name
Set Heroku environment variables


heroku config:set PORT=5000
heroku config:set MONGODB="your mongodb endpoint"
heroku config:set ACCESS='your_accesstoken_secret'
heroku config:set REFRESH='your_refreshtoken_secret'
heroku config:set ADMINEMAIL='your_admin_email'
heroku config:set CLOUD_NAME="your_cloudinary_name"
heroku config:set API_KEY="your_cloudinary_api_key"
heroku config:set API_SECRET="your_cloudinary_api_secret"

Push to Heroku

Add http://app-name.herokuapp.com/callback as a your uri in the index.js
git push heroku master

