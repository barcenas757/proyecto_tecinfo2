document.addEventListener('DOMContentLoaded', () => {
    const remindMeBtn = document.getElementById('remind-me-btn');
    const reminderMessage = document.getElementById('reminder-message');
    const sendQuestionBtn = document.getElementById('send-question-btn');
    const goLiveBtn = document.getElementById('go-live-btn');
    const liveCountdown = document.getElementById('live-countdown');
    const eventDateSpan = document.getElementById('event-date');
    const eventTimeSpan = document.getElementById('event-time');

    // --- Event Details ---
    // Set your event date and time here!
    // Format: Year, Month (0-11), Day, Hour, Minute, Second
    const eventDateTime = new Date(2025, 7, 15, 18, 0, 0); // Example: August 15, 2025, 6:00 PM
    const eventDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const eventTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    eventDateSpan.textContent = eventDateTime.toLocaleDateString('es-ES', eventDateOptions);
    eventTimeSpan.textContent = eventDateTime.toLocaleTimeString('es-ES', eventTimeOptions);


    // --- Reminder Button ---
    remindMeBtn.addEventListener('click', () => {
        // In a real application, this would trigger an email reminder, calendar invite, etc.
        reminderMessage.textContent = '¡Gracias! Te recordaremos el evento. Revisa tu correo o calendario.';
        remindMeBtn.disabled = true;
        remindMeBtn.style.backgroundColor = '#ccc';
        remindMeBtn.style.cursor = 'not-allowed';
    });

    // --- Send Question Button ---
    sendQuestionBtn.addEventListener('click', () => {
        alert('¡Gracias por tu pregunta! La consideraremos para nuestro Live.');
        // In a real application, this would open a form or send data to a backend.
    });

    // --- Live Status and Countdown ---
    function updateLiveStatus() {
        const now = new Date();
        const timeDiff = eventDateTime - now; // Difference in milliseconds

        if (timeDiff <= 0) {
            // Event is Live or has passed
            goLiveBtn.disabled = false;
            goLiveBtn.textContent = '¡IR AL LIVE AHORA!';
            goLiveBtn.classList.add('live-active');
            liveCountdown.textContent = '¡Estamos en vivo!';
            if (timeDiff < -3600000) { // If more than 1 hour past the event start, change message
                liveCountdown.textContent = 'El Live ha terminado. ¡Pronto estará disponible la grabación!';
                goLiveBtn.textContent = 'Ver Grabación';
                goLiveBtn.style.background = 'var(--secondary-blue)'; // Change color for past event
                goLiveBtn.style.boxShadow = '0 5px 25px rgba(100, 149, 237, 0.4)';
                goLiveBtn.style.animation = 'none'; // Stop pulse animation
            }
        } else {
            // Event is in the future
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            liveCountdown.textContent = `Faltan: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            goLiveBtn.disabled = true;
            goLiveBtn.textContent = 'Próximamente...';
            goLiveBtn.classList.remove('live-active');
        }
    }

    // Update status every second
    setInterval(updateLiveStatus, 1000);
    // Initial call to set status immediately on page load
    updateLiveStatus();

    // --- Go Live Button Action ---
    goLiveBtn.addEventListener('click', () => {
        // Replace with actual Instagram/YouTube Live links
        const now = new Date();
        const timeDiff = eventDateTime - now;

        if (timeDiff <= 0 && timeDiff > -3600000) { // If currently live (within 1 hour of start)
            const instagramLiveLink = 'https://www.instagram.com/your_instagram_handle/live'; // Replace with your Instagram Live URL
            const youtubeLiveLink = 'https://www.youtube.com/channel/your_youtube_channel_id/live'; // Replace with your YouTube Live URL

            // Open both in new tabs (or give user choice)
            window.open(instagramLiveLink, '_blank');
            window.open(youtubeLiveLink, '_blank');
        } else if (timeDiff < -3600000) { // If event has passed
            const recordingLink = 'https://www.youtube.com/playlist/your_event_recording_playlist'; // Replace with recording link
            window.open(recordingLink, '_blank');
        }
    });
});
