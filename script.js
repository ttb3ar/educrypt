// Language translations
const translations = {
  en: {
    title: "AES Encryption Tool",
    subtitle: "Secure client-side text encryption and decryption",
    messageLabel: "Message:",
    passwordLabel: "Password:",
    outputLabel: "Output:",
    encryptText: "Encrypt",
    decryptText: "Decrypt",
    shareText: "Generate Shareable Link",
    footerText: "Created by TTB3AR",
    messagePlaceholder: "Enter your message...",
    passwordPlaceholder: "Enter password",
    outputPlaceholder: "Output...",
    linkPlaceholder: "Shareable link will appear here...",
    alertMessagePassword: "Message and password required.",
    alertCiphertextPassword: "Ciphertext and password required.",
    alertDecryptionFailed: "Decryption failed. Check the password or ciphertext.",
    alertNothingToShare: "Nothing to share."
  },
  jp: {
    title: "AES暗号化ツール",
    subtitle: "安全なクライアントサイドテキスト暗号化・復号化",
    messageLabel: "メッセージ:",
    passwordLabel: "パスワード:",
    outputLabel: "出力:",
    encryptText: "暗号化",
    decryptText: "復号化",
    shareText: "共有リンク生成",
    footerText: "TTB3ARによって作成",
    messagePlaceholder: "メッセージを入力...",
    passwordPlaceholder: "パスワードを入力",
    outputPlaceholder: "出力...",
    linkPlaceholder: "共有リンクがここに表示されます...",
    alertMessagePassword: "メッセージとパスワードが必要です。",
    alertCiphertextPassword: "暗号文とパスワードが必要です。",
    alertDecryptionFailed: "復号化に失敗しました。パスワードまたは暗号文を確認してください。",
    alertNothingToShare: "共有するものがありません。"
  }
};

let isJapanese = false;

// Theme functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update theme toggle state
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.checked = newTheme === 'dark';
}

// Language functionality
function toggleLanguage() {
  const elements = document.querySelectorAll('#title, #subtitle, #message-label, #password-label, #output-label, #encrypt-text, #decrypt-text, #share-text, #footer-text, #message, #password, #output, #shareable-link');
  
  // Add fade-out class
  elements.forEach(el => el.classList.add('fade-out'));
  
  setTimeout(() => {
    isJapanese = !isJapanese;
    const lang = isJapanese ? 'jp' : 'en';
    
    document.documentElement.setAttribute('data-language', lang);
    updateUILanguage(lang);
    
    // Remove fade-out and add fade-in
    elements.forEach(el => {
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
    });
    
    // Show language indicator
    showLanguageIndicator();
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update language toggle state
    const langToggle = document.getElementById('language-toggle');
    langToggle.checked = isJapanese;
    
    // Remove fade-in class after animation
    setTimeout(() => {
      elements.forEach(el => el.classList.remove('fade-in'));
    }, 300);
  }, 150);
}

function updateUILanguage(lang) {
  const t = translations[lang];
  
  // Update text content
  document.getElementById('title').textContent = t.title;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('message-label').textContent = t.messageLabel;
  document.getElementById('password-label').textContent = t.passwordLabel;
  document.getElementById('output-label').textContent = t.outputLabel;
  document.getElementById('encrypt-text').textContent = t.encryptText;
  document.getElementById('decrypt-text').textContent = t.decryptText;
  document.getElementById('share-text').textContent = t.shareText;
  document.getElementById('footer-text').textContent = t.footerText;
  
  // Update placeholders
  document.getElementById('message').placeholder = t.messagePlaceholder;
  document.getElementById('password').placeholder = t.passwordPlaceholder;
  document.getElementById('output').placeholder = t.outputPlaceholder;
  document.getElementById('shareable-link').placeholder = t.linkPlaceholder;
  
  // Update page title
  document.title = t.title;
}

function showLanguageIndicator() {
  const indicator = document.getElementById('language-indicator');
  const currentLang = document.getElementById('current-lang');
  
  currentLang.textContent = isJapanese ? 'JP' : 'EN';
  indicator.classList.add('show');
  
  setTimeout(() => {
    indicator.classList.remove('show');
  }, 2000);
}

// Encryption/Decryption functions
function encryptMessage() {
  const message = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  
  if (!message || !password) {
    const lang = isJapanese ? 'jp' : 'en';
    return alert(translations[lang].alertMessagePassword);
  }
  
  try {
    const ciphertext = CryptoJS.AES.encrypt(message, password).toString();
    document.getElementById("output").value = ciphertext;
  } catch (error) {
    console.error('Encryption error:', error);
    alert('Encryption failed. Please try again.');
  }
}

function decryptMessage() {
  const ciphertext = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  
  if (!ciphertext || !password) {
    const lang = isJapanese ? 'jp' : 'en';
    return alert(translations[lang].alertCiphertextPassword);
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
      throw new Error('Empty decryption result');
    }
    
    document.getElementById("output").value = originalText;
  } catch (error) {
    console.error('Decryption error:', error);
    const lang = isJapanese ? 'jp' : 'en';
    alert(translations[lang].alertDecryptionFailed);
  }
}

function generateLink() {
  const ciphertext = document.getElementById("output").value;
  
  if (!ciphertext) {
    const lang = isJapanese ? 'jp' : 'en';
    return alert(translations[lang].alertNothingToShare);
  }
  
  try {
    const url = new URL(window.location.href);
    url.hash = encodeURIComponent(ciphertext);
    document.getElementById("shareable-link").value = url.toString();
    
    // Auto-select the link for easy copying
    document.getElementById("shareable-link").select();
    document.getElementById("shareable-link").setSelectionRange(0, 99999); // For mobile devices
  } catch (error) {
    console.error('Link generation error:', error);
    alert('Failed to generate link. Please try again.');
  }
}

// Initialize on page load
window.onload = function() {
  // Load saved preferences
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLanguage = localStorage.getItem('language') || 'en';
  
  // Set theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle').checked = savedTheme === 'dark';
  
  // Set language
  isJapanese = savedLanguage === 'jp';
  document.documentElement.setAttribute('data-language', savedLanguage);
  document.getElementById('language-toggle').checked = isJapanese;
  updateUILanguage(savedLanguage);
  
  // Auto-load from URL hash
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash) {
    document.getElementById("message").value = hash;
  }
  
  // Add click handler for shareable link (for easy selection)
  document.getElementById('shareable-link').addEventListener('click', function() {
    if (this.value) {
      this.select();
      this.setSelectionRange(0, 99999);
    }
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E for encrypt
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      encryptMessage();
    }
    // Ctrl/Cmd + D for decrypt
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      decryptMessage();
    }
    // Ctrl/Cmd + L for generate link
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      generateLink();
    }
  });
};
