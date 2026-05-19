document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname + window.location.search;
  
  initLoadingBar();
  initDevToolsDetection();
  initThemeToggle();
  
  if (currentPage.indexOf('login.html') !== -1) {
    initLoginPage();
  } else if (currentPage.indexOf('admin.html') !== -1) {
    initAdminPage();
  } else if (currentPage.indexOf('reward.html') !== -1) {
    initRewardPage();
  } else if (currentPage.indexOf('status.html') !== -1) {
    initStatusPage();
  } else {
    initFrontendPage();
  }
});

function initRewardPage() {
  initThemeSettingsOnLoad();
  initSiteSearch();
  loadDynamicSettings();
  initNavigationAnimation();
  initMobileMenu();
  applyCustomText();
}

function initStatusPage() {
  initThemeSettingsOnLoad();
  initSiteSearch();
  loadDynamicSettings();
  initNavigationAnimation();
  initMobileMenu();
  applyCustomText();
  initStatusMonitoring();
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
}

function initLoadingBar() {
  const loadingBar = document.getElementById('loadingBar');
  const loadingProgress = document.getElementById('loadingProgress');
  
  if (!loadingBar || !loadingProgress) return;
  
  loadingBar.classList.add('active');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 90) progress = 90;
    loadingProgress.style.width = progress + '%';
  }, 100);
  
  const completeLoading = () => {
    clearInterval(interval);
    loadingProgress.style.width = '100%';
    setTimeout(() => {
      loadingBar.classList.remove('active');
      loadingProgress.style.width = '0%';
    }, 300);
  };
  
  if (document.readyState === 'complete') {
    completeLoading();
  } else {
    window.addEventListener('load', completeLoading);
    setTimeout(completeLoading, 5000);
  }
}

function initDevToolsDetection() {
  const devWarning = document.getElementById('devWarning');
  if (!devWarning) return;
  
  let isDetected = false;
  let hasAutoHidden = false;
  let detectionCount = 0;
  let hideTimeout = null;
  const requiredDetections = 3;
  
  function showWarning(isManual = false) {
    if (!isDetected) {
      isDetected = true;
      devWarning.classList.add('active');
      document.body.classList.add('dev-warning-active');
      
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        hideWarning();
      }, 5000);
    }
  }
  
  function hideWarning() {
    if (isDetected) {
      isDetected = false;
      devWarning.classList.remove('active');
      document.body.classList.remove('dev-warning-active');
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      hasAutoHidden = true;
    }
  }
  
  function checkDevToolsBySize() {
    if (hasAutoHidden) return;
    
    const threshold = 200;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    
    if (widthDiff > threshold || heightDiff > threshold) {
      detectionCount++;
      if (detectionCount >= requiredDetections) {
        showWarning();
      }
    } else {
      detectionCount = 0;
    }
  }
  
  setInterval(checkDevToolsBySize, 500);
  
  let lastTime = Date.now();
  const checkInterval = setInterval(() => {
    if (hasAutoHidden) return;
    
    const currentTime = Date.now();
    if (currentTime - lastTime > 100) {
      detectionCount++;
      if (detectionCount >= requiredDetections) {
        showWarning();
      }
    }
    lastTime = currentTime;
  }, 50);
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'E') ||
        (e.metaKey && e.altKey && e.key === 'I')) {
      e.preventDefault();
      hasAutoHidden = false;
      detectionCount = requiredDetections;
      showWarning(true);
    }
  });
  
  document.addEventListener('contextmenu', function(e) {
    if (hasAutoHidden) return;
    
    const target = e.target;
    if (target.tagName === 'HTML' || target.tagName === 'BODY') {
      setTimeout(() => {
        detectionCount++;
        if (detectionCount >= requiredDetections) {
          showWarning();
        }
      }, 100);
    }
  });
}

function getAuthCredentials() {
  const creds = atob('YWRtaW46Njg3MjAx');
  return creds.split(':');
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      themeToggle.classList.add('theme-transition');
      document.body.style.opacity = '0.8';
      
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        document.body.style.opacity = '1';
        setTimeout(() => {
          themeToggle.classList.remove('theme-transition');
        }, 600);
      }, 150);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
}

function initFrontendPage() {
  initThemeSettingsOnLoad();
  initWelcomeGreeting();
  loadBlogArticles();
  initSiteSearch();
  loadAboutContent();
  initNavigationAnimation();
  loadDynamicSettings();
  loadCategoriesToSelect();
  initMobileMenu();
  applyCustomText();
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  
  if (!menuToggle || !mobileMenu || !overlay) return;
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  overlay.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initThemeSettingsOnLoad() {
  const themeSettings = getThemeSettings();
  applyThemeSettings(themeSettings);
  
  document.body.style.fontFamily = themeSettings.fontFamily === 'default' 
    ? 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    : themeSettings.fontFamily === 'serif' ? 'Georgia, serif'
    : themeSettings.fontFamily === 'sans-serif' ? 'Arial, sans-serif'
    : themeSettings.fontFamily === 'monospace' ? 'Courier New, monospace'
    : 'cursive';
}

function initWelcomeGreeting() {
  const welcomeGreeting = document.getElementById('welcomeGreeting');
  const currentTimeEl = document.getElementById('currentTime');
  
  if (welcomeGreeting) {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour >= 5 && hour < 9) {
      greeting = '早安，用阅读开启美好一天';
    } else if (hour >= 9 && hour < 12) {
      greeting = '上午好，知识正在等你';
    } else if (hour >= 12 && hour < 14) {
      greeting = '午安，休息片刻继续前行';
    } else if (hour >= 14 && hour < 18) {
      greeting = '下午好，继续探索知识的海洋';
    } else if (hour >= 18 && hour < 20) {
      greeting = '傍晚好，阅读点亮生活';
    } else {
      greeting = '夜深了，愿好梦相伴';
    }
    
    welcomeGreeting.textContent = greeting;
  }
  
  if (currentTimeEl) {
    const updateTime = () => {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      currentTimeEl.textContent = now.toLocaleDateString('zh-CN', options);
    };
    updateTime();
  }
  
  initLikeButton();
}

