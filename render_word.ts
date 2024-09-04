function get_constituents_from_syllable(input: string): { consonant: Consonant, vowel: Vowel, dotted: boolean } {
    const threshold = input[1] === "h" ? 2 : 1;
    const original_consonant = input.slice(0, threshold);
    const vowel = input.slice(threshold);

    const { consonant, dotted }: { consonant: Consonant, dotted: boolean } = (function (): { consonant: Consonant, dotted: boolean } {
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

        const consonants: Consonant[] = ["p", "b", "m", "c", "s", "x", "z", "t", "d", "n", "l", "r", "k", "g", "h", "j", "w", "ʔ"];
        if (consonants.includes(original_consonant as Consonant)) {
            return { consonant: original_consonant as Consonant, dotted: false };

        } else {
            throw new Error(`Unknown consonant: ${original_consonant}`);
        }
    })();

    return { consonant, vowel: vowel as Vowel, dotted };
}

const GLOBAL_GLYPH_TABLE = {
    "pha": { width: 135 }, "bha": { width: 165 }, "ma": { width: 135 },
    "ṣa": { width: 105 }, "sa": { width: 105 }, "xa": { width: 135 }, "za": { width: 135 },
    "ṭa": { width: 135 }, "dha": { width: 105 }, "ṇa": { width: 105 }, "ḷa": { width: 105 }, "ra": { width: 105 },
    "kha": { width: 135 }, "gha": { width: 165 },
    "ha": { width: 105 }, "ya": { width: 135 }, "wa": { width: 105 }, "ʔa": { width: 105 },

    "phá": { width: 135 }, "bhá": { width: 165 }, "má": { width: 135 },
    "ṣá": { width: 105 }, "sá": { width: 105 }, "xá": { width: 135 }, "zá": { width: 135 },
    "ṭá": { width: 135 }, "dhá": { width: 105 }, "ṇá": { width: 105 }, "ḷá": { width: 105 }, "rá": { width: 105 },
    "khá": { width: 135 }, "ghá": { width: 165 },
    "há": { width: 105 }, "yá": { width: 135 }, "wá": { width: 105 }, "ʔá": { width: 105 },

    "phu": { width: 135 }, "bhu": { width: 165 }, "mu": { width: 135 },
    "ṣu": { width: 105 }, "su": { width: 105 }, "xu": { width: 135 }, "zu": { width: 135 },
    "ṭu": { width: 135 }, "dhu": { width: 105 }, "ṇu": { width: 105 }, "ḷu": { width: 105 }, "ru": { width: 105 },
    "khu": { width: 135 }, "ghu": { width: 165 },
    "hu": { width: 105 }, "yu": { width: 135 }, "wu": { width: 105 }, "ʔu": { width: 105 },

    "phai": { width: 135 }, "bhai": { width: 165 }, "mai": { width: 135 },
    "ṣai": { width: 105 }, "sai": { width: 105 }, "xai": { width: 135 }, "zai": { width: 135 },
    "ṭai": { width: 135 }, "dhai": { width: 105 }, "ṇai": { width: 105 }, "ḷai": { width: 105 }, "rai": { width: 105 },
    "khai": { width: 135 }, "ghai": { width: 165 },
    "hai": { width: 105 }, "yai": { width: 135 }, "wai": { width: 105 }, "ʔai": { width: 105 },

    "phú": { width: 135 }, "bhú": { width: 165 }, "mú": { width: 135 },
    "ṣú": { width: 105 }, "sú": { width: 105 }, "xú": { width: 135 }, "zú": { width: 135 },
    "ṭú": { width: 135 }, "dhú": { width: 105 }, "ṇú": { width: 105 }, "ḷú": { width: 105 }, "rú": { width: 105 },
    "khú": { width: 135 }, "ghú": { width: 165 },
    "hú": { width: 105 }, "yú": { width: 135 }, "wú": { width: 105 }, "ʔú": { width: 105 },

    "phe": { width: 135 }, "bhe": { width: 165 }, "me": { width: 135 },
    "ṣe": { width: 105 }, "se": { width: 105 }, "xe": { width: 135 }, "ze": { width: 135 },
    "ṭe": { width: 135 }, "dhe": { width: 105 }, "ṇe": { width: 105 }, "ḷe": { width: 105 }, "re": { width: 105 },
    "khe": { width: 135 }, "ghe": { width: 165 },
    "he": { width: 105 }, "ye": { width: 135 }, "we": { width: 105 }, "ʔe": { width: 105 },

    "phaQ": { width: 135 }, "bhaQ": { width: 165 }, "maQ": { width: 135 },
    "ṣaQ": { width: 105 }, "saQ": { width: 105 }, "xaQ": { width: 135 }, "zaQ": { width: 135 },
    "ṭaQ": { width: 135 }, "dhaQ": { width: 105 }, "ṇaQ": { width: 105 }, "ḷaQ": { width: 105 }, "raQ": { width: 105 },
    "khaQ": { width: 135 }, "ghaQ": { width: 165 },
    "haQ": { width: 105 }, "yaQ": { width: 135 }, "waQ": { width: 105 }, "ʔaQ": { width: 105 },

    "phъ": { width: 135 }, "bhъ": { width: 165 }, "mъ": { width: 135 },
    "ṣъ": { width: 105 }, "sъ": { width: 105 }, "xъ": { width: 135 }, "zъ": { width: 135 },
    "ṭъ": { width: 135 }, "dhъ": { width: 105 }, "ṇъ": { width: 105 }, "ḷъ": { width: 105 }, "rъ": { width: 105 },
    "khъ": { width: 135 }, "ghъ": { width: 165 },
    "hъ": { width: 105 }, "yъ": { width: 135 }, "wъ": { width: 105 }, "ʔъ": { width: 105 },

    "phí": { width: 135 + 60 }, "bhí": { width: 165 + 60 }, "mí": { width: 135 + 60 },
    "ṣí": { width: 105 + 60 }, "sí": { width: 105 + 60 }, "xí": { width: 135 + 60 }, "zí": { width: 135 + 60 },
    "ṭí": { width: 135 + 60 }, "dhí": { width: 105 + 60 }, "ṇí": { width: 105 + 60 }, "ḷí": { width: 105 + 60 }, "rí": { width: 105 + 60 },
    "khí": { width: 135 + 60 }, "ghí": { width: 165 + 60 },
    "hí": { width: 105 + 60 }, "yí": { width: 135 + 60 }, "wí": { width: 105 + 60 }, "ʔí": { width: 105 + 60 },

    "phi": { width: 135 + 60 }, "bhi": { width: 165 + 60 }, "mi": { width: 135 + 60 },
    "ṣi": { width: 105 + 60 }, "si": { width: 105 + 60 }, "xi": { width: 135 + 60 }, "zi": { width: 135 + 60 },
    "ṭi": { width: 135 + 60 }, "dhi": { width: 105 + 60 }, "ṇi": { width: 105 + 60 }, "ḷi": { width: 105 + 60 }, 
    
    "li": { width: 105 + 60 }, 
    
    "ri": { width: 105 + 60 },
    "khi": { width: 135 + 60 }, "ghi": { width: 165 + 60 },
    "hi": { width: 105 + 60 }, "yi": { width: 135 + 60 }, "wi": { width: 105 + 60 }, "ʔi": { width: 105 + 60 },

    "phau": { width: 135 + 60 }, "bhau": { width: 165 + 60 }, "mau": { width: 135 + 60 },
    "ṣau": { width: 105 + 60 }, "sau": { width: 105 + 60 }, "xau": { width: 135 + 60 }, "zau": { width: 135 + 60 },
    "ṭau": { width: 135 + 60 }, "dhau": { width: 105 + 60 }, "ṇau": { width: 105 + 60 }, "ḷau": { width: 105 + 60 }, "rau": { width: 105 + 60 },
    "khau": { width: 135 + 60 }, "ghau": { width: 165 + 60 },
    "hau": { width: 105 + 60 }, "yau": { width: 135 + 60 }, "wau": { width: 105 + 60 }, "ʔau": { width: 105 + 60 },

    "pho": { width: 135 + 60 }, "bho": { width: 165 + 60 }, "mo": { width: 135 + 60 },
    "ṣo": { width: 105 + 60 }, "so": { width: 105 + 60 }, "xo": { width: 135 + 60 }, "zo": { width: 135 + 60 },
    "ṭo": { width: 135 + 60 }, "dho": { width: 105 + 60 }, "ṇo": { width: 105 + 60 }, "ḷo": { width: 105 + 60 }, "ro": { width: 105 + 60 },
    "kho": { width: 135 + 60 }, "gho": { width: 165 + 60 },
    "ho": { width: 105 + 60 }, "yo": { width: 135 + 60 }, "wo": { width: 105 + 60 }, "ʔo": { width: 105 + 60 },

};



function render_word({ syllables_to_render, DEBUG_MODE, svg_id = "main" }
    : { syllables_to_render: string[], DEBUG_MODE: boolean, svg_id?: string }
) {
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
        const current_glyph_width = GLOBAL_GLYPH_TABLE[syllables_to_render[i]]?.width ?? 105;

        if (DEBUG_MODE)
            document.getElementById(`boxes_${svg_id}`)!.innerHTML += `<rect x="${box_left_pos + UNIT / 2}" y="${UNIT / 2}" width="${current_glyph_width}" height="${BOX_FULL_HEIGHT}" rx="0" ry="0" />`;

        let glyph = "";

        const paths = automatic(get_constituents_from_syllable(syllables_to_render[i]), DEBUG_MODE);

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