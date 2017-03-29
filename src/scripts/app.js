export default function app() {
	// all your codes are belong to us
const url = "http://tiny-za-server.herokuapp.com/collections/"
const db = "nealchatroom";  // Data Base that we're working with
const moment = require('moment'); // Use moment to create timestamp
let timestamp = (moment().format('LLLL')); // Creates and formats timestamp
let currentUser; // Used for adding the delete Button
let currentChatHistory; // Used for comparing current and history chat

function UserSession(username) {   // Constructor for user session
	console.log("creating user ", username) // Shows console log 'creating user...'
	this.username = username;
}

function Message(username,body) {  // Constructor for message
	this.sender = username;
	this.body = body;
	this.timestamp = timestamp; // Creates instance of timestamp
	this.save = function() {
							let postData = {  // for posting to chat
								sender: this.sender,
								body: this.body,
								timestamp: this.timestamp,

							}
							let settings = { // settings for posting to tiny-za-server
								type: 'POST',
								contentType: 'application/json',
								url: url+db,
								data: JSON.stringify(postData)
							}
							return $.ajax(settings).then(function(data,status,xhr) {
								console.log(data,status);
								getChatHistory();  // Calls getChatHistory
							});
	}
}

function renderChatHistory(item){ // Creates output with delete button
		let element = '<li class="list-group-item"><p>'+item.timestamp+ " "+'<p>' +item.sender+'</p>'+" "+item.body
		if (item.sender == currentUser.username)
			element += '<button type="button" class="btn btn-default deleteBtn" id="'+item._id+'">Delete</button>';
		element += '</li>'  // wrappes up the list
		$('.list-group').prepend(element); // adds element to the bottom using prepend
}

function getChatHistory() { // shows the chat history after login
	var settings = {
		type: 'GET',
		contentType: 'application/json',
		url: url+db
	}
	$.ajax(settings).then(function(data,status,xhr){ // if the new data matches the history, console 'nothing new'
					if (JSON.stringify(data) === JSON.stringify(currentChatHistory)) {
							console.log("nothing new to show")
					}
					else {
						console.log(data,currentChatHistory)
						currentChatHistory = data;
						$('.list-group').empty();
			data.forEach(function(item,index,array) {
				renderChatHistory(item);
			})
					}
	})
}

function deleteListItem(id) {  // Deletes list item from chat
	var settings = {
		type: 'DELETE',
		url: url+db+'/'+id,
	}
	$.ajax(settings).then(function(data,status,xhr) {
				getChatHistory(); // then renders updated chat history
	})
}

function renderLoginView() { // Shows login, hides chat
	$('.chat-page').hide();
	$('.login-page').show();
}

function renderChatView() { // Shows chat, hides login
	$('.chat-page').show();
	$('.login-page').hide();
	getChatHistory();
	setInterval(getChatHistory,2000) // Every 2 seconds it pulls chat history to compare to see if
}																	// any new articles have been added

function loadView() { // loads views with delete button as needed
	if (currentUser) {
		console.log("user is ", currentUser)
		renderChatView();
	}
	else {
		console.log("No user logged in! ", currentUser) // shows no user in console log
		renderLoginView(); // shows login
	}
}



	$('.list').on('click', '.deleteBtn', function(e){ // Deletes the list item
	  deleteListItem(e.currentTarget.id);
	})

	$('#submitBtn').on('click',function(e){ // Saves new message
		console.log(currentUser, currentUser.username)
	  let formVal = $('#newItemForm').val();
	  let newMsg = new Message(currentUser.username,formVal); // Message constructor
		newMsg.save();
	})

	$('#loginBtn').on('click',function(e){ // login button creates new UserSession
	  let formVal = $('#userName').val();
	  currentUser = new UserSession(formVal); // User Session constructor
		loadView();
	})

	loadView();
}
