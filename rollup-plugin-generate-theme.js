const fs = require('fs');
const path = require('path');

function generateThemePlugin({ themeConfigPath, outputPath }) {
  return {
    name: 'generate-theme',
    buildStart() {
      const userThemeConfigPath = path.resolve(themeConfigPath);
      const userTheme = fs.existsSync(userThemeConfigPath)
        ? require(userThemeConfigPath).theme
        : {};

      const generateCssVariables = (theme) => {
        let cssVariables = ':root {\n';
        Object.keys(theme).forEach((key) => {
          if (typeof theme[key] === 'object') {
            Object.keys(theme[key]).forEach((shade) => {
              cssVariables += `  --${key}-${shade}: ${theme[key][shade]};\n`;
            });
          } else {
            cssVariables += `  --${key}: ${theme[key]};\n`;
          }
        });
        cssVariables += '}';
        return cssVariables;
      };

      // Generate CSS variables from user theme
      const userThemeCss = generateCssVariables(userTheme);

      // Write the generated CSS to a file
      fs.writeFileSync(path.resolve(outputPath), userThemeCss);
    },
  };
}

module.exports = generateThemePlugin;
