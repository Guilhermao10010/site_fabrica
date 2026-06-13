
        document.addEventListener("DOMContentLoaded", () => {
            // Animacao Wave
            const ctaText = document.querySelector('.nav-cta-text');
            if (ctaText) {
                const text = ctaText.textContent.trim();
                ctaText.innerHTML = '';
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = char;
                    }
                    span.style.animationDelay = `${i * 0.03}s`;
                    ctaText.appendChild(span);
                });
            }

            // Animacao Wave Vertical
            const waveVerticalTexts = document.querySelectorAll('.vertical-wave-text');
            waveVerticalTexts.forEach(el => {
                const text = el.textContent.trim();
                el.innerHTML = '';
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = char;
                    }
                    span.style.animationDelay = `${i * 0.1}s`;
                    el.appendChild(span);
                });
            });

            // Animacao Wave Experience Title
            const expTitleDiv = document.getElementById('exp-main-title');
            if (expTitleDiv) {
                const text = expTitleDiv.textContent.trim();
                expTitleDiv.innerHTML = '';
                const wrapper = document.createElement('span');
                wrapper.className = 'title-wrapper';
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    span.className = 'char-span';
                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = char;
                    }
                    span.style.animationDelay = `${1.2 + (i * 0.05)}s`;
                    wrapper.appendChild(span);
                });
                expTitleDiv.appendChild(wrapper);
            }

            // Magnetic Button Menu
            const magnetBtn = document.querySelector('.menu-btn');
            if (magnetBtn) {
                magnetBtn.addEventListener('mousemove', (e) => {
                    const rect = magnetBtn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    magnetBtn.style.transition = 'none';
                    magnetBtn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
                });
                magnetBtn.addEventListener('mouseleave', () => {
                    magnetBtn.style.transition = 'transform 0.3s ease, background 0.3s ease';
                    magnetBtn.style.transform = `translate(0px, 0px)`;
                });
            }

            // Custom Cursor Logic
            if (window.matchMedia('(pointer: fine)').matches) {
            const cursor = document.getElementById('customCursor');
            const serviceImages = document.querySelectorAll('.services-details-section .feature-image-placeholder');
            const videoPlaceholders = document.querySelectorAll('.video-placeholder');
            const heroWrapper = document.querySelector('.hero-wrapper');
            const muteBtn = document.getElementById('muteBtn');
            const heroSoundBtn = document.getElementById('heroSoundBtn');
            let soundEnabled = false;

            // Variável global para o áudio, instanciada apenas sob demanda
            let bgMusic = null;
            const playAudio = () => {
                if (!bgMusic) {
                    bgMusic = new Audio('musica.mp3');
                    bgMusic.volume = 0.02;
                    bgMusic.playbackRate = 0.7;
                    bgMusic.loop = true;
                }
                bgMusic.play().catch(err => console.error("Erro ao tocar áudio:", err));
            };

            if(cursor) {
                // Remove conteúdo apenas após a transição CSS terminar
                const cleanupCursor = () => {
                    setTimeout(() => {
                        if (!cursor.classList.contains('active')) {
                            cursor.innerHTML = "";
                            cursor.textContent = "";
                            cursor.classList.remove('sound-cursor');
                            cursor.style.fontSize = "";
                        }
                    }, 200);
                };

                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                });

                if (heroSoundBtn) {
                    heroSoundBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (!soundEnabled) {
                            soundEnabled = true;
                            playAudio();
                            cursor.classList.remove('active');
                            cleanupCursor();
                            if (muteBtn) muteBtn.style.display = 'flex';
                            heroSoundBtn.style.display = 'none';
                        }
                    });
                }

                if (heroWrapper) {
                    heroWrapper.addEventListener('mouseenter', () => {
                        if (!soundEnabled) {
                            cursor.innerHTML = "Clique em empresas<br>para abilitar o som";
                            cursor.style.fontSize = "12px";
                            cursor.classList.add('sound-cursor');
                            cursor.classList.add('active');
                        }
                    });
                    heroWrapper.addEventListener('mouseleave', () => {
                        cursor.classList.remove('active');
                        cleanupCursor();
                    });
                    heroWrapper.addEventListener('click', () => {
                        if (!soundEnabled) {
                            soundEnabled = true;
                            playAudio();
                            cursor.classList.remove('active');
                            cleanupCursor();
                            if (muteBtn) muteBtn.style.display = 'flex';
                            if (heroSoundBtn) heroSoundBtn.style.display = 'none';
                        }
                    });
                }

                if (muteBtn) {
                    muteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        soundEnabled = false;
                        muteBtn.style.display = 'none';
                        if (bgMusic) bgMusic.pause();
                        if (heroSoundBtn) heroSoundBtn.style.display = 'flex';
                    });
                }

                const scrollProgressBar = document.getElementById('scrollProgressBar');
                let scrollProgressTicking = false;
                window.addEventListener('scroll', () => {
                    if (!scrollProgressTicking) {
                        window.requestAnimationFrame(() => {
                            const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
                            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                            const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
                            if(scrollProgressBar) {
                                scrollProgressBar.style.height = scrolled;
                            }
                            scrollProgressTicking = false;
                        });
                        scrollProgressTicking = true;
                    }
                });

                serviceImages.forEach(img => {
                    img.addEventListener('mouseenter', (e) => {
                        cursor.textContent = "COMO FUNCIONA";
                        cursor.style.fontSize = "";
                        cursor.classList.remove('sound-cursor');
                        cursor.classList.add('active');
                        cursor.style.left = e.clientX + 'px';
                        cursor.style.top = e.clientY + 'px';
                    });
                    img.addEventListener('mouseleave', () => {
                        cursor.classList.remove('active');
                        cleanupCursor();
                    });
                });

                videoPlaceholders.forEach(img => {
                    img.addEventListener('mouseenter', (e) => {
                        cursor.textContent = "ASSISTA O VÍDEO";
                        cursor.style.fontSize = "";
                        cursor.classList.remove('sound-cursor');
                        cursor.classList.add('active');
                        cursor.style.left = e.clientX + 'px';
                        cursor.style.top = e.clientY + 'px';
                    });
                    img.addEventListener('mouseleave', () => {
                        cursor.classList.remove('active');
                        cleanupCursor();
                    });
                });
            }
            }

            const viewer = document.getElementById("my-spline");
            if (window.innerWidth > 768) {
                const splineScript = document.createElement('script');
                splineScript.type = 'module';
                splineScript.src = 'https://unpkg.com/@splinetool/viewer@1.9.54/build/spline-viewer.js';
                document.head.appendChild(splineScript);

                if (viewer) {
                    const baseUrl = "https://prod.spline.design/5dwVYLACMauo6Eyk/scene.splinecode";
                    viewer.setAttribute("url", baseUrl + "?t=" + new Date().getTime());
                    
                    const hideInterval = setInterval(() => {
                        if (viewer.shadowRoot && viewer.shadowRoot.querySelector("#logo")) {
                            const style = document.createElement("style");
                            style.innerHTML = "#logo { display: none !important; opacity: 0 !important; visibility: hidden !important; }";
                            viewer.shadowRoot.appendChild(style);
                            clearInterval(hideInterval);
                        }
                    }, 100);
                    setTimeout(() => clearInterval(hideInterval), 5000);
                }
            } else {
                if(viewer) viewer.remove();
            }
        });
    

                function sendWhatsApp(e) {
                    e.preventDefault();
                    const nome = document.getElementById('formNome').value;
                    const email = document.getElementById('formEmail').value;
                    const telefone = document.getElementById('formTelefone').value;
                    const servico = document.getElementById('service-select').value;
                    
                    const numeroTelefone = "5562998511232";
                    const mensagem = `Olá, me chamo ${nome}. Tenho interesse em ${servico || 'seus serviços'}. Meu email é ${email} e meu WhatsApp é ${telefone}.`;
                    
                    window.open(`https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`, '_blank');
                }
            

        document.addEventListener("DOMContentLoaded", () => {
            const menuBtn = document.querySelector('.menu-btn');
            const menuOverlay = document.getElementById('menuOverlay');

            if(menuBtn && menuOverlay) {
                menuBtn.addEventListener('click', () => {
                    const isOpening = !menuOverlay.classList.contains('active');
                    if (isOpening) {
                        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                        if (scrollbarWidth > 0) {
                            document.body.style.paddingRight = `${scrollbarWidth}px`;
                            const header = document.querySelector('.site-header');
                            if (header) {
                                const currentPadding = parseInt(window.getComputedStyle(header).paddingRight || '0');
                                header.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
                            }
                        }
                        document.body.style.overflow = 'hidden'; // prevent scrolling underneath
                    } else {
                        document.body.style.paddingRight = '';
                        const header = document.querySelector('.site-header');
                        if (header) header.style.paddingRight = '';
                        document.body.style.overflow = '';
                    }
                    menuOverlay.classList.toggle('active');
                    menuBtn.classList.toggle('open');
                    document.body.classList.toggle('menu-open');
                });
            }
        
            // Experience Scrolljacking Logic
            const expContainer = document.querySelector('.experience-scroll-container');
            if (expContainer) {
                let scrollExpTicking = false;
                window.addEventListener('scroll', () => {
                    if (window.innerWidth <= 900) return;
                    
                    if (!scrollExpTicking) {
                        window.requestAnimationFrame(() => {
                            const rect = expContainer.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            
                            let progress = 0;
                            if (rect.top <= 0) {
                                progress = Math.abs(rect.top) / (rect.height - windowHeight);
                            }
                            progress = Math.max(0, Math.min(1, progress));

                            // Handle Main Image Full Open/Close Animation
                            const mainImg = document.getElementById('exp-main-img');
                            if (mainImg) {
                                // Expand only during the active parts of each section, retract in the gaps
                                const isExpanded = 
                                    (progress >= 0.05 && progress <= 0.28) || 
                                    (progress >= 0.38 && progress <= 0.61) || 
                                    (progress >= 0.71 && progress <= 0.95);
                                    
                                if (isExpanded) {
                                    mainImg.style.opacity = '1';
                                    mainImg.style.transform = 'translate(-60%, -50%) rotate(-55deg) translateY(0%) scaleY(1) scaleX(1)';
                                } else {
                                    mainImg.style.opacity = '0.15';
                                    mainImg.style.transform = 'translate(-60%, -50%) rotate(-55deg) translateY(50%) scaleY(0.01) scaleX(1)';
                                }
                            }

                            let activeIndex = 1;
                            if (progress >= 0.33 && progress < 0.66) {
                                activeIndex = 2;
                            } else if (progress >= 0.66) {
                                activeIndex = 3;
                            }

                            const expImgSrc = document.getElementById('exp-img-src');
                            if (expImgSrc) {
                                if (activeIndex === 1 && !expImgSrc.src.includes('imagem_robotica.webp')) {
                                    expImgSrc.src = 'assets/images/imagem_robotica.webp';
                                } else if (activeIndex === 2 && !expImgSrc.src.includes('negocio_imagem.webp')) {
                                    expImgSrc.src = 'assets/images/negocio_imagem.webp';
                                } else if (activeIndex === 3 && !expImgSrc.src.includes('formacao_imagem.webp')) {
                                    expImgSrc.src = 'assets/images/formacao_imagem.webp';
                                }
                            }

                            for(let i = 1; i <= 3; i++) {
                                const bg = document.getElementById(`exp-bg-${i}`);
                                const info = document.getElementById(`exp-info-${i}`);
                                
                                const isActive = (i === activeIndex);
                                
                                if (bg) {
                                    if (isActive) {
                                        bg.style.clipPath = 'polygon(-20% -50%, 120% -50%, 120% 150%, -20% 150%)';
                                        bg.style.transform = 'translate(-50%, -50%)';
                                    } else {
                                        bg.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
                                        bg.style.transform = 'translate(-50%, 50%)';
                                    }
                                }
                                if (info) {
                                    if (isActive) {
                                        info.style.clipPath = 'polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)';
                                        info.style.transform = 'translateY(0)';
                                    } else {
                                        info.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
                                        info.style.transform = 'translateY(40px)';
                                    }
                                    info.style.opacity = '1'; // Never fade, pure mask
                                    info.style.pointerEvents = isActive ? 'auto' : 'none';
                                }
                            }
                            scrollExpTicking = false;
                        });
                        scrollExpTicking = true;
                    }
                });
            }
            
            // Experience Title Entrance
            const expTitle = document.getElementById('exp-main-title');
            if (expContainer && expTitle) {
                let scrollTitleTicking = false;
                window.addEventListener('scroll', () => {
                    if (!scrollTitleTicking) {
                        window.requestAnimationFrame(() => {
                            const rect = expContainer.getBoundingClientRect();
                            if (rect.top < window.innerHeight * 0.8) {
                                expTitle.classList.add('visible');
                            }
                            scrollTitleTicking = false;
                        });
                        scrollTitleTicking = true;
                    }
                });
            }
            
            // Typewriter effect setup
            const twElements = document.querySelectorAll('.typewriter-text');
            twElements.forEach(el => {
                const text = el.textContent.trim();
                el.innerHTML = '';
                let charIndex = 0;
                
                text.split(' ').forEach((word, wordIndex, wordsArray) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.whiteSpace = 'nowrap';
                    
                    word.split('').forEach((char) => {
                        const span = document.createElement('span');
                        span.className = 'tw-char';
                        if (char === ' ') {
                            span.innerHTML = '&nbsp;';
                        } else {
                            span.textContent = char;
                        }
                        span.style.animationDelay = `${charIndex * 0.03}s`;
                        wordSpan.appendChild(span);
                        charIndex++;
                    });
                    
                    el.appendChild(wordSpan);
                    
                    if (wordIndex < wordsArray.length - 1) {
                        const spaceSpan = document.createElement('span');
                        spaceSpan.innerHTML = '&nbsp;';
                        spaceSpan.style.display = 'inline-block';
                        el.appendChild(spaceSpan);
                    }
                });
            });

            // Button Wave Text setup
            const btnWaveTexts = document.querySelectorAll('.btn-wave-text');
            btnWaveTexts.forEach(el => {
                const text = el.textContent.trim();
                el.innerHTML = '';
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = char;
                    }
                    span.style.transitionDelay = `${i * 0.02}s`;
                    el.appendChild(span);
                });
            });

            // Placeholder typing effect on hover
            const formInputs = document.querySelectorAll('.form-input:not(select)');
            formInputs.forEach(input => {
                let originalText = input.getAttribute('placeholder') || '';
                let typeInterval;
                
                input.addEventListener('mouseenter', () => {
                    if (!originalText || input.value) return;
                    clearInterval(typeInterval);
                    
                    let currentText = '';
                    let index = 0;
                    let mistakeMade = false;
                    let mistakeIndex = Math.floor(originalText.length / 2);
                    
                    input.setAttribute('placeholder', '');
                    
                    typeInterval = setInterval(() => {
                        if (index === mistakeIndex && !mistakeMade) {
                            currentText += 'w';
                            mistakeMade = true;
                        } else if (mistakeMade && currentText.endsWith('w')) {
                            currentText = currentText.slice(0, -1);
                        } else if (index < originalText.length) {
                            currentText += originalText[index];
                            index++;
                        }
                        
                        input.setAttribute('placeholder', currentText);
                        
                        if (index >= originalText.length && mistakeMade && !currentText.endsWith('w')) {
                            clearInterval(typeInterval);
                        }
                    }, 80);
                });
                
                input.addEventListener('mouseleave', () => {
                    clearInterval(typeInterval);
                    input.setAttribute('placeholder', originalText);
                });
            });

            // Select Custom Overlay Logic
            const serviceSelect = document.getElementById('service-select');
            const overlayText = document.getElementById('select-overlay-text');
            if (serviceSelect && overlayText) {
                serviceSelect.addEventListener('change', () => {
                    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                    const text = selectedOption.text;
                    if (text.length > 1) {
                        const firstChar = text[0];
                        const middleText = text.slice(1, -1);
                        const lastChar = text[text.length - 1];
                        overlayText.innerHTML = `<span class="select-char-jump">${firstChar}</span>${middleText}<span class="select-char-jump">${lastChar}</span>`;
                    } else {
                        overlayText.textContent = text;
                    }
                    overlayText.parentElement.classList.add('has-value');
                });
            }

            // Mouse blur circle logic (lerp for smooth trail)
            const blurCircle = document.getElementById('mouse-blur-circle');
            const aboutSection = document.getElementById('secao-sobre');
            
            if (blurCircle && aboutSection) {
                let mouseX = window.innerWidth / 2;
                let mouseY = window.innerHeight / 2;
                let circleX = mouseX;
                let circleY = mouseY;
                let isHovering = false;

                aboutSection.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                });
                
                aboutSection.addEventListener('mouseleave', () => {
                    blurCircle.style.opacity = '0';
                    isHovering = false;
                });
                
                aboutSection.addEventListener('mouseenter', () => {
                    blurCircle.style.opacity = '1';
                    isHovering = true;
                });

                function animateCircle() {
                    if (isHovering) {
                        circleX += (mouseX - circleX) * 0.12;
                        circleY += (mouseY - circleY) * 0.12;
                        blurCircle.style.left = circleX + 'px';
                        blurCircle.style.top = circleY + 'px';
                    }
                    requestAnimationFrame(animateCircle);
                }
                animateCircle();
            }

            // Magnetic effect for about images
            const aboutImages = document.querySelectorAll('.about-image-placeholder');
            aboutImages.forEach(img => {
                img.addEventListener('mousemove', (e) => {
                    const rect = img.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const moveX = (x - centerX) / 8;
                    const moveY = (y - centerY) / 8;
                    
                    img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
                });
                
                img.addEventListener('mouseleave', () => {
                    img.style.transform = `translate(0px, 0px) scale(1)`;
                });
            });

            // Scroll Fade Animations (Load/Unload elements via scroll)
            const fadeElements = document.querySelectorAll('.services-left-area, .services-list, .feature-content, .feature-image-placeholder, .contact-title, .contact-subtitle, .contact-form, .contact-image-placeholder, .footer-left, .footer-col');
            
            fadeElements.forEach(el => {
                el.classList.add('scroll-fade-in');
            });

            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.05,
                rootMargin: "0px 0px 0px 0px"
            });
            
            // Observando todos os elementos com animações
            const animatedElements = document.querySelectorAll('.scroll-fade-in, .anim-fade-up, .anim-blur-reveal, .anim-scale-in, .anim-slide-left, .anim-slide-right');
            animatedElements.forEach(el => scrollObserver.observe(el));

            // Hover and Accordion Logic for Services
            const srvItems = document.querySelectorAll('.service-item');

            srvItems.forEach(item => {
                // Hover logic
                item.addEventListener('mouseenter', () => {
                    const targetId = item.getAttribute('data-hover-target');
                    if (targetId) {
                        const targetImg = document.getElementById(targetId);
                        if (targetImg) targetImg.classList.add('active');
                    }
                });
                item.addEventListener('mouseleave', () => {
                    // Only hide image if item is NOT open
                    if (!item.classList.contains('open')) {
                        const targetId = item.getAttribute('data-hover-target');
                        if (targetId) {
                            const targetImg = document.getElementById(targetId);
                            if (targetImg) targetImg.classList.remove('active');
                        }
                    }
                });

                // Click logic for Accordion
                item.addEventListener('click', () => {
                    const isOpen = item.classList.contains('open');

                    // Close all others and hide their images
                    srvItems.forEach(other => {
                        other.classList.remove('open');
                        const otherTargetId = other.getAttribute('data-hover-target');
                        if (otherTargetId) {
                            const otherImg = document.getElementById(otherTargetId);
                            if (otherImg) otherImg.classList.remove('active');
                        }
                    });

                    // Toggle current
                    if (!isOpen) {
                        item.classList.add('open');
                        const targetId = item.getAttribute('data-hover-target');
                        if (targetId) {
                            const targetImg = document.getElementById(targetId);
                            if (targetImg) targetImg.classList.add('active');
                        }
                    }
                });
            });

});

    // Close menu when any menu link or nav-cta is clicked
    (function() {
        function closeMenu() {
            const overlay = document.getElementById('menuOverlay');
            const btn = document.querySelector('.menu-btn');
            if (!overlay) return;
            overlay.classList.remove('active');
            overlay.classList.remove('open');
            document.body.classList.remove('menu-open');
            document.body.style.paddingRight = '';
            const header = document.querySelector('.site-header');
            if (header) header.style.paddingRight = '';
            document.body.style.overflow = '';
            if (btn) {
                btn.setAttribute('aria-label', 'Abrir menu');
                btn.classList.remove('is-open');
                btn.classList.remove('open');
            }
        }

        // Menu section links — close menu first, then scroll
        document.querySelectorAll('.menu-links a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = link.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    closeMenu();
                    setTimeout(function() {
                        var target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 400); // wait for menu close animation
                } else {
                    setTimeout(closeMenu, 60);
                }
            });
        });

        // "Venha nos conhecer" button
        var navCta = document.getElementById('navCta');
        if (navCta) {
            navCta.addEventListener('click', function(e) {
                var href = navCta.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    closeMenu();
                    setTimeout(function() {
                        var target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 400);
                } else {
                    closeMenu();
                }
            });
        }
    })();
    

        (function() {
            const screen = document.getElementById('loading-screen');
            const label  = document.getElementById('loaderLabel');
            const bar    = document.getElementById('loaderProgressBar');

            // Wrap each char in a span for wave
            if (label) {
                const text = label.textContent;
                label.innerHTML = '';
                text.split('').forEach((char, i) => {
                    const s = document.createElement('span');
                    s.textContent = char === ' ' ? '\u00A0' : char;
                    s.style.animationDelay = `${1 + i * 0.07}s`;
                    label.appendChild(s);
                });
            }

            let progress = 0;
            let dismissed = false;

            function setProgress(p) {
                progress = Math.min(p, 100);
                if (bar) bar.style.width = progress + '%';
            }

            function dismiss() {
                if (dismissed) return;
                dismissed = true;
                setProgress(100);
                setTimeout(() => {
                    if (screen) screen.classList.add('hidden');
                    // Remove from DOM after transition
                    setTimeout(() => { 
                        if (screen) screen.remove(); 
                        window.dispatchEvent(new Event('scroll'));
                    }, 900);
                }, 300);
            }

            // Simulate progress until real load
            const fakeTimer = setInterval(() => {
                if (progress < 85) setProgress(progress + Math.random() * 12);
            }, 220);

            window.addEventListener('load', () => {
                clearInterval(fakeTimer);
                setProgress(100);
                // small pause so user sees 100% before dismissal
                setTimeout(dismiss, 400);
            });

            // Fallback: dismiss after 6s even if load event doesn't fire
            setTimeout(dismiss, 6000);
        })();
    

        // Hover video play from beginning
        document.addEventListener('DOMContentLoaded', () => {
            const placeholders = document.querySelectorAll('.feature-image-placeholder');
            placeholders.forEach(placeholder => {
                const video = placeholder.querySelector('video.hover-video');
                if (video) {
                    placeholder.addEventListener('mouseenter', () => {
                        video.currentTime = 0;
                        video.play().catch(e => console.log('Video play failed:', e));
                    });
                    placeholder.addEventListener('mouseleave', () => {
                        video.pause();
                    });
                }
            });
        });
    


