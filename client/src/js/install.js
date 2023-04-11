// Used https://web.dev/codelab-make-installable/ to help with comments

// Get the install button element
const butInstall = document.getElementById("buttonInstall");

// ** Logic for installing the PWA **

// For before the app is installed
window.addEventListener("beforeinstallprompt", (event) => {
  // Stores the triggered event
  window.deferredPrompt = event;
  // Makes the install button visable
  butInstall.classList.toggle("hidden", false);
});

// When the install button is clicked
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  // If the defferredPrompt is not 
  if (!promptEvent) {
    return;
  }
  // Call prompt on the saved event
  promptEvent.prompt();
  // Reset the deferred prompt variable, since prompt can only be called once
  window.deferredPrompt = null;
  // Hides the install button 
  butInstall.classList.toggle("hidden", true);
});

// When the app is installed
window.addEventListener("appinstalled", (event) => {
  // Clears the deferred prompt
  window.deferredPrompt = null;
});
