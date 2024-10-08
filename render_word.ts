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

type Pragma = { type: "pragma", value: string };

function render_word({ syllables_to_render, DEBUG_MODE, svg_id = "main", height = 20, nautuhoma_e = true, GLOBAL_KERNING = 0, 棒の端をどれだけ余らせるか = 15, SPACE_WIDTH = UNIT * 10 }
    : {
        syllables_to_render: (string | Pragma)[],
        DEBUG_MODE: boolean,
        svg_id?: string,
        height?: number,
        nautuhoma_e?: boolean,
        GLOBAL_KERNING?: number,
        棒の端をどれだけ余らせるか?: number,
        SPACE_WIDTH?: number,
    }) {
    if (!document.getElementById(svg_id)) {
        document.write(`<svg id="${svg_id}" version="1.1" xmlns="http://www.w3.org/2000/svg">
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

    let word_start = 0;

    let box_left_pos = 棒の端をどれだけ余らせるか;

    for (let i = 0; i < syllables_to_render.length; i++) {
        const syll = syllables_to_render[i];
        if (typeof syll === "string") {

            if (syll === " ") {
                const axis_stroke_width = UNIT;
                const axis_width = box_left_pos - word_start + UNIT - GLOBAL_KERNING - axis_stroke_width;

                if (DEBUG_MODE)
                    document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="baseline" d="m${word_start + 7.5} 225h${axis_width}" stroke="#ffff00" />`;
            
                if (nautuhoma_e)
                    document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="nautuhoma_e" d="m${word_start + 7.5} 75h${axis_width}" stroke="${DEBUG_MODE ? "#800000" : "#000000"}" />`;
            
                box_left_pos += SPACE_WIDTH;
                word_start = box_left_pos - 棒の端をどれだけ余らせるか;
                continue;
            }

            const constituents = get_constituents_from_syllable(syll);
            const current_glyph_width = CONSONANT_CONTRIBUTION_TO_WIDTH[constituents.consonant] + VOWEL_CONTRIBUTION_TO_WIDTH[constituents.vowel];

            if (DEBUG_MODE) {
                const BOX_BORDER_WIDTH = UNIT;
                document.getElementById(`boxes_${svg_id}`)!.innerHTML += `<rect x="${box_left_pos + BOX_BORDER_WIDTH / 2}" y="${BOX_BORDER_WIDTH / 2}" width="${current_glyph_width - BOX_BORDER_WIDTH}" height="${BOX_FULL_HEIGHT - BOX_BORDER_WIDTH}" rx="0" ry="0" />`;
            }

            let glyph = "";

            const paths = make_syllable(constituents, DEBUG_MODE);

            for (let j = 0; j < paths.length; j++) {
                glyph += paths[j];
            }

            document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<g transform="translate(${box_left_pos})">${glyph}</g>`;

            if (DEBUG_MODE)
                document.getElementById(`latin_${svg_id}`)!.innerHTML += `<text x="${box_left_pos + UNIT}" y="${UNIT * 3}" fill="#000000">${syllables_to_render[i]}</text>`;

            box_left_pos += current_glyph_width + GLOBAL_KERNING;
        } else {
            if (syll.value === "deactivate_nautuhoma_e") {
                nautuhoma_e = false;
            } else if (syll.value === "activate_nautuhoma_e") {
                nautuhoma_e = true;
            } else {
                throw new Error(`Unknown pragma: ${syll.value}`);
            }
        }
    }

    const axis_stroke_width = UNIT;
    const axis_width = box_left_pos - word_start + 棒の端をどれだけ余らせるか - GLOBAL_KERNING - axis_stroke_width;

    if (DEBUG_MODE)
        document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="baseline" d="m${word_start + 7.5} 225h${axis_width}" stroke="#ffff00" />`;

    if (nautuhoma_e)
        document.getElementById(`glyphs_${svg_id}`)!.innerHTML += `<path id="nautuhoma_e" d="m${word_start + 7.5} 75h${axis_width}" stroke="${DEBUG_MODE ? "#800000" : "#000000"}" />`;

    document.getElementById(svg_id)!.setAttribute("viewBox", `0 0 ${box_left_pos + 棒の端をどれだけ余らせるか * 2} ${BOX_FULL_HEIGHT}`);
    document.getElementById(svg_id)!.setAttribute("height", `${height}mm`);
}