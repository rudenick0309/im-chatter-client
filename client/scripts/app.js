// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
  init() {
    app.fetch()
    .then((json) => {
      json.forEach((msg) =>{
        console.log(msg);
        app.renderMessage(msg);
      })

    })
  },
  fetch() {
    return fetch(app.server)
    .then((res) => {
      return res.json()
    })
  },
  send(message, e) {
    e.preventDefault();
    fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => console.log(res));
  },
  clearMessage() {

  },
  renderMessage(message) {
    let contactMessage = document.querySelector('div#chats');
    let divMessage = document.createElement('DIV');
    let spanName = document.createElement('SPAN');
    let divContent = document.createElement('DIV');
    let spanContent = document.createElement('SPAN');
    let spanDate = document.createElement('SPAN');
    spanName.textContent = message.username;
    spanContent.textContent = message.text;
    spanDate.textContent = message.date;
    divMessage.appendChild(spanName);
    divMessage.appendChild(spanDate);
    divContent.appendChild(spanContent);
    contactMessage.appendChild(divMessage);
    contactMessage.appendChild(divContent);
  }
};

let form = document.querySelector('form');
form.addEventListener('submit', app.send)

let example ={
  username: "df",
  text: "df",
  roomname: "코드스테이츠",
}

app.renderMessage(example)

/* 
<div class="message">
  <div>
    <span class="message-name">
      아무개
    </span>
    <span class="message-date">
      2019-04-06
    </span>
  </div>
  <div>
    <span class="message-content">
      content
    </span>
  </div>
</div>
*/


app.init();