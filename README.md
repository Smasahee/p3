<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web ChatApp</title>
  <link rel="stylesheet" href="css/styllle.css">
  <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-auth.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
</script>
</head>
<body>
  <h1>My ChatApp ♥</h1><br>
  <ul id="messages"></ul>


    <input class="message"  id="message" placeholder="Enter Message here" autocomplete="off">
       &nbsp;
    <button class="submit" onclick="return sendMessage();" type="submit">SUBMIT</button>

<script type="text/javascript">
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
</script>



  <script src="js/p.js"></script>
</body>
</html>