function initLikeButton() {
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  
  if (!likeBtn) return;
  
  const blogId = 'hengyuan-blog-welcome';
  const likeData = getLikeData();
  
  likeCount.textContent = likeData.count;
  
  if (likeData.liked) {
    likeBtn.classList.add('liked');
  }
  
  likeBtn.addEventListener('click', function() {
    const data = getLikeData();
    
    if (data.liked) {
      return;
    }
    
    data.count++;
    data.liked = true;
    saveLikeData(data);
    
    likeCount.textContent = data.count;
    likeBtn.classList.add('liked');
  });
}

function getLikeData() {
  const data = localStorage.getItem('blogLikes');
  return data ? JSON.parse(data) : { count: 0, liked: false };
}

function saveLikeData(data) {
  localStorage.setItem('blogLikes', JSON.stringify(data));
}

function validatePageAndRedirect() {
  const currentPage = window.location.pathname;
  const validPages = ['index.html', 'about.html', 'legal.html', 'login.html', 'admin.html', '404.html'];
  
  const pageName = currentPage.split('/').pop();
  
  if (pageName === '' || !validPages.includes(pageName)) {
    const hasHTML = pageName.includes('.html');
    if (!hasHTML && pageName !== '') {
      window.location.href = '404.html';
    }
  }
}

function initSiteSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const query = searchInput.value;
      performSearch(query);
    });
  }
}

function performSearch(query) {
  const articles = getArticles();
  
  if (!query.trim()) {
    loadBlogArticles();
    return;
  }
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase()) ||
    article.category.toLowerCase().includes(query.toLowerCase())
  );
  
  displaySearchResults(filteredArticles, query);
}

