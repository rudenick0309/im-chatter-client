let example = {
  username: "df",
  text: "df",
  roomname: "코드스테이츠",
};

// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
};

let submitButton = document.querySelector("button#message-button");
submitButton.addEventListener("click", app.sendMsg);

document
  .querySelector("select#select-room")
  .addEventListener("change", app.changeRoom);

app.renderMessage(example);
setInterval(app.getNewMsg, 1000 * 5);

app.init();
