#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixPrincipalLinks(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // Corregir enlaces del botón PRINCIPAL para que apunten a home-1.html
        const beforePrincipal = content;
        
        // Cambiar href="../facultadbiologiauaq.html" por href="home-1.html" en botones PRINCIPAL
        content = content.replace(
            /href="\.\.\/facultadbiologiauaq\.html"([^>]*aria-label="PRINCIPAL")/g, 
            'href="home-1.html"$1'
        );
        
        // También cambiar cualquier enlace a ../facultadbiologiauaq.html en menús de navegación que diga "Portada"
        content = content.replace(
            /href="\.\.\/facultadbiologiauaq\.html"([^>]*>.*?Portada)/g, 
            'href="home-1.html"$1'
        );
        
        if (beforePrincipal !== content) {
            changesMade = true;
        }
        
        // Guardar solo si se hicieron cambios
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corregido enlaces PRINCIPAL: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  Sin cambios en enlaces PRINCIPAL: ${filePath}`);
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
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'home-1.html');
    
    console.log(`🔍 Corrigiendo enlaces PRINCIPAL en ${htmlFiles.length} archivos HTML`);
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(facultadDir, file);
        if (fixPrincipalLinks(filePath)) {
            totalFixed++;
        }
    });
    
    console.log(`\n🎉 Proceso completado: ${totalFixed} archivos con enlaces PRINCIPAL corregidos.`);
}

// Ejecutar el proceso
processDirectory();