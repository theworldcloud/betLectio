import { readdir, readFile, writeFile } from "fs/promises"

async function build() {
    let style = "";
    const files = await readdir("./src/styles");
    const styleFiles = files.filter((file) => file.endsWith(".css"));

    for (const file of styleFiles) {
        const content = await readFile(`./src/styles/${file}`, "utf8");
        style += content;
    }

    writeFile("./dist/style.css", style, "utf8");
}

build();
