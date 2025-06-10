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
    hidePassword: "Hide password",
    fileLabel: "...or file:",
    fileName: "File: ",
    fileSize: "Size: ",
    downloadEncrypted: "Download Encrypted File",
    downloadDecrypted: "Download Decrypted File",
    fileTooLarge: "File is too large. Please select a file smaller than 10MB.",
    fileEncrypted: "File encrypted successfully!",
    fileDecrypted: "File decrypted successfully!",
    noFileSelected: "No file selected."
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
    hidePassword: "パスワードを隠す",
    fileLabel: "...またはファイル:",
    fileName: "ファイル: ",
    fileSize: "サイズ: ",
    downloadEncrypted: "暗号化ファイルをダウンロード",
    downloadDecrypted: "復号化ファイルをダウンロード",
    fileTooLarge: "ファイルが大きすぎます。10MB未満のファイルを選択してください。",
    fileEncrypted: "ファイルの暗号化が完了しました！",
    fileDecrypted: "ファイルの復号化が完了しました！",
    noFileSelected: "ファイルが選択されていません。"
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
  document.getElementById('file-label').textContent = texts.fileLabel;
  
  // Update placeholders
  document.getElementById('message').placeholder = texts.messagePlaceholder;
  document.getElementById('password').placeholder = texts.passwordPlaceholder;
  document.getElementById('shareable-link').placeholder = texts.linkPlaceholder;
  
  document.title = texts.title;
  updatePasswordToggleLabel();
  updateDownloadButtonText();
  updateFileInfoDisplay();
}

function updateDownloadButtonText() {
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn && downloadBtn.style.display !== 'none') {
    const texts = translations[isJapanese ? 'jp' : 'en'];
    const isEncrypted = downloadBtn.innerHTML.includes('fa-lock') || downloadBtn.innerHTML.includes('Encrypted') || downloadBtn.innerHTML.includes('暗号化');
    downloadBtn.innerHTML = `<i class="fas fa-download"></i> <span>${isEncrypted ? texts.downloadEncrypted : texts.downloadDecrypted}</span>`;
  }
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

let selectedFile = null;
let encryptedFileData = null;

