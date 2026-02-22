/**
 * GlucoSense AI - Core Engine logic
 * Simulates the LSTM (Long Short-Term Memory) prediction process
 */

const GlucoSenseAI = {
    // Current state management
    state: {
        currentValue: 118,
        history: [110, 112, 115, 118],
        trend: "Stable"
    },

    // Simulation of the Algorithm Selection logic
    predictNextValue: function() {
        // Feature Engineering: Calculate rate of change
        const lastTwo = this.state.history.slice(-2);
        const rateOfChange = lastTwo[1] - lastTwo[0];
        
        // Simulating LSTM weight-based prediction
        const predictedChange = (rateOfChange * 0.8) + (Math.random() * 4 - 2);
        this.state.currentValue = Math.round(this.state.currentValue + predictedChange);
        
        // Update history (limited to last 10 for performance)
        this.state.history.push(this.state.currentValue);
        if (this.state.history.length > 10) this.state.history.shift();

        this.updateUI();
    },

    // Result Visualization updates
    updateUI: function() {
        const valueEl = document.getElementById('glucose-value');
        const trendEl = document.getElementById('trend-status');

        if (!valueEl || !trendEl) return;

        // Animate value change
        valueEl.innerText = this.state.currentValue;

        // Logic for Dynamic Status Badges
        if (this.state.currentValue > 130) {
            this.state.trend = "Rising";
            trendEl.style.color = "#FFB800"; // Amber for Warning
        } else if (this.state.currentValue < 90) {
            this.state.trend = "Falling";
            trendEl.style.color = "#FF6B6B"; // Red for Alert
        } else {
            this.state.trend = "Stable";
            trendEl.style.color = "#00FFD1"; // Cyan for Normal
        }
        
        trendEl.innerText = `AI Prediction: ${this.state.trend}`;
    },

    init: function() {
        console.log("GlucoSense AI Engine Initialized...");
        // Run prediction every 5 seconds to simulate real-time processing
        setInterval(() => this.predictNextValue(), 5000);
    }
};

window.onload = () => GlucoSenseAI.init();
