// ==UserScript==
// @name         ChatGPT Premium Soft Gray Dark Theme (ChatGPT 舒适灰护眼暗黑主题)
// @namespace    https://github.com/antigravity/chatgpt-soft-dark-theme
// @version      3.3.0
// @description  Change ChatGPT's background color in dark mode to a premium soft gray (#3c3c3c) to reduce eye strain. (将ChatGPT暗黑模式与明亮模式的背景及字体均重设为医学级多套柔和护眼主题，完美支持行内代码块 hexyard-postgres 动态调色)
// @author       Antigravity
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const STYLE_ID = 'chatgpt-soft-dark-theme-styles';
    const SWITCHER_STYLE_ID = 'chatgpt-theme-switcher-styles';
    const SWITCHER_ID = 'chatgpt-eye-theme-switcher-container';

    // 1. Define all scientifically-designed ophthalmological Themes (Light & Dark)
    const THEMES = {
        // --- DARK PROTECTION THEMES ---
        SOFT_GRAY: {
            isDark: true,
            name: '莫兰迪护眼灰',
            desc: '平衡灰度，夜间极致舒适',
            dotColor: '#3c3c3c',
            bg: '#3c3c3c',
            sidebar: '#2d2d2d',
            highlight: '#4a4a4a',
            input: '#242424',
            codeBg: '#1e1e1e',
            text: '#ececf1',
            textMuted: '#c7c7cf'
        },
        FOREST_GREEN: {
            isDark: true,
            name: '极地苍草森林绿',
            desc: '近视睫状肌放松首选 (低折射率)',
            dotColor: '#222925',
            bg: '#222925',
            sidebar: '#191f1c',
            highlight: '#2e3732',
            input: '#151b18',
            codeBg: '#121715',
            text: '#e2e8e5',
            textMuted: '#b5c2bc'
        },
        SEPIA_TEA: {
            isDark: true,
            name: '暖沙木槿咖茶褐',
            desc: '散光防虚影重影首选 (防眩光)',
            dotColor: '#332d29',
            bg: '#332d29',
            sidebar: '#27221e',
            highlight: '#423b36',
            input: '#1e1a17',
            codeBg: '#1a1715',
            text: '#eae4de',
            textMuted: '#c2b6ac'
        },
        DEEP_OCEAN: {
            isDark: true,
            name: '深海冥王幽澜蓝',
            desc: '极低频蓝光反射，深邃静谧',
            dotColor: '#1d232c',
            bg: '#1d232c',
            sidebar: '#151b22',
            highlight: '#2c3543',
            input: '#12171e',
            codeBg: '#0e1218',
            text: '#e1e7f0',
            textMuted: '#b4c3d4'
        },
        TWILIGHT_PURPLE: {
            isDark: true,
            name: '暮光极夜暗霞紫',
            desc: '极低能耗波段，唯美柔和',
            dotColor: '#2b2633',
            bg: '#2b2633',
            sidebar: '#201c27',
            highlight: '#3d3649',
            input: '#18151e',
            codeBg: '#131118',
            text: '#ebdff5',
            textMuted: '#c3b6d2'
        },
        INK_CHARCOAL: {
            isDark: true,
            name: '暗黛青润墨竹灰',
            desc: '黛青墨竹深灰底，极低字底对比度，散光友好',
            dotColor: '#282e30',
            bg: '#282e30',
            sidebar: '#1e2325',
            highlight: '#333b3e',
            input: '#1a1e20',
            codeBg: '#15181a',
            text: '#d5dedf',  // Soft mineral cyan-white
            textMuted: '#a6b2b4'
        },
        MOONLIT_SHADOW: {
            isDark: true,
            name: '月影柔和灰褐底',
            desc: '温润月影灰褐底，仿古籍低对比，夜间极润',
            dotColor: '#34302d',
            bg: '#34302d',
            sidebar: '#282522',
            highlight: '#403b37',
            input: '#201d1c',
            codeBg: '#1a1817',
            text: '#e4dfda',  // Soft parchment-gray
            textMuted: '#bdaea4'
        },

        // --- LIGHT PROTECTION THEMES ---
        WARM_PAPER: {
            isDark: false,
            name: '古典沙杏羊皮纸',
            desc: '暖调抗蓝光，纸张般阅读质感',
            dotColor: '#f4eedf',
            bg: '#f4eedf',
            sidebar: '#e6ddca',
            highlight: '#dcd1bd',
            input: '#fbf9f5',
            text: '#2e2b26',  // Warm bronze text
            textMuted: '#6e675b'
        },
        MINT_TEA: {
            isDark: false,
            name: '晨曦绿茶薄荷绿',
            desc: '温和日光波，舒张日间视疲劳',
            dotColor: '#eaf2ec',
            bg: '#eaf2ec',
            sidebar: '#dae7dd',
            highlight: '#ccdcd0',
            input: '#f5faf7',
            text: '#1b2920',  // Deep forest green-black text
            textMuted: '#4d5e54'
        },
        GLACIER_BLUE: {
            isDark: false,
            name: '静谧冰川远山蓝',
            desc: '冰川冷色调，冷静舒适的屏显',
            dotColor: '#ecf2f5',
            bg: '#ecf2f5',
            sidebar: '#d9e5ea',
            highlight: '#cbdce2',
            input: '#f5fafc',
            text: '#1a272d',  // Deep ocean navy-black text
            textMuted: '#4e5d66'
        },
        AUTUMN_OLIVE: {
            isDark: false,
            name: '秋木苍松银橄绿',
            desc: '低饱和橄榄色，日间防眩光重影',
            dotColor: '#f0eedb',
            bg: '#f0eedb',
            sidebar: '#e1deca',
            highlight: '#d4d0b7',
            input: '#f9f7ea',
            text: '#32382c',  // Deep olive-brown text
            textMuted: '#6e7362'
        },
        PEACH_CREAM: {
            isDark: false,
            name: '温润桃花流砂粉',
            desc: '低对比温润桃红，强效缓解视疲劳',
            dotColor: '#f7edf0',
            bg: '#f7edf0',
            sidebar: '#ead9dd',
            highlight: '#decacb',
            input: '#fdfafb',
            text: '#3b2c2f',  // Deep aubergine-plum text
            textMuted: '#736163'
        },
        OATMEAL_CREAM: {
            isDark: false,
            name: '麦香柔驼燕麦黄',
            desc: '温糯燕麦柔黄，比羊皮纸更低亮度，散光伴侣',
            dotColor: '#f2ebe1',
            bg: '#f2ebe1',
            sidebar: '#e3dbcf',
            highlight: '#d6ccbf',
            input: '#faf7f3',
            text: '#3c352a',  // Deep warm chocolate-brown text
            textMuted: '#756a5c'
        },
        LAVENDER_MIST: {
            isDark: false,
            name: '日暮霞光柔薰紫',
            desc: '唯美淡薰衣草紫，波段温和，极富艺术感',
            dotColor: '#f3eef7',
            bg: '#f3eef7',
            sidebar: '#e5dde8',
            highlight: '#d9cfdc',
            input: '#fbf9fc',
            text: '#34263a',  // Deep elegant purple-black text
            textMuted: '#705f77'
        }
    };

    // Load active themes from localStorage
    let activeDarkThemeKey = localStorage.getItem('chatgpt-dark-theme-key') || 'SOFT_GRAY';
    if (!THEMES[activeDarkThemeKey] || !THEMES[activeDarkThemeKey].isDark) activeDarkThemeKey = 'SOFT_GRAY';

    let activeLightThemeKey = localStorage.getItem('chatgpt-light-theme-key') || 'VANILLA_LIGHT';
    if (activeLightThemeKey !== 'VANILLA_LIGHT' && (!THEMES[activeLightThemeKey] || THEMES[activeLightThemeKey].isDark)) {
        activeLightThemeKey = 'VANILLA_LIGHT';
    }

    // Generate custom CSS based on current active theme and mode status
    function getThemeCss(theme, isDark) {
        if (isDark) {
            // NIGHT MODE CUSTOM CSS
            return `
                /* ==========================================
                   1. CORE CSS VARIABLE OVERRIDES (DARK MODE)
                   ========================================== */
                .dark,
                html.dark,
                [data-theme="dark"],
                html[data-oled] .dark,
                html[data-oled="true"] .dark {
                    /* Main backgrounds */
                    --main-surface-primary: ${theme.bg} !important;
                    --bg-primary: ${theme.bg} !important;
                    
                    /* Sidebar and side panel backgrounds */
                    --sidebar-surface-primary: ${theme.sidebar} !important;
                    --main-surface-secondary: ${theme.sidebar} !important;
                    --bg-secondary: ${theme.sidebar} !important;
                    --bg-elevated-secondary: ${theme.sidebar} !important;
                    
                    /* Cards, hovers, bubbles, and elevated items */
                    --main-surface-tertiary: ${theme.highlight} !important;
                    --bg-tertiary: ${theme.highlight} !important;
                    --message-surface: ${theme.highlight} !important;
                    --bg-elevated-primary: ${theme.input} !important;
                    
                    /* Custom text / icon readability tweaks */
                    --text-primary: ${theme.text} !important;
                    --text-secondary: ${theme.textMuted} !important;
                    
                    /* Border variable overrides to softer semi-transparent white */
                    --border-light: rgba(255, 255, 255, 0.08) !important;
                    --border-medium: rgba(255, 255, 255, 0.12) !important;
                    --border-heavy: rgba(255, 255, 255, 0.16) !important;
                }

                /* ==========================================
                   2. HIGH-SPECIFICITY OVERRIDES (DARK MODE)
                   ========================================== */
                .dark body,
                .dark main,
                .dark #__next,
                .dark .bg-token-main-surface-primary,
                .dark [class*="bg-token-main-surface-primary"] {
                    background-color: ${theme.bg} !important;
                }

                .dark .bg-gray-900.sidebar,
                .dark [class*="sidebar"] {
                    background-color: ${theme.sidebar} !important;
                }

                .dark textarea,
                .dark input[type="text"] {
                    background-color: ${theme.input} !important;
                }

                /* ==========================================
                   3. NO SHADOW HALOS & INLINE CODE STYLING (V3.1.0 FIXED inline code)
                   ========================================== */
                .dark pre,
                .dark article,
                .dark .bg-token-main-surface-primary,
                .dark .bg-token-main-surface-secondary {
                    box-shadow: none !important;
                    --tw-shadow: 0 0 #0000 !important;
                    --tw-shadow-colored: 0 0 #0000 !important;
                    --tw-ring-offset-shadow: 0 0 #0000 !important;
                    --tw-ring-shadow: 0 0 #0000 !important;
                }

                /* Strictly target INLINE CODE blocks (hexyard-postgres, etc.) */
                .dark code {
                    background-color: rgba(255, 255, 255, 0.10) !important;
                    color: ${theme.text} !important;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    border-radius: 6px !important;
                    padding: 2px 6px !important;
                    font-size: 0.9em !important;
                    font-family: Menlo, Monaco, Consolas, "Courier New", monospace !important;
                    box-shadow: none !important;
                }

                .dark pre code {
                    background-color: transparent !important;
                    color: inherit !important;
                    border: none !important;
                    border-radius: 0 !important;
                    padding: 0 !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    box-shadow: none !important;
                }

                .dark div.absolute,
                .dark [role="menu"],
                .dark [class*="popover"],
                .dark .shadow-lg {
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.35) !important;
                }

                /* ==========================================
                   4. ULTRA-PRECISE MODERN CODE BLOCK STYLING
                   ========================================== */
                .dark pre.overflow-visible\!,
                .dark pre.px-0\!,
                .dark pre:has(> div) {
                    background-color: transparent !important;
                    background: transparent !important;
                    border: none !important;
                    border-radius: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                }

                .dark div.rounded-3xl:has(.cm-editor),
                .dark div.border-radius-3xl:has(.cm-editor) {
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    box-shadow: none !important;
                }

                .dark div.rounded-3xl:has(.cm-editor) > div.bg-token-bg-elevated-secondary,
                .dark div.border-radius-3xl:has(.cm-editor) > div.bg-token-bg-elevated-secondary {
                    background-color: ${theme.codeBg} !important;
                }

                .dark div.rounded-3xl:has(.cm-editor) div.sticky div.bg-token-bg-elevated-secondary {
                    background-color: ${theme.sidebar} !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
                }

                .dark .ͼs,
                .dark #code-block-viewer,
                .dark .cm-editor {
                    background-color: ${theme.codeBg} !important;
                    color: ${theme.text} !important;
                }

                .dark pre.cm-content {
                    background-color: transparent !important;
                    border: none !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                }

                .dark div:has(> #code-block-viewer) {
                    background-color: transparent !important;
                    box-shadow: none !important;
                }

                .dark hr,
                .dark border,
                .dark .border-token-border-light,
                .dark .border-token-border-medium,
                .dark [class*="border-token-border"] {
                    border-color: rgba(255, 255, 255, 0.08) !important;
                }
                
                .dark body, .dark main, .dark div, .dark textarea, .dark pre {
                    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
                }
            `;
        } else {
            // DAY MODE LIGHT PROTECTIVE CUSTOM CSS
            return `
                /* ==========================================
                   1. CORE CSS VARIABLE OVERRIDES (LIGHT MODE)
                   ========================================== */
                .light,
                html.light,
                [data-theme="light"] {
                    /* Main backgrounds */
                    --main-surface-primary: ${theme.bg} !important;
                    --bg-primary: ${theme.bg} !important;
                    
                    /* Sidebar and side panel backgrounds */
                    --sidebar-surface-primary: ${theme.sidebar} !important;
                    --main-surface-secondary: ${theme.sidebar} !important;
                    --bg-secondary: ${theme.sidebar} !important;
                    --bg-elevated-secondary: ${theme.sidebar} !important;
                    
                    /* Cards, hovers, bubbles, and elevated items */
                    --main-surface-tertiary: ${theme.highlight} !important;
                    --bg-tertiary: ${theme.highlight} !important;
                    --message-surface: ${theme.highlight} !important;
                    --bg-elevated-primary: ${theme.input} !important;
                    
                    /* Custom text / icon readability tweaks */
                    --text-primary: ${theme.text} !important;
                    --text-secondary: ${theme.textMuted} !important;
                    
                    /* Soft border variables overrides */
                    --border-light: rgba(0, 0, 0, 0.06) !important;
                    --border-medium: rgba(0, 0, 0, 0.10) !important;
                    --border-heavy: rgba(0, 0, 0, 0.16) !important;
                }

                /* ==========================================
                   2. HIGH-SPECIFICITY OVERRIDES (LIGHT MODE)
                   ========================================== */
                .light body,
                .light main,
                .light #__next,
                .light .bg-token-main-surface-primary,
                .light [class*="bg-token-main-surface-primary"] {
                    background-color: ${theme.bg} !important;
                }

                .light .bg-gray-50,
                .light [class*="sidebar"] {
                    background-color: ${theme.sidebar} !important;
                }

                .light textarea,
                .light input[type="text"] {
                    background-color: ${theme.input} !important;
                    color: ${theme.text} !important;
                }

                /* Strictly target INLINE CODE blocks in light mode */
                .light code {
                    background-color: rgba(0, 0, 0, 0.06) !important;
                    color: ${theme.text} !important;
                    border: 1px solid rgba(0, 0, 0, 0.05) !important;
                    border-radius: 6px !important;
                    padding: 2px 6px !important;
                    font-size: 0.9em !important;
                    font-family: Menlo, Monaco, Consolas, "Courier New", monospace !important;
                    box-shadow: none !important;
                }

                .light pre code {
                    background-color: transparent !important;
                    color: inherit !important;
                    border: none !important;
                    border-radius: 0 !important;
                    padding: 0 !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    box-shadow: none !important;
                }

                .light hr,
                .light border,
                .light .border-token-border-light,
                .light .border-token-border-medium,
                .light [class*="border-token-border"] {
                    border-color: rgba(0, 0, 0, 0.06) !important;
                }
                
                .light body, .light main, .light div, .light textarea, .light pre {
                    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
                }
            `;
        }
    }

    // Stylesheet for the floating Theme Switcher panel (sleek glassmorphism)
    const switcherCss = `
        #${SWITCHER_ID} {
            position: fixed;
            bottom: 80px;
            right: 22px;
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            user-select: none;
        }

        .eye-switcher-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(45, 45, 45, 0.78);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ececf1;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .light .eye-switcher-btn {
            background: rgba(245, 245, 247, 0.85);
            border: 1px solid rgba(0, 0, 0, 0.08);
            color: #1d1d1f;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .eye-switcher-btn:hover {
            background: rgba(60, 60, 60, 0.9);
            border-color: rgba(255, 255, 255, 0.24);
            transform: scale(1.06) rotate(12deg);
        }
        
        .light .eye-switcher-btn:hover {
            background: rgba(235, 235, 237, 0.95);
            border-color: rgba(0, 0, 0, 0.16);
        }

        .eye-switcher-panel {
            position: absolute;
            bottom: 54px;
            right: 0;
            width: 245px;
            background: rgba(30, 30, 30, 0.90);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            opacity: 0;
            visibility: hidden;
            transform: translateY(12px) scale(0.95);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .light .eye-switcher-panel {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .eye-switcher-panel.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        .eye-switcher-title {
            font-size: 13px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 3px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .light .eye-switcher-title {
            color: #1d1d1f;
        }

        .eye-switcher-subtitle {
            font-size: 10px;
            color: #8e8e93;
            margin-bottom: 12px;
        }
        
        .light .eye-switcher-subtitle {
            color: #6e6e73;
        }

        .eye-theme-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.2s ease;
            margin-bottom: 4px;
            border: 1px solid transparent;
        }

        .eye-theme-option:last-child {
            margin-bottom: 0;
        }

        .eye-theme-option:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        
        .light .eye-theme-option:hover {
            background: rgba(0, 0, 0, 0.04);
        }

        .eye-theme-option.active {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.08);
        }
        
        .light .eye-theme-option.active {
            background: rgba(0, 0, 0, 0.06);
            border-color: rgba(0, 0, 0, 0.04);
        }

        .eye-color-dot {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.18);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .light .eye-color-dot {
            border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .eye-theme-details {
            display: flex;
            flex-direction: column;
            gap: 1px;
            min-width: 0;
        }

        .eye-theme-name {
            font-size: 12px;
            font-weight: 500;
            color: #ececf1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .light .eye-theme-name {
            color: #1d1d1f;
        }

        .eye-theme-desc {
            font-size: 9px;
            color: #8e8e93;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .light .eye-theme-desc {
            color: #6e6e73;
        }
    `;

    // Remove data-oled attribute in dark mode
    function removeOledAttribute() {
        if (document.documentElement.hasAttribute('data-oled')) {
            document.documentElement.removeAttribute('data-oled');
        }
    }

    // Check if ChatGPT is currently in dark mode
    function isDarkMode() {
        return document.documentElement.classList.contains('dark') || 
               document.documentElement.getAttribute('data-theme') === 'dark';
    }

    // Update active theme styling block in DOM dynamically
    function updateThemeStyle() {
        const isDark = isDarkMode();
        const activeKey = isDark ? activeDarkThemeKey : activeLightThemeKey;

        // Injects theme switcher panel style always
        let switcherStyle = document.getElementById(SWITCHER_STYLE_ID);
        if (!switcherStyle) {
            switcherStyle = document.createElement('style');
            switcherStyle.id = SWITCHER_STYLE_ID;
            switcherStyle.innerHTML = switcherCss;
            (document.head || document.documentElement).appendChild(switcherStyle);
        }

        // Render themes
        if (isDark) {
            removeOledAttribute();
            
            // NIGHT MODE THEME RENDER
            if (activeKey === 'VANILLA_DARK') {
                const style = document.getElementById(STYLE_ID);
                if (style) style.remove();
            } else {
                const theme = THEMES[activeKey];
                if (theme) {
                    let style = document.getElementById(STYLE_ID);
                    const currentCss = getThemeCss(theme, true);
                    if (!style) {
                        style = document.createElement('style');
                        style.id = STYLE_ID;
                        style.innerHTML = currentCss;
                        (document.head || document.documentElement).appendChild(style);
                    } else {
                        style.innerHTML = currentCss;
                    }
                }
            }
        } else {
            // DAY MODE THEME RENDER
            if (activeKey === 'VANILLA_LIGHT') {
                const style = document.getElementById(STYLE_ID);
                if (style) style.remove();
            } else {
                const theme = THEMES[activeKey];
                if (theme) {
                    let style = document.getElementById(STYLE_ID);
                    const currentCss = getThemeCss(theme, false);
                    if (!style) {
                        style = document.createElement('style');
                        style.id = STYLE_ID;
                        style.innerHTML = currentCss;
                        (document.head || document.documentElement).appendChild(style);
                    } else {
                        style.innerHTML = currentCss;
                    }
                }
            }
        }

        // Render Switcher UI DOM in both modes
        injectSwitcherUI();
    }

    // Dynamically inject the Theme Switcher Panel UI into body
    function injectSwitcherUI() {
        if (!document.body) {
            requestAnimationFrame(injectSwitcherUI);
            return;
        }

        let container = document.getElementById(SWITCHER_ID);
        if (!container) {
            container = document.createElement('div');
            container.id = SWITCHER_ID;
            container.innerHTML = `
                <div class="eye-switcher-btn" title="视力保护配色选择器">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div class="eye-switcher-panel">
                    <div class="eye-switcher-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#50fa7b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path></svg>
                        视力健康护眼调色板
                    </div>
                    <div class="eye-switcher-subtitle">特别针对近视、散光与视疲劳深度调配</div>
                    <div id="eye-theme-options-list"></div>
                </div>
            `;
            document.body.appendChild(container);

            const btn = container.querySelector('.eye-switcher-btn');
            const panel = container.querySelector('.eye-switcher-panel');

            // Toggle panel on click
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.classList.toggle('active');
                // Re-render choices on open in case theme status changed
                renderThemeOptions();
            });

            // Hide panel when clicking outside
            document.addEventListener('click', () => {
                panel.classList.remove('active');
            });
            panel.addEventListener('click', (e) => e.stopPropagation());
        }

        // Render current theme option items
        renderThemeOptions();
    }

    // Render option list dynamically based on Light or Dark current mode status
    function renderThemeOptions() {
        const listContainer = document.getElementById('eye-theme-options-list');
        if (!listContainer) return;

        const isDark = isDarkMode();
        const activeKey = isDark ? activeDarkThemeKey : activeLightThemeKey;

        listContainer.innerHTML = '';

        // Add 1. Revert to official vanilla theme option
        const vanillaKey = isDark ? 'VANILLA_DARK' : 'VANILLA_LIGHT';
        const isVanillaActive = activeKey === vanillaKey;
        const vanillaDotBg = isDark ? '#0d0d0d' : '#ffffff';
        const vanillaOption = document.createElement('div');
        vanillaOption.className = `eye-theme-option ${isVanillaActive ? 'active' : ''}`;
        vanillaOption.innerHTML = `
            <div class="eye-color-dot" style="background-color: ${vanillaDotBg}; border: 1px dashed rgba(255,255,255,0.4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${isDark ? '#fff' : '#000'}" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
            </div>
            <div class="eye-theme-details">
                <span class="eye-theme-name">ChatGPT 官方原装</span>
                <span class="eye-theme-desc">关闭护眼模式，恢复官方原厂网页样式</span>
            </div>
        `;
        vanillaOption.addEventListener('click', () => {
            if (isDark) {
                activeDarkThemeKey = 'VANILLA_DARK';
                localStorage.setItem('chatgpt-dark-theme-key', 'VANILLA_DARK');
            } else {
                activeLightThemeKey = 'VANILLA_LIGHT';
                localStorage.setItem('chatgpt-light-theme-key', 'VANILLA_LIGHT');
            }
            renderThemeOptions();
            updateThemeStyle();
        });
        listContainer.appendChild(vanillaOption);

        // Add 2. Scientific Eye protection themes
        Object.keys(THEMES).forEach((key) => {
            const theme = THEMES[key];
            
            // Filter: show light themes in Light Mode, dark themes in Dark Mode
            if (theme.isDark !== isDark) return;

            const isActive = key === activeKey;
            const option = document.createElement('div');
            option.className = `eye-theme-option ${isActive ? 'active' : ''}`;
            option.innerHTML = `
                <div class="eye-color-dot" style="background-color: ${theme.dotColor};"></div>
                <div class="eye-theme-details">
                    <span class="eye-theme-name">${theme.name}</span>
                    <span class="eye-theme-desc">${theme.desc}</span>
                </div>
            `;

            option.addEventListener('click', () => {
                if (isDark) {
                    activeDarkThemeKey = key;
                    localStorage.setItem('chatgpt-dark-theme-key', key);
                } else {
                    activeLightThemeKey = key;
                    localStorage.setItem('chatgpt-light-theme-key', key);
                }
                
                // Update UI active state immediately
                listContainer.querySelectorAll('.eye-theme-option').forEach(el => el.classList.remove('active'));
                option.classList.add('active');

                // Render styles instantly
                updateThemeStyle();
            });

            listContainer.appendChild(option);
        });
    }

    // Run theme checker immediately
    updateThemeStyle();

    // Use MutationObserver to watch for class, data-theme, and data-oled changes on the HTML element
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'class' || 
                 mutation.attributeName === 'data-theme' || 
                 mutation.attributeName === 'data-oled')) {
                updateThemeStyle();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Double-check injection on DOMContentLoaded to guarantee it stays active
    document.addEventListener('DOMContentLoaded', updateThemeStyle);

})();
