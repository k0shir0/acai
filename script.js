document.addEventListener('DOMContentLoaded', () => {
    const initialPrompt = document.getElementById('initial-prompt');
    const mainContent = document.getElementById('main-content');
    const usernameInput = document.getElementById('username');
    const submitUsernameButton = document.getElementById('submit-username');
    const downloadButton = document.getElementById('download-button');
    const serversButton = document.getElementById('servers-button');
    const serversList = document.getElementById('servers-list');
    const vipButton = document.getElementById('vip-button');
    const vipModal = document.getElementById('vip-modal');
    const closeButton = document.querySelector('.close-button');
    const submitVipButton = document.getElementById('submit-vip');
    const vipUsernameInput = document.getElementById('vip-username');
    const vipPasswordInput = document.getElementById('vip-password');
    const vipContent = document.getElementById('vip-content');
    const vipMessage = document.getElementById('vip-message');

    submitUsernameButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetch('/api/submit-data', { // Assuming your Vercel function is at this path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent to backend:', data);
                initialPrompt.classList.add('hidden');
                mainContent.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error sending data:', error);
                alert('Failed to submit username. Please try again.');
            });
        } else {
            alert('Please enter a username.');
        }
    });

    downloadButton.addEventListener('click', () => {
        window.location.href = '/path/to/your/D3xonUtilityMod.jar'; // Replace with the actual path to your .jar file
    });

    serversButton.addEventListener('click', () => {
        serversList.classList.toggle('hidden');
    });

    vipButton.addEventListener('click', () => {
        vipModal.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        vipModal.classList.add('hidden');
        vipMessage.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === vipModal) {
            vipModal.classList.add('hidden');
            vipMessage.classList.add('hidden');
        }
    });

    submitVipButton.addEventListener('click', () => {
        const vipUsername = vipUsernameInput.value;
        const vipPassword = vipPasswordInput.value;

        fetch('/api/vip-auth', { // Assuming your VIP authentication function is at this path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: vipUsername, password: vipPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                vipModal.classList.add('hidden');
                vipContent.classList.remove('hidden');
            } else {
                vipMessage.textContent = 'Invalid username or password.';
                vipMessage.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error during VIP authentication:', error);
            vipMessage.textContent = 'Authentication failed. Please try again.';
            vipMessage.classList.remove('hidden');
        });
   
    });
});
