import { display } from 'display';
import { battery } from 'power';
import { HeartRateSensor } from 'heart-rate';
import { today } from 'user-activity';

// Main watchface class
class WatchFace {
	private timeElement: TextElement;
	private dateElement: TextElement;
	private stepsElement: TextElement;
	private heartRateElement: TextElement;
	private batteryElement: TextElement;
	private heartRateSensor: HeartRateSensor;

	constructor() {
		// Initialize UI elements
		this.timeElement = document.getElementById('time') as TextElement;
		this.dateElement = document.getElementById('date') as TextElement;
		this.stepsElement = document.getElementById('steps') as TextElement;
		this.heartRateElement = document.getElementById('heartrate') as TextElement;
		this.batteryElement = document.getElementById('battery') as TextElement;

		// Initialize heart rate sensor
		this.heartRateSensor = new HeartRateSensor();
		this.heartRateSensor.start();

		// Set up event listeners
		display.addEventListener('change', () => {
			if (display.on) {
				this.updateUI();
			}
		});

		// Update every minute
		setInterval(() => this.updateUI(), 60000);
	}

	private updateUI(): void {
		this.updateTime();
		this.updateDate();
		this.updateSteps();
		this.updateHeartRate();
		this.updateBattery();
	}

	private updateTime(): void {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		this.timeElement.text = `${hours}:${minutes.toString().padStart(2, '0')}`;
	}

	private updateDate(): void {
		const now = new Date();
		const options = { month: 'short', day: 'numeric' };
		this.dateElement.text = now.toLocaleDateString('en-US', options);
	}

	private updateSteps(): void {
		const steps = today.adjusted.steps;
		this.stepsElement.text = `${steps} steps`;
	}

	private updateHeartRate(): void {
		if (this.heartRateSensor.heartRate) {
			this.heartRateElement.text = `${this.heartRateSensor.heartRate} bpm`;
		}
	}

	private updateBattery(): void {
		const batteryLevel = Math.floor(battery.chargeLevel);
		this.batteryElement.text = `${batteryLevel}%`;
	}
}

// Initialize watchface
new WatchFace();
