"use strict";
const UNIT = 15;
const BOX_FULL_HEIGHT = 20 * UNIT;
const BASE_CONSONANT = {
    "p": {
        paths: [
            "m75 158.06s-33.79-1.0281-47.036-12.965c-4.455-4.0148-5.9136-11.919-5.9136-11.919",
            "m75 158.06s33.79 1.0281 47.036 12.965c4.455 4.0147 5.9136 11.919 5.9136 11.919",
            "m75 86.25 0 142.5",
        ],
        lower_anchor: [75, 228.75],
        dot: [30, 206.08],
        upper_anchor: [95, 86.25]
    },
    "b": {
        paths: [
            "m97.5 86.25 0 36.686",
            "m157.5 164.369a49.759 63.111 59.666 0 1-59.988 63.3 49.759 63.111 59.666 0 1-59.988-41.398 49.759 63.111 59.666 0 1 59.988-63.3 49.759 63.111 59.666 0 1 59.988 41.398z"
        ],
        dot: [45.97, 122.08],
        lower_anchor: [83, 228.75],
        upper_anchor: [117.5, 86.25]
    },
    "m": {
        paths: [
            "m52.5 86.25c-22.5 20.323-30 41.386-29.997 54.822-0.37348 7.3367 4.1622 15.45 10.142 17.077 8.114 1.9618 21.081-4.1317 29.195-6.0934 24.567-9.819 65.659-26.864 65.659 15.406 0 27.926-52.5 44.554-52.5 44.554",
            "m75 86.25v142.5"
        ],
        lower_anchor: [75, 228.75],
        upper_anchor: [95, 86.25]
    },
    "c": {
        paths: [
            "m30.843 86.25l30.407 0a41.33 35.43 0 0135.79 17.72 41.33 35.43 0 010 35.43 41.33 35.43 0 01-35.79 17.72 41.33 35.79 0 0141.17 32.67 41.33 35.79 0 01-33.99 38.36 41.33 35.79 0 01-47.1-25.98"
        ],
        dot: [14.9, 160.63],
        lower_anchor: [65.65, 228.75],
        upper_anchor: [80.65, 86.25]
    },
    "s": {
        paths: [
            "m97.5 86.25v142.5",
            "m 97.5,125.11c -22.94,-0.09 -9.03,0 -34.98,0 -53.665973,0 -45.516021,52.36862 -25.338274,89.27925"
        ],
        lower_anchor: [97.5, 228.75],
        upper_anchor: [97.5, 86.25]
    },
    "x": {
        paths: [
            "m53.619 86.25 1e-4 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141",
            "m119.76 142.58h-66.231",
            "m119.76 86.25v142.5",
        ],
        lower_anchor: [119.76, 228.75],
        upper_anchor: [119.76, 86.25]
    },
    "z": {
        paths: [
            "m52.1 86.25 1e-4 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141-0.6721-9.864-0.8694-21.419 31.201-21.419",
            "m118.2 142.58h-66.231",
            "m118.2 86.25v142.5",
        ],
        lower_anchor: [118.2, 228.75],
        upper_anchor: [118.2, 86.25]
    },
    "t": {
        paths: [
            "m22.28 86.25v60",
            "m22.28 146.25a37.464 31.247 0 0018.732 27.061 37.464 31.247 0 0037.464 0 37.464 31.247 0 0018.732-27.061",
            "m97.2 86.25v142.5"
        ],
        dot: [14.78, 206.08],
        lower_anchor: [97.2, 228.75],
        upper_anchor: [97.2, 86.25]
    },
    "d": {
        paths: [
            "m97.5 86.25v83.361c0 13.3-7.1475 25.589-18.75 32.239-11.602 6.6497-25.898 6.6497-37.5 0-11.603-6.6497-18.75-18.472-18.75-28.603 0-42.102 48.631-18.047 48.631 32.877 0 4.9428-1.5827 22.626-20.203 22.626"
        ],
        dot: [15, 118.95],
        lower_anchor: [50.928, 228.75],
        upper_anchor: [97.5, 86.25]
    },
    "n": {
        paths: ["m90.15 86.25v24.55h-67.61l-.04 41.46c15.95-5.71 21.33-10.83 40.13-11.18 65.66-1.19 30.25 76.14-18.29 87.67"],
        dot: [15, 183.24],
        lower_anchor: [44.34, 228.75],
        upper_anchor: [90.1494, 86.25]
    },
    "l": {
        paths: [
            "m97.94 86.25v105.249c0 13.3-7.1475 25.589-18.75 32.239-11.602 6.6497-25.898 6.6497-37.5 0-11.603-6.6497-18.75-15.952-18.75-26.083 0-35.399 55.656-2.8408 72.107 8.1836"
        ], dot: [25.97, 122.08],
        lower_anchor: [60, 228.75],
        upper_anchor: [97.94, 86.25]
    },
    "r": {
        paths: [
            "m97.94 86.25v105.247a37.226 37.5-90 01-18.75 32.239 37.226 37.5-90 01-37.5 0 37.226 37.5-90 01-18.75-32.239"
        ],
        lower_anchor: [60, 228.75],
        upper_anchor: [97.94, 86.25]
    },
    "k": {
        paths: [
            "m53.6 86.25 0 79.619c-3.3552 37.74-29.583 23.188-31.294-1.9141",
            "m120.02 86.25-30.407 0",
            "m120.02 86.25v142.5",
        ],
        lower_anchor: [120.02, 228.75],
        dot: [25.3, 122.08],
        upper_anchor: [120.02, 86.25]
    },
    "g": {
        paths: [
            "m157.48 86.25v75.238c0 0 .9607 34.198-7.4528 47.319-8.9002 13.879-23.424 20.078-37.5 20.078-11.672 0-22.809-7.4215-31.584-15.118-20.263-17.773-44.122-67.76-44.122-67.76",
            "m157.06 156.535a35.337 26.413 37.381 01-25.602 26.76 35.337 26.413 37.381 01-37.833-31.721 35.337 26.413 37.381 0123.908-28.18 35.337 26.413 37.381 0138.902 30.461"
        ],
        lower_anchor: [113.97, 228.75],
        dot: [34.5, 119.02],
        upper_anchor: [157.48, 86.25]
    },
    "h": {
        paths: [
            "m22.564 86.25v105.24a37.23 37.5 270 0018.75 32.24 37.23 37.5 270 0037.5 0 37.23 37.5 270 0018.75-32.24"
        ],
        lower_anchor: [60.064, 228.75],
        upper_anchor: [72.564, 86.25]
    },
    "j": {
        paths: [
            "m31.57 86.25c0 0-12.5483 41.2903-15 66.57-1.3167 13.5763-2.9982 36.796 17.507 36.796 19.481 0 27.994-64.672 52.521-64.672 6.5036 0 17.507 1.3734 17.507 17.508v86.298"
        ],
        dot: [49.48, 209.14],
        lower_anchor: [104.1, 228.75],
        upper_anchor: [82, 86.25]
    },
    "w": {
        paths: [
            "m67.4 86.25 0 38.853c-17.02-.14-32.9-1.16-45.69 11.73-11 12.61-9.63 29.52-7.08 46.46 3.52 23.33 21.46 45.53 46.78 45.55 22.38.02 40.31-17.54 50.79-35.67"
        ],
        lower_anchor: [61.411, 228.75],
        upper_anchor: [74.9, 86.25]
    },
    "ʔ": {
        paths: ["m82.453 86.25v88.713c0 36.388-36.726 10.288-59.394-3.509 29.44 18.05 36.94 22.946 74.44 57.296"],
        lower_anchor: [97.6, 228.75],
        upper_anchor: [82.5, 86.25]
    },
};
const VOWEL = {
    "á": {
        paths: [
            "m0 0a29.539 28.776 0 0 1 8.8871 32.675 29.539 28.776 0 0 1-29.132 18.362 29.539 28.776 0 0 1-26.954-21.287"
        ],
        position: "lower_anchor"
    },
    "ai": {
        paths: [
            "m 0 -0.315 c -1.804 -0.065 -3.758 0 -5.563 0 c -47.022 0 -32.261 29.794 -11.386 29.674 c 21.608 -0.125 -15.838 10.909 -32.524 13.611a37.524 28.776 0 0 0 36.929 19.053 37.524 28.776 0 0 0 34.679-21.395"
        ],
        position: "lower_anchor"
    },
    "e": {
        paths: [
            "m-37.5 86.25s20.534-41.854 62.61-62.946"
        ],
        position: "center",
    },
    "ú": {
        paths: [
            "m 0 0 c -1.804 -0.065 -3.758 0 -5.563 0 c -47.022 0 -26.556 29.119 -11.386 29.674 c 12.707 0.344 26.021 -0.571 38.734 -0.528 a38.084 28.776 0 0 1-29.773 32.645 38.084 28.776 0 0 1-44.665-20.804"
        ],
        position: "lower_anchor"
    },
    "ъ": {
        paths: [
            "m-19.5 268.51 37.123-18.117"
        ],
        position: "center",
    },
    "au": {
        paths: [
            "M0 0C 0.06473949,-14.260981 -33.695523,-50.658049 -73.731,-58.119313",
            "m0 0a63.21 33.7 90 0116.85-54.74 63.21 33.7 90 0133.69 0 63.21 33.7 90 0116.85 54.74",
            "m82.46 194.884c-8.7772-11.667-12.883-22.508-14.682-41.438-2.5386-26.709-0.48568-69.52-0.48568-153.47"
        ],
        position: "upper_anchor"
    },
    "u": {
        paths: ["m0 0a34.175 21.716 0 00-43.462 10.482 34.175 21.716 0 0013.199 28.324 34.175 21.716 0 0045.437-6.2444"],
        position: "lower_anchor"
    },
    "aQ": {
        paths: ["m-27.5 262.6c19.509-39.844 37.87 27.063 58.487-13.465"],
        position: "center",
    },
    "i": {
        paths: [
            "m-20 0c12.16-47.13 42.34-64.42 57.71-64.42 18.12 0 25.2 20.64 25.2 62.84m15.17 194.91c-8.78-11.67-12.88-22.51-14.68-41.44-2.54-26.71-.49-69.52-.49-153.47"
        ],
        position: "upper_anchor"
    },
    "í": {
        paths: [
            "m-12.5-63.628c-16.062 19.314-24.368 38.518-30 62.154",
            "m-20 0c12.164-47.134 42.345-64.419 57.714-64.419 18.1242 0 25.2 20.643 25.2 62.835m15.08 195.067c-8.7772-11.667-12.883-22.508-14.682-41.438-2.5386-26.709-.4857-69.52-.4857-153.47",
        ],
        position: "upper_anchor"
    },
    "o": {
        paths: [
            "m127.514 86.25c-10.933-23.98-41.616-62.0968-71.663-62.946-26.1181-.037-25.851 27.005-25.851 62.835v142.611"
        ],
        position: "vowel_is_static_but_displace_consonant",
        consonant_horizontal_displacement: {
            "p": 45, "b": 30, "m": 45,
            "c": 45, "s": 30, "x": 30, "z": 30,
            "t": 45, "d": 30, "n": 45, "l": 30, "r": 30,
            "k": 30, "g": 30,
            "h": 60, "j": 45, "w": 45, "ʔ": 45,
        }
    }
};
