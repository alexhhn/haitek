import { Player } from './PlayerController';

enum GameMode {
	CHASE_TRANSFORM = 'chase_transform',
	PUZZLE_PANIC = 'puzzle_panic',
	ART_ATTACK = 'art_attack',
}

class GameManager {
	private players: Player[] = [];
	private currentMode: GameMode;
	private roomDimensions: { width: number; height: number };
	private isGameActive: boolean = false;

	constructor() {
		this.currentMode = GameMode.CHASE_TRANSFORM;
		this.roomDimensions = { width: 0, height: 0 };
	}

	public initializeGame(playerCount: number): void {
		this.scanRoom();
		this.createPlayers(playerCount);
		this.isGameActive = true;
	}

	private scanRoom(): void {
		// Simulated room scanning using Switch 2's sensors
		console.log('Scanning room dimensions and obstacles...');
		this.roomDimensions = {
			width: 1000, // Example dimensions in cm
			height: 800,
		};
	}

	private createPlayers(count: number): void {
		for (let i = 0; i < count; i++) {
			const spawnPoint = this.getRandomSpawnPoint();
			const player = new Player(i, spawnPoint);
			this.players.push(player);
		}
	}

	private getRandomSpawnPoint(): { x: number; y: number } {
		return {
			x: Math.random() * this.roomDimensions.width,
			y: Math.random() * this.roomDimensions.height,
		};
	}

	public updateGameState(): void {
		if (!this.isGameActive) return;

		this.players.forEach((player) => {
			player.update();
			this.checkCollisions(player);
		});
	}

	private checkCollisions(player: Player): void {
		this.players.forEach((otherPlayer) => {
			if (
				player.id !== otherPlayer.id &&
				this.detectCollision(player, otherPlayer)
			) {
				this.handlePlayerCollision(player, otherPlayer);
			}
		});
	}

	private detectCollision(p1: Player, p2: Player): boolean {
		// Simple collision detection
		const distance = Math.sqrt(
			Math.pow(p1.position.x - p2.position.x, 2) +
				Math.pow(p1.position.y - p2.position.y, 2)
		);
		return distance < 50; // Collision threshold
	}

	private handlePlayerCollision(p1: Player, p2: Player): void {
		if (this.currentMode === GameMode.CHASE_TRANSFORM) {
			p1.transform();
			p2.transform();
		}
	}
}

export default GameManager;
