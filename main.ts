function call_consonant(consonant: Consonant): string[] {
    return BASE_CONSONANT[consonant].paths.map(d => `<path stroke="#000000" d="${d}" />`);
}

function call_dot_at([x, y]: [number, number], debug_mode: boolean): string {
    return `<path d="m${x} ${y}v3a3 3 0 0 0 0-6 3 3 0 0 0 0 6v-3" stroke="${debug_mode ? "#800080" : "#000000"}" />`;
}

function call_vowel_anchored_at(vowel: Vowel, [x, y]: [number, number], debug_mode?: boolean): string {
    if (VOWEL[vowel].anchored) {
        return `<g transform="translate(${x} ${y})">
        ${VOWEL[vowel].paths.map(d => `<path stroke="${debug_mode ? "#0000ff" : "#000"}" d="${d}" />`).join("")}
    </g>`;
    }
    else { throw new Error(`Vowel ${vowel} should not be anchored`); }
}

function call_vowel_non_anchored(vowel: Vowel, consonant: Consonant, debug_mode: boolean): string {
    const dat = VOWEL[vowel];
    if (!dat.anchored) {
        const x = dat.self_horizontal_displacement[consonant];
        return `<g transform="translate(${x ?? 0})">${VOWEL[vowel].paths.map(d => `<path stroke="${debug_mode ? "#0000ff" : "#000"}" d="${d}" />`)}</g>`;
    }
    else { throw new Error(`Vowel ${vowel} should be anchored`); }
}

function automatic({ consonant, vowel, dotted }: { consonant: Consonant, vowel: Vowel | 'a', dotted: boolean }, is_debug_mode: boolean): string[] {
    const consonant_paths = call_consonant(consonant);

    const vowel_paths = vowel === 'a' ? "" : VOWEL[vowel].anchored ?
        call_vowel_anchored_at(vowel, BASE_CONSONANT[consonant].lower_anchor, is_debug_mode) :
        call_vowel_non_anchored(vowel, consonant, is_debug_mode);

    const consonant_horizontal_displacement =
        vowel === 'a' || VOWEL[vowel].anchored ?
            0
            : VOWEL[vowel]?.consonant_horizontal_displacement?.[consonant] ?? 0;

    const consonantal = (() => {
        if (dotted) {
            const dot_coord = BASE_CONSONANT[consonant].dot;
            if (!dot_coord) { throw new Error(`Consonant ${consonant} does not have a dot`); }
            const dot_path = call_dot_at(dot_coord, is_debug_mode);
            return [...consonant_paths, dot_path];
        }
        else {
            return [...consonant_paths];
        }
    })();

    const consonant_displaced = `<g transform="translate(${consonant_horizontal_displacement})">${consonantal.join("")}</g>`;

    return [consonant_displaced, ...vowel_paths];
}