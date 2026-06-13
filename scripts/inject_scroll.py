import sys
import re

def run():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update CSS
    old_css_section = '''        .experience-section {
            position: relative;
            z-index: 10;
            background-color: var(--color-bg);
            height: 100vh;
            min-height: 800px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }'''

    new_css_section = '''        .experience-scroll-container {
            position: relative;
            z-index: 10;
            height: 300vh; /* 3 sections worth of scroll */
            background-color: var(--color-bg);
        }

        .experience-sticky {
            position: sticky;
            top: 0;
            height: 100vh;
            min-height: 800px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        
        .experience-bg-text, .experience-info, .experience-image-placeholder {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        '''
    
    if old_css_section in content:
        content = content.replace(old_css_section, new_css_section)

    # 2. Extract and Remove the 3 old sections
    # They start with <section class="experience-section"> and end with </section>
    
    pattern = r'<section class="experience-section">.*?</section>'
    matches = re.findall(pattern, content, flags=re.DOTALL)
    
    if len(matches) == 3:
        for match in matches:
            content = content.replace(match, '', 1)
        
        # 3. Create the new scroll container HTML
        new_html = '''
    <section class="experience-scroll-container">
        <div class="experience-sticky">
            <!-- Background Texts -->
            <span class="experience-bg-text" id="exp-bg-1">ROBÓTICA</span>
            <span class="experience-bg-text" id="exp-bg-2" style="opacity: 0;">NEGÓCIOS</span>
            <span class="experience-bg-text" id="exp-bg-3" style="opacity: 0;">FORMAÇÃO</span>
            
            <div class="experience-content">
                <div class="experience-title" style="z-index: 4; position: absolute; top: 120px; left: 105px;">NOSSA EXPERIÊNCIA</div>
                
                <!-- Images -->
                <div class="experience-image-placeholder" id="exp-img-1" style="z-index: 2;"></div>
                <div class="experience-image-placeholder" id="exp-img-2" style="z-index: 2; opacity: 0; transform: translate(-60%, -50%) rotate(-40deg) scale(0.95);"></div>
                <div class="experience-image-placeholder" id="exp-img-3" style="z-index: 2; opacity: 0; transform: translate(-60%, -50%) rotate(-50deg) scale(0.95);"></div>
                
                <!-- Info Blocks -->
                <div class="experience-info" id="exp-info-1">
                    <p class="experience-desc">Campeões nacionais da F1 in Schools e premiados no mundial em Singapura. Uma base forjada na precisão e alta performance das competições de robótica.</p>
                    <a href="#" class="experience-link">Veja nossa história completa</a>
                </div>
                <div class="experience-info" id="exp-info-2" style="opacity: 0; pointer-events: none;">
                    <p class="experience-desc">Lideramos operações reais em tecnologia, IA e seguros. Sabemos exatamente o que o seu projeto precisa porque estruturamos e escalamos negócios na prática.</p>
                    <a href="#" class="experience-link">Veja nossa história completa</a>
                </div>
                <div class="experience-info" id="exp-info-3" style="opacity: 0; pointer-events: none;">
                    <p class="experience-desc">Aliamos o raciocínio lógico da Engenharia ao desenvolvimento web avançado, construindo ecossistemas digitais com tecnologias modernas como React, TypeScript e Inteligência Artificial.</p>
                    <a href="#" class="experience-link">Veja nossa história completa</a>
                </div>
                
                <div class="scroll-indicator" style="position: absolute; right: 40px; bottom: 40px; z-index: 4;" aria-label="Role para baixo">
                    <span class="scroll-label">DESÇA</span>
                    <div class="scroll-line"></div>
                </div>
            </div>
        </div>
    </section>
'''
        # Insert new html after video-section
        video_end = '</section>'
        idx_video = content.find('<section class="video-section">')
        if idx_video != -1:
            idx_video_end = content.find(video_end, idx_video) + len(video_end)
            content = content[:idx_video_end] + new_html + content[idx_video_end:]

        # 4. Inject JS for scroll effect
        scroll_js = '''
            // Experience Scrolljacking Logic
            const expContainer = document.querySelector('.experience-scroll-container');
            if (expContainer) {
                window.addEventListener('scroll', () => {
                    const rect = expContainer.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    let progress = 0;
                    if (rect.top <= 0) {
                        progress = Math.abs(rect.top) / (rect.height - windowHeight);
                    }
                    progress = Math.max(0, Math.min(1, progress));

                    let activeIndex = 1;
                    if (progress >= 0.33 && progress < 0.66) {
                        activeIndex = 2;
                    } else if (progress >= 0.66) {
                        activeIndex = 3;
                    }

                    for(let i = 1; i <= 3; i++) {
                        const bg = document.getElementById(`exp-bg-${i}`);
                        const info = document.getElementById(`exp-info-${i}`);
                        const img = document.getElementById(`exp-img-${i}`);
                        
                        const isActive = (i === activeIndex);
                        
                        if (bg) {
                            bg.style.opacity = isActive ? '1' : '0';
                            bg.style.transform = isActive ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)';
                        }
                        if (info) {
                            info.style.opacity = isActive ? '1' : '0';
                            info.style.pointerEvents = isActive ? 'auto' : 'none';
                            info.style.transform = isActive ? 'translateY(0)' : 'translateY(20px)';
                        }
                        if (img) {
                            img.style.opacity = isActive ? '1' : '0';
                            img.style.transform = isActive ? 'translate(-60%, -50%) rotate(-45deg) scale(1)' : 'translate(-60%, -50%) rotate(-40deg) scale(0.95)';
                        }
                    }
                });
            }
'''
        # Inject JS before closing DOMContentLoaded
        idx_js = content.rfind('});\n    </script>')
        if idx_js != -1:
            content = content[:idx_js] + scroll_js + content[idx_js:]

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print(f"Failed to find 3 sections. Found {len(matches)}")

if __name__ == '__main__':
    run()