function handleFileSelect(event) {
  const file = event.target.files[0];
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  const texts = translations[isJapanese ? 'jp' : 'en'];
  
  if (file) {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert(texts.fileTooLarge);
      event.target.value = '';
      return;
    }
    
    selectedFile = file;
    fileName.textContent = texts.fileName + file.name;
    fileSize.textContent = texts.fileSize + formatFileSize(file.size);
    fileInfo.style.display = 'block';
  } else {
    selectedFile = null;
    fileInfo.style.display = 'none';
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function createDownloadButton(data, filename, isEncrypted) {
  const texts = translations[isJapanese ? 'jp' : 'en'];
  let downloadBtn = document.getElementById('download-btn');
  
  if (!downloadBtn) {
    downloadBtn = document.createElement('button');
    downloadBtn.id = 'download-btn';
    downloadBtn.className = 'download-button';
    document.querySelector('.form-class').appendChild(downloadBtn);
  }
  
  downloadBtn.innerHTML = `<i class="fas fa-download"></i> <span>${isEncrypted ? texts.downloadEncrypted : texts.downloadDecrypted}</span>`;
  downloadBtn.style.display = 'block';
  downloadBtn.onclick = () => downloadFile(data, filename);
}

function downloadFile(data, filename) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Encryption/Decryption functions
function encryptMessage() {
  const message = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  const output = document.getElementById("output");
  const texts = translations[isJapanese ? 'jp' : 'en'];
  
  if (!password) {
    alert(texts.alertMessagePassword);
    return;
  }
  
  // Hide download button
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) downloadBtn.style.display = 'none';
  
  try {
    if (selectedFile) {
      // Encrypt file
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileData = e.target.result;
        const wordArray = CryptoJS.lib.WordArray.create(fileData);
        const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
        
        encryptedFileData = encrypted;
        output.innerHTML = `${texts.fileEncrypted}<br>${texts.fileName}${selectedFile.name}<br>${texts.fileSize}${formatFileSize(selectedFile.size)}`;
        output.setAttribute('data-file-info', JSON.stringify({
          encrypted: true,
          fileName: selectedFile.name,
          fileSize: formatFileSize(selectedFile.size)
        }));
        output.style.opacity = "1";
        
        // Create download button for encrypted file
        const encryptedFilename = selectedFile.name + '.encrypted';
        createDownloadButton(encrypted, encryptedFilename, true);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else if (message) {
      // Encrypt text message
      const ciphertext = CryptoJS.AES.encrypt(message, password).toString();
      output.textContent = ciphertext;
      output.style.opacity = "1";
      encryptedFileData = null;
    } else {
      alert(texts.alertMessagePassword);
    }
  } catch (error) {
    console.error('Encryption error:', error);
    alert('Encryption failed. Please try again.');
  }
}

function decryptMessage() {
  const messageOrCiphertext = document.getElementById("message").value;
  const password = document.getElementById("password").value;
  const output = document.getElementById("output");
  const texts = translations[isJapanese ? 'jp' : 'en'];
  
  if (!password) {
    alert(texts.alertCiphertextPassword);
    return;
  }
  
  // Hide download button
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) downloadBtn.style.display = 'none';
  
  try {
    if (selectedFile) {
      // Decrypt file
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const encryptedData = new TextDecoder().decode(e.target.result);
          const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
          const decryptedWordArray = decrypted.toString(CryptoJS.enc.Base64);
          
          if (!decryptedWordArray) {
            throw new Error('Decryption failed');
          }
          
          const decryptedBytes = CryptoJS.enc.Base64.parse(decryptedWordArray);
          const decryptedArrayBuffer = new ArrayBuffer(decryptedBytes.words.length * 4);
          const decryptedUint8Array = new Uint8Array(decryptedArrayBuffer);
          
          for (let i = 0; i < decryptedBytes.words.length; i++) {
            const word = decryptedBytes.words[i];
            decryptedUint8Array[i * 4] = (word >> 24) & 0xff;
            decryptedUint8Array[i * 4 + 1] = (word >> 16) & 0xff;
            decryptedUint8Array[i * 4 + 2] = (word >> 8) & 0xff;
            decryptedUint8Array[i * 4 + 3] = word & 0xff;
          }
          
          const decryptedFileName = selectedFile.name.replace('.encrypted', '');
          output.innerHTML = `${texts.fileDecrypted}<br>${texts.fileName}${decryptedFileName}<br>${texts.fileSize}${formatFileSize(decryptedUint8Array.length)}`;
          output.setAttribute('data-file-info', JSON.stringify({
            encrypted: false,
            fileName: decryptedFileName,
            fileSize: formatFileSize(decryptedUint8Array.length)
          }));
          output.style.opacity = "1";
          
          // Create download button for decrypted file
          const decryptedFilename = selectedFile.name.replace('.encrypted', '');
          createDownloadButton(decryptedUint8Array, decryptedFilename, false);
        } catch (error) {
          console.error('File decryption error:', error);
          alert(texts.alertDecryptionFailed);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else if (messageOrCiphertext) {
      // Decrypt text message
      const bytes = CryptoJS.AES.decrypt(messageOrCiphertext, password);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!originalText) {
        throw new Error('Empty decryption result');
      }
      
      output.textContent = originalText;
      output.style.opacity = "1";
    } else {
      alert(texts.alertCiphertextPassword);
    }
  } catch (error) {
    console.error('Decryption error:', error);
    alert(texts.alertDecryptionFailed);
  }
}

function updateFileInfoDisplay() {
  const output = document.getElementById('output');
  const fileInfoData = output.getAttribute('data-file-info');
  
  if (fileInfoData) {
    const fileInfo = JSON.parse(fileInfoData);
    const texts = translations[isJapanese ? 'jp' : 'en'];
    
    if (fileInfo.encrypted) {
      output.innerHTML = `${texts.fileEncrypted}<br>${texts.fileName}${fileInfo.fileName}<br>${texts.fileSize}${fileInfo.fileSize}`;
    } else {
      output.innerHTML = `${texts.fileDecrypted}<br>${texts.fileName}${fileInfo.fileName}<br>${texts.fileSize}${fileInfo.fileSize}`;
    }
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

  // Add file input event listener
  document.getElementById('file-input').addEventListener('change', handleFileSelect);
  
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
