---
layout: default
title: "Blog | Jakub Klokan – badminton, trénink a sportovní cesta"
description: "Pravidelné články o badmintonovém tréninku, turnajích, sportovní přípravě a cestě vrcholového hráče Jakuba Klokana."
---

<div class="main-bg">
  <h1 class="blog-intro-1">Můj badmintonový blog</h1>
  <div class="separate-line separate-line-blog"></div>
  <h2 class="blog-intro-2">
    Články o badmintonových turnajích, tréninku a&nbsp;cestě vrcholového hráče.
  </h2>

  <div id="filtr-panel" class="container">
    <div class="search-wrapper">
      <input
        type="text"
        id="vyhledavac"
        placeholder="🔍 Hledat články..."
      />

      <button id="clear-search" aria-label="Vymazat hledání">
        ×
      </button>
    </div>
    <div id="filtr-tagy"></div>
  </div>

  <div id="seznam-clanku" class="blog-list container"></div>
  <div id="paginace" class="container pagination"></div>
</div>

<!-- předáme data do JS -->
<div id="posts-data" style="display:none">
[
{% for post in site.posts %}
{
  "title": "{{ post.title | escape }}",
  "h1": "{{ post.h1 | default: post.title | escape }}",
  "summary": "{{ post.summary | escape }}",
  "url": "{{ post.url | relative_url }}",
  "date": "{{ post.date | date: '%Y-%m-%d' }}",
  "image": "{{ post.image | relative_url }}",
  "tags": [{% for tag in post.tags %}"{{ tag }}"{% if forloop.last == false %}, {% endif %}{% endfor %}]
}
{% if forloop.last == false %},{% endif %}
{% endfor %}
]
</div>

<script src="/blog/blog.js"></script>
<script src="/assets/js/scroll-animations.js"></script>
