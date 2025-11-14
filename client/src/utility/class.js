class Message {
  constructor(sender, content, time) {
    this.sender = sender;
    this.content = content;
    this.sentTime = time;
  }
  search(sender) {
    if (this.sender === sender) {
      return 2;
    } else return 5;
  }
}

module.exports = Message;
