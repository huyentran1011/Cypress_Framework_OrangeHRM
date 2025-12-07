export class Ultilities {
    compareArrays(array1: Array<string>, array2: Array<string>) {
        if (array1.length !== array2.length) {
            return false; // Arrays of different lengths cannot be equal
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false; // Elements at the same index are different
            }
        }
        return true; // All elements match
    }
}

export const ultils = new Ultilities();