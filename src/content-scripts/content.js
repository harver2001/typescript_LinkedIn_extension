// Predefined text to be inserted into chat
const predefinedText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

// Function to create and inject the modal into the page
function createModal(clickedChat) {
    // Create modal background
    const modalBackground = document.createElement('div');
    modalBackground.style.position = 'fixed';
    modalBackground.style.top = '0';
    modalBackground.style.left = '0';
    modalBackground.style.width = '100vw';
    modalBackground.style.height = '100vh';
    modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalBackground.style.display = 'flex';
    modalBackground.style.justifyContent = 'center';
    modalBackground.style.alignItems = 'center';
    modalBackground.style.zIndex = '10000';

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.style.width = '400px';  // Increased width for the modal
    modalContainer.style.backgroundColor = 'white';
    modalContainer.style.borderRadius = '10px';
    modalContainer.style.padding = '20px';
    modalContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    modalContainer.style.display = 'flex';
    modalContainer.style.flexDirection = 'column';
    modalContainer.style.gap = '10px';
    modalContainer.style.maxHeight = '400px';
    modalContainer.style.overflowY = 'auto';

    // Create chat container inside modal
    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.gap = '10px';
    chatContainer.style.maxHeight = '250px';
    chatContainer.style.overflowY = 'auto';
    modalContainer.appendChild(chatContainer);

    // Create input field for user prompt
    const inputField = document.createElement('input');
    inputField.placeholder = 'Your prompt';
    inputField.style.width = '100%';
    inputField.style.padding = '10px';
    inputField.style.border = '1px solid #ddd';
    inputField.style.borderRadius = '5px';
    inputField.style.color = 'black';  // Ensure input text is black
    modalContainer.appendChild(inputField);

    // Create container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    modalContainer.appendChild(buttonContainer);

    // Create the 'Insert' button
    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert';
    insertButton.style.backgroundColor = 'whitesmoke';
    insertButton.style.border = 'none';
    insertButton.style.padding = '10px';
    insertButton.style.borderRadius = '5px';
    insertButton.style.cursor = 'pointer';
    insertButton.style.display = 'none';  // Initially hidden
    buttonContainer.appendChild(insertButton);

    // Create the 'Generate' button
    const generateButton = document.createElement('button');
    generateButton.innerHTML = '<img src="' + chrome.runtime.getURL('assets/generate-icon.png') + '" width="20px"/>';
    generateButton.style.backgroundColor = 'blue';
    generateButton.style.color = 'white';
    generateButton.style.border = 'none';
    generateButton.style.padding = '10px';
    generateButton.style.borderRadius = '5px';
    generateButton.style.cursor = 'pointer';
    buttonContainer.appendChild(generateButton);

    // Function to append chat bubbles to chat container
    function appendChatBubble(text, alignSelf, backgroundColor, color) {
        const chatBubble = document.createElement('div');
        chatBubble.style.alignSelf = alignSelf;
        chatBubble.style.padding = '10px';
        chatBubble.style.borderRadius = '10px';
        chatBubble.style.backgroundColor = backgroundColor;
        chatBubble.style.color = color;
        chatBubble.style.maxWidth = '70%';
        chatBubble.textContent = text;
        chatContainer.appendChild(chatBubble);
    }

    // Insert button logic
    insertButton.onclick = () => {
        if (clickedChat) {
            clickedChat.innerHTML = predefinedText;  // Copy predefined text to LinkedIn chat input
            inputField.value = '';  // Clear the input field
            inputField.placeholder = '';  // Remove placeholder after insert
        }
    };

    // Generate button logic
    generateButton.onclick = () => {
        const userInput = inputField.value;
        if (userInput) {
            appendChatBubble(userInput, 'flex-end', '#e0e0e0', 'black');  // User input on the right
            appendChatBubble(predefinedText, 'flex-start', '#d8eaff', 'black');  // Predefined response on the left
            inputField.value = '';  // Clear input field
            inputField.placeholder = '';  // Remove placeholder after generation
            insertButton.style.display = 'inline';  // Show Insert button
            chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll to bottom
        }
    };

    // Append modal and background to the document body
    modalBackground.appendChild(modalContainer);
    document.body.appendChild(modalBackground);

    // Clicking outside the modal closes it
    modalBackground.addEventListener('click', function (event) {
        if (event.target === modalBackground) {
            modalBackground.remove();
        }
    });
}

// Function to inject the logo into LinkedIn chat input fields
function injectLogo() {
    const chatSelector = '.msg-form__contenteditable';
    const chatElements = document.querySelectorAll(chatSelector);

    chatElements.forEach(chat => {
        if (!chat.querySelector('.custom-logo')) {
            const logoImg = document.createElement('img');
            logoImg.src = chrome.runtime.getURL('assets/your-logo.png');  // Load the logo from assets
            logoImg.className = 'custom-logo';
            logoImg.style = 'width: 40px; height: 40px; position: absolute; right: 10px; bottom: 10px; cursor: pointer;';

            logoImg.addEventListener('click', () => createModal(chat));
            chat.appendChild(logoImg);
        }
    });
}

// DOM observer to dynamically inject logo into new chats
const observer = new MutationObserver(() => {
    injectLogo();
});

observer.observe(document.body, { childList: true, subtree: true });
injectLogo();
