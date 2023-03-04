/** @type {import("tailwindcss").Config} */
const config = {
  presets: [require("@t3-tt/tailwind-config")],
  content: ["./src/**/*.tsx"],
  prefix: "", // avoid collision with apps
};

module.exports = config;
