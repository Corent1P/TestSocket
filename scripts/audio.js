// Fonction pour vérifier et demander l'autorisation audio
async function checkAndRequestAudioPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'sound' });

      if (permissionStatus.state === 'granted') {
        initiateAudio();
      } else {
        var userPermission = window.confirm("Autoriser l'accès à votre son?");
        if (userPermission) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          initiateAudio();
        } else {
          console.log("L'utilisateur a refusé l'accès au son.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification ou de la demande d'autorisation audio:", error);
    }
  }

  // Fonction pour démarrer l'audio après l'autorisation
  async function initiateAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      handlePermissionGranted(stream);
    } catch (error) {
      console.error("Erreur lors de l'accès au son:", error);
    }
  }

  // Fonction pour gérer l'autorisation accordée
  function handlePermissionGranted(stream) {
    var audioElement = document.getElementById("audio");
    audioElement.srcObject = stream;

    // Démuter l'élément audio
    audioElement.muted = false;

    // Démarrer la lecture de l'audio
    audioElement.play().then(() => {
      console.log("L'audio a commencé à être lu");
    }).catch((error) => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  }

  // Vérifier et demander l'autorisation audio lorsque la page se charge
  window.onload = function() {
    checkAndRequestAudioPermission();
  };
