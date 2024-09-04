const UNIT = 15;
const GLOBAL_KERNING = 15;
const BOX_FULL_HEIGHT = 19 * UNIT;

type BaseConsonant = "ʔ" | "g" | "z" | "p" | "k" | "w" | "d" | "c" | "h" | "m" | "s" | "n" | "t" | "x" | "l" | "j" | "r" | "b";

const BASE_CONSONANT: {
    [key in BaseConsonant]: {
        paths: string[],
        lower_anchor: [number, number],
        upper_anchor: [number, number],
        dot?: [number, number]
    }
} = {
    "p": {
        paths: [
            "m75 158.06s-33.79-1.0281-47.036-12.965c-4.455-4.0148-5.9136-11.919-5.9136-11.919",
            "m75 158.06s33.79 1.0281 47.036 12.965c4.455 4.0147 5.9136 11.919 5.9136 11.919",
            "m75 86.293-3e-4 143.5",
        ],
        lower_anchor: [75, 230.18],
        dot: [30, 206.08],
        upper_anchor: [95, 86.366]
    },
    "b": {
        paths: [
            "m97.5 125.12c0-11.333-0.1841-25.586 0-38.823",
            "m157.5 166.51a49.759 63.111 59.666 0 1-59.988 63.3 49.759 63.111 59.666 0 1-59.988-41.398 49.759 63.111 59.666 0 1 59.988-63.3 49.759 63.111 59.666 0 1 59.988 41.398z"
        ],
        dot: [45.97, 122.08],
        lower_anchor: [83, 230.18],
        upper_anchor: [117.5, 86.366]
    },
    "m": {
        paths: [
            "m52.5 86.214c-22.5 20.323-30 41.386-29.997 54.822-0.37348 7.3367 4.1622 15.45 10.142 17.077 8.114 1.9618 21.081-4.1317 29.195-6.0934 24.567-9.819 65.659-26.864 65.659 15.406 0 27.926-52.5 44.554-52.5 44.554",
            "m75 86.214v143.78"
        ],
        lower_anchor: [75, 230.18],
        upper_anchor: [95, 86.366]
    },
    "c": {
        paths: [
            "m62.4 86.247-30.407 0",
            "m62.4 157.84a41.753 35.796 0 0 0 36.159-17.898 41.753 35.796 0 0 0 0-35.796 41.753 35.796 0 0 0-36.159-17.898",
            "m62.4 157.48a41.753 36.157 0 0 1 41.594 33.006 41.753 36.157 0 0 1-34.344 38.759 41.753 36.157 0 0 1-47.581-26.25"
        ],
        dot: [14.9, 160.63],
        lower_anchor: [65.65, 230.18],
        upper_anchor: [65.65, 86.366]
    },
    "s": {
        paths: [
            "m97.5 86.293 0 92.756v51.024",
            "m 97.5,125.11c -22.94,-0.09 -9.03,0 -34.98,0 -53.665973,0 -45.516021,52.36862 -25.338274,89.27925"
        ],
        lower_anchor: [97.5, 230.18],
        upper_anchor: [97.5, 86.366]
    },
    "x": {
        paths: [
            "m53.619 86.293 1e-4 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141",
            "m119.76 142.58h-66.231",
            "m119.76 86.293v92.756l0 50.744",
        ],
        lower_anchor: [119.76, 230.18],
        upper_anchor: [119.76, 86.366]
    },
    "z": {
        paths: [
            "m118.2 142.58h-66.231",
            "m118.2 86.293v92.756l0.14 50.744",
            "m52.1 86.293 1e-4 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141-0.6721-9.864-0.8694-21.419 31.201-21.419"
        ],
        lower_anchor: [118.2, 230.18],
        upper_anchor: [118.2, 86.366]
    },
    "t": {
        paths: [
            "m43.28 86.293v61.506",
            "m43.28 146.24a37.464 31.247 0 0018.732 27.061 37.464 31.247 0 0037.464 0 37.464 31.247 0 0018.732-27.061",
            "m118.2 86.293v143.49"
        ],
        dot: [35.78, 206.08],
        lower_anchor: [118.2, 230.18],
        upper_anchor: [118.2, 86.366]
    },
    "d": {
        paths: [
            "m50.928 230.18c18.6203 0 20.203-17.6832 20.203-22.626 0-50.924-48.631-74.979-48.631-32.877 0 10.131 7.147 21.9533 18.75 28.603 11.602 6.6497 25.898 6.6497 37.5 0 11.6025-6.65 18.75-18.939 18.75-32.239v-84.748"
        ],
        dot: [15, 118.95],
        lower_anchor: [50.928, 230.18],
        upper_anchor: [97.5, 86.366]
    },
    "n": {
        paths: ["m44.34 230.18c48.544-11.531 83.956-88.856 18.292-87.667-18.802 0.34027-24.18 5.4618-40.135 11.175l0.0414-41.458h67.611v-27.066"],
        dot: [15, 183.24],
        lower_anchor: [44.34, 230.18],
        upper_anchor: [90.1494, 86.366]
    },
    "l": {
        paths: [
            "m97.94 86.293v104.89",
            "m97.94 192.52c0 13.3-7.1475 25.589-18.75 32.239-11.602 6.6497-25.898 6.6497-37.5 0-11.603-6.6497-18.75-15.952-18.75-26.083 0-35.399 55.656-2.8408 72.107 8.1836"
        ], dot: [25.97, 122.08],
        lower_anchor: [60, 230.18],
        upper_anchor: [97.94, 86.366]
    },
    "r": {
        paths: [
            "m97.94 86.293v104.89",
            "m97.94 192.52a37.226 37.5-90 01-18.75 32.239 37.226 37.5-90 01-37.5-0 37.226 37.5-90 01-18.75-32.239"
        ],
        lower_anchor: [60, 230.18],
        upper_anchor: [97.94, 86.366]
    },
    "k": {
        paths: [
            "m53.6 86.214 1e-4 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141",
            "m120.02 86.214-30.407 0",
            "m120.02 86.214v92.756v50.744",
        ],
        lower_anchor: [120.02, 230.18],
        dot: [25.3, 122.08],
        upper_anchor: [120.02, 86.366]
    },
    "g": {
        paths: [
            "m157.48 86.366v76.103s0.96065 34.198-7.4528 47.319c-8.9002 13.879-23.424 20.078-37.5 20.078-11.672 0-22.809-7.4215-31.584-15.118-20.263-17.773-44.122-67.76-44.122-67.76",
            "m157.06 157.4a35.337 26.413 37.381 0 1-25.602 26.76 35.337 26.413 37.381 0 1-37.833-31.721 35.337 26.413 37.381 0 1 23.908-28.18 35.337 26.413 37.381 0 1 38.902 30.461"
        ],
        lower_anchor: [113.97, 230.18],
        dot: [34.5, 119.02],
        upper_anchor: [157.48, 86.366]
    },
    "h": {
        paths: [
            "m22.564 86.61v104.89",
            "m22.564 192.84a37.23 37.5 270 0018.75 32.24 37.23 37.5 270 0037.5 0 37.23 37.5 270 0018.75-32.24"
        ],
        lower_anchor: [60.064, 230.18],
        upper_anchor: [72.564, 86.366]
    },
    "j": {
        paths: [
            "m 46.57,86.293c 0,0 -12.548257,41.29033 -15,66.57 -1.316696,13.57631 -2.9982,36.796 17.507,36.796 19.481,0 27.994,-64.672 52.521,-64.672 6.5036,0 17.507,1.3734 17.507,17.508",
            "m119.1 142.5v87.68"
        ],
        dot: [64.48, 211.14],
        lower_anchor: [119.1, 230.18],
        upper_anchor: [97, 86.366]
    },
    "w": {
        paths: [
            "m112.2 194.12c-10.482 18.128-28.414 35.693-50.789 35.674-25.32-0.0221-43.265-22.227-46.777-45.555-2.5495-16.936-3.922-33.852 7.0726-46.464 12.798-12.882 28.676-11.864 45.692-11.724 0-11.333-0.1841-26.519 0-39.757"
        ],
        lower_anchor: [61.411, 229.794],
        upper_anchor: [74.9, 86.366]
    },
    "ʔ": {
        paths: ["m82.5 86.299c-0.029 23.393-0.047 66.632-0.047 89.78 0 36.388-36.726 10.288-59.394-3.509 29.44 18.05 36.94 22.946 74.44 57.296"],
        lower_anchor: [97.6, 230.18],
        upper_anchor: [82.5, 86.366]
    },
};

