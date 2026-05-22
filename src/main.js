/*
 * @Author: Vincent Young
 * @Date: 2023-03-05 16:18:02
 * @LastEditors: Vincent Young
 * @LastEditTime: 2026-05-22 00:00:00
 * @FilePath: /bob-plugin-deeplx/src/main.js
 * @Telegram: https://t.me/missuo
 *
 * Copyright © 2023 by Vincent, All Rights Reserved.
 */
var lang = require("./lang.js");

function supportLanguages() {
    return lang.supportedLanguages.map(([standardLang]) => standardLang);
}

// Map a DeepLX HTTP status code to a Bob ServiceError descriptor.
// Bob recognises a fixed enum of `type` values; everything else degrades
// to `unknown`. Reference: https://bobtranslate.com/plugin/object/serviceerror.html
function classifyError(statusCode, upstreamMessage) {
    var msg = upstreamMessage || "";
    switch (statusCode) {
        case 400:
            // DeepLX since v1.2.1 returns 400 on unknown source_lang /
            // target_lang and lists the valid codes in `message`.
            return {
                type: "unsupportedLanguage",
                message: msg || "Source or target language is not supported.",
            };
        case 401:
            return {
                type: "secretKey",
                message: msg || "Access denied. Check the Token in plugin settings.",
            };
        case 404:
            return {
                type: "param",
                message: msg || "No text to translate.",
            };
        case 413:
            // DeepLX since v1.2.2 returns 413 when input exceeds the
            // 1500-character anonymous oneshot limit.
            return {
                type: "param",
                message: msg || "Text exceeds the 1500-character limit of the anonymous DeepL endpoint.",
            };
        case 429:
            return {
                type: "api",
                message: msg || "Rate-limited by DeepL upstream. Please retry later.",
            };
        case 503:
            return {
                type: "network",
                message: msg || "DeepL upstream is unavailable.",
            };
        case 504:
            // DeepLX since v1.2.2 returns 504 when the upstream POST
            // exceeds the request timeout (default 20s).
            return {
                type: "network",
                message: msg || "DeepL upstream request timed out.",
            };
        default:
            return {
                type: "network",
                message: msg || ("DeepLX returned HTTP " + statusCode),
            };
    }
}

function translate(query, completion) {
    var sourceLang = "";
    if (query.from === "auto") {
        sourceLang = lang.langMap.get(query.detectFrom);
    } else {
        sourceLang = lang.langMap.get(query.from);
    }
    var targetLang = "";
    if (query.to === "auto") {
        targetLang = lang.langMap.get(query.detectTo);
    } else {
        targetLang = lang.langMap.get(query.to);
    }

    // Fail fast before hitting the network if the target language has
    // no DeepL equivalent — Bob expects unsupportedLanguage in that case
    // and will collapse the translation card cleanly.
    if (!targetLang) {
        completion({
            error: {
                type: "unsupportedLanguage",
                message: "DeepL does not support translating to " + (query.detectTo || query.to) + ".",
            },
        });
        return;
    }

    var body = JSON.stringify({
        text: query.text,
        source_lang: sourceLang,
        target_lang: targetLang,
    });

    (async () => {
        var urls = ($option.url || "")
            .split(",")
            .map(function (u) { return u.trim(); })
            .filter(Boolean);
        if (urls.length === 0) {
            completion({
                error: {
                    type: "param",
                    message: "DeepLX API URL is not configured. Set it in the plugin settings.",
                },
            });
            return;
        }
        var randomUrl = urls[Math.floor(Math.random() * urls.length)];

        var headers = { "Content-Type": "application/json" };
        // $option.token is the access token guarding the DeepLX instance
        // itself (set via -token on the server), NOT the DeepL Pro Bearer
        // token. Only attach it when the user actually configured one;
        // sending an empty Bearer would otherwise be a 401 in their face.
        var accessToken = ($option.token || "").trim();
        if (accessToken) {
            headers["Authorization"] = "Bearer " + accessToken;
        }

        var resp;
        try {
            resp = await $http.request({
                method: "POST",
                url: randomUrl,
                header: headers,
                body: $data.fromUTF8(body),
            });
        } catch (e) {
            // Transport-level failure (DNS / connection refused / TLS / etc.)
            completion({
                error: {
                    type: "network",
                    message: "Failed to reach DeepLX at " + randomUrl + ": " + (e && e.message ? e.message : String(e)),
                    addition: String(e),
                },
            });
            return;
        }

        var statusCode = resp.response && resp.response.statusCode;
        var data = resp.data || {};

        if (statusCode !== 200) {
            var err = classifyError(statusCode, data && data.message);
            err.addition = JSON.stringify({
                statusCode: statusCode,
                url: randomUrl,
                response: data,
            });
            completion({ error: err });
            return;
        }

        // HTTP 200 but body is missing the translated text — treat as
        // an API contract violation rather than silently succeed.
        if (typeof data.data !== "string" || data.data === "") {
            completion({
                error: {
                    type: "api",
                    message: "DeepLX returned HTTP 200 with no translated text.",
                    addition: JSON.stringify(data),
                },
            });
            return;
        }

        // DeepLX dropped `alternatives` in v1.2.0 (the oneshot endpoint
        // does not return them), so we no longer surface the field
        // even when an older self-hosted instance still emits it.
        completion({
            result: {
                from: query.detectFrom,
                to: query.detectTo,
                toParagraphs: data.data.split("\n"),
            },
        });
    })().catch(function (err) {
        completion({
            error: {
                type: (err && err._type) || "unknown",
                message: (err && err._message) || ("Unexpected plugin error: " + (err && err.message ? err.message : err)),
                addition: (err && err._addition) || String(err),
            },
        });
    });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
