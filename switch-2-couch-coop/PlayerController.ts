type Position = {
	x: number;
	y: number;
};

type CreatureType = 'RABBIT' | 'FOX' | 'TURTLE' | 'BIRD';

export class Player {
	public id: number;
	public position: Position;
	private velocity: Position;
	private currentCreature: CreatureType;
	private score: number;
	private isTransformed: boolean;

	constructor(id: number, spawnPoint: Position) {
		this.id = id;
		this.position = spawnPoint;
		this.velocity = { x: 0, y: 0 };
		this.currentCreature = 'RABBIT';
		this.score = 0;
		this.isTransformed = false;
	}

	public update(): void {
		this.updatePosition();
		this.checkBoundaries();
		this.updateAbilities();
	}

	private updatePosition(): void {
		// Update position based on controller input
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	public setVelocity(x: number, y: number): void {
		// Called by controller input
		this.velocity = {
			x: Math.max(-10, Math.min(10, x)), // Max speed limit
			y: Math.max(-10, Math.min(10, y)),
		};
	}

	private checkBoundaries(): void {
		// Keep player within room boundaries
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.y < 0) this.position.y = 0;
		// Add room size boundaries here
	}

	public transform(): void {
		const creatures: CreatureType[] = ['RABBIT', 'FOX', 'TURTLE', 'BIRD'];
		const currentIndex = creatures.indexOf(this.currentCreature);
		const nextIndex = (currentIndex + 1) % creatures.length;
		this.currentCreature = creatures[nextIndex];
		this.updateAbilities();
	}

	private updateAbilities(): void {
		// Update player abilities based on current creature
		switch (this.currentCreature) {
			case 'RABBIT':
				this.velocity = { x: this.velocity.x * 1.5, y: this.velocity.y * 1.5 };
				break;
			case 'TURTLE':
				this.velocity = { x: this.velocity.x * 0.5, y: this.velocity.y * 0.5 };
				break;
			// Add other creature abilities
		}
	}

	public addScore(points: number): void {
		this.score += points;
	}

	public getScore(): number {
		return this.score;
	}
}