type Vowel = "á" | "ai" | "e" | "ú" | "ъ" | "au" | "u" | "aQ" | "i" | "í" | "o";

const VOWEL: {
    [key in Vowel]: {
        paths: string[],
        anchored: "lower" | "upper"
    } | {
        paths: string[],
        anchored: false,
        self_horizontal_displacement: {
            [key in string]: number
        },
        consonant_horizontal_displacement?: {
            [key in string]: number
        }
    }
} = {
    "á": {
        paths: [
            "m0 0a29.539 28.776 0 0 1 8.8871 32.675 29.539 28.776 0 0 1-29.132 18.362 29.539 28.776 0 0 1-26.954-21.287"
        ],
        anchored: "lower"
    },
    "ai": {
        paths: [
            "m 0 -0.315 c -1.804 -0.065 -3.758 0 -5.563 0 c -47.022 0 -32.261 29.794 -11.386 29.674 c 21.608 -0.125 -15.838 10.909 -32.524 13.611a37.524 28.776 0 0 0 36.929 19.053 37.524 28.776 0 0 0 34.679-21.395"
        ],
        anchored: "lower"
    },
    "e": {
        paths: [
            "m0 86.293s20.534-41.854 62.61-62.946"
        ],
        anchored: false,
        self_horizontal_displacement: {
            "p": 135 / 2 - 30, "b": 165 / 2 - 30, "m": 135 / 2 - 30,
            "c": 105 / 2 - 30, "s": 105 / 2 - 30, "x": 135 / 2 - 30, "z": 135 / 2 - 30,
            "t": 135 / 2 - 30, "d": 105 / 2 - 30, "n": 105 / 2 - 30, "l": 105 / 2 - 30, "r": 105 / 2 - 30,
            "k": 135 / 2 - 30, "g": 165 / 2 - 30,
            "h": 105 / 2 - 30, "j": 135 / 2 - 30, "w": 105 / 2 - 30, "ʔ": 105 / 2 - 30,
        }
    },
    "ú": {
        paths: [
            "m 0 0 c -1.804 -0.065 -3.758 0 -5.563 0 c -47.022 0 -26.556 29.119 -11.386 29.674 c 12.707 0.344 26.021 -0.571 38.734 -0.528 a38.084 28.776 0 0 1-29.773 32.645 38.084 28.776 0 0 1-44.665-20.804"
        ],
        anchored: "lower"
    },
    "ъ": {
        paths: [
            "m0 268.51 37.123-18.117"
        ],
        anchored: false,
        self_horizontal_displacement: {
            "p": 135 / 2 - 12, "b": 165 / 2 - 12, "m": 135 / 2 - 12,
            "c": 105 / 2 - 12, "s": 105 / 2 - 12, "x": 135 / 2 - 12, "z": 135 / 2 - 12,
            "t": 135 / 2 - 12, "d": 105 / 2 - 12, "n": 105 / 2 - 12, "l": 105 / 2 - 12, "r": 105 / 2 - 12,
            "k": 135 / 2 - 12, "g": 165 / 2 - 12,
            "h": 105 / 2 - 12, "j": 135 / 2 - 12, "w": 105 / 2 - 12, "ʔ": 105 / 2 - 12,
        }
    },
    "au": {
        paths: [
            "m0 0a44.28 34.3-90 00-16.98-38.48 44.28 34.3-90 00-33.96-0 44.28 34.3-90 00-16.98 38.48",
            "m0 0a63.21 33.7 90 0116.85-54.74 63.21 33.7 90 0133.69 0 63.21 33.7 90 0116.85 54.74",
            "m82.46 194.884c-8.7772-11.667-12.883-22.508-14.682-41.438-2.5386-26.709-0.48568-69.52-0.48568-153.47"
        ],
        anchored: "upper"
    },
    "u": {
        paths: ["m0 0a34.175 21.716 0 00-43.462 10.482 34.175 21.716 0 0013.199 28.324 34.175 21.716 0 0045.437-6.2444"],
        anchored: "lower"
    },
    "aQ": {
        paths: ["m0 262.6c19.509-39.844 37.87 27.063 58.487-13.465"],
        anchored: false,
        self_horizontal_displacement: {
            "p": 135 / 2 - 20, "b": 165 / 2 - 20, "m": 135 / 2 - 20,
            "c": 105 / 2 - 20, "s": 105 / 2 - 20, "x": 135 / 2 - 20, "z": 135 / 2 - 20,
            "t": 135 / 2 - 20, "d": 105 / 2 - 20, "n": 105 / 2 - 20, "l": 105 / 2 - 20, "r": 105 / 2 - 20,
            "k": 135 / 2 - 20, "g": 165 / 2 - 20,
            "h": 105 / 2 - 20, "j": 135 / 2 - 20, "w": 105 / 2 - 20, "ʔ": 105 / 2 - 20,
        }
    },
    "i": {
        paths: [
            "m-20 0c12.16-47.13 42.34-64.42 57.71-64.42 18.12 0 25.2 20.64 25.2 62.84m15.17 194.91c-8.78-11.67-12.88-22.51-14.68-41.44-2.54-26.71-.49-69.52-.49-153.47"
        ],
        anchored: "upper"
    },
    "í": {
        paths: [
            "m-12.5-63.628c-16.062 19.314-24.368 38.518-30 62.154",
            "m-20 0c12.164-47.134 42.345-64.419 57.714-64.419 18.1242 0 25.2 20.643 25.2 62.835m15.08 195.067c-8.7772-11.667-12.883-22.508-14.682-41.438-2.5386-26.709-.4857-69.52-.4857-153.47",
        ], anchored: "upper"
    },
    "o": {
        paths: [
            "m30 86.183c0-35.83-0.26714-62.872 25.851-62.835 30.047 0.84916 60.73 38.966 71.663 62.946",
            "m30 229.79c0.40867-47.88-0.1058-95.619 0-143.5"
        ],
        anchored: false,
        self_horizontal_displacement: {},
        consonant_horizontal_displacement: {
            "p": 45, "b": 30, "m": 45,
            "c": 30, "s": 30, "x": 30, "z": 30,
            "t": 30, "d": 30, "n": 30, "l": 30, "r": 30,
            "k": 30, "g": 30,
            "h": 45 /* EXCEPTION */, "j": 30, "w": 45 /* EXCEPTION */, "ʔ": 30,
        }
    }
};
