const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('previewContainer');
const analyzeBtn = document.getElementById('analyzeBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('resultContainer');

// Show image preview when a file is selected
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
            analyzeBtn.classList.remove('hidden');
            resultContainer.classList.add('hidden'); // Hide old results
        }
        reader.readAsDataURL(file);
    }
});

// Handle the analyze button click
analyzeBtn.addEventListener('click', async () => {
    analyzeBtn.classList.add('hidden');
    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');

    // THIS IS WHERE YOU WILL CALL YOUR API LATER.
    // For now, we are simulating a 2-second delay to mimic AI processing.
    setTimeout(() => {
        // Simulated AI logic (Randomly decides if plastic is found for testing)
        const isPlastic = Math.random() > 0.3; // 70% chance to be plastic

        if (!isPlastic) {
            displayResult(false, null);
        } else {
            // Mock data structure matching your exact requirements
            const mockAIData = {
                type: "PET (Polyethylene Terephthalate)",
                toxicity: "Low",
                decomposition: "450 Years",
                recyclable: "Yes",
                impact: "Microplastic shedding, harmful to marine life if unmanaged.",
                disposal: "Rinse and place in the dry recycling bin.",
                dustbinColor: "Blue 🔵"
            };
            displayResult(true, mockAIData);
        }
        
        loading.classList.add('hidden');
        analyzeBtn.classList.remove('hidden');
    }, 2000);
});

// Function to print the results to the screen
function displayResult(isPlasticFound, data) {
    resultContainer.classList.remove('hidden');
    
    if (!isPlasticFound) {
        resultContainer.innerHTML = `
            <div class="result-card no-plastic">
                <h3>✅ No Plastic Found</h3>
                <p>The image analyzed does not appear to contain plastic waste.</p>
            </div>
        `;
        return;
    }

    resultContainer.innerHTML = `
        <div class="result-card">
            <h3>⚠️ Plastic Detected</h3>
            <p><strong>Plastic Type:</strong> ${data.type}</p>
            <p><strong>Toxicity Level:</strong> ${data.toxicity}</p>
            <p><strong>Decomposition Time:</strong> ${data.decomposition}</p>
            <p><strong>Recyclable:</strong> ${data.recyclable}</p>
            <p><strong>Environmental Impact:</strong> ${data.impact}</p>
            <p><strong>Disposal Method:</strong> ${data.disposal}</p>
            <p><strong>Dustbin Color:</strong> ${data.dustbinColor}</p>
        </div>
    `;
}
