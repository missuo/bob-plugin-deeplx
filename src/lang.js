/*
 * @Author: Vincent Young
 * @Date: 2023-03-05 18:22:21
 * @LastEditors: Vincent Young
 * @LastEditTime: 2023-03-10 16:01:44
 * @FilePath: /bob-plugin-deeplx/src/lang.js
 * @Telegram: https://t.me/missuo
 * 
 * Copyright © 2023 by Vincent, All Rights Reserved. 
 */

var supportedLanguages = [
    ["auto", "auto"],
    ["bg", "BG"], // Bulgarian
    ["cs", "CS"], // Czech
    ["da", "DA"], // Danish
    ["de", "DE"], // German
    ["el", "EL"], // Greek
    ["en", "EN"], // English
    ["es", "ES"], // Spanish
    ["et", "ET"], // Estonian
    ["fi", "FI"], // Finnish 
    ["fr", "FR"], // French
    ["hu", "HU"], // Hungarian
    ["id", "ID"], // Indonesian
    ["it", "IT"], // Italian
    ["ja", "JA"], // Japanese
    ["lt", "LT"], // Lithuanian
    ["lv", "LV"], // Latvian
    ["nl", "NL"], // Dutch
    ["pl", "PL"], // Polish 
    ["pt", "PT"], // Portuguese
    ["ro", "RO"], // Romanian
    ["ru", "RU"], // Russian
    ["sk", "SK"], // Slovak
    ["sl", "SL"], // Slovenian
    ["sv", "SV"], // Swedish
    ["tr", "TR"], // Turkish
    ["uk", "UK"], // Ukrainian
    ["zh-Hans", "ZH"], // Simplified Chinese
    ["zh-Hant", "ZH"], // Traditional Chinese
];

exports.supportedLanguages = supportedLanguages;
exports.langMap = new Map(supportedLanguages);
exports.langMapReverse = new Map(supportedLanguages.map(([standardLang, lang]) => [lang, standardLang]));