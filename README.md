# Encryption-Decription tool
A website to demonstrate how text can be AES encrypted on the client side using CryptoJS  
https://ttb3ar.github.io/educrypt/  
  
**Features include:**  
Light/Dark theme toggling  
Japanese and English languge support with transition effects and indicator  
Saving of last used theme/languge  
Hide/Show password in text feild for security against shoulder surfing  
Encryption/decryption of text
Generation of a sharable link for encrypted message  
Responsive UI with buttons that react to mouse hovers  


**Tech Stack:**
html,css,js 


**Encryption Method**
A. Key Derivation:
The password string is used to derive a cryptographic key.
Internally, CryptoJS uses PBKDF2 (Password-Based Key Derivation Function 2) to turn a password into a secure encryption key.
It automatically generates a random salt and initialization vector (IV) for each encryption.

In this way, each encrypted message is unique even if the plaintext and password are the same.

B. AES Encryption:
AES operates on blocks of 128 bits (16 bytes).
The derived key and IV are used to encrypt the message securely resulting in a binary ciphertext.

C. Encoding:
The binary output is Base64-encoded to produce a readable string you can copy or share.
