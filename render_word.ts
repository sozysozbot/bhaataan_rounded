function get_constituents_from_syllable(input: string): { consonant: BaseConsonant, vowel: Vowel, dotted: boolean } {
    const threshold = input[1] === "h" ? 2 : 1;
    const original_consonant = input.slice(0, threshold);
    const vowel = input.slice(threshold);

    const { consonant, dotted }: { consonant: BaseConsonant, dotted: boolean } = (function (): { consonant: BaseConsonant, dotted: boolean } {
        if (original_consonant === "ṇ") {
            return { consonant: "n", dotted: true };
        } else if (original_consonant === "ṭ") {
            return { consonant: "t", dotted: true };
        } else if (original_consonant === "ḷ") {
            return { consonant: "l", dotted: true };
        } else if (original_consonant === "ṣ") {
            return { consonant: "c", dotted: true };
        } else if (original_consonant === "kh") {
            return { consonant: "k", dotted: true };
        } else if (original_consonant === "bh") {
            return { consonant: "b", dotted: true };
        } else if (original_consonant === "gh") {
            return { consonant: "g", dotted: true };
        } else if (original_consonant === "ph") {
            return { consonant: "p", dotted: true };
        } else if (original_consonant === "dh") {
            return { consonant: "d", dotted: true };
        } else if (original_consonant === "y") {
            return { consonant: "j", dotted: true };
        }

        const consonants: BaseConsonant[] = ["p", "b", "m", "c", "s", "x", "z", "t", "d", "n", "l", "r", "k", "g", "h", "j", "w", "ʔ"];
        if (consonants.includes(original_consonant as BaseConsonant)) {
            return { consonant: original_consonant as BaseConsonant, dotted: false };

        } else {
            throw new Error(`Unknown consonant: ${original_consonant}`);
        }
    })();

    return { consonant, vowel: vowel as Vowel, dotted };
}

const CONSONANT_CONTRIBUTION_TO_WIDTH: { [key in BaseConsonant]: number } = {
    "p": 135, "b": 165, "m": 135,
    "c": 105, "s": 105, "x": 135, "z": 135,
    "t": 135, "d": 105, "n": 105, "l": 105, "r": 105,
    "k": 135, "g": 165,
    "h": 105, "j": 135, "w": 105, "ʔ": 105,
};

const VOWEL_CONTRIBUTION_TO_WIDTH: { [key in Vowel | "a"]: number } = {
    "a": 0, "á": 0, "u": 0, "ú": 0, "ai": 0, "e": 0, "aQ": 0, "ъ": 0,
    "i": 60, "í": 60, "au": 60, "o": 60,
};

function render_word({ syllables_to_render, DEBUG_MODE, svg_id = "main", height = 30 }: { syllables_to_render: string[], DEBUG_MODE: boolean, svg_id?: string, height?: number }) {
    if (!document.getElementById(svg_id)) {
        document.write(`<svg id="${svg_id}" height="${height}mm" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke-opacity="${DEBUG_MODE ? .5 : 1}">
        <g id="boxes_${svg_id}" stroke="#ffd1ff" stroke-width="${UNIT}">
        </g>
        <g stroke-linecap="round" stroke-linejoin="round">
            <g stroke-width="${UNIT}" id="glyphs_${svg_id}">
            </g>
        </g>
    </g>
    <g id="latin_${svg_id}" font-family="Arial" font-size="${UNIT * 3}" fill="#000000"></g>
</svg>`);
    }
    // 1 単位分、棒だけが描画される余白を残す
    let box_left_pos = UNIT;

    for (let i = 0; i < syllables_to_render.length; i++) {
        const constituents = get_constituents_from_syllable(syllables_to_render[i]);
        const current_glyph_width = CONSONANT_CONTRIBUTION_TO_WIDTH[constituents.consonant] + VOWEL_CONTRIBUTION_TO_WIDTH[constituents.vowel];

        if (DEBUG_MODE)
            document.getElementById(`boxes_${svg_id}`)!.innerHTML += `<rect x="${box_left_pos + UNIT / 2}" y="${UNIT / 2}" width="${current_glyph_width}" height="${BOX_FULL_HEIGHT}" rx="0" ry="0" />`;

        let glyph = "";

        const paths = automatic(constituents, DEBUG_MODE);

        for (let j = 0; j < paths.length; j++) {
            glyph += paths[j];
        }

        document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<g transform="translate(${box_left_pos})">${glyph}</g>`;

        if (DEBUG_MODE)
            document.getElementById(`latin_${svg_id}`)!.innerHTML += `<text x="${box_left_pos + UNIT}" y="${UNIT * 4}" " fill="#000000">${syllables_to_render[i]}</text>`;

        box_left_pos += current_glyph_width + GLOBAL_KERNING;
    }

    const axis_width = box_left_pos + UNIT - GLOBAL_KERNING;

    if (DEBUG_MODE)
        document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="baseline" d="m7.5 229.86h${axis_width}" stroke="#ffff00" />`;

    document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="nautuhoma_e" d="m7.5 86.366h${axis_width}" stroke="${DEBUG_MODE ? "#800000" : "#000000"}" />`;

    document.getElementById(svg_id)!.setAttribute("viewBox", `0 0 ${box_left_pos + UNIT * 2} ${BOX_FULL_HEIGHT + UNIT}`);
}