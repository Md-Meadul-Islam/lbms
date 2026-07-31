import fs from "fs/promises";

import path from "path";

class EmailTemplate {
  constructor() {
    this.cache = new Map();

    this.templatePath = path.resolve(
      "shared",

      "templates",

      "email",
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Load Template
    |--------------------------------------------------------------------------
    */

  async load(template) {
    if (this.cache.has(template)) {
      return this.cache.get(template);
    }

    const file = path.join(
      this.templatePath,

      `${template}.html`,
    );

    const html = await fs.readFile(
      file,

      "utf8",
    );

    this.cache.set(
      template,

      html,
    );

    return html;
  }

  /*
    |--------------------------------------------------------------------------
    | Render Template
    |--------------------------------------------------------------------------
    */

  async render(
    template,

    variables = {},
  ) {
    let html = await this.load(template);

    for (const [key, value] of Object.entries(variables)) {
      html = html.replace(
        new RegExp(
          `{{\\s*${key}\\s*}}`,

          "g",
        ),

        value ?? "",
      );
    }

    return html;
  }

  /*
    |--------------------------------------------------------------------------
    | Clear Cache
    |--------------------------------------------------------------------------
    */

  clearCache() {
    this.cache.clear();
  }
}

export default new EmailTemplate();
