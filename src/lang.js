/*
 * @Author: Vincent Young
 * @Date: 2023-03-05 18:22:21
 * @LastEditors: Vincent Young
 * @LastEditTime: 2026-05-22 00:00:00
 * @FilePath: /bob-plugin-deeplx/src/lang.js
 * @Telegram: https://t.me/missuo
 *
 * Copyright © 2023 by Vincent, All Rights Reserved.
 */

// Bob (BCP-47-ish standard codes) <-> DeepL (uppercase codes accepted by
// DeepLX's /translate endpoint). The set matches DeepLX v1.2.1+'s
// supported list — DeepLX itself returns HTTP 400 if we send a code
// outside this table, so keep the two in sync.
var supportedLanguages = [
    ["auto", "auto"],
    ["ar", "AR"],         // Arabic
    ["bg", "BG"],         // Bulgarian
    ["cs", "CS"],         // Czech
    ["da", "DA"],         // Danish
    ["de", "DE"],         // German
    ["el", "EL"],         // Greek
    ["en", "EN"],         // English (generic; DeepLX maps to en-US as target)
    ["es", "ES"],         // Spanish
    ["et", "ET"],         // Estonian
    ["fi", "FI"],         // Finnish
    ["fr", "FR"],         // French
    ["he", "HE"],         // Hebrew
    ["hu", "HU"],         // Hungarian
    ["id", "ID"],         // Indonesian
    ["it", "IT"],         // Italian
    ["ja", "JA"],         // Japanese
    ["ko", "KO"],         // Korean
    ["lt", "LT"],         // Lithuanian
    ["lv", "LV"],         // Latvian
    ["nb", "NB"],         // Norwegian (Bokmål)
    ["nl", "NL"],         // Dutch
    ["pl", "PL"],         // Polish
    ["pt", "PT"],         // Portuguese (generic; DeepLX maps to pt-BR as target)
    ["pt-br", "PT-BR"],   // Portuguese (Brazil)
    ["pt-pt", "PT-PT"],   // Portuguese (Portugal)
    ["ro", "RO"],         // Romanian
    ["ru", "RU"],         // Russian
    ["sk", "SK"],         // Slovak
    ["sl", "SL"],         // Slovenian
    ["sv", "SV"],         // Swedish
    ["tr", "TR"],         // Turkish
    ["uk", "UK"],         // Ukrainian
    ["vi", "VI"],         // Vietnamese
    ["zh-Hans", "ZH-HANS"], // Simplified Chinese
    ["zh-Hant", "ZH-HANT"], // Traditional Chinese
];

exports.supportedLanguages = supportedLanguages;
exports.langMap = new Map(supportedLanguages);
exports.langMapReverse = new Map(supportedLanguages.map(([standardLang, lang]) => [lang, standardLang]));
