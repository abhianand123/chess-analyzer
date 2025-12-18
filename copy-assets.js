const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'public');
const destDir = path.join(__dirname, 'dist', 'public');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    console.log(`Copying assets from ${srcDir} to ${destDir}...`);
    copyDir(srcDir, destDir);
    console.log('Assets copied successfully!');
} catch (error) {
    console.error('Error copying assets:', error);
    process.exit(1);
}
