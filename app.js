const askButton = document.getElementById('ask-btn');
const userInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('messages');

askButton.addEventListener('click', async () => {
  const prompt = userInput.value.trim();
  if (prompt) {
    addMessage(prompt, 'user');
    userInput.value = '';
    addMessage("Typing...", "bot");

    try {
      const response = await fetch(`/api/gemini?text=${encodeURIComponent(prompt)}`);
      const data = await response.json();
      if (data.result) {
        messagesContainer.lastChild.innerHTML = data.result;
      } else {
        messagesContainer.lastChild.innerHTML = "Oops! Something went wrong. Please try again later.";
      }
    } catch (error) {
      console.error('Error:', error);
      messagesContainer.lastChild.innerHTML = "Oops! Something went wrong. Please try again later.";
    }
  }
});

function addMessage(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = content;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
