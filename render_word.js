"use strict";
function get_constituents_from_syllable(input) {
    const threshold = input[1] === "h" ? 2 : 1;
    const original_consonant = input.slice(0, threshold);
    const vowel = input.slice(threshold);
    const { consonant, dotted } = (function () {
        if (original_consonant === "ṇ") {
            return { consonant: "n", dotted: true };
        }
        else if (original_consonant === "ṭ") {
            return { consonant: "t", dotted: true };
        }
        else if (original_consonant === "ḷ") {
            return { consonant: "l", dotted: true };
        }
        else if (original_consonant === "ṣ") {
            return { consonant: "c", dotted: true };
        }
        else if (original_consonant === "kh") {
            return { consonant: "k", dotted: true };
        }
        else if (original_consonant === "bh") {
            return { consonant: "b", dotted: true };
        }
        else if (original_consonant === "gh") {
            return { consonant: "g", dotted: true };
        }
        else if (original_consonant === "ph") {
            return { consonant: "p", dotted: true };
        }
        else if (original_consonant === "dh") {
            return { consonant: "d", dotted: true };
        }
        else if (original_consonant === "y") {
            return { consonant: "j", dotted: true };
        }
        const consonants = ["p", "b", "m", "c", "s", "x", "z", "t", "d", "n", "l", "r", "k", "g", "h", "j", "w", "ʔ"];
        if (consonants.includes(original_consonant)) {
            return { consonant: original_consonant, dotted: false };
        }
        else {
            throw new Error(`Unknown consonant: ${original_consonant}`);
        }
    })();
    return { consonant, vowel: vowel, dotted };
}
const GLOBAL_GLYPH_TABLE = {
    "pha": { width: 135 }, "phá": { width: 135 }, "phai": { width: 135 }, "za": { width: 135 }, "zá": { width: 135 },
    "ze": { width: 135 }, "zai": { width: 135 }, "gha": { width: 165 }, "ghá": { width: 165 }, "ghai": { width: 165 },
    "ʔa": { width: 105 }, "ʔá": { width: 105 }, "ʔai": { width: 120 }, "khú": { width: 135 }, "wa": { width: 105 },
    "dhe": { width: 105 }, "ṣъ": { width: 105 }, "he": { width: 105 }, "ma": { width: 135 }, "sá": { width: 105 },
    "ṇau": { width: 165 }, "ṭu": { width: 105 }, "xaQ": { width: 135 }, "li": { width: 165 }, "ḷi": { width: 165 },
    "bho": { width: 165 }, "ḷo": { width: 165 }, "rí": { width: 165 }, "ya": { width: 135 }, "wá": { width: 105 },
    "dhá": { width: 105 }, "ṣá": { width: 105 }, "há": { width: 105 }, "má": { width: 135 }, "ṇá": { width: 105 },
    "xá": { width: 135 }, "ṭá": { width: 135 }, "ḷá": { width: 105 }, "yá": { width: 135 }, "rá": { width: 105 },
    "bhá": { width: 165 }, "khá": { width: 135 }
};
function render_word({ syllables_to_render, DEBUG_MODE, svg_id = "main" }) {
    if (!document.getElementById(svg_id)) {
        document.write(`<svg id="${svg_id}" height="30mm" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
        const current_glyph_width = GLOBAL_GLYPH_TABLE[syllables_to_render[i]].width ?? 105;
        if (DEBUG_MODE)
            document.getElementById(`boxes_${svg_id}`).innerHTML += `<rect x="${box_left_pos + UNIT / 2}" y="${UNIT / 2}" width="${current_glyph_width}" height="${BOX_FULL_HEIGHT}" rx="0" ry="0" />`;
        let glyph = "";
        const paths = automatic(get_constituents_from_syllable(syllables_to_render[i]), DEBUG_MODE);
        for (let j = 0; j < paths.length; j++) {
            glyph += paths[j];
        }
        document.getElementById(`glyphs_${svg_id}`).innerHTML += `<g transform="translate(${box_left_pos})">${glyph}</g>`;
        if (DEBUG_MODE)
            document.getElementById(`latin_${svg_id}`).innerHTML += `<text x="${box_left_pos + UNIT}" y="${UNIT * 4}" " fill="#000000">${syllables_to_render[i]}</text>`;
        box_left_pos += current_glyph_width + GLOBAL_KERNING;
    }
    const axis_width = box_left_pos + UNIT - GLOBAL_KERNING;
    if (DEBUG_MODE)
        document.getElementById(`glyphs_${svg_id}`).innerHTML += `<path id="baseline" d="m7.5 229.86h${axis_width}" stroke="#ffff00" />`;
    document.getElementById(`glyphs_${svg_id}`).innerHTML += `<path id="nautuhoma_e" d="m7.5 86.366h${axis_width}" stroke="${DEBUG_MODE ? "#800000" : "#000000"}" />`;
    document.getElementById(svg_id).setAttribute("viewBox", `0 0 ${box_left_pos + UNIT * 2} ${BOX_FULL_HEIGHT + UNIT}`);
}
