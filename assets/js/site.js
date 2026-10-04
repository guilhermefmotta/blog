(function () {
  var ACCENTS = ["#fde047", "#fca5a5", "#7dd3fc", "#86efac"];

  function showToast(message) {
    var toast = document.getElementById("copy-toast");
    if (!toast) return;
    document.getElementById("copy-toast-text").textContent = message || "Copied to clipboard!";
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { toast.classList.remove("show"); }, 2000);
  }

  function copyText(text, message) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () { showToast(message); });
  }
  window.copyText = copyText;

  // Wrap Rouge code blocks in the terminal-window chrome.
  document.querySelectorAll(".prose-comic div.highlighter-rouge").forEach(function (block) {
    var lang = (block.className.match(/language-(\S+)/) || [])[1] || "";
    var label = block.getAttribute("data-title") || (lang && lang !== "plaintext" ? lang : "terminal");
    var win = document.createElement("div");
    win.className = "code-window not-prose";
    win.innerHTML =
      '<div class="code-window__bar"><div class="code-window__dots"><span></span><span></span><span></span>' +
      '<span class="code-window__label"></span></div>' +
      '<button type="button" class="code-window__copy"><span class="material-symbols-outlined" style="font-size:14px">content_copy</span> Copy</button></div>';
    win.querySelector(".code-window__label").textContent = label;
    block.parentNode.insertBefore(win, block);
    win.appendChild(block);
    win.querySelector(".code-window__copy").addEventListener("click", function () {
      copyText(block.querySelector("code").innerText, "Code copied to clipboard!");
    });
  });

  // Number article h2s and build the sidebar table of contents.
  var article = document.querySelector(".prose-comic[data-toc]");
  var toc = document.getElementById("toc");
  if (article) {
    var headings = article.querySelectorAll("h2");
    headings.forEach(function (h, i) {
      var color = ACCENTS[i % ACCENTS.length];
      var num = String(i + 1).padStart(2, "0");
      var title = h.textContent;
      var badge = document.createElement("span");
      badge.className = "h-num";
      badge.style.background = color;
      badge.textContent = num;
      h.insertBefore(badge, h.firstChild);
      if (toc && h.id) {
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.className = "flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-brandDark transition-all";
        a.innerHTML = '<span class="w-5 h-5 shrink-0 rounded neo-border-sm flex items-center justify-center font-bold text-[10px]"></span><span class="truncate"></span>';
        a.firstChild.style.background = color;
        a.firstChild.textContent = i + 1;
        a.lastChild.textContent = title;
        toc.appendChild(a);
      }
    });
    var count = document.getElementById("toc-count");
    if (count) count.textContent = headings.length + (headings.length === 1 ? " Section" : " Sections");
    if (!headings.length) {
      var box = document.getElementById("toc-box");
      if (box) box.remove();
    }
  }

  // Generic [data-copy] buttons (copy link, copy quote, copy snippet by target id).
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      if (value === "url") value = window.location.href;
      else if (value.charAt(0) === "#") {
        var el = document.querySelector(value);
        value = el ? el.innerText : "";
      }
      copyText(value, btn.getAttribute("data-copy-message"));
    });
  });

  // Share button: native share sheet, fallback to copy.
  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (navigator.share) navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
      else copyText(window.location.href, "Link copied to clipboard!");
    });
  });

  // Filterable card grids (projects, snippets, articles).
  // Markup: [data-filter-root] containing [data-filter-btn=cat], [data-filter-search], [data-filter-sort],
  // [data-filter-reset], [data-filter-count], [data-filter-empty], and cards [data-card] with
  // data-category (space separated), data-search, data-stars, data-date, data-name.
  document.querySelectorAll("[data-filter-root]").forEach(function (root) {
    var grid = root.querySelector("[data-filter-grid]");
    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-card]"));
    var buttons = root.querySelectorAll("[data-filter-btn]");
    var search = root.querySelector("[data-filter-search]");
    var sort = root.querySelector("[data-filter-sort]");
    var reset = root.querySelector("[data-filter-reset]");
    var countEl = root.querySelector("[data-filter-count]");
    var empty = root.querySelector("[data-filter-empty]");
    var activeClass = root.getAttribute("data-active-class") || "bg-primary-container";
    var idleClass = root.getAttribute("data-idle-class") || "";
    var category = "all";

    function setActive(btn) {
      buttons.forEach(function (b) {
        var on = b === btn;
        activeClass.split(" ").forEach(function (c) { if (c) b.classList.toggle(c, on); });
        idleClass.split(" ").forEach(function (c) { if (c) b.classList.toggle(c, !on); });
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    function apply() {
      var q = search ? search.value.trim().toLowerCase() : "";
      var visible = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").split(" ");
        var text = (card.getAttribute("data-search") || card.textContent).toLowerCase();
        var ok = (category === "all" || cats.indexOf(category) !== -1) && (!q || text.indexOf(q) !== -1);
        card.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });
      if (countEl) countEl.textContent = visible;
      if (empty) empty.classList.toggle("hidden", visible !== 0);
    }

    function applySort() {
      if (!sort || !grid) return;
      var mode = sort.value;
      cards.sort(function (a, b) {
        if (mode === "stars") return (+b.getAttribute("data-stars") || 0) - (+a.getAttribute("data-stars") || 0);
        if (mode === "recent") return (b.getAttribute("data-date") || "").localeCompare(a.getAttribute("data-date") || "");
        if (mode === "name") return (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || "");
        return 0;
      });
      cards.forEach(function (c) { grid.appendChild(c); });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        category = btn.getAttribute("data-filter-btn");
        setActive(btn);
        apply();
      });
    });
    if (search) search.addEventListener("input", apply);
    if (sort) sort.addEventListener("change", function () { applySort(); apply(); });
    if (reset) reset.addEventListener("click", function () {
      if (search) search.value = "";
      category = "all";
      setActive(root.querySelector('[data-filter-btn="all"]'));
      applySort();
      apply();
    });
    root.querySelectorAll("[data-filter-reset-link]").forEach(function (el) {
      el.addEventListener("click", function () { if (reset) reset.click(); });
    });
    applySort();
    apply();
  });
})();
