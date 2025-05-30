const themeToggle = document.getElementById("checkbox");
const langToggle = document.getElementById("language-checkbox");
const langLabel = document.querySelector(".lang-label");
const title = document.getElementById("title");
const togglePasswordBtn = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");

let isJapanese = false;

// Language translations object
const translations = {
  en: {
    title: "AES Encryption Tool",
    subtitle: "Secure client-side text encryption and decryption",
    messageLabel: "Message:",
    passwordLabel: "Password:",
    shareLabel: "Share Encrypted Message:",
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
    alertNothingToShare: "Nothing to share.",
    showPassword: "Show password",
    hidePassword: "Hide password"
  },
  jp: {
    title: "AES暗号化ツール",
    subtitle: "安全なクライアントサイドテキスト暗号化・復号化",
    messageLabel: "メッセージ:",
    passwordLabel: "パスワード:",
    shareLabel: "暗号化メッセージを共有:",
    encryptText: "暗号化",
    decryptText: "復号化",
    shareText: "共有リンク生成",
    footerText: "TTB3AR制作",
    messagePlaceholder: "メッセージを入力...",
    passwordPlaceholder: "パスワードを入力",
    outputPlaceholder: "出力...",
    linkPlaceholder: "共有リンクがここに表示されます...",
    alertMessagePassword: "メッセージとパスワードが必要です。",
    alertCiphertextPassword: "暗号文とパスワードが必要です。",
    alertDecryptionFailed: "復号化に失敗しました。パスワードまたは暗号文を確認してください。",
    alertNothingToShare: "共有するものがありません。",
    showPassword: "パスワードを表示",
    hidePassword: "パスワードを隠す"
  }
};

// Local Storage Functions
function saveTheme(theme) {
  try {
    localStorage.setItem('aesEncryption_theme', theme);
  } catch (error) {
    console.warn('Could not save theme preference:', error);
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('aesEncryption_theme') || 'light';
  } catch (error) {
    console.warn('Could not load theme preference:', error);
    return 'light';
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem('aesEncryption_language', language);
  } catch (error) {
    console.warn('Could not save language preference:', error);
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem('aesEncryption_language') || 'en';
  } catch (error) {
    console.warn('Could not load language preference:', error);
    return 'en';
  }
}

// Theme handling
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

function initializeTheme() {
  const savedTheme = loadTheme();
  setTheme(savedTheme);
  
  // Update the toggle switch to match the saved theme
  themeToggle.checked = (savedTheme === 'dark');
}

// Language handling
function setLanguage(language) {
  document.documentElement.setAttribute('data-language', language);
  isJapanese = (language === 'jp');
  updateUILanguage(language);
  saveLanguage(language);
}

function toggleLanguage() {
  const contentElements = document.querySelectorAll('#title, #subtitle, #message-label, #password-label, #share-label, #encrypt-text, #decrypt-text, #share-text, #footer-text');
  
  contentElements.forEach(element => {
    element.classList.add('transition-content');
  });
  
  document.body.offsetHeight;
  
  contentElements.forEach(element => {
    element.classList.add('fade-out');
  });
  
  setTimeout(() => {
    const newLanguage = isJapanese ? 'en' : 'jp';
    setLanguage(newLanguage);
    
    langLabel.textContent = isJapanese ? "JP" : "EN";
    
    showLanguageIndicator(newLanguage);
    updatePasswordToggleLabel();
    
    setTimeout(() => {
      contentElements.forEach(element => {
        element.classList.remove('fade-out');
      });
      
      setTimeout(() => {
        contentElements.forEach(element => {
          element.classList.remove('transition-content');
        });
      }, 300);
    }, 50);
  }, 300);
}

function initializeLanguage() {
  const savedLanguage = loadLanguage();
  isJapanese = (savedLanguage === 'jp');
  
  // Update the toggle switch to match the saved language
  langToggle.checked = isJapanese;
  langLabel.textContent = isJapanese ? "JP" : "EN";
  
  setLanguage(savedLanguage);
}