function displaySearchResults(articles, query) {
  const blogGrid = document.getElementById('blogGrid');
  const featuredArticle = document.getElementById('featuredArticle');
  const moreArticles = document.getElementById('moreArticles');
  
  if (!blogGrid) return;
  
  if (featuredArticle) {
    featuredArticle.style.display = 'none';
  }
  
  if (moreArticles) {
    moreArticles.style.display = 'none';
  }
  
  if (articles.length === 0) {
    blogGrid.innerHTML = `
      <div class="blog-card glass" style="text-align: center;">
        <h3>未找到相关文章</h3>
        <p>没有找到包含 "${query}" 的文章</p>
        <button class="btn btn-secondary" onclick="loadBlogArticles()" style="margin-top: 16px;">返回全部文章</button>
      </div>
    `;
  } else {
    blogGrid.innerHTML = articles.map(article => {
      const excerpt = getExcerpt(article.content, query);
      return `
        <div class="blog-card glass">
          <span class="category">${article.category}</span>
          <h3>${highlightText(article.title, query)}</h3>
          <p>${excerpt}</p>
          <div class="meta">
            <span>${getSettings().authorName || '作者'}</span>
            <span>${formatDate(article.createdAt)}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

function getExcerpt(content, query) {
  const textContent = content.replace(/<[^>]*>/g, '');
  const queryIndex = textContent.toLowerCase().indexOf(query.toLowerCase());
  
  if (queryIndex === -1) {
    return textContent.substring(0, 100) + '...';
  }
  
  const start = Math.max(0, queryIndex - 30);
  const end = Math.min(textContent.length, queryIndex + query.length + 70);
  let excerpt = textContent.substring(start, end);
  
  if (start > 0) excerpt = '...' + excerpt;
  if (end < textContent.length) excerpt = excerpt + '...';
  
  return highlightText(excerpt, query);
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background-color: rgba(201, 184, 150, 0.4); color: inherit;">$1</mark>');
}

const ARTICLES_PER_PAGE = 6;
let currentPage = 1;

function loadBlogArticles() {
  const articles = getArticles();
  const blogGrid = document.getElementById('blogGrid');
  const featuredArticle = document.getElementById('featuredArticle');
  const moreArticles = document.getElementById('moreArticles');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  if (!blogGrid) {
    return;
  }
  
  if (articles.length === 0) {
    if (featuredArticle) {
      featuredArticle.innerHTML = '';
      featuredArticle.style.display = 'none';
    }
    blogGrid.innerHTML = `
      <div class="blog-card glass">
        <span class="category">未分类</span>
        <h3>暂无文章</h3>
        <p>点击进入后台管理发布您的第一篇文章</p>
        <div class="meta">
          <span>作者</span>
          <span>日期</span>
        </div>
      </div>
    `;
    return;
  }
  
  if (featuredArticle) {
    const latestArticle = articles[articles.length - 1];
    featuredArticle.innerHTML = `
      <span class="category">${latestArticle.category}</span>
      <h3>${latestArticle.title}</h3>
      <p>${latestArticle.content.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
      <div class="meta">
        <span>${getSettings().authorName || '作者'}</span>
        <span>${formatDate(latestArticle.createdAt)}</span>
      </div>
    `;
    featuredArticle.style.display = 'block';
  }
  
  const otherArticles = articles.slice(0, -1).reverse();
  displayArticles(otherArticles, blogGrid, moreArticles, loadMoreBtn);
}

function displayArticles(articles, container, moreContainer, loadMoreBtn) {
  currentPage = 1;
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  
  if (totalPages <= 1) {
    container.innerHTML = articles.map(article => createArticleCard(article)).join('');
    moreContainer.style.display = 'none';
  } else {
    container.innerHTML = articles.slice(0, ARTICLES_PER_PAGE).map(article => createArticleCard(article)).join('');
    moreContainer.style.display = 'block';
    
    loadMoreBtn.onclick = function() {
      currentPage++;
      const start = (currentPage - 1) * ARTICLES_PER_PAGE;
      const end = start + ARTICLES_PER_PAGE;
      const newArticles = articles.slice(start, end);
      
      container.innerHTML += newArticles.map(article => createArticleCard(article)).join('');
      
      if (currentPage >= totalPages) {
        moreContainer.style.display = 'none';
      }
    };
  }
}

function createArticleCard(article) {
  return `
    <div class="blog-card glass">
      <span class="category">${article.category}</span>
      <h3>${article.title}</h3>
      <p>${article.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
      <div class="meta">
        <span>${getSettings().authorName || '作者'}</span>
        <span>${formatDate(article.createdAt)}</span>
      </div>
    </div>
  `;
}

function loadAboutContent() {
  const aboutContent = getAboutContent();
  
  const introductionSection = document.getElementById('introductionContent');
  const skillsSection = document.getElementById('skillsContent');
  const hobbiesSection = document.getElementById('hobbiesContent');
  const contactSection = document.getElementById('contactContent');
  
  if (introductionSection) {
    introductionSection.innerHTML = aboutContent.introduction || '<p>点击进入后台管理设置个人简介</p>';
  }
  
  if (skillsSection) {
    const skills = aboutContent.skills.split('\n').filter(s => s.trim());
    skillsSection.innerHTML = skills.length > 0 
      ? skills.map(skill => `<li>${skill}</li>`).join('')
      : '<li>点击进入后台管理设置技术领域</li>';
  }
  
  if (hobbiesSection) {
    const hobbies = aboutContent.hobbies.split('\n').filter(h => h.trim());
    hobbiesSection.innerHTML = hobbies.length > 0
      ? hobbies.map(hobby => `<li>${hobby}</li>`).join('')
      : '<li>点击进入后台管理设置兴趣爱好</li>';
  }
  
  if (contactSection) {
    const contacts = aboutContent.contact.split('\n').filter(c => c.trim());
    contactSection.innerHTML = contacts.length > 0
      ? contacts.map(contact => `<li>${contact}</li>`).join('')
      : '<li>点击进入后台管理设置联系方式</li>';
  }
}

function getArticles() {
  const articles = localStorage.getItem('articles');
  return articles ? JSON.parse(articles) : [];
}

function saveArticles(articles) {
  localStorage.setItem('articles', JSON.stringify(articles));
}

function getSettings() {
  const settings = localStorage.getItem('blogSettings');
  return settings ? JSON.parse(settings) : {
    blogName: '恒元的博客',
    blogDescription: '记录生活，分享思考，传递价值',
    authorName: '恒元',
    authorEmail: '',
    authorGitHub: ''
  };
}

function saveSettings(settings) {
  localStorage.setItem('blogSettings', JSON.stringify(settings));
}

function getAboutContent() {
  const about = localStorage.getItem('aboutContent');
  return about ? JSON.parse(about) : {
    introduction: '大家好，我是恒元，一名热爱生活、热爱技术的博主。\n\n我相信文字的力量，它可以记录时光，传递思想，连接人心。这个博客是我分享生活点滴、技术心得和人生感悟的地方。',
    skills: '前端开发：HTML、CSS、JavaScript、React、Vue\n后端开发：Node.js、Python、Go\n数据库：MySQL、MongoDB、Redis\n云计算：AWS、Cloudflare、Docker',
    hobbies: '阅读：喜欢读科技、历史、文学类书籍\n写作：记录生活，分享思考\n旅行：探索未知，感受世界\n摄影：用镜头捕捉美好瞬间\n音乐：古典、摇滚、电子音乐',
    contact: '邮箱：hyblog@hyluntan.dpdns.org\nGitHub：https://github.com/hengyuan'
  };
}

function saveAboutContent(content) {
  localStorage.setItem('aboutContent', JSON.stringify(content));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function initNavigationAnimation() {
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href !== '#' && !href.startsWith('javascript:') && href !== window.location.pathname) {
        e.preventDefault();
        
        document.body.classList.add('page-transition-leave');
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

function loadDynamicSettings() {
  const settings = getSettings();
  
  const blogTitle = document.querySelector('h1');
  const blogDescription = document.querySelector('.hero p');
  const logoText = document.querySelector('.logo .logo-text');
  
  if (blogTitle && blogTitle.textContent === '恒元的博客') {
    blogTitle.textContent = settings.blogName || '恒元的博客';
  }
  
  if (blogDescription) {
    blogDescription.textContent = settings.blogDescription || '记录生活，分享思考，传递价值';
  }
  
  if (logoText) {
    logoText.textContent = settings.blogName || '恒元的博客';
  }
  
  const pageTitle = document.querySelector('title');
  if (pageTitle) {
    const currentTitle = pageTitle.textContent;
    if (currentTitle.includes('-')) {
      const parts = currentTitle.split('-');
      pageTitle.textContent = `${parts[0].trim()} - ${settings.blogName || '恒元的博客'}`;
    } else {
      pageTitle.textContent = settings.blogName || '恒元的博客';
    }
  }
}

function initLoginPage() {
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');

  if (!loginBtn || !errorMessage || !usernameInput || !passwordInput || !loginForm) {
    console.error('Login page elements not found');
    return;
  }

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    return false;
  });

  loginForm.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      e.preventDefault();
    }
  });

  function attemptLogin() {
    try {
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const [validUser, validPass] = getAuthCredentials();

      if (!username) {
        errorMessage.textContent = '请输入用户名';
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 3000);
        usernameInput.focus();
        return;
      }

      if (!password) {
        errorMessage.textContent = '请输入密码';
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 3000);
        passwordInput.focus();
        return;
      }

      if (username === validUser && password === validPass) {
        try {
          localStorage.setItem('loggedIn', 'true');
          window.location.href = './admin.html';
        } catch (e) {
          errorMessage.textContent = '登录失败：无法保存登录状态';
          console.error('LocalStorage error:', e);
        }
      } else {
        errorMessage.textContent = '用户名或密码错误';
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 3000);
        passwordInput.value = '';
        passwordInput.focus();
      }
    } catch (e) {
      errorMessage.textContent = '登录过程出现错误';
      console.error('Login error:', e);
    }
  }

  loginBtn.addEventListener('click', attemptLogin);

  passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      attemptLogin();
    }
  });

  usernameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordInput.focus();
    }
  });
}

function initAdminPage() {
  try {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn || loggedIn !== 'true') {
      window.location.href = './login.html';
      return;
    }
  } catch (e) {
    console.error('LocalStorage check failed:', e);
    window.location.href = './login.html';
    return;
  }
  
  initLogout();
  initArticlesManagement();
  initSettingsManagement();
  initThemeSettingsManagement();
  initCategorySettingsManagement();
  initAboutSettingsManagement();
  initCustomTextSettingsManagement();
  initEditorToolbar();
}

function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('loggedIn');
      window.location.replace('./login.html');
    });
  }
}

function initArticlesManagement() {
  const addArticleBtn = document.getElementById('addArticleBtn');
  const backToListBtn = document.getElementById('backToListBtn');
  const saveArticleBtn = document.getElementById('saveArticleBtn');
  const searchInput = document.getElementById('searchInput');
  
  if (addArticleBtn) {
    addArticleBtn.addEventListener('click', function() {
      clearArticleForm();
      showSection('editorSection');
    });
  }
  
  if (backToListBtn) {
    backToListBtn.addEventListener('click', function() {
      showSection('articles');
      refreshArticlesList();
    });
  }
  
  if (saveArticleBtn) {
    saveArticleBtn.addEventListener('click', saveArticle);
  }
  
  if (searchInput && window.location.pathname.includes('admin.html')) {
    searchInput.addEventListener('input', function() {
      filterArticles(this.value);
    });
  }
  
  refreshArticlesList();
}

function showSection(sectionId) {
  const sections = ['articles', 'editorSection', 'settings', 'themeSettings', 'categorySettings', 'aboutSettings', 'customTextSettings'];
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = id === sectionId ? 'block' : 'none';
    }
  });
  
  const navItems = ['navArticles', 'navSettings', 'navThemeSettings', 'navCategorySettings', 'navAboutSettings', 'navCustomTextSettings'];
  navItems.forEach(id => {
    const nav = document.getElementById(id);
    if (nav) {
      nav.classList.toggle('active', id === `nav${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`);
    }
  });
  
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) {
    const titles = {
      articles: '文章管理',
      editorSection: '编辑文章',
      settings: '网站设置',
      themeSettings: '主题设置',
      categorySettings: '分类管理',
      aboutSettings: '关于我设置',
      customTextSettings: '自定义文本'
    };
    pageTitle.textContent = titles[sectionId] || '文章管理';
  }
}

function refreshArticlesList(searchQuery = '') {
  const articles = getArticles();
  const articlesBody = document.getElementById('articlesBody');
  const emptyArticles = document.getElementById('emptyArticles');
  
  if (!articlesBody) return;
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (filteredArticles.length === 0) {
    articlesBody.innerHTML = '';
    emptyArticles.style.display = 'block';
  } else {
    emptyArticles.style.display = 'none';
    articlesBody.innerHTML = filteredArticles.map(article => `
      <tr>
        <td>${article.title}</td>
        <td>${article.category}</td>
        <td>${formatDate(article.createdAt)}</td>
        <td class="actions">
          <button style="background: #3498db; color: white;" onclick="editArticle('${article.id}')">
            <i class="fas fa-edit"></i> 编辑
          </button>
          <button style="background: #e74c3c; color: white;" onclick="showDeleteModal('${article.id}')">
            <i class="fas fa-trash"></i> 删除
          </button>
        </td>
      </tr>
    `).join('');
  }
}

function filterArticles(query) {
  refreshArticlesList(query);
}

function clearArticleForm() {
  document.getElementById('articleId').value = '';
  document.getElementById('articleTitle').value = '';
  document.getElementById('articleCategory').value = '未分类';
  document.getElementById('articleContent').innerHTML = '';
}

function saveArticle() {
  const id = document.getElementById('articleId').value;
  const title = document.getElementById('articleTitle').value;
  const category = document.getElementById('articleCategory').value;
  const content = document.getElementById('articleContent').innerHTML;
  
  if (!title.trim()) {
    alert('请输入文章标题');
    return;
  }
  
  if (!content.trim()) {
    alert('请输入文章内容');
    return;
  }
  
  const articles = getArticles();
  
  if (id) {
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        title,
        category,
        content,
        updatedAt: new Date().toISOString()
      };
    }
  } else {
    articles.push({
      id: Date.now().toString(),
      title,
      category,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  saveArticles(articles);
  showSection('articles');
  refreshArticlesList();
}

function editArticle(id) {
  const articles = getArticles();
  const article = articles.find(a => a.id === id);
  
  if (article) {
    document.getElementById('articleId').value = article.id;
    document.getElementById('articleTitle').value = article.title;
    document.getElementById('articleCategory').value = article.category;
    document.getElementById('articleContent').innerHTML = article.content;
    showSection('editorSection');
  }
}

function showDeleteModal(id) {
  const modal = document.getElementById('deleteModal');
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  
  if (modal) {
    modal.classList.add('active');
    
    confirmBtn.onclick = function() {
      deleteArticle(id);
      modal.classList.remove('active');
    };
  }
  
  const cancelBtn = document.getElementById('cancelDeleteBtn');
  if (cancelBtn) {
    cancelBtn.onclick = function() {
      modal.classList.remove('active');
    };
  }
}

function deleteArticle(id) {
  const articles = getArticles().filter(a => a.id !== id);
  saveArticles(articles);
  refreshArticlesList();
}

function initSettingsManagement() {
  const navSettings = document.getElementById('navSettings');
  const navArticles = document.getElementById('navArticles');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  
  if (navSettings) {
    navSettings.addEventListener('click', function(e) {
      e.preventDefault();
      loadSettings();
      showSection('settings');
    });
  }
  
  if (navArticles) {
    navArticles.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('articles');
    });
  }
  
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', saveSettingsData);
  }
}

function initAboutSettingsManagement() {
  const navAboutSettings = document.getElementById('navAboutSettings');
  const saveAboutBtn = document.getElementById('saveAboutBtn');
  
  if (navAboutSettings) {
    navAboutSettings.addEventListener('click', function(e) {
      e.preventDefault();
      loadAboutSettings();
      showSection('aboutSettings');
    });
  }
  
  if (saveAboutBtn) {
    saveAboutBtn.addEventListener('click', saveAboutSettingsData);
  }
}

function loadSettings() {
  const settings = getSettings();
  document.getElementById('blogName').value = settings.blogName;
  document.getElementById('blogDescription').value = settings.blogDescription;
  document.getElementById('authorName').value = settings.authorName;
  document.getElementById('authorEmail').value = settings.authorEmail || '';
  document.getElementById('authorGitHub').value = settings.authorGitHub || '';
}

function saveSettingsData() {
  const settings = {
    blogName: document.getElementById('blogName').value,
    blogDescription: document.getElementById('blogDescription').value,
    authorName: document.getElementById('authorName').value,
    authorEmail: document.getElementById('authorEmail').value,
    authorGitHub: document.getElementById('authorGitHub').value
  };
  
  saveSettings(settings);
  
  const message = document.getElementById('settingsMessage');
  if (message) {
    message.textContent = '设置保存成功';
    message.className = 'success-message';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
}

function loadAboutSettings() {
  const about = getAboutContent();
  document.getElementById('aboutIntroduction').value = about.introduction;
  document.getElementById('aboutSkills').value = about.skills;
  document.getElementById('aboutHobbies').value = about.hobbies;
  document.getElementById('aboutContact').value = about.contact;
}

function saveAboutSettingsData() {
  const about = {
    introduction: document.getElementById('aboutIntroduction').value,
    skills: document.getElementById('aboutSkills').value,
    hobbies: document.getElementById('aboutHobbies').value,
    contact: document.getElementById('aboutContact').value
  };
  
  saveAboutContent(about);
  
  const message = document.getElementById('aboutMessage');
  if (message) {
    message.textContent = '设置保存成功';
    message.className = 'success-message';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
}

function initCustomTextSettingsManagement() {
  const navCustomTextSettings = document.getElementById('navCustomTextSettings');
  const saveCustomTextBtn = document.getElementById('saveCustomTextBtn');
  
  if (navCustomTextSettings) {
    navCustomTextSettings.addEventListener('click', function(e) {
      e.preventDefault();
      loadCustomTextSettings();
      showSection('customTextSettings');
    });
  }
  
  if (saveCustomTextBtn) {
    saveCustomTextBtn.addEventListener('click', saveCustomTextSettingsData);
  }
}

function getCustomText() {
  const customText = localStorage.getItem('customText');
  return customText ? JSON.parse(customText) : {
    devWarningText: '',
    rewardTitle: '',
    rewardMessage: '',
    rewardNoticeTitle: '',
    rewardNoticeText: '',
    rewardLinkText: '',
    rewardLinkUrl: '',
    contactEmail: '',
    footerAbout: ''
  };
}

function saveCustomText(customText) {
  localStorage.setItem('customText', JSON.stringify(customText));
}

function loadCustomTextSettings() {
  const customText = getCustomText();
  document.getElementById('devWarningText').value = customText.devWarningText;
  document.getElementById('rewardTitle').value = customText.rewardTitle;
  document.getElementById('rewardMessage').value = customText.rewardMessage;
  document.getElementById('rewardNoticeTitle').value = customText.rewardNoticeTitle;
  document.getElementById('rewardNoticeText').value = customText.rewardNoticeText;
  document.getElementById('rewardLinkText').value = customText.rewardLinkText;
  document.getElementById('rewardLinkUrl').value = customText.rewardLinkUrl;
  document.getElementById('contactEmail').value = customText.contactEmail;
  document.getElementById('footerAbout').value = customText.footerAbout;
}

function saveCustomTextSettingsData() {
  const customText = {
    devWarningText: document.getElementById('devWarningText').value,
    rewardTitle: document.getElementById('rewardTitle').value,
    rewardMessage: document.getElementById('rewardMessage').value,
    rewardNoticeTitle: document.getElementById('rewardNoticeTitle').value,
    rewardNoticeText: document.getElementById('rewardNoticeText').value,
    rewardLinkText: document.getElementById('rewardLinkText').value,
    rewardLinkUrl: document.getElementById('rewardLinkUrl').value,
    contactEmail: document.getElementById('contactEmail').value,
    footerAbout: document.getElementById('footerAbout').value
  };
  
  saveCustomText(customText);
  
  const message = document.getElementById('customTextMessage');
  if (message) {
    message.textContent = '自定义文本保存成功';
    message.className = 'success-message';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
}

function applyCustomText() {
  const customText = getCustomText();
  
  if (customText.devWarningText) {
    const devWarning = document.getElementById('devWarning');
    if (devWarning) {
      const span = devWarning.querySelector('span');
      if (span) span.textContent = customText.devWarningText;
    }
  }
  
  if (customText.rewardTitle) {
    const rewardTitle = document.querySelector('.reward-title');
    if (rewardTitle) rewardTitle.textContent = customText.rewardTitle;
  }
  
  if (customText.rewardMessage) {
    const rewardMessage = document.querySelector('.reward-message');
    if (rewardMessage) rewardMessage.textContent = customText.rewardMessage;
  }
  
  if (customText.rewardNoticeTitle) {
    const noticeTitle = document.querySelector('.notice-content h3');
    if (noticeTitle) noticeTitle.textContent = customText.rewardNoticeTitle;
  }
  
  if (customText.rewardNoticeText) {
    const noticeText = document.querySelector('.notice-content p');
    if (noticeText) noticeText.textContent = customText.rewardNoticeText;
  }
  
  if (customText.rewardLinkText) {
    const rewardLink = document.querySelector('.reward-buttons .btn-primary');
    if (rewardLink) rewardLink.innerHTML = `<i class="fas fa-external-link-alt"></i> ${customText.rewardLinkText}`;
  }
  
  if (customText.rewardLinkUrl) {
    const rewardLink = document.querySelector('.reward-buttons .btn-primary');
    if (rewardLink) rewardLink.href = customText.rewardLinkUrl;
  }
  
  if (customText.contactEmail) {
    const contactElements = document.querySelectorAll('.footer-section p');
    contactElements.forEach(el => {
      if (el.textContent.includes('邮箱：')) {
        el.textContent = `邮箱：${customText.contactEmail}`;
      }
    });
  }
  
  if (customText.footerAbout) {
    const aboutElements = document.querySelectorAll('.footer-section p');
    aboutElements.forEach(el => {
      if (el.textContent.includes('这是一个个人博客')) {
        el.textContent = customText.footerAbout;
      }
    });
  }
}

function initEditorToolbar() {
  const toolbarButtons = document.querySelectorAll('.editor-toolbar button');
  
  toolbarButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      if (action === 'image') {
        openMediaModal('image');
      } else if (action === 'video') {
        openMediaModal('video');
      } else {
        applyFormat(action);
      }
    });
  });
  
  initMediaModal();
}

function applyFormat(action) {
  const editor = document.getElementById('articleContent');
  
  if (!editor) return;
  
  if (action === 'link') {
    const url = prompt('请输入链接地址:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  } else if (action === 'h1') {
    document.execCommand('formatBlock', false, '<h1>');
  } else if (action === 'h2') {
    document.execCommand('formatBlock', false, '<h2>');
  } else if (action === 'quote') {
    document.execCommand('formatBlock', false, '<blockquote>');
  } else if (action === 'list') {
    document.execCommand('insertUnorderedList', false, null);
  } else {
    document.execCommand(action, false, null);
  }
  editor.focus();
}

let currentMediaType = 'image';

function openMediaModal(type) {
  currentMediaType = type;
  const modal = document.getElementById('mediaModal');
  const title = document.getElementById('mediaModalTitle');
  const altTextGroup = document.getElementById('altTextGroup');
  
  title.textContent = type === 'image' ? '插入图片' : '插入视频';
  altTextGroup.style.display = type === 'image' ? 'block' : 'none';
  
  document.getElementById('mediaUrl').value = '';
  document.getElementById('mediaAlt').value = '';
  document.getElementById('uploadPreview').innerHTML = '';
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('mediaFile').value = '';
  
  document.querySelectorAll('.media-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector('.media-tab[data-tab="url"]').classList.add('active');
  document.getElementById('urlTab').style.display = 'block';
  document.getElementById('uploadTab').style.display = 'none';
  
  if (modal) {
    modal.classList.add('active');
  }
}

function initMediaModal() {
  const modal = document.getElementById('mediaModal');
  const cancelBtn = document.getElementById('cancelMediaBtn');
  const confirmBtn = document.getElementById('confirmMediaBtn');
  const mediaTabs = document.querySelectorAll('.media-tab');
  const uploadArea = document.getElementById('uploadArea');
  const mediaFile = document.getElementById('mediaFile');
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeMediaModal);
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', insertMedia);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeMediaModal();
      }
    });
  }
  
  mediaTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      mediaTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      document.getElementById('urlTab').style.display = tabName === 'url' ? 'block' : 'none';
      document.getElementById('uploadTab').style.display = tabName === 'upload' ? 'block' : 'none';
    });
  });
  
  if (uploadArea) {
    uploadArea.addEventListener('click', function() {
      mediaFile.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function() {
      this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    });
  }
  
  if (mediaFile) {
    mediaFile.addEventListener('change', function() {
      if (this.files.length > 0) {
        handleFileUpload(this.files[0]);
      }
    });
  }
}

function closeMediaModal() {
  const modal = document.getElementById('mediaModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

let uploadedMediaData = null;

function handleFileUpload(file) {
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  
  if (!isImage && !isVideo) {
    alert('请上传图片或视频文件');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedMediaData = e.target.result;
    const preview = document.getElementById('uploadPreview');
    
    if (isImage) {
      preview.innerHTML = `<img src="${uploadedMediaData}" alt="预览">`;
    } else {
      preview.innerHTML = `<video src="${uploadedMediaData}" controls></video>`;
    }
    preview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function insertMedia() {
  const activeTab = document.querySelector('.media-tab.active').getAttribute('data-tab');
  const editor = document.getElementById('articleContent');
  
  if (!editor) return;
  
  if (activeTab === 'url') {
    const url = document.getElementById('mediaUrl').value.trim();
    const alt = document.getElementById('mediaAlt').value.trim();
    
    if (!url) {
      alert('请输入媒体链接');
      return;
    }
    
    if (currentMediaType === 'image') {
      const img = `<img src="${url}" alt="${alt || ''}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;">`;
      editor.focus();
      document.execCommand('insertHTML', false, img);
    } else {
      const video = `<video src="${url}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video>`;
      editor.focus();
      document.execCommand('insertHTML', false, video);
    }
  } else {
    if (!uploadedMediaData) {
      alert('请先上传文件');
      return;
    }
    
    if (currentMediaType === 'image') {
      const img = `<img src="${uploadedMediaData}" alt="" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;">`;
      editor.focus();
      document.execCommand('insertHTML', false, img);
    } else {
      const video = `<video src="${uploadedMediaData}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video>`;
      editor.focus();
      document.execCommand('insertHTML', false, video);
    }
  }
  
  uploadedMediaData = null;
  closeMediaModal();
}

function initThemeSettingsManagement() {
  const navThemeSettings = document.getElementById('navThemeSettings');
  const saveThemeBtn = document.getElementById('saveThemeBtn');
  const resetThemeBtn = document.getElementById('resetThemeBtn');
  const colorPresets = document.querySelectorAll('.color-preset');
  const accentColorInput = document.getElementById('accentColor');
  
  if (navThemeSettings) {
    navThemeSettings.addEventListener('click', function(e) {
      e.preventDefault();
      loadThemeSettings();
      showSection('themeSettings');
    });
  }
  
  colorPresets.forEach(preset => {
    preset.addEventListener('click', function() {
      colorPresets.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const color = this.getAttribute('data-color');
      accentColorInput.value = color;
    });
  });
  
  if (saveThemeBtn) {
    saveThemeBtn.addEventListener('click', saveThemeSettings);
  }
  
  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', resetThemeSettings);
  }
}

function getThemeSettings() {
  const settings = localStorage.getItem('themeSettings');
  return settings ? JSON.parse(settings) : {
    accentColor: '#c9b896',
    fontFamily: 'default',
    fontSize: 'medium'
  };
}

function saveThemeSettingsData(settings) {
  localStorage.setItem('themeSettings', JSON.stringify(settings));
  applyThemeSettings(settings);
}

function loadThemeSettings() {
  const settings = getThemeSettings();
  document.getElementById('accentColor').value = settings.accentColor;
  document.getElementById('fontFamily').value = settings.fontFamily;
  document.getElementById('fontSize').value = settings.fontSize;
  
  document.querySelectorAll('.color-preset').forEach(preset => {
    preset.classList.toggle('active', preset.getAttribute('data-color') === settings.accentColor);
  });
}

function saveThemeSettings() {
  const settings = {
    accentColor: document.getElementById('accentColor').value,
    fontFamily: document.getElementById('fontFamily').value,
    fontSize: document.getElementById('fontSize').value
  };
  
  saveThemeSettingsData(settings);
  
  const message = document.getElementById('themeMessage');
  if (message) {
    message.textContent = '主题设置保存成功，刷新页面生效';
    message.className = 'success-message';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
}

function resetThemeSettings() {
  const defaultSettings = {
    accentColor: '#c9b896',
    fontFamily: 'default',
    fontSize: 'medium'
  };
  
  saveThemeSettingsData(defaultSettings);
  loadThemeSettings();
  
  const message = document.getElementById('themeMessage');
  if (message) {
    message.textContent = '已恢复默认主题';
    message.className = 'success-message';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
  }
}

function applyThemeSettings(settings) {
  const root = document.documentElement;
  root.style.setProperty('--accent-color', settings.accentColor);
  
  const hoverColor = adjustColor(settings.accentColor, -15);
  root.style.setProperty('--accent-hover', hoverColor);
  
  let fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
  switch(settings.fontFamily) {
    case 'serif':
      fontFamily = 'Georgia, serif';
      break;
    case 'sans-serif':
      fontFamily = 'Arial, sans-serif';
      break;
    case 'monospace':
      fontFamily = 'Courier New, monospace';
      break;
    case 'cursive':
      fontFamily = 'cursive';
      break;
  }
  root.style.setProperty('--font-family', fontFamily);
  
  let fontSize = '16px';
  switch(settings.fontSize) {
    case 'small':
      fontSize = '14px';
      break;
    case 'large':
      fontSize = '18px';
      break;
    case 'xlarge':
      fontSize = '20px';
      break;
  }
  root.style.fontSize = fontSize;
}

function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function initCategorySettingsManagement() {
  const navCategorySettings = document.getElementById('navCategorySettings');
  const addCategoryBtn = document.getElementById('addCategoryBtn');
  
  if (navCategorySettings) {
    navCategorySettings.addEventListener('click', function(e) {
      e.preventDefault();
      loadCategories();
      showSection('categorySettings');
    });
  }
  
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', addCategory);
  }
}

function getCategories() {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [
    '未分类',
    '技术分享',
    '生活随笔',
    '读书心得',
    '游戏',
    '科技',
    '电脑',
    '其他'
  ];
}

function saveCategories(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

function loadCategories() {
  const categories = getCategories();
  const container = document.getElementById('categoriesList');
  
  if (container) {
    container.innerHTML = categories.map((category, index) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--glass-bg); border-radius: 8px; margin-bottom: 8px;">
        <span>${category}</span>
        <div style="display: flex; gap: 8px;">
          <button style="padding: 6px 12px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;" onclick="editCategory(${index})">编辑</button>
          <button style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;" onclick="deleteCategory(${index})">删除</button>
        </div>
      </div>
    `).join('');
  }
}

function addCategory() {
  const input = document.getElementById('newCategory');
  const category = input.value.trim();
  
  if (!category) {
    showCategoryMessage('请输入分类名称', 'error');
    return;
  }
  
  const categories = getCategories();
  if (categories.includes(category)) {
    showCategoryMessage('分类已存在', 'error');
    return;
  }
  
  categories.push(category);
  saveCategories(categories);
  loadCategories();
  updateCategorySelect();
  input.value = '';
  showCategoryMessage('分类添加成功', 'success');
}

function editCategory(index) {
  const categories = getCategories();
  const newName = prompt('请输入新的分类名称:', categories[index]);
  
  if (newName && newName.trim()) {
    categories[index] = newName.trim();
    saveCategories(categories);
    loadCategories();
    updateCategorySelect();
    showCategoryMessage('分类修改成功', 'success');
  }
}

function deleteCategory(index) {
  const categories = getCategories();
  if (categories.length <= 1) {
    showCategoryMessage('至少保留一个分类', 'error');
    return;
  }
  
  const category = categories[index];
  if (confirm(`确定删除分类 "${category}" 吗？`)) {
    categories.splice(index, 1);
    saveCategories(categories);
    loadCategories();
    updateCategorySelect();
    showCategoryMessage('分类删除成功', 'success');
  }
}

function showCategoryMessage(message, type) {
  const element = document.getElementById('categoryMessage');
  if (element) {
    element.textContent = message;
    element.className = type === 'success' ? 'success-message' : 'error-message';
    setTimeout(() => {
      element.textContent = '';
    }, 3000);
  }
}

function updateCategorySelect() {
  const select = document.getElementById('articleCategory');
  if (!select) return;
  
  const categories = getCategories();
  const currentValue = select.value;
  
  select.innerHTML = categories.map(category => 
    `<option value="${category}">${category}</option>`
  ).join('');
  
  if (categories.includes(currentValue)) {
    select.value = currentValue;
  } else {
    select.value = categories[0];
  }
}

function loadCategoriesToSelect() {
  const select = document.getElementById('articleCategory');
  if (!select) return;
  
  const categories = getCategories();
  select.innerHTML = categories.map(category => 
    `<option value="${category}">${category}</option>`
  ).join('');
}

function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const timeElements = document.querySelectorAll('#currentTime');
  timeElements.forEach(el => {
    el.textContent = timeString;
  });
}

function initStatusMonitoring() {
  checkStorageUsage();
  checkResponseTime();
  checkPerformanceMetrics();
  checkConnectionInfo();

  const storageTimeEl = document.getElementById('storageTime');
  const cfConnectTimeEl = document.getElementById('cfConnectTime');
  const currentTimeEl = document.getElementById('currentTime');

  if (storageTimeEl) {
    storageTimeEl.textContent = new Date().toLocaleTimeString('zh-CN');
  }
  if (cfConnectTimeEl) {
    cfConnectTimeEl.textContent = new Date().toLocaleTimeString('zh-CN');
  }

  updateActivityRecords();
}

function updateActivityRecords() {
  const activityLoadTimeEl = document.getElementById('activityLoadTime');
  const activityConnectionTypeEl = document.getElementById('activityConnectionType');
  const activityStorageUsedEl = document.getElementById('activityStorageUsed');
  const activityArticlesCountEl = document.getElementById('activityArticlesCount');

  if (activityLoadTimeEl) {
    const pageLoadTimeEl = document.getElementById('pageLoadTime');
    if (pageLoadTimeEl) {
      activityLoadTimeEl.textContent = pageLoadTimeEl.textContent;
    }
  }

  if (activityConnectionTypeEl) {
    const connectionTypeEl = document.getElementById('connectionType');
    if (connectionTypeEl) {
      activityConnectionTypeEl.textContent = connectionTypeEl.textContent;
    }
  }

  if (activityStorageUsedEl) {
    const storageUsedEl = document.getElementById('storageUsed');
    if (storageUsedEl) {
      activityStorageUsedEl.textContent = storageUsedEl.textContent;
    }
  }

  if (activityArticlesCountEl) {
    const articlesCountEl = document.getElementById('articlesCount');
    if (articlesCountEl) {
      activityArticlesCountEl.textContent = articlesCountEl.textContent;
    }
  }
}

function checkStorageUsage() {
  const storageUsedEl = document.getElementById('storageUsed');
  const articlesCountEl = document.getElementById('articlesCount');

  if (!storageUsedEl) return;

  let totalSize = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      try {
        const value = localStorage.getItem(key);
        totalSize += (key.length + value.length) * 2;
      } catch (e) {
        console.warn('无法读取 localStorage 键:', key);
      }
    }
  }

  let sizeStr;
  if (totalSize < 1024) {
    sizeStr = totalSize + ' B';
  } else if (totalSize < 1024 * 1024) {
    sizeStr = (totalSize / 1024).toFixed(1) + ' KB';
  } else {
    sizeStr = (totalSize / (1024 * 1024)).toFixed(1) + ' MB';
  }

  storageUsedEl.textContent = sizeStr;

  if (articlesCountEl) {
    try {
      const articles = getArticles();
      articlesCountEl.textContent = articles.length;
    } catch (e) {
      articlesCountEl.textContent = '0';
    }
  }
}

function checkResponseTime() {
  const responseTimeEl = document.getElementById('responseTime');
  if (!responseTimeEl) return;

  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;

    if (pageLoadTime > 0 && pageLoadTime < 60000) {
      responseTimeEl.textContent = pageLoadTime + 'ms';
    } else {
      responseTimeEl.textContent = '< 1s';
    }
  } else {
    responseTimeEl.textContent = 'N/A';
  }
}

function checkPerformanceMetrics() {
  const memoryUsageEl = document.getElementById('memoryUsage');
  const screenResolutionEl = document.getElementById('screenResolution');
  const pageLoadTimeEl = document.getElementById('pageLoadTime');

  if (memoryUsageEl) {
    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      const usedMB = (memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
      const totalMB = (memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(0);
      memoryUsageEl.textContent = usedMB + ' / ' + totalMB + ' MB';
    } else {
      memoryUsageEl.textContent = 'N/A';
    }
  }

  if (screenResolutionEl) {
    screenResolutionEl.textContent =
      window.screen.width + ' × ' + window.screen.height;
  }

  if (pageLoadTimeEl) {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      if (loadTime > 0) {
        const loadSeconds = (loadTime / 1000).toFixed(2);
        pageLoadTimeEl.textContent = loadSeconds + 's';
      } else {
        pageLoadTimeEl.textContent = '< 1s';
      }
    } else {
      pageLoadTimeEl.textContent = 'N/A';
    }
  }
}

function checkConnectionInfo() {
  const connectionTypeEl = document.getElementById('connectionType');
  if (!connectionTypeEl) return;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (connection) {
    const type = connection.effectiveType || '未知';
    const downlink = connection.downlink ? connection.downlink + ' Mbps' : '';

    let connectionText = type;
    if (downlink) {
      connectionText += ' (' + downlink + ')';
    }
    connectionTypeEl.textContent = connectionText;
  } else {
    connectionTypeEl.textContent = '不可用';
  }
}