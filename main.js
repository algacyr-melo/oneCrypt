// Global DOM elements
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');

const textInputEl = document.getElementById('text-input');
const textOutputEl = document.getElementById('text-output');

const copyToClipboardBtn = document.getElementById('copy-to-clipboard-btn');

// Cipher substitution mapping
const cipher = {
	'e': 'enter',
	'i': 'imes',
	'a': 'ai',
	'o': 'ober',
	'u': 'ufat'
}

async function copyToClipboard() {
	const output = textOutputEl.textContent;
	try {
		await navigator.clipboard.writeText(output);
	} catch (error) {
		console.error(error.message);
	}
}

function handleCipherButtonClick(operation) {
	if (!textInputEl.value) {
		return ;
	}

	if (!hasOnlyLowerCaseAndSpace(textInputEl.value)) {
		alert('Digite apenas letras minúsculas e sem acento');
		return ;
	}

	let textOutput;
	if (operation === 'encrypt') {
		textOutput = encrypt(textInputEl.value);
	} else if (operation === 'decrypt') {
		textOutput = decrypt(textInputEl.value);
	}

	removeOutputOverlay();
	updateTextOutput(textOutput);
	clearTextInput();
}

function encrypt(text) {
	let encryptedText = '';

	for (let i = 0; i < text.length; ++i) {
		const c = text[i];
		encryptedText += cipher[c] || text[i];
	}
	return encryptedText;
}

function decrypt(text) {
	let decryptedText = '';

	let i = 0;
	while (i < text.length)
	{
		const char = text[i];
		decryptedText += char;

		// is it a ciphered character? (a,e,i,o,u)
		if (cipher[char]) {
			const chunk = text.slice(i, i + cipher[char].length);

			// does this string section matches some
			// of our cipher values? (e.g enter, ufat...)
			// if so, jump over the rest of characters
			if (chunk === cipher[char]) {
				i += chunk.length;
				continue ;
			}
		}
		i++;
	}

	return decryptedText;
}

function removeOutputOverlay() {
	const outputOverlayEl = document.getElementById('output-overlay');

	outputOverlayEl.style.display = 'none';
}

function updateTextOutput(textOutput) {
	const textOutputEl = document.getElementById('text-output');

	textOutputEl.textContent = textOutput;
}

function clearTextInput() {
	textInputEl.value = '';
}

function hasOnlyLowerCaseAndSpace(textInput) {
	for (let i = 0; i < textInput.length; ++i) {
		if ((textInput.charCodeAt(i) < 97 ||
			textInput.charCodeAt(i) > 122) &&
			textInput[i] != ' '
		)
		{
			return false;
		}
	}
	return true;
}

// Event Listeners
encryptBtn.addEventListener('click', () => {
	handleCipherButtonClick('encrypt');
});

decryptBtn.addEventListener('click', () => {
	handleCipherButtonClick('decrypt');
});

copyToClipboardBtn.addEventListener('click', () => {
	copyToClipboard();
});
