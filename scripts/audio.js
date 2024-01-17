async function checkAndRequestAudioPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'audio' });

      if (permissionStatus.state === 'granted') {
        initiateAudio();
      } else {
        var userPermission = window.confirm("Allow access to your audio?");
        if (userPermission) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          initiateAudio();
        } else {
          console.log("User denied audio access.");
        }
      }
    } catch (error) {
      console.error('Error checking or requesting audio permission:', error);
    }
  }

  async function initiateAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      handlePermissionGranted(stream);
    } catch (error) {
      console.error('Error accessing audio:', error);
    }
  }

  function handlePermissionGranted(stream) {
    var audioElement = document.getElementById("audio");
    audioElement.srcObject = stream;

    audioElement.muted = false;

    audioElement.play().then(() => {
      console.log('Audio started playing');
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  }

  window.onload = function() {
    checkAndRequestAudioPermission();
  };