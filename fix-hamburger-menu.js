#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function addHamburgerMenuScript(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // Script para hacer funcionar el menú hamburguesa
        const hamburgerScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar el menú hamburguesa
    function initHamburgerMenu() {
        // Buscar el botón hamburguesa
        const hamburgerButton = document.querySelector('[aria-label="Menu"], .wixui-hamburger-open-button, [data-semantic-classname="hamburger-open-button"]');
        
        // Buscar el overlay del menú
        const menuOverlay = document.querySelector('[data-hook="hamburger-overlay-root"], .HamburgerOverlay547129737__root');
        
        // Buscar el botón de cerrar
        const closeButton = document.querySelector('[aria-label="Close Site Navigation"], .wixui-hamburger-close-button');
        
        if (hamburgerButton && menuOverlay) {
            console.log('Configurando menú hamburguesa...');
            
            // Función para abrir el menú
            function openMenu() {
                menuOverlay.setAttribute('data-visible', 'true');
                menuOverlay.style.visibility = 'visible';
                menuOverlay.style.display = 'flex';
                menuOverlay.classList.add('HamburgerOverlay547129737--isMenuOpen');
                
                hamburgerButton.setAttribute('aria-expanded', 'true');
                
                // Bloquear scroll del body
                document.body.style.overflow = 'hidden';
                
                console.log('Menú abierto');
            }
            
            // Función para cerrar el menú
            function closeMenu() {
                menuOverlay.setAttribute('data-visible', 'false');
                menuOverlay.style.visibility = 'hidden';
                menuOverlay.style.display = 'none';
                menuOverlay.classList.remove('HamburgerOverlay547129737--isMenuOpen');
                
                hamburgerButton.setAttribute('aria-expanded', 'false');
                
                // Restaurar scroll del body
                document.body.style.overflow = '';
                
                console.log('Menú cerrado');
            }
            
            // Event listener para abrir el menú
            hamburgerButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
            
            // Event listener para cerrar con el botón X
            if (closeButton) {
                closeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeMenu();
                });
            }
            
            // Event listener para cerrar clickeando el overlay
            menuOverlay.addEventListener('click', function(e) {
                if (e.target === menuOverlay || e.target.classList.contains('HamburgerOverlay547129737__overlay')) {
                    closeMenu();
                }
            });
            
            // Event listener para cerrar con Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menuOverlay.getAttribute('data-visible') === 'true') {
                    closeMenu();
                }
            });
            
            console.log('Menú hamburguesa configurado correctamente');
        } else {
            console.log('No se encontraron los elementos del menú hamburguesa');
        }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburgerMenu);
    } else {
        initHamburgerMenu();
    }
    
    // También intentar inicializar después de un delay para asegurar que todos los elementos estén cargados
    setTimeout(initHamburgerMenu, 1000);
});
</script>`;
        
        // Insertar el script antes del cierre de </body>
        if (content.includes('</body>')) {
            const beforeBody = content;
            content = content.replace('</body>', hamburgerScript + '\n</body>');
            
            if (beforeBody !== content) {
                changesMade = true;
            }
        }
        
        // Guardar solo si se hicieron cambios
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Script de menú hamburguesa agregado: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  Sin cambios en script hamburguesa: ${filePath}`);
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
    
    console.log(`🔍 Agregando funcionalidad de menú hamburguesa a ${htmlFiles.length} archivos HTML`);
    
    let totalFixed = 0;
    
    htmlFiles.forEach(file => {
        const filePath = path.join(facultadDir, file);
        if (addHamburgerMenuScript(filePath)) {
            totalFixed++;
        }
    });
    
    console.log(`\n🎉 Proceso completado: ${totalFixed} archivos con funcionalidad de menú hamburguesa agregada.`);
}

// Ejecutar el proceso
processDirectory();