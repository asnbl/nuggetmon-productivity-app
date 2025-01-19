class Nuggets {
    constructor() {
        this.value = 0;
    }
    add(amount) {
        this.value += amount;
    }
    subtract(amount) {
        if (this.value >= amount) {
            this.value -= amount;
            return true;
        }
        return false;
    }
    getValue() {
        return this.value;
    }
}