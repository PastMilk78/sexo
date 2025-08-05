#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixHamburgerMenuContent(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Buscar y reemplazar la función openMenu para que también muestre el contenido del menú
        const oldOpenMenuPattern = /function openMenu\(\) \{[\s\S]*?console\.log\('✅ Menú abierto'\);\s*\}/;
        
        const newOpenMenuFunction = `function openMenu() {
            console.log('🚀 Abriendo menú...');
            
            menuOverlay.setAttribute('data-visible', 'true');
            menuOverlay.style.visibility = 'visible';
            menuOverlay.style.display = 'flex';
            menuOverlay.classList.add('HamburgerOverlay547129737--isMenuOpen');
            
            hamburgerButton.setAttribute('aria-expanded', 'true');
            
            // Bloquear scroll del body
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            // ✅ NUEVA FUNCIONALIDAD: Mostrar el contenido del menú expandible
            const menuContent = document.querySelector('#comp-mdmuyz3u3, [id*="comp-m"][id*="u3"], .ExpandableMenu, [class*="ExpandableMenu"]');
            if (menuContent) {
                menuContent.style.display = 'block';
                menuContent.style.visibility = 'visible';
                menuContent.style.opacity = '1';
                console.log('✅ Contenido del menú mostrado');
            } else {
                console.log('⚠️ No se encontró el contenido del menú expandible');
            }
            
            // Buscar y mostrar cualquier menú vertical oculto
            const verticalMenus = document.querySelectorAll('[class*="vertical-menu"], [class*="wixui-vertical-menu"], [data-testid*="menu"]');
            verticalMenus.forEach(menu => {
                if (menu.style.display === 'none' || menu.style.visibility === 'hidden') {
                    menu.style.display = 'block';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    console.log('✅ Menú vertical mostrado:', menu.id || menu.className);
                }
            });
            
            // Buscar específicamente los elementos del menú hamburguesa
            const hamburgerMenuContainer = document.querySelector('#comp-mdmuyz206, [id*="HamburgerMenuContainer"], [class*="HamburgerMenuContainer"]');
            if (hamburgerMenuContainer) {
                // Mostrar cualquier contenido oculto dentro del contenedor
                const hiddenElements = hamburgerMenuContainer.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], [aria-hidden="true"]');
                hiddenElements.forEach(element => {
                    element.style.display = 'block';
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                    element.removeAttribute('aria-hidden');
                    console.log('✅ Elemento del menú mostrado:', element.tagName, element.className);
                });
            }
            
            console.log('✅ Menú abierto');
        }`;
        
        // Buscar y reemplazar la función closeMenu
        const oldCloseMenuPattern = /function closeMenu\(\) \{[\s\S]*?console\.log\('✅ Menú cerrado'\);\s*\}/;
        
        const newCloseMenuFunction = `function closeMenu() {
            console.log('🚀 Cerrando menú...');
            
            menuOverlay.setAttribute('data-visible', 'false');
            menuOverlay.style.visibility = 'hidden';
            menuOverlay.style.display = 'none';
            menuOverlay.classList.remove('HamburgerOverlay547129737--isMenuOpen');
            
            hamburgerButton.setAttribute('aria-expanded', 'false');
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            console.log('✅ Menú cerrado');
        }`;
        
        let changesMade = false;
        
        if (oldOpenMenuPattern.test(content)) {
            content = content.replace(oldOpenMenuPattern, newOpenMenuFunction);
            changesMade = true;
        }
        
        if (oldCloseMenuPattern.test(content)) {
            content = content.replace(oldCloseMenuPattern, newCloseMenuFunction);
            changesMade = true;
        }
        
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Contenido del menú hamburguesa corregido: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  No se encontraron las funciones a corregir en: ${filePath}`);
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
    const htmlFiles = files.filter(file => file.endsWith('.html') && !file.includes('robots') && !file.includes('sitemap') && !file.includes('feed'));
    
    console.log(`🔍 Corrigiendo contenido del menú hamburguesa en ${htmlFiles.length} archivos HTML`);
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(facultadDir, file);
        if (fixHamburgerMenuContent(filePath)) {
            totalFixed++;
        }
    });
    
    console.log(`\n🎉 Proceso completado: ${totalFixed} archivos con contenido del menú corregido.`);
}

// Ejecutar el proceso
processDirectory();