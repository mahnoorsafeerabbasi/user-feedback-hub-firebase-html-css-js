const firebaseConfig = { //replace firebase confid with your actual config
  apiKey: "yourapikey",
  authDomain: "your-authDomain",
  databaseURL: "your databaseURL",
  projectId: "Your projectID",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId",
  measurementId: "your-measurementId"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var feedbackDB = firebase.database().ref("userFeedback");

document.getElementById("feedbackForm").addEventListener("submit", submitFeedback);

function submitFeedback(e) {
  e.preventDefault();

  var username = getElementVal("username");
  var feedback = getElementVal("feedback");

  saveFeedback(username, feedback);

  // Enable alert
  document.querySelector(".alert").style.display = "block";

  // Remove the alert after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset the form
  document.getElementById("feedbackForm").reset();

  // Refresh previous feedback display
  displayPreviousFeedback();
}

const saveFeedback = (username, feedback) => {
  var newFeedback = feedbackDB.push();

  newFeedback.set({
    username: username,
    feedback: feedback,
    timestamp: firebase.database.ServerValue.TIMESTAMP, // Add timestamp if needed
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Display Previous Feedback (Replace this section with actual data)
const displayPreviousFeedback = () => {
  feedbackDB.once("value", function(snapshot) {
    var feedbackList = document.getElementById("previousFeedback");
    feedbackList.innerHTML = "<h2>Previous Feedback:</h2>";

    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var feedbackItem = document.createElement("div");
      feedbackItem.innerHTML = `<p><strong>${childData.username}:</strong> ${childData.feedback}</p>`;
      feedbackList.appendChild(feedbackItem);
    });
  });
};

// Initial display of previous feedback
displayPreviousFeedback();