function updateUILanguage(language) {
  const texts = translations[language];
  
  document.getElementById('title').textContent = texts.title;
  document.getElementById('subtitle').textContent = texts.subtitle;
  document.getElementById('message-label').textContent = texts.messageLabel;
  document.getElementById('password-label').textContent = texts.passwordLabel;
  document.getElementById('share-label').textContent = texts.shareLabel;
  document.getElementById('encrypt-text').textContent = texts.encryptText;
  document.getElementById('decrypt-text').textContent = texts.decryptText;
  document.getElementById('share-text').textContent = texts.shareText;
  document.getElementById('footer-text').textContent = texts.footerText;
  
  // Update placeholders
  document.getElementById('message').placeholder = texts.messagePlaceholder;
  document.getElementById('password').placeholder = texts.passwordPlaceholder;
  document.getElementById('shareable-link').placeholder = texts.linkPlaceholder;
  
  document.title = texts.title;
  updatePasswordToggleLabel();
}

function showLanguageIndicator(language) {
  let indicator = document.querySelector('.language-indicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'language-indicator';
    document.body.appendChild(indicator);
  }
  
  indicator.textContent = language === 'en' ? 'English' : '日本語';
  indicator.classList.add('show');
  
  setTimeout(() => {
    indicator.classList.remove('show');
  }, 1500);
}

// Password visibility toggle
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const isPassword = passwordInput.type === 'password';
  const texts = translations[isJapanese ? 'jp' : 'en'];
  
  if (isPassword) {
    passwordInput.type = 'text';
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
    togglePasswordBtn.setAttribute('aria-label', texts.hidePassword);
  } else {
    passwordInput.type = 'password';
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
    togglePasswordBtn.setAttribute('aria-label', texts.showPassword);
  }
}

function updatePasswordToggleLabel() {
  const texts = translations[isJapanese ? 'jp' : 'en'];
  const passwordInput = document.getElementById("password");
  const isPasswordVisible = passwordInput.type === 'text';
  togglePasswordBtn.setAttribute('aria-label', isPasswordVisible ? texts.hidePassword : texts.showPassword);
}

// Encryption/Decryption functions
function encryptMessage() {
  const message = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  const output = document.getElementById("output");
  
  if (!message || !password) {
    const lang = isJapanese ? 'jp' : 'en';
    alert(translations[lang].alertMessagePassword);
    return;
  }
  
  try {
    const ciphertext = CryptoJS.AES.encrypt(message, password).toString();
    output.textContent = ciphertext;
    output.style.opacity = "1";
  } catch (error) {
    console.error('Encryption error:', error);
    alert('Encryption failed. Please try again.');
  }
}

function decryptMessage() {
  const ciphertext = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  const output = document.getElementById("output");
  
  if (!ciphertext || !password) {
    const lang = isJapanese ? 'jp' : 'en';
    alert(translations[lang].alertCiphertextPassword);
    return;
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
      throw new Error('Empty decryption result');
    }
    
    output.textContent = originalText;
    output.style.opacity = "1";
  } catch (error) {
    console.error('Decryption error:', error);
    const lang = isJapanese ? 'jp' : 'en';
    alert(translations[lang].alertDecryptionFailed);
  }
}

function generateLink() {
  const ciphertext = document.getElementById("output").textContent;
  
  if (!ciphertext || ciphertext === "Output...") {
    const lang = isJapanese ? 'jp' : 'en';
    alert(translations[lang].alertNothingToShare);
    return;
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

/**
 * Initialize the application
 */
function init() {
  // Initialize saved preferences first
  initializeTheme();
  initializeLanguage();
  
  // Then set up event listeners
  themeToggle.addEventListener("change", toggleTheme);
  langToggle.addEventListener("change", toggleLanguage);
  togglePasswordBtn.addEventListener("click", togglePasswordVisibility);
  
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
  
  // Add keyboard event listeners for Enter key
  document.getElementById('message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      encryptMessage();
    }
  });
  
  document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      encryptMessage();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
