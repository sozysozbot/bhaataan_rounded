"use strict";
function call_consonant(consonant) {
    return BASE_CONSONANT[consonant].paths.map(d => `<path stroke="#000000" d="${d}" />`);
}
function call_dot_at([x, y], debug_mode) {
    return `<path d="m${x} ${y}v3a3 3 0 0 0 0-6 3 3 0 0 0 0 6v-3" stroke="${debug_mode ? "#800080" : "#000000"}" />`;
}
function automatic({ consonant, vowel, dotted }, is_debug_mode) {
    const consonant_paths = call_consonant(consonant);
    const { vowel_paths, consonant_horizontal_displacement } = (() => {
        if (vowel === 'a') {
            return { vowel_paths: "", consonant_horizontal_displacement: 0 };
        }
        const dat = VOWEL[vowel];
        if (dat.position === "lower_anchor") {
            const [x, y] = BASE_CONSONANT[consonant].lower_anchor;
            return {
                vowel_paths: `<g transform="translate(${x} ${y})">
                    ${dat.paths.map(d => `<path stroke="${is_debug_mode ? "#0000ff" : "#000"}" d="${d}" />`).join("")}
                </g>`,
                consonant_horizontal_displacement: 0
            };
        }
        if (dat.position === "upper_anchor") {
            const [x, y] = BASE_CONSONANT[consonant].upper_anchor;
            return {
                vowel_paths: `<g transform="translate(${x} ${y})">
                    ${dat.paths.map(d => `<path stroke="${is_debug_mode ? "#0000ff" : "#000"}" d="${d}" />`).join("")}
                </g>`,
                consonant_horizontal_displacement: 0
            };
        }
        if (dat.position == "center") {
            const translate_x = CONSONANT_CONTRIBUTION_TO_WIDTH[consonant] / 2;
            return {
                vowel_paths: `<g transform="translate(${translate_x})">${dat.paths.map(d => `<path stroke="${is_debug_mode ? "#0000ff" : "#000"}" d="${d}" />`)}</g>`,
                consonant_horizontal_displacement: dat.consonant_horizontal_displacement?.[consonant] ?? 0
            };
        }
        if (dat.position === "vowel_is_static_but_displace_consonant") {
            return {
                vowel_paths: `<g transform="translate(0)">${dat.paths.map(d => `<path stroke="${is_debug_mode ? "#0000ff" : "#000"}" d="${d}" />`).join("")}</g>`,
                consonant_horizontal_displacement: dat.consonant_horizontal_displacement?.[consonant] ?? 0
            };
        }
        dat.position;
        throw new Error(`unreachable`);
    })();
    const consonantal = (() => {
        if (dotted) {
            const dot_coord = BASE_CONSONANT[consonant].dot;
            if (!dot_coord) {
                throw new Error(`Consonant ${consonant} does not have a dot`);
            }
            const dot_path = call_dot_at(dot_coord, is_debug_mode);
            return [...consonant_paths, dot_path];
        }
        else {
            return [...consonant_paths];
        }
    })();
    const consonant_displaced = `<g transform="translate(${consonant_horizontal_displacement})">${consonantal.join("")}</g>`;
    return [consonant_displaced, vowel_paths];
}
