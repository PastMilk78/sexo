#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixHtmlReferences(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // Corregir referencias a static.parastorage.com
        const beforeParastorage = content;
        content = content.replace(/src="\.\.\/\.\.\/static\.parastorage\.com\//g, 'src="https://static.parastorage.com/');
        content = content.replace(/href="\.\.\/\.\.\/static\.parastorage\.com\//g, 'href="https://static.parastorage.com/');
        content = content.replace(/url\('\.\.\/\.\.\/static\.parastorage\.com\//g, "url('https://static.parastorage.com/");
        content = content.replace(/url\("\.\.\/\.\.\/static\.parastorage\.com\//g, 'url("https://static.parastorage.com/');
        
        if (beforeParastorage !== content) {
            changesMade = true;
        }
        
        // Corregir referencias a static.wixstatic.com
        const beforeWixstatic = content;
        content = content.replace(/src="\.\.\/\.\.\/static\.wixstatic\.com\//g, 'src="https://static.wixstatic.com/');
        content = content.replace(/href="\.\.\/\.\.\/static\.wixstatic\.com\//g, 'href="https://static.wixstatic.com/');
        content = content.replace(/url\('\.\.\/\.\.\/static\.wixstatic\.com\//g, "url('https://static.wixstatic.com/");
        content = content.replace(/url\("\.\.\/\.\.\/static\.wixstatic\.com\//g, 'url("https://static.wixstatic.com/');
        
        if (beforeWixstatic !== content) {
            changesMade = true;
        }
        
        // Guardar solo si se hicieron cambios
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corregido: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  Sin cambios: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

function processDirectory() {
    const facultadDir = 'umdesignermx.wixstudio.com/facultadbiologiauaq';
    
    if (!fs.existsSync(facultadDir)) {
        console.error(`❌ Directorio no encontrado: ${facultadDir}`);
        return;
    }
    
    const files = fs.readdirSync(facultadDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`🔍 Procesando ${htmlFiles.length} archivos HTML en ${facultadDir}/`);
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(facultadDir, file);
        if (fixHtmlReferences(filePath)) {
            totalFixed++;
        }
    });
    
    console.log(`\n🎉 Proceso completado: ${totalFixed} archivos corregidos de ${htmlFiles.length} archivos procesados.`);
}

// Ejecutar el proceso
processDirectory();