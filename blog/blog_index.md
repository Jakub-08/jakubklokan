---
layout: default
title: "Blog"
description: "Sledujte mojí cestu pomocí pravidelných příspěvků."
---

<div class="main-bg">
  <h1 class="blog-intro-1">Vítejte na mém blogu</h1>
  <div class="separate-line separate-line-blog"></div>
  <h2 class="blog-intro-2">
    Pravidelně zde přidávám nejnovější články z&nbsp;turnajů a&nbsp;akcí.
  </h2>

  <div id="filtr-panel" class="container">
    <input type="text" id="vyhledavac" placeholder="Hledat podle názvu…" />
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
  "url": "{{ post.url | relative_url }}",
  "description": "{{ post.description | escape }}",
  "date": "{{ post.date | date: '%Y-%m-%d' }}",
  "image": "{{ post.image | relative_url }}",
  "tags": [{% for tag in post.tags %}"{{ tag }}"{% if forloop.last == false %}, {% endif %}{% endfor %}]
}
{% if forloop.last == false %},{% endif %}
{% endfor %}
]
</div>

<script src="/blog/blog.js"></script>