// L�gica para o v�deo principal tocar no hover
const mainVideoPlaceholder = document.getElementById('main-video-placeholder');
const mainHoverVideo = document.getElementById('main-hover-video');
if (mainVideoPlaceholder && mainHoverVideo) {
    mainVideoPlaceholder.addEventListener('mouseenter', () => {
        if (mainHoverVideo.getAttribute('src') && mainHoverVideo.getAttribute('src').trim() !== '') {
            mainHoverVideo.style.opacity = '1';
            mainHoverVideo.play().catch(e => console.warn('Erro ao tocar v�deo:', e));
        }
    });
    mainVideoPlaceholder.addEventListener('mouseleave', () => {
        if (mainHoverVideo.getAttribute('src') && mainHoverVideo.getAttribute('src').trim() !== '') {
            mainHoverVideo.style.opacity = '0';
            mainHoverVideo.pause();
        }
    });
}


// Vimeo Logic
const vimeoIframe = document.getElementById('main-vimeo-video');
if (mainVideoPlaceholder && vimeoIframe && typeof Vimeo !== 'undefined') {
    const player = new Vimeo.Player(vimeoIframe);
    mainVideoPlaceholder.addEventListener('mouseenter', () => {
        vimeoIframe.style.opacity = '1';
        player.play().catch(e => console.warn('Erro ao tocar Vimeo:', e));
    });
    mainVideoPlaceholder.addEventListener('mouseleave', () => {
        vimeoIframe.style.opacity = '0';
        player.pause();
    });
}

// Lógica do Modal de Vídeo
const videoModal = document.getElementById('videoModal');
const videoModalOverlay = document.getElementById('videoModalOverlay');
const videoModalClose = document.getElementById('videoModalClose');
const modalVimeoIframe = document.getElementById('modal-vimeo-video');

if (mainVideoPlaceholder && videoModal && modalVimeoIframe && typeof Vimeo !== 'undefined') {
    const bgPlayer = new Vimeo.Player(vimeoIframe);
    const modalPlayer = new Vimeo.Player(modalVimeoIframe);

    mainVideoPlaceholder.addEventListener('click', () => {
        videoModal.classList.add('active');
        bgPlayer.pause();
        modalPlayer.play().catch(e => console.warn('Erro ao tocar Vimeo Modal:', e));
    });

    const closeModal = () => {
        videoModal.classList.remove('active');
        modalPlayer.pause();
    };

    videoModalClose.addEventListener('click', closeModal);
    videoModalOverlay.addEventListener('click', closeModal);
}

