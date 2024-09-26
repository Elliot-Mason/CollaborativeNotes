var moon = document.getElementById("myMoon");

moon.addEventListener("change", function() {
  document.body.classList.toggle("dark-theme");

  var moon1 = document.getElementById("moon1");
  if (document.body.classList.contains("dark-theme")) {
    moon1.src = "images/moon2.png";
  } else {
    moon1.src = "images/moon1.png";
  }
  }
)

const ws = new WebSocket('ws://localhost:8080');

            const editor = document.getElementById('codeEditor');

            // Send changes to the server
            editor.addEventListener('input', (event) => {
                const content = editor.value;
                ws.send(content);
            });

            // Receive updates from the server
            ws.onmessage = (message) => {
                // editor.value = message.data;
                if (message.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        editor.value = reader.result;
                    };
                    reader.readAsText(message.data); // Convert Blob to text
                } else {
                    // If it's not a Blob, we assume it's a plain string
                    editor.value = message.data;
                }

            };

            ws.onopen = (cock) => {
                console.log("Connected to WebSocket server");     
            };

            ws.onclose = () => {
                console.log("Disconnected from WebSocket server");
            };