var userName = prompt("Enter You Name", "Name here");

function sendMessage() {
    // get message
    var message = document.getElementById("message").value;

    // save in database
    firebase.database().ref("messages").push().set({
        "sender": userName,
        "message": message
    });
    document.getElementById("message").value="";
    // prevent form from submitting
    return false;
    
}

// listen for incoming messages
firebase.database().ref("messages").on("child_added", function (data) {
    var html = "";
    // give each message a unique ID
    html += "<li id='message-" + data.key + "'>";
    // show delete button if message is sent by me
    if (data.val().sender == userName) {
        html += "<button data-id='" + data.key + "' onclick='deleteMessage(this);'>";
            html += "Delete";
        html += "</button>";
    }
    html += data.val().sender + ": " + data.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
    
});

// Delete Message
function deleteMessage(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");
 
    // delete message
    firebase.database().ref("messages").child(messageId).remove();
}
 
// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (data) {
    // remove message node
    document.getElementById("message-" + data.key).innerHTML = "This message has been removed";
});
