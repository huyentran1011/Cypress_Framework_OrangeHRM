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

    getIndexOfObjectInArray(array: Array<any>, key: string, value: any): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i; // Return the index if the key-value pair matches
            }
        }
        return -1; // Return -1 if no matching object is found
    }

    lowerCaseExceptFirst(str: string) {
        if (typeof str !== "string") {
            throw new TypeError("Input must be a string");
        }

        return str
            .split(/\s+/) // Split by spaces (handles multiple spaces)
            .map(word => {
                if (word.length === 0) return ""; // Handle empty words
                return word[0] + word.slice(1).toLowerCase();
            }).join(" ");
    }

    normalizeString = (s: string) => {
        if (s === undefined || s === null) {
            s = '';
        }
        return s
            .replace(/\u00A0/g, ' ')        // NBSP → space
            .replace(/\s+/g, ' ')           // collapse whitespace
            .trim()
            .toString();
    }


    normalizeStringType = (s?: string) => {
        if (s === undefined || s === null || s.trim() === '') {
            return null;
        }
        return s;
    }
}

export const utils = new Ultilities();