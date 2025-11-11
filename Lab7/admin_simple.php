<!DOCTYPE html>
<html>
<head>
    <title>Course Archive Admin</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        button { padding: 10px 15px; margin: 5px; font-size: 16px; }
        #result { 
            margin-top: 20px; 
            padding: 15px; 
            border: 1px solid #ccc; 
            background: #f9f9f9;
            white-space: pre-wrap;
        }
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>
    <h1>Course Archive Management</h1>
    
    <button onclick="archiveContent()">Archive Course Content</button>
    <button onclick="deleteArchive()">Delete Archive Tables</button>
    <button onclick="checkStatus()">Check Archive Status</button>
    
    <div id="result"></div>

    <script>
        async function performAction(action) {
            console.log('Performing action:', action);
            
            const formData = new FormData();
            formData.append('action', action);
            
            try {
                const response = await fetch('backend.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                console.log('Response:', result);
                
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `<strong>Action:</strong> ${action}<br>
                                      <strong>Result:</strong> <span class="${result.error ? 'error' : 'success'}">${JSON.stringify(result, null, 2)}</span>`;
                
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('result').innerHTML = `<span class="error">Network error: ${error.message}</span>`;
            }
        }

        function archiveContent() { 
            if (confirm('Archive all course content?')) {
                performAction('archive'); 
            }
        }
        function deleteArchive() { 
            if (confirm('DELETE all archive tables? This cannot be undone!')) {
                performAction('delete'); 
            }
        }
        function checkStatus() { performAction('check'); }
    </script>
</body>
</html>