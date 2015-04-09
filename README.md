# Twitter-Sentiment-Analyzer
A love/hate sentiment analyzer on public streaming twitter feeds
***********Software that needs to be installed (if any) with download and installation instructions**********************
twit: Enter the command 'npm install twit --save' to install the public streaming API for twitter from NPM and update the package.json file.
Rest of the node packages are listed in the package.json file which could be installed with the command 'npm install'

***********Environment variable settings************************************
The access keys received from http://apps.twitter.com should be set as environment variables in the $HOME/.bashrc file as below:
export TWITTER_CONSUMER_KEY=**************************
export TWITTER_CONSUMER_SECRET=*******************************
export TWITTER_ACCESS_TOKEN=***********************************
export TWITTER_ACCESS_SECRET=*********************************

***********Instructions on how to run the program***************************
a) Start the server: Extract the assignment from the submitted zip file. cd into the submitted project directory 'P1' and enter the command 'node app.js'

b) Start the client: Open a web browser Chrome/Firefox and enter the address: http://localhost:3000

***********Instructions on how to interpret the results**********************
a) Results at server: The server after startup displays the message 'Socket.io server listening at http://127.0.0.1:3000'.
The web browser client after startup should connect with the server and the message 'Web client connected' is displayed.
Subsquently, the list of tweets is displayed on the console.

b) Results at Client: The web browser shows the following content on being connected with the server:
i) The top message will show the final verdict whether 'Love Wins' or 'Love Lost' or 'It is a tie' based on the Love and Hate %.
ii) The next row message displays the tweet statistics as desired: Total tweets, Love % of tweets and Hate % of tweets.
iii) The tweets containing the word 'Love' and 'Hate' are displayed on left and right columns respectively with their user screennames.

***********References*******
twit node package (https://www.npmjs.com/package/twit)
jquery tutorial reference website(http://callmenick.com/2014/07/06/jquery-functions-javascript-equivalents/)
