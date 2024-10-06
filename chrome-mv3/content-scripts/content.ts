const predefinedText: string = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

function createModal(clickedChat: HTMLElement | null): void {
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

    const modalContainer = document.createElement('div');
    modalContainer.style.width = '450px';  // Increased width for the modal
    modalContainer.style.backgroundColor = 'white';
    modalContainer.style.borderRadius = '10px';
    modalContainer.style.padding = '20px';
    modalContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    modalContainer.style.display = 'flex';
    modalContainer.style.flexDirection = 'column';
    modalContainer.style.gap = '10px';
    modalContainer.style.maxHeight = '400px';
    modalContainer.style.overflowY = 'auto';

    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.gap = '10px';
    chatContainer.style.maxHeight = '250px';
    chatContainer.style.overflowY = 'auto';
    modalContainer.appendChild(chatContainer);

    const inputField = document.createElement('input');
    inputField.placeholder = 'Your prompt';
    inputField.style.width = '100%';
    inputField.style.padding = '10px';
    inputField.style.border = '1px solid #ddd';
    inputField.style.borderRadius = '5px';
    inputField.style.color = 'black';
    modalContainer.appendChild(inputField);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';  // Add space between buttons
    modalContainer.appendChild(buttonContainer);

    const insertButton = document.createElement('button');
    const insertIcon = document.createElement('div');
    insertIcon.innerHTML = `
        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.1 12.3666V1.43331C6.1 1.05553 6.228 0.739087 6.484 0.483976C6.74 0.228865 7.05644 0.100864 7.43333 0.0999756C7.81111 0.0999756 8.128 0.227976 8.384 0.483976C8.64 0.739976 8.76756 1.05642 8.76667 1.43331V12.3666L12.6333 8.49998C12.8778 8.25553 13.1889 8.13331 13.5667 8.13331C13.9444 8.13331 14.2556 8.25553 14.5 8.49998C14.7444 8.74442 14.8667 9.05553 14.8667 9.43331C14.8667 9.81109 14.7444 10.1222 14.5 10.3666L8.36667 16.5C8.1 16.7666 7.78889 16.9 7.43333 16.9C7.07778 16.9 6.76667 16.7666 6.5 16.5L0.366666 10.3666C0.122222 10.1222 0 9.81109 0 9.43331C0 9.05553 0.122222 8.74442 0.366666 8.49998C0.611111 8.25553 0.922222 8.13331 1.3 8.13331C1.67778 8.13331 1.98889 8.25553 2.23333 8.49998L6.1 12.3666Z" fill="#666D80"/>
        </svg>
    `;
    insertIcon.style.marginRight = '5px';  // Add some space between the icon and the text
    insertButton.appendChild(insertIcon);
    const insertText = document.createElement('span');
    insertText.textContent = ' Insert';
    insertButton.appendChild(insertText);
    insertButton.style.backgroundColor = '#d3d3d3';  // Lighter shade for the Insert button
    insertButton.style.border = 'none';
    insertButton.style.padding = '10px';
    insertButton.style.borderRadius = '5px';
    insertButton.style.cursor = 'pointer';
    insertButton.style.display = 'none';  // Initially hidden
    insertButton.style.alignItems = 'center';
    buttonContainer.appendChild(insertButton);

    const generateButton = document.createElement('button');
    const generateIcon = document.createElement('div');
    generateIcon.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z" fill="white"/>
        </svg>
    `;
    generateIcon.style.marginRight = '5px';  // Add some space between the icon and the text
    const generateText = document.createElement('span');
    generateText.textContent = ' Generate';
    generateButton.appendChild(generateIcon);
    generateButton.appendChild(generateText);
    generateButton.style.backgroundColor = 'blue';
    generateButton.style.color = 'white';
    generateButton.style.border = 'none';
    generateButton.style.padding = '10px';
    generateButton.style.borderRadius = '5px';
    generateButton.style.cursor = 'pointer';
    generateButton.style.display = 'flex';
    generateButton.style.alignItems = 'center';
    buttonContainer.appendChild(generateButton);

    function appendChatBubble(text: string, alignSelf: string, backgroundColor: string, color: string): void {
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

    insertButton.onclick = () => {
        if (clickedChat) {
            clickedChat.innerHTML = predefinedText;
            inputField.value = '';
            inputField.placeholder = '';
        }
    };

    generateButton.onclick = () => {
        const userInput: string = inputField.value;
        if (userInput) {
            appendChatBubble(userInput, 'flex-end', '#e0e0e0', 'black');
            appendChatBubble(predefinedText, 'flex-start', '#d8eaff', 'black');
            inputField.value = '';
            inputField.placeholder = '';
            insertButton.style.display = 'flex';  // Show the insert button
            generateText.textContent = ' Regenerate';  // Change text to Regenerate
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };

    modalBackground.appendChild(modalContainer);
    document.body.appendChild(modalBackground);

    modalBackground.addEventListener('click', function (event: MouseEvent) {
        if (event.target === modalBackground) {
            modalBackground.remove();
        }
    });
}

function injectLogo(): void {
    const chatSelector: string = '.msg-form__contenteditable';
    const chatElements: NodeListOf<HTMLElement> = document.querySelectorAll(chatSelector);

    chatElements.forEach(chat => {
        if (!chat.querySelector('.custom-logo')) {
            const logoImg = document.createElement('img');
            logoImg.src = chrome.runtime.getURL('assets/your-logo.png');
            logoImg.className = 'custom-logo';
            logoImg.style.width = '30px';  // Decreased size of the logo in chat
            logoImg.style.height = '30px';  // Decreased size of the logo in chat
            logoImg.style.position = 'absolute';
            logoImg.style.right = '10px';
            logoImg.style.bottom = '10px';
            logoImg.style.cursor = 'pointer';
            logoImg.style.display = 'none';  // Initially hidden
            logoImg.addEventListener('click', () => createModal(chat));
            chat.appendChild(logoImg);

            // Show logo when chat is active
            chat.addEventListener('focus', () => {
                logoImg.style.display = 'block';
            });

            // Hide logo when chat is not active
            chat.addEventListener('blur', () => {
                logoImg.style.display = 'none';
            });
        }
    });
}

const observer = new MutationObserver(() => {
    injectLogo();
});

observer.observe(document.body, { childList: true, subtree: true });
injectLogo();