export class Nuggetmon {
    name;
    nickname;
    id;
    angerLevel;
    angerThreshold;
    photo;
    constructor(name, nickname, id, angerLevel, angerThreshold, photo) {
        this.name = name;
        this.nickname = nickname;
        this.id = id;
        this.angerLevel = angerLevel;
        this.angerThreshold = angerThreshold;
        this.photo = photo;
    }
    setNickname(nickname) {
        this.nickname = nickname;
    }
    increaseAnger() {
        return ++this.angerLevel;
    }
}