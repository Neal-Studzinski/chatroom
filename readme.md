

## Todo

- Add in jQuery / React
- Ensure asset loading is working in and outside of react
Create an online chat application that can host multiple users that have unique usernames/handles.

•	All users can submit new chat messages which should update the chat area in about 2 seconds. Users cannot edit any chat messages. Older chat messages can be deleted, but only by the user that created the message.

•	Messages should display the name of the user who sent them, as well as a timestamp. They should be displayed so that the newest chats are closest to the input area for writing new messages.

•	Your app should include at least 2 "pages" but only 1 html file. The first page should prompt the user to "login" by providing a username. The second should display previously sent messages and an input area to write new messages to the list. The user should only be able to see the chat messages after they have "logged in" by providing a username.

•	Your code should be modular. You should have the following 'views' and 'models', each in its own file:

•	Models (write constructors for these):

o	Session, for keeping track of information about the application's user. It should have a username property.

o	Message, for keeping track of individual messages. It should have timestamp, sender, and body properties. It should have a save and delete method on its prototype.
•	Views (write at least a render function for each of these):

o	Login, for rendering the login page and handling any user events that occur on the login page

o	Chat, for rendering the chat room page and handling any user events that occur on the chat page
o	Message, for rendering a single message to the chat area, and handling any user events that can occur for a single message.

•	You should use ES2015 language features when appropriate.
NOTES
•	Remember to access tiny pizza server via https in your ajax requests, as apps deployed to gh-pages may only receive responses via https.

•	setInterval() will enable you to run a function repeatedly after a specified amount of time has passed (such as refreshing the messages on page).

•	the Moment.js library may come in handy for displaying dates or timestamps with a nice format.
WHAT TO SUBMIT
•	A link to a repository containing at least:
o	an app folder with scripts, sass, and an index.html
o	a docs folder with your compiled code
