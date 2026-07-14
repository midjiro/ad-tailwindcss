export function mockHtml(classes: string[]): string {
    const elements = classes
        .map((className) => `    <div class="${className}"></div>`)
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
  <body>
${elements}
  </body>
</html>
`;
}
