let example = {
  username: "df",
  text: "df",
  roomname: "코드스테이츠",
}

// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
  init() {
    app.fetch()
    .then((json) => { 
      app.data = json;
      let roomnameObj = {};
      json.forEach((msg) => {
        if (!roomnameObj[msg.roomname]) {
          roomnameObj[msg.roomname] = 1;
        } else {
          roomnameObj[msg.roomname] += 1;
        }
        app.renderMessage(msg);
      });

      Object.keys(roomnameObj).forEach((key) => {
        let target = document.querySelector('select#select-room');
        let optionEle = document.createElement('option');
        optionEle.setAttribute('value', key);
        optionEle.textContent = key;
        target.appendChild(optionEle);
      });
    })
  },

  changeRoom() {
    app.clearMessages();
    let curRoom = document.querySelector('select#select-room').value;
    let curMsg = [];
    app.data.forEach((msg) => {
      if(msg.roomname === curRoom) {
        curMsg.push(msg);
      }
    });
    curMsg.forEach((msg) => {
      app.renderMessage(msg);
    });
  },

  fetch() {
    return fetch(app.server)
    .then((res) => {
      return res.json()
    });
  },

  send(message) {
    fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    //eslint-disable-next-line no-console;
    .then((json) => {
      // console.log(json);
      app.searchMsg(json.id);
    });
  },

  searchMsg(id) {
    app.fetch()
    .then((json) => {
      json.forEach((msg) => {
        if (msg.id === id) {
          app.renderMessage(msg);
        }
      })
    })
  },

  clearMessages() {
    document.querySelector('div#chats').innerHTML = '';
  },

  renderMessage(message) {
    let messageContainer = document.createElement('DIV');
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
    messageContainer.appendChild(divMessage);
    messageContainer.appendChild(divContent);
    contactMessage.appendChild(messageContainer);
  },
  
  makeObj() {
    return {
      username: document.querySelector('input#message-nickname').value,
      text: document.querySelector('input#message-reply').value,
      roomname: document.querySelector('select#select-room').value,
    }
  },

  sendMsg() {
    let newMsg = app.makeObj();
    app.send(newMsg);
  },

  getNewMsg() {
    app.fetch()
    .then((json) => {
      let lastID = json[json.length - 1].id;
      json.forEach((msg) => {
        if (msg.id > lastID) {
          app.data.push(msg);
          app.renderMessage(msg);
        }
      });
    });
  },
};

let submitButton = document.querySelector('button#message-button');
submitButton.addEventListener('click', app.sendMsg);

document.querySelector('select#select-room').addEventListener('change', app.changeRoom)

app.renderMessage(example);
setInterval(app.getNewMsg, 1000*5);

app.init();