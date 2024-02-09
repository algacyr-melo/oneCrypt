const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');

encryptBtn.addEventListener('click', handleEncrypt);
decryptBtn.addEventListener('click', handleDecrypt);

const cipher = {
	'e': 'enter',
	'i': 'imes',
	'a': 'ai',
	'o': 'ober',
	'u': 'ufat'
}

const textInput = document.getElementById('text-input');

const textOutput = document.getElementById('text-output');
const outputOverlay = document.getElementById('output-overlay');

function handleEncrypt() {
	const text = textInput.value;

	let encryptedText = '';
	for (let i = 0; i < text.length; ++i) {
		const c = text[i];
		encryptedText += cipher[c] || text[i];
	}
	textOutput.innerText = encryptedText;
	textInput.value = '';
	outputOverlay.style.display = 'none';
}

function handleDecrypt() {
	const text = textInput.value;

	let originalText = '';
	let i = 0;
	while (i < text.length)
	{
		const char = text[i];
		originalText += char;

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
	textOutput.innerText = originalText;
	textInput.value = '';
	outputOverlay.style.display = 'none';
}
