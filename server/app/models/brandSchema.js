'use Strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Brand = new Schema({
    "brandId": { "type": "Number", "index": "true", "unique": "true" },
    "settings": {
        "activeFeatures": {
            "orderHistoryEnabled": "Boolean",
            "imageIntensiveEnabled": "Boolean",
            "advertsEnabled": "Boolean",
            "takeawayEnabled": "Boolean",
            "feedbackEnabled": "Boolean",
            "loyaltyEnabled": "Boolean"
        },
        "design": {
            "colours": {
                "primaryBg": "String",
                "primaryFg": "String",
                "secondaryBg": "String",
                "secondaryFg": "String",
                "tertiaryBg": "String",
                "tertiaryFg": "String"
            },
            "fonts": {
                "primaryFont": "String",
                "secondaryFont": "String"
            },
            "extras": {
                "displayVegNonVegIcons": "Boolean",
                "showMinOrderAmount": "Boolean",
                "fullScreenBackground": "String"
                    // "displayTaxPercentage": "Boolean"
            },
            "customCSS": "String"
        },
        "content": {
            "pageTitle": "String",
            "pageDescription": "String",
            "favicon": "String",
            "heroImages": ["String"],
            "heroImagesMobile": ["String"],
            "backgroundTexture": "String",
            "advertImages": [{
                "imgUrl": "String",
                "target": "String"
            }],
            "logoRedirectUrl": "String",
            "appAdvertImage": "String",
            "tagLine": "String",
            "appAdvertLink": "String",
            "appAdvertLinkTargetBlank": Boolean,
            // "enableAndroidAppLink": "Boolean",
            // "enableIOSAppLink": "Boolean",
            "androidAppLink": "String",
            "iOSAppLink": "String",
            // "phoneNumber": "String"
        },
        "customScripts": {
            "header": "String",
            "footer": "String",
            "conversion": "String"
        }
    }
});


mongoose.model('brand_setting', Brand);
