#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function improveHamburgerMenuScript(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Buscar y reemplazar el script anterior con uno mejorado
        const oldScriptPattern = /function initHamburgerMenu\(\) \{[\s\S]*?setTimeout\(initHamburgerMenu, 1000\);\s*\}\);/;
        
        const improvedScript = `
function initHamburgerMenu() {
    console.log('🔍 Inicializando menú hamburguesa...');
    
    // Buscar elementos específicos por ID y clases
    let hamburgerButton = document.querySelector('#comp-mdmuyz1x1 button, [aria-label="Menu"], .wixui-hamburger-open-button, [data-semantic-classname="hamburger-open-button"]');
    
    // Buscar en todos los posibles IDs de hamburguesa si no encontramos el específico
    if (!hamburgerButton) {
        const possibleButtons = document.querySelectorAll('[id*="comp-m"][id*="x1"] button, button[aria-label="Menu"], button.wixui-hamburger-open-button');
        hamburgerButton = possibleButtons[0];
    }
    
    // Buscar el overlay del menú con múltiples selectores
    let menuOverlay = document.querySelector('[data-hook="hamburger-overlay-root"], .HamburgerOverlay547129737__root, [id*="comp-m"][id*="y6"]');
    
    if (!menuOverlay) {
        const possibleOverlays = document.querySelectorAll('[class*="HamburgerOverlay"], [role="dialog"][aria-label*="Navegación"]');
        menuOverlay = possibleOverlays[0];
    }
    
    // Buscar el botón de cerrar
    let closeButton = document.querySelector('[aria-label="Close Site Navigation"], .wixui-hamburger-close-button, [id*="comp-m"][id*="w11"] button');
    
    console.log('🔍 Elementos encontrados:');
    console.log('  - Botón hamburguesa:', !!hamburgerButton, hamburgerButton?.id || 'sin ID');
    console.log('  - Overlay del menú:', !!menuOverlay, menuOverlay?.id || 'sin ID');
    console.log('  - Botón cerrar:', !!closeButton, closeButton?.id || 'sin ID');
    
    if (hamburgerButton && menuOverlay) {
        console.log('✅ Configurando menú hamburguesa...');
        
        // Función para abrir el menú
        function openMenu() {
            console.log('🚀 Abriendo menú...');
            
            menuOverlay.setAttribute('data-visible', 'true');
            menuOverlay.style.visibility = 'visible';
            menuOverlay.style.display = 'flex';
            menuOverlay.classList.add('HamburgerOverlay547129737--isMenuOpen');
            
            hamburgerButton.setAttribute('aria-expanded', 'true');
            
            // Bloquear scroll del body
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            console.log('✅ Menú abierto');
        }
        
        // Función para cerrar el menú
        function closeMenu() {
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
        }
        
        // Remover listeners previos si existen
        hamburgerButton.removeEventListener('click', hamburgerButton._hamburgerClickHandler);
        
        // Event listener para abrir el menú
        hamburgerButton._hamburgerClickHandler = function(e) {
            console.log('🖱️ Click en botón hamburguesa');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const isOpen = menuOverlay.getAttribute('data-visible') === 'true';
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };
        
        hamburgerButton.addEventListener('click', hamburgerButton._hamburgerClickHandler, true);
        
        // Event listener para cerrar con el botón X
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                console.log('🖱️ Click en botón cerrar');
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
        }
        
        // Event listener para cerrar clickeando el overlay
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay || e.target.classList.contains('HamburgerOverlay547129737__overlay')) {
                console.log('🖱️ Click en overlay');
                closeMenu();
            }
        });
        
        // Event listener para cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOverlay.getAttribute('data-visible') === 'true') {
                console.log('⌨️ Presionada tecla Escape');
                closeMenu();
            }
        });
        
        console.log('✅ Menú hamburguesa configurado correctamente');
        
        // Test del botón
        hamburgerButton.style.cursor = 'pointer';
        hamburgerButton.title = 'Abrir menú de navegación';
        
    } else {
        console.error('❌ No se encontraron los elementos necesarios para el menú hamburguesa');
        console.log('   - Todos los botones encontrados:', document.querySelectorAll('button').length);
        console.log('   - Elementos con "hamburger":', document.querySelectorAll('[class*="hamburger"], [id*="hamburger"]').length);
        console.log('   - Elementos con "overlay":', document.querySelectorAll('[class*="Overlay"], [role="dialog"]').length);
    }
}

// Múltiples intentos de inicialización
console.log('📱 Script de menú hamburguesa cargado');

// Intento 1: Inmediato
initHamburgerMenu();

// Intento 2: DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM cargado, reiniciando menú...');
        setTimeout(initHamburgerMenu, 100);
    });
}

// Intento 3: Después de delay
setTimeout(function() {
    console.log('⏰ Timeout 1s, reiniciando menú...');
    initHamburgerMenu();
}, 1000);

// Intento 4: Después de delay mayor
setTimeout(function() {
    console.log('⏰ Timeout 3s, reiniciando menú...');
    initHamburgerMenu();
}, 3000);

// Intento 5: Listener para cuando se carga la ventana
window.addEventListener('load', function() {
    console.log('🪟 Ventana cargada, reiniciando menú...');
    setTimeout(initHamburgerMenu, 500);
});

});`; // Cerrar el script anterior
        
        if (oldScriptPattern.test(content)) {
            content = content.replace(oldScriptPattern, improvedScript);
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Script de menú hamburguesa mejorado: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  No se encontró script anterior en: ${filePath}`);
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
    
    console.log(`🔍 Mejorando script de menú hamburguesa en ${htmlFiles.length} archivos HTML`);
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(facultadDir, file);
        if (improveHamburgerMenuScript(filePath)) {
            totalFixed++;
        }
    });
    
    console.log(`\n🎉 Proceso completado: ${totalFixed} archivos con script mejorado.`);
}

// Ejecutar el proceso
processDirectory();