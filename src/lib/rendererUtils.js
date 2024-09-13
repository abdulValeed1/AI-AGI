import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Babel from "@babel/standalone";
import * as React from "react";
import * as recharts from "recharts";
import * as uiComponents from "components/ui";
import * as lucide from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getReactComponentFromCode = (code) => {
  const transformedCode = transformCode(code);
  console.log("transformedCode", transformedCode);

  const factoryFunction = new Function(transformedCode)();
  const component = factoryFunction(React, recharts, uiComponents, lucide);

  return component;
};

const transformCode = (code) => {
  const { modifiedInput: codeWithoutExports, exportedName: componentName } =
    removeDefaultExport(code);

  const transpiledCode = Babel.transform(codeWithoutExports, {
    presets: ["react"],
    plugins: [importTransformerPlugin],
  }).code;

  return `
return function(React, recharts, uiComponents, lucide) {
  ${transpiledCode}
  return ${componentName};
}
  `;
};

export const importTransformerPlugin = () => ({
  name: "import-transformer",
  visitor: {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      const specifiers = path.node.specifiers;

      if (specifiers.length === 0) return;

      let objectName;
      if (source === "react") {
        objectName = "React";
      } else if (source.startsWith("@/components/ui")) {
        objectName = "uiComponents";
      } else if (source === "lucide-react") {
        objectName = "lucide";
      } else {
        objectName = source;
      }

      const properties = specifiers
        .map((specifier) => {
          if (specifier.type === "ImportSpecifier") {
            const imported = specifier.imported;
            const importedName = imported.type === "Identifier"
              ? imported.name
              : imported.type === "StringLiteral"
              ? imported.value
              : null;

            if (importedName === null) {
              console.warn("Unexpected import specifier type");
              return null;
            }

            return {
              type: "ObjectProperty",
              key: { type: "Identifier", name: importedName },
              value: { type: "Identifier", name: specifier.local.name },
              computed: false,
              shorthand: importedName === specifier.local.name,
            };
          }
          return null;
        })
        .filter(prop => prop !== null);

      const newDeclaration = {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "ObjectPattern",
              properties: properties,
            },
            init: { type: "Identifier", name: objectName },
          },
        ],
      };

      path.replaceWith(newDeclaration);
    },
  },
});

export const removeDefaultExport = (input) => {
  // Regex to match the default export with declaration line
  const defaultExportWithDeclarationRegex =
    /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*{[^}]*}/;

  // Regex to match the default export line
  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+);?/;

  let match = input.match(defaultExportWithDeclarationRegex);
  let exportedName = null;
  let modifiedInput = input;

  if (match) {
    exportedName = match[1];
    // Remove the 'export default ' part but keep the rest of the declaration
    modifiedInput = modifiedInput
      .replace(/export\s+default\s+function/, "function")
      .trim();
  } else {
    match = input.match(defaultExportRegex);
    if (match) {
      exportedName = match[1];
      // Remove the matched line from the input
      modifiedInput = modifiedInput.replace(defaultExportRegex, "").trim();
    }
  }

  return { modifiedInput, exportedName };
};