/* This Source Code Form is subject to the terms of the Creative Commons
 * Attribution-NonCommercial-ShareAlike International License, v. 4.0.
 * If a copy of the CC BY-NC-SA 4.0 was not distributed with this
 * file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */

"use strict";

const path = require("path");

module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "script",
    babelOptions: { configFile: path.join(__dirname, ".babel-eslint.rc.js") },
  },
  env: {
    node: false,
    // "mozilla/browser-window": true,
    // "mozilla/chrome-script": true,
    // "mozilla/chrome-worker": true,
    // "mozilla/frame-script": true,
    // "mozilla/jsm": true,
    // "mozilla/privileged": true,
    // "mozilla/process-script": true,
    // "mozilla/remote-page": true,
    // "mozilla/simpletest": true,
    // "mozilla/sjs": true,
    // "mozilla/special-powers-sandbox": true,
    // "mozilla/specific": true,
    // "mozilla/xpcshell": true,
  },
  settings: { "import/extensions": [".mjs"] },
  root: true,
  rules: {
    curly: ["error", "multi-line", "consistent"],
    "linebreak-style": ["error", "unix"],
    "no-console": ["warn", { allow: ["error"] }],
    "no-implied-eval": "error",
    "prefer-numeric-literals": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-reflect": "off",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  ignorePatterns: ["node_modules", "utils/**"],
  // allow external repositories that use the plugin to pick them up as well.
  extends: ["plugin:prettier/recommended", "plugin:mozilla/recommended"],
  plugins: ["mozilla", "import"],
  overrides: [
    {
      files: ["JS/**", "experimental/**"],
      parserOptions: {
        sourceType: "script",
        ecmaVersion: "latest",
      },
      env: { browser: true, "mozilla/browser-window": true },
      globals: {
        _ucUtils: "writable",
        windowUtils: "readonly",
        promiseDocumentFlushed: "readonly",
        tabPreviews: "writable",
        gUnifiedExtensions: "writable",
        UIState: "writable",
        FxAccounts: "writable",
        EnsureFxAccountsWebChannel: "writable",
        SyncedTabs: "writable",
        MIN_STATUS_ANIMATION_DURATION: "writable",
        SyncedTabsPanelList: "writable",
        SyncedTabsDeckComponent: "writable",
        syncedTabsDeckComponent: "writable",
        isInitialPage: "writable",
      },
      rules: {
        "arrow-body-style": "off",
        complexity: ["warn", { max: 50 }],
        "consistent-return": "off",
        // Has to be off since ESLint doesn't know that some imports in my
        // scripts are only used by Firefox methods modified by eval()
        "mozilla/valid-lazy": "off",
        "no-empty": "off",
        // We use eval() frequently to modify internal methods
        "no-eval": "off",
        // Same as above, needed by modified internal methods
        "no-unused-vars": "off",
        "prefer-arrow-callback": "off",
      },
    },
    {
      files: ["*@aminomancer/**", "extensions/**"],
      env: { webextensions: true },
      globals: { XPCNativeWrapper: true },
      rules: { complexity: "off", "no-console": "off" },
    },
    {
      files: ["utils/**", "resources/aboutconfig/**"],
      rules: { "prettier/prettier": "off" },
    },
    {
      files: ["prefs/**"],
      rules: { "prettier/prettier": "off" },
      globals: { user_pref: "readonly" },
    },
    {
      files: ["resources/script-override/**"],
      rules: { "prettier/prettier": ["error", { quoteProps: "preserve" }] },
    },
    {
      // All .eslintrc.js files are in the node environment, so turn that
      // on here.
      // https://github.com/eslint/eslint/issues/13008
      files: [".eslintrc.js"],
      env: { node: true, browser: false },
    },
    {
      files: ["*.mjs"],
      rules: {
        "import/default": "error",
        "import/export": "error",
        "import/named": "error",
        "import/namespace": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/no-absolute-path": "error",
        "import/no-named-default": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-self-import": "error",
        "import/no-unassigned-import": "error",
        "import/no-unresolved": [
          "error",
          // Bug 1773473 - Ignore resolver URLs for chrome and resource as we
          // do not yet have a resolver for them.
          { ignore: ["chrome://", "resource://"] },
        ],
        "import/no-useless-path-segments": "error",
      },
    },
    {
      files: ["*.html", "*.xhtml", "*.xml"],
      rules: {
        // Curly brackets are required for all the tree via recommended.js,
        // however these files aren't auto-fixable at the moment.
        curly: "off",
      },
    },
    {
      files: ["*.jsx"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["import", "react", "jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:mozilla/recommended",
        "plugin:prettier/recommended",
        "prettier",
      ],
      rules: {
        "fetch-options/no-fetch-credentials": "error",

        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-key": "error",
        "react/jsx-no-bind": "error",
        "react/jsx-no-comment-textnodes": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-undef": "error",
        "react/jsx-pascal-case": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/no-access-state-in-setstate": "error",
        "react/no-danger": "error",
        "react/no-deprecated": "error",
        "react/no-did-mount-set-state": "error",
        "react/no-did-update-set-state": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-is-mounted": "error",
        "react/no-unknown-property": "error",
        "react/require-render-return": "error",

        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/heading-has-content": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/no-onchange": "off",

        "accessor-pairs": [
          "error",
          { setWithoutGet: true, getWithoutSet: false },
        ],
        "array-callback-return": "error",
        "arrow-body-style": "off",
        "block-scoped-var": "error",
        "consistent-this": ["error", "use-bind"],
        curly: ["error", "multi-line", "consistent"],
        eqeqeq: "error",
        "for-direction": "error",
        "func-name-matching": "error",
        "getter-return": "error",
        "guard-for-in": "error",
        "lines-between-class-members": "error",
        "max-depth": ["error", 4],
        "max-nested-callbacks": ["error", 4],
        "max-params": ["error", 6],
        "max-statements": ["error", 50],
        "max-statements-per-line": ["error", { max: 2 }],
        "new-cap": ["error", { newIsCap: true, capIsNew: false }],
        "no-alert": "error",
        "no-console": ["error", { allow: ["error"] }],
        "no-div-regex": "error",
        "no-duplicate-imports": "error",
        "no-eq-null": "error",
        "no-extend-native": "error",
        "no-extra-label": "error",
        "no-implicit-coercion": ["error", { allow: ["!!"] }],
        "no-implicit-globals": "error",
        "no-loop-func": "error",
        "no-multi-assign": "error",
        "no-multi-str": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-prototype-builtins": "error",
        "no-return-assign": ["error", "except-parens"],
        "no-script-url": "error",
        "no-shadow": "error",
        "no-template-curly-in-string": "error",
        "no-undef-init": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-use-before-define": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "no-void": ["error", { allowAsStatement: true }],
        "one-var": ["error", "never"],
        "operator-assignment": ["error", "always"],
        "prefer-arrow-callback": "off",
        "prefer-destructuring": [
          "error",
          {
            AssignmentExpression: { array: true },
            VariableDeclarator: { array: true, object: true },
          },
        ],
        "prefer-numeric-literals": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        radix: ["error", "always"],
        "require-await": "error",
        "sort-vars": "error",
        "symbol-description": "error",
        "vars-on-top": "error",
        yoda: ["error", "never"],
      },
    },
    {
      files: ["resources/aboutuserchrome/**"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
