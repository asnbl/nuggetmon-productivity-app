export class Nuggetmon {
    name;
    angerLevel;
    angerThreshold;
    photo;

    constructor(name, photoPath) {
        this.name = name;
        this.angerLevel = 0;
        this.angerThreshold = 20;
        this.photo = photoPath;
    }

    getAngerPercentage() {
        return this.angerLevel / this.angerThreshold;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }

    increaseAnger() {
        this.angerLevel++;
    }
}