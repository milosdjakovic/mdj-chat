const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");

// Get username and group from URL
const { username, group } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chat group
socket.emit("join group", { username, group });

socket.on("group users", ({ group, users }) => {
  outputGroupName(group);
  outputGroupUsers(users);
});

function outputGroupName(group) {
  const groupName = document.querySelector("#group-name");
  groupName.textContent = group;
}

function outputGroupUsers(users) {
  const onlineUsers = document.querySelector("#online-users");

  onlineUsers.innerHTML = `
  ${users
    .map(
      ({ id, username, group }) =>`
        <li>
          <i class="fas fa-user text-green-500 text-lg mr-1"></i> 
          ${username}
        </li>
      `)
    .join("")}
  `;
}

function outputMessage({ username, text, time }) {
  const messageDiv = document.createElement("div");
  const usernameP = document.createElement("p");
  const dateS = document.createElement("span");
  const textP = document.createElement("p");

  messageDiv.classList.add(
    "message",
    "bg-blue-100",
    "border-2",
    "border-blue-200",
    "py-2",
    "px-4",
    "mb-4",
    "rounded"
  );
  usernameP.classList.add("meta", "text-blue-600", "text-sm", "font-bold");
  dateS.classList.add("meta", "text-blue-400", "font-normal", "ml-2");
  textP.classList.add("text");

  usernameP.textContent = username;
  dateS.textContent = time;
  textP.innerHTML = text;

  usernameP.appendChild(dateS);
  messageDiv.appendChild(usernameP);
  messageDiv.appendChild(textP);

  chatMessages.appendChild(messageDiv);
}

socket.on("message", (message) => {
  outputMessage(message);

  // Scroll on message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get message text
  const message = document.querySelector("#message");

  // Emitin a message to the server
  socket.emit("chat message", message.value);

  message.value = "";
  message.focus();
});
