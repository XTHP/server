module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "rules": {
        //强制在逗号周围使用空格 (comma-spacing)
        "comma-spacing": ["error", { "before": false, "after": true }],
        // 要求中缀操作符周围有空格 (space-infix-ops)
        "space-infix-ops": ["error", {"int32Hint": false}],
        "key-spacing": ["error", { "afterColon": true }],
        // 空格2个
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        // 强制使用单引号
        "quotes": [
            "error",
            "single"
        ],
        // 要求结尾使用分号而不是 ASI
        "semi": [
            "error",
            "always"
        ],
        // 禁止不必要的分号
        'no-extra-semi': 'error',
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号， 
        'comma-dangle': ['error', 'never'],
        "no-console": "off",
        // 不允许return, throw, continue, and break后增加代码（不可能执行）
        "no-unreachable": "off",
        "no-unused-vars": "off",
        "no-fallthrough": "off",
        // 禁止定以前使用
        "no-use-before-define": ["error",{"functions": false, "classes": false, "variables": true }]
    },
    "globals": {
        "__inline": true,
        "$": true,
        "ref": true,
        "loadDetailMethod": true,
        "market": true,
        "mobileCb": true,
        "commandMap": true,
        "marketAd": true,
        "lang": true,
        "ajaxData": true,
        "screenSize": true,
        "globalExposureParam": true,
        "searchGuidePage": true,
        "PROTOCOL": true,
        "_global": true,
        "h5": true,
        "__dirname": true,
        "local": true,
        "HOST": true,
        "fis": true,
        "_local": true,
        "__uri": true,
        "XiaomiVipClient": true,
        "loadPageType": true,
        "CDN_HOST": true,
        "passthroughMap": true,
        "searchEnhanceNum": true,
        "adConfigKey": true,
        "minaV1": true,
        "appStorePerf": true,
        "isSupportAutoOpen": true,
        "g_appParams": true,
        "refPrefix": true,
        "loadPageMethod": true,
        "globalCustomRef": true,
        "marketAPI": true,
        "marketAsyncCb": true,
        "nativeLoad": true,
        "isAdvanceAndroid": true,
        "WEBP": true,
        "loginCb": true,
        "needReload": true,
        "CDN_THUMBNAIL": true,
        "gInstalledAppsMap": true
    }
};