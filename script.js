function encryptMessage() {
  const message = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  if (!message || !password) return alert("Message and password required.");
  const ciphertext = CryptoJS.AES.encrypt(message, password).toString();
  document.getElementById("output").value = ciphertext;
}

function decryptMessage() {
  const ciphertext = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  if (!ciphertext || !password) return alert("Ciphertext and password required.");
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (!originalText) throw new Error();
    document.getElementById("output").value = originalText;
  } catch {
    alert("Decryption failed. Check the password or ciphertext.");
  }
}

function generateLink() {
  const ciphertext = document.getElementById("output").value;
  if (!ciphertext) return alert("Nothing to share.");
  const url = new URL(window.location.href);
  url.hash = encodeURIComponent(ciphertext);
  document.getElementById("shareable-link").value = url.toString();
}

// Auto-load from URL hash
window.onload = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash) {
    document.getElementById("message").value = hash;
  }
};
